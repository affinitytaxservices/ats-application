import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { fadeIn } from '../../styles/animations';

// This is a placeholder component that simulates a map
// In a real application, you would integrate with Google Maps, Mapbox, or another mapping service
function MapComponent({ address, height = 250 }) {
  return (
    <Paper
      elevation={3}
      sx={{
        height: `${height}px`,
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        animation: `${fadeIn} 0.8s ease-out`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'url(/images/office-background.jpg) center/cover no-repeat',
          filter: 'grayscale(0.7) brightness(0.9)',
          zIndex: 1,
          transition: 'all 0.3s ease',
        },
        '&:hover::before': {
          filter: 'grayscale(0.3) brightness(1)',
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translate(-50%, -50%) scale(1.05)',
          }
        }}
      >
        <LocationOnIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Our Office
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 1 }}>
          {address}
        </Typography>
      </Box>
      
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '8px 16px',
          background: 'linear-gradient(90deg, rgba(46, 80, 119, 0.9) 0%, rgba(56, 178, 172, 0.9) 100%)',
          color: 'white',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="body2">
          Interactive Map
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Click for directions
        </Typography>
      </Box>
    </Paper>
  );
}

export default MapComponent;