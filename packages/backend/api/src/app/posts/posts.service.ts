import {
  ICreatePostData,
  ICreateRatingData,
  IPost,
  IUser,
  PostEntity,
  RatingEntity,
  TagEntity,
  UserEntity,
} from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { difference } from 'lodash';

@Injectable()
export class PostsService {
  constructor(private readonly em: EntityManager, private readonly elastic: ElasticsearchService) {}

  public async search(query: string): Promise<IPost[]> {
    const result = await this.elastic.search<IPost>({
      index: 'search-posts',
      query: { multi_match: { query } },
      filter_path: 'hits.hits._source',
    });

    return result.hits.hits as unknown as IPost[];
  }

  public get(offset?: number, count?: number): Promise<IPost[]> {
    return this.em.find(PostEntity, {}, { offset, limit: count, orderBy: { createdAt: 'DESC' } });
  }

  public async create(user: IUser, data: ICreatePostData): Promise<IPost> {
    const author = await this.em.findOne(UserEntity, { id: user.id });

    if (!author) throw new BadRequestException();

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

    this.em.create(PostEntity, post);

    await this.em.flush();

    return post;
  }

  public async rate(user: IUser, postId: string, data: ICreateRatingData): Promise<IPost> {
    const [rater, post, userRatings] = await Promise.all([
      this.em.findOne(UserEntity, { id: user.id }),
      this.em.findOne(PostEntity, { id: postId }),
      this.em.findOne(RatingEntity, { targetId: postId, rater: { id: user.id } }),
    ]);

    if (!rater || !post) throw new BadRequestException();

    post.rating = Number(post.rating);

    if (userRatings) {
      if (data.value > userRatings.value) {
        post.rating = post.rating + 1;
      }
      if (data.value < userRatings.value) {
        post.rating = post.rating - 1;
      }

      userRatings.value = data.value;
      await this.em.upsert(RatingEntity, userRatings);
    } else {
      const rating = new RatingEntity();
      rating.value = data.value;
      rating.targetId = postId;
      rating.rater = rater;

      this.em.create(RatingEntity, rating);
      post.rating = post.rating + rating.value;
    }

    await this.em.upsert(PostEntity, post);
    await this.em.flush();

    return post;
  }
}
