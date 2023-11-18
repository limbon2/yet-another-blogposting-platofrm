import { IBan, IBannable } from './ban.interface';
import { ICommunity } from './community.interface';
import { IReport } from './report.interface';
import { ITag } from './tag.interface';
import { IUser } from './user.interface';

export interface IPost extends IBannable {
  id: number;
  title: string;
  slug: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  tags: ITag[];
  author?: IUser;
  reports?: IReport[];
  ban?: IBan;
  community?: ICommunity;
}

export interface ICreatePostData {
  title: string;
  content: string;
  tags: string[];
  communityId?: number | null;
}
