
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1'; // Change to your backend URL

// Create axios instance with default configs
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to refresh token or logout
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        const response = await axios.post(
          `${API_URL}/auth/refresh-token`,
          { refreshToken, userType: 'user' },
          { withCredentials: true }
        );
        
        const { accessToken } = response.data.data;
        
        // Update localStorage and token header
        localStorage.setItem('accessToken', accessToken);
        
        // Retry the original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        // If refresh fails, log user out
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Redirect to login page
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API calls
export const registerUser = (userData) => {
  return api.post('/auth/register-user', userData);
};

export const loginUser = (credentials) => {
  return api.post('/auth/login-user', credentials);
};

export const logoutUser = () => {
  return api.post('/auth/logout-user');
};

// Transaction API calls
export const sendETH = (transactionData) => {
  return api.post('/transaction/send-eth', transactionData);
};

export const getTransactionHistory = () => {
  return api.get('/transaction/history');
};

export const getWalletBalance = () => {
  return api.get('/transaction/balance');
};

export default api;
