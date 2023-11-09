import { Module } from '@nestjs/common';
import { CommentEntity } from '@blogposting-platform/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthorCommentsController, PostCommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { RatingsModule } from '../ratings/ratings.module';

@Module({
  imports: [MikroOrmModule.forFeature([CommentEntity]), RatingsModule],
  controllers: [PostCommentsController, AuthorCommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
