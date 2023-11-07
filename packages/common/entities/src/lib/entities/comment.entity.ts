import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { IComment } from '../interface/comment.interface';
import { UserEntity, PostEntity } from '../entities';

const tableName = 'comments';

@Entity({ tableName })
export class CommentEntity implements IComment {
  @PrimaryKey({ type: 'uuid' })
  public id: string = uuid();

  @Property({ type: 'text' })
  public content: string;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  @ManyToOne(() => UserEntity)
  public author?: UserEntity;

  @ManyToOne(() => PostEntity)
  public post?: PostEntity;
}
