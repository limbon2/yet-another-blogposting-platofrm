import {
  CommunityEntity,
  ICreatePostData,
  IPost,
  IUser,
  PostEntity,
  TagEntity,
  UserEntity,
} from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Cron, CronExpression } from '@nestjs/schedule';
import { difference } from 'lodash';
import { RatingsService } from '../ratings/ratings.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly em: EntityManager,
    private readonly elastic: ElasticsearchService,
    private readonly ratingService: RatingsService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  private async syncElasticWithDbPosts(): Promise<void> {
    Logger.log('Starting elasticsearch scheduled cleanup');
    const posts = await this.em.fork().find(PostEntity, {}, { fields: ['id'] });
    const elasticPosts = await this.elastic.search<IPost>({
      index: 'search-posts',
      query: { bool: { must: { match_all: {} }, must_not: { terms: { _id: posts.map((post) => post.id) } } } },
      size: 9999,
    });

    Logger.log(`Found ${elasticPosts.hits.hits.length} posts in elasticsearch. Clearing...`);

    const postIds = elasticPosts.hits.hits.map((post) => post._id);
    await this.elastic.deleteByQuery({
      index: 'search-posts',
      query: { bool: { must: [{ match_all: {} }, { terms: { _id: postIds } }] } },
    });

    Logger.log(`Elasticsearch post synchronization complete. Removed ${postIds.length} number of orphaned posts`);
  }

  public async search(query: string): Promise<IPost[]> {
    const result = await this.elastic.search<IPost>({
      index: 'search-posts',
      query: { multi_match: { query } },
      filter_path: 'hits.hits._source',
    });

    return result.hits.hits as unknown as IPost[];
  }

  public get(offset?: number, count?: number): Promise<IPost[]> {
    return this.em.find(
      PostEntity,
      { isBanned: false },
      { offset, limit: count, orderBy: { createdAt: 'DESC' }, populate: ['author'] }
    );
  }

  public async create(user: IUser, data: ICreatePostData): Promise<IPost> {
    const [author, community] = await Promise.all([
      this.em.findOne(UserEntity, { id: user.id }),
      this.em.findOne(CommunityEntity, { id: data.communityId }),
    ]);

    if (!author || (data.communityId && !community)) throw new BadRequestException();

    const tags = await this.em.find(
      TagEntity,
      { nameLowerCase: { $in: data.tags.map((tagName) => tagName.toLowerCase()) } },
      { fields: ['id', 'name', 'createdAt'] }
    );
    const tagNames = tags.map((tag) => tag.name);
    const tagDiff = difference(data.tags, tagNames);

    for (const newTag of tagDiff) {
      const tag = new TagEntity();
      tag.name = newTag;
      tag.nameLowerCase = newTag.toLowerCase();
      tags.push(this.em.create(TagEntity, tag));
    }

    const post = new PostEntity();
    post.title = data.title;
    post.content = data.content;
    post.author = author;
    post.tags = tags;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    post.community = community!;

    this.em.create(PostEntity, post);

    await this.em.flush();

    return post;
  }

  public async remove(postId: string): Promise<IPost> {
    const post = await this.em.findOne(PostEntity, { id: postId });
    if (!post) throw new BadRequestException();

    this.em.remove(post);
    await this.em.flush();

    return post;
  }
}
