import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const taskAPI = axios.create({
  baseURL: `${API_BASE_URL}/tasks`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
taskAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
taskAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Removed all local mock data. Service now relies solely on live API.

// Task API functions
export const taskService = {
  // Get all tasks
  async getAllTasks() {
    try {
      const response = await taskAPI.get('/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get tasks by employee ID
  async getTasksByEmployee(employeeId) {
    try {
      const response = await taskAPI.get(`/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create new task
  async createTask(taskData) {
    try {
      const response = await taskAPI.post('/', taskData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update task
  async updateTask(taskId, updateData) {
    try {
      const response = await taskAPI.put(`/${taskId}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update task status
  async updateTaskStatus(taskId, status) {
    try {
      const response = await taskAPI.patch(`/${taskId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Submit task for review
  async submitTask(taskId, submissionNotes) {
    try {
      const response = await taskAPI.patch(`/${taskId}/submit`, { 
        status: 'submitted',
        submissionNotes,
        submittedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete task
  async deleteTask(taskId) {
    try {
      const response = await taskAPI.delete(`/${taskId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Add comment to task
  async addTaskComment(taskId, commentText, author) {
    try {
      const response = await taskAPI.post(`/${taskId}/comments`, {
        text: commentText,
        author: author || 'Current User'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get task statistics
  async getTaskStatistics() {
    try {
      const response = await taskAPI.get('/statistics');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get employees list
  async getEmployees() {
    try {
      const response = await taskAPI.get('/employees');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Assign task to employee
  async assignTask(taskId, employeeId) {
    try {
      const response = await taskAPI.patch(`/${taskId}/assign`, { assignedTo: employeeId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Upload task attachment
  async uploadAttachment(taskId, file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await taskAPI.post(`/${taskId}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get task by ID
  async getTaskById(taskId) {
    try {
      const response = await taskAPI.get(`/${taskId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// WebSocket service for real-time updates
export class TaskWebSocketService {
  constructor() {
    this.ws = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    try {
      const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000/ws/tasks';
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.emit('connected');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.emit(data.type, data.payload);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.emit('disconnected');
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', error);
      };
    } catch (error) {
      console.warn('WebSocket not available, using polling fallback');
      this.startPolling();
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, 1000 * this.reconnectAttempts);
    } else {
      console.log('Max reconnection attempts reached, switching to polling');
      this.startPolling();
    }
  }

  startPolling() {
    // Fallback to polling if WebSocket is not available
    this.pollingInterval = setInterval(() => {
      this.emit('poll_update');
    }, 30000); // Poll every 30 seconds
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in WebSocket event callback:', error);
        }
      });
    }
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}

// Create singleton instance
export const taskWebSocket = new TaskWebSocketService();

// Export default
export default taskService;