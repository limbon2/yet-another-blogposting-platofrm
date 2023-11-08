import { Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { IPost } from '../interface/post.interface';
import { UserEntity } from '../entities';
import { TagEntity } from './tag.entity';

const tableName = 'posts';

@Entity({ tableName })
export class PostEntity implements IPost {
  @PrimaryKey({ type: 'uuid' })
  public id: string = uuid();

  @Property()
  public title: string;

  @Property()
  public content: string;

  @Property({ type: 'bigint' })
  public rating: number = 0;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  @ManyToOne(() => UserEntity)
  public author?: UserEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.posts, { eager: true, owner: true })
  public tags: TagEntity[];
}
