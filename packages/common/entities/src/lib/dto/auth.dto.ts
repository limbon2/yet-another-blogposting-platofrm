import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IAuthUser, ISignInData, ISignUpData } from '../interface/auth.interface';
import { UserDto } from '../entities';

export class AuthUserDto implements IAuthUser {
  @ApiProperty()
  public accessToken: string;

  @ApiProperty({ type: UserDto })
  public user: UserDto;
}

export class SignInDataDto implements ISignInData {
  @ApiProperty()
  @IsDefined({ message: 'validation.validationErrors.i sDefined' })
  @IsEmail({}, { message: 'validation.validationErrors.isEmail' })
  public email: string;

  @ApiProperty()
  @IsDefined({ message: 'validation.validationErrors.i sDefined' })
  @IsString({ message: 'validation.validationErrors.isString' })
  @IsNotEmpty({ message: 'validation.validationErrors.isNotEmpty' })
  public password: string;
}

export class SignUpDataDto implements ISignUpData {
  @ApiProperty()
  @IsDefined({ message: 'validation.validationErrors.i sDefined' })
  @IsString({ message: 'validation.validationErrors.isString' })
  @IsNotEmpty({ message: 'validation.validationErrors.isNotEmpty' })
  public username: string;

  @ApiProperty()
  @IsDefined({ message: 'validation.validationErrors.i sDefined' })
  @IsEmail({}, { message: 'validation.validationErrors.isEmail' })
  public email: string;

  @ApiProperty()
  @IsDefined({ message: 'validation.validationErrors.i sDefined' })
  @IsString({ message: 'validation.validationErrors.isString' })
  @IsNotEmpty({ message: 'validation.validationErrors.isNotEmpty' })
  public password: string;
}
