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
  CardMedia,
  Chip,
  Avatar,
  Divider,
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
import useScrollAnimation from '../../hooks/useScrollAnimation';
import '../styles/animations.css';


// Styled components
const AnimatedTypography = styled(Typography)(() => ({
  overflow: 'hidden',
  fontFamily: '"Inter", sans-serif',
  fontWeight: 700,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '#3B82F6',
    transform: 'scaleX(0)',
    transformOrigin: 'bottom right',
    transition: 'transform 0.3s ease-out',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
    transformOrigin: 'bottom left',
  },
}));

// Unused component - keeping for future use
// const AnimatedBox = styled(Box)(({ theme }) => ({
//   transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
//   '&:hover': {
//     transform: 'translateY(-10px)',
//     boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
//   }
// }));

const StatBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  border: '1px solid #E5E7EB',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderColor: '#D1D5DB',
  },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  border: '1px solid #E5E7EB',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.03)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    '& .service-icon': {
      animation: 'iconBounce 0.6s ease-in-out',
      color: '#10B981',
    },
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3B82F6',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  minHeight: '44px',
  transition: 'all 0.2s ease',
  fontFamily: '"Inter", sans-serif',
  '&:hover': {
    backgroundColor: '#2563EB',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '280px',
    margin: '0 auto',
  },
}));

const OutlinedButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  border: '2px solid #3B82F6',
  color: '#3B82F6',
  backgroundColor: 'transparent',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
    backgroundColor: '#3B82F6',
    color: 'white',
    '&::before': {
      left: '100%',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '280px',
    margin: '0 auto',
  },
}));

const UpdateCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  border: '1px solid #E5E7EB',
  transition: 'all 0.2s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderColor: '#D1D5DB',
  },
  '& .update-icon': {
    transition: 'transform 0.3s ease',
    color: '#3B82F6',
  },
}));

