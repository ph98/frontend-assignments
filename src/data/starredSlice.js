import { createSlice } from '@reduxjs/toolkit';

const starredSlice = createSlice({
  name: 'starred',
  initialState: {
    starredMovies: [],
  },
  reducers: {
    starMovie: (state, action) => ({
      ...state,
      starredMovies: [action.payload, ...state.starredMovies],
    }),
    unstarMovie: (state, action) => {
      const indexOfId = state.starredMovies.findIndex((key) => key.id === action.payload.id);
      const updatedStarredMovies = [...state.starredMovies];
      updatedStarredMovies.splice(indexOfId, 1);

      return {
        ...state,
        starredMovies: updatedStarredMovies,
      };
    },
    clearAllStarred: (state) => ({
      ...state,
      starredMovies: [],
    }),
  },

});

export default starredSlice;
