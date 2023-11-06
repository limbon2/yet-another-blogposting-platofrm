import { ConfigFactory } from '@nestjs/config';

export const backendConfig: ConfigFactory = () => {
  return {
    locale: {
      fallbackLanguage: process.env.FALLBACK_LANGUAGE,
    },
  };
};
