import { IsArray, IsDefined, IsEmail, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ISendEmailData } from '../interface/email.interface';

export class SendEmailDataDto implements ISendEmailData {
  @IsDefined()
  @IsArray()
  @IsEmail({}, { each: true })
  public emails: string[];

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public subject: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public template: string;

  @IsOptional()
  @IsObject()
  public context?: Record<string, unknown>;
}
