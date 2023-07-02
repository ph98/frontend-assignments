import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    status: 'idle',
    data: [],
    selectedCustomer: null,
  },
  reducers: {
    setCustomers: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    setStatus: (state, action) => ({
      ...state,
      status: action.payload,
    }),
    setSelected: (state, action) => ({
      ...state,
      selectedCustomer: action.payload,
    }),
  },
});

export const { setCustomers, setStatus, setSelected } = customerSlice.actions;
export default customerSlice.reducer;
