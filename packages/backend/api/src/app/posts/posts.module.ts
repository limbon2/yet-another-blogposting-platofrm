import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostEntity } from 'packages/common/entities/src/lib/entities/post.entity';

@Module({
  imports: [MikroOrmModule.forFeature([PostEntity])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
