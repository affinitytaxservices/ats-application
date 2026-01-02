import React from 'react';
import SEOHelmet from '../common/SEOHelmet';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckCircle as CheckCircleIcon,
  Work as WorkIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Styled components
const StyledCard = styled(Card)(() => ({
  height: '100%',
  background: '#FFFFFF',
  border: 'none',
  transition: 'all 0.3s ease',
  '&:hover': 
  {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(80, 134, 219, 0.15)',
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 64,
  height: 64,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)',
  marginBottom: theme.spacing(2),
  '& svg': {
    color: '#ffffff',
    fontSize: 32,
  }
}));

const benefits = [
  {
    title: 'Professional Growth',
    description: 'Continuous learning opportunities, mentorship, and support for professional certifications (EA, CPA).',
    icon: <TrendingUpIcon />
  },
  {
    title: 'Great Culture',
    description: 'A collaborative, inclusive environment where your voice is heard and your contributions are valued.',
    icon: <GroupIcon />
  },
  {
    title: 'Work-Life Balance',
    description: 'Flexible scheduling options and remote work opportunities to help you balance career and life.',
    icon: <WorkIcon />
  }
];

const openings = [
  {
    title: 'Client Support Specialist',
    type: 'Full-time',
    location: 'Remote',
    description: 'Help our clients navigate their tax journey with empathy and expertise. Excellent communication skills required.',
    requirements: ['1+ years customer service experience', 'Basic understanding of tax processes', 'Excellent written and verbal communication']
  }
];

const Careers = () => {
  return (
    <>
      <SEOHelmet
        title="Careers | Affinity Tax Services"
        description="Join the Affinity Tax Services team. Explore career opportunities and grow with a leading tax preparation firm."
        keywords="tax careers, accounting jobs, tax preparer jobs, CPA careers, finance jobs"
        canonical="https://affinitytaxservices.com/careers"
      />
      <Box sx={{ 
        minHeight: '100vh', 
        pt: { xs: 12, md: 16 },
        pb: 8
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          
          {/* Header */}
          <Fade in timeout={1000}>
            <Box textAlign="center" mb={10}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: '#1E293B',
                  mb: 3,
                }}
              >
                Build Your Career with <Box component="span" sx={{ color: '#2563EB' }}>Affinity Tax</Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#475569',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Join a team of dedicated professionals passionate about helping clients achieve financial success.
              </Typography>
            </Box>
          </Fade>

          {/* Benefits Section */}
          <Fade in timeout={1200}>
            <Box mb={12}>
              <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1E3A8A', mb: 6 }}>
                Why Join Us?
              </Typography>
              <Grid container spacing={4}>
                {benefits.map((benefit, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <StyledCard>
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <IconWrapper sx={{ mx: 'auto' }}>
                          {benefit.icon}
                        </IconWrapper>
                        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1E3A8A' }}>
                          {benefit.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.6 }}>
                          {benefit.description}
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>

          {/* Openings Section */}
          <Fade in timeout={1400}>
            <Box>
              <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1E3A8A', mb: 6 }}>
                Current Openings
              </Typography>
              <Grid container spacing={4}>
                {openings.map((job, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <StyledCard>
                      <CardContent sx={{ p: 4 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: '#1E3A8A' }}>
                            {job.title}
                          </Typography>
                          <Box sx={{ bgcolor: '#E0F2FE', color: '#0284C7', px: 2, py: 0.5, borderRadius: 2, fontSize: '0.875rem', fontWeight: 'bold' }}>
                            {job.type}
                          </Box>
                        </Box>
                        <Typography variant="subtitle2" sx={{ color: '#64748B', mb: 2, display: 'flex', alignItems: 'center' }}>
                          <WorkIcon sx={{ fontSize: 18, mr: 1 }} /> {job.location}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>
                          {job.description}
                        </Typography>
                        <Box mb={3}>
                          {job.requirements.map((req, i) => (
                            <Box key={i} display="flex" alignItems="center" mb={1}>
                              <CheckCircleIcon sx={{ color: '#10B981', fontSize: 18, mr: 1 }} />
                              <Typography variant="body2" sx={{ color: '#475569' }}>{req}</Typography>
                            </Box>
                          ))}
                        </Box>
                        <Button 
                          component={RouterLink} 
                          to="/contact" 
                          variant="outlined" 
                          fullWidth
                          endIcon={<ArrowForwardIcon />}
                          sx={{ 
                            mt: 2,
                            borderColor: '#2563EB',
                            color: '#2563EB',
                            '&:hover': {
                              borderColor: '#1D4ED8',
                              bgcolor: 'rgba(37, 99, 235, 0.04)'
                            }
                          }}
                        >
                          Apply Now
                        </Button>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
              
              <Box textAlign="center" mt={8}>
                <Typography variant="h6" sx={{ color: '#475569', mb: 2 }}>
                  Don't see the right fit?
                </Typography>
                <Button 
                  component={RouterLink} 
                  to="/contact" 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: '#2563EB',
                    '&:hover': { bgcolor: '#1D4ED8' }
                  }}
                >
                  Contact Us Anyway
                </Button>
              </Box>
            </Box>
          </Fade>

        </Container>
      </Box>
    </>
  );
};

export default Careers;
