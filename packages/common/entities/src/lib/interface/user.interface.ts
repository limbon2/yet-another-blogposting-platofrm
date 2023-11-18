import { IPost } from './post.interface';

export enum UserRole {
  Admin = 'admin',
  Moderator = 'moderator',
  User = 'user',
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;
  rating: number;
  role: UserRole;
  code?: string;
  createdAt: Date;
  updatedAt: Date;
  posts?: IPost[];
}