const HomePage = () => {
  // Keeping useTheme for future responsive design implementations
  // const theme = useTheme();
  // These variables are defined for future responsive design implementations
  // const isMobile = useMediaQuery(theme?.breakpoints.down('sm'));
  // const isMedium = useMediaQuery(theme?.breakpoints.down('md'));
  
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  // Scroll animation hooks for different sections
  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [servicesRef, servicesVisible] = useScrollAnimation(0.1);
  const [statsRef, statsVisible] = useScrollAnimation(0.3);
  const [updatesRef, updatesVisible] = useScrollAnimation(0.2);
  const [featuresRef, featuresVisible] = useScrollAnimation(0.2);

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

  // Animate counting for statistics
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    
    const target1 = 95; // Client satisfaction percentage
    const target2 = 1000; // Tax returns filed
    const target3 = 98; // On-time filing percentage
    
    const steps1 = Math.ceil(duration / interval);
    const steps2 = Math.ceil(duration / interval);
    const steps3 = Math.ceil(duration / interval);
    
    const increment1 = target1 / steps1;
    const increment2 = target2 / steps2;
    const increment3 = target3 / steps3;
    
    let current1 = 0;
    let current2 = 0;
    let current3 = 0;
    
    const timer = setInterval(() => {
      current1 += increment1;
      current2 += increment2;
      current3 += increment3;
      
      if (current1 >= target1) {
        setCount1(target1);
      } else {
        setCount1(Math.floor(current1));
      }
      
      if (current2 >= target2) {
        setCount2(target2);
      } else {
        setCount2(Math.floor(current2));
      }
      
      if (current3 >= target3) {
        setCount3(target3);
      } else {
        setCount3(Math.floor(current3));
      }
      
      if (current1 >= target1 && current2 >= target2 && current3 >= target3) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#FAFAFA',
      color: '#374151',
      pt: { xs: 8, md: 12 },
      pb: { xs: 10, md: 15 }
    }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" sx={{ mb: { xs: 6, md: 10 } }}>
          <Grid item xs={12} md={6}>
            <Box 
              ref={heroRef}
              className={`animate-on-scroll ${heroVisible ? 'slide-left' : ''}`}
            >
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  color: '#1F2937',
                  fontFamily: '"Inter", sans-serif',
                  lineHeight: 1.2
                }}
              >
                Smart Tax Solutions for Your Success
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 400,
                  mb: 4,
                  color: '#6B7280',
                  fontFamily: '"Inter", sans-serif',
                  maxWidth: '90%'
                }}
              >
                Professional tax services that simplify your finances and maximize your returns
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                flexWrap: 'wrap', 
                gap: 2, 
                mb: 6,
                '& > *': {
                  minWidth: { xs: '100%', sm: 'auto' },
                  justifyContent: 'center'
                }
              }}>
                <GradientButton 
                  component={RouterLink} 
                  to="/register" 
                  size="large" 
                  endIcon={<ArrowForwardIcon />}
                  className="micro-bounce"
                >
                  Get Started
                </GradientButton>
                <OutlinedButton 
                  component={RouterLink} 
                  to="/tax-information" 
                  size="large"
                  className="button-hover-glow"
                >
                  Learn More
                </OutlinedButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Zoom in={true} timeout={1500}>
              <Box 
                component="img"
                src="/images/tax-hero.svg"
                alt="Tax Services Illustration"
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

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={1000}>
              <StatBox>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    fontWeight: 700,
                    color: '#3B82F6',
                    mb: 1,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {count1}%
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#6B7280',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Client Satisfaction
                </Typography>
              </StatBox>
            </Fade>
          </Grid>
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={1500}>
              <StatBox>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    fontWeight: 700,
                    color: '#3B82F6',
                    mb: 1,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {count2}+
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#6B7280',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Tax Returns Filed
                </Typography>
              </StatBox>
            </Fade>
          </Grid>
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={2000}>
              <StatBox>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    fontWeight: 700,
                    color: '#3B82F6',
                    mb: 1,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {count3}%
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#6B7280',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  On-time Filing
                </Typography>
              </StatBox>
            </Fade>
          </Grid>
        </Grid>

        {/* Services Section */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <AnimatedTypography 
            variant="h3" 
            component="h2" 
            align="center" 
            sx={{ 
              mb: 6,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              color: '#1F2937',
              position: 'relative',
              display: 'inline-block',
              mx: 'auto',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Comprehensive Tax Services
          </AnimatedTypography>
          
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Slide direction="up" in={true} timeout={500 + (index * 200)}>
                  <ServiceCard>
                    <CardMedia
                      component="div"
                      sx={{
                        height: 140,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F9FAFB',
                      }}
                    >
                      <Box className="service-icon">
                        {service.icon}
                      </Box>
                    </CardMedia>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600,
                          color: '#1F2937',
                          fontFamily: '"Inter", sans-serif',
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#6B7280',
                          fontFamily: '"Inter", sans-serif',
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

        {/* Updates Section */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <AnimatedTypography 
            variant="h3" 
            component="h2" 
            align="center" 
            sx={{ 
              mb: 6,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              color: '#1F2937',
              position: 'relative',
              display: 'inline-block',
              mx: 'auto',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Latest Tax Updates
          </AnimatedTypography>
          
          <Grid container spacing={4}>
            {updates.map((update, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={true} timeout={1000 + (index * 300)}>
                  <UpdateCard>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <UpdateIcon className="update-icon" sx={{ mr: 1, fontSize: 28 }} />
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600,
                          color: '#1F2937',
                          fontFamily: '"Inter", sans-serif',
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
                        flexGrow: 1
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
        <Box sx={{ mb: { xs: 4, md: 8 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <AnimatedTypography 
                    variant="h3" 
                    component="h2" 
                    sx={{ 
                      mb: 4,
                      fontSize: { xs: '1.75rem', md: '2.25rem' },
                      fontWeight: 700,
                      color: '#1F2937',
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
                              sx={{ 
                                '& .MuiListItemText-primary': { 
                                  color: '#6B7280',
                                  fontFamily: '"Inter", sans-serif',
                                } 
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
                              <CheckIcon sx={{ color: '#10B981' }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature} 
                              sx={{ 
                                '& .MuiListItemText-primary': { 
                                  color: '#6B7280',
                                  fontFamily: '"Inter", sans-serif',
                                } 
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
              <Zoom in={true} timeout={1500}>
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

        {/* CTA Section */}
        <Box 
          sx={{ 
            mt: { xs: 8, md: 12 },
            py: 6,
            px: { xs: 3, md: 6 },
            borderRadius: 4,
            background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center'
          }}
        >
          <Fade in={true} timeout={1000}>
            <Box>
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
                Ready to Simplify Your Taxes?
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
                Join thousands of satisfied clients who trust us with their tax needs. Our expert team is ready to help you maximize your refund and minimize your stress.
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
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;