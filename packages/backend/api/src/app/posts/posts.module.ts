import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService, backendConfig } from '@blogposting-platform/config';
import { PostEntity } from '@blogposting-platform/entities';
import { ConfigModule } from '@nestjs/config';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsSubscriber } from './posts.subscriber';
import { EmailModule } from '../emails/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RatingsModule } from '../ratings/ratings.module';
import { ReportModule } from '../reports/report.module';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useClass: ElasticsearchConfigService,
      imports: [ConfigModule.forRoot({ load: [backendConfig] })],
    }),
    MikroOrmModule.forFeature([PostEntity]),
    EmailModule,
    ScheduleModule.forRoot(),
    RatingsModule,
    ReportModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsSubscriber],
})
export class PostsModule {}
