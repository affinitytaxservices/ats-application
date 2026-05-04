import React from 'react';
import SEOHelmet from '../common/SEOHelmet';
import { seoConfig } from '../../config/seo.config';
import { Box, Container, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import {
  Business as BusinessIcon,
  School as SchoolIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

// Styled components
const StyledCard = styled(motion(Card))(({ theme }) => ({
  height: '100%',
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    borderColor: theme.palette.secondary.light,
    boxShadow: theme.shadows[4],
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 72,
  height: 72,
  borderRadius: '24px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  marginBottom: theme.spacing(3),
  boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)',
  transition: 'transform 0.3s ease',
  '& svg': {
    color: '#ffffff',
    fontSize: 36,
  },
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
  }
}));

const values = [
  {
    title: 'Integrity',
    description: 'We maintain the highest ethical standards in all our professional dealings and client relationships.',
    icon: <SecurityIcon />,
  },
  {
    title: 'Excellence',
    description: 'We strive for excellence in every service we provide, continuously improving our expertise and processes.',
    icon: <TrendingUpIcon />,
  },
  {
    title: 'Client Focus',
    description: 'Our clients are at the center of everything we do. We build lasting relationships based on trust and results.',
    icon: <PeopleIcon />,
  },
  {
    title: 'Expertise',
    description: 'Our team stays current with the latest tax laws and regulations to provide accurate, effective strategies.',
    icon: <SchoolIcon />,
  }
];

const AboutUs = () => {
  const { about: seo } = seoConfig.pages;
  const theme = useTheme();

  return (
    <>
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        image={seo.image}
        structuredData={seo.structuredData}
      />
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: 'background.default',
        overflow: 'hidden',
        pt: { xs: 4, md: 8 },
        pb: { xs: 8, md: 12 }
      }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            textAlign="center" 
            mb={{ xs: 8, md: 12 }}
          >
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                color: 'text.primary',
                mb: 3,
                letterSpacing: '-0.02em',
              }}
            >
              About <Box component="span" sx={{ 
                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Affinity Tax Services</Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Your trusted partner in navigating the complexities of the U.S. tax system with integrity, expertise, and commitment to your financial success.
            </Typography>
          </Box>

          {/* Mission & Vision Section */}
          <Grid container spacing={4} mb={{ xs: 8, md: 12 }}>
            {[
              { 
                title: 'Our Mission', 
                icon: <BusinessIcon />, 
                text: 'To deliver personalized, accurate, and timely tax solutions that empower individuals and businesses to thrive financially. We are committed to building long-lasting relationships with our clients, ensuring they feel supported and informed every step of the way.' 
              },
              { 
                title: 'Our Vision', 
                icon: <TrendingUpIcon />, 
                text: 'To be the leading tax consultancy recognized for our integrity, expertise, and commitment to our clients\' financial success. We strive to set the standard in the industry by continuously improving our services and adopting the latest technologies.' 
              }
            ].map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <StyledCard sx={{ height: '100%', p: 2 }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box display="flex" alignItems="center" mb={3}>
                        <IconWrapper sx={{ width: 64, height: 64, mb: 0, mr: 3 }}>
                          {item.icon}
                        </IconWrapper>
                        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {item.title}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
                        {item.text}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Values Section */}
          <Box mb={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h3"
                component="h2"
                textAlign="center"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  mb: 6,
                  letterSpacing: '-0.01em',
                }}
              >
                Our Core Values
              </Typography>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Grid container spacing={4}>
                {values.map((value, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <motion.div variants={itemVariants} style={{ height: '100%' }}>
                      <StyledCard 
                        whileHover={{ y: -8 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CardContent sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                          <IconWrapper>
                            {value.icon}
                          </IconWrapper>
                          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                            {value.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                            {value.description}
                          </Typography>
                        </CardContent>
                      </StyledCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AboutUs;
