import { ICreateReportData, IReport, IUser, ReportEntity, UserEntity } from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, Type } from '@nestjs/common';

@Injectable()
export class ReportService {
  constructor(private readonly em: EntityManager) {}

  public async create(
    targetClass: Type<{ id: number }>,
    user: IUser,
    targetId: number,
    data: ICreateReportData
  ): Promise<IReport> {
    const [target, reporter, existingReport] = await Promise.all([
      this.em.findOne(targetClass, { id: targetId }),
      this.em.findOne(UserEntity, { id: user.id }),
      this.em.findOne(ReportEntity, { targetId, reporter: { id: user.id } }),
    ]);

    if (!target || !reporter || existingReport) throw new BadRequestException();

    const report = new ReportEntity();
    report.category = data.category;
    report.text = data.text;
    report.targetId = target.id;
    report.reporter = reporter;

    this.em.create(ReportEntity, report);
    await this.em.flush();

    return report;
  }
}
