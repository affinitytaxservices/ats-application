import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Grid,
  Fade,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const FormContainer = styled(Card)(({ theme: _theme }) => ({
  maxWidth: 800,
  margin: '0 auto',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  border: '1px solid rgba(255,255,255,0.2)',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  },
}));

const StyledTextField = styled(TextField)(({ theme: _theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    '&:hover fieldset': {
      borderColor: '#667eea',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#667eea',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#667eea',
  },
}));

const StyledSelect = styled(Select)(({ theme: _theme }) => ({
  borderRadius: '12px',
  backgroundColor: 'rgba(255,255,255,0.8)',
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#667eea',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#667eea',
  },
}));

const SubmitButton = styled(Button)(({ theme: _theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '12px',
  padding: '12px 32px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 25px rgba(102, 126, 234, 0.4)',
  },
}));

const clientTypes = [
  'Small Business Owner',
  'Freelance Consultant',
  'Tech Executive',
  'Medical Professional',
  'Retired Executive',
  'Startup Founder',
  'HR Manager',
  'Other'
];

const SuccessStoryForm = ({ onSubmit, onClose }) => {
  const [containerRef, isVisible] = useScrollAnimation(0.2);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clientType: '',
    customClientType: '',
    rating: 5,
    testimonial: '',
    savings: '',
    year: new Date().getFullYear().toString(),
    consent: false
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      rating: newValue
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const submissionData = {
        ...formData,
        clientType: formData.clientType === 'Other' ? formData.customClientType : formData.clientType,
        submittedAt: new Date().toISOString()
      };

      if (onSubmit) {
        onSubmit(submissionData);
      }

      setShowSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          clientType: '',
          customClientType: '',
          rating: 5,
          testimonial: '',
          savings: '',
          year: new Date().getFullYear().toString(),
          consent: false
        });
        setShowSuccess(false);
        if (onClose) {
          onClose();
        }
      }, 3000);

    } catch (error) {
      console.error('Error submitting success story:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box ref={containerRef} sx={{ py: 8, px: { xs: 2, md: 4 } }}>
      <Fade in={isVisible} timeout={1000}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Share Your Success Story
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#6B7280',
              fontSize: '1.125rem',
              maxWidth: 600,
              mx: 'auto',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Help other clients by sharing your experience with our tax services
          </Typography>
        </Box>
      </Fade>

      <Slide direction="up" in={isVisible} timeout={1200}>
        <FormContainer>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Personal Information */}
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Full Name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    required
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    required
                    variant="outlined"
                  />
                </Grid>

                {/* Client Type */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel sx={{ '&.Mui-focused': { color: '#667eea' } }}>
                      Client Type
                    </InputLabel>
                    <StyledSelect
                      value={formData.clientType}
                      onChange={handleInputChange('clientType')}
                      label="Client Type"
                    >
                      {clientTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </StyledSelect>
                  </FormControl>
                </Grid>

                {formData.clientType === 'Other' && (
                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      fullWidth
                      label="Please specify"
                      value={formData.customClientType}
                      onChange={handleInputChange('customClientType')}
                      required
                      variant="outlined"
                    />
                  </Grid>
                )}

                {/* Rating */}
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1,
                        fontWeight: 500,
                        color: '#374151',
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      Overall Rating *
                    </Typography>
                    <Rating
                      value={formData.rating}
                      onChange={handleRatingChange}
                      size="large"
                      icon={<StarIcon fontSize="inherit" />}
                      emptyIcon={<StarIcon fontSize="inherit" />}
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#FFC107',
                        },
                        '& .MuiRating-iconEmpty': {
                          color: '#E5E7EB',
                        },
                      }}
                    />
                  </Box>
                </Grid>

                {/* Savings and Year */}
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Tax Savings (Optional)"
                    placeholder="e.g., $15,000"
                    value={formData.savings}
                    onChange={handleInputChange('savings')}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Year of Service"
                    type="number"
                    value={formData.year}
                    onChange={handleInputChange('year')}
                    required
                    variant="outlined"
                    inputProps={{
                      min: 2020,
                      max: new Date().getFullYear()
                    }}
                  />
                </Grid>

                {/* Testimonial */}
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Your Success Story"
                    multiline
                    rows={4}
                    value={formData.testimonial}
                    onChange={handleInputChange('testimonial')}
                    required
                    variant="outlined"
                    placeholder="Tell us about your experience with our tax services and how we helped you..."
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <SubmitButton
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      startIcon={<SendIcon />}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Success Story'}
                    </SubmitButton>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </FormContainer>
      </Slide>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Thank you for sharing your success story! We'll review it and may feature it on our website.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SuccessStoryForm;