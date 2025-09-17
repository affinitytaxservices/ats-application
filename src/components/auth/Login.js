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
  Container,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import {
  Person,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Business,
  AccountCircle,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [loginType, setLoginType] = useState('client'); // 'client' or 'employee'

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
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const success = await login(formData.username, formData.password, loginType);
      if (success) {
        navigate(loginType === 'employee' ? '/employee-dashboard' : '/dashboard');
      } else {
        setGeneralError('Invalid username or password');
      }
    } catch (error) {
      setGeneralError('Login failed. Please try again.');
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 150, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          zIndex: 0,
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 40px 100px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* Login Type Selector */}
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                <Button
                  fullWidth
                  variant={loginType === 'client' ? 'contained' : 'outlined'}
                  onClick={() => setLoginType('client')}
                  startIcon={<AccountCircle />}
                  sx={{
                    py: 1.5,
                    borderRadius: '16px',
                    textTransform: 'none',
                    fontWeight: 600,
                    ...(loginType === 'client' ? {
                      // Use theme's glass effect for contained variant
                    } : {
                      borderColor: '#E5E7EB',
                      color: '#6B7280',
                      '&:hover': {
                        borderColor: '#6366F1',
                        background: 'rgba(99, 102, 241, 0.05)',
                      },
                    }),
                  }}
                >
                  Client Login
                </Button>
                <Button
                  fullWidth
                  variant={loginType === 'employee' ? 'contained' : 'outlined'}
                  onClick={() => setLoginType('employee')}
                  startIcon={<Business />}
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    ...(loginType === 'employee' ? {
                      background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                      boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
                    } : {
                      borderColor: '#E5E7EB',
                      color: '#6B7280',
                      '&:hover': {
                        borderColor: '#10B981',
                        background: 'rgba(16, 185, 129, 0.05)',
                      },
                    }),
                  }}
                >
                  Employee Portal
                </Button>
              </Stack>
            </Box>

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
                    background: loginType === 'employee' 
                      ? 'linear-gradient(135deg, #10B981 0%, #34D399 100%)'
                      : 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: loginType === 'employee'
                      ? '0 20px 40px rgba(16, 185, 129, 0.3)'
                      : '0 20px 40px rgba(99, 102, 241, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loginType === 'employee' ? (
                    <Business sx={{ fontSize: 40, color: 'white' }} />
                  ) : (
                    <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
                  )}
                </Box>
              </motion.div>
              
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background: loginType === 'employee'
                    ? 'linear-gradient(135deg, #10B981 0%, #34D399 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {loginType === 'employee' ? 'Employee Portal' : 'Welcome Back'}
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: '#6B7280',
                  fontWeight: 500,
                }}
              >
                {loginType === 'employee' 
                  ? 'Access your tax preparer dashboard'
                  : 'Sign in to your account to continue'
                }
              </Typography>
            </Box>

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
                      borderRadius: '12px',
                      fontWeight: 500,
                    }}
                  >
                    {generalError}
                  </Alert>
                </motion.div>
              )}

              <TextField
                fullWidth
                label={loginType === 'employee' ? 'Employee ID' : 'Username'}
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                autoComplete="username"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ 
                        color: loginType === 'employee' ? '#10B981' : '#6366F1' 
                      }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
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
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ 
                        color: loginType === 'employee' ? '#10B981' : '#6366F1' 
                      }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                        sx={{ 
                          color: loginType === 'employee' ? '#10B981' : '#6366F1' 
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                  },
                }}
              />

              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Button
                  component={RouterLink}
                  to="/forgot-password"
                  variant="text"
                  sx={{
                    color: '#6B7280',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    '&:hover': {
                      background: 'rgba(99, 102, 241, 0.1)',
                    },
                  }}
                >
                  Forgot Password?
                </Button>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <LoginIcon />}
                sx={{
                  py: 2.5,
                  mb: 3,
                  borderRadius: '12px',
                  background: loginType === 'employee'
                    ? 'linear-gradient(135deg, #10B981 0%, #34D399 100%)'
                    : 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  boxShadow: loginType === 'employee'
                    ? '0 8px 32px rgba(16, 185, 129, 0.3)'
                    : '0 8px 32px rgba(99, 102, 241, 0.3)',
                  '&:hover': {
                    background: loginType === 'employee'
                      ? 'linear-gradient(135deg, #059669 0%, #10B981 100%)'
                      : 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: loginType === 'employee'
                      ? '0 12px 40px rgba(16, 185, 129, 0.4)'
                      : '0 12px 40px rgba(99, 102, 241, 0.4)',
                  },
                  '&:disabled': {
                    background: loginType === 'employee'
                      ? 'rgba(16, 185, 129, 0.5)'
                      : 'rgba(99, 102, 241, 0.5)',
                    transform: 'none',
                  },
                }}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>

              {loginType === 'client' && (
                <>
                  <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                      New to our platform?
                    </Typography>
                  </Divider>

                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      component={RouterLink}
                      to="/register"
                      variant="outlined"
                      fullWidth
                      sx={{
                        py: 2,
                        borderRadius: '12px',
                        borderColor: '#E5E7EB',
                        color: '#6B7280',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: '#6366F1',
                          background: 'rgba(99, 102, 241, 0.05)',
                          color: '#6366F1',
                        },
                      }}
                    >
                      Create New Account
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Login;