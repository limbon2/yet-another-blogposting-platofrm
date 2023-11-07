import { PostEntity } from './entities/post.entity';
import { UserEntity } from './entities/user.entity';

export * from './dto/user.dto';
export * from './dto/auth.dto';
export * from './dto/post.dto';

export * from './entities/user.entity';
export * from './entities/post.entity';

export * from './interface/user.interface';
export * from './interface/auth.interface';
export * from './interface/post.interface';

export const allEntities = [UserEntity, PostEntity];
