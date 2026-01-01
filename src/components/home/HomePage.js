import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Stack, 
  Paper,
  useTheme,
  Avatar,
  Rating,
  alpha
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ResponsiveImage from '../common/ResponsiveImage';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SEOHelmet from '../common/SEOHelmet';
import PremiumTestimonials from '../common/PremiumTestimonials';
import { seoConfig } from '../../config/seo.config';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const FeatureCard = ({ icon, title, description }) => {
  const theme = useTheme();
  return (
    <Paper
      component={motion.div}
      variants={itemVariants}
      elevation={0}
      sx={{
        p: 4,
        height: '100%',
        borderRadius: 4,
        bgcolor: 'background.paper',
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[4],
          borderColor: 'primary.main',
        }
      }}
    >
      <Box 
        sx={{ 
          display: 'inline-flex', 
          p: 2, 
          borderRadius: 3, 
          bgcolor: 'primary.light', 
          color: 'primary.contrastText',
          mb: 3
        }}
      >
        {icon}
      </Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
};

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <SEOHelmet {...seoConfig.home} />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          pt: { xs: 12, md: 24 },
          pb: { xs: 8, md: 20 },
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
        }}
      >
        {/* Decorative Background Elements */}
        <Box
            sx={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: '50%',
                height: '80%',
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                zIndex: 0,
                filter: 'blur(60px)',
            }}
        />
        <Box
            sx={{
                position: 'absolute',
                bottom: -50,
                left: -50,
                width: '40%',
                height: '60%',
                background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 70%)`,
                zIndex: 0,
                filter: 'blur(60px)',
            }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <Box component={motion.div} variants={itemVariants} sx={{ mb: 4 }}>
                  <Box 
                    sx={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2.5, 
                      py: 1, 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                      borderRadius: '50px',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`
                    }}
                  >
                    <VerifiedUserIcon fontSize="small" />
                    <Typography variant="subtitle2" fontWeight="700" letterSpacing={0.5}>
                      TRUSTED BY PROFESSIONALS
                    </Typography>
                  </Box>
                </Box>
                <Typography 
                  component={motion.h1}
                  variants={itemVariants}
                  variant="h1" 
                  color="text.primary"
                  sx={{ 
                    mb: 3,
                    fontSize: { xs: '3rem', md: '4.5rem' },
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05
                  }}
                >
                  Tax Filing Made <br />
                  <Box 
                    component="span" 
                    sx={{ 
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block',
                      position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 8,
                            left: 0,
                            width: '100%',
                            height: '8px',
                            bgcolor: alpha(theme.palette.secondary.main, 0.2),
                            zIndex: -1,
                            transform: 'rotate(-1deg)'
                        }
                    }}
                  >
                    Simple & Smart
                  </Box>
                </Typography>
                <Typography 
                  component={motion.p}
                  variants={itemVariants}
                  variant="h6" 
                  color="text.secondary" 
                  sx={{ mb: 5, fontWeight: 400, maxWidth: 580, lineHeight: 1.6, fontSize: '1.25rem' }}
                >
                  Navigate tax season with confidence. Our certified experts maximize your refund while you minimize the stress. Fast, secure, and reliable.
                </Typography>
                <Stack 
                  component={motion.div}
                  variants={itemVariants}
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                >
                  <Button 
                    variant="contained" 
                    size="large" 
                    component={RouterLink} 
                    to="/register"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      px: 5, 
                      py: 2, 
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      borderRadius: '50px',
                      boxShadow: `0 10px 20px -5px ${alpha(theme.palette.primary.main, 0.4)}`,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: `0 15px 25px -5px ${alpha(theme.palette.primary.main, 0.5)}`,
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Start Free Filing
                  </Button>
                  <Button 
                    variant="text" 
                    size="large"
                    component={RouterLink}
                    to="/services"
                    sx={{ 
                      px: 4, 
                      py: 2, 
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '50px',
                      color: 'text.primary',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        color: 'primary.main'
                      }
                    }}
                  >
                    Explore Services
                  </Button>
                </Stack>
                
                <Box component={motion.div} variants={itemVariants} sx={{ mt: 8, display: 'flex', alignItems: 'center', gap: 3 }}>
                     <Stack direction="row" spacing={-1.5}>
                    {[
                      { initial: 'PC', color: '#3B82F6' },
                      { initial: 'RC', color: '#10B981' },
                      { initial: 'MR', color: '#F59E0B' },
                      { initial: 'AD', color: '#6366F1' }
                    ].map((client, i) => (
                      <Avatar 
                        key={i} 
                        sx={{ 
                          width: 48, 
                          height: 48, 
                          bgcolor: client.color,
                          color: '#fff',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          border: `4px solid ${theme.palette.background.paper}`,
                          boxShadow: theme.shadows[2]
                        }} 
                      >
                        {client.initial}
                      </Avatar>
                    ))}
                  </Stack>
                  <Box>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Rating value={5} readOnly size="small" />
                      <Typography variant="body1" fontWeight="bold">5.0/5</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">from 1,000+ happy clients</Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            
            {/* Hero Image / Illustration */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
                style={{ position: 'relative' }}
              >
                  {/* Decorative blob behind image */}
                  <Box sx={{
                      position: 'absolute',
                      top: '5%',
                      right: '-5%',
                      width: '90%',
                      height: '90%',
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                      zIndex: -1,
                      animation: 'morph 8s ease-in-out infinite alternate',
                      '@keyframes morph': {
                          '0%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
                          '100%': { borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%' }
                      }
                  }} />

                <Box 
                  sx={{ 
                    position: 'relative',
                    borderRadius: 8,
                    overflow: 'hidden',
                    boxShadow: theme.shadows[10],
                    bgcolor: 'background.paper',
                    transform: 'perspective(1000px) rotateY(-5deg)',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                         transform: 'perspective(1000px) rotateY(0deg) translateY(-10px)',
                    }
                  }}
                >
                  <ResponsiveImage 
                    src="/images/hero-dashboard.svg" 
                    alt="Tax Planning Dashboard - Financial Analytics and Savings"
                    width="100%"
                    height="100%"
                    borderRadius={8}
                    edgeEnhance={false}
                    lazy={false}
                    placeholder
                    sx={{ display: 'block' }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" gutterBottom>
            Why Choose Affinity?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            We combine modern technology with human expertise to deliver the best tax experience possible.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard 
              icon={<SecurityIcon fontSize="large" />}
              title="Secure & Confidential"
              description="Bank-level encryption and security protocols ensure your sensitive financial data remains protected at all times."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard 
              icon={<SpeedIcon fontSize="large" />}
              title="Fast Turnaround"
              description="Get your taxes filed quickly and accurately. We optimize our process to ensure you get your refund sooner."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard 
              icon={<SupportAgentIcon fontSize="large" />}
              title="Expert Support"
              description="Access to certified CPAs and tax professionals who are ready to answer your questions year-round."
            />
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <PremiumTestimonials />
      </Container>

      {/* CTA Section */}
      <Box sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 60%, ${theme.palette.success.main} 100%)`,
        color: 'white', 
        py: 12 
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom sx={{ color: 'white' }}>
            Ready to file smarter?
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9 }}>
            Join thousands of satisfied clients who trust Affinity Tax Services.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            component={RouterLink} 
            to="/register"
            sx={{ 
              bgcolor: 'warning.main', 
              color: 'warning.contrastText',
              px: 6,
              py: 2,
              fontWeight: 'bold',
              boxShadow: 4,
              '&:hover': {
                bgcolor: 'warning.dark',
                transform: 'translateY(-2px)',
                boxShadow: 6
              },
              transition: 'all 0.3s ease'
            }}
          >
            Create Free Account
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
