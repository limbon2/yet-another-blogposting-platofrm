import { IUser } from './user.interface';

export interface IRating {
  id: number;
  value: number;
  targetId: number;
  createdAt: Date;
  updatedAt: Date;
  rater?: IUser;
}

export interface ICreateRatingData {
  value: number;
}
