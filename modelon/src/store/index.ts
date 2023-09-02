import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import customersReducer from './slices/customersSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    customers: customersReducer,
  },
});

export type AppStore = {
  search: ReturnType<typeof searchReducer>;
  customer: ReturnType<typeof customersReducer>;
};
export type AppDispatch = typeof store.dispatch;
export default store;
