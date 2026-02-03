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
  useTheme
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
  const theme = useTheme();

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
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
      }}
    >
      <SEOHelmet {...seoConfig.pages.register} />
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ height: '100%' }}
            >
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: 6,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative circle */}
                <Box sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  bgcolor: 'rgba(16, 185, 129, 0.1)',
                }} />

                <Typography variant="h3" fontWeight="800" gutterBottom color="inherit">
                  Join Affinity
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, fontWeight: 400 }} color="inherit">
                  Create your secure account in minutes.
                </Typography>
                
                <Stack spacing={3}>
                   {[
                    "Email verification for security",
                    "Personalized dashboard access",
                    "Trusted support year-round"
                  ].map((text, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'success.main' }} />
                      <Typography variant="body1" fontWeight="500" color="inherit">
                        {text}
                      </Typography>
                    </Box>
                  ))}
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
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box sx={{ mb: 4, textAlign: 'left' }}>
                  <Typography variant="h4" fontWeight="700" color="text.primary" gutterBottom>
                    Create Account
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Fill in your details to get started
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  {generalError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {generalError}
                    </Alert>
                  )}

                  <Stack spacing={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
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
                                <Person color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
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
                                <Person color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>

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
                            <Email color="action" />
                          </InputAdornment>
                        ),
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
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
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
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={toggleConfirmPasswordVisibility}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
                      sx={{ py: 1.5 }}
                    >
                      {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </Stack>

                  <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'inline', mr: 1 }}>
                      Already have an account?
                    </Typography>
                    <Link
                      component={RouterLink}
                      to="/login"
                      variant="body2"
                      color="primary"
                      fontWeight="700"
                      underline="hover"
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
