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
    bucket: {
      default: process.env.STORAGE_BUCKET_DEFAULT,
    },
    storage: {
      type: process.env.STORAGE_TYPE,
      project_id: process.env.STORAGE_PROJECT_ID,
      private_key_id: process.env.STORAGE_PRIVATE_KEY_ID,
      private_key: process.env.STORAGE_PRIVATE_KEY,
      client_email: process.env.STORAGE_CLIENT_EMAIL,
      client_id: process.env.STORAGE_CLIENT_ID,
      auth_uri: process.env.STORAGE_AUTH_URI,
      token_uri: process.env.STORAGE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.STORAGE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.STORAGE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.STORAGE_UNIVERSE_DOMAIN,
    },
  };
};
