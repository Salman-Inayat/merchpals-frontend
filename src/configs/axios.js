import axios from 'axios';
import { baseURL } from './const';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = localStorage.getItem('MERCHPAL_AUTH_TOKEN');
    return config;
  },
  null,
  { synchronous: true },
);

export default axiosInstance;
