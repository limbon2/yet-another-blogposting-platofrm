import { IPost } from './post.interface';

export interface ITag {
  id: number;
  name: string;
  createdAt: Date;
  posts?: IPost[];
}
