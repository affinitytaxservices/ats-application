import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Link,
} from '@mui/material';
import {
  Email,
  ArrowBack,
  Send,
  CheckCircle,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import SEOHelmet from '../common/SEOHelmet';
import { seoConfig } from '../../config/seo.config';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setErrors({});

    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsEmailSent(true);
    } catch (error) {
      setGeneralError('Failed to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({});
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  if (isEmailSent) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: '#FAFAFA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <SEOHelmet {...seoConfig.pages.forgotPassword} />
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, sm: 6 },
                borderRadius: 2,
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                textAlign: 'center',
                maxWidth: 480,
                mx: 'auto',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
                  }}
                >
                  <CheckCircle sx={{ fontSize: 40, color: 'white' }} />
                </Box>
              </motion.div>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: '#1F2937',
                  fontSize: { xs: '1.75rem', sm: '2rem' },
                }}
              >
                Check Your Email
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#6B7280',
                  mb: 4,
                  lineHeight: 1.6,
                  fontSize: '0.95rem',
                }}
              >
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your inbox and follow the instructions to reset your password.
              </Typography>

              <Stack spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/login')}
                  startIcon={<ArrowBack />}
                  sx={{
                    py: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: '#1F2937',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#374151',
                      boxShadow: '0 4px 12px rgba(31, 41, 55, 0.15)',
                    },
                  }}
                >
                  Back to Login
                </Button>

                <Button
                  variant="text"
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail('');
                  }}
                  sx={{
                    color: '#6B7280',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    '&:hover': {
                      backgroundColor: '#F3F4F6',
                    },
                  }}
                >
                  Try different email
                </Button>
              </Stack>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#FAFAFA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <SEOHelmet {...seoConfig.pages.forgotPassword} />
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: 2,
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              maxWidth: 480,
              mx: 'auto',
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: '#6366F1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
                  }}
                >
                  <Email sx={{ fontSize: 40, color: 'white' }} />
                </Box>
              </motion.div>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  color: '#1F2937',
                  fontSize: { xs: '1.75rem', sm: '2rem' },
                }}
              >
                Forgot Password?
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#6B7280',
                  fontSize: '0.95rem',
                }}
              >
                No worries! Enter your email and we'll send you reset instructions.
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              {generalError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3,
                      borderRadius: 1,
                      '& .MuiAlert-message': {
                        fontSize: '0.875rem',
                      }
                    }}
                  >
                    {generalError}
                  </Alert>
                </motion.div>
              )}

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#9CA3AF', fontSize: '1.25rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    backgroundColor: '#F9FAFB',
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                    },
                    '&:hover fieldset': {
                      borderColor: '#D1D5DB',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6366F1',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6B7280',
                    '&.Mui-focused': {
                      color: '#6366F1',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <Send />}
                sx={{
                  py: 1.5,
                  mb: 3,
                  borderRadius: 1.5,
                  backgroundColor: '#1F2937',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#374151',
                    boxShadow: '0 4px 12px rgba(31, 41, 55, 0.15)',
                  },
                  '&:disabled': {
                    backgroundColor: '#9CA3AF',
                    color: '#FFFFFF',
                  },
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <Box sx={{ textAlign: 'center', pt: 2, borderTop: '1px solid #F3F4F6' }}>
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: '#6366F1',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <ArrowBack sx={{ fontSize: '1rem' }} />
                  Back to Login
                </Link>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default ForgotPassword;