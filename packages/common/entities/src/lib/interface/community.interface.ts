import { IPost } from './post.interface';
import { IUser } from './user.interface';

export interface ICommunity {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  creator: IUser;
  moderators?: IUser[];
  posts?: IPost[];
  moderatedCommunities?: ICommunity[];
}

export interface ICreateCommunityData {
  name: string;
}
