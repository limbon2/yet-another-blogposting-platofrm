import { IUser } from './user.interface';

export interface IAuthUser {
  accessToken: string;
  user: IUser;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData {
  username: string;
  email: string;
  password: string;
}
