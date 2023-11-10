/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import hbs from 'nodemailer-express-handlebars';
import { ISendEmailData } from '@blogposting-platform/entities';

@Injectable()
export class EmailService {
  private readonly transport: mailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const transportSettings: SMTPTransport.Options = {
      host: this.configService.getOrThrow('smtp.host'),
      port: this.configService.getOrThrow('smtp.port'),
      secure: true,
      auth: {
        user: this.configService.getOrThrow('smtp.auth.username'),
        pass: this.configService.getOrThrow('smtp.auth.password'),
      },
    };

    this.transport = mailer.createTransport(transportSettings);
    this.transport.use('compile', hbs({ viewEngine: { defaultLayout: '' }, viewPath: __dirname + '/templates' }));
  }

  public async sendTo(data: ISendEmailData): Promise<any> {
    const result = await this.transport.sendMail({
      to: data.emails,
      from: `Blogposting App <${this.configService.getOrThrow('smtp.auth.username')}>`,
      subject: data.subject,
      template: data.template,
      context: data.context,
    } as any);

    return result;
  }
}
