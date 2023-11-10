import { ReportEntity } from '@blogposting-platform/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ReportService } from './report.service';

@Module({ imports: [MikroOrmModule.forFeature([ReportEntity])], providers: [ReportService], exports: [ReportService] })
export class ReportModule {}
