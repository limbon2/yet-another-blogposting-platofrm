import { IUser } from './user.interface';

export interface IBannable {
  id: number;
  isBanned: boolean;
}

export interface IBan {
  id: number;
  reason: string;
  targetId: number;
  bannedBy: IUser;
  createdAt: Date;
}

export interface ICreateBanData {
  reason: string;
}
