import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { IBan } from '../interface/ban.interface';
import { UserEntity } from './user.entity';

const tableName = 'bans';

@Entity({ tableName })
export class BanEntity implements IBan {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  public id: number;

  @Property({ type: 'text' })
  public reason: string;

  @Property({ type: 'uuid' })
  public targetId: number;

  @ManyToOne(() => UserEntity)
  public bannedBy: UserEntity;

  @Property()
  public createdAt: Date = new Date();
}
