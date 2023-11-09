import { ICreateRatingData, RatingEntity, UserEntity } from '@blogposting-platform/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, Type } from '@nestjs/common';

@Injectable()
export class RatingsService {
  constructor(private readonly em: EntityManager) {}

  public async createOrUpdateRating<T extends { rating: number }>(
    entityClass: Type<T>,
    userId: string,
    entityId: string,
    data: ICreateRatingData
  ): Promise<T> {
    const [rater, entity, userRatings] = await Promise.all([
      this.em.findOne(UserEntity, { id: userId }),
      this.em.findOne(entityClass, { id: entityId }),
      this.em.findOne(RatingEntity, { targetId: entityId, rater: { id: userId } }),
    ]);

    if (!rater || !entity) throw new BadRequestException();

    entity.rating = Number(entity.rating);

    if (userRatings) {
      if (data.value > userRatings.value) {
        entity.rating = entity.rating + 1;
      }
      if (data.value < userRatings.value) {
        entity.rating = entity.rating - 1;
      }

      userRatings.value = data.value;
      await this.em.upsert(RatingEntity, userRatings);
    } else {
      const rating = new RatingEntity();
      rating.value = data.value;
      rating.targetId = entityId;
      rating.rater = rater;

      this.em.create(RatingEntity, rating);
      entity.rating = entity.rating + rating.value;
    }

    await this.em.upsert(entityClass, entity);
    await this.em.flush();

    return entity;
  }
}
