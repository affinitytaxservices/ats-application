import React, { useState, useEffect } from 'react';
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
  Divider,
  useTheme,
  Box,
  CircularProgress,
  LinearProgress,
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
  Stack,
  alpha,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import {
  Description,
  Notifications,
  ArrowForward,
  AccountBalance,
  Receipt,
  ReceiptLong,
  CloudUpload,
  Refresh,
  Info,
  Warning,
  Error as ErrorIcon,
  Download,
  Event,
  EventAvailable,
  Add,
  AttachMoney,
  TrendingUp,
  Schedule
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { clientAPI, documentAPI, appointmentAPI } from '../../services/api';
import { motion } from 'framer-motion';

function NewClientDashboard() {
  const theme = useTheme();
  const { user } = useAuth();
  
  // State for data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [taxSummary, setTaxSummary] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadType, setUploadType] = useState('');
  const [uploadYear, setUploadYear] = useState(new Date().getFullYear().toString());
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentNote, setAppointmentNote] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    setRefreshing(true);
    
    try {
      try {
        const dashboardData = await clientAPI.getDashboardData();
        if (dashboardData) {
          setRecentDocuments(dashboardData.recentDocuments || []);
          setNotifications(dashboardData.notifications || []);
          setTaxSummary(dashboardData.taxSummary || {
            totalIncome: 0,
            totalDeductions: 0,
            estimatedTax: 0,
            taxPaid: 0
          });
          setUpcomingAppointments(dashboardData.upcomingAppointments || []);
          return; 
        }
      } catch (dashboardError) {
        console.warn('Could not fetch complete dashboard data, trying individual endpoints:', dashboardError.message);
      }
      
      const results = await Promise.allSettled([
        clientAPI.getDocuments(),
        clientAPI.getNotifications(),
        clientAPI.getTaxSummary(),
        clientAPI.getAppointments()
      ]);
      
      const [documentsResult, notificationsResult, taxSummaryResult, appointmentsResult] = results;
      
      if (documentsResult.status === 'fulfilled') {
        setRecentDocuments(documentsResult.value.data || []);
      }
      
      if (notificationsResult.status === 'fulfilled') {
        setNotifications(notificationsResult.value.data || []);
      }
      
      if (taxSummaryResult.status === 'fulfilled') {
        setTaxSummary(taxSummaryResult.value.data || {
          totalIncome: 0,
          totalDeductions: 0,
          estimatedTax: 0,
          taxPaid: 0
        });
      }
      
      if (appointmentsResult.status === 'fulfilled') {
        setUpcomingAppointments(appointmentsResult.value.data || []);
      }
      
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
  };

  const handleRefresh = () => {
    fetchDashboardData();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadDocument = async () => {
    if (!selectedFile || !uploadType || !uploadYear) {
      setSnackbar({
        open: true,
        message: 'Please fill all required fields',
        severity: 'error'
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('documentType', uploadType);
    formData.append('taxYear', uploadYear);

    try {
      await documentAPI.uploadDocument(formData, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      });

      setSnackbar({
        open: true,
        message: 'Document uploaded successfully',
        severity: 'success'
      });
      setUploadDialogOpen(false);
      setSelectedFile(null);
      setUploadProgress(0);
      setUploadType('');
      
      const documentsResponse = await documentAPI.getAllDocuments(1, 3);
      setRecentDocuments(documentsResponse.data || []);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to upload document',
        severity: 'error'
      });
    }
  };

  const handleDownloadDocument = async (documentId, fileName) => {
    try {
      const blob = await documentAPI.downloadDocument(documentId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to download document',
        severity: 'error'
      });
    }
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setAppointmentDate(selectedDate);
    
    try {
      const response = await appointmentAPI.getAvailableSlots(null, selectedDate);
      setAvailableTimes(response.data || []);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to fetch available time slots',
        severity: 'error'
      });
    }
  };

  const handleScheduleAppointment = async () => {
    if (!appointmentDate || !appointmentTime) {
      setSnackbar({
        open: true,
        message: 'Please select date and time',
        severity: 'error'
      });
      return;
    }

    try {
      await appointmentAPI.createAppointment({
        appointmentDate: `${appointmentDate}T${appointmentTime}`,
        notes: appointmentNote
      });

      setSnackbar({
        open: true,
        message: 'Appointment scheduled successfully',
        severity: 'success'
      });
      setAppointmentDialogOpen(false);
      setAppointmentDate('');
      setAppointmentTime('');
      setAppointmentNote('');
      
      const appointmentsResponse = await appointmentAPI.getAllAppointments(1, 3, { status: 'scheduled' });
      setUpcomingAppointments(appointmentsResponse.data || []);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to schedule appointment',
        severity: 'error'
      });
    }
  };

  const getNotificationIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <ErrorIcon color="error" />;
      case 'medium':
        return <Warning color="warning" />;
      default:
        return <Info color="info" />;
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
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading && !refreshing) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress size={40} thickness={4} />
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
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 5 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
              Welcome back, {user?.firstName || 'Client'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here is your financial overview for the current tax year.
            </Typography>
          </Box>
          
          <Tooltip title="Refresh Dashboard">
            <IconButton 
              onClick={handleRefresh} 
              color="primary" 
              aria-label="Refresh Dashboard"
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
              }}
            >
              <Refresh sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Grid container spacing={3}>
          {/* Tax Summary Cards */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <AccountBalance sx={{ mr: 1, color: 'primary.main' }} /> Tax Summary
            </Typography>
            <Grid container spacing={2}>
              {[
                { label: 'Total Income', value: taxSummary?.totalIncome, icon: <AttachMoney />, color: theme.palette.success.main, bg: alpha(theme.palette.success.main, 0.1) },
                { label: 'Total Deductions', value: taxSummary?.totalDeductions, icon: <TrendingUp />, color: theme.palette.info.main, bg: alpha(theme.palette.info.main, 0.1) },
                { label: 'Estimated Tax', value: taxSummary?.estimatedTax, icon: <ReceiptLong />, color: theme.palette.warning.main, bg: alpha(theme.palette.warning.main, 0.1) },
                { label: 'Tax Paid', value: taxSummary?.taxPaid, icon: <Receipt />, color: theme.palette.primary.main, bg: alpha(theme.palette.primary.main, 0.1) },
              ].map((item, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <motion.div variants={itemVariants}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: item.color,
                          boxShadow: `0 4px 20px ${alpha(item.color, 0.15)}`,
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box 
                          sx={{ 
                            p: 1, 
                            borderRadius: 1, 
                            bgcolor: item.bg,
                            color: item.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {React.cloneElement(item.icon, { fontSize: 'small' })}
                        </Box>
                      </Box>
                      <Typography variant="h5" fontWeight="bold" color="text.primary" sx={{ mb: 0.5 }}>
                        {formatCurrency(item.value || 0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.label}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Recent Documents Section */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants} style={{ height: '100%' }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Description color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" fontWeight="bold">
                        Recent Documents
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<CloudUpload />}
                      onClick={() => setUploadDialogOpen(true)}
                    >
                      Upload
                    </Button>
                  </Box>
                  
                  {recentDocuments.length > 0 ? (
                    <List sx={{ px: 0 }}>
                      {recentDocuments.map((doc, index) => (
                        <React.Fragment key={doc.id}>
                          <ListItem
                            disableGutters
                            secondaryAction={
                              <Tooltip title="Download">
                                <IconButton 
                                  edge="end" 
                                  onClick={() => handleDownloadDocument(doc.id, doc.fileName)} 
                                  size="small"
                                  aria-label={`Download ${doc.fileName}`}
                                >
                                  <Download fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            }
                            sx={{ py: 1.5 }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <Box
                                sx={{
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  borderRadius: 1,
                                  p: 1,
                                  display: 'flex',
                                }}
                              >
                                {doc.documentType.includes('W-2') ? (
                                  <Receipt fontSize="small" color="primary" />
                                ) : (
                                  <Description fontSize="small" color="primary" />
                                )}
                              </Box>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle2" fontWeight="600">
                                  {doc.fileName}
                                </Typography>
                              }
                              secondary={
                                <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                                  <Typography variant="caption" color="text.secondary">
                                    {formatDate(doc.uploadedAt)}
                                  </Typography>
                                  <Chip 
                                    label={doc.documentType} 
                                    size="small" 
                                    sx={{ height: 20, fontSize: '0.65rem', bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.dark }} 
                                  />
                                </Stack>
                              }
                            />
                          </ListItem>
                          {index < recentDocuments.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ py: 6, textAlign: 'center' }}>
                      <CloudUpload sx={{ fontSize: 48, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        No documents uploaded yet.
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                <Divider />
                <CardActions sx={{ p: 2, justifyContent: 'flex-end' }}>
                  <Button
                    component={Link}
                    to="/documents"
                    endIcon={<ArrowForward />}
                    sx={{ textTransform: 'none' }}
                  >
                    View All Documents
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>

          {/* Right Column: Appointments & Notifications */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              {/* Upcoming Appointments */}
              <motion.div variants={itemVariants} style={{ flex: 1 }}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Event color="info" sx={{ mr: 1 }} />
                        <Typography variant="h6" fontWeight="bold">
                          Appointments
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        color="info"
                        size="small"
                        startIcon={<Add />}
                        onClick={() => setAppointmentDialogOpen(true)}
                      >
                        Schedule
                      </Button>
                    </Box>
                    
                    {upcomingAppointments.length > 0 ? (
                      <List disablePadding>
                        {upcomingAppointments.map((appointment, index) => (
                          <React.Fragment key={appointment.id}>
                            <ListItem disableGutters sx={{ py: 1.5 }}>
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <Box sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), p: 1, borderRadius: 1 }}>
                                  <EventAvailable color="info" fontSize="small" />
                                </Box>
                              </ListItemIcon>
                              <ListItemText
                                primary="Tax Consultation"
                                secondary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                    <Schedule sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                      {formatDate(appointment.appointmentDate)} • {appointment.duration} mins
                                    </Typography>
                                  </Box>
                                }
                                primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 600 }}
                              />
                            </ListItem>
                            {index < upcomingAppointments.length - 1 && <Divider />}
                          </React.Fragment>
                        ))}
                      </List>
                    ) : (
                      <Box sx={{ py: 4, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          No upcoming appointments.
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                  {upcomingAppointments.length > 0 && (
                    <>
                      <Divider />
                      <CardActions sx={{ p: 2, justifyContent: 'flex-end' }}>
                        <Button
                          component={Link}
                          to="/appointments"
                          endIcon={<ArrowForward />}
                          color="info"
                          sx={{ textTransform: 'none' }}
                        >
                          Manage Appointments
                        </Button>
                      </CardActions>
                    </>
                  )}
                </Card>
              </motion.div>

              {/* Notifications */}
              <motion.div variants={itemVariants} style={{ flex: 1 }}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Notifications color="warning" sx={{ mr: 1 }} />
                      <Typography variant="h6" fontWeight="bold">
                        Notifications
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      {notifications.filter(n => !n.isRead).length > 0 && (
                        <Chip 
                          label={`${notifications.filter(n => !n.isRead).length} New`} 
                          color="warning" 
                          size="small" 
                          sx={{ fontWeight: 'bold' }}
                        />
                      )}
                    </Box>
                    
                    {notifications.length > 0 ? (
                      <List disablePadding>
                        {notifications.slice(0, 3).map((notification) => (
                          <ListItem key={notification.id} disableGutters sx={{ mb: 1, p: 1, borderRadius: 1, bgcolor: notification.priority === 'high' ? alpha(theme.palette.error.main, 0.05) : 'transparent' }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              {getNotificationIcon(notification.priority)}
                            </ListItemIcon>
                            <ListItemText
                              primary={notification.title}
                              secondary={notification.message}
                              primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 600 }}
                              secondaryTypographyProps={{ variant: 'caption', noWrap: true, display: 'block' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Box sx={{ py: 4, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          No new notifications.
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ p: 2, justifyContent: 'flex-end' }}>
                    <Button
                      component={Link}
                      to="/notifications"
                      endIcon={<ArrowForward />}
                      color="warning"
                      sx={{ textTransform: 'none' }}
                    >
                      View All
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Stack>
          </Grid>
        </Grid>

        {/* Document Upload Dialog */}
        <Dialog 
          open={uploadDialogOpen} 
          onClose={() => setUploadDialogOpen(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
            Upload Tax Document
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Box sx={{ my: 2 }}>
              <TextField
                select
                label="Document Type"
                fullWidth
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
                margin="normal"
                SelectProps={{ native: true }}
                variant="outlined"
              >
                <option value="">Select document type</option>
                <option value="W-2">W-2 (Wage and Tax Statement)</option>
                <option value="1099-INT">1099-INT</option>
                <option value="1099-DIV">1099-DIV</option>
                <option value="1098">1098 (Mortgage Interest)</option>
                <option value="Other">Other</option>
              </TextField>

              <TextField
                select
                label="Tax Year"
                fullWidth
                value={uploadYear}
                onChange={(e) => setUploadYear(e.target.value)}
                margin="normal"
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {Array.from({ length: 5 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </TextField>

              <Box sx={{ mt: 3, mb: 3 }}>
                <input
                  accept="application/pdf,image/*"
                  style={{ display: 'none' }}
                  id="document-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="document-upload">
                  <Box
                    sx={{
                      border: '2px dashed',
                      borderColor: 'primary.main',
                      borderRadius: 2,
                      p: 4,
                      textAlign: 'center',
                      cursor: 'pointer',
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      }
                    }}
                  >
                    <CloudUpload sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold" color="primary">
                      {selectedFile ? selectedFile.name : 'Click to Select File'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Supported formats: PDF, JPG, PNG
                    </Typography>
                  </Box>
                </label>
              </Box>

              {uploadProgress > 0 && (
                <Box sx={{ width: '100%', mt: 2 }}>
                  <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 8, borderRadius: 4 }} />
                  <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 0.5 }}>
                    {uploadProgress}% Uploaded
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button onClick={() => setUploadDialogOpen(false)} color="inherit">Cancel</Button>
            <Button 
              variant="contained" 
              onClick={handleUploadDocument}
              disabled={!selectedFile || !uploadType || !uploadYear}
            >
              Upload Document
            </Button>
          </DialogActions>
        </Dialog>

        {/* Appointment Scheduling Dialog */}
        <Dialog 
          open={appointmentDialogOpen} 
          onClose={() => setAppointmentDialogOpen(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
            Schedule Tax Consultation
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Box sx={{ my: 2 }}>
              <TextField
                label="Select Date"
                type="date"
                fullWidth
                value={appointmentDate}
                onChange={handleDateChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: new Date().toISOString().split('T')[0] }}
              />

              <TextField
                select
                label="Select Time"
                fullWidth
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                margin="normal"
                disabled={!appointmentDate || availableTimes.length === 0}
                SelectProps={{ native: true }}
              >
                <option value="">Select time slot</option>
                {availableTimes.map((slot) => (
                  <option key={slot.time} value={slot.time}>
                    {slot.time} ({slot.duration} minutes)
                  </option>
                ))}
              </TextField>

              <TextField
                label="Notes (Optional)"
                fullWidth
                multiline
                rows={3}
                value={appointmentNote}
                onChange={(e) => setAppointmentNote(e.target.value)}
                margin="normal"
                placeholder="Please provide any specific topics you'd like to discuss"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button onClick={() => setAppointmentDialogOpen(false)} color="inherit">Cancel</Button>
            <Button 
              variant="contained" 
              onClick={handleScheduleAppointment}
              disabled={!appointmentDate || !appointmentTime}
            >
              Confirm Schedule
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity} 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  );
}

export default NewClientDashboard;
