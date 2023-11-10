import { IUser, UserEntity } from '@blogposting-platform/entities';
import { CanActivate, ExecutionContext, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Request } from 'express';
import { ROLE_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly em: EntityManager, private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as IUser;
    const roles = this.reflector.get(ROLE_KEY, context.getHandler());

    const foundUser = await this.em.findOne(UserEntity, { id: user.id, role: { $in: roles } });

    if (!foundUser) throw new MethodNotAllowedException();

    return true;
  }
}
