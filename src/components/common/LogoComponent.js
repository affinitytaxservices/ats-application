import React from 'react';
import { Box, Typography } from '@mui/material';

const LogoComponent = ({ variant = 'medium', showText = true }) => {
  const logoSizes = {
    small: { width: 32, height: 32 },
    medium: { width: 40, height: 40 },
    large: { width: 50, height: 50 }
  };

  const size = logoSizes[variant] || logoSizes.medium;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Box
        component="img"
        src="/logo.svg"
        alt="Affinity Tax Services Logo"
        sx={{
          width: size.width,
          height: size.height,
          filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
          transition: 'transform 0.3s ease, filter 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))'
          }
        }}
      />
      {showText && (
        <Typography
          variant={variant === 'small' ? 'subtitle1' : 'h6'}
          component="span"
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
            background: 'linear-gradient(90deg, #1E3A8A 0%, #10B981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '0.5px',
            textShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            whiteSpace: 'nowrap'
          }}
        >
          Affinity Tax Services
        </Typography>
      )}
    </Box>
  );
};

export default LogoComponent;