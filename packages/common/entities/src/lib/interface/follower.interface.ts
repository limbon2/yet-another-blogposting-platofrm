import { IUser } from './user.interface';

export interface IFollower {
  id: number;
  user: IUser;
  lead: IUser;
  createdAt: Date;
}
