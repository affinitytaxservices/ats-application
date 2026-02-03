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
  useTheme,
  alpha
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
  Schedule,
  TrendingUp,
  Warning
} from '@mui/icons-material';
import { useTaskManagement } from '../../contexts/TaskManagementContext';

const AdminTaskPanel = () => {
  const theme = useTheme();
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
    { value: 'tax_preparation', label: 'Tax Preparation', color: theme.palette.primary.main },
    { value: 'client_consultation', label: 'Client Consultation', color: theme.palette.secondary.main },
    { value: 'document_review', label: 'Document Review', color: theme.palette.warning.main },
    { value: 'audit_support', label: 'Audit Support', color: theme.palette.error.main },
    { value: 'compliance', label: 'Compliance', color: theme.palette.info.main },
    { value: 'training', label: 'Training', color: theme.palette.success.main },
    { value: 'administrative', label: 'Administrative', color: theme.palette.grey[500] }
  ];

  // Priority colors
  const priorityColors = {
    low: theme.palette.success.main,
    medium: theme.palette.warning.main,
    high: theme.palette.error.main,
    urgent: theme.palette.error.dark
  };

  // Status colors
  const statusColors = {
    pending: theme.palette.grey[500],
    assigned: theme.palette.info.main,
    in_progress: theme.palette.warning.main,
    submitted: theme.palette.secondary.main,
    completed: theme.palette.success.main,
    rejected: theme.palette.error.main
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

  const StatCard = ({ title, value, icon, color }) => (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[2],
          borderColor: color
        }
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2, '&:last-child': { pb: 2 } }}>
        <Box 
          sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            bgcolor: alpha(color, 0.1),
            color: color,
            mr: 2,
            display: 'flex'
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1 }}>
            {value}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mt: 0.5, display: 'block' }}>
            {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Task Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create, assign, and track tasks for your team
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard 
            title="Total Tasks" 
            value={stats.total} 
            icon={<Assignment />} 
            color={theme.palette.primary.main} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard 
            title="Pending" 
            value={stats.pending} 
            icon={<Schedule />} 
            color={theme.palette.warning.main} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard 
            title="In Progress" 
            value={stats.inProgress} 
            icon={<TrendingUp />} 
            color={theme.palette.info.main} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard 
            title="Completed" 
            value={stats.completed} 
            icon={<CheckCircleIcon />} 
            color={theme.palette.success.main} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard 
            title="Overdue" 
            value={stats.overdue} 
            icon={<Warning />} 
            color={theme.palette.error.main} 
          />
        </Grid>
      </Grid>

      {/* Controls */}
      <Card elevation={0} sx={{ mb: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setCreateDialogOpen(true)}
              sx={{ minWidth: 150, borderRadius: 2 }}
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
              size="small"
              sx={{ flexGrow: 1, maxWidth: 300 }}
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
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

            <FormControl size="small" sx={{ minWidth: 120 }}>
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
                  size="small"
                />
              }
              label={<Typography variant="body2">Auto Refresh</Typography>}
            />

            <IconButton onClick={fetchTasks} disabled={loading} size="small">
              <RefreshIcon />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>

      {/* Loading */}
      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Tasks Table */}
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <TableCell sx={{ fontWeight: 600 }}>Task</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Assignee</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getDisplayTasks().map((task) => (
                <TableRow key={task.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box 
                        sx={{ 
                          p: 1, 
                          borderRadius: 1, 
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                          display: 'flex'
                        }}
                      >
                        <Assignment fontSize="small" />
                      </Box>
                      <Typography variant="body2" fontWeight="600">
                        {task.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar 
                        sx={{ 
                          width: 28, 
                          height: 28, 
                          fontSize: '0.75rem',
                          bgcolor: alpha(theme.palette.secondary.main, 0.1),
                          color: 'secondary.main',
                          fontWeight: 600
                        }}
                      >
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
                        bgcolor: alpha(priorityColors[task.priority], 0.1),
                        color: priorityColors[task.priority],
                        textTransform: 'capitalize',
                        fontWeight: 600,
                        borderRadius: 1
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.status.replace('_', ' ')}
                      size="small"
                      sx={{
                        bgcolor: alpha(statusColors[task.status], 0.1),
                        color: statusColors[task.status],
                        textTransform: 'capitalize',
                        fontWeight: 600,
                        borderRadius: 1
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(task.dueDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={taskCategories.find(cat => cat.value === task.category)?.label || task.category}
                      size="small"
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        setSelectedTask(task);
                        setAnchorEl(e.currentTarget);
                      }}
                      aria-label={`Actions for task ${task.title}`}
                    >
                      <MoreVertIcon fontSize="small" />
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
        PaperProps={{
          elevation: 0,
          sx: {
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
          }
        }}
      >
        <MenuItem onClick={() => openEditDialog(selectedTask)}>
          <EditIcon sx={{ mr: 1, fontSize: 20 }} />
          Edit Task
        </MenuItem>
        <MenuItem onClick={() => handleDeleteTask(selectedTask?.id)}>
          <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
          Delete Task
        </MenuItem>
        <Divider />
        {employees.map((employee) => (
          <MenuItem
            key={employee.id}
            onClick={() => handleAssignTask(selectedTask?.id, employee.id)}
          >
            <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
            Assign to {employee.name}
          </MenuItem>
        ))}
        {selectedTask?.status === 'submitted' && (
          <>
            <Divider />
            <MenuItem onClick={() => handleReviewTask(selectedTask.id, true, 'Approved')}>
              <CheckCircleIcon sx={{ mr: 1, color: 'success.main', fontSize: 20 }} />
              Approve Task
            </MenuItem>
            <MenuItem onClick={() => handleReviewTask(selectedTask.id, false, 'Rejected')}>
              <ErrorIcon sx={{ mr: 1, color: 'error.main', fontSize: 20 }} />
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
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Create New Task</DialogTitle>
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
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setCreateDialogOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button onClick={handleCreateTask} variant="contained" sx={{ borderRadius: 2 }}>
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
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Edit Task</DialogTitle>
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
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditDialogOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button onClick={handleEditTask} variant="contained" sx={{ borderRadius: 2 }}>
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
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminTaskPanel;
