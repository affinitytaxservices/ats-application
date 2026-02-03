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
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SEOHelmet from '../common/SEOHelmet';
import { seoConfig } from '../../config/seo.config';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();
  
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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
    if (!validateForm()) return;

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
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
      }}
    >
      <SEOHelmet {...seoConfig.pages.login} />
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
                  Welcome Back
                </Typography>
                <Typography variant="h6" sx={{ color: 'inherit', mb: 4, fontWeight: 400, opacity: 0.9 }}>
                  Secure access to your professional tax portal.
                </Typography>
                
                <Stack spacing={3}>
                  {[
                    "Encrypted authentication",
                    "Real-time status tracking",
                    "Secure document management"
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
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h4" fontWeight="700" color="text.primary" gutterBottom>
                    Sign In
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Enter your credentials to access your account
                  </Typography>
                </Box>

                {generalError && (
                  <Alert severity="error" sx={{ mb: 3 }}>
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
                            <Email color="action" />
                          </InputAdornment>
                        ),
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
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box sx={{ textAlign: 'right' }}>
                      <Link
                        component={RouterLink}
                        to="/forgot-password"
                        variant="body2"
                        color="primary"
                        fontWeight="600"
                        underline="hover"
                      >
                        Forgot your password?
                      </Link>
                    </Box>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                      sx={{ py: 1.5 }}
                    >
                      {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </Stack>
                </Box>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'inline', mr: 1 }}>
                    Don't have an account?
                  </Typography>
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="body2"
                    color="primary"
                    fontWeight="700"
                    underline="hover"
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
