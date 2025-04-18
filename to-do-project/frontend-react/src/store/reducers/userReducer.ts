import { IUser, UserState } from '../../types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  user: null,
  loading: false,
  isAuth: false,
  error: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetching(state) {
      state.loading = true;
    },
    userFetchingSuccess(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuth = true;
      state.error = '';
      state.loading = false;
    },
    userFetchingError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
      state.user = null;
    },
    userLogout(state) {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.isAuth = false;
    },
    userUpdate(state, action: PayloadAction<IUser>) {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuth = true;
    },
  }
});

export default UserSlice.reducer;