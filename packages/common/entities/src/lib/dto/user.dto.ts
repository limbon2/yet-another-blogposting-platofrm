import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IUser } from '../interface/user.interface';
import { PostDto } from './post.dto';

export class UserDto implements IUser {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  @Exclude()
  public password: string;

  @ApiPropertyOptional()
  public avatarUrl?: string;

  @ApiProperty()
  public rating: number;

  @ApiPropertyOptional()
  @Exclude()
  public code?: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiPropertyOptional({ type: [PostDto] })
  public posts?: PostDto[];
}
