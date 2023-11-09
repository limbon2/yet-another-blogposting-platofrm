import { Entity, Index, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { IUser } from '../interface/user.interface';
import { PostEntity } from './post.entity';

const tableName = 'users';

@Entity({ tableName })
export class UserEntity implements IUser {
  @PrimaryKey({ type: 'uuid' })
  public id: string = uuid();

  @Property({ type: 'varchar', length: 96 })
  public username: string;

  @Index()
  @Property({ unique: true })
  public email: string;

  @Property()
  public password: string;

  @Property({ type: 'bigint' })
  public rating: number = 0;

  @Property({ type: 'varchar', length: 6, nullable: true })
  public code?: string;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  @OneToMany(() => PostEntity, (post) => post.author)
  public posts?: PostEntity[];
}
