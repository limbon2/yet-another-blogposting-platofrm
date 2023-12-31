/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { LocaleHttpExceptionFilter } from '@blogposting-platform/locale';
import { I18nValidationPipe } from 'nestjs-i18n';
import * as fs from 'fs';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe(), new I18nValidationPipe());
  app.useGlobalFilters(new LocaleHttpExceptionFilter());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Blog Posting API')
    .setDescription('The api documentation of a blogposting application')
    .addBearerAuth()
    .setVersion('0.1')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('swagger.json', JSON.stringify(doc));

  SwaggerModule.setup('/documentation', app, doc);

  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
