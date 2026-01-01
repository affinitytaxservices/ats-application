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
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setGeneralError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setGeneralError('Login failed. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                  Secure access to your personalized tax dashboard
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
                    <Typography sx={{ color: '#E5E7EB', fontWeight: 500 }}>
                      Encrypted authentication and role-based access
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3B82F6' }} />
                    <Typography sx={{ color: '#E5E7EB', fontWeight: 500 }}>
                      Real-time status and notifications
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                    <Typography sx={{ color: '#E5E7EB', fontWeight: 500 }}>
                      Seamless document management
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
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#0F172A',
                      mb: 1,
                    }}
                  >
                    Sign In
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: '#6B7280' }}
                  >
                    Enter your credentials to access your account
                  </Typography>
                </Box>

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

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: '#9CA3AF', fontSize: '1.25rem' }} />
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
                    '& .MuiInputLabel-root': {
                      color: '#6B7280',
                      '&.Mui-focused': {
                        color: '#3B82F6',
                      },
                    },
                  }}
                />

                    <TextField
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: '#9CA3AF', fontSize: '1.25rem' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
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
                    '& .MuiInputLabel-root': {
                      color: '#6B7280',
                      '&.Mui-focused': {
                        color: '#3B82F6',
                      },
                    },
                  }}
                />

                    <Box sx={{ textAlign: 'right' }}>
                      <Link
                        component={RouterLink}
                        to="/forgot-password"
                        sx={{
                          color: '#3B82F6',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Forgot your password?
                      </Link>
                    </Box>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size={18} /> : <LoginIcon />}
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
                      {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </Stack>
                </Box>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Typography variant="body2" sx={{ color: '#6B7280', mb: 1 }}>
                    Don't have an account?
                  </Typography>
                  <Link
                    component={RouterLink}
                    to="/register"
                    sx={{
                      color: '#3B82F6',
                      textDecoration: 'none',
                      fontWeight: 700,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Create an account
                  </Link>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Login;
