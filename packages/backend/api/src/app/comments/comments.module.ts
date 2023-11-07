import { Module } from '@nestjs/common';
import { CommentEntity } from '@blogposting-platform/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostCommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [MikroOrmModule.forFeature([CommentEntity])],
  controllers: [PostCommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
