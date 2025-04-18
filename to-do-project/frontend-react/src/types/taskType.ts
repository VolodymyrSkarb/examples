import { ICreatorUser, IUser } from './userType';

export interface TaskItemType {
  id: string,
  name: string,
  description: string,
  positionId: number,
  tasksBoardId: string,
  tasksBoard: BoardType,
  createdAt: string,
  updatedAt: string,
  creatorUser: ICreatorUser,
  updatedUser: ICreatorUser,
  updatedUserId: number,
  users: Array<IUser>,
}

export interface BoardType {
  id: string,
  name: string,
  description: string,
  projectId: number,
  taskItem: Array<TaskItemType>,
  project: ProjectType,
}

export interface ProjectType {
  id: string,
  name: string,
  description: string,
  tasksBoard: Array<BoardType>,
}

export interface CreateProjectType {
  name: string,
  description: string,
  createdUserId: number,
}

export interface CreateTasksBoardType {
  name: string,
  projectId: number | string,
}

export interface UpdateTasksBoard {
  name: string,
  id: number | string,
}

export interface CreateTaskItemType {
  name: string,
  description: string,
  tasksBoardId: string | number,
  creatorUserId: string | number,
}

export interface ICreateTaskFormField {
  nameField: string,
  descriptionField: string,
}

export interface IAuthForm {
  emailField: string,
  passwordField: string,
}

export interface IRegistrationForm {
  emailField: string,
  passwordField: string,
  confirmPasswordField: string,
}

export interface ICreateProject {
  nameField: string,
  descriptionField: string,
}

export interface ICreatePanelFormField {
  nameField: string,
}

export enum EModalTypes {
  ADD_TASK_MODE = 'Add Task',
  EDIT_TASK_MODE = 'Edit Task',
  DELETE_TASK_MODE = 'Delete Task',
  ADD_PANEL_MODE = 'Add Panel',
  RENAME_PANEL_MODE = 'Rename Panel',
  DELETE_PANEL_MODE = 'Delete Panel',
}

export interface ProjectsState {
  projects: Array<ProjectType> | null;
  loading: boolean;
  error: null | string;
}