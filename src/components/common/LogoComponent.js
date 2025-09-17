import React from 'react';
import { Box, Typography } from '@mui/material';

const LogoComponent = ({ variant = 'medium', showText = true }) => {
  const logoSizes = {
    small: { width: 40, height: 40 },
    medium: { width: 52, height: 52 },
    large: { width: 64, height: 64 },
    xlarge: { width: 80, height: 80 }
  };

  const size = logoSizes[variant] || logoSizes.medium;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          filter: 'brightness(1.1)'
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
          filter: 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.15)) brightness(1.05) contrast(1.1)',
          transition: 'transform 0.3s ease, filter 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            filter: 'drop-shadow(0px 5px 12px rgba(0, 0, 0, 0.2)) brightness(1.1) contrast(1.15)'
          }
        }}
      />
      {showText && (
        <Typography
          variant={variant === 'small' ? 'subtitle1' : variant === 'large' || variant === 'xlarge' ? 'h5' : 'h6'}
          component="span"
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            color: '#1E3A8A',
            letterSpacing: '0.5px',
            textShadow: '0px 2px 4px rgba(30, 58, 138, 0.15)',
            whiteSpace: 'nowrap',
            background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #10B981 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: variant === 'small' ? '1rem' : variant === 'large' || variant === 'xlarge' ? '1.5rem' : '1.25rem'
          }}
        >
          Affinity Tax Services
        </Typography>
      )}
    </Box>
  );
};

export default LogoComponent;