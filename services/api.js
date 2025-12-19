import { Platform } from 'react-native';

// API Configuration
// For Android emulator, use: http://10.0.2.2:3001/api
// For iOS simulator, use: http://localhost:3001/api
// For physical device, use your computer's IP: http://YOUR_IP:3001/api
const getLocalIP = () => {
  // Update this to your computer's local IP address for physical devices
  // Find your IP: Windows: ipconfig | Mac/Linux: ifconfig
  // Look for IPv4 Address under your active network adapter
  return '10.28.206.135'; // Change this to your actual IP
};

// For physical devices, we need to detect differently
// In development, if running on physical device, use computer's IP
// For emulator/simulator, use special IPs (10.0.2.2 for Android, localhost for iOS)

// Smart API URL detection
// For physical devices: Use your computer's IP (update getLocalIP() above)
// For emulators: Use special IPs
// For web: Use localhost
const API_BASE_URL = __DEV__ 
  ? (Platform.OS === 'android' 
      ? 'http://10.0.2.2:3001/api'  // Android emulator (change to getLocalIP() for physical device)
      : (Platform.OS === 'ios'
          ? 'http://localhost:3001/api'  // iOS simulator (change to getLocalIP() for physical device)
          : 'http://localhost:3001/api'))  // Web
  : 'https://your-production-api.com/api';

// NOTE: For physical devices, uncomment and use:
// const API_BASE_URL = __DEV__ 
//   ? `http://${getLocalIP()}:3001/api`
//   : 'https://your-production-api.com/api';

// Log API URL for debugging
if (__DEV__) {
  console.log('🔗 API Base URL:', API_BASE_URL);
  console.log('📱 Platform:', Platform.OS);
}

// Get auth token from storage
const getAuthToken = async () => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    return null;
  }
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = await getAuthToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body);
    }

    const url = `${API_BASE_URL}${endpoint}`;
    console.log('API Request:', url, config.method || 'GET');
    
    const response = await fetch(url, config);
    
    // Check if response is ok before trying to parse JSON
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || `HTTP ${response.status}: ${response.statusText}`);
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    // Provide more helpful error messages
    if (error.message && (error.message.includes('Network request failed') || error.message.includes('Failed to fetch'))) {
      const deviceType = Platform.OS === 'android' ? 'Android emulator' : 'iOS simulator/device';
      throw new Error(`Cannot connect to server (${deviceType}).\n\nPlease check:\n1. Backend server is running on port 3001\n2. For physical device: Update API URL with your computer's IP\n3. Both devices on same WiFi network\n\nSee API_SETUP.md for details.`);
    }
    throw error;
  }
};

// Auth API
export const authAPI = {
  sendOTP: (phone) => apiRequest('/auth/send-otp', {
    method: 'POST',
    body: { phone },
  }),

  verifyOTP: (phone, otp) => apiRequest('/auth/verify-otp', {
    method: 'POST',
    body: { phone, otp },
  }),

  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: userData,
  }),

  login: (username, password) => apiRequest('/auth/login', {
    method: 'POST',
    body: { username, password },
  }),

  getMe: () => apiRequest('/auth/me'),
};

// Rooms API
export const roomsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/rooms?${queryString}`);
  },

  getFeatured: () => apiRequest('/rooms/featured'),

  getById: (id) => apiRequest(`/rooms/${id}`),

  create: (roomData) => apiRequest('/rooms', {
    method: 'POST',
    body: roomData,
  }),

  update: (id, roomData) => apiRequest(`/rooms/${id}`, {
    method: 'PUT',
    body: roomData,
  }),

  delete: (id) => apiRequest(`/rooms/${id}`, {
    method: 'DELETE',
  }),
};

// Bookings API
export const bookingsAPI = {
  getAll: (status) => {
    const query = status ? `?status=${status}` : '';
    return apiRequest(`/bookings${query}`);
  },

  getById: (id) => apiRequest(`/bookings/${id}`),

  create: (bookingData) => apiRequest('/bookings', {
    method: 'POST',
    body: bookingData,
  }),

  cancel: (id, reason) => apiRequest(`/bookings/${id}/cancel`, {
    method: 'PUT',
    body: { reason },
  }),
};

// Wishlist API
export const wishlistAPI = {
  getAll: () => apiRequest('/wishlist'),

  add: (roomId) => apiRequest(`/wishlist/${roomId}`, {
    method: 'POST',
  }),

  remove: (roomId) => apiRequest(`/wishlist/${roomId}`, {
    method: 'DELETE',
  }),

  check: (roomId) => apiRequest(`/wishlist/check/${roomId}`),
};

// Messages API
export const messagesAPI = {
  getConversations: (archived = false) => {
    const query = archived ? '?archived=true' : '';
    return apiRequest(`/messages/conversations${query}`);
  },

  getConversation: (id) => apiRequest(`/messages/conversations/${id}`),

  createConversation: (participantId) => apiRequest('/messages/conversations', {
    method: 'POST',
    body: { participant: participantId },
  }),

  sendMessage: (conversationId, content) => apiRequest('/messages', {
    method: 'POST',
    body: { conversation: conversationId, content },
  }),

  archiveConversation: (id) => apiRequest(`/messages/conversations/${id}/archive`, {
    method: 'PUT',
  }),
};

// Reviews API
export const reviewsAPI = {
  getByRoom: (roomId) => apiRequest(`/reviews/room/${roomId}`),

  create: (reviewData) => apiRequest('/reviews', {
    method: 'POST',
    body: reviewData,
  }),
};

// Profile API
export const profileAPI = {
  get: () => apiRequest('/profile'),

  update: (profileData) => apiRequest('/profile', {
    method: 'PUT',
    body: profileData,
  }),

  updateRole: (role) => apiRequest('/profile/role', {
    method: 'PUT',
    body: { role },
  }),
};

// Transport API
export const transportAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/transport?${queryString}`);
  },

  getById: (id) => apiRequest(`/transport/${id}`),

  create: (transportData) => apiRequest('/transport', {
    method: 'POST',
    body: transportData,
  }),

  update: (id, transportData) => apiRequest(`/transport/${id}`, {
    method: 'PUT',
    body: transportData,
  }),
};

// Upload API
export const uploadAPI = {
  uploadImage: async (imageUri) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    const token = await getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  },

  uploadMultipleImages: async (imageUris) => {
    const formData = new FormData();
    imageUris.forEach((uri, index) => {
      formData.append('images', {
        uri,
        type: 'image/jpeg',
        name: `image${index}.jpg`,
      });
    });

    const token = await getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  },
};

export default {
  authAPI,
  roomsAPI,
  bookingsAPI,
  wishlistAPI,
  messagesAPI,
  reviewsAPI,
  profileAPI,
  transportAPI,
  uploadAPI,
};

