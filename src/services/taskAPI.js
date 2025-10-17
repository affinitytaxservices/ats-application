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
    const token = localStorage.getItem('token') || localStorage.getItem('mock-jwt-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
taskAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('mock-jwt-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock data for development (remove when backend is ready)
const MOCK_TASKS = [
  {
    id: '1',
    title: 'Review Client Tax Documents',
    description: 'Review and validate tax documents for client John Smith',
    assignedTo: 'emp1',
    assignedBy: 'Admin User',
    priority: 'high',
    status: 'pending',
    deadline: '2024-02-15T10:00:00Z',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    progress: 0,
    comments: [],
    attachments: []
  },
  {
    id: '2',
    title: 'Prepare Tax Return - Business',
    description: 'Complete business tax return for ABC Corp',
    assignedTo: 'emp2',
    assignedBy: 'Admin User',
    priority: 'medium',
    status: 'in_progress',
    deadline: '2024-02-20T17:00:00Z',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
    progress: 45,
    comments: [
      {
        id: 'c1',
        text: 'Started working on the business expenses section',
        author: 'Jane Smith',
        timestamp: '2024-01-16T14:30:00Z'
      }
    ],
    attachments: []
  }
];

// Mock employees data
const MOCK_EMPLOYEES = [
  { id: 'emp1', name: 'John Doe', email: 'john@affinitytax.com', role: 'preparer' },
  { id: 'emp2', name: 'Jane Smith', email: 'jane@affinitytax.com', role: 'preparer' },
  { id: 'emp3', name: 'Mike Johnson', email: 'mike@affinitytax.com', role: 'senior_preparer' }
];

// Task API functions
export const taskService = {
  // Get all tasks
  async getAllTasks() {
    try {
      const response = await taskAPI.get('/');
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data:', error.message);
      // Return mock data if API is not available
      return {
        success: true,
        data: MOCK_TASKS,
        message: 'Tasks retrieved successfully (mock data)'
      };
    }
  },

  // Get tasks by employee ID
  async getTasksByEmployee(employeeId) {
    try {
      const response = await taskAPI.get(`/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data:', error.message);
      // Filter mock tasks by employee
      const employeeTasks = MOCK_TASKS.filter(task => task.assignedTo === employeeId);
      return {
        success: true,
        data: employeeTasks,
        message: 'Employee tasks retrieved successfully (mock data)'
      };
    }
  },

  // Create new task
  async createTask(taskData) {
    try {
      const response = await taskAPI.post('/', taskData);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock response:', error.message);
      // Mock task creation
      const newTask = {
        id: Date.now().toString(),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0,
        comments: [],
        attachments: []
      };
      MOCK_TASKS.push(newTask);
      return {
        success: true,
        data: newTask,
        message: 'Task created successfully (mock data)'
      };
    }
  },

  // Update task
  async updateTask(taskId, updateData) {
    try {
      const response = await taskAPI.put(`/${taskId}`, updateData);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock response:', error.message);
      // Mock task update
      const taskIndex = MOCK_TASKS.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        MOCK_TASKS[taskIndex] = {
          ...MOCK_TASKS[taskIndex],
          ...updateData,
          updatedAt: new Date().toISOString()
        };
        return {
          success: true,
          data: MOCK_TASKS[taskIndex],
          message: 'Task updated successfully (mock data)'
        };
      }
      throw new Error('Task not found');
    }
  },

  // Update task status
  async updateTaskStatus(taskId, status) {
    try {
      const response = await taskAPI.patch(`/${taskId}/status`, { status });
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock response:', error.message);
      return this.updateTask(taskId, { status });
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
      console.warn('API not available, using mock response:', error.message);
      return this.updateTask(taskId, { 
        status: 'submitted',
        submissionNotes,
        submittedAt: new Date().toISOString()
      });
    }
  },

  // Delete task
  async deleteTask(taskId) {
    try {
      const response = await taskAPI.delete(`/${taskId}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock response:', error.message);
      // Mock task deletion
      const taskIndex = MOCK_TASKS.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        MOCK_TASKS.splice(taskIndex, 1);
        return {
          success: true,
          message: 'Task deleted successfully (mock data)'
        };
      }
      throw new Error('Task not found');
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
      console.warn('API not available, using mock response:', error.message);
      // Mock comment addition
      const taskIndex = MOCK_TASKS.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const newComment = {
          id: Date.now().toString(),
          text: commentText,
          author: author || 'Current User',
          timestamp: new Date().toISOString()
        };
        MOCK_TASKS[taskIndex].comments.push(newComment);
        return {
          success: true,
          data: newComment,
          message: 'Comment added successfully (mock data)'
        };
      }
      throw new Error('Task not found');
    }
  },

  // Get task statistics
  async getTaskStatistics() {
    try {
      const response = await taskAPI.get('/statistics');
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data:', error.message);
      // Calculate mock statistics
      const stats = {
        total: MOCK_TASKS.length,
        pending: MOCK_TASKS.filter(t => t.status === 'pending').length,
        in_progress: MOCK_TASKS.filter(t => t.status === 'in_progress').length,
        completed: MOCK_TASKS.filter(t => t.status === 'completed').length,
        submitted: MOCK_TASKS.filter(t => t.status === 'submitted').length,
        overdue: MOCK_TASKS.filter(t => new Date(t.deadline) < new Date() && t.status !== 'completed').length
      };
      return {
        success: true,
        data: stats,
        message: 'Statistics retrieved successfully (mock data)'
      };
    }
  },

  // Get employees list
  async getEmployees() {
    try {
      const response = await taskAPI.get('/employees');
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data:', error.message);
      return {
        success: true,
        data: MOCK_EMPLOYEES,
        message: 'Employees retrieved successfully (mock data)'
      };
    }
  },

  // Assign task to employee
  async assignTask(taskId, employeeId) {
    try {
      const response = await taskAPI.patch(`/${taskId}/assign`, { assignedTo: employeeId });
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock response:', error.message);
      return this.updateTask(taskId, { assignedTo: employeeId });
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
      console.warn('API not available, using mock response:', error.message);
      // Mock file upload
      const attachment = {
        id: Date.now().toString(),
        filename: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        url: URL.createObjectURL(file) // Create temporary URL for mock
      };
      
      const taskIndex = MOCK_TASKS.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        MOCK_TASKS[taskIndex].attachments = MOCK_TASKS[taskIndex].attachments || [];
        MOCK_TASKS[taskIndex].attachments.push(attachment);
      }
      
      return {
        success: true,
        data: attachment,
        message: 'File uploaded successfully (mock data)'
      };
    }
  },

  // Get task by ID
  async getTaskById(taskId) {
    try {
      const response = await taskAPI.get(`/${taskId}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data:', error.message);
      const task = MOCK_TASKS.find(task => task.id === taskId);
      if (task) {
        return {
          success: true,
          data: task,
          message: 'Task retrieved successfully (mock data)'
        };
      }
      throw new Error('Task not found');
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