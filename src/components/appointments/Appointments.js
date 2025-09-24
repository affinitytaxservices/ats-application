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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Fade,
} from '@mui/material';
import {
  Event,
  EventAvailable,
  Add,
  Edit,
  Delete,
  LocationOn,
  VideoCall,
  Phone,
  CalendarToday,
  Schedule,
  CheckCircle,
  Pending,
  Cancel,
} from '@mui/icons-material';

function Appointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: 'Tax Consultation',
      date: '2024-02-15',
      time: '10:00 AM',
      duration: '60 minutes',
      type: 'consultation',
      method: 'in-person',
      status: 'confirmed',
      preparer: 'John Smith, CPA',
      notes: 'Initial tax planning discussion for 2024',
      location: 'Main Office - Room 201',
    },
    {
      id: 2,
      title: 'Document Review',
      date: '2024-02-20',
      time: '2:00 PM',
      duration: '45 minutes',
      type: 'review',
      method: 'video-call',
      status: 'pending',
      preparer: 'Sarah Johnson, EA',
      notes: 'Review uploaded tax documents',
      location: 'Video Conference',
    },
    {
      id: 3,
      title: 'Tax Return Signing',
      date: '2024-03-01',
      time: '11:30 AM',
      duration: '30 minutes',
      type: 'signing',
      method: 'in-person',
      status: 'scheduled',
      preparer: 'Michael Davis, CPA',
      notes: 'Final review and signing of tax return',
      location: 'Main Office - Room 105',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    type: 'consultation',
    method: 'in-person',
    notes: '',
  });

  const appointmentTypes = [
    { value: 'consultation', label: 'Tax Consultation' },
    { value: 'review', label: 'Document Review' },
    { value: 'signing', label: 'Tax Return Signing' },
    { value: 'planning', label: 'Tax Planning' },
    { value: 'follow-up', label: 'Follow-up Meeting' },
  ];

  const meetingMethods = [
    { value: 'in-person', label: 'In-Person', icon: <LocationOn /> },
    { value: 'video-call', label: 'Video Call', icon: <VideoCall /> },
    { value: 'phone', label: 'Phone Call', icon: <Phone /> },
  ];

  const handleOpenDialog = (appointment = null) => {
    if (appointment) {
      setSelectedAppointment(appointment);
      setFormData({
        title: appointment.title,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        method: appointment.method,
        notes: appointment.notes,
      });
    } else {
      setSelectedAppointment(null);
      setFormData({
        title: '',
        date: '',
        time: '',
        type: 'consultation',
        method: 'in-person',
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (selectedAppointment) {
      // Update existing appointment
      setAppointments(prev => prev.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, ...formData, status: 'pending' }
          : apt
      ));
    } else {
      // Create new appointment
      const newAppointment = {
        id: appointments.length + 1,
        ...formData,
        duration: '60 minutes',
        status: 'pending',
        preparer: 'To be assigned',
        location: formData.method === 'in-person' ? 'Main Office' : 'Remote',
      };
      setAppointments(prev => [...prev, newAppointment]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      confirmed: { color: 'success', icon: <CheckCircle /> },
      pending: { color: 'warning', icon: <Pending /> },
      scheduled: { color: 'primary', icon: <Schedule /> },
      cancelled: { color: 'error', icon: <Cancel /> },
    };

    const config = statusConfig[status] || { color: 'default', icon: null };

    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        color={config.color}
        icon={config.icon}
        size="small"
      />
    );
  };

  const getMethodIcon = (method) => {
    const methodConfig = {
      'in-person': <LocationOn />,
      'video-call': <VideoCall />,
      'phone': <Phone />,
    };
    return methodConfig[method] || <Event />;
  };

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.date) >= new Date() && apt.status !== 'cancelled'
  );

  const pastAppointments = appointments.filter(apt => 
    new Date(apt.date) < new Date() || apt.status === 'cancelled'
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={800}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Appointments
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
              sx={{ borderRadius: 2 }}
            >
              Schedule Appointment
            </Button>
          </Box>

          {/* Quick Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    {upcomingAppointments.length}
                  </Typography>
                  <Typography variant="body1">Upcoming</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" gutterBottom>
                    {appointments.filter(apt => apt.status === 'confirmed').length}
                  </Typography>
                  <Typography variant="body1">Confirmed</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main" gutterBottom>
                    {appointments.filter(apt => apt.status === 'pending').length}
                  </Typography>
                  <Typography variant="body1">Pending</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Upcoming Appointments */}
          <Paper sx={{ mb: 4 }}>
            <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventAvailable color="primary" />
                Upcoming Appointments
              </Typography>
            </Box>
            <List>
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <ListItem key={appointment.id} divider>
                    <ListItemIcon>
                      {getMethodIcon(appointment.method)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {appointment.title}
                          </Typography>
                          {getStatusChip(appointment.status)}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            📅 {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            👤 {appointment.preparer} • ⏱️ {appointment.duration}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            📍 {appointment.location}
                          </Typography>
                          {appointment.notes && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              📝 {appointment.notes}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleOpenDialog(appointment)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(appointment.id)}
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
                        <CalendarToday sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="body1" color="text.secondary">
                          No upcoming appointments scheduled
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Paper>

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (
            <Paper>
              <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Event color="action" />
                  Past Appointments
                </Typography>
              </Box>
              <List>
                {pastAppointments.map((appointment) => (
                  <ListItem key={appointment.id} divider>
                    <ListItemIcon>
                      {getMethodIcon(appointment.method)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
                            {appointment.title}
                          </Typography>
                          {getStatusChip(appointment.status)}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            📅 {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            👤 {appointment.preparer}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Fade>

      {/* Appointment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Appointment Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Appointment Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    label="Appointment Type"
                  >
                    {appointmentTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Meeting Method</InputLabel>
                  <Select
                    name="method"
                    value={formData.method}
                    onChange={handleInputChange}
                    label="Meeting Method"
                  >
                    {meetingMethods.map((method) => (
                      <MenuItem key={method.value} value={method.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {method.icon}
                          {method.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  placeholder="Additional notes or special requirements..."
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.title || !formData.date || !formData.time}
          >
            {selectedAppointment ? 'Update' : 'Schedule'} Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Appointments;