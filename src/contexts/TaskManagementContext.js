import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../services/api';

const TaskManagementContext = createContext();

export const useTaskManagement = () => {
  const context = useContext(TaskManagementContext);
  if (!context) {
    throw new Error('useTaskManagement must be used within a TaskManagementProvider');
  }
  return context;
};

export const TaskManagementProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all',
    dateRange: 'all'
  });

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskAPI.getAllTasks(1, 100);
      setTasks(response.data || []);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize data
  useEffect(() => {
    // Mock employees data - in real app this would come from API
    const mockEmployees = [
      { id: 1, name: 'Steve Rogers', email: 'steve.rogers@affinitytax.com', role: 'tax_professional', department: 'Tax Preparation' },
      { id: 2, name: 'Natasha Romanoff', email: 'natasha.romanoff@affinitytax.com', role: 'tax_professional', department: 'Tax Preparation' },
      { id: 3, name: 'Bruce Banner', email: 'bruce.banner@affinitytax.com', role: 'tax_professional', department: 'Audit Support' },
      { id: 4, name: 'Tony Stark', email: 'tony.stark@affinitytax.com', role: 'manager', department: 'Management' },
      { id: 5, name: 'Wanda Maximoff', email: 'wanda.maximoff@affinitytax.com', role: 'admin', department: 'Administration' }
    ];
    
    setEmployees(mockEmployees);
    fetchTasks();
  }, [fetchTasks]);

  // Create new task
  const createTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskAPI.createTask(taskData);
      const newTask = response.data;
      setTasks(prev => [newTask, ...prev]);
      return { success: true, task: newTask };
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update task
  const updateTask = async (taskId, updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskAPI.updateTask(taskId, updates);
      const updatedTask = response.data;
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      ));
      return { success: true, task: updatedTask };
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await taskAPI.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      return { success: true };
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Assign task to employee
  const assignTask = async (taskId, employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) {
      setError('Employee not found');
      return { success: false, error: 'Employee not found' };
    }

    return await updateTask(taskId, {
      assigneeId: employeeId,
      assigneeName: employee.name,
      status: 'assigned'
    });
  };

  // Submit task (employee action)
  const submitTask = async (taskId, submissionData) => {
    return await updateTask(taskId, {
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      submissionNotes: submissionData.notes,
      attachments: submissionData.attachments || []
    });
  };

  // Approve/Reject task (admin action)
  const reviewTask = async (taskId, reviewData) => {
    return await updateTask(taskId, {
      status: reviewData.approved ? 'completed' : 'rejected',
      reviewedAt: new Date().toISOString(),
      reviewNotes: reviewData.notes,
      reviewedBy: reviewData.reviewerId
    });
  };

  // Filter tasks based on current filters
  const getFilteredTasks = useCallback(() => {
    return tasks.filter(task => {
      if (filters.status !== 'all' && task.status !== filters.status) return false;
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
      if (filters.assignee !== 'all' && task.assigneeId !== parseInt(filters.assignee)) return false;
      
      if (filters.dateRange !== 'all') {
        const taskDate = new Date(task.dueDate);
        const now = new Date();
        const daysDiff = Math.ceil((taskDate - now) / (1000 * 60 * 60 * 24));
        
        switch (filters.dateRange) {
          case 'overdue':
            if (daysDiff >= 0) return false;
            break;
          case 'today':
            if (daysDiff !== 0) return false;
            break;
          case 'week':
            if (daysDiff < 0 || daysDiff > 7) return false;
            break;
          case 'month':
            if (daysDiff < 0 || daysDiff > 30) return false;
            break;
          default:
            break;
        }
      }
      
      return true;
    });
  }, [tasks, filters]);

  // Get tasks by employee
  const getTasksByEmployee = useCallback((employeeId) => {
    return tasks.filter(task => task.assigneeId === employeeId);
  }, [tasks]);

  // Get task statistics
  const getTaskStats = useCallback(() => {
    const total = tasks.length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress' || t.status === 'assigned').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const overdue = tasks.filter(t => {
      const dueDate = new Date(t.dueDate);
      return dueDate < new Date() && t.status !== 'completed';
    }).length;

    return { total, pending, inProgress, completed, overdue };
  }, [tasks]);

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Clear error
  const clearError = () => setError(null);

  const value = {
    // State
    tasks,
    employees,
    loading,
    error,
    filters,
    
    // Actions
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    assignTask,
    submitTask,
    reviewTask,
    
    // Utilities
    getFilteredTasks,
    getTasksByEmployee,
    getTaskStats,
    updateFilters,
    clearError
  };

  return (
    <TaskManagementContext.Provider value={value}>
      {children}
    </TaskManagementContext.Provider>
  );
};

export default TaskManagementContext;