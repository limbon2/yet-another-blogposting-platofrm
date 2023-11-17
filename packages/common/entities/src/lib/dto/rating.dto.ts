import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICreateRatingData, IRating } from '../interface/rating.interface';
import { IsDefined, IsInt, Max, Min } from 'class-validator';
import { IUser } from '../interface/user.interface';

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

export class CreateRatingDataDto implements ICreateRatingData {
  @ApiProperty()
  @IsDefined({ message: 'validation.validationErrors.isDefined' })
  @IsInt()
  @Min(-1)
  @Max(1)
  public value: number;
}
