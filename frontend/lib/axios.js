import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = Cookies.get('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle global errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('adminToken');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminInfo');
      }
    }
    return Promise.reject(error);
  }
);

export default API;
