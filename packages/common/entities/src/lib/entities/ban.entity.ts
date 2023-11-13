import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { IBan } from '../interface/ban.interface';
import { UserEntity } from '../entities';

const tableName = 'bans';

@Entity({ tableName })
export class BanEntity implements IBan {
  @PrimaryKey({ type: 'uuid' })
  public id: string = uuid();

  @Property({ type: 'text' })
  public reason: string;

  @Property({ type: 'uuid' })
  public targetId: string;

  @ManyToOne(() => UserEntity)
  public bannedBy: UserEntity;

  @Property()
  public createdAt: Date = new Date();
}
