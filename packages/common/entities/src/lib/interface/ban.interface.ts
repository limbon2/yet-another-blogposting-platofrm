import { IUser } from './user.interface';

export interface IBannable {
  id: string;
  isBanned: boolean;
}

export interface IBan {
  id: string;
  reason: string;
  targetId: string;
  bannedBy: IUser;
  createdAt: Date;
}

export interface ICreateBanData {
  reason: string;
}
