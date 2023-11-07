import {
  CommentEntity,
  IComment,
  ICreateCommentData,
  IUser,
  PostEntity,
  UserEntity,
} from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  constructor(private readonly em: EntityManager) {}

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
}
