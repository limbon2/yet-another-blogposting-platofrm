import { Module } from '@nestjs/common';
import { LocaleModule } from '@blogposting-platform/locale';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DatabaseConfigService, backendConfig } from '@blogposting-platform/config';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      imports: [ConfigModule.forRoot({ load: [backendConfig] })],
    }),
    LocaleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
