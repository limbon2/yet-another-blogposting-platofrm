import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { IReport, ReportCategory } from '../interface/report.interface';
import { UserEntity } from './user.entity';

const tableName = 'reports';

@Entity({ tableName })
export class ReportEntity implements IReport {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  public id: number;

  @Enum(() => ReportCategory)
  public category: ReportCategory;

  @Property({ type: 'text', nullable: true })
  public text?: string;

  @Property({ type: 'uuid' })
  public targetId: number;

  @ManyToOne(() => UserEntity)
  public reporter?: UserEntity;

  @Property()
  public createdAt: Date = new Date();
}
