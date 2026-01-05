import React, { useState, useEffect } from 'react';

// Component for Under Construction Page
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack, 
  Paper, 
  useTheme, 
  useMediaQuery,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Construction as ConstructionIcon, 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  Timer as TimerIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../common/SEOHelmet';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const floatAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const UnderConstructionPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Countdown timer logic (targeting 30 days from now for demo purposes)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      mx: { xs: 1, md: 2 }
    }}>
      <Paper elevation={3} sx={{ 
        width: { xs: 60, md: 80 }, 
        height: { xs: 60, md: 80 }, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 2,
        mb: 1
      }}>
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" sx={{ color: '#fff' }}>
          {String(value).padStart(2, '0')}
        </Typography>
      </Paper>
      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase' }}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <>
      <SEOHelmet 
        title="Under Construction - Affinity Tax Services"
        description="We are currently building something amazing. Our new website is coming soon."
        canonical="/under-construction"
      />
      
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
        pt: { xs: 12, md: 16 },
        pb: 8,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative elements */}
        <Box sx={{ 
          position: 'absolute', 
          top: '10%', 
          left: '5%', 
          width: '300px', 
          height: '300px', 
          borderRadius: '50%', 
          bgcolor: 'rgba(16, 185, 129, 0.05)', 
          filter: 'blur(80px)' 
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: '10%', 
          right: '5%', 
          width: '400px', 
          height: '400px', 
          borderRadius: '50%', 
          bgcolor: 'rgba(59, 130, 246, 0.05)', 
          filter: 'blur(100px)' 
        }} />

        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Stack spacing={4}>
                  <motion.div variants={itemVariants}>
                    <Box sx={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: 1, 
                      px: 2, 
                      py: 1, 
                      borderRadius: '50px', 
                      bgcolor: 'rgba(245, 158, 11, 0.2)', 
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      mb: 2
                    }}>
                      <ConstructionIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                      <Typography variant="subtitle2" sx={{ color: '#F59E0B', fontWeight: 700, letterSpacing: 1 }}>
                        WORK IN PROGRESS
                      </Typography>
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography variant="h1" sx={{ 
                      fontSize: { xs: '2.5rem', md: '4rem' }, 
                      fontWeight: 800, 
                      color: '#fff', 
                      lineHeight: 1.2 
                    }}>
                      Building Something <br />
                      <Box component="span" sx={{ 
                        background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent' 
                      }}>
                        Extraordinary
                      </Box>
                    </Typography>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: 500, lineHeight: 1.6 }}>
                      We are working hard to bring you a better experience. Our new platform will feature enhanced tax tools, secure document management, and real-time updates.
                    </Typography>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 4 }}>
                      <TimeUnit value={timeLeft.days} label="Days" />
                      <TimeUnit value={timeLeft.hours} label="Hours" />
                      <TimeUnit value={timeLeft.minutes} label="Mins" />
                      <TimeUnit value={timeLeft.seconds} label="Secs" />
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Button
                        variant="contained"
                        size="large"
                        component={RouterLink}
                        to="/contact"
                        startIcon={<EmailIcon />}
                        sx={{
                          bgcolor: '#F59E0B',
                          color: '#000',
                          fontWeight: 'bold',
                          px: 4,
                          py: 1.5,
                          '&:hover': { bgcolor: '#D97706' }
                        }}
                      >
                        Contact Us
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<PhoneIcon />}
                        href="tel:+15551234567"
                        sx={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          color: '#fff',
                          px: 4,
                          py: 1.5,
                          '&:hover': { 
                            borderColor: '#fff',
                            bgcolor: 'rgba(255,255,255,0.05)' 
                          }
                        }}
                      >
                        Call Now
                      </Button>
                    </Stack>
                  </motion.div>
                </Stack>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box 
                  component={motion.div}
                  animate={floatAnimation}
                  sx={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: { xs: 300, md: 500 },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {/* Visual Element - Abstract Construction/Tech representation */}
                  <Box sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(30,58,138,0.4) 0%, rgba(15,23,42,0) 70%)',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                     {/* Replace with actual image or complex SVG if needed. Using Icon for now */}
                     <ConstructionIcon sx={{ 
                       fontSize: { xs: 150, md: 250 }, 
                       color: 'rgba(255,255,255,0.1)' 
                     }} />
                     
                     <Box sx={{
                       position: 'absolute',
                       top: '50%',
                       left: '50%',
                       transform: 'translate(-50%, -50%)',
                       width: '80%',
                       height: '80%',
                       border: '2px dashed rgba(245, 158, 11, 0.3)',
                       borderRadius: '50%',
                       animation: 'spin 20s linear infinite',
                       '@keyframes spin': {
                         '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                         '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' }
                       }
                     }} />
                  </Box>
                  
                  {/* Floating cards */}
                  <Paper
                    component={motion.div}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    sx={{
                      position: 'absolute',
                      top: '20%',
                      right: '10%',
                      p: 2,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <Box sx={{ p: 1, bgcolor: '#10B981', borderRadius: '50%' }}>
                      <TimerIcon sx={{ color: '#fff' }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Status</Typography>
                      <Typography variant="body2" sx={{ color: '#fff', fontWeight: 'bold' }}>On Schedule</Typography>
                    </Box>
                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default UnderConstructionPage;
