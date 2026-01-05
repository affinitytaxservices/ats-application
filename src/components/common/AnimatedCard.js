import React, { useState } from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAnimatedCard = styled(Card)(({ theme, hoverEffect }) => ({
  borderRadius: '16px',
  border: '1px solid #E5E7EB',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  
  // Mobile-specific styles
  [theme.breakpoints.down('sm')]: {
    borderRadius: '12px',
    margin: '8px 0',
  },
  
  // Touch device optimizations
  '@media (hover: none) and (pointer: coarse)': {
    '&:hover': {
      transform: 'none',
    },
    '&:active': {
      transform: 'scale(0.98)',
      transition: 'transform 0.1s ease',
    },
  },
  
  // Subtle gradient overlay
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
  },
  
  '& .card-content': {
    position: 'relative',
    zIndex: 2,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
    },
  },
  
  '&:hover': {
    transform: hoverEffect === 'lift' 
      ? 'translateY(-10px) scale(1.03)' 
      : hoverEffect === 'tilt'
      ? 'perspective(1000px) rotateX(5deg) rotateY(5deg)'
      : 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    
    '&::before': {
      opacity: 1,
    },
    
    '& .animated-icon': {
      animation: 'iconBounce 0.6s ease-in-out',
      color: '#10B981',
    },
    
    '& .animated-content': {
      transform: 'translateY(-2px)',
    },
  },
  
  // Glow effect variant
  ...(hoverEffect === 'glow' && {
    '&:hover': {
      boxShadow: '0 0 30px rgba(59, 130, 246, 0.3), 0 20px 40px rgba(0, 0, 0, 0.15)',
    },
  }),
  
  // Float effect variant
  ...(hoverEffect === 'float' && {
    '&:hover': {
      animation: 'cardFloat 2s ease-in-out infinite',
    },
  }),
}));

const AnimatedCard = ({ 
  children, 
  hoverEffect = 'lift', 
  onClick, 
  className = '',
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledAnimatedCard
      hoverEffect={hoverEffect}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`animated-card ${className}`}
      {...props}
    >
      <CardContent className="card-content animated-content">
        {children}
      </CardContent>
    </StyledAnimatedCard>
  );
};

export default AnimatedCard;