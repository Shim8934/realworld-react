import { configureStore } from '@reduxjs/toolkit';

import articleReducer from '../features/articles/articleSlice';
import userReducer from '../features/users/userSlice';

const store = configureStore({
  reducer: {
    articles: articleReducer,
    user: userReducer,
  },

});

export default store;