import { configureStore } from '@reduxjs/toolkit';
import articleReducer from '../features/articles/articleSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    articles: articleReducer,
    user: userReducer,
  },
});

