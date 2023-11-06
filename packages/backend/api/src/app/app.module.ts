import { Module } from '@nestjs/common';
import { LocaleModule } from '@blogposting-platform/locale';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [LocaleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
