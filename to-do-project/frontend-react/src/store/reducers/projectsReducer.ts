import { ProjectsState, ProjectType } from '../../types/taskType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ProjectsState = {
  projects: null,
  loading: false,
  error: null,
};

export const ProjectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    projectsFetching(state) {
      state.loading = true;
    },
    projectsSuccess(state, action: PayloadAction<ProjectType[]>) {
      state.loading = false;
      state.projects = action.payload;
      state.error = null;
    },
    projectsFetchingError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.projects = null;
    },
    projectsUpdate(state, action: PayloadAction<ProjectType[]>) {
      state.loading = false;
      state.projects = action.payload;
      state.error = null;
    }
  }
});

export default ProjectSlice.reducer;