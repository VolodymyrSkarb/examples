import ApiService from '../../api';
import { AppDispatch } from '../reducers';
import { ProjectSlice } from '../reducers/projectsReducer';

export const getAllUserProjects = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(ProjectSlice.actions.projectsFetching());
    const response = await ApiService.getAllProject(userId);
    dispatch(ProjectSlice.actions.projectsSuccess(response));
  } catch (e) {
    dispatch(ProjectSlice.actions.projectsFetchingError((e as Error).message));
  }
};

// So far, the logic is the same as getAllUserProjects. Perhaps something will change in the future.
export const updateUserProject = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(ProjectSlice.actions.projectsFetching());
    const response = await ApiService.getAllProject(userId);
    dispatch(ProjectSlice.actions.projectsSuccess(response));
  } catch (e) {
    dispatch(ProjectSlice.actions.projectsFetchingError((e as Error).message));
  }
};