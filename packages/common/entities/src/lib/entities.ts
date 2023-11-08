import { CommentEntity } from './entities/comment.entity';
import { PostEntity } from './entities/post.entity';
import { RatingEntity } from './entities/rating.entity';
import { UserEntity } from './entities/user.entity';

export * from './dto/user.dto';
export * from './dto/auth.dto';
export * from './dto/post.dto';
export * from './dto/comment.dto';
export * from './dto/rating.dto';

export * from './entities/user.entity';
export * from './entities/post.entity';
export * from './entities/comment.entity';
export * from './entities/rating.entity';

export * from './interface/user.interface';
export * from './interface/auth.interface';
export * from './interface/post.interface';
export * from './interface/comment.interface';
export * from './interface/rating.interface';

export const allEntities = [UserEntity, PostEntity, CommentEntity, RatingEntity];
