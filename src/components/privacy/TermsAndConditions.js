import React from 'react';
import { Container, Typography, Box, Paper, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function TermsAndConditions() {
  return (
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
            Terms and Conditions
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            By accessing and using Affinity Tax Services, you accept and agree to be bound by these Terms and Conditions.
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
            2. Services
          </Typography>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            We provide tax preparation, planning, and consultation services. The scope and limitations of our services are subject to:
          </Typography>
          <List>
            {[
              'Applicable federal, state, and local tax laws',
              'Professional standards and ethics guidelines',
              'Specific agreements made with individual clients'
            ].map((text, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={text} 
                  primaryTypographyProps={{ fontSize: '1.1rem' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default TermsAndConditions;