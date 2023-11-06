import { IDatabaseDriver, Connection } from '@mikro-orm/core';
import { defineConfig } from '@mikro-orm/postgresql';
import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { allEntities } from '@blogposting-platform/entities';

@Injectable()
export class DatabaseConfigService implements MikroOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createMikroOrmOptions(): MikroOrmModuleOptions<IDatabaseDriver<Connection>> {
    return defineConfig({
      host: this.configService.getOrThrow('db.host'),
      port: this.configService.getOrThrow('db.port'),
      user: this.configService.getOrThrow('db.username'),
      password: this.configService.getOrThrow('db.password'),
      dbName: this.configService.getOrThrow('db.name'),
      entities: ['dist/packages/common/entities/**/*.entity.js'],
      entitiesTs: allEntities,
    });
  }
}
