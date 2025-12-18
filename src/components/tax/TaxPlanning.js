import React, { useState } from 'react';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  ArrowForward as ArrowForwardIcon,
  ExpandMore as ExpandMoreIcon,
  Security as SecurityIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import SEOHelmet from '../common/SEOHelmet';
import { seoConfig } from '../../config/seo.config';

// Styled components
const StyledCard = styled(Card)(() => ({
  height: '100%',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)',
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

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'rgba(248, 250, 252, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  marginBottom: theme.spacing(2),
  '&:before': {
    display: 'none',
  },
  '&:hover': {
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.1)',
  }
}));

const services = [
  {
    title: 'Strategic Tax Planning',
    description: 'Year-round tax planning to minimize liability and maximize savings through strategic decisions',
    icon: <TrendingUpIcon />,
    features: ['Annual tax projections', 'Quarterly planning sessions', 'Investment timing strategies', 'Retirement planning optimization']
  },
  {
    title: 'Business Tax Strategy',
    description: 'Comprehensive business tax planning for growth, compliance, and profit optimization',
    icon: <BusinessIcon />,
    features: ['Entity structure optimization', 'Expense planning', 'Cash flow management', 'Growth strategy alignment']
  },
  {
    title: 'Estate & Succession Planning',
    description: 'Advanced planning for wealth transfer and estate tax minimization strategies',
    icon: <SecurityIcon />,
    features: ['Estate tax planning', 'Succession strategies', 'Trust optimization', 'Gift tax planning']
  },
];

const planningStrategies = [
  {
    category: 'Individual Tax Planning',
    strategies: [
      'Income timing and deferral strategies',
      'Retirement account optimization (401k, IRA, Roth conversions)',
      'Tax-efficient investment strategies',
      'Charitable giving optimization',
      'Education funding strategies (529 plans, Coverdell ESAs)',
      'Health Savings Account (HSA) maximization'
    ]
  },
  {
    category: 'Business Tax Planning',
    strategies: [
      'Business entity selection and optimization',
      'Equipment and asset purchase timing',
      'Employee benefit planning',
      'Research and development credit optimization',
      'Section 199A deduction maximization',
      'International tax planning for global businesses'
    ]
  },
  {
    category: 'Advanced Strategies',
    strategies: [
      'Multi-generational wealth transfer planning',
      'Tax-efficient business succession planning',
      'Real estate investment optimization',
      'Alternative minimum tax (AMT) planning',
      'State tax planning and residency strategies',
      'Audit defense and representation'
    ]
  }
];

const benefits = [
  'Reduce overall tax liability through strategic planning',
  'Maximize deductions and credits available to you',
  'Optimize timing of income and expenses',
  'Plan for major life events and their tax implications',
  'Ensure compliance with complex tax regulations',
  'Receive ongoing support and quarterly reviews',
  'Access to advanced tax strategies and opportunities',
  'Peace of mind with professional tax guidance'
];

const TaxPlanning = () => {
  const { taxPlanning: seo } = seoConfig.pages;
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    planningType: '',
    message: ''
  });

  const handleConsultationOpen = () => {
    setConsultationOpen(true);
  };

  const handleConsultationClose = () => {
    setConsultationOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Consultation request:', formData);
    setConsultationOpen(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      planningType: '',
      message: ''
    });
  };

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
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)' }}>
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
              Tax Planning & Strategy
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                mb: 4
              }}
            >
              Strategic tax planning to minimize your liability, maximize your savings, and optimize your financial future through expert guidance and proven strategies.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleConsultationOpen}
              startIcon={<CalendarIcon />}
              sx={{
                background: 'linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)',
                color: '#ffffff',
                px: 4,
                py: 2,
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                '&:hover': {
                  boxShadow: '0 12px 35px rgba(16, 185, 129, 0.4)',
                }
              }}
            >
              Schedule Free Consultation
            </Button>
          </Box>
        </Fade>

        {/* Services Section */}
        <Fade in timeout={1200}>
          <Box mb={8}>
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#ffffff',
                mb: 6,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Our Tax Planning Services
            </Typography>
            <Grid container spacing={4}>
              {services.map((service, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <StyledCard>
                    <CardContent sx={{ p: 4 }}>
                      <Box display="flex" alignItems="center" mb={3}>
                        <IconWrapper>
                          {service.icon}
                        </IconWrapper>
                        <Box ml={2}>
                          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: '#1E3A8A', mb: 1 }}>
                            {service.title}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>
                        {service.description}
                      </Typography>
                      <List dense>
                        {service.features.map((feature, idx) => (
                          <ListItem key={idx} sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature} 
                              sx={{ 
                                '& .MuiListItemText-primary': { 
                                  fontSize: '0.95rem',
                                  color: '#475569'
                                }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Planning Strategies Section */}
        <Fade in timeout={1400}>
          <Box mb={8}>
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#ffffff',
                mb: 6,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Tax Planning Strategies
            </Typography>
            {planningStrategies.map((category, index) => (
              <StyledAccordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      alignItems: 'center'
                    }
                  }}
                >
                  <AssessmentIcon sx={{ color: '#1E3A8A', mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1E3A8A' }}>
                    {category.category}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {category.strategies.map((strategy, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Box display="flex" alignItems="center" mb={1}>
                          <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20, mr: 1 }} />
                          <Typography variant="body2" sx={{ color: '#475569' }}>
                            {strategy}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </Box>
        </Fade>

        {/* Benefits Section */}
        <Fade in timeout={1600}>
          <Box mb={8}>
            <StyledCard>
              <CardContent sx={{ p: 6 }}>
                <Typography
                  variant="h3"
                  component="h2"
                  textAlign="center"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: '#1E3A8A',
                    mb: 4,
                  }}
                >
                  Benefits of Professional Tax Planning
                </Typography>
                <Grid container spacing={3}>
                  {benefits.map((benefit, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box display="flex" alignItems="flex-start">
                        <CheckCircleIcon sx={{ color: '#10B981', fontSize: 24, mr: 2, mt: 0.5 }} />
                        <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.6 }}>
                          {benefit}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Box textAlign="center" mt={4}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleConsultationOpen}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)',
                      color: '#ffffff',
                      px: 4,
                      py: 2,
                      borderRadius: '12px',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      boxShadow: '0 8px 25px rgba(30, 58, 138, 0.3)',
                      '&:hover': {
                        boxShadow: '0 12px 35px rgba(30, 58, 138, 0.4)',
                      }
                    }}
                  >
                    Get Started Today
                  </Button>
                </Box>
              </CardContent>
            </StyledCard>
          </Box>
        </Fade>
      </Container>

      {/* Consultation Dialog */}
      <Dialog open={consultationOpen} onClose={handleConsultationClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', pb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1E3A8A' }}>
            Schedule Your Free Tax Planning Consultation
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569', mt: 1 }}>
            Our team will contact you within 30 minutes during business hours (Mon-Fri, 10am-6pm)
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Planning Type"
                name="planningType"
                value={formData.planningType}
                onChange={handleInputChange}
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select Planning Type</option>
                <option value="individual">Individual Tax Planning</option>
                <option value="business">Business Tax Strategy</option>
                <option value="estate">Estate & Succession Planning</option>
                <option value="comprehensive">Comprehensive Planning</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tell us about your tax planning needs"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                variant="outlined"
                multiline
                rows={4}
                placeholder="Describe your current situation, goals, and any specific tax challenges you're facing..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
          <Button onClick={handleConsultationClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)',
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              fontWeight: 600,
              textTransform: 'none'
            }}
          >
            Schedule Consultation
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </>
  );
};

export default TaxPlanning;