import React from 'react';
import { Box } from '@mui/material';

const GlobalBackground = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: '#F0F9FF', // Light Sky Blue background
        overflow: 'hidden',
        pointerEvents: 'none', // Ensure clicks pass through
      }}
    >
      {/* Decorative background elements */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
      }} />
    </Box>
  );
};

export default GlobalBackground;
