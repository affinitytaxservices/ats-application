import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  Divider,
  Stack,
  Avatar,
  LinearProgress,
  Menu,
  FormControlLabel,
  Switch,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useTaskManagement } from '../../contexts/TaskManagementContext';

const AdminTaskPanel = () => {
  const {
    employees,
    loading,
    filters,
    createTask,
    updateTask,
    deleteTask,
    assignTask,
    reviewTask,
    getFilteredTasks,
    getTaskStats,
    updateFilters,
    fetchTasks
  } = useTaskManagement();

  // Local state
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Form state for task creation/editing
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assigneeId: '',
    priority: 'medium',
    dueDate: new Date(),
    category: 'tax_preparation',
    estimatedHours: 1,
    tags: []
  });

  // Task categories
  const taskCategories = [
    { value: 'tax_preparation', label: 'Tax Preparation', color: '#10B981' },
    { value: 'client_consultation', label: 'Client Consultation', color: '#6366F1' },
    { value: 'document_review', label: 'Document Review', color: '#F59E0B' },
    { value: 'audit_support', label: 'Audit Support', color: '#EF4444' },
    { value: 'compliance', label: 'Compliance', color: '#8B5CF6' },
    { value: 'training', label: 'Training', color: '#06B6D4' },
    { value: 'administrative', label: 'Administrative', color: '#6B7280' }
  ];

  // Priority colors
  const priorityColors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
    urgent: '#DC2626'
  };

  // Status colors
  const statusColors = {
    pending: '#6B7280',
    assigned: '#3B82F6',
    in_progress: '#F59E0B',
    submitted: '#8B5CF6',
    completed: '#10B981',
    rejected: '#EF4444'
  };

  // Auto-refresh effect
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchTasks();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh, fetchTasks]);

  // Handle form changes
  const handleFormChange = (field, value) => {
    setTaskForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle task creation
  const handleCreateTask = async () => {
    if (!taskForm.title || !taskForm.description) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    const result = await createTask({
      ...taskForm,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    if (result.success) {
      setSnackbar({
        open: true,
        message: 'Task created successfully',
        severity: 'success'
      });
      setCreateDialogOpen(false);
      resetForm();
    } else {
      setSnackbar({
        open: true,
        message: result.error || 'Failed to create task',
        severity: 'error'
      });
    }
  };

  // Handle task editing
  const handleEditTask = async () => {
    const result = await updateTask(selectedTask.id, taskForm);

    if (result.success) {
      setSnackbar({
        open: true,
        message: 'Task updated successfully',
        severity: 'success'
      });
      setEditDialogOpen(false);
      setSelectedTask(null);
      resetForm();
    } else {
      setSnackbar({
        open: true,
        message: result.error || 'Failed to update task',
        severity: 'error'
      });
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const result = await deleteTask(taskId);

      if (result.success) {
        setSnackbar({
          open: true,
          message: 'Task deleted successfully',
          severity: 'success'
        });
      } else {
        setSnackbar({
          open: true,
          message: result.error || 'Failed to delete task',
          severity: 'error'
        });
      }
    }
    setAnchorEl(null);
  };

  // Handle task assignment
  const handleAssignTask = async (taskId, employeeId) => {
    const result = await assignTask(taskId, employeeId);

    if (result.success) {
      setSnackbar({
        open: true,
        message: 'Task assigned successfully',
        severity: 'success'
      });
    } else {
      setSnackbar({
        open: true,
        message: result.error || 'Failed to assign task',
        severity: 'error'
      });
    }
    setAnchorEl(null);
  };

  // Handle task review
  const handleReviewTask = async (taskId, approved, notes) => {
    const result = await reviewTask(taskId, {
      approved,
      notes,
      reviewerId: 1 // Current admin user ID
    });

    if (result.success) {
      setSnackbar({
        open: true,
        message: `Task ${approved ? 'approved' : 'rejected'} successfully`,
        severity: 'success'
      });
    } else {
      setSnackbar({
        open: true,
        message: result.error || 'Failed to review task',
        severity: 'error'
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setTaskForm({
      title: '',
      description: '',
      assigneeId: '',
      priority: 'medium',
      dueDate: new Date(),
      category: 'tax_preparation',
      estimatedHours: 1,
      tags: []
    });
  };

  // Open edit dialog
  const openEditDialog = (task) => {
    setSelectedTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      assigneeId: task.assigneeId || '',
      priority: task.priority,
      dueDate: new Date(task.dueDate),
      category: task.category || 'tax_preparation',
      estimatedHours: task.estimatedHours || 1,
      tags: task.tags || []
    });
    setEditDialogOpen(true);
    setAnchorEl(null);
  };

  // Get filtered and searched tasks
  const getDisplayTasks = () => {
    let filteredTasks = getFilteredTasks();
    
    if (searchTerm) {
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assigneeName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filteredTasks;
  };

  // Get task stats
  const stats = getTaskStats();

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get employee name
  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unassigned';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Task Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create, assign, and track tasks for your team
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {stats.total}
                </Typography>
                <Typography variant="body2">Total Tasks</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {stats.pending}
                </Typography>
                <Typography variant="body2">Pending</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {stats.inProgress}
                </Typography>
                <Typography variant="body2">In Progress</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {stats.completed}
                </Typography>
                <Typography variant="body2">Completed</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {stats.overdue}
                </Typography>
                <Typography variant="body2">Overdue</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Controls */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateDialogOpen(true)}
                sx={{ minWidth: 150 }}
              >
                Create Task
              </Button>

              <TextField
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                sx={{ flexGrow: 1, maxWidth: 300 }}
              />

              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => updateFilters({ status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="assigned">Assigned</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="submitted">Submitted</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={filters.priority}
                  onChange={(e) => updateFilters({ priority: e.target.value })}
                  label="Priority"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="urgent">Urgent</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                  />
                }
                label="Auto Refresh"
              />

              <IconButton onClick={fetchTasks} disabled={loading}>
                <RefreshIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>

        {/* Loading */}
        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {/* Tasks Table */}
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell>Assignee</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getDisplayTasks().map((task) => (
                  <TableRow key={task.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Assignment color="primary" />
                        <Typography variant="body2" fontWeight="medium">
                          {task.title}
                        </Typography>
                      </Box>
                    </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                            {getEmployeeName(task.assigneeId).charAt(0)}
                          </Avatar>
                          <Typography variant="body2">
                            {getEmployeeName(task.assigneeId)}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={task.priority}
                          size="small"
                          sx={{
                            backgroundColor: priorityColors[task.priority],
                            color: 'white',
                            textTransform: 'capitalize'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={task.status.replace('_', ' ')}
                          size="small"
                          sx={{
                            backgroundColor: statusColors[task.status],
                            color: 'white',
                            textTransform: 'capitalize'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(task.dueDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={taskCategories.find(cat => cat.value === task.category)?.label || task.category}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={(e) => {
                            setSelectedTask(task);
                            setAnchorEl(e.currentTarget);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => openEditDialog(selectedTask)}>
            <EditIcon sx={{ mr: 1 }} />
            Edit Task
          </MenuItem>
          <MenuItem onClick={() => handleDeleteTask(selectedTask?.id)}>
            <DeleteIcon sx={{ mr: 1 }} />
            Delete Task
          </MenuItem>
          <Divider />
          {employees.map((employee) => (
            <MenuItem
              key={employee.id}
              onClick={() => handleAssignTask(selectedTask?.id, employee.id)}
            >
              <PersonIcon sx={{ mr: 1 }} />
              Assign to {employee.name}
            </MenuItem>
          ))}
          {selectedTask?.status === 'submitted' && (
            <>
              <Divider />
              <MenuItem onClick={() => handleReviewTask(selectedTask.id, true, 'Approved')}>
                <CheckCircleIcon sx={{ mr: 1, color: 'success.main' }} />
                Approve Task
              </MenuItem>
              <MenuItem onClick={() => handleReviewTask(selectedTask.id, false, 'Rejected')}>
                <ErrorIcon sx={{ mr: 1, color: 'error.main' }} />
                Reject Task
              </MenuItem>
            </>
          )}
        </Menu>

        {/* Create Task Dialog */}
        <Dialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Create New Task</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Task Title"
                  value={taskForm.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={taskForm.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  multiline
                  rows={3}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Assign to</InputLabel>
                  <Select
                    value={taskForm.assigneeId}
                    onChange={(e) => handleFormChange('assigneeId', e.target.value)}
                    label="Assign to"
                  >
                    <MenuItem value="">Unassigned</MenuItem>
                    {employees.map((employee) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {employee.name} - {employee.department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={taskForm.priority}
                    onChange={(e) => handleFormChange('priority', e.target.value)}
                    label="Priority"
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Due Date"
                  type="datetime-local"
                  value={taskForm.dueDate ? new Date(taskForm.dueDate).toISOString().slice(0, 16) : ''}
                  onChange={(e) => handleFormChange('dueDate', new Date(e.target.value))}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={taskForm.category}
                    onChange={(e) => handleFormChange('category', e.target.value)}
                    label="Category"
                  >
                    {taskCategories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Estimated Hours"
                  type="number"
                  value={taskForm.estimatedHours}
                  onChange={(e) => handleFormChange('estimatedHours', parseInt(e.target.value))}
                  inputProps={{ min: 1, max: 40 }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTask} variant="contained">
              Create Task
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Task Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Task Title"
                  value={taskForm.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={taskForm.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  multiline
                  rows={3}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Assign to</InputLabel>
                  <Select
                    value={taskForm.assigneeId}
                    onChange={(e) => handleFormChange('assigneeId', e.target.value)}
                    label="Assign to"
                  >
                    <MenuItem value="">Unassigned</MenuItem>
                    {employees.map((employee) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {employee.name} - {employee.department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={taskForm.priority}
                    onChange={(e) => handleFormChange('priority', e.target.value)}
                    label="Priority"
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Due Date"
                  type="datetime-local"
                  value={taskForm.dueDate ? new Date(taskForm.dueDate).toISOString().slice(0, 16) : ''}
                  onChange={(e) => handleFormChange('dueDate', new Date(e.target.value))}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={taskForm.category}
                    onChange={(e) => handleFormChange('category', e.target.value)}
                    label="Category"
                  >
                    {taskCategories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Estimated Hours"
                  type="number"
                  value={taskForm.estimatedHours}
                  onChange={(e) => handleFormChange('estimatedHours', parseInt(e.target.value))}
                  inputProps={{ min: 1, max: 40 }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditTask} variant="contained">
              Update Task
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
  );
};

export default AdminTaskPanel;