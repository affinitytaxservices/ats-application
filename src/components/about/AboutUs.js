import React from 'react';
import SEOHelmet from '../common/SEOHelmet';
import { seoConfig } from '../../config/seo.config';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Fade, Divider } from '@mui/material';
import {
  Business as BusinessIcon,
  School as SchoolIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledCard = styled(Card)(() => ({
  height: '100%',
  background: '#FFFFFF', // Solid white background
  backdropFilter: 'none',
  border: 'none', // Clean borderless look
  transition: 'all 0.3s ease',
  '&:hover': 
  {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(80, 134, 219, 0.15)',
    background: '#FFFFFF',
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
  },
];

const teamMembers = [
  {
    name: 'Krishna EA',
    role: 'Managing Partner',
    experience: '8+ years in tax preparation and business consulting',
    specialties: ['Business Tax Strategy', 'Tax Planning', 'IRS Representation'],
  },
  {
    name: 'Arjun EA',
    role: 'Senior Tax Consultant',
    experience: '4+ years in individual and corporate taxation',
    specialties: ['Business Tax Returns', 'Individual Tax Returns', 'Tax-Exempt Organizations', 'Estate & Trust Returns'],
  },
  {
    name: 'Achyut EA',
    role: 'Tax Planning Specialist',
    experience: '4+ years in strategic tax planning',      
    specialties: ['Individual Tax Returns', 'Tax-Exempt Organizations', 'Estate & Trust Returns'],
  },
];

const AboutUs = () => {
  const { about: seo } = seoConfig.pages;

  return (
    <>
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        image={seo.ogImage}
        structuredData={seo.structuredData}
      />
    <Box sx={{ 
      minHeight: '100vh', 
    }}>

      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Fade in timeout={1000}>
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#1E293B', // Dark Slate
                mb: 3,
              }}
            >
              About <Box component="span" sx={{ color: '#2563EB' }}>Affinity Tax Services</Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#475569', // Slate 600
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Your trusted partner in navigating the complexities of the U.S. tax system with integrity, expertise, and commitment to your financial success.
            </Typography>
          </Box>
        </Fade>

        {/* Mission & Vision Section */}
        <Fade in timeout={1200}>
          <Grid container spacing={4} mb={8}>
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <IconWrapper>
                      <BusinessIcon />
                    </IconWrapper>
                    <Typography variant="h4" component="h2" sx={{ ml: 2, fontWeight: 'bold', color: '#1E3A8A' }}>
                      Our Mission
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#475569' }}>
                    To deliver personalized, accurate, and timely tax solutions that empower individuals and businesses to thrive financially. We are committed to building long-lasting relationships with our clients, ensuring they feel supported and informed every step of the way.
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <IconWrapper>
                      <TrendingUpIcon />
                    </IconWrapper>
                    <Typography variant="h4" component="h2" sx={{ ml: 2, fontWeight: 'bold', color: '#1E3A8A' }}>
                      Our Vision
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#475569' }}>
                    To be the leading tax consultancy recognized for our integrity, expertise, and commitment to our clients' financial success. We strive to set the standard in the industry by continuously improving our services and adopting the latest technologies.
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Fade>

        {/* Values Section */}
        <Fade in timeout={1400}>
          <Box mb={8}>
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#1E3A8A',
                mb: 6,
                textShadow: 'none',
              }}
            >
              Our Core Values
            </Typography>
            <Grid container spacing={4}>
              {values.map((value, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <StyledCard>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <IconWrapper sx={{ mx: 'auto' }}>
                        {value.icon}
                      </IconWrapper>
                      <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1E3A8A' }}>
                        {value.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                        {value.description}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Team Section */}
        <Fade in timeout={1600}>
          <Box>
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#1E3A8A',
                mb: 6,
                textShadow: 'none',
              }}
            >
              Meet Our Expert Team
            </Typography>
            <Grid container spacing={4}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <StyledCard>
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          mx: 'auto',
                          mb: 3,
                          background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)',
                          fontSize: '2rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1E3A8A' }}>
                        {member.name}
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#10B981', mb: 2, fontWeight: 'medium' }}>
                        {member.role}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>
                        {member.experience}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Typography variant="subtitle2" sx={{ color: '#1E3A8A', fontWeight: 'bold', mb: 1 }}>
                        Specialties:
                      </Typography>
                      {member.specialties.map((specialty, idx) => (
                        <Box key={idx} display="flex" alignItems="center" justifyContent="center" mb={0.5}>
                          <CheckCircleIcon sx={{ color: '#10B981', fontSize: 16, mr: 1 }} />
                          <Typography variant="body2" sx={{ color: '#475569' }}>
                            {specialty}
                          </Typography>
                        </Box>
                      ))}
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
    </>
  );
};

export default AboutUs;