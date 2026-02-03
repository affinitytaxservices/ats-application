import React from 'react';
import { Box, useTheme } from '@mui/material';

const GlobalBackground = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundColor: 'background.default', // Use theme background
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Subtle decorative elements for professional look */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.palette.primary.light} 0%, transparent 70%)`,
        opacity: 0.03,
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.palette.secondary.main} 0%, transparent 70%)`,
        opacity: 0.03,
      }} />
    </Box>
  );
};

export default GlobalBackground;
