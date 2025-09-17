import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAnimatedButton = styled(Button)(({ theme, variant: buttonVariant }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '12px',
  padding: '12px 24px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Ripple effect
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '0',
    height: '0',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.3)',
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.6s, height 0.6s',
  },
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: buttonVariant === 'gradient' 
      ? '0 8px 25px rgba(59, 130, 246, 0.4)'
      : '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
  
  '&:active::before': {
    width: '300px',
    height: '300px',
  },
  
  // Gradient variant
  ...(buttonVariant === 'gradient' && {
    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    color: 'white',
    border: 'none',
    '&:hover': {
      background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
    },
  }),
  
  // Outlined variant with glow
  ...(buttonVariant === 'outlined' && {
    border: '2px solid #3B82F6',
    color: '#3B82F6',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#3B82F6',
      color: 'white',
    },
  }),
  
  // Pulse variant
  ...(buttonVariant === 'pulse' && {
    animation: 'buttonPulse 2s ease-in-out infinite',
  }),
}));

const AnimatedButton = ({ 
  children, 
  variant = 'gradient', 
  onClick, 
  disabled = false,
  startIcon,
  endIcon,
  ...props 
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (event) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <StyledAnimatedButton
      variant={variant}
      onClick={handleClick}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      className={`${isClicked ? 'clicked' : ''} ${variant === 'pulse' ? 'micro-pulse' : 'micro-bounce'}`}
      {...props}
    >
      {children}
    </StyledAnimatedButton>
  );
};

export default AnimatedButton;