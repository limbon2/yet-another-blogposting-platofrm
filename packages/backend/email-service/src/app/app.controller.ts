import { SendEmailDataDto } from '@blogposting-platform/entities';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class AppController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('emails.send')
  public async sendEmail(@Payload() data: SendEmailDataDto): Promise<void> {
    await this.emailService.sendTo(data);
  }
}
