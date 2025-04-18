import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  BoardType,
  CreateProjectType,
  CreateTaskItemType,
  CreateTasksBoardType,
  ProjectType, TaskItemType,
  UpdateTasksBoard,
} from '../types/taskType';
import { IAssignTask, ILoginUser, IRegistrationUser, IUser } from '../types/userType';
import { AuthResponse, CheckAuthResponse, RegistrationResponse } from '../types/AuthResponse';

class ToDoApi {
  private baseUrl: string | null = null;


  public setBaseUrl(baseUrl: string | null) {
    this.baseUrl = baseUrl;
  }
  private get http(): AxiosInstance {
    if (this.baseUrl === null) {
      throw new Error('baseUrl should be set');
    }

    const $api = axios.create({
      withCredentials: true,
      baseURL: this.baseUrl,
      // headers: {
      //   Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthcmJpdm55Y2hpeS52QGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlcyI6W3siaWQiOjIsInZhbHVlIjoiQURNSU4iLCJkZXNjcmlwdGlvbiI6IkFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMi0xMS0yNVQxMTowMDowOC41MjFaIiwidXBkYXRlZEF0IjoiMjAyMi0xMS0yNVQxMTowMDowOC41MjFaIiwiVXNlclJvbGVzIjp7ImlkIjoyLCJyb2xlSWQiOjIsInVzZXJJZCI6MX19LHsiaWQiOjEsInZhbHVlIjoiVVNFUiIsImRlc2NyaXB0aW9uIjoiVXNlciIsImNyZWF0ZWRBdCI6IjIwMjItMTEtMjVUMTA6NTk6NTQuNDQ3WiIsInVwZGF0ZWRBdCI6IjIwMjItMTEtMjVUMTA6NTk6NTQuNDQ3WiIsIlVzZXJSb2xlcyI6eyJpZCI6MSwicm9sZUlkIjoxLCJ1c2VySWQiOjF9fV0sImlhdCI6MTY3NjUzNzYxMiwiZXhwIjoxNjc2NjI0MDEyfQ.6VZKEeff-rTCH0pyKfGEBNtPkWO0-QG7ol2whTzr7Vo',
      // },
    });
    $api.interceptors.request.use((config) => {
      if (config && config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      }

      return config;
    });

    $api.interceptors.response.use((config) => {
      return config;
    }, async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;

        try {
          const response = await axios.get<AuthResponse>(`${this.baseUrl}/auth/refresh`, {withCredentials: true});
          localStorage.setItem('token', response.data.accessToken);

          return $api.request(originalRequest);
        } catch (e) {
          console.log('User unauthorized');
        }
      }
      throw error;
    });

    return $api;
  }

  get api() {
    return {
      auth: {
        login: (user: ILoginUser): Promise<AuthResponse> => this.http.post<AuthResponse>('auth/login', user)
          .then((loginUser: AxiosResponse<AuthResponse>) => loginUser.data),

        registration: (user: IRegistrationUser): Promise<RegistrationResponse> => this.http.post<RegistrationResponse>('auth/registration', user)
          .then((registrationUser: AxiosResponse<RegistrationResponse>) => registrationUser.data),

        logout: (): Promise<void> => this.http.post<void>('auth/logout')
          .then((response: AxiosResponse<void>) => response.data),

        checkAuth: (): Promise<CheckAuthResponse> => this.http.get<CheckAuthResponse>('auth/refresh')
          .then((response: AxiosResponse<CheckAuthResponse>) => response.data),
      },
      users: {
        getAllUsers: (): Promise<Array<IUser>> => this.http.get<Array<IUser>>(`users`)
          .then((project: AxiosResponse<Array<IUser>>) => project.data),

        updateUser: (updatedUser: IUser): Promise<any> => this.http.patch('users', updatedUser)
          .then((response: AxiosResponse<any>) => response.data),

        uploadFile: (data: any): Promise<IUser> => this.http.post<IUser>('users/upload', data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
          .then((response: AxiosResponse<IUser>) => response.data),

        assignTaskToUser: (assignTsk: IAssignTask): Promise<any> => this.http.post('users/task', assignTsk)
          .then((response: AxiosResponse<any>) => response.data)
      },
      project: {
        get: (projectId: string): Promise<ProjectType> => this.http.get<ProjectType>(`projects/${projectId}`)
          .then((project: AxiosResponse<ProjectType>) => project.data),

        getAll: (userId: number): Promise<Array<ProjectType>> => this.http.get<Array<ProjectType>>(`projects/all-projects/${userId}`)
          .then((project: AxiosResponse<Array<ProjectType>>) => project.data),

        delete: (projectId: string) => this.http.delete(`projects/${projectId}`)
          .then((res) => res.data),

        create: (project: CreateProjectType): Promise<ProjectType> => this.http.post<ProjectType>('projects', project)
          .then((res: AxiosResponse<ProjectType>) => res.data),
      },
      tasksBoard: {
        getAllPanelProject: (id: number): Promise<Array<BoardType>> => this.http.get<BoardType>(`tasks-board/all-panels/${id}`)
          .then((res: AxiosResponse<any>) => res.data),

        create: (newBoard: CreateTasksBoardType): Promise<BoardType> => this.http.post<BoardType>('tasks-board', newBoard)
          .then((res: AxiosResponse<BoardType>) => res.data),

        update: (updatedTasksBoard: UpdateTasksBoard): Promise<BoardType> => this.http.patch<BoardType>('tasks-board', updatedTasksBoard)
          .then((res: AxiosResponse<BoardType>) => res.data),

        updateOrder: (newOrder: Array<BoardType>): Promise<void> => this.http.patch('tasks-board/order-list/', newOrder)
          .then((res:AxiosResponse<void>) => res.data),

        delete: (id: string): Promise<void> => this.http.delete(`tasks-board/${id}`)
          .then((res: AxiosResponse<void>) => res.data),
      },
      taskItem: {
        create: (newTask: CreateTaskItemType): Promise<TaskItemType> => this.http.post<TaskItemType>('task-item', newTask)
          .then((res: AxiosResponse<TaskItemType>) => res.data),

        getTaskItem: (id: string): Promise<TaskItemType> => this.http.get(`task-item/${id}`)
          .then((res: AxiosResponse<TaskItemType>) => res.data),

        update: (updatedTaskItem: TaskItemType): Promise<TaskItemType> => this.http.patch('task-item', updatedTaskItem)
          .then((res: AxiosResponse<TaskItemType>) => res.data),

        updateOrder: (newItemOrder: BoardType): Promise<void> => this.http.patch(`task-item/order-list/${newItemOrder.id}`, newItemOrder)
          .then((res: AxiosResponse<void>) => res.data),

        delete: (id: string): Promise<void> => this.http.delete(`task-item/${id}`)
          .then((res: AxiosResponse<void>) => res.data),
      },
    };
  }
}

const toDoApi = new ToDoApi();

export default toDoApi;
