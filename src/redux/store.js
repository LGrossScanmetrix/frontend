import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workspaceReducer from './slices/workspaceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer,
  },
});

export default store;
