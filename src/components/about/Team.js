import React from 'react';
import SEOHelmet from '../common/SEOHelmet';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Fade, Divider } from '@mui/material';
import {
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

const Team = () => {
  return (
    <>
      <SEOHelmet
        title="Our Team | Affinity Tax Services"
        description="Meet the expert team at Affinity Tax Services. Our experienced professionals are dedicated to your financial success."
        keywords="tax professionals, tax team, CPA, tax consultants"
        canonical="https://affinitytaxservices.com/team"
      />
      <Box sx={{ 
        minHeight: '100vh', 
        pt: { xs: 12, md: 16 },
        pb: 8
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
                Meet Our <Box component="span" sx={{ color: '#2563EB' }}>Expert Team</Box>
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
                Our experienced professionals are dedicated to navigating the complexities of the U.S. tax system for you.
              </Typography>
            </Box>
          </Fade>

          <Fade in timeout={1200}>
            <Grid container spacing={4}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <StyledCard>
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          mx: 'auto',
                          mb: 3,
                          background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)',
                          fontSize: '2.5rem',
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
          </Fade>
        </Container>
      </Box>
    </>
  );
};

export default Team;
