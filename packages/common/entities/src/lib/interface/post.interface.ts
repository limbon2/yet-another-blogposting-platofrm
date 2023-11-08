import { ITag } from './tag.interface';
import { IUser } from './user.interface';

export interface IPost {
  id: string;
  title: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  tags: ITag[];
  author?: IUser;
}

export interface ICreatePostData {
  title: string;
  content: string;
  tags: string[];
}
