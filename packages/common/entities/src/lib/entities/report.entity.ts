import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

import { IReport, ReportCategory } from '../interface/report.interface';
import { UserEntity } from './user.entity';

const tableName = 'reports';

@Entity({ tableName })
export class ReportEntity implements IReport {
  @PrimaryKey({ type: 'uuid' })
  public id: string = uuid();

  @Enum(() => ReportCategory)
  public category: ReportCategory;

  @Property({ type: 'text', nullable: true })
  public text?: string;

  @Property({ type: 'uuid' })
  public targetId: string;

  @ManyToOne(() => UserEntity)
  public reporter?: UserEntity;

  @Property()
  public createdAt: Date = new Date();
}
