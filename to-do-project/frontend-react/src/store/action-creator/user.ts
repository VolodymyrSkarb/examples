import { IUser } from '../../types/userType';
import ApiService from '../../api';
import { AppDispatch } from '../reducers';
import {UserSlice} from '../reducers/userReducer';

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(UserSlice.actions.userFetching());
    const response = await ApiService.login(email, password);
    localStorage.setItem('token', response.accessToken);
    dispatch(UserSlice.actions.userFetchingSuccess(response.activeUser));
  } catch (e) {
    dispatch(UserSlice.actions.userFetchingError((e as Error).message));
  }
};

export const registrationUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(UserSlice.actions.userFetching());
    const response = await ApiService.registration(email, password);
    localStorage.setItem('token', response.accessToken);
    dispatch(UserSlice.actions.userFetchingSuccess(response.user));
  } catch (e) {
    dispatch(UserSlice.actions.userFetchingError((e as Error).message));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(UserSlice.actions.userFetching());
    await ApiService.logout();
    localStorage.removeItem('token');
    dispatch(UserSlice.actions.userLogout());
  } catch (e) {
    dispatch(UserSlice.actions.userFetchingError((e as Error).message));
  }
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(UserSlice.actions.userFetching());
    const response = await ApiService.checkAuth();
    localStorage.setItem('token', response.accessToken);
    dispatch(UserSlice.actions.userFetchingSuccess(response.updateUserWithToken));
  } catch (e) {
    dispatch(UserSlice.actions.userFetchingError((e as Error).message));
  }
};

export const updateUser = (user: IUser) => async (dispatch: AppDispatch) => {
  try {
    dispatch(UserSlice.actions.userUpdate(user));
  } catch (e) {
    dispatch(UserSlice.actions.userFetchingError((e as Error).message));
  }
};