import { Entity, Index, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ITag } from '../interface/tag.interface';
import { PostEntity } from './post.entity';

const tableName = 'tags';

@Entity({ tableName })
export class TagEntity implements ITag {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  public id: number;

  @Property({ unique: true })
  public name: string;

  @Index()
  @Property()
  public nameLowerCase: string;

  @Property()
  public createdAt: Date = new Date();

  @ManyToMany(() => PostEntity, (post) => post.tags)
  public posts?: PostEntity[];
}
