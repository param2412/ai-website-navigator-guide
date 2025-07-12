import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  getProfile: () =>
    api.get('/auth/profile'),
  
  updatePreferences: (data: any) =>
    api.put('/auth/preferences', data),
};

// Tools API
export const toolsAPI = {
  getAll: (params?: { category?: string; search?: string; pricing?: string; difficulty?: string }) =>
    api.get('/tools', { params }),
  
  getById: (id: string) =>
    api.get(`/tools/${id}`),
  
  getByCategory: (category: string) =>
    api.get(`/tools/category/${category}`),
};

// Workflows API
export const workflowsAPI = {
  getAll: (params?: { category?: string; difficulty?: string; websiteType?: string }) =>
    api.get('/workflows', { params }),
  
  getById: (id: string) =>
    api.get(`/workflows/${id}`),
  
  generate: (preferences: any) =>
    api.post('/workflows/generate', preferences),
  
  updateProgress: (id: string, stepId: string, completed: boolean) =>
    api.post(`/workflows/${id}/progress`, { stepId, completed }),
    
  saveWorkflow: (workflowData: any) =>
    api.post('/users/workflows', workflowData),
};

// Users API
export const usersAPI = {
  getWorkflows: () =>
    api.get('/users/workflows'),
  
  updateProfile: (data: { name: string; email: string; bio?: string; company?: string; website?: string }) =>
    api.put('/users/profile', data),
  
  deleteAccount: () =>
    api.delete('/users/account'),
};

export default api;
