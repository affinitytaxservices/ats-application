import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  Badge,
  Stack,
  Alert,
  Fab,
} from '@mui/material';
import {
  AccountBalance,
  Person,
  Schedule,
  CheckCircle,
  Add,
  Edit,
  Visibility,
  Phone,
  Email,
  AttachMoney,
  Notifications,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

function PreparerDashboard() {
  const [stats] = useState({
    activeClients: 24,
    completedReturns: 156,
    pendingReturns: 8,
    totalRevenue: 45600,
    thisWeekReturns: 12,
    avgProcessingTime: 2.5,
  });

  const [recentClients] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      status: 'In Progress',
      returnType: 'Individual',
      deadline: '2025-04-15',
      priority: 'high',
    },
    {
      id: 2,
      name: 'Teja',
      email: 'Tejaj@email.com',
      phone: '(555) 987-6543',
      status: 'Review Required',
      returnType: 'Business',
      deadline: '2025-04-10',
      priority: 'urgent',
    },
    {
      id: 3,
      name: 'Nithya',
      email: 'nithya@email.com',
      phone: '(555) 456-7890',
      status: 'Completed',
      returnType: 'Individual',
      deadline: '2025-04-08',
      priority: 'normal',
    },
  ]);

  const [upcomingTasks] = useState([
    {
      id: 1,
      title: 'Review Teja Business Return',
      client: 'Teja',
      dueDate: '2025-04-10',
      priority: 'urgent',
      type: 'review',
    },
    {
      id: 2,
      title: 'Client Meeting - Nithya',
      client: 'Nithya',
      dueDate: '2025-04-11',
      priority: 'high',
      type: 'meeting',
    },
    {
      id: 3,
      title: 'File Extension Request',
      client: 'Teja Corporation',
      dueDate: '2025-04-12',
      priority: 'normal',
      type: 'filing',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '#10B981';
      case 'in progress':
        return '#F59E0B';
      case 'review required':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return '#EF4444';
      case 'high':
        return '#F59E0B';
      case 'normal':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card
        sx={{
          height: '100%',
          background: '#ffffff',
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderColor: '#D1D5DB',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              {icon}
            </Box>
            {trend && (
              <Chip
                label={trend}
                size="small"
                sx={{
                  background: trend.startsWith('+') ? '#10B98120' : '#EF444420',
                  color: trend.startsWith('+') ? '#10B981' : '#EF4444',
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
          
          <Typography variant="h4" sx={{ fontWeight: 700, color: color, mb: 1, fontFamily: '"Inter", sans-serif' }}>
            {value}
          </Typography>
          
          <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500, mb: 1, fontFamily: '"Inter", sans-serif' }}>
            {title}
          </Typography>
          
          {subtitle && (
            <Typography variant="caption" sx={{ color: '#9CA3AF', fontFamily: '"Inter", sans-serif' }}>
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#FAFAFA',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  background: '#3B82F6',
                }}
              >
                <AccountBalance />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1F2937', fontFamily: '"Inter", sans-serif' }}>
                  Tax Preparer Dashboard
                </Typography>
                <Typography variant="body1" sx={{ color: '#6B7280', fontFamily: '"Inter", sans-serif' }}>
                  Welcome back! Here's your client overview and pending tasks.
                </Typography>
              </Box>
            </Box>
            
            <Alert
              severity="info"
              sx={{
                borderRadius: '12px',
                background: '#ffffff',
                border: '1px solid #E5E7EB',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: '"Inter", sans-serif' }}>
                Tax season deadline approaching: 8 returns need immediate attention
              </Typography>
            </Alert>
          </Box>
        </motion.div>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Clients"
              value={stats.activeClients}
              icon={<Person />}
              color="#3B82F6"
              subtitle="Currently working with"
              trend="+3 this week"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Completed Returns"
              value={stats.completedReturns}
              icon={<CheckCircle />}
              color="#10B981"
              subtitle="This tax season"
              trend="+12 this week"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Returns"
              value={stats.pendingReturns}
              icon={<Schedule />}
              color="#F59E0B"
              subtitle="Require attention"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Revenue (YTD)"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              icon={<AttachMoney />}
              color="#8B5CF6"
              subtitle="Year to date earnings"
              trend="+15.2%"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Recent Clients */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: '1px solid #E5E7EB',
                  color: '#1F2937',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937', fontFamily: '"Inter", sans-serif' }}>
                    Recent Clients
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    sx={{
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 600,
                      borderColor: '#3B82F6',
                      color: '#3B82F6',
                      fontFamily: '"Inter", sans-serif',
                      '&:hover': {
                        borderColor: '#2563EB',
                        backgroundColor: '#3B82F610',
                      },
                    }}
                  >
                    New Client
                  </Button>
                </Box>

                <List sx={{ p: 0 }}>
                  {recentClients.map((client, index) => (
                    <React.Fragment key={client.id}>
                      <ListItem
                        sx={{
                          borderRadius: '12px',
                          mb: 1,
                          '&:hover': {
                            background: '#F9FAFB',
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              background: getStatusColor(client.status),
                            }}
                          >
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                        </ListItemAvatar>
                        
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontFamily: '"Inter", sans-serif' }}>
                                {client.name}
                              </Typography>
                              <Chip
                                label={client.status}
                                size="small"
                                sx={{
                                  background: `${getStatusColor(client.status)}20`,
                                  color: getStatusColor(client.status),
                                  fontWeight: 600,
                                }}
                              />
                              <Chip
                                label={client.priority}
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderColor: getPriorityColor(client.priority),
                                  color: getPriorityColor(client.priority),
                                  fontWeight: 600,
                                }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" sx={{ color: '#6B7280' }}>
                                {client.returnType} • Due: {client.deadline}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <Email sx={{ fontSize: 14, color: '#9CA3AF' }} />
                                  <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                                    {client.email}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <Phone sx={{ fontSize: 14, color: '#9CA3AF' }} />
                                  <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                                    {client.phone}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          }
                        />
                        
                        <ListItemSecondaryAction>
                          <Stack direction="row" spacing={1}>
                            <IconButton size="small" sx={{ color: '#6B7280' }}>
                              <Visibility />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#6B7280' }}>
                              <Edit />
                            </IconButton>
                          </Stack>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < recentClients.length - 1 && <Divider sx={{ my: 1 }} />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>

          {/* Upcoming Tasks */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: '1px solid #E5E7EB',
                  height: 'fit-content',
                  color: '#1F2937',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937', fontFamily: '"Inter", sans-serif' }}>
                    Upcoming Tasks
                  </Typography>
                  <Badge badgeContent={upcomingTasks.length} color="error">
                    <Notifications sx={{ color: '#6B7280' }} />
                  </Badge>
                </Box>

                <Stack spacing={2}>
                  {upcomingTasks.map((task) => (
                    <Card
                      key={task.id}
                      sx={{
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                        background: '#ffffff',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                          borderColor: '#D1D5DB',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Chip
                            label={task.type}
                            size="small"
                            sx={{
                              background: `${getPriorityColor(task.priority)}20`,
                              color: getPriorityColor(task.priority),
                              fontWeight: 600,
                            }}
                          />
                          <Typography variant="caption" sx={{ color: '#6B7280' }}>
                            {task.dueDate}
                          </Typography>
                        </Box>
                        
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, fontFamily: '"Inter", sans-serif' }}>
                          {task.title}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ color: '#6B7280', fontFamily: '"Inter", sans-serif' }}>
                          Client: {task.client}
                        </Typography>
                      </CardContent>
                      
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: '#3B82F6',
                            color: '#3B82F6',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontFamily: '"Inter", sans-serif',
                            '&:hover': {
                              borderColor: '#2563EB',
                              backgroundColor: '#3B82F610',
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </Stack>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Quick Actions FAB */}
        <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              background: '#3B82F6',
              '&:hover': {
                background: '#2563EB',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
          <Add />
        </Fab>
      </Container>
    </Box>
  );
}

export default PreparerDashboard;