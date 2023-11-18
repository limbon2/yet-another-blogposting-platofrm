import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { IRating } from '../interface/rating.interface';
import { UserEntity } from './user.entity';

const tableName = 'ratings';

@Entity({ tableName })
export class RatingEntity implements IRating {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  public id: number;

  @Property({ type: 'int' })
  public value: number;

  @Property({ type: 'uuid' })
  public targetId: number;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  @ManyToOne(() => UserEntity)
  public rater?: UserEntity;
}
