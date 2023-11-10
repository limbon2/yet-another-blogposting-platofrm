import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { backendConfig } from '@blogposting-platform/config';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [backendConfig] })],
  providers: [
    EmailService,
    {
      provide: 'EMAIL_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: { urls: [configService.getOrThrow('rmq.url')], queue: 'email_queue' },
        }),
      inject: [ConfigService],
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
