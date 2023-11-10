import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUser } from '../entities';
import { ICreateReportData, IReport, ReportCategory } from '../interface/report.interface';
import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';

export class ReportDto implements IReport {
  @ApiProperty()
  public id: string;

  @ApiProperty({ enum: ReportCategory })
  public category: ReportCategory;

  @ApiPropertyOptional()
  public text?: string;

  @ApiProperty()
  public targetId: string;

  @ApiProperty()
  public reporter?: IUser;

  @ApiProperty()
  public createdAt: Date;
}

export class CreateReportDataDto implements ICreateReportData {
  @ApiProperty({ enum: ReportCategory })
  @IsDefined()
  @IsEnum(ReportCategory)
  public category: ReportCategory;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public text?: string;
}
