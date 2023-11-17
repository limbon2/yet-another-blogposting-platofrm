import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IComment, ICreateCommentData } from '../interface/comment.interface';
import { IsDefined, IsString, IsNotEmpty } from 'class-validator';
import { PostDto } from './post.dto';
import { UserDto } from './user.dto';

export class CommentDto implements IComment {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public rating: number;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiPropertyOptional({ type: () => UserDto })
  public author?: UserDto;

  @ApiPropertyOptional({ type: () => PostDto })
  public post?: PostDto;
}

export class CreateCommentDataDto implements ICreateCommentData {
  @ApiProperty()
  @IsDefined({ message: 'validation.validationErrors.i sDefined' })
  @IsString({ message: 'validation.validationErrors.isString' })
  @IsNotEmpty({ message: 'validation.validationErrors.isNotEmpty' })
  public content: string;
}
