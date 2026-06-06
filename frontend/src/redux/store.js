import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import userReducer from './users/user.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer
  },
});

export default store;
