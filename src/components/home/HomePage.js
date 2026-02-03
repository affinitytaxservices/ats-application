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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BoltIcon from '@mui/icons-material/Bolt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SEOHelmet from '../common/SEOHelmet';
import PremiumTestimonials from '../common/PremiumTestimonials';
import { seoConfig } from '../../config/seo.config';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 40, damping: 15 }
  }
};

const AnimatedBlob = ({ color, top, left, right, bottom, delay = 0, size = '40vw' }) => (
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 45, 0],
      x: [0, 50, 0],
      y: [0, -30, 0],
    }}
    transition={{ 
      duration: 15, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay: delay
    }}
    style={{
      position: 'absolute',
      top, left, right, bottom,
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`,
      filter: 'blur(80px)',
      opacity: 0.6,
      zIndex: 0,
      pointerEvents: 'none'
    }}
  />
);

const FeatureCard = ({ icon, title, desc, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          height: '100%',
          borderRadius: 4,
          bgcolor: 'background.paper',
          transition: 'all 0.4s ease',
          border: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: `0 20px 40px -10px ${alpha(color, 0.15)}`,
            borderColor: alpha(color, 0.3),
            '& .icon-box': {
              bgcolor: color,
              color: 'white',
              transform: 'scale(1.1) rotate(5deg)'
            },
            '& .bg-glow': {
              opacity: 1,
              transform: 'scale(1.5)'
            }
          }
        }}
      >
        <Box 
          className="bg-glow"
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 150,
            height: 150,
            borderRadius: '50%',
            bgcolor: alpha(color, 0.1),
            filter: 'blur(40px)',
            opacity: 0,
            transition: 'all 0.6s ease',
            zIndex: 0
          }}
        />
        
        <Box 
          className="icon-box"
          sx={{ 
            display: 'inline-flex', 
            p: 2, 
            borderRadius: 3, 
            bgcolor: alpha(color, 0.1), 
            color: color,
            mb: 3,
            transition: 'all 0.3s ease',
            position: 'relative',
            zIndex: 1
          }}
        >
          {icon}
        </Box>
        <Typography variant="h5" gutterBottom fontWeight="800" sx={{ position: 'relative', zIndex: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
          {desc}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <SEOHelmet {...seoConfig.pages.home} />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          pt: { xs: 16, md: 24 },
          pb: { xs: 12, md: 24 },
          bgcolor: 'background.default',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background */}
        <AnimatedBlob color={alpha(theme.palette.secondary.main, 0.2)} top="-10%" right="-10%" delay={0} />
        <AnimatedBlob color={alpha(theme.palette.primary.main, 0.15)} bottom="-10%" left="-10%" delay={5} />
        <AnimatedBlob color={alpha(theme.palette.success.main, 0.1)} top="40%" left="30%" size="30vw" delay={2} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={{ xs: 8, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Trust Badge */}
                <Box component={motion.div} variants={itemVariants} sx={{ mb: 4 }}>
                  <Box 
                    sx={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1.5,
                      px: 2.5, 
                      py: 1, 
                      bgcolor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                      borderRadius: 50,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <VerifiedUserIcon fontSize="small" color="success" />
                    <Typography variant="subtitle2" fontWeight="700" color="text.primary">
                      Trusted by 1,000+ Professionals
                    </Typography>
                  </Box>
                </Box>
                
                {/* Main Headline */}
                <Typography 
                  component={motion.h1}
                  variants={itemVariants}
                  variant="h1" 
                  color="text.primary"
                  sx={{ 
                    mb: 3,
                    fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1
                  }}
                >
                  Simplify Your <br />
                  <Box component="span" sx={{ 
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.success.main} 100%)`,
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                    filter: 'drop-shadow(0 4px 8px rgba(37,99,235,0.2))'
                  }}>
                    Tax Season
                  </Box>
                </Typography>
                
                <Typography 
                  component={motion.p}
                  variants={itemVariants}
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ mb: 5, maxWidth: 540, fontSize: '1.25rem', lineHeight: 1.7 }}
                >
                  Experience the future of tax preparation. Our certified experts combine industry knowledge with modern technology to maximize your refund—securely and efficiently.
                </Typography>
                
                {/* CTA Buttons */}
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
                     py: 2,
                     px: 5,
                     borderRadius: 50,
                     fontSize: '1.1rem',
                     background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                     boxShadow: `0 8px 25px -5px ${alpha(theme.palette.secondary.main, 0.5)}`,
                     transition: 'all 0.3s ease',
                     '&:hover': {
                       transform: 'translateY(-2px)',
                       boxShadow: `0 12px 30px -5px ${alpha(theme.palette.secondary.main, 0.6)}`,
                     }
                   }}
                 >
                   Get Started Free
                 </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    component={RouterLink}
                    to="/services"
                    sx={{ 
                      py: 2,
                      px: 5,
                      borderRadius: 50,
                      fontSize: '1.1rem',
                      bgcolor: 'white',
                      borderColor: theme.palette.divider,
                      color: theme.palette.text.primary,
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: theme.palette.text.primary,
                        bgcolor: 'white',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    View Services
                  </Button>
                </Stack>
                
                {/* Social Proof */}
                <Box component={motion.div} variants={itemVariants} sx={{ mt: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Stack direction="row" spacing={-1.5}>
                    {[
                      'https://placehold.co/100x100/1E3A8A/FFFFFF/png?text=A',
                      'https://placehold.co/100x100/10B981/FFFFFF/png?text=B',
                      'https://placehold.co/100x100/0F172A/FFFFFF/png?text=C',
                      'https://placehold.co/100x100/334155/FFFFFF/png?text=D'
                    ].map((src, i) => (
                      <Avatar 
                        key={i} 
                        src={src}
                        sx={{ 
                          width: 48, 
                          height: 48, 
                          border: `3px solid white`,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }} 
                      />
                    ))}
                  </Stack>
                  <Box>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Rating value={5} readOnly size="small" sx={{ color: theme.palette.warning.main }} />
                      <Typography variant="body2" fontWeight="700">5.0/5</Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">from 2,000+ verified clients</Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            
            {/* Hero Image */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              >
                <Box 
                  sx={{ 
                    position: 'relative',
                    perspective: '1500px',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: '20%',
                      left: '20%',
                      width: '60%',
                      height: '60%',
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.success.main} 100%)`,
                      borderRadius: '50%',
                      filter: 'blur(60px)',
                      opacity: 0.4,
                      zIndex: -1,
                      animation: 'pulse 4s infinite'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'relative',
                      borderRadius: 6,
                      overflow: 'hidden',
                      boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.2)',
                      bgcolor: 'background.paper',
                      transform: 'rotateY(-5deg) rotateX(2deg)',
                      transition: 'transform 0.5s ease',
                      border: '1px solid rgba(255,255,255,0.5)',
                      '&:hover': {
                        transform: 'rotateY(0deg) rotateX(0deg) scale(1.02)'
                      }
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        width: '100%',
                        height: 650,
                        bgcolor: '#fff',
                        p: { xs: 3, md: 5 },
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                        {/* Header */}
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4, borderBottom: '2px solid #1e293b', pb: 2 }}>
                           <Box>
                               <Typography variant="h3" fontWeight="900" sx={{ fontFamily: 'serif', color: '#1e293b' }}>1040</Typography>
                               <Typography variant="caption" sx={{ color: '#64748b' }}>Department of the Treasury</Typography>
                           </Box>
                           <Box sx={{ textAlign: 'center', display: { xs: 'none', sm: 'block' } }}>
                               <Typography variant="h6" fontWeight="bold" sx={{ color: '#1e293b', lineHeight: 1.2 }}>U.S. Individual Income Tax Return</Typography>
                               <Typography variant="body2" sx={{ color: '#64748b' }}>For the year Jan. 1-Dec. 31, 2024</Typography>
                           </Box>
                           <Box sx={{ width: 56, height: 56, borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <VerifiedUserIcon sx={{ color: '#0f172a', fontSize: 28 }} />
                           </Box>
                        </Stack>

                        {/* Content Simulation */}
                        <Stack spacing={3}>
                            <Box sx={{ p: 2.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                <Typography variant="caption" color="text.secondary" fontWeight="bold" letterSpacing={1}>FILING STATUS</Typography>
                                <Stack direction="row" spacing={3} sx={{ mt: 1.5 }}>
                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{ width: 20, height: 20, borderRadius: 0.5, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Box sx={{ width: 8, height: 8, bgcolor: 'white', borderRadius: '50%' }} />
                                        </Box>
                                        <Typography variant="body2" fontWeight="600">Single</Typography>
                                     </Box>
                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, opacity: 0.5 }}>
                                        <Box sx={{ width: 20, height: 20, border: '2px solid #cbd5e1', borderRadius: 0.5 }} />
                                        <Typography variant="body2" color="text.secondary">Married filing jointly</Typography>
                                     </Box>
                                </Stack>
                            </Box>

                            <Stack direction="row" spacing={2}>
                                 <Box sx={{ flex: 1, p: 2.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                    <Typography variant="caption" color="text.secondary" fontWeight="bold">YOUR FIRST NAME</Typography>
                                    <Typography variant="h6" fontWeight="700" sx={{ mt: 0.5, color: 'primary.main' }}>PC</Typography>
                                 </Box>
                                 <Box sx={{ flex: 1, p: 2.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                    <Typography variant="caption" color="text.secondary" fontWeight="bold">LAST NAME</Typography>
                                    <Typography variant="h6" fontWeight="700" sx={{ mt: 0.5, color: 'primary.main' }}>M</Typography>
                                 </Box>
                            </Stack>

                            <Box sx={{ height: 1, bgcolor: '#e2e8f0', my: 2 }} />
                            
                            {/* Lines */}
                            {[
                                { label: 'Wages, salaries, tips, etc.', value: '$ 85,000.00' },
                                { label: 'Taxable interest', value: '$ 240.00' },
                                { label: 'Ordinary dividends', value: '$ 1,250.00' },
                                { label: 'Capital gain or (loss)', value: '$ 3,500.00' },
                            ].map((item, i) => (
                                 <Stack key={i} direction="row" alignItems="center" spacing={2}>
                                     <Box sx={{ width: 28, height: 28, bgcolor: '#0f172a', color: 'white', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 'bold' }}>
                                        {i + 1}
                                     </Box>
                                     <Typography variant="body2" sx={{ flex: 1, color: '#334155', fontWeight: 600 }}>{item.label}</Typography>
                                     <Box sx={{ width: 140, py: 1, px: 2, bgcolor: '#f1f5f9', borderRadius: 1, textAlign: 'right', border: '1px solid transparent', '&:hover': { borderColor: '#cbd5e1', bgcolor: 'white' } }}>
                                        <Typography variant="body2" fontFamily="monospace" fontWeight="700" color="primary.main">{item.value}</Typography>
                                     </Box>
                                 </Stack>
                            ))}
                        </Stack>
                        
                        {/* Stamp */}
                        <motion.div
                            initial={{ scale: 2, opacity: 0, rotate: 10 }}
                            animate={{ scale: 1, opacity: 1, rotate: -12 }}
                            transition={{ delay: 1, type: "spring", stiffness: 200 }}
                        >
                            <Box 
                                sx={{ 
                                    position: 'absolute', 
                                    bottom: 100, 
                                    right: 50, 
                                    border: '4px solid',
                                    borderColor: 'success.main',
                                    color: 'success.main',
                                    p: 2,
                                    px: 5,
                                    borderRadius: 3,
                                    opacity: 0.9,
                                    mixBlendMode: 'multiply',
                                    boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.1)'
                                }}
                            >
                                <Typography variant="h3" fontWeight="900" sx={{ textTransform: 'uppercase', letterSpacing: 6 }}>FILED</Typography>
                            </Box>
                        </motion.div>
                    </Paper>
                    
                    {/* Floating Info Card */}
                    <Box
                      component={motion.div}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      sx={{
                        position: 'absolute',
                        bottom: 50,
                        right: 50,
                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        p: 3,
                        borderRadius: 4,
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)',
                        maxWidth: 260,
                        border: '1px solid rgba(255,255,255,0.5)'
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                        <Box sx={{ p: 1.2, bgcolor: 'success.light', borderRadius: 2, color: 'white', display: 'flex' }}>
                          <TrendingUpIcon fontSize="small" />
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="700" lineHeight={1.2}>Refund Status</Typography>
                          <Typography variant="caption" color="text.secondary">Live Update</Typography>
                        </Box>
                      </Stack>
                      <Typography variant="h3" fontWeight="800" color="success.main" sx={{ letterSpacing: '-1px' }}>
                        +$3,450
                      </Typography>
                      <Box sx={{ width: '100%', height: 4, bgcolor: 'grey.100', borderRadius: 2, mt: 2, overflow: 'hidden' }}>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, delay: 2 }}
                            style={{ width: '100%', height: '100%', background: theme.palette.success.main }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box sx={{ py: 16, bgcolor: 'background.paper', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', opacity: 0.4, backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography variant="overline" color="secondary.main" fontWeight="bold" letterSpacing={3} sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), px: 2, py: 1, borderRadius: 1 }}>
                WHY CHOOSE AFFINITY?
              </Typography>
              <Typography variant="h2" gutterBottom fontWeight="900" sx={{ mt: 3, mb: 2 }}>
                Tax Services <Box component="span" sx={{ color: 'secondary.main' }}>Reimagined</Box>
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontSize: '1.25rem' }}>
                We've redesigned the tax experience from the ground up to be faster, simpler, and more transparent.
              </Typography>
            </motion.div>
          </Box>
          
          <Grid container spacing={4}>
            {[
              {
                icon: <SecurityIcon fontSize="large" />,
                title: "Bank-Grade Security",
                desc: "Your data is protected by 256-bit encryption and secure audit trails.",
                color: theme.palette.primary.main
              },
              {
                icon: <SpeedIcon fontSize="large" />,
                title: "Lightning Fast Filing",
                desc: "Our automated systems help process your return in record time.",
                color: theme.palette.secondary.main
              },
              {
                icon: <SupportAgentIcon fontSize="large" />,
                title: "Year-Round Support",
                desc: "Questions don't stop after April 15th. Neither do we.",
                color: theme.palette.info.main
              },
              {
                icon: <AutoGraphIcon fontSize="large" />,
                title: "Maximum Refund",
                desc: "We uncover every deduction and credit you deserve.",
                color: theme.palette.success.main
              },
              {
                icon: <BoltIcon fontSize="large" />,
                title: "Instant Verification",
                desc: "Get immediate confirmation when your return is accepted.",
                color: theme.palette.warning.main
              },
              {
                icon: <EmojiEventsIcon fontSize="large" />,
                title: "Audit Protection",
                desc: "Rest easy knowing we stand behind every return we file.",
                color: '#8b5cf6'
              }
            ].map((feature, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <FeatureCard {...feature} index={idx} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 12, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <PremiumTestimonials />
        </Container>
      </Box>

      {/* Final CTA */}
      <Box sx={{ 
        position: 'relative',
        py: 16,
        overflow: 'hidden',
        bgcolor: '#0f172a'
      }}>
        {/* Animated Gradient Background */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          background: `
            radial-gradient(circle at 0% 0%, ${theme.palette.secondary.dark} 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, ${theme.palette.primary.dark} 0%, transparent 50%)
          `
        }} />
        
        <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" gutterBottom fontWeight="900" color="white" sx={{ mb: 3 }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h5" sx={{ mb: 6, color: 'grey.300', fontWeight: 400, maxWidth: 700, mx: 'auto' }}>
              Join thousands of satisfied clients who have switched to a smarter, stress-free tax filing experience.
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Button 
                variant="contained" 
                size="large" 
                component={RouterLink} 
                to="/register"
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  px: 6,
                  py: 2,
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  borderRadius: 50,
                  '&:hover': { 
                    bgcolor: 'grey.100',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(255,255,255,0.2)'
                  },
                  transition: 'all 0.2s'
                }}
              >
                Create Free Account
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                component={RouterLink} 
                to="/contact"
                sx={{ 
                  color: 'white',
                  borderColor: alpha('#fff', 0.3),
                  px: 6,
                  py: 2,
                  fontSize: '1.25rem',
                  borderRadius: 50,
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: alpha('#fff', 0.1),
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Contact Sales
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
