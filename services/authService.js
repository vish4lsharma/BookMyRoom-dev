import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from './api';

const AUTH_TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

export const authService = {
  // Store auth token
  setToken: async (token) => {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  },

  // Get auth token
  getToken: async () => {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Store user data
  setUser: async (user) => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error storing user:', error);
    }
  },

  // Get user data
  getUser: async () => {
    try {
      const userStr = await AsyncStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Clear auth data
  clearAuth: async () => {
    try {
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_KEY]);
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    const token = await authService.getToken();
    return !!token;
  },

  // Login with OTP
  loginWithOTP: async (phone, otp) => {
    try {
      const response = await authAPI.verifyOTP(phone, otp);
      if (response.success && response.token) {
        await authService.setToken(response.token);
        await authService.setUser(response.user);
        return response;
      }
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      throw error;
    }
  },

  // Login with username/email and password
  login: async (username, password) => {
    try {
      const response = await authAPI.login(username, password);
      if (response.success && response.token) {
        await authService.setToken(response.token);
        await authService.setUser(response.user);
        return response;
      }
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.success && response.token) {
        await authService.setToken(response.token);
        await authService.setUser(response.user);
        return response;
      }
      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: async () => {
    await authService.clearAuth();
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const user = await authService.getUser();
      if (user) {
        // Refresh user data from API
        const response = await authAPI.getMe();
        if (response.success) {
          await authService.setUser(response.user);
          return response.user;
        }
      }
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return await authService.getUser();
    }
  },
};

export default authService;

