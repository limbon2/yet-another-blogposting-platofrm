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
    jwt: {
      secret: 'foobar',
    },
    elastic: {
      nodeUrl: process.env.ELASTIC_NODE_URL,
      apiKey: process.env.ELASTIC_KEY,
    },
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        username: process.env.SMTP_USERNAME,
        password: process.env.SMTP_PASSWORD,
      },
    },
  };
};
