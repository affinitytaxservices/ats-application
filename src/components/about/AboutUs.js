import React from 'react';
import SEOHelmet from '../common/SEOHelmet';
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
  background: 'rgba(248, 250, 252, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  transition: 'all 0.3s ease',
  '&:hover': 
  {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(80, 134, 219, 0.15)',
    background: 'rgba(241, 245, 249, 0.98)',
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
    name: 'Teja Reddy EA',
    role: 'Managing Partner',
    experience: 'X years in tax preparation and business consulting',
    specialties: ['Business Tax Strategy', 'Tax Planning', 'IRS Representation'],
  },
  {
    name: 'Arvind Reddy EA',
    role: 'Senior Tax Consultant',
    experience: 'X years in individual and corporate taxation',
    specialties: ['Individual Tax Returns', 'Tax Compliance'],
  },
  {
    name: 'Sri Nithya EA',
    role: 'Tax Planning Specialist',
    experience: 'X years in strategic tax planning',      
    specialties: ['Estate Planning', 'Business Formation', 'Tax Optimization'],
  },
];

const AboutUs = () => {
  return (
    <>
      <SEOHelmet
        title="About Affinity Tax Services - Trusted Tax Professionals Since 2010"
        description="Learn about Affinity Tax Services' mission, vision, and expert team. Trusted tax professionals providing comprehensive tax solutions with integrity and excellence since 2010."
        keywords="about affinity tax services, tax professionals, certified tax preparers, tax consultants, tax experts, trusted tax company, tax service history, experienced tax team"
        canonical="/about"
        image="/og-about.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Affinity Tax Services',
          url: 'https://www.affinitytaxservices.com/about',
          description: 'Learn about Affinity Tax Services mission, vision, and expert team of certified tax professionals.',
          mainEntity: {
            '@type': 'ProfessionalService',
            name: 'Affinity Tax Services',
            description: 'Trusted tax professionals providing comprehensive tax solutions with integrity and excellence since 2010.',
            foundingDate: '2010',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Tax Street, Suite 456',
              addressLocality: 'Financial District',
              addressRegion: 'NY',
              postalCode: '10001',
              addressCountry: 'US'
            },
            telephone: '+1-234-567-8900',
            email: 'info@affinitytaxservices.com',
            areaServed: 'United States',
            serviceType: ['Tax Preparation', 'Tax Planning', 'Business Tax Services', 'Individual Tax Services', 'Tax Consultation', 'Estate Planning']
          }
        }}
      />
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'rgba(248, 250, 252, 0.95)',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)',
        zIndex: -1
      }
    }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Header Section */}
        <Fade in timeout={1000}>
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#ffffff',
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              About <Box component="span" sx={{ color: '#3B82F6' }}>Affinity Tax Services</Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
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