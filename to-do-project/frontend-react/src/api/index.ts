import toDoApi from './api';
import { AuthResponse, CheckAuthResponse, RegistrationResponse } from '../types/AuthResponse';
import {
  BoardType,
  CreateProjectType, CreateTaskItemType,
  CreateTasksBoardType,
  ProjectType,
  TaskItemType,
  UpdateTasksBoard,
} from '../types/taskType';
import { IAssignTask, IUser } from '../types/userType';

export default class ApiService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    return toDoApi.api.auth.login({email, password});
  }

  static async registration(email: string, password: string): Promise<RegistrationResponse> {
    return toDoApi.api.auth.registration({email, password});
  }

  static async logout(): Promise<void> {
    return toDoApi.api.auth.logout();
  }

  static async checkAuth(): Promise<CheckAuthResponse> {
    return toDoApi.api.auth.checkAuth();
  }

  static async updateUserInfo(updatedUser: IUser): Promise<any> {
    return toDoApi.api.users.updateUser(updatedUser);
  }

  static async uploadUserAvatar(data: any): Promise<IUser> {
    return toDoApi.api.users.uploadFile(data);
  }

  static async getAllUsers(): Promise<Array<IUser>> {
    return toDoApi.api.users.getAllUsers();
  }

  static async assignTaskToUser(data: IAssignTask): Promise<any> {
    return toDoApi.api.users.assignTaskToUser(data);
  }

  static async loadProjectById(id: string): Promise<ProjectType> {
    return toDoApi.api.project.get(id);
  }

  static async createProject(project: CreateProjectType): Promise<ProjectType> {
    return toDoApi.api.project.create(project);
  }

  static async deleteProject(projectId: string): Promise<any> {
    return toDoApi.api.project.delete(projectId);
  }

  static async getAllProject(userId: number): Promise<Array<ProjectType>> {
    return toDoApi.api.project.getAll(userId);
  }

  static async getAllTasksPanelsByProject(projectId: number): Promise<Array<BoardType>> {
    return toDoApi.api.tasksBoard.getAllPanelProject(projectId);
  }

  static async createTasksBoard(newBoard: CreateTasksBoardType): Promise<BoardType> {
    return toDoApi.api.tasksBoard.create(newBoard);
  }

  static async updateTasksBoard(updatedBoard: UpdateTasksBoard): Promise<BoardType> {
    return toDoApi.api.tasksBoard.update(updatedBoard);
  }

  static async updateOrderTasksBoard(updatedBoard: Array<BoardType>): Promise<void> {
    return toDoApi.api.tasksBoard.updateOrder(updatedBoard);
  }

  static async deleteTasksBoard(boardId: string): Promise<void> {
    return toDoApi.api.tasksBoard.delete(boardId);
  }

  static async createTaskItem(newTask: CreateTaskItemType): Promise<TaskItemType> {
    return toDoApi.api.taskItem.create(newTask);
  }

  static async getTaskItemById(id: string): Promise<TaskItemType> {
    return toDoApi.api.taskItem.getTaskItem(id);
  }

  static async updateTaskItem(updatedTaskItem: TaskItemType): Promise<TaskItemType> {
    return toDoApi.api.taskItem.update(updatedTaskItem);
  }

  static async updateOrderTaskItem(updatedTaskItem: BoardType): Promise<void> {
    return toDoApi.api.taskItem.updateOrder(updatedTaskItem);
  }

  static async deleteTaskItem(taskId: string): Promise<void> {
    return toDoApi.api.taskItem.delete(taskId);
  }
}