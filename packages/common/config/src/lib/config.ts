import { ConfigFactory } from '@nestjs/config';

export const backendConfig: ConfigFactory = () => {
  return {
    locale: {
      fallbackLanguage: process.env.FALLBACK_LANGUAGE,
    },
    db: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      name: 'postgres',
    },
  };
};
