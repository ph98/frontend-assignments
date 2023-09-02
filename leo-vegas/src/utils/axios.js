import axios from 'axios';
import { API_KEY } from '../constants';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

axiosInstance.interceptors.request.use((config) => ({
  ...config,
  params: {
    api_key: API_KEY,
    ...config.params,
  },
}));

export default axiosInstance;
