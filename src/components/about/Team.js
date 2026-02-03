import React, { useState } from 'react';
import SEOHelmet from '../common/SEOHelmet';
import { Box, Container, Typography, Card, Avatar, Fade, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
    experience: '10+ years in tax preparation and overall consulting',
    specialties: ['Tax Strategy', 'Tax Planning', 'IRS Representation'],
  },
  {
    name: 'Arjun EA',
    role: 'Senior Tax Analyst',
    experience: '7+ years in individual and corporate taxation',
    specialties: ['Business and Individual Tax Returns', 'Comprehensive Tax Services for Exempt Organizations', 'Estate and Trust Return Preparation'],
  },
  {
    name: 'Achyut EA',
    role: 'Senior Tax Analyst',
    experience: '7+ years in strategic tax planning',      
    specialties: ['Business and Individual Tax Returns', 'Comprehensive Tax Services for Exempt Organizations', 'Estate and Trust Return Preparation'],
  },
];

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(teamMembers[0].name);

  const handleMemberChange = (event) => {
    setSelectedMember(event.target.value);
  };

  return (
    <>
      <SEOHelmet
        title="Our Team | Affinity Tax Services"
        description="Meet the expert team at Affinity Tax Services. Our experienced professionals are dedicated to your financial success."
        keywords="tax professionals, tax team, CPA, tax consultants"
        canonical="https://affinitytaxservices.com/team"
      />
      <Box 
        className="team-page-background"
        sx={{ 
          pt: { xs: 12, md: 16 },
          pb: 8
        }}
      >
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
            <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
              <Box sx={{ maxWidth: 300, mx: 'auto', mb: 4 }}>
                <FormControl fullWidth>
                  <InputLabel id="team-member-select-label">Select Team Member</InputLabel>
                  <Select
                    labelId="team-member-select-label"
                    value={selectedMember}
                    label="Select Team Member"
                    onChange={handleMemberChange}
                    sx={{ bgcolor: 'white' }}
                  >
                    {teamMembers.map((member) => (
                      <MenuItem key={member.name} value={member.name}>
                        {member.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {teamMembers
                .filter(member => member.name === selectedMember)
                .map((member, index) => (
                <StyledCard key={index} sx={{ mb: 3, p: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    gap: 4
                  }}>
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    
                    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: '#0F172A' }}>
                          {member.name}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#334155', fontWeight: 'medium' }}>
                          {member.role}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body1" sx={{ color: '#475569', mb: 2 }}>
                        {member.experience}
                      </Typography>

                      <Box>
                        <Typography variant="subtitle2" sx={{ color: '#0F172A', fontWeight: 'bold', mb: 1 }}>
                          Specialties:
                        </Typography>
                        <Box component="ul" sx={{ 
                          m: 0, 
                          p: 0, 
                          pl: { xs: 0, md: 2 }, 
                          listStyle: 'none' 
                        }}>
                          {member.specialties.map((specialty, idx) => (
                            <Box 
                              component="li" 
                              key={idx} 
                              display="flex" 
                              alignItems="center" 
                              justifyContent={{ xs: 'center', md: 'flex-start' }}
                              mb={0.5}
                            >
                              <CheckCircleIcon sx={{ color: '#0F172A', fontSize: 18, mr: 1 }} />
                              <Typography variant="body2" sx={{ color: '#475569' }}>
                                {specialty}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </StyledCard>
              ))}
            </Box>
          </Fade>
        </Container>
      </Box>
    </>
  );
};

export default Team;
