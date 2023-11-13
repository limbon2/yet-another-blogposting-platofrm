import { ApiProperty } from '@nestjs/swagger';
import { IBan, ICreateBanData } from '../interface/ban.interface';
import { UserDto } from './user.dto';

export class BanDto implements IBan {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public reason: string;

  @ApiProperty()
  public targetId: string;

  @ApiProperty({ type: UserDto })
  public bannedBy: UserDto;

  @ApiProperty()
  public createdAt: Date;
}

export class CreateBanDataDto implements ICreateBanData {
  @ApiProperty()
  public reason: string;
}
