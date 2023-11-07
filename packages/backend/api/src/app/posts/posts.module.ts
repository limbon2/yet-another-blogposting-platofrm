import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService, backendConfig } from '@blogposting-platform/config';
import { PostEntity } from '@blogposting-platform/entities';
import { ConfigModule } from '@nestjs/config';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsSubscriber } from './posts.subscriber';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useClass: ElasticsearchConfigService,
      imports: [ConfigModule.forRoot({ load: [backendConfig] })],
    }),
    MikroOrmModule.forFeature([PostEntity]),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsSubscriber],
})
export class PostsModule {}
