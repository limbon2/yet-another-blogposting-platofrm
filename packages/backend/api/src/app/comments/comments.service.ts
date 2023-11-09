import {
  CommentEntity,
  IComment,
  ICreateCommentData,
  ICreateRatingData,
  IUser,
  PostEntity,
  UserEntity,
} from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RatingsService } from '../ratings/ratings.service';

@Injectable()
export class CommentsService {
  constructor(private readonly em: EntityManager, private readonly ratingService: RatingsService) {}

  public async findByPost(postId: string, offset?: number, count?: number): Promise<IComment[]> {
    return this.em.find(CommentEntity, { post: { id: postId } }, { offset, limit: count });
  }

  public async findByAuthor(authorId: string, offset?: number, count?: number): Promise<IComment[]> {
    return this.em.find(CommentEntity, { author: { id: authorId } }, { offset, limit: count });
  }

  public async create(user: IUser, postId: string, data: ICreateCommentData): Promise<IComment> {
    const [author, post] = await Promise.all([
      this.em.findOne(UserEntity, { id: user.id }),
      this.em.findOne(PostEntity, { id: postId }),
    ]);

    if (!author || !post) throw new BadRequestException();

    const comment = new CommentEntity();
    comment.content = data.content;
    comment.author = author;
    comment.post = post;

    this.em.create(CommentEntity, comment);
    await this.em.flush();

    return comment;
  }

  public async rate(user: IUser, commentId: string, data: ICreateRatingData): Promise<IComment> {
    return this.ratingService.createOrUpdateRating(CommentEntity, user.id, commentId, data);
  }
}
