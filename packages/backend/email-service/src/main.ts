/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const ctx = await NestFactory.createApplicationContext(AppModule);
  const configService = ctx.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`${configService.getOrThrow('rmq.url')}`],
      queue: 'email_queue',
    },
  });
  await app.listen();
}

bootstrap();
