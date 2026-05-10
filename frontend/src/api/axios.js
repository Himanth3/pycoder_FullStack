import axios from 'axios';

// Spring Boot API base URL
// Local: http://localhost:8080/api/
// Production: set VITE_API_URL in Vercel environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/`
    : 'https://codeverse-backend-l122.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token to protected requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Spring Boot returns 'token'

    // Spring Boot public endpoints (no auth required)
    const isPublicEndpoint = config.url && (
      config.url.includes('auth/login') ||
      config.url.includes('auth/signup') ||
      config.url.includes('auth/register')
    );

    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor — handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
