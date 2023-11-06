import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IUser } from '../interface/user.interface';

export class UserDto implements IUser {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public email: string;

  @Exclude()
  public password: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}
