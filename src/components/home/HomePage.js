import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Card,
  CardContent,
  Fade,
  Slide,
  Zoom
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import UpdateIcon from '@mui/icons-material/Update';
import TaxIcon from '@mui/icons-material/Receipt';
import PlanningIcon from '@mui/icons-material/BarChart';
import AuditIcon from '@mui/icons-material/Gavel';
import DigitalIcon from '@mui/icons-material/CloudUpload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import SupportIcon from '@mui/icons-material/Support';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import InspirationalQuotes from '../common/InspirationalQuotes';
import FloatingParticles from '../common/FloatingParticles';
import PremiumTestimonials from '../common/PremiumTestimonials';
import SuccessMetrics from '../common/SuccessMetrics';
import '../styles/animations.css';

// Premium styled components with enhanced visual effects
const AnimatedTypography = styled(Typography)(({ theme: _theme }) => ({
  overflow: 'hidden',
  fontFamily: '"Inter", sans-serif',
  fontWeight: 700,
  position: 'relative',
  background: 'linear-gradient(135deg, #1F2937 0%, #3B82F6 50%, #10B981 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% 200%',
  animation: 'gradientShift 4s ease-in-out infinite',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '3px',
    background: 'linear-gradient(90deg, #3B82F6, #10B981, #F59E0B)',
    transform: 'scaleX(0)',
    transformOrigin: 'bottom right',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '2px',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
    transformOrigin: 'bottom left',
  },
  '@keyframes gradientShift': {
    '0%, 100%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
  },
}));

const StatBox = styled(Box)(({ theme: _theme }) => ({
  padding: _theme.spacing(4),
  borderRadius: '20px',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  border: '1px solid rgba(59, 130, 246, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #3B82F6, #10B981)',
    transform: 'scaleX(0)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
    '&::before': {
      transform: 'scaleX(1)',
    },
  },
}));

const ServiceCard = styled(Card)(({ theme: _theme }) => ({
  height: '100%',
  borderRadius: '20px',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  border: '1px solid rgba(59, 130, 246, 0.1)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #3B82F6, #10B981, #F59E0B)',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
    '&::before': {
      transform: 'scaleX(1)',
    },
    '& .service-icon': {
      transform: 'scale(1.1) rotate(5deg)',
      filter: 'drop-shadow(0 8px 16px rgba(59, 130, 246, 0.3))',
    },
  },
  '& .service-icon': {
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
}));

const GradientButton = styled(Button)(({ theme: _theme }) => ({
  borderRadius: '16px',
  padding: '14px 36px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 50%, #10B981 100%)',
  backgroundSize: '200% 200%',
  color: 'white',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
    transition: 'left 0.6s',
  },
  '&:hover': {
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 15px 35px rgba(59, 130, 246, 0.5)',
    backgroundPosition: '100% 0',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-1px) scale(1.02)',
  },
  [_theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '280px',
    margin: '0 auto',
  },
}));

const OutlinedButton = styled(Button)(({ theme: _theme }) => ({
  borderRadius: '16px',
  padding: '14px 36px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  border: '2px solid transparent',
  background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #3B82F6, #10B981) border-box',
  color: '#3B82F6',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #3B82F6, #10B981)',
    transition: 'left 0.6s',
    zIndex: -1,
  },
  '&:hover': {
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 15px 35px rgba(59, 130, 246, 0.3)',
    color: 'white',
    '&::before': {
      left: '0',
    },
  },
  [_theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '280px',
    margin: '0 auto',
  },
}));

const UpdateCard = styled(Paper)(({ theme: _theme }) => ({
  padding: _theme.spacing(4),
  borderRadius: '20px',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  border: '1px solid rgba(59, 130, 246, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #3B82F6, #10B981)',
    transform: 'scaleX(0)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)',
    '&::before': {
      transform: 'scaleX(1)',
    },
  },
  '& .update-icon': {
    transition: 'transform 0.3s ease',
    color: '#3B82F6',
  },
}));

const HeartIcon = styled(FavoriteIcon)(({ theme: _theme }) => ({
  color: '#EF4444',
  fontSize: '1.2rem',
  animation: 'heartBeat 2s ease-in-out infinite',
  filter: 'drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))',
  '@keyframes heartBeat': {
    '0%, 100%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
  },
}));

const PremiumSection = styled(Box)(({ theme: _theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '24px',
  padding: _theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    animation: 'float 6s ease-in-out infinite',
  },
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
}));

