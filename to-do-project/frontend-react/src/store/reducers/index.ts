import {combineReducers} from 'redux';
import userReducer from './userReducer';
import projectsReducer from './projectsReducer';
import { setupStore } from '../index';

export const rootReducer = combineReducers({
  projectsReducer,
  userReducer
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']