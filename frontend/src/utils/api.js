import axios from 'axios';

const API_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateBackground: (background) => api.put('/user/background', { background }),
  updateBranch: (branch) => api.put('/user/branch', { branch }),
  updateDomains: (domains) => api.put('/user/domains', { domains }),
};

// Progress APIs
export const progressAPI = {
  getAllProgress: () => api.get('/progress'),
  getProgress: (domain) => api.get(`/progress/${domain}`),
  updateProgress: (data) => api.post('/progress', data),
};

// Quiz APIs
export const quizAPI = {
  getQuiz: (domain, topic) => api.get(`/quiz/${domain}/${topic}`),
  submitQuiz: (data) => api.post('/quiz/submit', data),
  getResults: () => api.get('/quiz/results/all'),
  getResultById: (id) => api.get(`/quiz/results/${id}`),
};

export default api;
