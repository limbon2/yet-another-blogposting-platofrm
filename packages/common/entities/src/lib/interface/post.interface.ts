import { IBan, IBannable } from './ban.interface';
import { IReport } from './report.interface';
import { ITag } from './tag.interface';
import { IUser } from './user.interface';

export type IPost = IBannable & {
  id: string;
  title: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  tags: ITag[];
  author?: IUser;
  reports?: IReport[];
  ban?: IBan;
};

export interface ICreatePostData {
  title: string;
  content: string;
  tags: string[];
}
