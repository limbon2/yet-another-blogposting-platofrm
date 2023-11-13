import { Entity, Enum, Index, ManyToMany, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { IUser, UserRole } from '../interface/user.interface';
import { PostEntity } from './post.entity';
import { CommunityEntity } from './community.entity';

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

  @Property({ hidden: true })
  public password: string;

  @Enum(() => UserRole)
  public role: UserRole = UserRole.User;

  @Property({ type: 'text', nullable: true })
  public avatarUrl?: string;

  @Property({ type: 'bigint' })
  public rating: number = 0;

  @Property({ type: 'varchar', length: 6, nullable: true, hidden: true })
  public code?: string;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  @OneToMany(() => PostEntity, (post) => post.author)
  public posts?: PostEntity[];

  @ManyToMany(() => CommunityEntity, (community) => community.moderators, { owner: true })
  public moderatedCommunities?: CommunityEntity[];
}
