import axios from 'axios';

// Spring Boot API base URL
// Local: http://localhost:8080/api/
// Production: set VITE_API_URL in Vercel environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/`
    : 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token to protected requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access'); // Use 'access' instead of 'token'

    // Spring Boot public endpoints (no auth required)
    const isPublicEndpoint = config.url && (
      config.url.includes('token/') ||
      config.url.includes('register/')
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
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
