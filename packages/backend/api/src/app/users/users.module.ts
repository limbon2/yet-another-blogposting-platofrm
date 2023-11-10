import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FollowerEntity, UserEntity } from '@blogposting-platform/entities';
import { ConfigModule } from '@nestjs/config';
import { backendConfig } from '@blogposting-platform/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [backendConfig] }),
    MikroOrmModule.forFeature([UserEntity, FollowerEntity]),
    StorageModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
