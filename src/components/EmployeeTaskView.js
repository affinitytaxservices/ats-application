import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  Badge,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Assignment,
  Schedule,
  Flag,
  CheckCircle,
  PlayArrow,
  Pause,
  Upload,
  Comment,
  Visibility,
  ExpandMore,
  FilterList,
  Search,
  TrendingUp,
  Person
} from '@mui/icons-material';
import { useTaskManagement } from '../contexts/TaskManagementContext';

const EmployeeTaskView = () => {
  const {
    updateTaskStatus,
    submitTaskForReview,
    addTaskComment,
    currentUser,
    getTasksByAssignee
  } = useTaskManagement();

  const [selectedTask, setSelectedTask] = useState(null);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [newComment, setNewComment] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Get employee's tasks
  const employeeTasks = getTasksByAssignee(currentUser?.id);

  // Filter tasks based on current filters
  const filteredTasks = employeeTasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  // Group tasks by status for tabs
  const tasksByStatus = {
    pending: filteredTasks.filter(task => task.status === 'pending'),
    in_progress: filteredTasks.filter(task => task.status === 'in_progress'),
    completed: filteredTasks.filter(task => task.status === 'completed'),
    submitted: filteredTasks.filter(task => task.status === 'submitted')
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'default';
      case 'in_progress': return 'primary';
      case 'completed': return 'success';
      case 'submitted': return 'info';
      case 'reviewed': return 'secondary';
      default: return 'default';
    }
  };

  const handleStartTask = (taskId) => {
    updateTaskStatus(taskId, 'in_progress');
    setSnackbar({ open: true, message: 'Task started successfully!', severity: 'success' });
  };

  const handlePauseTask = (taskId) => {
    updateTaskStatus(taskId, 'pending');
    setSnackbar({ open: true, message: 'Task paused', severity: 'info' });
  };

  const handleCompleteTask = (taskId) => {
    updateTaskStatus(taskId, 'completed');
    setSnackbar({ open: true, message: 'Task marked as completed!', severity: 'success' });
  };

  const handleSubmitTask = () => {
    if (selectedTask) {
      submitTaskForReview(selectedTask.id, submissionNotes);
      setSubmitDialogOpen(false);
      setSubmissionNotes('');
      setSnackbar({ open: true, message: 'Task submitted for review!', severity: 'success' });
    }
  };

  const handleAddComment = () => {
    if (selectedTask && newComment.trim()) {
      addTaskComment(selectedTask.id, newComment);
      setCommentDialogOpen(false);
      setNewComment('');
      setSnackbar({ open: true, message: 'Comment added successfully!', severity: 'success' });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const TaskCard = ({ task }) => {
    const daysUntilDeadline = getDaysUntilDeadline(task.deadline);
    const isOverdue = daysUntilDeadline < 0;
    const isUrgent = daysUntilDeadline <= 2 && daysUntilDeadline >= 0;

    return (
      <Card 
        sx={{ 
          mb: 2, 
          border: isOverdue ? '2px solid #f44336' : isUrgent ? '2px solid #ff9800' : '1px solid #e0e0e0',
          '&:hover': { boxShadow: 3 }
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                {task.title}
                {isOverdue && <Chip label="OVERDUE" color="error" size="small" sx={{ ml: 1 }} />}
                {isUrgent && <Chip label="URGENT" color="warning" size="small" sx={{ ml: 1 }} />}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {task.description}
              </Typography>
            </Box>
            <Box display="flex" gap={1} alignItems="center">
              <Chip 
                label={task.priority} 
                color={getPriorityColor(task.priority)} 
                size="small" 
                icon={<Flag />}
              />
              <Chip 
                label={task.status.replace('_', ' ')} 
                color={getStatusColor(task.status)} 
                size="small"
              />
            </Box>
          </Box>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Schedule fontSize="small" color="action" />
                <Typography variant="body2">
                  Due: {formatDate(task.deadline)}
                  {isOverdue && (
                    <Typography component="span" color="error" sx={{ ml: 1 }}>
                      ({Math.abs(daysUntilDeadline)} days overdue)
                    </Typography>
                  )}
                  {isUrgent && (
                    <Typography component="span" color="warning.main" sx={{ ml: 1 }}>
                      ({daysUntilDeadline} days left)
                    </Typography>
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <Person fontSize="small" color="action" />
                <Typography variant="body2">
                  Assigned by: {task.assignedBy}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {task.progress !== undefined && (
            <Box mb={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2">Progress</Typography>
                <Typography variant="body2">{task.progress}%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={task.progress} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          )}

          <Box display="flex" gap={1} flexWrap="wrap">
            {task.status === 'pending' && (
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={() => handleStartTask(task.id)}
                size="small"
              >
                Start Task
              </Button>
            )}
            
            {task.status === 'in_progress' && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<Pause />}
                  onClick={() => handlePauseTask(task.id)}
                  size="small"
                >
                  Pause
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CheckCircle />}
                  onClick={() => handleCompleteTask(task.id)}
                  size="small"
                >
                  Complete
                </Button>
              </>
            )}

            {task.status === 'completed' && (
              <Button
                variant="contained"
                startIcon={<Upload />}
                onClick={() => {
                  setSelectedTask(task);
                  setSubmitDialogOpen(true);
                }}
                size="small"
              >
                Submit for Review
              </Button>
            )}

            <Button
              variant="outlined"
              startIcon={<Comment />}
              onClick={() => {
                setSelectedTask(task);
                setCommentDialogOpen(true);
              }}
              size="small"
            >
              Add Comment
            </Button>

            <Button
              variant="outlined"
              startIcon={<Visibility />}
              onClick={() => setSelectedTask(task)}
              size="small"
            >
              View Details
            </Button>
          </Box>

          {task.comments && task.comments.length > 0 && (
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body2">
                  Comments ({task.comments.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {task.comments.slice(-3).map((comment, index) => (
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={comment.text}
                        secondary={`${comment.author} - ${formatDate(comment.timestamp)}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          My Tasks
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {currentUser?.name}! Here are your assigned tasks.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Badge badgeContent={tasksByStatus.pending.length} color="default">
              <Assignment color="action" sx={{ fontSize: 40 }} />
            </Badge>
            <Typography variant="h6" mt={1}>Pending</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Badge badgeContent={tasksByStatus.in_progress.length} color="primary">
              <TrendingUp color="primary" sx={{ fontSize: 40 }} />
            </Badge>
            <Typography variant="h6" mt={1}>In Progress</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Badge badgeContent={tasksByStatus.completed.length} color="success">
              <CheckCircle color="success" sx={{ fontSize: 40 }} />
            </Badge>
            <Typography variant="h6" mt={1}>Completed</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Badge badgeContent={tasksByStatus.submitted.length} color="info">
              <Upload color="info" sx={{ fontSize: 40 }} />
            </Badge>
            <Typography variant="h6" mt={1}>Submitted</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="submitted">Submitted</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => {
                setFilterStatus('all');
                setFilterPriority('all');
                setSearchTerm('');
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Task Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
        >
          <Tab label={`All (${filteredTasks.length})`} />
          <Tab label={`Pending (${tasksByStatus.pending.length})`} />
          <Tab label={`In Progress (${tasksByStatus.in_progress.length})`} />
          <Tab label={`Completed (${tasksByStatus.completed.length})`} />
        </Tabs>
      </Paper>

      {/* Task List */}
      <Box>
        {tabValue === 0 && filteredTasks.map(task => <TaskCard key={task.id} task={task} />)}
        {tabValue === 1 && tasksByStatus.pending.map(task => <TaskCard key={task.id} task={task} />)}
        {tabValue === 2 && tasksByStatus.in_progress.map(task => <TaskCard key={task.id} task={task} />)}
        {tabValue === 3 && tasksByStatus.completed.map(task => <TaskCard key={task.id} task={task} />)}

        {filteredTasks.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Assignment sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No tasks found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' 
                ? 'Try adjusting your filters' 
                : 'You have no assigned tasks at the moment'}
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Submit Task Dialog */}
      <Dialog open={submitDialogOpen} onClose={() => setSubmitDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Task for Review</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Please provide any additional notes or comments about your completed work.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Submission Notes"
            value={submissionNotes}
            onChange={(e) => setSubmissionNotes(e.target.value)}
            placeholder="Describe what you've completed, any challenges faced, or additional information..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitTask} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Add Comment Dialog */}
      <Dialog open={commentDialogOpen} onClose={() => setCommentDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment or question..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommentDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddComment} variant="contained" disabled={!newComment.trim()}>
            Add Comment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeTaskView;