import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearchText: (state, action) => action.payload,
    clearSearchText: () => '',
  },
});

export const { setSearchText, clearSearchText } = searchSlice.actions;
export default searchSlice.reducer;
