import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  useTheme,
  useMediaQuery,
  Box,
  CircularProgress,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
  Fade,
  Zoom,
  MenuItem,
  Menu,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  InputAdornment
} from '@mui/material';
import {
  People,
  Assignment,
  AttachMoney,
  Add,
  MoreVert,
  Edit,
  Delete,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Info,
  Refresh,

  Person,
  PersonAdd,
  SupervisorAccount,
  AccessTime,
  CalendarToday,
  PieChart as PieChartIcon,
  TrendingUp,
  Visibility,
  VisibilityOff,
  WhatsApp,
  Message,
  Schedule,
  Support

} from '@mui/icons-material';
import { adminAPI, userAPI, taskAPI } from '../../services/api';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

function NewAdminDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminStats, setAdminStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [taskStatusData, setTaskStatusData] = useState([]);
  
  // WhatsApp state
  const [whatsappConversations, setWhatsAppConversations] = useState([]);
  const [whatsappAppointments, setWhatsAppAppointments] = useState([]);
  const [whatsappSupportTickets, setWhatsAppSupportTickets] = useState([]);
  const [showWhatsAppSection, setShowWhatsAppSection] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  
  // State for dialogs
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [taskActionsMenuAnchor, setTaskActionsMenuAnchor] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [userActionsMenuAnchor, setUserActionsMenuAnchor] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // State for pagination
  const [userPage, setUserPage] = useState(0);
  const [userRowsPerPage, setUserRowsPerPage] = useState(5);
  const [taskPage, setTaskPage] = useState(0);
  const [taskRowsPerPage, setTaskRowsPerPage] = useState(5);
  
  // State for new task
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assigneeId: '',
    priority: 'medium',
    dueDate: ''
  });
  
  // State for new user
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'client',
    status: 'active',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State for snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Fetch all data on component mount
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRefreshing(true);
    
    try {
      // Fetch data in parallel with individual error handling
      const results = await Promise.allSettled([
        adminAPI.getDashboardStats(),
        userAPI.getAllUsers(1, 100),
        taskAPI.getAllTasks(1, 100),
        adminAPI.getSystemHealth(),
        adminAPI.getRevenueAnalytics(),
        adminAPI.getTaskAnalytics(),
        adminAPI.getUserActivity(),
        // WhatsApp data
        adminAPI.getWhatsAppConversations(1, 10),
        adminAPI.getWhatsAppAppointments(1, 10),
        adminAPI.getWhatsAppSupportTickets(1, 10)
      ]);
      
      // Process results with individual error handling
      const [statsResult, usersResult, tasksResult, alertsResult, revenueResult, taskAnalyticsResult, userActivityResult, whatsappConvResult, whatsappApptResult, whatsappTicketResult] = results;
      
      if (statsResult.status === 'fulfilled') {
        setAdminStats(statsResult.value.data || {
          totalUsers: 0,
          pendingTasks: 0,
          completedTasks: 0,
          activeClients: 0,
          systemAlerts: 0,
          revenue: 0
        });
      } else {
        console.error('Error fetching admin stats:', statsResult.reason);
      }
      
      if (usersResult.status === 'fulfilled') {
        setUsers(usersResult.value.data || []);
      } else {
        console.error('Error fetching users:', usersResult.reason);
      }
      
      if (tasksResult.status === 'fulfilled') {
        setTasks(tasksResult.value.data || []);
      } else {
        console.error('Error fetching tasks:', tasksResult.reason);
      }
      
      if (alertsResult.status === 'fulfilled') {
        setSystemAlerts(alertsResult.value.data || []);
      } else {
        console.error('Error fetching system alerts:', alertsResult.reason);
      }
      
      if (revenueResult.status === 'fulfilled') {
        setRevenueData(revenueResult.value.data || []);
      } else {
        console.error('Error fetching revenue data:', revenueResult.reason);
      }
      
      if (taskAnalyticsResult.status === 'fulfilled') {
        // Process task status data for pie chart
        const taskStatusCounts = taskAnalyticsResult.value.data?.statusDistribution || [
          { name: 'Pending', value: 0 },
          { name: 'In Progress', value: 0 },
          { name: 'Completed', value: 0 }
        ];
        setTaskStatusData(taskStatusCounts);
      } else {
        console.error('Error fetching task analytics:', taskAnalyticsResult.reason);
        setTaskStatusData([
          { name: 'Pending', value: 0 },
          { name: 'In Progress', value: 0 },
          { name: 'Completed', value: 0 }
        ]);
      }
      
      if (userActivityResult.status === 'fulfilled') {
        // User activity data fetched but not currently displayed
        console.log('User activity data:', userActivityResult.value.data);
      } else {
        console.error('Error fetching user activity:', userActivityResult.reason);
      }
      
      // Process WhatsApp data
      if (whatsappConvResult.status === 'fulfilled') {
        setWhatsAppConversations(whatsappConvResult.value.data || []);
      } else {
        console.warn('Failed to fetch WhatsApp conversations:', whatsappConvResult.reason);
      }
      
      if (whatsappApptResult.status === 'fulfilled') {
        setWhatsAppAppointments(whatsappApptResult.value.data || []);
      } else {
        console.warn('Failed to fetch WhatsApp appointments:', whatsappApptResult.reason);
      }
      
      if (whatsappTicketResult.status === 'fulfilled') {
        setWhatsAppSupportTickets(whatsappTicketResult.value.data || []);
      } else {
        console.warn('Failed to fetch WhatsApp support tickets:', whatsappTicketResult.reason);
      }
      
      // Check if any requests failed
      const failedRequests = results.filter(result => result.status === 'rejected');
      if (failedRequests.length > 0 && failedRequests.length === results.length) {
        setError('Failed to load dashboard data. Please try again later.');
      } else if (failedRequests.length > 0) {
        setError('Some dashboard data failed to load. Please try refreshing.');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
      setTimeout(() => setRefreshing(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  
  const handleRefresh = () => {
    fetchDashboardData();
  };
  
  // Task management functions
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTaskSubmit = async () => {
    if (!newTask.title || !newTask.assigneeId || !newTask.dueDate) {
      setSnackbar({
        open: true,
        message: 'Please fill all required fields',
        severity: 'error'
      });
      return;
    }
    
    try {
      await taskAPI.createTask(newTask);
      setSnackbar({
        open: true,
        message: 'Task created successfully',
        severity: 'success'
      });
      setTaskDialogOpen(false);
      setNewTask({
        title: '',
        description: '',
        assigneeId: '',
        priority: 'medium',
        dueDate: ''
      });
      
      // Refresh tasks list
      const tasksResponse = await taskAPI.getAllTasks(1, 100);
      setTasks(tasksResponse.data || []);
      
      // Update stats
      const statsResponse = await adminAPI.getDashboardStats();
      setAdminStats(statsResponse.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to create task',
        severity: 'error'
      });
    }
  };
  
  const handleTaskActionsClick = (event, task) => {
    setTaskActionsMenuAnchor(event.currentTarget);
    setSelectedTask(task);
  };
  
  const handleTaskActionsClose = () => {
    setTaskActionsMenuAnchor(null);
    setSelectedTask(null);
  };
  
  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      await taskAPI.updateTaskStatus(taskId, { status: newStatus });
      setSnackbar({
        open: true,
        message: `Task marked as ${newStatus}`,
        severity: 'success'
      });
      
      // Refresh tasks list
      const tasksResponse = await taskAPI.getAllTasks(1, 100);
      setTasks(tasksResponse.data || []);
      
      // Update stats
      const statsResponse = await adminAPI.getDashboardStats();
      setAdminStats(statsResponse.data);
      
      // Update task analytics
      const taskAnalyticsResponse = await adminAPI.getTaskAnalytics();
      const taskStatusCounts = taskAnalyticsResponse.data?.statusDistribution || [];
      setTaskStatusData(taskStatusCounts);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to update task status',
        severity: 'error'
      });
    }
    
    handleTaskActionsClose();
  };
  
  const handleDeleteTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      setSnackbar({
        open: true,
        message: 'Task deleted successfully',
        severity: 'success'
      });
      
      // Refresh tasks list
      const tasksResponse = await taskAPI.getAllTasks(1, 100);
      setTasks(tasksResponse.data || []);
      
      // Update stats
      const statsResponse = await adminAPI.getDashboardStats();
      setAdminStats(statsResponse.data);
      
      // Update task analytics
      const taskAnalyticsResponse = await adminAPI.getTaskAnalytics();
      const taskStatusCounts = taskAnalyticsResponse.data?.statusDistribution || [];
      setTaskStatusData(taskStatusCounts);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to delete task',
        severity: 'error'
      });
    }
    
    handleTaskActionsClose();
  };
  
  // User management functions
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUserSubmit = async () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.role || !newUser.password) {
      setSnackbar({
        open: true,
        message: 'Please fill all required fields',
        severity: 'error'
      });
      return;
    }
    
    if (newUser.password !== newUser.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Passwords do not match',
        severity: 'error'
      });
      return;
    }
    
    try {
      await userAPI.createUser({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        phone: newUser.phone,
        password: newUser.password
      });
      
      setSnackbar({
        open: true,
        message: 'User created successfully',
        severity: 'success'
      });
      setUserDialogOpen(false);
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        role: 'client',
        status: 'active',
        phone: '',
        password: '',
        confirmPassword: ''
      });
      
      // Refresh users list
      const usersResponse = await userAPI.getAllUsers(1, 100);
      setUsers(usersResponse.data || []);
      
      // Update stats
      const statsResponse = await adminAPI.getDashboardStats();
      setAdminStats(statsResponse.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to create user',
        severity: 'error'
      });
    }
  };
  
  const handleUserActionsClick = (event, user) => {
    setUserActionsMenuAnchor(event.currentTarget);
    setSelectedUser(user);
  };
  
  const handleUserActionsClose = () => {
    setUserActionsMenuAnchor(null);
    setSelectedUser(null);
  };
  
  const handleDeleteUser = async (userId) => {
    try {
      await userAPI.deleteUser(userId);
      setSnackbar({
        open: true,
        message: 'User deleted successfully',
        severity: 'success'
      });
      
      // Refresh users list
      const usersResponse = await userAPI.getAllUsers(1, 100);
      setUsers(usersResponse.data || []);
      
      // Update stats
      const statsResponse = await adminAPI.getDashboardStats();
      setAdminStats(statsResponse.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to delete user',
        severity: 'error'
      });
    }
    
    handleUserActionsClose();
  };
  
  // Helper functions
  const getTaskPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.info.main;
    }
  };
  
  const getTaskStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return theme.palette.success.main;
      case 'in_progress':
        return theme.palette.warning.main;
      case 'pending':
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };
  
  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <Warning color="warning" />;
      case 'info':
        return <Info color="info" />;
      default:
        return <CheckCircle color="success" />;
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Pagination handlers
  const handleUserPageChange = (event, newPage) => {
    setUserPage(newPage);
  };
  
  const handleUserRowsPerPageChange = (event) => {
    setUserRowsPerPage(parseInt(event.target.value, 10));
    setUserPage(0);
  };
  
  const handleTaskPageChange = (event, newPage) => {
    setTaskPage(newPage);
  };
  
  const handleTaskRowsPerPageChange = (event) => {
    setTaskRowsPerPage(parseInt(event.target.value, 10));
    setTaskPage(0);
  };
  
  // Chart colors
  const TASK_STATUS_COLORS = ['#0088FE', '#FFBB28', '#00C49F'];
  // Removed unused colors
  // const REVENUE_COLORS = ['#8884d8', '#82ca9d'];
  
  if (loading && !refreshing) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      </Container>
    );
  }
  
  if (error && !refreshing) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
          <Button color="inherit" size="small" onClick={handleRefresh} sx={{ ml: 2 }}>
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Fade in={true} timeout={800}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: { xs: '1.8rem', sm: '2.125rem' }, 
              fontWeight: 'bold',
              fontFamily: 'Montserrat, sans-serif',
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px'
            }}
          >
            Admin Dashboard
          </Typography>
        </Fade>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<WhatsApp />}
            onClick={() => setShowWhatsAppSection(!showWhatsAppSection)}
            sx={{ 
              borderRadius: 8,
              borderColor: '#25D366',
              color: '#25D366',
              '&:hover': {
                borderColor: '#128C7E',
                backgroundColor: 'rgba(37, 211, 102, 0.08)'
              }
            }}
          >
            {showWhatsAppSection ? 'Hide WhatsApp' : 'Show WhatsApp'}
          </Button>
          
          <Tooltip title="Refresh Dashboard">
            <IconButton onClick={handleRefresh} color="primary">
              <Refresh sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
        <Fade in={true} timeout={800}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: { xs: '1.8rem', sm: '2.125rem' }, 
              fontWeight: 'bold',
              fontFamily: 'Montserrat, sans-serif',
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px'
            }}
          >
            Admin Dashboard
          </Typography>
        </Fade>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<WhatsApp />}
            onClick={() => setShowWhatsAppSection(!showWhatsAppSection)}
            sx={{ 
              borderRadius: 8,
              borderColor: '#25D366',
              color: '#25D366',
              '&:hover': {
                borderColor: '#128C7E',
                backgroundColor: 'rgba(37, 211, 102, 0.08)'
              }
            }}
          >
            {showWhatsAppSection ? 'Hide WhatsApp' : 'Show WhatsApp'}
          </Button>
          
          <Tooltip title="Refresh Dashboard">
            <IconButton onClick={handleRefresh} color="primary">
            <Refresh sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Zoom in={true} timeout={500}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: theme.palette.primary.main
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.main', mr: 2 }}>
                  <People />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                  Total Users
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {adminStats?.totalUsers || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {adminStats?.activeClients || 0} active clients
              </Typography>
            </Paper>
          </Zoom>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Zoom in={true} timeout={700}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: theme.palette.warning.main
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.lighter', color: 'warning.main', mr: 2 }}>
                  <Assignment />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                  Tasks
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {(adminStats?.pendingTasks || 0) + (adminStats?.completedTasks || 0)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  {adminStats?.pendingTasks || 0} pending
                </Typography>
                <Typography variant="body2" color="success.main">
                  {adminStats?.completedTasks || 0} completed
                </Typography>
              </Box>
            </Paper>
          </Zoom>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Zoom in={true} timeout={900}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: theme.palette.success.main
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.lighter', color: 'success.main', mr: 2 }}>
                  <AttachMoney />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                  Revenue
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {formatCurrency(adminStats?.revenue || 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {revenueData.length > 0 ? 
                  `${revenueData[revenueData.length - 1].growth > 0 ? '+' : ''}${revenueData[revenueData.length - 1].growth}% from last month` : 
                  'No growth data available'}
              </Typography>
            </Paper>
          </Zoom>
        </Grid>
      </Grid>
      
      {/* WhatsApp Business Section */}
      {showWhatsAppSection && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: `linear-gradient(90deg, #25D366 0%, #128C7E 100%)`
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WhatsApp sx={{ color: '#25D366', mr: 1 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontFamily: 'Montserrat, sans-serif',
                      background: 'linear-gradient(90deg, #25D366 0%, #128C7E 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.5px'
                    }}
                  >
                    WhatsApp Business
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setShowWhatsAppSection(false)}
                  sx={{ borderRadius: 8 }}
                >
                  Hide
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                {/* WhatsApp Conversations */}
                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Message sx={{ color: 'primary.main', mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Conversations ({whatsappConversations.length})
                      </Typography>
                    </Box>
                    {whatsappConversations.slice(0, 5).map((conv) => (
                      <Box key={conv.phone_number} sx={{ mb: 1, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {conv.phone_number}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {conv.state} • {new Date(conv.updated_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    ))}
                  </Paper>
                </Grid>
                
                {/* WhatsApp Appointments */}
                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Schedule sx={{ color: 'success.main', mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Appointments ({whatsappAppointments.length})
                      </Typography>
                    </Box>
                    {whatsappAppointments.slice(0, 5).map((appt) => (
                      <Box key={appt.id} sx={{ mb: 1, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {appt.phone_number}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(appt.appointment_date).toLocaleDateString()} at {appt.appointment_time}
                        </Typography>
                        <Chip 
                          label={appt.status} 
                          size="small" 
                          sx={{ ml: 1 }}
                          color={appt.status === 'scheduled' ? 'primary' : 'success'}
                        />
                      </Box>
                    ))}
                  </Paper>
                </Grid>
                
                {/* WhatsApp Support Tickets */}
                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Support sx={{ color: 'warning.main', mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Support Tickets ({whatsappSupportTickets.length})
                      </Typography>
                    </Box>
                    {whatsappSupportTickets.slice(0, 5).map((ticket) => (
                      <Box key={ticket.id} sx={{ mb: 1, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {ticket.phone_number}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          {ticket.message.substring(0, 50)}...
                        </Typography>
                        <Chip 
                          label={ticket.status} 
                          size="small" 
                          sx={{ mt: 0.5 }}
                          color={ticket.status === 'open' ? 'warning' : 'info'}
                        />
                      </Box>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<WhatsApp />}
                  onClick={() => window.open('/admin/whatsapp', '_blank')}
                  sx={{
                    background: 'linear-gradient(90deg, #25D366 0%, #128C7E 100%)',
                    borderRadius: 8,
                    '&:hover': {
                      background: 'linear-gradient(90deg, #128C7E 0%, #075E54 100%)',
                    }
                  }}
                >
                  Open WhatsApp Admin Panel
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
      
      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Task Management Section */}
        <Grid item xs={12} lg={8}>
          <Zoom in={true} timeout={1100}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                mb: 3,
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Assignment sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontFamily: 'Montserrat, sans-serif',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Task Management
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setTaskDialogOpen(true)}
                  sx={{ 
                    borderRadius: 8,
                    py: 1.2,
                    px: 2.5,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 25px 0 rgba(30, 58, 138, 0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Assign Task
                </Button>
              </Box>
              
              {tasks.length > 0 ? (
                <>
                  <TableContainer sx={{ maxHeight: 400 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ 
                            fontFamily: 'Montserrat, sans-serif', 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>Title</TableCell>
                          <TableCell sx={{ 
                            fontFamily: 'Montserrat, sans-serif', 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>Assignee</TableCell>
                          <TableCell sx={{ 
                            fontFamily: 'Montserrat, sans-serif', 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>Priority</TableCell>
                          <TableCell sx={{ 
                            fontFamily: 'Montserrat, sans-serif', 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>Status</TableCell>
                          <TableCell sx={{ 
                            fontFamily: 'Montserrat, sans-serif', 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>Due Date</TableCell>
                          <TableCell align="right" sx={{ 
                            fontFamily: 'Montserrat, sans-serif', 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tasks
                          .slice(taskPage * taskRowsPerPage, taskPage * taskRowsPerPage + taskRowsPerPage)
                          .map((task) => (
                            <TableRow key={task.id} hover>
                              <TableCell>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                                  {task.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {task.description?.length > 50 ? `${task.description.substring(0, 50)}...` : task.description}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Avatar 
                                    sx={{ 
                                      width: 28, 
                                      height: 28, 
                                      mr: 1, 
                                      fontSize: '0.875rem',
                                      bgcolor: 'primary.main'
                                    }}
                                  >
                                    {task.assigneeName?.split(' ').map(n => n[0]).join('') || 'U'}
                                  </Avatar>
                                  <Typography variant="body2">
                                    {task.assigneeName || 'Unassigned'}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Chip 
                                  label={task.priority} 
                                  size="small" 
                                  sx={{ 
                                    bgcolor: `${getTaskPriorityColor(task.priority)}20`,
                                    color: getTaskPriorityColor(task.priority),
                                    fontWeight: 'medium',
                                    textTransform: 'capitalize',
                                    fontFamily: 'Inter, sans-serif',
                                    borderRadius: '16px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                      opacity: 0.9,
                                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                                    },
                                    transition: 'all 0.3s ease'
                                  }} 
                                />
                              </TableCell>
                              <TableCell>
                                <Chip 
                                  label={task.status?.replace('_', ' ')} 
                                  size="small" 
                                  sx={{ 
                                    bgcolor: `${getTaskStatusColor(task.status)}20`,
                                    color: getTaskStatusColor(task.status),
                                    fontWeight: 'medium',
                                    textTransform: 'capitalize',
                                    fontFamily: 'Inter, sans-serif',
                                    borderRadius: '16px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                      opacity: 0.9,
                                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                                    },
                                    transition: 'all 0.3s ease'
                                  }} 
                                />
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body2">
                                    {formatDate(task.dueDate)}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  size="small"
                                  onClick={(e) => handleTaskActionsClick(e, task)}
                                >
                                  <MoreVert />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <TablePagination
                    component="div"
                    count={tasks.length}
                    page={taskPage}
                    onPageChange={handleTaskPageChange}
                    rowsPerPage={taskRowsPerPage}
                    onRowsPerPageChange={handleTaskRowsPerPageChange}
                    rowsPerPageOptions={[5, 10, 25]}
                  />
                </>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  py: 4
                }}>
                  <Assignment sx={{ fontSize: 48, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
                  <Typography variant="body1" color="text.secondary" align="center">
                    No tasks found. Create your first task to get started.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Zoom>
          
          {/* User Management Section */}
          <Zoom in={true} timeout={1300}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <People sx={{ color: 'secondary.main', mr: 1 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontFamily: 'Montserrat, sans-serif',
                      background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.5px'
                    }}
                  >
                    User Management
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  onClick={() => setUserDialogOpen(true)}
                  sx={{ 
                    borderRadius: 8,
                    py: 1.2,
                    px: 2.5,
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 25px 0 rgba(16, 185, 129, 0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Add User
                </Button>
              </Box>
              
              {users.length > 0 ? (
                <>
                  <TableContainer sx={{ maxHeight: 400 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ 
                            fontFamily: 'Montserrat, sans-serif', 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>Name</TableCell>
                          <TableCell sx={{ 
                            fontFamily: 'Montserrat, sans-serif', 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>Email</TableCell>
                          <TableCell sx={{ 
                            fontFamily: 'Montserrat, sans-serif', 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>Role</TableCell>
                          <TableCell sx={{ 
                            fontFamily: 'Montserrat, sans-serif', 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>Status</TableCell>
                          <TableCell sx={{ 
                            fontFamily: 'Montserrat, sans-serif', 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>Last Login</TableCell>
                          <TableCell align="right" sx={{ 
                            fontFamily: 'Montserrat, sans-serif', 
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users
                          .slice(userPage * userRowsPerPage, userPage * userRowsPerPage + userRowsPerPage)
                          .map((user) => (
                            <TableRow key={user.id} hover>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Avatar 
                                    sx={{ 
                                      width: 32, 
                                      height: 32, 
                                      mr: 1,
                                      bgcolor: user.role === 'admin' ? 'secondary.main' : 'primary.main'
                                    }}
                                  >
                                    {user.firstName?.[0]}{user.lastName?.[0]}
                                  </Avatar>
                                  <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                                      {`${user.firstName} ${user.lastName}`}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {user.phone || 'No phone'}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={user.role} 
                                  size="small" 
                                  icon={user.role === 'admin' ? <SupervisorAccount fontSize="small" /> : <Person fontSize="small" />}
                                  sx={{ 
                                    bgcolor: user.role === 'admin' ? 'secondary.lighter' : 'primary.lighter',
                                    color: user.role === 'admin' ? 'secondary.dark' : 'primary.dark',
                                    fontWeight: 'medium',
                                    textTransform: 'capitalize',
                                    fontFamily: 'Inter, sans-serif',
                                    borderRadius: '16px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                      opacity: 0.9,
                                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                                    },
                                    transition: 'all 0.3s ease'
                                  }} 
                                />
                              </TableCell>
                              <TableCell>
                                <Chip 
                                  label={user.status} 
                                  size="small" 
                                  sx={{ 
                                    bgcolor: user.status === 'active' ? 'success.lighter' : 'error.lighter',
                                    color: user.status === 'active' ? 'success.dark' : 'error.dark',
                                    fontWeight: 'medium',
                                    textTransform: 'capitalize',
                                    fontFamily: 'Inter, sans-serif',
                                    borderRadius: '16px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                      opacity: 0.9,
                                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                                    },
                                    transition: 'all 0.3s ease'
                                  }} 
                                />
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body2">
                                    {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  size="small"
                                  onClick={(e) => handleUserActionsClick(e, user)}
                                >
                                  <MoreVert />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <TablePagination
                    component="div"
                    count={users.length}
                    page={userPage}
                    onPageChange={handleUserPageChange}
                    rowsPerPage={userRowsPerPage}
                    onRowsPerPageChange={handleUserRowsPerPageChange}
                    rowsPerPageOptions={[5, 10, 25]}
                  />
                </>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  py: 4
                }}>
                  <People sx={{ fontSize: 48, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
                  <Typography variant="body1" color="text.secondary" align="center">
                    No users found. Add your first user to get started.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Zoom>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          {/* System Alerts Section */}
          <Zoom in={true} timeout={1100}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                mb: 3,
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: `linear-gradient(90deg, ${theme.palette.error.main} 0%, ${theme.palette.warning.main} 100%)`
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Warning sx={{ color: 'error.main', mr: 1 }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat, sans-serif',
                    background: `linear-gradient(90deg, ${theme.palette.error.main} 0%, ${theme.palette.warning.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.5px'
                  }}
                >
                  System Alerts
                </Typography>
              </Box>
              
              {systemAlerts.length > 0 ? (
                <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
                  {systemAlerts.map((alert) => (
                    <ListItem
                      key={alert.id}
                      sx={{
                        mb: 2,
                        display: 'block'
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          bgcolor:
                            alert.type === 'error'
                              ? 'error.lighter'
                              : alert.type === 'warning'
                              ? 'warning.lighter'
                              : alert.type === 'info'
                              ? 'info.lighter'
                              : 'success.lighter',
                          borderRadius: 2,
                          boxShadow: '0 4px 15px 0 rgba(0,0,0,0.05)',
                          backdropFilter: 'blur(4px)',
                          WebkitBackdropFilter: 'blur(4px)',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 25px 0 rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 1.5,
                              mr: 2,
                              background:
                                alert.type === 'error'
                                  ? `linear-gradient(135deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`
                                  : alert.type === 'warning'
                                  ? `linear-gradient(135deg, ${theme.palette.warning.light} 0%, ${theme.palette.warning.main} 100%)`
                                  : alert.type === 'info'
                                  ? `linear-gradient(135deg, ${theme.palette.info.light} 0%, ${theme.palette.info.main} 100%)`
                                  : `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
                              boxShadow: '0 4px 10px 0 rgba(0,0,0,0.1)',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            {getAlertIcon(alert.type)}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 'medium',
                                fontFamily: 'Montserrat, sans-serif',
                                color:
                                  alert.type === 'error'
                                    ? 'error.dark'
                                    : alert.type === 'warning'
                                    ? 'warning.dark'
                                    : alert.type === 'info'
                                    ? 'info.dark'
                                    : 'success.dark',
                                letterSpacing: '0.3px'
                              }}
                            >
                              {alert.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {alert.message}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <AccessTime
                                fontSize="small"
                                sx={{
                                  mr: 1,
                                  color: 'text.secondary',
                                  fontSize: '0.875rem'
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {formatDateTime(alert.timestamp)}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  py: 4
                }}>
                  <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2, opacity: 0.5 }} />
                  <Typography variant="body1" color="text.secondary" align="center">
                    No system alerts. Everything is running smoothly.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Zoom>
          
          {/* Analytics Charts */}
          <Zoom in={true} timeout={1300}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                mb: 3,
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: `linear-gradient(90deg, ${theme.palette.info.main} 0%, ${theme.palette.primary.main} 100%)`
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PieChartIcon sx={{ color: 'info.main', mr: 1 }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat, sans-serif',
                    background: `linear-gradient(90deg, ${theme.palette.info.main} 0%, ${theme.palette.primary.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.5px'
                  }}
                >
                  Task Distribution
                </Typography>
              </Box>
              
              {taskStatusData.length > 0 ? (
                <Box sx={{ height: 250, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={30}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        paddingAngle={5}
                      >
                        {taskStatusData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={TASK_STATUS_COLORS[index % TASK_STATUS_COLORS.length]} 
                            stroke="rgba(255,255,255,0.5)"
                            strokeWidth={1}
                          />
                        ))}
                      </Pie>
                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        formatter={(value) => (
                          <span style={{ fontFamily: 'Inter, sans-serif', color: '#059669', fontWeight: 'bold', textShadow: '0 1px 2px rgba(5,150,105,0.2)' }}>
                            {value}
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  py: 4
                }}>
                  <PieChartIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
                  <Typography variant="body1" color="text.secondary" align="center">
                    No task data available.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Zoom>
          
          <Zoom in={true} timeout={1500}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: `linear-gradient(90deg, ${theme.palette.success.main} 0%, ${theme.palette.secondary.main} 100%)`
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat, sans-serif',
                    background: `linear-gradient(90deg, ${theme.palette.success.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.5px'
                  }}
                >
                  Revenue Trends
                </Typography>
              </Box>
              
              {revenueData.length > 0 ? (
                <Box sx={{ height: 250, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={theme.palette.success.main} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={theme.palette.success.main} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontFamily: 'Inter, sans-serif', fontSize: 12 }}
                        stroke={theme.palette.text.secondary}
                      />
                      <YAxis 
                        tick={{ fontFamily: 'Inter, sans-serif', fontSize: 12 }}
                        stroke={theme.palette.text.secondary}
                      />
                      <RechartsTooltip 
                        formatter={(value) => formatCurrency(value)}
                        contentStyle={{ 
                          fontFamily: 'Inter, sans-serif',
                          borderRadius: 8,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                          border: 'none'
                        }}
                      />
                      <Legend 
                        verticalAlign="top" 
                        height={36}
                        formatter={(value) => (
                          <span style={{ fontFamily: 'Inter, sans-serif', color: '#7C3AED', fontWeight: 'bold', textShadow: '0 1px 2px rgba(124,58,237,0.2)' }}>
                            {value}
                          </span>
                        )}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke={theme.palette.success.main}
                        strokeWidth={3}
                        dot={{ stroke: theme.palette.success.main, strokeWidth: 2, r: 4, fill: '#fff' }}
                        activeDot={{ r: 8, stroke: theme.palette.success.main, strokeWidth: 2, fill: '#fff' }}
                        name="Revenue"
                        fillOpacity={1}
                        fill="url(#revenueGradient)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="projected" 
                        stroke={theme.palette.secondary.main}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ stroke: theme.palette.secondary.main, strokeWidth: 2, r: 4, fill: '#fff' }}
                        activeDot={{ r: 8, stroke: theme.palette.secondary.main, strokeWidth: 2, fill: '#fff' }}
                        name="Projected" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  py: 4
                }}>
                  <TrendingUp sx={{ fontSize: 48, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
                  <Typography variant="body1" color="text.secondary" align="center">
                    No revenue data available.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Zoom>
        </Grid>
      </Grid>
      
      {/* Task Assignment Dialog */}
      <Dialog 
        open={taskDialogOpen} 
        onClose={() => setTaskDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle sx={{ 
          fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 600,
          background: 'linear-gradient(90deg, #1E3A8A 0%, #3151A6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.01em',
          pb: 1,
          borderBottom: '2px solid',
          borderImage: 'linear-gradient(90deg, #1E3A8A 0%, #10B981 100%) 1',
        }}>
          Assign New Task
        </DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <TextField
              label="Task Title"
              fullWidth
              name="title"
              value={newTask.title}
              onChange={handleTaskChange}
              margin="normal"
              required
              InputProps={{
                sx: {
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                  borderRadius: '8px',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  },
                  transition: 'box-shadow 0.3s ease'
                }
              }}
            />
            
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              name="description"
              value={newTask.description}
              onChange={handleTaskChange}
              margin="normal"
            />
            
            <FormControl fullWidth margin="normal" required>
              <InputLabel sx={{ fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }}>Assignee</InputLabel>
              <Select
                name="assigneeId"
                value={newTask.assigneeId}
                onChange={handleTaskChange}
                label="Assignee"
                sx={{
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                  borderRadius: '8px',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  },
                  transition: 'box-shadow 0.3s ease'
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: '12px',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                      mt: 0.5,
                      maxHeight: 300
                    }
                  }
                }}
              >
                {users.map((user) => (
                  <MenuItem 
                    key={user.id} 
                    value={user.id}
                    sx={{
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      '&:hover': {
                        background: 'rgba(16, 185, 129, 0.08)'
                      }
                    }}
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={newTask.priority}
                onChange={handleTaskChange}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleTaskChange}
              margin="normal"
              InputLabelProps={{ 
                shrink: true,
                sx: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }
              }}
              required
              inputProps={{ min: new Date().toISOString().split('T')[0] }}
              InputProps={{
                sx: {
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                  borderRadius: '8px',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  },
                  transition: 'box-shadow 0.3s ease'
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTaskDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleTaskSubmit}
            disabled={!newTask.title || !newTask.assigneeId || !newTask.dueDate}
          >
            Assign Task
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Add User Dialog */}
      <Dialog 
        open={userDialogOpen} 
        onClose={() => setUserDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle sx={{ 
          fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 600,
          background: 'linear-gradient(90deg, #1E3A8A 0%, #3151A6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.01em',
          pb: 1,
          borderBottom: '2px solid',
          borderImage: 'linear-gradient(90deg, #1E3A8A 0%, #10B981 100%) 1',
        }}>
          Add New User
        </DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleUserChange}
                  margin="normal"
                  required
                  InputProps={{
                    sx: {
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      borderRadius: '8px',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                      },
                      transition: 'box-shadow 0.3s ease'
                    }
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleUserChange}
                  margin="normal"
                  required
                />
              </Grid>
            </Grid>
            
            <TextField
              label="Email"
              fullWidth
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleUserChange}
              margin="normal"
              required
              InputProps={{
                sx: {
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                  borderRadius: '8px',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  },
                  transition: 'box-shadow 0.3s ease'
                }
              }}
              InputLabelProps={{
                sx: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }
              }}
            />
            
            <TextField
              label="Phone Number"
              fullWidth
              name="phone"
              value={newUser.phone}
              onChange={handleUserChange}
              margin="normal"
            />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel sx={{ fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }}>Role</InputLabel>
                  <Select
                    name="role"
                    value={newUser.role}
                    onChange={handleUserChange}
                    label="Role"
                    sx={{
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      borderRadius: '8px',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                      },
                      transition: 'box-shadow 0.3s ease'
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          borderRadius: '12px',
                          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                          mt: 0.5
                        }
                      }
                    }}
                  >
                    <MenuItem 
                      value="admin"
                      sx={{
                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                        '&:hover': {
                          background: 'rgba(16, 185, 129, 0.08)'
                        }
                      }}
                    >
                      Admin
                    </MenuItem>
                    <MenuItem 
                      value="tax_professional"
                      sx={{
                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                        '&:hover': {
                          background: 'rgba(16, 185, 129, 0.08)'
                        }
                      }}
                    >
                      Tax Professional
                    </MenuItem>
                    <MenuItem 
                      value="client"
                      sx={{
                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                        '&:hover': {
                          background: 'rgba(16, 185, 129, 0.08)'
                        }
                      }}
                    >
                      Client
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={newUser.status}
                    onChange={handleUserChange}
                    label="Status"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <TextField
              label="Password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={newUser.password}
              onChange={handleUserChange}
              margin="normal"
              required
              InputLabelProps={{
                sx: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }
              }}
              InputProps={{
                sx: {
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                  borderRadius: '8px',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  },
                  transition: 'box-shadow 0.3s ease'
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: 'rgba(30, 58, 138, 0.08)'
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              label="Confirm Password"
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={newUser.confirmPassword}
              onChange={handleUserChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setUserDialogOpen(false)}
            sx={{ 
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              color: theme.palette.text.secondary,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleUserSubmit}
            disabled={!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password || !newUser.confirmPassword}
            sx={{
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              background: 'linear-gradient(90deg, #1E3A8A 0%, #3151A6 100%)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(30, 58, 138, 0.2)',
              '&:hover': {
                background: 'linear-gradient(90deg, #142C6F 0%, #1E3A8A 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(30, 58, 138, 0.3)',
              },
              transition: 'all 0.3s ease',
              '&:disabled': {
                background: 'linear-gradient(90deg, #9CA3AF 0%, #D1D5DB 100%)',
                boxShadow: 'none',
              }
            }}
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Task Actions Menu */}
      <Menu
        anchorEl={taskActionsMenuAnchor}
        open={Boolean(taskActionsMenuAnchor)}
        onClose={handleTaskActionsClose}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            mt: 0.5,
            overflow: 'hidden',
          }
        }}
      >
        {selectedTask?.status !== 'in_progress' && (
          <MenuItem 
            onClick={() => handleTaskStatusChange(selectedTask?.id, 'in_progress')}
            sx={{
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              '&:hover': {
                background: 'rgba(245, 158, 11, 0.08)'
              },
              transition: 'background 0.2s ease'
            }}
          >
            <ListItemIcon>
              <Assignment fontSize="small" color="warning" sx={{ filter: 'drop-shadow(0 2px 3px rgba(245, 158, 11, 0.3))' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Mark as In Progress" 
              primaryTypographyProps={{
                sx: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }
              }}
            />
          </MenuItem>
        )}
        {selectedTask?.status !== 'completed' && (
          <MenuItem 
            onClick={() => handleTaskStatusChange(selectedTask?.id, 'completed')}
            sx={{
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              '&:hover': {
                background: 'rgba(16, 185, 129, 0.08)'
              },
              transition: 'background 0.2s ease'
            }}
          >
            <ListItemIcon>
              <CheckCircle fontSize="small" color="success" sx={{ filter: 'drop-shadow(0 2px 3px rgba(16, 185, 129, 0.3))' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Mark as Completed" 
              primaryTypographyProps={{
                sx: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }
              }}
            />
          </MenuItem>
        )}
        <MenuItem 
          onClick={handleTaskActionsClose}
          sx={{
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            '&:hover': {
              background: 'rgba(30, 58, 138, 0.08)'
            },
            transition: 'background 0.2s ease'
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" color="primary" sx={{ filter: 'drop-shadow(0 2px 3px rgba(30, 58, 138, 0.3))' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Edit" 
            primaryTypographyProps={{
              sx: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }
            }}
          />
        </MenuItem>
        <MenuItem 
          onClick={() => handleDeleteTask(selectedTask?.id)}
          sx={{
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            '&:hover': {
              background: 'rgba(239, 68, 68, 0.08)'
            },
            transition: 'background 0.2s ease'
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" color="error" sx={{ filter: 'drop-shadow(0 2px 3px rgba(239, 68, 68, 0.3))' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Delete" 
            primaryTypographyProps={{
              sx: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }
            }}
          />
        </MenuItem>
      </Menu>
      
      {/* User Actions Menu */}
      <Menu
        anchorEl={userActionsMenuAnchor}
        open={Boolean(userActionsMenuAnchor)}
        onClose={handleUserActionsClose}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            mt: 0.5,
            overflow: 'hidden',
          }
        }}
      >
        <MenuItem 
          onClick={handleUserActionsClose}
          sx={{
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            '&:hover': {
              background: 'rgba(30, 58, 138, 0.08)'
            },
            transition: 'background 0.2s ease'
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" color="primary" sx={{ filter: 'drop-shadow(0 2px 3px rgba(30, 58, 138, 0.3))' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Edit" 
            primaryTypographyProps={{
              sx: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }
            }}
          />
        </MenuItem>
        <MenuItem 
          onClick={() => handleDeleteUser(selectedUser?.id)}
          sx={{
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            '&:hover': {
              background: 'rgba(239, 68, 68, 0.08)'
            },
            transition: 'background 0.2s ease'
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" color="error" sx={{ filter: 'drop-shadow(0 2px 3px rgba(239, 68, 68, 0.3))' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Delete" 
            primaryTypographyProps={{
              sx: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }
            }}
          />
        </MenuItem>
      </Menu>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ mb: 2, mr: 2 }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(10px)',
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            '& .MuiAlert-icon': {
              filter: `drop-shadow(0 2px 3px ${snackbar.severity === 'success' ? 'rgba(16, 185, 129, 0.3)' : 
                snackbar.severity === 'error' ? 'rgba(239, 68, 68, 0.3)' : 
                snackbar.severity === 'warning' ? 'rgba(245, 158, 11, 0.3)' : 
                'rgba(59, 130, 246, 0.3)'})`
            }
          }}
          variant="filled"
          elevation={6}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default NewAdminDashboard;