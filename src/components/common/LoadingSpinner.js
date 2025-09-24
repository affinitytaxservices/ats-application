import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const SpinnerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  '& .MuiCircularProgress-root': {
    animation: 'spin 1s linear infinite',
    color: '#3B82F6',
  },
}));

const PulsingDot = styled(Box)(({ theme }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: '#3B82F6',
  margin: '0 4px',
  animation: 'pulse 1.4s ease-in-out infinite both',
  '&:nth-of-type(1)': {
    animationDelay: '-0.32s',
  },
  '&:nth-of-type(2)': {
    animationDelay: '-0.16s',
  },
}));

const DotsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60px',
}));

const LoadingSpinner = ({ variant = 'circular', size = 40, color = 'primary' }) => {
  if (variant === 'dots') {
    return (
      <DotsContainer>
        <PulsingDot />
        <PulsingDot />
        <PulsingDot />
      </DotsContainer>
    );
  }

  return (
    <SpinnerContainer>
      <CircularProgress size={size} color={color} />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;