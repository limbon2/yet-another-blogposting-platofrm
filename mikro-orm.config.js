const { defineConfig } = require('@mikro-orm/postgresql');

module.exports = defineConfig({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dbName: 'postgres',
  entities: ['dist/packages/common/entities/**/*.entity.js'],
  migrations: {
    path: './migrations',
  },
});
