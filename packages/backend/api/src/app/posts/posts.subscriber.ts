import { Injectable } from '@nestjs/common';
import { EntityManager, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { PostEntity } from '@blogposting-platform/entities';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class PostsSubscriber implements EventSubscriber<PostEntity> {
  constructor(private em: EntityManager, private readonly elastic: ElasticsearchService) {
    this.em.getEventManager().registerSubscriber(this);
  }

  public async afterCreate(args: EventArgs<PostEntity>): Promise<void> {
    this.elastic.create({ id: args.entity.id, index: 'search-posts', document: args.entity });
  }
}
