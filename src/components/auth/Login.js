import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Divider,
  Container,
  Paper,
  Fade,
  Slide,
  Zoom,
  Stack,
  Chip,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Login as LoginIcon,
  Google,
  Security,
  Fingerprint,
} from '@mui/icons-material';
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
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/client-dashboard');
      }
      return;
    }

    // Staggered animation sequence
    const timers = [
      setTimeout(() => setAnimationStage(1), 200),
      setTimeout(() => setAnimationStage(2), 600),
      setTimeout(() => setAnimationStage(3), 1000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          animation: `${pulse} 20s infinite ease-in-out`,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)',
          animation: `${pulse} 15s infinite ease-in-out alternate`,
        }
      }}
    >
      {/* Floating Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.05)',
          backdropFilter: 'blur(10px)',
          animation: `${pulse} 8s infinite ease-in-out`,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '70%',
          right: '15%',
          width: '150px',
          height: '150px',
          borderRadius: '30%',
          background: 'rgba(0,0,0,0.03)',
          backdropFilter: 'blur(15px)',
          animation: `${pulse} 12s infinite ease-in-out reverse`,
          zIndex: 1,
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Fade in={animationStage >= 1} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
              p: { xs: 3, sm: 5 },
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
              }
            }}
          >
            {/* Header Section */}
            <Slide direction="down" in={animationStage >= 2} timeout={600}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Zoom in={animationStage >= 2} timeout={800}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                      animation: `${scaleUp} 0.8s ease-out`,
                    }}
                  >
                    <Security sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                </Zoom>
                
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                    animation: `${slideUp} 0.8s ease-out`,
                  }}
                >
                  Welcome Back
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(0, 0, 0, 0.7)',
                    fontWeight: 500,
                    animation: `${fadeIn} 1s ease-out`,
                  }}
                >
                  Sign in to access your secure account
                </Typography>
              </Box>
            </Slide>

            {/* Form Section */}
            <Slide direction="up" in={animationStage >= 3} timeout={800}>
              <Box component="form" onSubmit={handleSubmit}>
                {generalError && (
                  <Fade in timeout={300}>
                    <Alert
                      severity="error"
                      sx={{
                        mb: 3,
                        borderRadius: '12px',
                        background: 'rgba(244, 67, 54, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(244, 67, 54, 0.2)',
                        color: '#1e293b',
                        '& .MuiAlert-icon': {
                          color: '#ff6b6b',
                        }
                      }}
                    >
                      {generalError}
                    </Alert>
                  </Fade>
                )}

                <Stack spacing={3}>
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
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        color: '#1e293b',
                        transition: 'all 0.3s ease',
                        '& fieldset': {
                          border: 'none',
                        },
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          background: 'rgba(255, 255, 255, 1)',
                          boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.6)',
                        '&.Mui-focused': {
                          color: '#667eea',
                        },
                      },
                      '& .MuiFormHelperText-root': {
                        color: '#ff6b6b',
                        fontWeight: 500,
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
                          <Lock sx={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        color: '#1e293b',
                        transition: 'all 0.3s ease',
                        '& fieldset': {
                          border: 'none',
                        },
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                        },
                        '&.Mui-focused': {
                          background: 'rgba(255, 255, 255, 1)',
                          boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.6)',
                        '&.Mui-focused': {
                          color: '#667eea',
                        },
                      },
                      '& .MuiFormHelperText-root': {
                        color: '#ff6b6b',
                        fontWeight: 500,
                      },
                    }}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={handleRememberMeChange}
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-checked': {
                              color: '#667eea',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                          Remember me
                        </Typography>
                      }
                    />
                    
                    <Button
                      variant="text"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          color: 'white',
                          background: 'rgba(255, 255, 255, 0.1)',
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
                    startIcon={!isSubmitting && <LoginIcon />}
                    sx={{
                      py: 2,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      },
                      '&:active': {
                        transform: 'translateY(-1px)',
                      },
                      '&.Mui-disabled': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 0.5)',
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  <Divider sx={{ my: 2 }}>
                    <Chip
                      label="OR"
                      sx={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        fontWeight: 500,
                      }}
                    />
                  </Divider>

                  {/* Social Login Buttons */}
                  <Stack direction="row" spacing={2}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Google />}
                      sx={{
                        py: 1.5,
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        textTransform: 'none',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Google
                    </Button>
                    
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Fingerprint />}
                      sx={{
                        py: 1.5,
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        textTransform: 'none',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Biometric
                    </Button>
                  </Stack>

                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}
                    >
                      Don't have an account?
                    </Typography>
                    
                    <Button
                      component={RouterLink}
                      to="/register"
                      variant="outlined"
                      sx={{
                        borderRadius: '12px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.2)',
                          border: '2px solid rgba(255, 255, 255, 0.5)',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        },
                      }}
                    >
                      Create New Account
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Slide>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

export default Login;