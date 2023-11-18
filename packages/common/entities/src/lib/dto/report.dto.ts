import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICreateReportData, IReport, ReportCategory } from '../interface/report.interface';
import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class ReportDto implements IReport {
  @ApiProperty()
  public id: number;

  @ApiProperty({ enum: ReportCategory })
  public category: ReportCategory;

  @ApiPropertyOptional()
  public text?: string;

  @ApiProperty()
  public targetId: number;

  @ApiProperty()
  public reporter?: UserDto;

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
