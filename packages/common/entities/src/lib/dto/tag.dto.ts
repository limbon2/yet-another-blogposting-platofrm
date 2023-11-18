import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ITag } from '../interface/tag.interface';
import { PostDto } from './post.dto';

export class TagDto implements ITag {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiPropertyOptional({ type: () => [PostDto] })
  public posts?: PostDto[];
}
