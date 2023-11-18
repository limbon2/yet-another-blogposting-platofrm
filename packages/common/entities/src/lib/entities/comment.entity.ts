import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { IComment } from '../interface/comment.interface';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

const tableName = 'comments';

@Entity({ tableName })
export class CommentEntity implements IComment {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  public id: number;

  @Property({ type: 'text' })
  public content: string;

  @Property({ type: 'bigint' })
  public rating: number = 0;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  @ManyToOne(() => UserEntity, { onDelete: 'set null' })
  public author?: UserEntity;

  @ManyToOne(() => PostEntity, { onDelete: 'cascade' })
  public post?: PostEntity;
}
