import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

function PrivacyPolicy() {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'rgba(248, 250, 252, 0.95)',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)',
        zIndex: -1
      }
    }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 6, borderRadius: 2 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              py: 3,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '4px',
                background: 'linear-gradient(to right, transparent, primary.main, transparent)',
                borderRadius: '2px'
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(to right, transparent, primary.main, transparent)',
                borderRadius: '2px'
              },
              transition: 'transform 0.3s ease, color 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                color: 'primary.dark'
              },
              animation: 'fadeIn 1s ease-in'
            }}
          >
            Privacy Policy
          </Typography>
        </Box>
        
        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
            1. Information We Collect
          </Typography>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            We collect information that you provide directly to us, including personal information such as your name, email address, phone number, and tax-related documents necessary for our services.
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
            2. How We Use Your Information
          </Typography>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            We use the collected information to provide tax preparation and planning services, communicate with you about our services, and comply with legal obligations.
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
            3. Information Security
          </Typography>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default PrivacyPolicy;