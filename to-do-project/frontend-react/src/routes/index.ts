import React from 'react';
import AuthorizationComponent from '../components/AuthorizationComponent/AuthorizationComponent';
import ProjectsListComponent from '../components/ProjectsListComponent/ProjectsListComponent';
import ProjectComponent from '../components/ProjectComponent/ProjectComponent/ProjectComponent';
import AddProjectComponent from '../components/AddProjectComponent/AddProjectComponent';
import DashboardComponent from '../components/DashboardComponent/DashboardComponent';
import TaskItemComponent from '../components/ProjectComponent/TaskComponent/TaskItemComponent/TaskItemComponent';
import UserProfileComponent from '../components/UserProfileComponent/UserProfileComponent';
import ProjectProfileComponent from '../components/ProjectProfileComponent/ProjectProfileComponent';

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export enum RouteNames {
  MAIN = '/',
  LOGIN = 'auth',
  PROJECTS = 'projects',
  PROJECT_ITEM = 'projects/:id',
  ADD_PROJECT = 'projects/add-project',
  TASK_ITEM = 'projects/:id/task/:taskId',
  USER_PROFILE = 'profile',
  PROJECT_PROFILE = 'projects/:id/profile',
}

export const privateRoutes: IRoute[] = [
  {path: RouteNames.PROJECTS, component: ProjectsListComponent},
  {path: RouteNames.PROJECT_ITEM, component: ProjectComponent},
  {path: RouteNames.ADD_PROJECT, component: AddProjectComponent},
  {path: RouteNames.MAIN, component: DashboardComponent},
  {path: RouteNames.TASK_ITEM, component: TaskItemComponent},
  {path: RouteNames.USER_PROFILE, component: UserProfileComponent},
  {path: RouteNames.PROJECT_PROFILE, component: ProjectProfileComponent},
];

export const publicRoutes: IRoute[] = [
  {path: RouteNames.LOGIN, component: AuthorizationComponent}
];