import { BanEntity } from './entities/ban.entity';
import { CommentEntity } from './entities/comment.entity';
import { FollowerEntity } from './entities/follower.entity';
import { PostEntity } from './entities/post.entity';
import { RatingEntity } from './entities/rating.entity';
import { ReportEntity } from './entities/report.entity';
import { TagEntity } from './entities/tag.entity';
import { UserEntity } from './entities/user.entity';

export * from './dto/user.dto';
export * from './dto/auth.dto';
export * from './dto/post.dto';
export * from './dto/comment.dto';
export * from './dto/rating.dto';
export * from './dto/follower.dto';
export * from './dto/tag.dto';
export * from './dto/report.dto';
export * from './dto/email.dto';
export * from './dto/ban.dto';

export * from './entities/user.entity';
export * from './entities/post.entity';
export * from './entities/comment.entity';
export * from './entities/rating.entity';
export * from './entities/follower.entity';
export * from './entities/tag.entity';
export * from './entities/report.entity';
export * from './entities/ban.entity';

export * from './interface/user.interface';
export * from './interface/auth.interface';
export * from './interface/post.interface';
export * from './interface/comment.interface';
export * from './interface/rating.interface';
export * from './interface/follower.interface';
export * from './interface/tag.interface';
export * from './interface/report.interface';
export * from './interface/email.interface';
export * from './interface/ban.interface';

export const allEntities = [
  UserEntity,
  PostEntity,
  CommentEntity,
  RatingEntity,
  FollowerEntity,
  TagEntity,
  ReportEntity,
  BanEntity,
];
