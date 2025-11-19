// API service for Affinity Tax Services
import axios from 'axios';

// Base API configuration
const API_URL = process.env.REACT_APP_API_URL || '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 seconds timeout
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_data', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// User API
export const userAPI = {
  getAllUsers: async (page = 1, limit = 10, search = '') => {
    try {
      const response = await api.get('/users', {
        params: { page, limit, search }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/users/password', { currentPassword, newPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getUserStats: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/stats`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Tax Documents API
export const documentAPI = {
  getAllDocuments: async (page = 1, limit = 10, filters = {}) => {
    try {
      const response = await api.get('/documents', {
        params: { page, limit, ...filters }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  getDocumentsByYear: async (taxYear) => {
    try {
      const response = await api.get(`/documents/year/${taxYear}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  getDocumentsByType: async (documentType) => {
    try {
      const response = await api.get(`/documents/type/${documentType}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getDocumentById: async (documentId) => {
    try {
      const response = await api.get(`/documents/${documentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  uploadDocument: async (formData, onUploadProgress) => {
    try {
      const response = await api.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateDocument: async (documentId, documentData) => {
    try {
      const response = await api.put(`/documents/${documentId}`, documentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateDocumentStatus: async (documentId, status, notes) => {
    try {
      const response = await api.put(`/documents/${documentId}/status`, { status, notes });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  deleteDocument: async (documentId) => {
    try {
      const response = await api.delete(`/documents/${documentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  downloadDocument: async (documentId) => {
    try {
      const response = await api.get(`/documents/${documentId}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Tax Returns API
export const taxReturnAPI = {
  getAllReturns: async (page = 1, limit = 10, filters = {}) => {
    try {
      const response = await api.get('/tax-returns', {
        params: { page, limit, ...filters }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  getReturnByYear: async (taxYear) => {
    try {
      const response = await api.get(`/tax-returns/year/${taxYear}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getReturnById: async (returnId) => {
    try {
      const response = await api.get(`/tax-returns/${returnId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  createReturn: async (taxReturnData) => {
    try {
      const response = await api.post('/tax-returns', taxReturnData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  updateReturn: async (returnId, taxReturnData) => {
    try {
      const response = await api.put(`/tax-returns/${returnId}`, taxReturnData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateReturnStatus: async (returnId, status, notes) => {
    try {
      const response = await api.put(`/tax-returns/${returnId}/status`, { status, notes });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteReturn: async (returnId) => {
    try {
      const response = await api.delete(`/tax-returns/${returnId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  getRefundStatus: async (returnId) => {
    try {
      const response = await api.get(`/tax-returns/${returnId}/refund-status`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  submitReturn: async (returnId) => {
    try {
      const response = await api.post(`/tax-returns/${returnId}/submit`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  generatePDF: async (returnId) => {
    try {
      const response = await api.get(`/tax-returns/${returnId}/pdf`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Appointments API
export const appointmentAPI = {
  getAllAppointments: async (page = 1, limit = 10, filters = {}) => {
    try {
      const response = await api.get('/appointments', {
        params: { page, limit, ...filters }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getAppointmentById: async (appointmentId) => {
    try {
      const response = await api.get(`/appointments/${appointmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createAppointment: async (appointmentData) => {
    try {
      const response = await api.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateAppointment: async (appointmentId, appointmentData) => {
    try {
      const response = await api.put(`/appointments/${appointmentId}`, appointmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  cancelAppointment: async (appointmentId, reason) => {
    try {
      const response = await api.put(`/appointments/${appointmentId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getAvailableSlots: async (professionalId, date) => {
    try {
      const response = await api.get(`/appointments/available-slots`, {
        params: { professionalId, date }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Payments API
export const paymentAPI = {
  getAllPayments: async (page = 1, limit = 10, filters = {}) => {
    try {
      const response = await api.get('/payments', {
        params: { page, limit, ...filters }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getPaymentById: async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createPayment: async (paymentData) => {
    try {
      const response = await api.post('/payments', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  processPayment: async (paymentId, paymentMethod) => {
    try {
      const response = await api.post(`/payments/${paymentId}/process`, { paymentMethod });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  refundPayment: async (paymentId, amount, reason) => {
    try {
      const response = await api.post(`/payments/${paymentId}/refund`, { amount, reason });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Notifications API
export const notificationAPI = {
  getNotifications: async (page = 1, limit = 10, unreadOnly = false) => {
    try {
      const response = await api.get('/notifications', {
        params: { page, limit, unreadOnly }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createNotification: async (notificationData) => {
    try {
      const response = await api.post('/notifications', notificationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  markAsRead: async (notificationId) => {
    try {
      const response = await api.put(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  markAllAsRead: async () => {
    try {
      const response = await api.put('/notifications/read-all');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteNotification: async (notificationId) => {
    try {
      const response = await api.delete(`/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getUnreadCount: async () => {
    try {
      const response = await api.get('/notifications/unread-count');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Client API
export const clientAPI = {
  getDashboardData: async () => {
    try {
      const response = await api.get('/client/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getDocuments: async () => {
    try {
      const response = await api.get('/client/documents');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getNotifications: async () => {
    try {
      const response = await api.get('/client/notifications');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getTaxSummary: async () => {
    try {
      const response = await api.get('/client/tax-summary');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getAppointments: async () => {
    try {
      const response = await api.get('/client/appointments');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Admin API
export const adminAPI = {
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getSystemHealth: async () => {
    try {
      const response = await api.get('/admin/system-health');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getAuditLogs: async (page = 1, limit = 10, filters = {}) => {
    try {
      const response = await api.get('/admin/audit-logs', {
        params: { page, limit, ...filters }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getUserActivity: async (userId, startDate, endDate) => {
    try {
      const response = await api.get(`/admin/users/${userId}/activity`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getRevenueAnalytics: async (period = 'month') => {
    try {
      const response = await api.get('/admin/analytics/revenue', {
        params: { period }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getTaskAnalytics: async () => {
    try {
      const response = await api.get('/admin/task-analytics');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  exportData: async (dataType, format = 'csv', filters = {}) => {
    try {
      const response = await api.get(`/admin/export/${dataType}`, {
        params: { format, ...filters },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  backupDatabase: async () => {
    try {
      const response = await api.post('/admin/backup');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateSystemSettings: async (settings) => {
    try {
      const response = await api.put('/admin/settings', settings);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // WhatsApp Admin API methods
  getWhatsAppConversations: async (page = 1, limit = 20, search = '') => {
    try {
      const response = await api.get('/admin/whatsapp/conversations', {
        params: { page, limit, search }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getWhatsAppMessages: async (phone, limit = 50) => {
    try {
      const response = await api.get(`/admin/whatsapp/messages/${phone}`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  sendWhatsAppTextMessage: async (to, text) => {
    try {
      const response = await api.post('/admin/whatsapp/send-text', { to, text });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getWhatsAppAppointments: async (page = 1, limit = 20, status = '') => {
    try {
      const response = await api.get('/admin/whatsapp/appointments', {
        params: { page, limit, status }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateWhatsAppAppointmentStatus: async (id, status) => {
    try {
      const response = await api.put(`/admin/whatsapp/appointments/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getWhatsAppSupportTickets: async (page = 1, limit = 20, status = '') => {
    try {
      const response = await api.get('/admin/whatsapp/support-tickets', {
        params: { page, limit, status }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  assignWhatsAppSupportTicket: async (id, assigned_to) => {
    try {
      const response = await api.put(`/admin/whatsapp/support-tickets/${id}/assign`, { assigned_to });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  respondToWhatsAppSupportTicket: async (id, responseText) => {
    try {
      const response = await api.put(`/admin/whatsapp/support-tickets/${id}/response`, { response: responseText });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Tasks API (for admin task management)
export const taskAPI = {
  getAllTasks: async (page = 1, limit = 10, filters = {}) => {
    try {
      const response = await api.get('/tasks', {
        params: { page, limit, ...filters }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getTaskById: async (taskId) => {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateTask: async (taskId, updates) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, updates);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateTaskStatus: async (taskId, status, notes) => {
    try {
      const response = await api.put(`/tasks/${taskId}/status`, { status, notes });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  assignTask: async (taskId, assigneeId) => {
    try {
      const response = await api.put(`/tasks/${taskId}/assign`, { assigneeId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Utility functions
export const apiUtils = {
  // Handle file downloads
  downloadFile: (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  // Format error messages
  formatError: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }
};

// Create API service object
const apiService = {
  authAPI,
  userAPI,
  documentAPI,
  taxReturnAPI,
  appointmentAPI,
  paymentAPI,
  notificationAPI,
  adminAPI,
  taskAPI,
  clientAPI,
  apiUtils
};

export default apiService;