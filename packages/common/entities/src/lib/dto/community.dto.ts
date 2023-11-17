import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { PostDto } from './post.dto';
import { ICommunity, ICreateCommunityData } from '../interface/community.interface';
import { UserDto } from './user.dto';

export class CommunityDto implements ICommunity {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public slug: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty({ type: () => UserDto })
  public creator: UserDto;

  @ApiPropertyOptional({ type: () => [UserDto] })
  public moderators?: UserDto[];

  @ApiPropertyOptional({ type: () => [PostDto] })
  public posts?: PostDto[];
}

export class CreateCommunityDataDto implements ICreateCommunityData {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public name: string;
}
