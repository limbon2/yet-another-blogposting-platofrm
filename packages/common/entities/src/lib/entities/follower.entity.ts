import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { IFollower } from '../interface/follower.interface';
import { UserEntity } from './user.entity';

const tableName = 'followers';

@Entity({ tableName })
export class FollowerEntity implements IFollower {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  public id: number;

  @ManyToOne(() => UserEntity)
  public user: UserEntity;

  @ManyToOne(() => UserEntity)
  public lead: UserEntity;

  @Property()
  public createdAt: Date = new Date();
}
