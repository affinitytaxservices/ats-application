import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Paper,
  Alert,
  Snackbar,
  IconButton,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { fadeIn, slideUp } from '../../styles/animations';
import SEOHelmet from '../common/SEOHelmet';
import { seoConfig } from '../../config/seo.config';

function Contacts() {
  const theme = useTheme();
  // Use isMobile for responsive design adjustments
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Apply mobile-specific styles based on screen size
  const contactFormWidth = isMobile ? '100%' : '80%';
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        // TODO: Add actual API call to send message
        console.log('Form submitted:', formData);
        setSnackbarOpen(true);
        setIsSubmitting(false);
        setFormSubmitted(true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1500);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  const { contact: seo } = seoConfig.pages;

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
        background: 'linear-gradient(180deg, rgba(241,245,249,0.8) 0%, rgba(248,250,252,1) 100%)',
        py: 8,
        minHeight: '100vh'
      }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          textAlign: 'center', 
          mb: 6,
          animation: `${fadeIn} 0.8s ease-out`
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 800, 
              color: 'text.heading',
              animation: `${slideUp} 0.6s ease-out`,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              backgroundImage: 'linear-gradient(90deg, #1E3A8A 0%, #10B981 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}
          >
            Get In Touch
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '700px', 
              mx: 'auto', 
              mb: 5,
              fontSize: { xs: '1rem', md: '1.25rem' },
              animation: `${slideUp} 0.8s ease-out`
            }}
          >
            We're here to help with all your tax-related questions and concerns. Our team of experts is ready to assist you.
          </Typography>
          
          <Box
            sx={{
              position: 'relative',
              height: { xs: '200px', md: '300px' },
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              mb: 6,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <Box
              component="img"
              src="/images/office-background.jpg"
              alt="Affinity Tax Services Office - Professional Tax Preparation and Planning Consultation Center"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(0deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0) 100%)',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                <Box component="span" sx={{ color: '#3B82F6' }}>Affinity Tax Services</Box>
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 0, 
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            position: 'relative',
            animation: `${fadeIn} 0.8s ease-out`,
            background: 'white',
          }}
        >
        
        <Grid container>
          <Grid item xs={12} md={5} sx={{ 
            background: 'linear-gradient(135deg, #1E3A8A 0%, #142C6F 100%)',
            color: 'white',
            p: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: { xs: '16px 16px 0 0', md: '16px 0 0 16px' },
          }}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ 
                color: 'white', 
                fontWeight: 700,
                mb: 4,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: 0,
                  width: '60px',
                  height: '4px',
                  background: theme.palette.secondary.main,
                  borderRadius: '2px'
                }
              }}>
                Contact Information
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.7 }}>
                Feel free to reach out to us using any of the contact methods below. We're here to assist you with all your tax needs.
              </Typography>
              
              <Box sx={{ mt: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    mr: 2,
                    p: 1,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' }
                  }}>
                    <EmailIcon sx={{ color: 'white' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Email</Typography>
                    <Button
                      onClick={() => window.location.href = 'mailto:info@affinitytaxservices.com'}
                      sx={{ 
                        color: 'white', 
                        textDecoration: 'none',
                        fontWeight: 500,
                        padding: 0,
                        minWidth: 'auto',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        '&:hover': { 
                          textDecoration: 'underline',
                          backgroundColor: 'transparent'
                        } 
                      }}
                    >
                      info@affinitytaxservices.com
                    </Button>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    mr: 2,
                    p: 1,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' }
                  }}>
                    <PhoneIcon sx={{ color: 'white' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Phone</Typography>
                    <Button
                      onClick={() => window.location.href = 'tel:+1123456'}
                      sx={{ 
                        color: 'white', 
                        textDecoration: 'none',
                        fontWeight: 500,
                        padding: 0,
                        minWidth: 'auto',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        '&:hover': { 
                          textDecoration: 'underline',
                          backgroundColor: 'transparent'
                        } 
                      }}
                    >
                      (123) 456-7890
                    </Button>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    mr: 2,
                    p: 1,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' }
                  }}>
                    <LocationOnIcon sx={{ color: 'white' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Address</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 500 }}>
                      123 Tax Street, Suite 456<br />
                      Financial District, NY 10001
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    mr: 2,
                    p: 1,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' }
                  }}>
                    <AccessTimeIcon sx={{ color: 'white' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Business Hours</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 500 }}>
                      Monday - Friday: 9AM - 5PM<br />
                      Saturday: 10AM - 2PM
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ mt: 6 }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                Connect With Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton 
                  aria-label="facebook" 
                  sx={{ 
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-3px)' 
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  aria-label="x" 
                  sx={{ 
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-3px)' 
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <XIcon />
                </IconButton>
                <IconButton 
                  aria-label="linkedin" 
                  sx={{ 
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-3px)' 
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  aria-label="instagram" 
                  sx={{ 
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-3px)' 
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box 
              component="form" 
              noValidate 
              onSubmit={handleSubmit}
              sx={{ 
                p: { xs: 4, md: 6 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: contactFormWidth,
                mx: 'auto'
              }}>
            
              <Typography variant="h4" gutterBottom sx={{ 
                color: 'text.heading', 
                fontWeight: 700, 
                mb: 4,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: 0,
                  width: '60px',
                  height: '4px',
                  background: theme.palette.primary.main,
                  borderRadius: '2px'
                }
              }}>
                Send Us a Message
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                Fill out the form below and our team will get back to you as soon as possible.
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    autoFocus
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(241,245,249,0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(241,245,249,0.6)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontWeight: 500,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(241,245,249,0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(241,245,249,0.6)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontWeight: 500,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(241,245,249,0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(241,245,249,0.6)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontWeight: 500,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(241,245,249,0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(241,245,249,0.6)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontWeight: 500,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(241,245,249,0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(241,245,249,0.6)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'white',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontWeight: 500,
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  endIcon={!isSubmitting && <SendIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '12px',
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    background: 'linear-gradient(90deg, #1E3A8A 0%, #10B981 100%)',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
                    },
                    minWidth: { xs: '100%', sm: '200px' }
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : formSubmitted ? (
                    'Message Sent!'
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'text.heading' }}>
          Need Immediate Assistance?  
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '700px', mx: 'auto', mb: 4 }}>
          Our customer support team is available during business hours to help you with any urgent tax matters.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<PhoneIcon />}
          sx={{
            borderRadius: '12px',
            borderWidth: '2px',
            textTransform: 'none',
            px: 4,
            py: 1.5,
            fontWeight: 600,
            '&:hover': {
              borderWidth: '2px',
              backgroundColor: 'rgba(30, 58, 138, 0.04)'
            }
          }}
        >
          Call Us Now
        </Button>
      </Box>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ 
            width: '100%',
            alignItems: 'center',
            backgroundImage: 'linear-gradient(90deg, #1E3A8A 0%, #10B981 100%)',
            fontWeight: 500,
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)'
          }}
        >
          Your message has been sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
    </Box>
    </>
  );
}

export default Contacts;
