import { ApiProperty } from '@nestjs/swagger';
import { IFollower } from '../interface/follower.interface';
import { UserDto } from './user.dto';

export class FollowerDto implements IFollower {
  @ApiProperty()
  public id: number;

  @ApiProperty({ type: () => UserDto })
  public user: UserDto;

  @ApiProperty({ type: () => UserDto })
  public lead: UserDto;

  @ApiProperty()
  public createdAt: Date;
}
