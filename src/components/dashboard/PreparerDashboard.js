import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Alert,
  alpha
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Assignment,
  People,
  Settings,
  Help,
  Logout,
  Notifications,
  AdminPanelSettings,
  Analytics,
  AccountCircle,
  Brightness4,
  Brightness7,
  Work,
  CheckCircle,
  Schedule
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTaskManagement, TaskManagementProvider } from '../../contexts/TaskManagementContext';
import AdminTaskPanel from './AdminTaskPanel';
import EmployeeTaskView from './EmployeeTaskView';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const PreparerDashboard = () => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [currentView, setCurrentView] = useState('dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Check user role
  const isAdmin = user?.role === 'admin' || user?.email?.includes('admin') || user?.role === 'tax_professional';

  useEffect(() => {
    if (isAdmin) {
      setCurrentView('admin-panel');
    } else {
      setCurrentView('my-tasks');
    }
  }, [isAdmin]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const getNavigationItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: <Dashboard />, roles: ['admin', 'employee'] },
      { id: 'my-tasks', label: 'My Tasks', icon: <Assignment />, roles: ['admin', 'employee'] },
    ];

    const adminItems = [
      { id: 'admin-panel', label: 'Admin Panel', icon: <AdminPanelSettings />, roles: ['admin'] },
      { id: 'team-management', label: 'Team Management', icon: <People />, roles: ['admin'] },
      { id: 'analytics', label: 'Analytics', icon: <Analytics />, roles: ['admin'] },
    ];

    const items = [...commonItems];
    if (isAdmin) {
      items.push(...adminItems);
    }

    items.push(
      { id: 'settings', label: 'Settings', icon: <Settings />, roles: ['admin', 'employee'] },
      { id: 'help', label: 'Help & Support', icon: <Help />, roles: ['admin', 'employee'] }
    );

    return items;
  };

  const DashboardOverview = () => {
    const { tasks, getTasksByAssignee, employees } = useTaskManagement();
    const userTasks = isAdmin ? tasks : getTasksByAssignee(user?.id);
    
    const stats = [
      {
        title: isAdmin ? 'Total Tasks' : 'My Tasks',
        value: userTasks.length,
        icon: <Assignment sx={{ fontSize: 40 }} />,
        color: theme.palette.primary.main,
        bgColor: alpha(theme.palette.primary.main, 0.1)
      },
      {
        title: 'In Progress',
        value: userTasks.filter(t => t.status === 'in_progress').length,
        icon: <Work sx={{ fontSize: 40 }} />,
        color: theme.palette.warning.main,
        bgColor: alpha(theme.palette.warning.main, 0.1)
      },
      {
        title: 'Completed',
        value: userTasks.filter(t => t.status === 'completed' || t.status === 'submitted').length,
        icon: <CheckCircle sx={{ fontSize: 40 }} />,
        color: theme.palette.success.main,
        bgColor: alpha(theme.palette.success.main, 0.1)
      }
    ];

    if (isAdmin) {
      stats.push({
        title: 'Team Members',
        value: employees.length,
        icon: <People sx={{ fontSize: 40 }} />,
        color: theme.palette.info.main,
        bgColor: alpha(theme.palette.info.main, 0.1)
      });
    }

    return (
      <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
        <Box mb={4}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Welcome Back, {user?.name?.split(' ')[0] || 'Preparer'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {isAdmin 
              ? 'Manage tasks, assign work to your team, and track progress across all projects.'
              : 'View your assigned tasks, track your progress, and collaborate with your team.'
            }
          </Typography>
        </Box>

        <Grid container spacing={3} mb={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                component={motion.div}
                variants={itemVariants}
                elevation={0}
                sx={{
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: 2, 
                      bgcolor: stat.bgColor,
                      color: stat.color,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="700" color="text.primary">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="500">
                      {stat.title}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card 
              component={motion.div}
              variants={itemVariants}
              elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 3 }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Quick Actions
                </Typography>
                <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
                  {isAdmin ? (
                    <>
                      <Button 
                        variant="contained" 
                        startIcon={<Assignment />}
                        onClick={() => handleViewChange('admin-panel')}
                        sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                      >
                        Create New Task
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<People />}
                        onClick={() => handleViewChange('team-management')}
                        sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                      >
                        Manage Team
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<Analytics />}
                        onClick={() => handleViewChange('analytics')}
                        sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                      >
                        View Analytics
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="contained" 
                        startIcon={<Assignment />}
                        onClick={() => handleViewChange('my-tasks')}
                        sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                      >
                        View My Tasks
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<Work />}
                        onClick={() => handleViewChange('my-tasks')}
                        sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                      >
                        Start Working
                      </Button>
                    </>
                  )}
                </Box>
              </CardContent>
            </Card>

            <Card 
              component={motion.div}
              variants={itemVariants}
              elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Recent Activity
                </Typography>
                <List sx={{ px: 0 }}>
                  {userTasks.slice(0, 5).map((task, index) => (
                    <React.Fragment key={task.id}>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                            <Schedule fontSize="small" />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <Typography variant="subtitle2" fontWeight="600">
                              {task.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary">
                              {task.assignedBy ? `Assigned by ${task.assignedBy}` : 'Self-assigned'} • {new Date().toLocaleDateString()}
                            </Typography>
                          }
                        />
                        <Chip 
                          label={task.status.replace('_', ' ')} 
                          size="small" 
                          sx={{ 
                            borderRadius: 1,
                            fontWeight: 600,
                            bgcolor: task.status === 'completed' ? alpha(theme.palette.success.main, 0.1) : 
                                    task.status === 'in_progress' ? alpha(theme.palette.warning.main, 0.1) : 
                                    alpha(theme.palette.grey[500], 0.1),
                            color: task.status === 'completed' ? 'success.main' : 
                                   task.status === 'in_progress' ? 'warning.main' : 
                                   'text.secondary'
                          }}
                        />
                      </ListItem>
                      {index < Math.min(userTasks.length, 5) - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                  {userTasks.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                      No recent activity to display
                    </Typography>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
             {/* Additional widgets can go here */}
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'admin-panel':
        return isAdmin ? <AdminTaskPanel /> : <Alert severity="error">Access denied. Admin privileges required.</Alert>;
      case 'my-tasks':
        return <EmployeeTaskView />;
      case 'team-management':
        return isAdmin ? (
          <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
            <Typography variant="h4" gutterBottom fontWeight="700">Team Management</Typography>
            <Alert severity="info">Team management features coming soon...</Alert>
          </Box>
        ) : <Alert severity="error">Access denied. Admin privileges required.</Alert>;
      case 'analytics':
        return isAdmin ? (
          <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
            <Typography variant="h4" gutterBottom fontWeight="700">Analytics & Reports</Typography>
            <Alert severity="info">Analytics dashboard coming soon...</Alert>
          </Box>
        ) : <Alert severity="error">Access denied. Admin privileges required.</Alert>;
      case 'settings':
        return (
          <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
            <Typography variant="h4" gutterBottom fontWeight="700">Settings</Typography>
            <Alert severity="info">Settings panel coming soon...</Alert>
          </Box>
        );
      case 'help':
        return (
          <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
            <Typography variant="h4" gutterBottom fontWeight="700">Help & Support</Typography>
            <Alert severity="info">Help documentation coming soon...</Alert>
          </Box>
        );
      default:
        return <DashboardOverview />;
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 40, height: 40 }}>
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight="700">{user?.name || 'User'}</Typography>
            <Typography variant="caption" color="text.secondary">
              {isAdmin ? 'Administrator' : 'Employee'}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 2, pt: 2, flexGrow: 1 }}>
        {getNavigationItems().map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => handleViewChange(item.id)}
            selected={currentView === item.id}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                },
                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{ fontWeight: currentView === item.id ? 600 : 400 }}
            />
          </ListItem>
        ))}
      </List>
      <Box p={2}>
        <Button 
          fullWidth 
          variant="outlined" 
          color="error" 
          startIcon={<Logout />} 
          onClick={handleLogout}
          sx={{ borderRadius: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <TaskManagementProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: { md: `calc(100% - ${drawerOpen ? 280 : 0}px)` },
            ml: { md: drawerOpen ? '280px' : 0 },
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
              Preparer Dashboard
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <Tooltip title="Notifications">
                <IconButton color="inherit">
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Toggle theme">
                <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>

              <Tooltip title="Account">
                <IconButton color="inherit" onClick={handleMenuClick}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Navigation Drawer */}
        <Box
          component="nav"
          sx={{ width: { md: drawerOpen ? 280 : 0 }, flexShrink: { md: 0 } }}
        >
          <Drawer
            variant={isMobile ? 'temporary' : 'persistent'}
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 280,
                borderRight: '1px solid',
                borderColor: 'divider',
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerOpen ? 280 : 0}px)` },
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Toolbar />
          {renderCurrentView()}
        </Box>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </TaskManagementProvider>
  );
};

export default PreparerDashboard;
