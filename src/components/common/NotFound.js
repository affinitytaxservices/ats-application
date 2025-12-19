import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 8,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '6rem', md: '10rem' },
              fontWeight: 800,
              color: '#1E3A8A',
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              fontWeight: 600,
              color: '#374151',
              mb: 3,
            }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#6B7280',
              fontSize: '1.1rem',
              mb: 6,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#1E3A8A',
              py: 1.5,
              px: 4,
              borderRadius: '12px',
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#1e40af',
              },
            }}
          >
            Go Back Home
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default NotFound;
