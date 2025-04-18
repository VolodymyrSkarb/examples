import { ProjectType } from './taskType';

export interface IUser {
  id: number,
  email: string,
  activationLink: string,
  firstName: string,
  lastName: string,
  isActivated: boolean,
  tasksBoardId?: string,
  projects: Array<ProjectType>,
  roles: Array<IRole>,
  position: string,
  image: string,
}

export interface ILoginUser {
  email: string,
  password: string,
}

export interface IRegistrationUser {
  email: string,
  password: string,
}

export interface UserState {
  user: IUser | null;
  loading: boolean;
  isAuth: boolean;
  error: null | string;
}

export interface IRole {
  id: number;
  description: string;
  value: string;
}

export interface ICreatorUser {
  email: string;
  firstName: string;
  lastName: string;
  position: string;
  photo: string;
}

export interface IAssignTask {
  taskItemId: string;
  userId: number;
}