import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Grid,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Divider,
  Grow,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import { fadeIn, slideUp, scaleUp, pulse } from '../../styles/animations';

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      // Redirect to appropriate dashboard based on user role
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/client-dashboard');
      }
      return;
    }
    
    // Simulate animation completion after a delay
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear specific field error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error
    if (generalError) {
      setGeneralError('');
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const result = await login(formData.email, formData.password);
        
        if (result.success) {
          // Navigate based on user role
          if (result.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/client-dashboard');
          }
        } else {
          setGeneralError(result.error || 'Authentication failed. Please check your credentials.');
        }
      } catch (err) {
        setGeneralError('An error occurred. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Grid container component="main" sx={{ 
      height: '100vh',
      background: 'linear-gradient(135deg, rgba(46,80,119,0.08) 0%, rgba(56,178,172,0.15) 100%)',
      backdropFilter: 'blur(10px)',
      animation: `${fadeIn} 0.8s ease-out`,
      overflow: 'hidden'
    }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url("/images/office-background.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 8px 32px rgba(31,38,135,0.15)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)',
            zIndex: 1
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            right: '-50%',
            bottom: '-50%',
            background: 'radial-gradient(circle, rgba(56,178,172,0.1) 0%, rgba(46,80,119,0.2) 100%)',
            zIndex: 2,
            animation: `${pulse} 15s infinite ease-in-out`
          }
        }}
      />
      <Grid item xs={12} sm={8} md={5} sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
        backdropFilter: 'blur(25px)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(46,80,119,0.02) 0%, rgba(56,178,172,0.05) 100%)',
          zIndex: 1
        }
      }}>
        <Grow in={true} timeout={1000}>
          <Box
            sx={{
              width: '90%',
              maxWidth: '480px',
              py: 5,
              px: 4,
              borderRadius: '24px',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(31,38,135,0.12), 0 8px 32px rgba(0,0,0,0.08)',
              border: '1px solid rgba(255,255,255,0.3)',
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #2E5077 0%, #38B2AC 50%, #10B981 100%)',
                borderRadius: '24px 24px 0 0'
              }
            }}
          >
          <Avatar sx={{ 
            m: 1, 
            bgcolor: 'secondary.main',
            transform: 'scale(1.3)',
            width: 56,
            height: 56,
            boxShadow: '0 4px 20px rgba(56,178,172,0.25)',
            animation: `${scaleUp} 0.5s ease-out`,
            mb: 1
          }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 3,
            animation: `${fadeIn} 0.8s ease-out`
          }}>
            <img 
              src="/images/login-animation.svg" 
              alt="Secure Login" 
              style={{ 
                width: '180px', 
                height: '180px',
                marginBottom: '10px',
                filter: 'drop-shadow(0 4px 8px rgba(46,80,119,0.2))',
                transform: 'translateY(-10px)',
                transition: 'all 0.5s ease'
              }} 
            />
          </Box>
          <Typography component="h1" variant="h4" sx={{ 
            fontWeight: 700,
            letterSpacing: '0.5px',
            mb: 3,
            color: 'primary.dark',
            animation: `${slideUp} 0.6s ease-out`,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #2E5077 0%, #38B2AC 100%)',
              borderRadius: '4px',
              animation: `${scaleUp} 0.8s ease-out`
            }
          }}>
            Welcome Back
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              mt: 2, 
              width: '100%',
              animation: `${slideUp} 0.7s ease-out`,
              opacity: animationComplete ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            {generalError && (
              <Alert severity="error" sx={{ 
                mb: 3,
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                animation: `${fadeIn} 0.3s ease-out`,
                '& .MuiAlert-icon': {
                  fontSize: '1.2rem'
                }
              }}>
                {generalError}
              </Alert>
            )}
            
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 600, 
              mb: 1,
              color: 'text.secondary'
            }}>
              Sign in to your account
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 0 12px rgba(56, 178, 172, 0.25)'
                  }
                },
                '& .MuiFormHelperText-root': {
                  marginLeft: '14px',
                  fontWeight: 500
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                      sx={{ color: showPassword ? 'secondary.main' : 'text.secondary' }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 0 12px rgba(56, 178, 172, 0.25)'
                  }
                },
                '& .MuiFormHelperText-root': {
                  marginLeft: '14px',
                  fontWeight: 500
                }
              }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    value="remember" 
                    color="secondary" 
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    sx={{
                      '&.Mui-checked': {
                        color: 'secondary.main'
                      }
                    }}
                  />
                }
                label="Remember me"
                sx={{ 
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.9rem',
                    color: 'text.secondary'
                  }
                }}
              />
              <Link href="#" variant="body2" sx={{
                color: 'secondary.main',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                padding: '6px 12px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: 'secondary.dark',
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  transform: 'translateY(-2px)'
                }
              }}>
                Forgot password?
              </Link>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              startIcon={!isSubmitting && <LoginIcon />}
              sx={{ 
                mt: 4, 
                mb: 3,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(46,80,119,0.2)',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(90deg, #2E5077 0%, #38B2AC 100%)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 25px rgba(56, 178, 172, 0.35)'
                },
                '&:active': {
                  transform: 'translateY(-1px)',
                }
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>
            
            <Divider sx={{ my: 2, '&::before, &::after': { borderColor: 'rgba(0, 0, 0, 0.08)' } }}>
              <Typography variant="body2" color="text.secondary" sx={{ px: 1, fontWeight: 500 }}>
                OR
              </Typography>
            </Divider>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Don't have an account?
              </Typography>
              <Link 
                component={RouterLink} 
                to="/register" 
                variant="body1" 
                sx={{
                  color: 'secondary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  background: 'rgba(16, 185, 129, 0.05)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  '&:hover': { 
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
                    color: 'secondary.dark'
                  }
                }}
              >
                Create an account
              </Link>
            </Box>
          </Box>
          </Box>
        </Grow>
      </Grid>
    </Grid>
  );
}

export default Login;