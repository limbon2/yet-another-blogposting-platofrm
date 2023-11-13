import { Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { UserEntity, PostEntity } from '../entities';
import { ICommunity } from '../interface/community.interface';

const tableName = 'communities';

@Entity({ tableName })
export class CommunityEntity implements ICommunity {
  @PrimaryKey({ type: 'uuid' })
  public id: string = uuid();

  @Property({ unique: true })
  public name: string;

  @Index()
  @Property()
  public slug: string;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  @ManyToOne(() => UserEntity)
  public creator: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.moderatedCommunities)
  public moderators?: UserEntity[];

  @OneToMany(() => PostEntity, (post) => post.community)
  public posts?: PostEntity[];
}
