import { IUser } from './user.interface';

export interface IRating {
  id: string;
  value: number;
  targetId: string;
  createdAt: Date;
  updatedAt: Date;
  rater?: IUser;
}

export interface ICreateRatingData {
  value: number;
}
