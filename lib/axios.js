import axios from 'axios';
import Cookies from 'js-cookie';

// No baseURL needed — API routes live on the same domain as the frontend
const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((config) => {
  const token = Cookies.get('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('adminToken');
      if (typeof window !== 'undefined') localStorage.removeItem('adminInfo');
    }
    return Promise.reject(error);
  }
);

export default API;
