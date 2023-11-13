import { ApiProperty } from '@nestjs/swagger';
import { UserDto, PostDto } from '../entities';
import { ICommunity, ICreateCommunityData } from '../interface/community.interface';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

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

  @ApiProperty({ type: UserDto })
  public creator: UserDto;

  @ApiProperty({ type: [UserDto] })
  public moderators?: UserDto[];

  @ApiProperty({ type: [PostDto] })
  public posts?: PostDto[];
}

export class CreateCommunityDataDto implements ICreateCommunityData {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public name: string;
}
