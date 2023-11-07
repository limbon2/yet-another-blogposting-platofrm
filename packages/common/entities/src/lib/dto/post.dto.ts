import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from '../entities';
import { IPost } from '../interface/post.interface';

export class PostDto implements IPost {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiPropertyOptional({ type: UserDto })
  public author?: UserDto;
}
