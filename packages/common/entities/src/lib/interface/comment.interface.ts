import { IPost } from './post.interface';
import { IUser } from './user.interface';

export interface IComment {
  id: string;
  content: string;
  author?: IUser;
  post?: IPost;
  createdAt: Date;
  updatedAt: Date;
}
