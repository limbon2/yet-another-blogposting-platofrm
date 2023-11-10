/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ISendEmailData } from '@blogposting-platform/entities';

@Injectable()
export class EmailService {
  constructor(@Inject('EMAIL_SERVICE') private readonly emails: ClientProxy) {}

  public sendTo(emails: string[], subject: string, template: string, context: Record<string, any>): void {
    const data: ISendEmailData = { emails, subject, template, context };
    this.emails.emit('emails.send', data);
  }
}
