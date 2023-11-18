import { BanEntity, IBannable, ICreateBanData, IUser, UserEntity } from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, Type } from '@nestjs/common';

@Injectable()
export class BansService {
  constructor(private readonly em: EntityManager) {}

  public async ban<T extends IBannable>(
    entityClass: Type<T>,
    user: IUser,
    targetId: number,
    data: ICreateBanData
  ): Promise<T> {
    const [entity, bannedBy, existingBan] = await Promise.all([
      this.em.findOne(entityClass, { id: targetId }),
      this.em.findOne(UserEntity, { id: user.id }),
      this.em.findOne(BanEntity, { targetId }),
    ]);

    if (!bannedBy || !entity) throw new BadRequestException();
    if (existingBan) return entity;

    const ban = new BanEntity();
    ban.reason = data.reason;
    ban.targetId = targetId;
    ban.bannedBy = bannedBy;

    this.em.create(BanEntity, ban);

    entity.isBanned = true;
    await this.em.upsert(entityClass, entity);

    await this.em.flush();

    return entity;
  }

  public async unban<T extends IBannable>(entityClass: Type<T>, targetId: number): Promise<T> {
    const [entity, ban] = await Promise.all([
      this.em.findOne(entityClass, { id: targetId }),
      this.em.findOne(BanEntity, { targetId }),
    ]);

    if (!ban || !entity) throw new BadRequestException();

    entity.isBanned = false;
    await this.em.upsert(entityClass, entity);

    this.em.remove(ban);
    await this.em.flush();

    return entity;
  }
}
