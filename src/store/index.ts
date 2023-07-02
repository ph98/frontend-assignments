import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import customerReducer from './slices/customerSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    customer: customerReducer,
  },
});

export type AppStore = {
  search: ReturnType<typeof searchReducer>;
  customer: ReturnType<typeof customerReducer>;
};
export type AppDispatch = typeof store.dispatch;
export default store;
