import { IPost } from './post.interface';

export interface ITag {
  id: string;
  name: string;
  createdAt: Date;
  posts?: IPost[];
}
