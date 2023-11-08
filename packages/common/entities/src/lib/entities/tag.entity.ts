import { Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { ITag } from '../interface/tag.interface';
import { PostEntity } from './post.entity';

const tableName = 'tags';

@Entity({ tableName })
export class TagEntity implements ITag {
  @PrimaryKey({ type: 'uuid' })
  public id: string = uuid();

  @Property()
  public name: string;

  @Property()
  public createdAt: Date = new Date();

  @ManyToMany(() => PostEntity, (post) => post.tags)
  public posts?: PostEntity[];
}
