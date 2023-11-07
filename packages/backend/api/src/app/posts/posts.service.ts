import { IPost, PostEntity } from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(private em: EntityManager) {}

  public get(offset?: number, count?: number): Promise<IPost[]> {
    return this.em.find(PostEntity, {}, { offset, limit: count, orderBy: { createdAt: 'DESC' } });
  }
}