const HomePage = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  // Scroll animation hooks for different sections
  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [servicesRef, servicesVisible] = useScrollAnimation(0.1);
  const [statsRef, statsVisible] = useScrollAnimation(0.3);
  const [updatesRef, updatesVisible] = useScrollAnimation(0.2);
  const [featuresRef, featuresVisible] = useScrollAnimation(0.2);
  const [quotesRef, quotesVisible] = useScrollAnimation(0.2);

  // Sample data for services
  const services = [
    {
      title: 'Tax Preparation',
      description: 'Comprehensive tax preparation services for individuals and businesses with expert guidance to maximize your refund.',
      icon: <TaxIcon sx={{ fontSize: 60, color: '#3B82F6' }} />,
      image: '/images/tax-preparation.jpg'
    },
    {
      title: 'Tax Planning',
      description: 'Strategic tax planning to minimize your tax liability and develop personalized strategies for your financial goals.',
      icon: <PlanningIcon sx={{ fontSize: 60, color: '#3B82F6' }} />,
      image: '/images/tax-planning.jpg'
    },
    {
      title: 'Audit Support',
      description: 'Professional representation and support during tax audits to ensure your rights are protected throughout the process.',
      icon: <AuditIcon sx={{ fontSize: 60, color: '#3B82F6' }} />,
      image: '/images/audit-support.jpg'
    },
    {
      title: 'Digital Filing',
      description: 'Secure electronic filing with fast processing and direct deposit options for quicker access to your refund.',
      icon: <DigitalIcon sx={{ fontSize: 60, color: '#3B82F6' }} />,
      image: '/images/digital-filing.jpg'
    }
  ];

  // Sample data for updates
  const updates = [
    {
      title: 'Tax Law Changes',
      content: 'Recent updates to tax laws that may affect your filing status and deductions for the current tax year.',
    },
    {
      title: 'New Deductions Available',
      content: 'Explore newly available tax deductions that could significantly reduce your taxable income this year.',
    },
    {
      title: 'Filing Deadline Approaching',
      content: 'Important reminder about upcoming tax filing deadlines and extension options if you need more time.',
    }
  ];

  // Sample data for features
  const features = [
    'Expert tax professionals with years of experience',
    'Secure handling of all your sensitive financial information',
    'Personalized tax strategies tailored to your situation',
    'Year-round support for all your tax-related questions',
    'Maximum refund guarantee on all tax preparations',
    'Audit protection and representation if needed'
  ];

  // Enhanced features with icons
  const premiumFeatures = [
    {
      icon: <TrendingUpIcon sx={{ color: '#10B981', fontSize: 40 }} />,
      title: 'Maximize Your Savings',
      description: 'Our expert strategies help you keep more of what you earn through legal tax optimization.'
    },
    {
      icon: <SecurityIcon sx={{ color: '#3B82F6', fontSize: 40 }} />,
      title: 'Bank-Level Security',
      description: 'Your sensitive financial data is protected with military-grade encryption and security protocols.'
    },
    {
      icon: <SupportIcon sx={{ color: '#F59E0B', fontSize: 40 }} />,
      title: '24/7 Expert Support',
      description: 'Get answers to your tax questions anytime with our dedicated team of certified professionals.'
    }
  ];

  // Animate counting for statistics
  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    
    const target1 = 95;
    const target2 = 1000;
    const target3 = 98;

    const step1 = target1 / (duration / interval);
    const step2 = target2 / (duration / interval);
    const step3 = target3 / (duration / interval);

    let current1 = 0;
    let current2 = 0;
    let current3 = 0;

    const timer = setInterval(() => {
      current1 += step1;
      current2 += step2;
      current3 += step3;

      if (current1 >= target1) {
        current1 = target1;
        setCount1(Math.floor(current1));
        clearInterval(timer);
      } else {
        setCount1(Math.floor(current1));
        setCount2(Math.floor(current2));
        setCount3(Math.floor(current3));
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating Particles Background */}
      <FloatingParticles particleCount={30} />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section with Enhanced Animations */}
        <Box 
          ref={heroRef}
          sx={{ 
            textAlign: 'center', 
            py: { xs: 6, sm: 8, md: 12 },
            px: { xs: 2, sm: 3 },
            position: 'relative'
          }}
        >
          <Fade in={heroVisible} timeout={1000}>
            <Box>
              <AnimatedTypography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  mb: { xs: 2, sm: 3 },
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  lineHeight: { xs: 1.2, md: 1.1 },
                  fontFamily: '"Inter", sans-serif',
                  px: { xs: 1, sm: 2 },
                }}
              >
                Premium Tax Services
                <br />
                <Box component="span" sx={{ 
                  background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Made Simple
                </Box>
              </AnimatedTypography>
              
              <Typography 
                variant="h5" 
                component="p" 
                sx={{ 
                  mb: { xs: 3, sm: 4 },
                  color: '#6B7280',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.5rem' },
                  lineHeight: { xs: 1.5, md: 1.4 },
                  maxWidth: { xs: '100%', sm: '600px' },
                  mx: 'auto',
                  px: { xs: 2, sm: 3 },
                }}
              >
                Expert tax preparation and planning services designed to maximize your savings and minimize your stress.
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', mb: 8 }}>
                <GradientButton 
                  component={RouterLink} 
                  to="/register" 
                  size="large" 
                  endIcon={<ArrowForwardIcon />}
                >
                  Start Your Journey
                </GradientButton>
                <OutlinedButton 
                  component={RouterLink} 
                  to="/contacts" 
                  size="large"
                >
                  Schedule Consultation
                </OutlinedButton>
              </Box>
            </Box>
          </Fade>
        </Box>

        {/* Inspirational Quotes Section */}
        <Box ref={quotesRef} sx={{ mb: { xs: 8, md: 12 } }}>
          <Fade in={quotesVisible} timeout={1000}>
            <InspirationalQuotes autoRotate={true} rotationInterval={10000} />
          </Fade>
        </Box>

        {/* Statistics Section */}
        <Box ref={statsRef} sx={{ mb: { xs: 6, sm: 8, md: 12 } }}>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid item xs={12} sm={4}>
              <Zoom in={statsVisible} timeout={1000}>
                <StatBox sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h2" 
                    component="div" 
                    sx={{ 
                      fontWeight: 800,
                      color: '#10B981',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                      mb: 1,
                    }}
                  >
                    {count1}%
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#374151',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem' },
                    }}
                  >
                    Client Satisfaction
                  </Typography>
                </StatBox>
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Zoom in={statsVisible} timeout={1200}>
                <StatBox sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h2" 
                    component="div" 
                    sx={{ 
                      fontWeight: 800,
                      color: '#3B82F6',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                      mb: 1,
                    }}
                  >
                    {count2}+
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#374151',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem' },
                    }}
                  >
                    Returns Filed
                  </Typography>
                </StatBox>
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Zoom in={statsVisible} timeout={1400}>
                <StatBox sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h2" 
                    component="div" 
                    sx={{ 
                      fontWeight: 800,
                      color: '#F59E0B',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                      mb: 1,
                    }}
                  >
                    {count3}%
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#374151',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem' },
                    }}
                  >
                    Accuracy Rate
                  </Typography>
                </StatBox>
              </Zoom>
            </Grid>
          </Grid>
        </Box>

        {/* Premium Features Section */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <AnimatedTypography 
            variant="h3" 
            component="h2" 
            align="center" 
            sx={{ 
              mb: 6,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Why Choose Our Premium Service
          </AnimatedTypography>
          
          <Grid container spacing={4}>
            {premiumFeatures.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Slide in={true} direction="up" timeout={1000 + (index * 200)}>
                  <ServiceCard>
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box className="service-icon" sx={{ mb: 3 }}>
                        {feature.icon}
                      </Box>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600,
                          color: '#1F2937',
                          fontFamily: '"Inter", sans-serif',
                          fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                          mb: { xs: 1, sm: 2 },
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#6B7280',
                          fontFamily: '"Inter", sans-serif',
                          fontSize: { xs: '0.875rem', sm: '0.9rem' },
                          lineHeight: 1.5,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </ServiceCard>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Services Section */}
        <Box ref={servicesRef} sx={{ mb: { xs: 6, sm: 8, md: 12 } }}>
          <AnimatedTypography 
            variant="h3" 
            component="h2" 
            align="center" 
            sx={{ 
              mb: { xs: 4, sm: 5, md: 6 },
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              fontFamily: '"Inter", sans-serif',
              px: { xs: 2, sm: 3 },
            }}
          >
            Our Premium Services
          </AnimatedTypography>
          
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Slide in={servicesVisible} direction="up" timeout={1000 + (index * 200)}>
                  <ServiceCard sx={{ height: '100%' }}>
                    <CardContent sx={{ 
                      p: { xs: 3, sm: 4 }, 
                      textAlign: 'center',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <Box className="service-icon" sx={{ mb: { xs: 2, sm: 3 } }}>
                        {service.icon}
                      </Box>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600,
                          color: '#1F2937',
                          fontFamily: '"Inter", sans-serif',
                          fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                          mb: { xs: 1, sm: 2 },
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#6B7280',
                          fontFamily: '"Inter", sans-serif',
                          fontSize: { xs: '0.875rem', sm: '0.9rem' },
                          lineHeight: 1.5,
                        }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </ServiceCard>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Client Testimonials Section */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          {/* Success Metrics */}
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <SuccessMetrics />
          </Box>
          
          {/* Testimonials */}
          <PremiumTestimonials autoRotate={true} rotationInterval={8000} />
        </Box>

        {/* Updates Section */}
        <Box ref={updatesRef} sx={{ mb: { xs: 6, sm: 8, md: 12 } }}>
          <AnimatedTypography 
            variant="h3" 
            component="h2" 
            align="center" 
            sx={{ 
              mb: 6,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Latest Tax Updates
          </AnimatedTypography>
          
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {updates.map((update, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Fade in={updatesVisible} timeout={1000 + (index * 300)}>
                  <UpdateCard sx={{ height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
                      <UpdateIcon className="update-icon" sx={{ mr: 1, fontSize: { xs: 24, sm: 28 } }} />
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600,
                          color: '#1F2937',
                          fontFamily: '"Inter", sans-serif',
                          fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                        }}
                      >
                        {update.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#6B7280',
                        fontFamily: '"Inter", sans-serif',
                        fontSize: { xs: '0.875rem', sm: '0.9rem' },
                        lineHeight: 1.5,
                      }}
                    >
                      {update.content}
                    </Typography>
                  </UpdateCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Section */}
        <Box ref={featuresRef} sx={{ mb: { xs: 4, md: 8 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={featuresVisible} timeout={1000}>
                <Box>
                  <AnimatedTypography 
                    variant="h3" 
                    component="h2" 
                    sx={{ 
                      mb: 4,
                      fontSize: { xs: '1.75rem', md: '2.25rem' },
                      fontWeight: 700,
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    Why Choose Us
                  </AnimatedTypography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <List>
                        {features.slice(0, 3).map((feature, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon>
                              <CheckIcon sx={{ color: '#3B82F6' }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature}
                              primaryTypographyProps={{
                                fontFamily: '"Inter", sans-serif',
                                color: '#ffffff'
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <List>
                        {features.slice(3).map((feature, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon>
                              <CheckIcon sx={{ color: '#3B82F6' }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature}
                              primaryTypographyProps={{
                                fontFamily: '"Inter", sans-serif',
                                color: '#ffffff'
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 4 }}>
                    <GradientButton 
                      component={RouterLink} 
                      to="/contacts" 
                      size="large" 
                      endIcon={<ArrowForwardIcon />}
                    >
                      Contact Us Today
                    </GradientButton>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={featuresVisible} timeout={1500}>
                <Box 
                  component="img"
                  src="/images/tax-features.svg"
                  alt="Tax Features Illustration"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    display: 'block',
                    mx: 'auto',
                    filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2))',
                    transition: 'all 0.5s ease',
                    '&:hover': {
                      transform: 'translateY(-10px) scale(1.02)',
                      filter: 'drop-shadow(0 25px 40px rgba(16, 185, 129, 0.3))',
                    }
                  }}
                />
              </Zoom>
            </Grid>
          </Grid>
        </Box>

        {/* Premium CTA Section */}
        <PremiumSection 
          sx={{ 
            mt: { xs: 8, md: 12 },
            textAlign: 'center'
          }}
        >
          <Fade in={true} timeout={1000}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                  fontWeight: 700,
                  color: '#ffffff',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Ready to Experience Better Tax Services?
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: 700,
                  mx: 'auto',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Join thousands of satisfied clients who trust us with their tax needs. Our expert team is designed <HeartIcon sx={{ mx: 0.5 }} /> to deliver exceptional experiences.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  component={RouterLink} 
                  to="/register" 
                  size="large" 
                  sx={{ 
                    bgcolor: '#ffffff',
                    color: '#1E3A8A',
                    fontWeight: 600,
                    px: 4,
                    borderRadius: '16px',
                    '&:hover': {
                      bgcolor: '#f0f0f0',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 25px rgba(255, 255, 255, 0.25)',
                    }
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  component={RouterLink} 
                  to="/contacts" 
                  size="large" 
                  sx={{ 
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    fontWeight: 600,
                    px: 4,
                    borderRadius: '16px',
                    '&:hover': {
                      borderColor: '#ffffff',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-3px)',
                    }
                  }}
                >
                  Talk to an Expert
                </Button>
              </Box>
            </Box>
          </Fade>
        </PremiumSection>
      </Container>
    </Box>
  );
};

export default HomePage;