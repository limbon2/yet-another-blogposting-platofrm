import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FollowerEntity, UserEntity } from '@blogposting-platform/entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, FollowerEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
