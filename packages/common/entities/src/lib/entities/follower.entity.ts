import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { IFollower } from '../interface/follower.interface';
import { UserEntity } from '../entities';

const tableName = 'followers';

@Entity({ tableName })
export class FollowerEntity implements IFollower {
  @PrimaryKey({ type: 'uuid' })
  public id: string;

  @ManyToOne(() => UserEntity)
  public user: UserEntity;

  @ManyToOne(() => UserEntity)
  public lead: UserEntity;

  @Property()
  public createdAt: Date = new Date();
}
