import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nOptionsFactory, I18nOptionsWithoutResolvers } from 'nestjs-i18n';
import * as path from 'path';

@Injectable()
export class LocaleConfigService implements I18nOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createI18nOptions(): I18nOptionsWithoutResolvers {
    return {
      fallbackLanguage: this.configService.getOrThrow('locale.fallbackLanguage'),
      loaderOptions: {
        path: path.join(__dirname, 'i18n'),
        watch: true,
      },
    };
  }
}
