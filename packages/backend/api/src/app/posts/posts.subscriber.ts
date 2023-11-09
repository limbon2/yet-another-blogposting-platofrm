import { Injectable } from '@nestjs/common';
import { EntityManager, EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { FollowerEntity, PostEntity } from '@blogposting-platform/entities';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { EmailService } from '../emails/email.service';

@Injectable()
export class PostsSubscriber implements EventSubscriber<PostEntity> {
  constructor(
    private readonly em: EntityManager,
    private readonly elastic: ElasticsearchService,
    private readonly emails: EmailService
  ) {
    this.em.getEventManager().registerSubscriber(this);
  }

  public getSubscribedEntities(): EntityName<PostEntity>[] {
    return [PostEntity];
  }

  private async notifyFollowers(post: PostEntity): Promise<void> {
    if (!post.author) throw new Error(`[POSTS_SUBSCRIBER]: Error trying to get author for ${post.id}`);

    const em = this.em.fork();

    const followers = await em.find(FollowerEntity, { lead: { id: post.author.id } }, { populate: ['lead', 'user'] });

    const promises: Promise<unknown>[] = [];
    for (const follower of followers) {
      promises.push(
        this.emails.sendTo([follower.user.email], `New post from ${post.author.username}`, 'post-notification', {
          postTitle: post.title,
          authorName: post.author.username,
          username: follower.user.username,
          postLink: 'https://google.com', //TODO: Add actual link to the post
        })
      );
    }
    await Promise.all(promises);
  }

  public async afterCreate(args: EventArgs<PostEntity>): Promise<void> {
    await this.elastic.create({ id: args.entity.id, index: 'search-posts', document: args.entity });
    await this.notifyFollowers(args.entity);
  }

  public async afterDelete(args: EventArgs<PostEntity>): Promise<void> {
    await this.elastic.delete({ id: args.entity.id, index: 'search-posts' });
  }
}
