import { Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ICommunity } from '../interface/community.interface';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

const tableName = 'communities';

@Entity({ tableName })
export class CommunityEntity implements ICommunity {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  public id: number;

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
