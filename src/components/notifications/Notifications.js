import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Badge,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Fade,
  Collapse,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Info,
  Warning,
  Error as ErrorIcon,
  CheckCircle,
  Delete,
  MarkEmailRead,
  MarkEmailUnread,
  Settings,
  Event,
  Description,
  AccountBalance,
  Schedule,
  Clear,
} from '@mui/icons-material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`notifications-tabpanel-${index}`}
      aria-labelledby={`notifications-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Notifications() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [tabValue, setTabValue] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    documentUpdates: true,
    taxDeadlines: true,
    systemUpdates: false,
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Tax Return Ready for Review',
      message: 'Your 2024 tax return has been prepared and is ready for your review and approval.',
      type: 'success',
      category: 'tax-return',
      timestamp: '2024-02-10T10:30:00Z',
      read: false,
      priority: 'high',
      actionRequired: true,
    },
    {
      id: 2,
      title: 'Appointment Reminder',
      message: 'You have an appointment scheduled for tomorrow at 2:00 PM with Sarah Johnson, EA.',
      type: 'info',
      category: 'appointment',
      timestamp: '2024-02-09T14:00:00Z',
      read: false,
      priority: 'medium',
      actionRequired: false,
    },
    {
      id: 3,
      title: 'Document Upload Required',
      message: 'Please upload your W-2 forms to complete your tax return preparation.',
      type: 'warning',
      category: 'document',
      timestamp: '2024-02-08T09:15:00Z',
      read: true,
      priority: 'high',
      actionRequired: true,
    },
    {
      id: 4,
      title: 'Tax Deadline Reminder',
      message: 'Reminder: The tax filing deadline is April 15, 2024. Ensure all documents are submitted.',
      type: 'info',
      category: 'deadline',
      timestamp: '2024-02-07T08:00:00Z',
      read: true,
      priority: 'medium',
      actionRequired: false,
    },
    {
      id: 5,
      title: 'Payment Processed',
      message: 'Your payment of $350.00 for tax preparation services has been successfully processed.',
      type: 'success',
      category: 'payment',
      timestamp: '2024-02-06T16:45:00Z',
      read: true,
      priority: 'low',
      actionRequired: false,
    },
    {
      id: 6,
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance will occur on February 15th from 2:00 AM to 4:00 AM EST.',
      type: 'warning',
      category: 'system',
      timestamp: '2024-02-05T12:00:00Z',
      read: false,
      priority: 'low',
      actionRequired: false,
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAsUnread = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: false } : notif
    ));
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleSettingChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const getNotificationIcon = (type, category) => {
    const iconMap = {
      success: <CheckCircle color="success" />,
      warning: <Warning color="warning" />,
      error: <ErrorIcon color="error" />,
      info: <Info color="info" />,
    };

    const categoryIconMap = {
      'tax-return': <AccountBalance />,
      'appointment': <Event />,
      'document': <Description />,
      'deadline': <Schedule />,
      'payment': <AccountBalance />,
      'system': <Settings />,
    };

    return iconMap[type] || categoryIconMap[category] || <NotificationsIcon />;
  };

  const getPriorityChip = (priority) => {
    const priorityConfig = {
      high: { color: 'error', label: 'High Priority' },
      medium: { color: 'warning', label: 'Medium Priority' },
      low: { color: 'default', label: 'Low Priority' },
    };

    const config = priorityConfig[priority] || { color: 'default', label: 'Normal' };

    return (
      <Chip
        label={config.label}
        color={config.color}
        size="small"
        variant="outlined"
      />
    );
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const filterNotifications = (filter) => {
    switch (filter) {
      case 'unread':
        return notifications.filter(notif => !notif.read);
      case 'important':
        return notifications.filter(notif => notif.priority === 'high' || notif.actionRequired);
      case 'all':
      default:
        return notifications;
    }
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;
  const importantCount = notifications.filter(notif => notif.priority === 'high' || notif.actionRequired).length;

  const NotificationList = ({ notifications }) => (
    <List>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <ListItem
            key={notification.id}
            divider
            sx={{
              bgcolor: notification.read ? 'transparent' : 'action.hover',
              borderLeft: notification.actionRequired ? '4px solid' : 'none',
              borderLeftColor: notification.actionRequired ? 'warning.main' : 'transparent',
            }}
          >
            <ListItemIcon>
              <Badge
                variant="dot"
                color="primary"
                invisible={notification.read}
              >
                {getNotificationIcon(notification.type, notification.category)}
              </Badge>
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={notification.read ? 400 : 600}
                  >
                    {notification.title}
                  </Typography>
                  {notification.actionRequired && (
                    <Chip label="Action Required" color="warning" size="small" />
                  )}
                  {getPriorityChip(notification.priority)}
                </Box>
              }
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {formatTimestamp(notification.timestamp)}
                  </Typography>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  edge="end"
                  aria-label={notification.read ? "mark as unread" : "mark as read"}
                  onClick={() => notification.read ? handleMarkAsUnread(notification.id) : handleMarkAsRead(notification.id)}
                >
                  {notification.read ? <MarkEmailUnread /> : <MarkEmailRead />}
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(notification.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText
            primary={
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <NotificationsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  No notifications found
                </Typography>
              </Box>
            }
          />
        </ListItem>
      )}
    </List>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={800}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Settings />}
                onClick={() => setShowSettings(!showSettings)}
              >
                Settings
              </Button>
              <Button
                variant="outlined"
                startIcon={<MarkEmailRead />}
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark All Read
              </Button>
              <Button
                variant="outlined"
                startIcon={<Clear />}
                onClick={handleClearAll}
                disabled={notifications.length === 0}
                color="error"
              >
                Clear All
              </Button>
            </Box>
          </Box>

          {/* Notification Settings */}
          <Collapse in={showSettings}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Notification Preferences
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onChange={() => handleSettingChange('emailNotifications')}
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onChange={() => handleSettingChange('smsNotifications')}
                      />
                    }
                    label="SMS Notifications"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.appointmentReminders}
                        onChange={() => handleSettingChange('appointmentReminders')}
                      />
                    }
                    label="Appointment Reminders"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.documentUpdates}
                        onChange={() => handleSettingChange('documentUpdates')}
                      />
                    }
                    label="Document Updates"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.taxDeadlines}
                        onChange={() => handleSettingChange('taxDeadlines')}
                      />
                    }
                    label="Tax Deadline Reminders"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.systemUpdates}
                        onChange={() => handleSettingChange('systemUpdates')}
                      />
                    }
                    label="System Updates"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Collapse>

          {/* Quick Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    {notifications.length}
                  </Typography>
                  <Typography variant="body1">Total Notifications</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main" gutterBottom>
                    {unreadCount}
                  </Typography>
                  <Typography variant="body1">Unread</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main" gutterBottom>
                    {importantCount}
                  </Typography>
                  <Typography variant="body1">Important</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Notification Tabs */}
          <Paper>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab 
                label={
                  <Badge badgeContent={notifications.length} color="primary">
                    All Notifications
                  </Badge>
                } 
              />
              <Tab 
                label={
                  <Badge badgeContent={unreadCount} color="error">
                    Unread
                  </Badge>
                } 
              />
              <Tab 
                label={
                  <Badge badgeContent={importantCount} color="warning">
                    Important
                  </Badge>
                } 
              />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <NotificationList notifications={filterNotifications('all')} />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <NotificationList notifications={filterNotifications('unread')} />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <NotificationList notifications={filterNotifications('important')} />
            </TabPanel>
          </Paper>
        </Box>
      </Fade>
    </Container>
  );
}

export default Notifications;