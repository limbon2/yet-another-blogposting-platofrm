import { ICreateRatingData, IUser, RatingEntity, UserEntity } from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, Type } from '@nestjs/common';

@Injectable()
export class RatingsService {
  constructor(private readonly em: EntityManager) {}

  public async createOrUpdateRating<T extends { id: string; rating: number; author?: IUser }>(
    entityClass: Type<T>,
    userId: string,
    entityId: string,
    data: ICreateRatingData
  ): Promise<T> {
    const [rater, entity, userRatings] = await Promise.all([
      this.em.findOne(UserEntity, { id: userId }),
      this.em.findOne(entityClass, { id: entityId }, { populate: ['author'] }),
      this.em.findOne(RatingEntity, { targetId: entityId, rater: { id: userId } }),
    ]);

    if (!rater || !entity) throw new BadRequestException();

    entity.rating = Number(entity.rating);
    entity.author.rating = Number(entity.author.rating);

    if (userRatings) {
      if (data.value === userRatings.value) {
        return entity;
      }

      if (data.value > userRatings.value) {
        entity.rating += 1;
        entity.author.rating += 1;
        userRatings.value += 1;
      }
      if (data.value < userRatings.value) {
        entity.rating -= 1;
        entity.author.rating -= 1;
        userRatings.value -= 1;
      }

      await this.em.upsert(RatingEntity, userRatings);
      await this.em.upsert(UserEntity, entity.author);
    } else {
      const rating = new RatingEntity();
      rating.value = data.value;
      rating.targetId = entityId;
      rating.rater = rater;

      this.em.create(RatingEntity, rating);
      entity.rating = entity.rating + rating.value;
      entity.author.rating += rating.value;
    }

    await this.em.upsert(entityClass, entity);
    await this.em.upsert(UserEntity, entity.author);
    await this.em.flush();

    return entity;
  }
}
