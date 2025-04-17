export interface ISignUpType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface IUserUpdateType {
  firstName: string;
  lastName: string;
  imageUuid: string | null;
}
