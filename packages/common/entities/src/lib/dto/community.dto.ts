import { ApiProperty } from '@nestjs/swagger';
import { UserDto, PostDto } from '../entities';
import { ICommunity } from '../interface/community.interface';

export class CommunityDto implements ICommunity {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public nameLowerCase: string;

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
