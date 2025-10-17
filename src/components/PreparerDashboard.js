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
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Alert,
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
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useTaskManagement, TaskManagementProvider } from '../contexts/TaskManagementContext';
import AdminTaskPanel from './dashboard/AdminTaskPanel';
import EmployeeTaskView from './EmployeeTaskView';

const PreparerDashboard = () => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [currentView, setCurrentView] = useState('dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Check user role - admin users can access admin panel, others see employee view
  const isAdmin = user?.role === 'admin' || user?.email?.includes('admin') || user?.role === 'tax_professional';

  useEffect(() => {
    // Set default view based on user role
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

  // Navigation items based on user role
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
    
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome to Preparer Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
                {isAdmin 
                  ? 'Manage tasks, assign work to your team, and track progress across all projects.'
                  : 'View your assigned tasks, track your progress, and collaborate with your team.'
                }
              </Typography>

              <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Assignment sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                      <Typography variant="h4">{userTasks.length}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {isAdmin ? 'Total Tasks' : 'My Tasks'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Work sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                      <Typography variant="h4">
                        {userTasks.filter(t => t.status === 'in_progress').length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        In Progress
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Assignment sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                      <Typography variant="h4">
                        {userTasks.filter(t => t.status === 'completed' || t.status === 'submitted').length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Completed
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {isAdmin && (
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <People sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                        <Typography variant="h4">{employees.length}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Team Members
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>

              {/* Quick Actions */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                  {isAdmin ? (
                    <>
                      <Button 
                        variant="contained" 
                        startIcon={<Assignment />}
                        onClick={() => handleViewChange('admin-panel')}
                      >
                        Create New Task
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<People />}
                        onClick={() => handleViewChange('team-management')}
                      >
                        Manage Team
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<Analytics />}
                        onClick={() => handleViewChange('analytics')}
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
                      >
                        View My Tasks
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<Work />}
                        onClick={() => handleViewChange('my-tasks')}
                      >
                        Start Working
                      </Button>
                    </>
                  )}                </Box>
              </Paper>

              {/* Recent Activity or Notifications */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                {userTasks.slice(0, 5).map((task) => (
                  <Box key={task.id} display="flex" justifyContent="space-between" alignItems="center" py={1}>
                    <Box>
                      <Typography variant="body2">{task.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {task.assignedBy ? `Assigned by ${task.assignedBy}` : 'Self-assigned'}
                      </Typography>
                    </Box>
                    <Chip 
                      label={task.status.replace('_', ' ')} 
                      size="small" 
                      color={
                        task.status === 'completed' ? 'success' : 
                        task.status === 'in_progress' ? 'warning' : 'default'
                      }
                    />
                  </Box>
                ))}
                {userTasks.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No recent activity
                  </Typography>
                )}
              </Paper>
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
          <Box>
            <Typography variant="h4" gutterBottom>Team Management</Typography>
            <Typography variant="body1">Team management features coming soon...</Typography>
          </Box>
        ) : <Alert severity="error">Access denied. Admin privileges required.</Alert>;
      case 'analytics':
        return isAdmin ? (
          <Box>
            <Typography variant="h4" gutterBottom>Analytics & Reports</Typography>
            <Typography variant="body1">Analytics dashboard coming soon...</Typography>
          </Box>
        ) : <Alert severity="error">Access denied. Admin privileges required.</Alert>;
      case 'settings':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>Settings</Typography>
            <Typography variant="body1">Settings panel coming soon...</Typography>
          </Box>
        );
      case 'help':
        return (
          <Box>
            <Typography variant="h4" gutterBottom>Help & Support</Typography>
            <Typography variant="body1">Help documentation coming soon...</Typography>
          </Box>
        );
      default:
        return <DashboardOverview />;
    }
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography variant="subtitle2">{user?.name || 'User'}</Typography>
            <Typography variant="caption" color="text.secondary">
              {isAdmin ? 'Administrator' : 'Employee'}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {getNavigationItems().map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => handleViewChange(item.id)}
            selected={currentView === item.id}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <TaskManagementProvider>
      <Box sx={{ display: 'flex' }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerOpen ? 280 : 0}px)` },
            ml: { md: drawerOpen ? '280px' : 0 },
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
            
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Affinity Tax Services - Preparer Dashboard
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
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 280,
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