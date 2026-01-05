import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Card,
  CardContent,
  Fade
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import CountUp from 'react-countup';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import useScrollAnimation from '../../hooks/useScrollAnimation';

// Animations
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Styled components
const MetricsContainer = styled(Box)(() => ({
  position: 'relative',
  padding: '48px 0',
  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
  borderRadius: '24px',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #EC4899)',
    backgroundSize: '300% 100%',
    animation: `${shimmer} 3s ease-in-out infinite`,
  },
}));

const MetricCard = styled(Card)(() => ({
  height: '100%',
  borderRadius: '20px',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(99, 102, 241, 0.1)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 30px 80px rgba(99, 102, 241, 0.15)',
    '& .metric-icon': {
      transform: 'scale(1.1) rotate(5deg)',
      color: '#6366F1',
    },
    '& .metric-number': {
      animation: `${pulse} 1s ease-in-out`,
    },
  },
}));

const MetricIcon = styled(Box)(() => ({
  width: 60,
  height: 60,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  transition: 'all 0.3s ease',
  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
  
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: '#6366F1',
    transition: 'all 0.3s ease',
  },
}));

const AnimatedNumber = styled(Typography)(() => ({
  fontSize: '3rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontFamily: '"Inter", sans-serif',
  lineHeight: 1,
  marginBottom: '8px',
  
  '@media (max-width: 960px)': {
    fontSize: '2.5rem',
  },
  '@media (max-width: 600px)': {
    fontSize: '2rem',
  },
}));

// Success metrics data
const metricsData = [
  {
    id: 1,
    icon: AttachMoneyIcon,
    number: 25000 ,
    suffix: '+',
    prefix: '$',
    label: 'Total Client Savings',
    description: 'Saved for our clients in 2024',
    color: '#10B981',
  },
  {
    id: 2,
    icon: PeopleIcon,
    number: 1250,
    suffix: '+',
    prefix: '',
    label: 'Happy Clients',
    description: 'Served across all industries',
    color: '#6366F1',
  },
  {
    id: 3,
    icon: StarIcon,
    number: 4.9,
    suffix: '/5',
    prefix: '',
    label: 'Client Satisfaction',
    description: 'Average rating from reviews',
    color: '#F59E0B',
  },
  {
    id: 4,
    icon: TrendingUpIcon,
    number: 98,
    suffix: '%',
    prefix: '',
    label: 'Success Rate',
    description: 'Tax returns filed successfully',
    color: '#EF4444',
  },
];

const SuccessMetrics = ({ showTitle = true }) => {
  const [containerRef, isVisible] = useScrollAnimation(0.3);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <MetricsContainer ref={containerRef}>
      {showTitle && (
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Fade in={isVisible} timeout={1000}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Our Success by the Numbers
            </Typography>
          </Fade>
          <Fade in={isVisible} timeout={1200}>
            <Typography
              variant="body1"
              sx={{
                color: '#6B7280',
                fontSize: '1.125rem',
                maxWidth: 600,
                mx: 'auto',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Real results that speak to our commitment to client success and financial excellence.
            </Typography>
          </Fade>
        </Box>
      )}

      <Grid container spacing={4} justifyContent="center">
        {metricsData.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={metric.id}>
            <Fade in={isVisible} timeout={1000 + (index * 200)}>
              <MetricCard>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <MetricIcon className="metric-icon">
                    <metric.icon />
                  </MetricIcon>
                  
                  <AnimatedNumber 
                    variant="h2" 
                    component="div"
                    className="metric-number"
                  >
                    {startAnimation ? (
                      <>
                        {metric.prefix}
                        <CountUp
                          start={0}
                          end={metric.number}
                          duration={2.5}
                          delay={index * 0.3}
                          decimals={metric.id === 3 ? 1 : 0}
                          separator=","
                        />
                        {metric.suffix}
                      </>
                    ) : (
                      `${metric.prefix}0${metric.suffix}`
                    )}
                  </AnimatedNumber>
                  
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      color: '#1F2937',
                      mb: 1,
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {metric.label}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6B7280',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {metric.description}
                  </Typography>
                </CardContent>
              </MetricCard>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </MetricsContainer>
  );
};

export default SuccessMetrics;