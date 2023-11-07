import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { IPost } from '../interface/post.interface';
import { UserEntity } from '../entities';

const tableName = 'posts';

@Entity({ tableName })
export class PostEntity implements IPost {
  @PrimaryKey({ type: 'uuid' })
  public id: string = uuid();

  @Property()
  public title: string;

  @Property()
  public content: string;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  @ManyToOne(() => UserEntity)
  public author?: UserEntity;
}
