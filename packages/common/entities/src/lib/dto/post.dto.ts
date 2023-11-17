import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICreatePostData, IPost } from '../interface/post.interface';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TagDto } from './tag.dto';
import { UserDto } from '../entities';
import { BanDto } from './ban.dto';
import { CommunityDto } from './community.dto';
import { ReportDto } from './report.dto';

export class PostDto implements IPost {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public slug: string;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public rating: number;

  @ApiProperty()
  public isBanned: boolean;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiPropertyOptional({ type: () => UserDto })
  public author?: UserDto;

  @ApiProperty({ type: () => [TagDto] })
  public tags: TagDto[];

  @ApiPropertyOptional({ type: () => [ReportDto] })
  public reports?: ReportDto[];

  @ApiPropertyOptional({ type: () => CommunityDto })
  public community?: CommunityDto;

  @ApiPropertyOptional({ type: () => BanDto })
  public ban?: BanDto;
}

export class CreatePostDataDto implements ICreatePostData {
  @ApiProperty()
  @IsDefined({ message: 'validation.validationErrors.i sDefined' })
  @IsString({ message: 'validation.validationErrors.isString' })
  @IsNotEmpty({ message: 'validation.validationErrors.isNotEmpty' })
  public title: string;

  @ApiProperty()
  @IsDefined({ message: 'validation.validationErrors.i sDefined' })
  @IsString({ message: 'validation.validationErrors.isString' })
  @IsNotEmpty({ message: 'validation.validationErrors.isNotEmpty' })
  public content: string;

  @ApiProperty()
  @IsDefined({ message: 'validation.validationErrors.i sDefined' })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(16)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  public tags: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  public communityId?: string;
}
