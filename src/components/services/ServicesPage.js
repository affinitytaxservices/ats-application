import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  CardMedia,
  Button,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DescriptionIcon from '@mui/icons-material/Description';
import SEOHelmet from '../common/SEOHelmet';
import { seoConfig } from '../../config/seo.config';

const ServiceCard = ({ title, description, icon, link, linkText, image }) => {
  const theme = useTheme();
  
  return (
    <Card 
      elevation={0}
      component={motion.div}
      whileHover={{ y: -8 }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[10],
          borderColor: 'primary.main',
          '& .service-image': {
            transform: 'scale(1.05)'
          }
        }
      }}
    >
      <Box sx={{ height: 240, overflow: 'hidden', position: 'relative' }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          className="service-image"
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            bgcolor: 'background.paper',
            p: 1.5,
            borderRadius: 2,
            boxShadow: theme.shadows[2],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.main'
          }}
        >
          {icon}
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" component="h3" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 0 }}>
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
          sx={{ fontWeight: 600, borderRadius: 50, px: 2 }}
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
      linkText: 'Learn More',
      image: 'https://placehold.co/800x600/1E3A8A/FFFFFF/png?text=Individual+Tax'
    },
    {
      title: 'Business Tax Services',
      description: 'Comprehensive tax solutions for corporations, partnerships, and LLCs. We help you stay compliant while optimizing your tax position.',
      icon: <BusinessIcon fontSize="large" />,
      link: '/business-tax',
      linkText: 'Explore Business Solutions',
      image: 'https://placehold.co/800x600/10B981/FFFFFF/png?text=Business+Tax'
    },
    {
      title: 'Tax Planning & Strategy',
      description: 'Proactive tax planning to minimize your liability. We work with you year-round to develop strategies that save you money.',
      icon: <TrendingUpIcon fontSize="large" />,
      link: '/tax-planning',
      linkText: 'View Planning Services',
      image: 'https://placehold.co/800x600/0F172A/FFFFFF/png?text=Tax+Planning'
    },
    {
      title: 'Tax Information & Resources',
      description: 'Stay informed with the latest tax updates, deadlines, and helpful resources to guide your financial decisions.',
      icon: <DescriptionIcon fontSize="large" />,
      link: '/tax-information',
      linkText: 'Access Resources',
      image: 'https://placehold.co/800x600/334155/FFFFFF/png?text=Tax+Resources'
    }
  ];

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <SEOHelmet {...seo} />
      
      {/* Header Section */}
      <Box 
        sx={{ 
          bgcolor: 'background.default', 
          pt: { xs: 16, md: 20 },
          pb: { xs: 12, md: 16 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="overline" color="primary" fontWeight="bold" letterSpacing={1.5}>
              OUR EXPERTISE
            </Typography>
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="800" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 3
              }}
            >
              Professional Tax Services
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}>
              Tailored solutions for your unique financial needs. From personal filings to complex business strategies, we've got you covered.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ pb: 16 }}>
        <Grid container spacing={4}>
          {servicesList.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
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
