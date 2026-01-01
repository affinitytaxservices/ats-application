import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DescriptionIcon from '@mui/icons-material/Description';
import SEOHelmet from '../common/SEOHelmet';
import { seoConfig } from '../../config/seo.config';

const ServiceCard = ({ title, description, icon, link, linkText }) => {
  const theme = useTheme();
  
  return (
    <Card 
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[4],
          borderColor: 'primary.main',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 4 }}>
        <Box 
          sx={{ 
            display: 'inline-flex', 
            p: 2, 
            borderRadius: 3, 
            bgcolor: alpha(theme.palette.primary.main, 0.1), 
            color: 'primary.main',
            mb: 3
          }}
        >
          {icon}
        </Box>
        <Typography variant="h5" gutterBottom fontWeight="bold" component="h3">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 4, pt: 0 }}>
        <Button 
          component={RouterLink} 
          to={link}
          endIcon={<ArrowForwardIcon />}
          variant="text"
          color="primary"
          sx={{ fontWeight: 600 }}
        >
          {linkText}
        </Button>
      </CardActions>
    </Card>
  );
};

const ServicesPage = () => {
  const seo = seoConfig.pages.services || {
    title: 'Our Services | Affinity Tax Services',
    description: 'Explore our comprehensive tax services including individual tax preparation, business tax solutions, and strategic tax planning.',
    keywords: 'tax services, individual tax, business tax, tax planning, accounting services',
    canonical: '/services'
  };

  const servicesList = [
    {
      title: 'Individual Tax Services',
      description: 'Maximize your refund with our expert personal tax preparation services. We handle everything from simple returns to complex financial situations.',
      icon: <PersonIcon fontSize="large" />,
      link: '/individual-tax',
      linkText: 'Learn More'
    },
    {
      title: 'Business Tax Services',
      description: 'Comprehensive tax solutions for corporations, partnerships, and LLCs. We help you stay compliant while optimizing your tax position.',
      icon: <BusinessIcon fontSize="large" />,
      link: '/business-tax',
      linkText: 'Explore Business Solutions'
    },
    {
      title: 'Tax Planning & Strategy',
      description: 'Proactive tax planning to minimize your liability. We work with you year-round to develop strategies that save you money.',
      icon: <TrendingUpIcon fontSize="large" />,
      link: '/tax-planning',
      linkText: 'View Planning Services'
    },
    {
      title: 'Tax Information & Resources',
      description: 'Stay informed with the latest tax updates, deadlines, and helpful resources to guide your financial decisions.',
      icon: <DescriptionIcon fontSize="large" />,
      link: '/tax-information',
      linkText: 'Access Resources'
    }
  ];

  return (
    <Box>
      <SEOHelmet {...seo} />
      
      {/* Header Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(45deg, #60A5FA 30%, #34D399 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            Our Services
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800, color: 'grey.300' }}>
            Professional tax solutions tailored to your unique needs. From personal filings to complex business strategies, we've got you covered.
          </Typography>
        </Container>
        
        {/* Background decorative elements */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: -100, 
            right: -100, 
            width: 400, 
            height: 400, 
            borderRadius: '50%', 
            bgcolor: 'rgba(255,255,255,0.1)' 
          }} 
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: -50, 
            left: -50, 
            width: 200, 
            height: 200, 
            borderRadius: '50%', 
            bgcolor: 'rgba(255,255,255,0.1)' 
          }} 
        />
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {servicesList.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <ServiceCard {...service} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'background.default', py: 10 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Ready to get started?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Schedule a consultation with our tax experts today and take control of your financial future.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            component={RouterLink} 
            to="/contact"
            sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}
          >
            Contact Us
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default ServicesPage;
