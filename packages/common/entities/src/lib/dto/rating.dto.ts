import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUser } from '../entities';
import { IRating } from '../interface/rating.interface';

export class RatingDto implements IRating {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public value: number;

  @ApiProperty()
  public targetId: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiPropertyOptional()
  public rater?: IUser;
}
