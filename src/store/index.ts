import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export type AppStore = {
  search: ReturnType<typeof searchReducer>;
};
export type AppDispatch = typeof store.dispatch;
export default store;
