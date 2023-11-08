import { IUser } from './user.interface';

export interface IFollower {
  id: string;
  user: IUser;
  lead: IUser;
  createdAt: Date;
}
