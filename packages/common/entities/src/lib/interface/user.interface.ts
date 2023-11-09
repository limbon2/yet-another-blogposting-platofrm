import { IPost } from './post.interface';

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  code?: string;
  createdAt: Date;
  updatedAt: Date;
  posts?: IPost[];
}
