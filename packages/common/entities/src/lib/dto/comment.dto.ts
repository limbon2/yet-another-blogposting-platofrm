import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto, PostDto } from '../entities';
import { IComment } from '../interface/comment.interface';

export class CommentDto implements IComment {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiPropertyOptional({ type: UserDto })
  public author?: UserDto;

  @ApiPropertyOptional({ type: PostDto })
  public post?: PostDto;
}
