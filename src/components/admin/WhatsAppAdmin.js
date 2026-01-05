import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Box,

  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  WhatsApp,
  Message,
  Schedule,
  Support,
  Send,
  Visibility
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { adminAPI } from '../../services/api';

const WhatsAppAdmin = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [_loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Pagination states
  const [convPage, setConvPage] = useState(0);
  const [convRowsPerPage, setConvRowsPerPage] = useState(10);
  const [apptPage, _setApptPage] = useState(0);
  const [apptRowsPerPage, _setApptRowsPerPage] = useState(10);
  const [ticketPage, _setTicketPage] = useState(0);
  const [ticketRowsPerPage, _setTicketRowsPerPage] = useState(10);
  
  // Dialog states
  const [messageDialog, setMessageDialog] = useState(false);
  const [sendMessageDialog, setSendMessageDialog] = useState(false);
  const [responseDialog, setResponseDialog] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [ticketResponse, setTicketResponse] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // Filter states
  const [apptStatus, setApptStatus] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');

  // Function definitions (moved before useEffect)
  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getWhatsAppConversations(convPage + 1, convRowsPerPage);
      setConversations(response.data);
    } catch (err) {
      setError('Failed to fetch conversations');
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  }, [convPage, convRowsPerPage]);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await adminAPI.getWhatsAppAppointments(apptPage + 1, apptRowsPerPage, apptStatus);
      setAppointments(response.data);
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error('Error fetching appointments:', err);
    }
  }, [apptPage, apptRowsPerPage, apptStatus]);

  const fetchSupportTickets = useCallback(async () => {
    try {
      const response = await adminAPI.getWhatsAppSupportTickets(ticketPage + 1, ticketRowsPerPage, ticketStatus);
      setSupportTickets(response.data);
    } catch (err) {
      setError('Failed to fetch support tickets');
      console.error('Error fetching support tickets:', err);
    }
  }, [ticketPage, ticketRowsPerPage, ticketStatus]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchConversations();
      fetchAppointments();
      fetchSupportTickets();
    }
  }, [user, fetchConversations, fetchAppointments, fetchSupportTickets]);

  const handleViewMessages = async (conversation) => {
    try {
      setSelectedConversation(conversation);
      const response = await adminAPI.getWhatsAppMessages(conversation.phone_number);
      setMessages(response.data);
      setMessageDialog(true);
    } catch (err) {
      setError('Failed to fetch messages');
      console.error('Error fetching messages:', err);
    }
  };

  const handleSendMessage = (phone) => {
    setSelectedConversation({ phone_number: phone });
    setSendMessageDialog(true);
  };

  const handleSendMessageSubmit = async () => {
    try {
      await adminAPI.sendWhatsAppTextMessage(selectedConversation.phone_number, newMessage);
      setSuccess('Message sent successfully');
      setSendMessageDialog(false);
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    }
  };

  const handleUpdateAppointmentStatus = async (id, status) => {
    try {
      await adminAPI.updateWhatsAppAppointmentStatus(id, status);
      setSuccess('Appointment status updated');
      fetchAppointments();
    } catch (err) {
      setError('Failed to update appointment status');
      console.error('Error updating appointment:', err);
    }
  };

  const handleRespondToTicket = (ticket) => {
    setSelectedTicket(ticket);
    setTicketResponse('');
    setResponseDialog(true);
  };

  const handleTicketResponseSubmit = async () => {
    try {
      await adminAPI.respondToWhatsAppSupportTicket(selectedTicket.id, ticketResponse);
      setSuccess('Response sent successfully');
      setResponseDialog(false);
      fetchSupportTickets();
    } catch (err) {
      setError('Failed to send response');
      console.error('Error sending response:', err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'primary',
      completed: 'success',
      cancelled: 'error',
      no_show: 'warning',
      open: 'warning',
      in_progress: 'info',
      resolved: 'success',
      closed: 'default'
    };
    return colors[status] || 'default';
  };

  const formatPhone = (phone) => {
    // Format phone number for display
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  if (user?.role !== 'admin') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">Access denied. Admin privileges required.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <WhatsApp sx={{ mr: 2, color: '#25D366' }} />
        WhatsApp Business Admin
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Grid container spacing={3}>
        {/* Conversations Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Message sx={{ mr: 1 }} />
              WhatsApp Conversations
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Last Message</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Updated At</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {conversations.map((conv) => (
                    <TableRow key={conv.id}>
                      <TableCell>{formatPhone(conv.phone_number)}</TableCell>
                      <TableCell>{conv.last_message?.substring(0, 50)}...</TableCell>
                      <TableCell>
                        <Chip label={conv.state} size="small" />
                      </TableCell>
                      <TableCell>{new Date(conv.updated_at).toLocaleString()}</TableCell>
                      <TableCell>
                        <Tooltip title="View Messages">
                          <IconButton size="small" onClick={() => handleViewMessages(conv)}>
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Send Message">
                          <IconButton size="small" onClick={() => handleSendMessage(conv.phone_number)}>
                            <Send />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={conversations.length}
              rowsPerPage={convRowsPerPage}
              page={convPage}
              onPageChange={(e, newPage) => setConvPage(newPage)}
              onRowsPerPageChange={(e) => {
                setConvRowsPerPage(parseInt(e.target.value, 10));
                setConvPage(0);
              }}
            />
          </Paper>
        </Grid>

        {/* Appointments Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Schedule sx={{ mr: 1 }} />
              Appointments
            </Typography>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={apptStatus}
                label="Status Filter"
                onChange={(e) => setApptStatus(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
                <MenuItem value="no_show">No Show</MenuItem>
              </Select>
            </FormControl>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Phone</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appt) => (
                    <TableRow key={appt.id}>
                      <TableCell>{formatPhone(appt.phone_number)}</TableCell>
                      <TableCell>{new Date(appt.appointment_date).toLocaleDateString()}</TableCell>
                      <TableCell>{appt.appointment_time}</TableCell>
                      <TableCell>
                        <Chip 
                          label={appt.status} 
                          size="small" 
                          color={getStatusColor(appt.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl size="small">
                          <Select
                            value={appt.status}
                            onChange={(e) => handleUpdateAppointmentStatus(appt.id, e.target.value)}
                            size="small"
                          >
                            <MenuItem value="scheduled">Scheduled</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="cancelled">Cancelled</MenuItem>
                            <MenuItem value="no_show">No Show</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Support Tickets Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Support sx={{ mr: 1 }} />
              Support Tickets
            </Typography>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={ticketStatus}
                label="Status Filter"
                onChange={(e) => setTicketStatus(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Phone</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {supportTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{formatPhone(ticket.phone_number)}</TableCell>
                      <TableCell>{ticket.message?.substring(0, 30)}...</TableCell>
                      <TableCell>
                        <Chip 
                          label={ticket.status} 
                          size="small" 
                          color={getStatusColor(ticket.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          onClick={() => handleRespondToTicket(ticket)}
                          disabled={ticket.status === 'closed'}
                        >
                          Respond
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Message Dialog */}
      <Dialog open={messageDialog} onClose={() => setMessageDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Conversation Messages</DialogTitle>
        <DialogContent>
          {messages.map((msg, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: msg.direction === 'inbound' ? '#f5f5f5' : '#e3f2fd', borderRadius: 1 }}>
              <Typography variant="body2">
                <strong>{msg.direction === 'inbound' ? 'Customer' : 'Bot'}:</strong> {msg.message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(msg.created_at).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessageDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Send Message Dialog */}
      <Dialog open={sendMessageDialog} onClose={() => setSendMessageDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send WhatsApp Message</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSendMessageDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSendMessageSubmit} 
            variant="contained"
            disabled={!newMessage.trim()}
          >
            Send Message
          </Button>
        </DialogActions>
      </Dialog>

      {/* Response Dialog */}
      <Dialog open={responseDialog} onClose={() => setResponseDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Respond to Support Ticket</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Response"
            value={ticketResponse}
            onChange={(e) => setTicketResponse(e.target.value)}
            placeholder="Type your response here..."
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResponseDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleTicketResponseSubmit} 
            variant="contained"
            disabled={!ticketResponse.trim()}
          >
            Send Response
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WhatsAppAdmin;