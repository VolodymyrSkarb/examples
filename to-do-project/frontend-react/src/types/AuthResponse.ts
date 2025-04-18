import { IUser } from './userType';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  activeUser: IUser;
}

export interface RegistrationResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface CheckAuthResponse {
  accessToken: string;
  refreshToken: string;
  updateUserWithToken: IUser;
}