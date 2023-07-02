import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customer',
  initialState: [],
  reducers: {
    setCustomers: (state, action) => action.payload,
    addCustomer: (state, action) => {
      state.push(action.payload);
    },
    // editCustomer: (state, action) => {
    // TBD
    // },
  },
});

export const { setCustomers, addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
