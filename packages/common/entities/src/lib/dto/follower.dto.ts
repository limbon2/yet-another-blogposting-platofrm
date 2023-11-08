import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../entities';
import { IFollower } from '../interface/follower.interface';

export class FollowerDto implements IFollower {
  @ApiProperty()
  public id: string;

  @ApiProperty({ type: UserDto })
  public user: UserDto;

  @ApiProperty({ type: UserDto })
  public lead: UserDto;

  @ApiProperty()
  public createdAt: Date;
}
