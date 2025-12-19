import React, { useState } from 'react';
import { 
  Box, 
  Fab, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  TextField,
  IconButton,
  Chip,
  Alert
} from '@mui/material';
import { 
  WhatsApp, 
  Close, 
  Send,
  Phone,
  Message
} from '@mui/icons-material';

const WhatsAppWidget = () => {
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const businessPhone = process.env.REACT_APP_WHATSAPP_BUSINESS_PHONE || '+91 8341154481';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowSuccess(false);
  };

  const handleSendMessage = () => {
    if (!phoneNumber || !message) {
      return;
    }

    // Format phone number (remove non-digits and add country code if needed)
    // const cleanPhone = phoneNumber.replace(/\D/g, '');
    // const formattedPhone = cleanPhone.startsWith('1') ? cleanPhone : `1${cleanPhone}`;
    
    // Create WhatsApp deep link
    const whatsappUrl = `https://wa.me/${businessPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    setShowSuccess(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const quickMessages = [
    "Hi, I need help with my taxes",
    "I'd like to book an appointment",
    "What's your refund policy?",
    "Can you help me upload documents?",
    "I have a tax question"
  ];

  return (
    <>
      {/* Floating WhatsApp Button */}
      <Fab
        color="success"
        aria-label="whatsapp"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: '#25D366',
          color: 'white',
          '&:hover': {
            backgroundColor: '#128C7E',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
        }}
      >
        <WhatsApp sx={{ fontSize: 32 }} />
      </Fab>

      {/* WhatsApp Chat Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          }
        }}
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WhatsApp sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Chat with Us on WhatsApp
            </Typography>
          </Box>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3, pb: 2 }}>
          {showSuccess ? (
            <Alert 
              severity="success" 
              sx={{ mb: 2 }}
              icon={<WhatsApp />}
            >
              Opening WhatsApp... You'll be connected to our business account shortly!
            </Alert>
          ) : (
            <>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Get instant help with your tax questions, book appointments, or upload documents directly through WhatsApp!
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Quick Questions:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {quickMessages.map((msg, index) => (
                    <Chip
                      key={index}
                      label={msg}
                      onClick={() => setMessage(msg)}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: '#25D366',
                        color: '#128C7E',
                        '&:hover': {
                          backgroundColor: 'rgba(37, 211, 102, 0.1)',
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <TextField
                fullWidth
                label="Your Phone Number"
                placeholder="+91 8341154481"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Your Message"
                placeholder="How can we help you with your taxes today?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <Message sx={{ mr: 1, color: 'text.secondary', mt: 1 }} />
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  <Phone sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                  Response time: Usually within 2 hours
                </Typography>
                <Chip
                  label="Secure & Private"
                  size="small"
                  color="success"
                  variant="outlined"
                />
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleClose}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendMessage}
            variant="contained"
            startIcon={<Send />}
            disabled={!phoneNumber || !message || showSuccess}
            sx={{
              borderRadius: 2,
              backgroundColor: '#25D366',
              '&:hover': {
                backgroundColor: '#128C7E',
              }
            }}
          >
            Send via WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WhatsAppWidget;