import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { backendConfig } from '@blogposting-platform/config';
import { LocaleConfigService } from './locale-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ load: [backendConfig] }),
    I18nModule.forRootAsync({
      useClass: LocaleConfigService,
      resolvers: [AcceptLanguageResolver],
      logging: true,
    }),
  ],
  providers: [LocaleConfigService],
  exports: [LocaleConfigService],
})
export class LocaleModule {}
