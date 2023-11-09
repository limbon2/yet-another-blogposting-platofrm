import { RatingEntity } from '@blogposting-platform/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';

@Module({
  imports: [MikroOrmModule.forFeature([RatingEntity])],
  providers: [RatingsService],
  exports: [RatingsService],
})
export class RatingsModule {}
