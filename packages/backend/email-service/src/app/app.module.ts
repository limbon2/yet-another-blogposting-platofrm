import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { backendConfig } from '@blogposting-platform/config';

import { AppController } from './app.controller';
import { EmailModule } from './email.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [backendConfig] }), EmailModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
