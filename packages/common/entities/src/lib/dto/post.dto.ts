import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from '../entities';
import { ICreatePostData, IPost } from '../interface/post.interface';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class PostDto implements IPost {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public rating: number;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiPropertyOptional({ type: UserDto })
  public author?: UserDto;
}

export class CreatePostDataDto implements ICreatePostData {
  @ApiProperty()
  @IsDefined({ message: 'validation.validationErrors.i sDefined' })
  @IsString({ message: 'validation.validationErrors.isString' })
  @IsNotEmpty({ message: 'validation.validationErrors.isNotEmpty' })
  public title: string;

  @ApiProperty()
  @IsDefined({ message: 'validation.validationErrors.i sDefined' })
  @IsString({ message: 'validation.validationErrors.isString' })
  @IsNotEmpty({ message: 'validation.validationErrors.isNotEmpty' })
  public content: string;
}
