import { IUser, UserEntity } from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { CanActivate, ExecutionContext, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IsPostAuthorGuard implements CanActivate {
  constructor(private em: EntityManager) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const auth: IUser = request.user as IUser;
    const postId: string = request.params['postId'];

    const user = await this.em.findOne(
      UserEntity,
      {
        id: auth.id,
        posts: { id: postId, author: { id: auth.id } },
      },
      { populate: ['posts'] }
    );

    if (!user) throw new MethodNotAllowedException();

    return true;
  }
}
