import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dbName: 'postgres',
  entities: ['dist/packages/common/entities/**/*.entity.js'],
  entitiesTs: ['packages/common/entities/**/*.entity.ts'],
});
