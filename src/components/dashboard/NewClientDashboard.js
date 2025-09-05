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
  useMediaQuery,
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
  Fade,
  Zoom
} from '@mui/material';
import {
  Description,
  Notifications,
  CalendarToday,
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
  Add
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { clientAPI, documentAPI, taxReturnAPI, notificationAPI, appointmentAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function NewClientDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

  // Fetch all data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    setRefreshing(true);
    
    try {
      // Try to fetch all dashboard data at once first
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
          return; // Exit early if we got all data at once
        }
      } catch (dashboardError) {
        console.warn('Could not fetch complete dashboard data, trying individual endpoints:', dashboardError.message);
      }
      
      // Fallback: Fetch data in parallel with individual error handling
      const results = await Promise.allSettled([
        documentAPI.getAllDocuments(1, 3),
        notificationAPI.getNotifications(1, 5),
        taxReturnAPI.getReturnByYear(new Date().getFullYear().toString()),
        appointmentAPI.getAllAppointments(1, 3, { status: 'scheduled' })
      ]);
      
      // Process results with individual error handling
      const [documentsResult, notificationsResult, taxSummaryResult, appointmentsResult] = results;
      
      if (documentsResult.status === 'fulfilled') {
        setRecentDocuments(documentsResult.value.data || []);
      } else {
        console.error('Error fetching documents:', documentsResult.reason);
      }
      
      if (notificationsResult.status === 'fulfilled') {
        setNotifications(notificationsResult.value.data || []);
      } else {
        console.error('Error fetching notifications:', notificationsResult.reason);
      }
      
      if (taxSummaryResult.status === 'fulfilled') {
        setTaxSummary(taxSummaryResult.value.data || {
          totalIncome: 0,
          totalDeductions: 0,
          estimatedTax: 0,
          taxPaid: 0
        });
      } else {
        console.error('Error fetching tax summary:', taxSummaryResult.reason);
      }
      
      if (appointmentsResult.status === 'fulfilled') {
        setUpcomingAppointments(appointmentsResult.value.data || []);
      } else {
        console.error('Error fetching appointments:', appointmentsResult.reason);
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
      
      // Refresh documents list
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
      // Fetch available time slots for the selected date
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
      
      // Refresh appointments list
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
              textShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'
            }}
          >
            Welcome, {user?.firstName || 'Client'}
          </Typography>
        </Fade>
        
        <Tooltip title="Refresh Dashboard">
          <IconButton onClick={handleRefresh} color="primary" sx={{ ml: 2 }}>
            <Refresh sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Tax Summary Section */}
        <Grid item xs={12} md={6}>
          <Zoom in={true} timeout={500}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'flex',
                flexDirection: 'column',
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AccountBalance sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat, sans-serif',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Tax Summary
                </Typography>
              </Box>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'primary.lighter',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                      '&:hover': { 
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px 0 rgba(31, 38, 135, 0.15)',
                        background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.primary.lighter})`,
                      }
                    }}
                  >
                    <Typography variant="subtitle2" color="primary.dark" gutterBottom>
                      Total Income
                    </Typography>
                    <Typography variant="h5" color="primary.dark" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(taxSummary?.totalIncome || 0)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'success.lighter',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                      '&:hover': { 
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px 0 rgba(31, 38, 135, 0.15)',
                        background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.success.lighter})`,
                      }
                    }}
                  >
                    <Typography variant="subtitle2" color="success.dark" gutterBottom>
                      Total Deductions
                    </Typography>
                    <Typography variant="h5" color="success.dark" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(taxSummary?.totalDeductions || 0)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'warning.lighter',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                      '&:hover': { 
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px 0 rgba(31, 38, 135, 0.15)',
                        background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.warning.lighter})`,
                      }
                    }}
                  >
                    <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                      Estimated Tax
                    </Typography>
                    <Typography variant="h5" color="warning.dark" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(taxSummary?.estimatedTax || 0)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'info.lighter',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                      '&:hover': { 
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px 0 rgba(31, 38, 135, 0.15)',
                        background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.info.lighter})`,
                      }
                    }}
                  >
                    <Typography variant="subtitle2" color="info.dark" gutterBottom>
                      Tax Paid
                    </Typography>
                    <Typography variant="h5" color="info.dark" sx={{ fontWeight: 'bold' }}>
                      {formatCurrency(taxSummary?.taxPaid || 0)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              {/* Tax calculator button removed */}
            </Paper>
          </Zoom>
        </Grid>

        {/* Recent Documents Section */}
        <Grid item xs={12} md={6}>
          <Zoom in={true} timeout={700}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'flex',
                flexDirection: 'column',
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
                  <Description sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontFamily: 'Montserrat, sans-serif',
                      background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Recent Documents
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CloudUpload />}
                  onClick={() => setUploadDialogOpen(true)}
                  sx={{ 
                    borderRadius: 8,
                    borderColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.main,
                    '&:hover': {
                      borderColor: theme.palette.secondary.dark,
                      backgroundColor: 'rgba(16, 185, 129, 0.05)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Upload
                </Button>
              </Box>
              
              {recentDocuments.length > 0 ? (
                <List sx={{ mb: 3, flex: 1, overflow: 'auto' }}>
                  {recentDocuments.map((doc, index) => (
                    <React.Fragment key={doc.id}>
                      <ListItem
                        sx={{
                          bgcolor: 'background.paper',
                          borderRadius: 2,
                          mb: 1,
                          transition: 'all 0.3s ease',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          '&:hover': {
                            transform: 'translateX(8px)',
                            boxShadow: '0 8px 25px 0 rgba(31, 38, 135, 0.15)',
                            borderLeft: `4px solid ${theme.palette.secondary.main}`
                          }
                        }}
                        secondaryAction={
                          <Tooltip title="Download Document">
                            <IconButton edge="end" onClick={() => handleDownloadDocument(doc.id, doc.fileName)}>
                              <Download />
                            </IconButton>
                          </Tooltip>
                        }
                      >
                        <ListItemIcon>
                          <Box
                            sx={{
                              bgcolor: 'secondary.lighter',
                              borderRadius: 1.5,
                              p: 1,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            {doc.documentType.includes('W-2') ? (
                              <Receipt sx={{ color: 'secondary.main' }} />
                            ) : doc.documentType.includes('1099') ? (
                              <ReceiptLong sx={{ color: 'secondary.main' }} />
                            ) : (
                              <Description sx={{ color: 'secondary.main' }} />
                            )}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                              {doc.fileName}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(doc.uploadedAt)}
                              </Typography>
                              <Chip 
                                label={doc.documentType} 
                                size="small" 
                                sx={{ 
                                  height: 20, 
                                  fontSize: '0.7rem',
                                  bgcolor: 'secondary.lighter',
                                  color: 'secondary.dark'
                                }} 
                              />
                              <Chip 
                                label={doc.taxYear} 
                                size="small" 
                                sx={{ 
                                  height: 20, 
                                  fontSize: '0.7rem',
                                  bgcolor: 'primary.lighter',
                                  color: 'primary.dark'
                                }} 
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < recentDocuments.length - 1 && (
                        <Divider sx={{ opacity: 0.5, my: 1 }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  py: 4,
                  flex: 1
                }}>
                  <Description sx={{ fontSize: 48, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
                  <Typography variant="body1" color="text.secondary" align="center">
                    No documents found. Upload your first document to get started.
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ mt: 'auto' }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  fullWidth
                  sx={{
                    borderRadius: 8,
                    py: 1.5,
                    boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 25px 0 rgba(16, 185, 129, 0.25)',
                      background: `linear-gradient(90deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.light} 100%)`,
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => navigate('/documents')}
                >
                  View All Documents
                </Button>
              </Box>
            </Paper>
          </Zoom>
        </Grid>

        {/* Upcoming Appointments Section */}
        <Grid item xs={12} md={6}>
          <Zoom in={true} timeout={900}>
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
                  background: `linear-gradient(90deg, ${theme.palette.info.main} 0%, ${theme.palette.secondary.main} 100%)`
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Event sx={{ color: theme.palette.info.main, mr: 1 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontFamily: 'Montserrat, sans-serif',
                      background: `linear-gradient(90deg, ${theme.palette.info.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Upcoming Appointments
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Add />}
                  onClick={() => setAppointmentDialogOpen(true)}
                  sx={{ 
                    borderRadius: 8,
                    borderColor: theme.palette.info.main,
                    color: theme.palette.info.main,
                    '&:hover': {
                      borderColor: theme.palette.info.dark,
                      backgroundColor: 'rgba(79, 70, 229, 0.05)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Schedule
                </Button>
              </Box>
              
              {upcomingAppointments.length > 0 ? (
                <List>
                  {upcomingAppointments.map((appointment, index) => (
                    <React.Fragment key={appointment.id}>
                      <ListItem
                        sx={{
                          bgcolor: 'background.paper',
                          borderRadius: 2,
                          mb: 1,
                          transition: 'all 0.3s ease',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 25px 0 rgba(31, 38, 135, 0.15)',
                            borderLeft: `4px solid ${theme.palette.info.main}`
                          }
                        }}
                      >
                        <ListItemIcon>
                          <Box
                            sx={{
                              bgcolor: 'info.lighter',
                              borderRadius: 1.5,
                              p: 1,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <EventAvailable sx={{ color: 'info.main' }} />
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                              Tax Consultation
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(appointment.appointmentDate).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                                {' '} • {' '}
                                {appointment.duration} minutes
                              </Typography>
                              {appointment.professionalId && (
                                <Chip 
                                  label={`With: ${appointment.professionalName || 'Tax Professional'}`} 
                                  size="small" 
                                  sx={{ 
                                    height: 20, 
                                    fontSize: '0.7rem',
                                    bgcolor: 'info.lighter',
                                    color: 'info.dark',
                                    maxWidth: 'fit-content'
                                  }} 
                                />
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < upcomingAppointments.length - 1 && (
                        <Divider sx={{ opacity: 0.5, my: 1 }} />
                      )}
                    </React.Fragment>
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
                  <Event sx={{ fontSize: 48, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
                  <Typography variant="body1" color="text.secondary" align="center">
                    No upcoming appointments. Schedule a consultation with our tax professionals.
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  fullWidth
                  sx={{
                    borderRadius: 8,
                    py: 1.5,
                    boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                    background: `linear-gradient(90deg, ${theme.palette.info.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 25px 0 rgba(79, 70, 229, 0.25)',
                      background: `linear-gradient(90deg, ${theme.palette.info.light} 0%, ${theme.palette.secondary.light} 100%)`,
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => navigate('/appointments')}
                >
                  Manage Appointments
                </Button>
              </Box>
            </Paper>
          </Zoom>
        </Grid>

        {/* Notifications Section */}
        <Grid item xs={12} md={6}>
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
                  background: `linear-gradient(90deg, ${theme.palette.warning.main} 0%, ${theme.palette.info.main} 100%)`
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Notifications sx={{ color: theme.palette.warning.main, mr: 1 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontFamily: 'Montserrat, sans-serif',
                      background: `linear-gradient(90deg, ${theme.palette.warning.main} 0%, ${theme.palette.info.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Important Notifications
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                {notifications.length > 0 && (
                  <Button
                    startIcon={<Notifications />}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      px: 2,
                      bgcolor: 'warning.lighter',
                      color: 'warning.dark',
                      '&:hover': {
                        bgcolor: 'warning.lighter',
                        opacity: 0.9
                      }
                    }}
                    onClick={() => navigate('/notifications')}
                  >
                    {notifications.filter(n => !n.isRead).length} New
                  </Button>
                )}
              </Box>
              
              {notifications.length > 0 ? (
                <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
                  {notifications.map((notification, _index) => (
                    <ListItem
                      key={notification.id}
                      sx={{
                        mb: 2,
                        display: 'block'
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          bgcolor:
                            notification.priority === 'high'
                              ? 'error.lighter'
                              : notification.priority === 'medium'
                              ? 'warning.lighter'
                              : 'info.lighter',
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 25px 0 rgba(31, 38, 135, 0.15)',
                            borderLeft: notification.priority === 'high'
                              ? `4px solid ${theme.palette.error.main}`
                              : notification.priority === 'medium'
                              ? `4px solid ${theme.palette.warning.main}`
                              : `4px solid ${theme.palette.info.main}`
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 1.5,
                              mr: 2,
                              bgcolor:
                                notification.priority === 'high'
                                  ? 'error.light'
                                  : notification.priority === 'medium'
                                  ? 'warning.light'
                                  : 'info.light',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            {getNotificationIcon(notification.priority)}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 'medium',
                                color:
                                  notification.priority === 'high'
                                    ? 'error.dark'
                                    : notification.priority === 'medium'
                                    ? 'warning.dark'
                                    : 'info.dark'
                              }}
                            >
                              {notification.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {notification.message}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <CalendarToday
                                fontSize="small"
                                sx={{
                                  mr: 1,
                                  color:
                                    notification.priority === 'high'
                                      ? 'error.main'
                                      : notification.priority === 'medium'
                                      ? 'warning.main'
                                      : 'info.main',
                                  fontSize: '0.875rem'
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(notification.createdAt)}
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
                  <Notifications sx={{ fontSize: 48, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
                  <Typography variant="body1" color="text.secondary" align="center">
                    No notifications at this time. We'll notify you of important updates.
                  </Typography>
                </Box>
              )}
              
              {notifications.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                  endIcon={<ArrowForward />}
                  fullWidth
                  sx={{
                    borderRadius: 8,
                    py: 1.5,
                    boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                    background: `linear-gradient(90deg, ${theme.palette.warning.main} 0%, ${theme.palette.info.main} 100%)`,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 25px 0 rgba(245, 158, 11, 0.25)',
                      background: `linear-gradient(90deg, ${theme.palette.warning.light} 0%, ${theme.palette.info.light} 100%)`,
                    },
                    transition: 'all 0.3s ease'
                  }}
                    onClick={() => navigate('/notifications')}
                  >
                    View All Notifications
                  </Button>
                </Box>
              )}
            </Paper>
          </Zoom>
        </Grid>
      </Grid>

      {/* Document Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Tax Document</DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <TextField
              select
              label="Document Type"
              fullWidth
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value)}
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Select document type</option>
              <option value="W-2">W-2 (Wage and Tax Statement)</option>
              <option value="1099-INT">1099-INT (Interest Income)</option>
              <option value="1099-DIV">1099-DIV (Dividends and Distributions)</option>
              <option value="1099-MISC">1099-MISC (Miscellaneous Income)</option>
              <option value="1098-E">1098-E (Student Loan Interest)</option>
              <option value="1098-T">1098-T (Tuition Statement)</option>
              <option value="Property Tax Receipt">Property Tax Receipt</option>
              <option value="Charitable Donation Receipt">Charitable Donation Receipt</option>
              <option value="Medical Expense Receipt">Medical Expense Receipt</option>
              <option value="Other">Other</option>
            </TextField>

            <TextField
              select
              label="Tax Year"
              fullWidth
              value={uploadYear}
              onChange={(e) => setUploadYear(e.target.value)}
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                );
              })}
            </TextField>

            <Box sx={{ mt: 2, mb: 3 }}>
              <input
                accept="application/pdf,image/*"
                style={{ display: 'none' }}
                id="document-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="document-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUpload />}
                  fullWidth
                  sx={{ py: 1.5, borderStyle: 'dashed' }}
                >
                  {selectedFile ? selectedFile.name : 'Select File'}
                </Button>
              </label>
            </Box>

            {uploadProgress > 0 && (
              <Box sx={{ width: '100%', mt: 2 }}>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                  {uploadProgress}% Uploaded
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleUploadDocument}
            disabled={!selectedFile || !uploadType || !uploadYear}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Appointment Scheduling Dialog */}
      <Dialog open={appointmentDialogOpen} onClose={() => setAppointmentDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Tax Consultation</DialogTitle>
        <DialogContent>
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
              SelectProps={{
                native: true,
              }}
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
        <DialogActions>
          <Button onClick={() => setAppointmentDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleScheduleAppointment}
            disabled={!appointmentDate || !appointmentTime}
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
          variant="filled"
          elevation={6}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default NewClientDashboard;