import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Paper,
  Stack,
  Link,
  Container,
  Grid,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  PersonAdd,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SEOHelmet from '../common/SEOHelmet';
import { seoConfig } from '../../config/seo.config';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await register(formData);
      if (success) {
        navigate('/verify-otp');
      } else {
        setGeneralError('Registration failed. Please try again.');
      }
    } catch (error) {
      setGeneralError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 60%, #10B981 100%)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
      }}
    >
      <SEOHelmet {...seoConfig.pages.register} />
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: { xs: 4, md: 6 },
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: '#FFFFFF',
                    mb: 2,
                    letterSpacing: 0.5,
                  }}
                >
                  Affinity Tax Services
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}
                >
                  Create your secure account in minutes
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
                    <Typography sx={{ color: '#E5E7EB', fontWeight: 500 }}>
                      Email verification and secure password requirements
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3B82F6' }} />
                    <Typography sx={{ color: '#E5E7EB', fontWeight: 500 }}>
                      Personalized dashboard and document tracking
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                    <Typography sx={{ color: '#E5E7EB', fontWeight: 500 }}>
                      Trusted support for every tax season
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 6 },
                  borderRadius: 3,
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                }}
              >
                <Box sx={{ mb: 4, textAlign: 'left' }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#0F172A',
                      mb: 1,
                    }}
                  >
                    Create Account
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: '#6B7280' }}
                  >
                    Fill in your details to get started
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  {generalError && (
                    <Alert
                      severity="error"
                      sx={{
                        mb: 3,
                        borderRadius: 2,
                      }}
                    >
                      {generalError}
                    </Alert>
                  )}

                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      autoComplete="given-name"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: '#9CA3AF' }} />
                          </InputAdornment>
                        ),
                      }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#F9FAFB',
                      outline: 'none',
                      '&:focus-within': { outline: 'none' },
                      '&.Mui-focused': { outline: 'none' },
                      '& fieldset': {
                        borderColor: '#E5E7EB',
                      },
                      '&:hover fieldset': {
                        borderColor: '#CBD5E1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E5E7EB',
                        borderWidth: 1,
                      }
                    },
                    '& .MuiOutlinedInput-input': {
                      '&:focus': { outline: 'none' },
                    },
                  }}
                />

                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      autoComplete="family-name"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: '#9CA3AF' }} />
                          </InputAdornment>
                        ),
                      }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#F9FAFB',
                      outline: 'none',
                      '&:focus-within': { outline: 'none' },
                      '&.Mui-focused': { outline: 'none' },
                      '& fieldset': {
                        borderColor: '#E5E7EB',
                      },
                      '&:hover fieldset': {
                        borderColor: '#CBD5E1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E5E7EB',
                        borderWidth: 1,
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      '&:focus': { outline: 'none' },
                    },
                  }}
                />

                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      autoComplete="email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: '#9CA3AF' }} />
                          </InputAdornment>
                        ),
                      }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#F9FAFB',
                      outline: 'none',
                      '&:focus-within': { outline: 'none' },
                      '&.Mui-focused': { outline: 'none' },
                      '& fieldset': {
                        borderColor: '#E5E7EB',
                      },
                      '&:hover fieldset': {
                        borderColor: '#CBD5E1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E5E7EB',
                        borderWidth: 1,
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      '&:focus': { outline: 'none' },
                    },
                  }}
                />

                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      autoComplete="new-password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: '#9CA3AF' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={togglePasswordVisibility}
                              edge="end"
                              sx={{ color: '#9CA3AF' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#F9FAFB',
                      outline: 'none',
                      '&:focus-within': { outline: 'none' },
                      '&.Mui-focused': { outline: 'none' },
                      '& fieldset': {
                        borderColor: '#E5E7EB',
                      },
                      '&:hover fieldset': {
                        borderColor: '#CBD5E1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E5E7EB',
                        borderWidth: 1,
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      '&:focus': { outline: 'none' },
                    },
                  }}
                />

                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      autoComplete="new-password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: '#9CA3AF' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={toggleConfirmPasswordVisibility}
                              edge="end"
                              sx={{ color: '#9CA3AF' }}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#F9FAFB',
                          outline: 'none',
                          '&:focus-within': { outline: 'none' },
                          '&.Mui-focused': { outline: 'none' },
                          '& fieldset': {
                            borderColor: '#E5E7EB',
                          },
                          '&:hover fieldset': {
                            borderColor: '#CBD5E1',
                          },
                          '&.Mui-focused fieldset': {
                        borderColor: '#E5E7EB',
                        borderWidth: 1,
                      },
                        },
                        '& .MuiOutlinedInput-input': {
                          '&:focus': { outline: 'none' },
                        },
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size={18} /> : <PersonAdd />}
                      sx={{
                        py: 1.25,
                        borderRadius: 2,
                        background: 'linear-gradient(90deg, #1E3A8A 0%, #10B981 100%)',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        textTransform: 'none',
                        boxShadow: '0 6px 12px rgba(16,185,129,0.25)',
                        '&:hover': {
                          boxShadow: '0 10px 20px rgba(16,185,129,0.35)',
                        },
                        '&:disabled': {
                          backgroundColor: '#9CA3AF',
                          color: '#FFFFFF',
                        },
                      }}
                    >
                      {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </Stack>

                  <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="body2" sx={{ color: '#6B7280', mb: 1 }}>
                      Already have an account?
                    </Typography>
                    <Link
                      component={RouterLink}
                      to="/login"
                      sx={{
                        color: '#3B82F6',
                        textDecoration: 'none',
                        fontWeight: 700,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Sign in
                    </Link>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Register;
