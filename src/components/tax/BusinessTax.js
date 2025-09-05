import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Fade,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Business as BusinessIcon,
  Assessment as AssessmentIcon,
  AccountBalance as AccountBalanceIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

// Styled components
const StyledCard = styled(Card)(() => ({
  height: '100%',
  background: 'rgba(248, 250, 252, 0.95)', // Light gray background
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(226, 232, 240, 0.8)', // Light border
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)', // Blue shadow on hover
    background: 'rgba(241, 245, 249, 0.98)', // Slightly darker light background on hover
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)',
  marginRight: theme.spacing(2),
  '& svg': {
    color: '#ffffff',
    fontSize: 24,
  }
}));

const services = [
  {
    title: 'Business Tax Returns',
    description: 'Comprehensive preparation of business tax returns for all entity types',
    icon: <BusinessIcon />,
  },
  {
    title: 'Tax Planning & Strategy',
    description: 'Strategic tax planning to minimize liability and maximize deductions',
    icon: <AssessmentIcon />,
  },
  {
    title: 'Business Tax Compliance',
    description: 'Ensure compliance with tax laws and regulations',
    icon: <AccountBalanceIcon />,
  },
];

const benefits = [
  'Expert handling of complex business tax situations',
  'Strategic tax planning for business growth',
  'Quarterly tax payment guidance',
  'Business deduction optimization',
  'Industry-specific tax expertise',
  'Complete audit support and representation',
];

function BusinessTax() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 6 }}>
        <Fade in timeout={800}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              textAlign: 'center',
              mb: 6,
              background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}
          >
            Business Tax Services
          </Typography>
        </Fade>

        {/* Services Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <IconWrapper>
                        {service.icon}
                      </IconWrapper>
                      <Typography variant="h6" sx={{ color: '#1E293B' }}>
                        {service.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#475569', mb: 3 }}>
                      {service.description}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Benefits Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              mb: 4,
              color: '#1E293B'
            }}
          >
            Why Choose Our Business Tax Services?
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <List>
                    {benefits.map((benefit, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: '#10B981' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={benefit}
                          sx={{ '& .MuiListItemText-primary': { color: '#1E293B' } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="h5" gutterBottom sx={{ color: '#1E293B', mb: 3 }}>
                    Ready to Optimize Your Business Taxes?
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#475569', mb: 4 }}>
                    Let our experts help you navigate complex business tax requirements and maximize your savings.
                  </Typography>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/contacts"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)',
                      color: '#ffffff',
                      padding: '12px 24px',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #10B981 0%, #1E3A8A 100%)',
                      }
                    }}
                  >
                    Contact Us Today
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default BusinessTax;