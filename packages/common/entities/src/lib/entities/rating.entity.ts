import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { IRating } from '../interface/rating.interface';
import { UserEntity } from './user.entity';

const tableName = 'ratings';

@Entity({ tableName })
export class RatingEntity implements IRating {
  @PrimaryKey({ type: 'uuid' })
  public id: string = uuid();

  @Property({ type: 'int' })
  public value: number;

  @Property({ type: 'uuid' })
  public targetId: string;

  @Property()
  public createdAt: Date;

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date;

  @ManyToOne(() => UserEntity)
  public rater?: UserEntity;
}
