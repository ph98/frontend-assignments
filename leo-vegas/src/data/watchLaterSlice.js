import { createSlice } from '@reduxjs/toolkit';

const watchLaterSlice = createSlice({
  name: 'watch-later',
  initialState: {
    watchLaterMovies: [],
  },
  reducers: {
    addToWatchLater: (state, action) => ({
      ...state,
      watchLaterMovies: [action.payload, ...state.watchLaterMovies],
    }),
    removeFromWatchLater: (state, action) => {
      const indexOfId = state.watchLaterMovies.findIndex((key) => key.id === action.payload.id);
      const updatedWatchLaterMovies = [...state.watchLaterMovies];
      updatedWatchLaterMovies.splice(indexOfId, 1);

      return {
        ...state,
        watchLaterMovies: updatedWatchLaterMovies,
      };
    },
    removeAllWatchLater: (state) => ({
      ...state,
      watchLaterMovies: [],
    }),
  },
});

export default watchLaterSlice;
