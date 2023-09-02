import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../utils/axios';

export const fetchMovies = createAsyncThunk('fetch-movies', async ({ page = 1, query = null }) => {
  if (query) {
    return axios.get('/search/movie/', {
      params: {
        page,
      },
    }).then(({ data }) => data);
  }
  return axios.get('/discover/movie/', {
    params: {
      page,
    },
  }).then(({ data }) => data);
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    fetchStatus: '',
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => ({
      ...state,
      movies: [
        ...state.movies.filter((item) => item.page !== action.payload.page),
        action.payload,
      ],
      totalPages: action.payload.total_pages,
      fetchStatus: 'success',
    })).addCase(fetchMovies.pending, (state) => ({
      ...state,
      fetchStatus: 'loading',
    })).addCase(fetchMovies.rejected, (state) => ({
      ...state,
      fetchStatus: 'error',
    }));
  },
});

export default moviesSlice;
