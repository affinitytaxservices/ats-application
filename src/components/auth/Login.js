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
          backgroundImage: 'url("/src/assets/animated-login-bg.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(1px)',
          zIndex: 1,
        }
      }}
    >
      {/* Enhanced Floating Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(102, 126, 234, 0.2))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: `${pulse} 8s infinite ease-in-out, ${scaleUp} 12s infinite ease-in-out alternate`,
          zIndex: 1,
          boxShadow: '0 20px 40px rgba(16, 185, 129, 0.1)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: '100px',
          height: '100px',
          borderRadius: '30%',
          background: 'linear-gradient(45deg, rgba(118, 75, 162, 0.3), rgba(240, 147, 251, 0.3))',
          backdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          animation: `${pulse} 10s infinite ease-in-out reverse, ${fadeIn} 8s infinite ease-in-out alternate`,
          zIndex: 1,
          boxShadow: '0 15px 30px rgba(118, 75, 162, 0.15)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '2%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(90deg, rgba(245, 87, 108, 0.4), rgba(79, 172, 254, 0.4))',
          backdropFilter: 'blur(15px)',
          animation: `${slideUp} 15s infinite ease-in-out, ${pulse} 6s infinite ease-in-out`,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          right: '25%',
          width: '80px',
          height: '80px',
          borderRadius: '20%',
          background: 'linear-gradient(180deg, rgba(0, 242, 254, 0.3), rgba(16, 185, 129, 0.3))',
          backdropFilter: 'blur(18px)',
          animation: `${scaleUp} 20s infinite ease-in-out, ${fadeIn} 14s infinite ease-in-out alternate`,
          zIndex: 1,
          transform: 'rotate(45deg)',
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 3 }}>
        <Fade in={animationStage >= 1} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(30px)',
              borderRadius: '28px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              p: { xs: 4, sm: 6 },
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 40px 80px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2) inset',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #10B981 0%, #667eea 25%, #764ba2 50%, #f093fb 75%, #10B981 100%)',
                backgroundSize: '200% 100%',
                animation: `${slideUp} 3s infinite linear`,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                animation: `${pulse} 4s infinite ease-in-out`,
                zIndex: -1,
              }
            }}
          >
            {/* Header Section */}
            <Slide direction="down" in={animationStage >= 2} timeout={600}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Zoom in={animationStage >= 2} timeout={800}>
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10B981 0%, #667eea 50%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      boxShadow: '0 15px 40px rgba(16, 185, 129, 0.4), 0 0 0 3px rgba(255, 255, 255, 0.3)',
                      animation: `${scaleUp} 0.8s ease-out, ${pulse} 3s infinite ease-in-out`,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-5px',
                        left: '-5px',
                        right: '-5px',
                        bottom: '-5px',
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, #10B981, #667eea, #764ba2, #f093fb)',
                        animation: `${slideUp} 2s infinite linear`,
                        zIndex: -1,
                        opacity: 0.7,
                      }
                    }}
                  >
                    <Security sx={{ fontSize: 45, color: 'white', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
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
                          <Email sx={{ color: '#10B981' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(240, 253, 244, 0.95)',
                        backdropFilter: 'blur(15px)',
                        borderRadius: '16px',
                        border: '2px solid rgba(16, 185, 129, 0.2)',
                        color: '#064e3b',
                        transition: 'all 0.3s ease',
                        '& fieldset': {
                          border: 'none',
                        },
                        '&:hover': {
                          background: 'rgba(236, 253, 245, 1)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.15)',
                          border: '2px solid rgba(16, 185, 129, 0.4)',
                        },
                        '&.Mui-focused': {
                          background: 'rgba(255, 255, 255, 1)',
                          boxShadow: '0 0 25px rgba(16, 185, 129, 0.4), 0 0 0 3px rgba(52, 211, 153, 0.1)',
                          border: '2px solid #10B981',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#065f46',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#10B981',
                        },
                      },
                      '& .MuiFormHelperText-root': {
                        color: '#dc2626',
                        fontWeight: 500,
                        backgroundColor: 'rgba(254, 242, 242, 0.8)',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        marginTop: '8px',
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
                          <Lock sx={{ color: '#10B981' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            sx={{ color: '#10B981' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(240, 253, 244, 0.95)',
                        backdropFilter: 'blur(15px)',
                        borderRadius: '16px',
                        border: '2px solid rgba(16, 185, 129, 0.2)',
                        color: '#064e3b',
                        transition: 'all 0.3s ease',
                        '& fieldset': {
                          border: 'none',
                        },
                        '&:hover': {
                          background: 'rgba(236, 253, 245, 1)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.15)',
                          border: '2px solid rgba(16, 185, 129, 0.4)',
                        },
                        '&.Mui-focused': {
                          background: 'rgba(255, 255, 255, 1)',
                          boxShadow: '0 0 25px rgba(16, 185, 129, 0.4), 0 0 0 3px rgba(52, 211, 153, 0.1)',
                          border: '2px solid #10B981',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#065f46',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#10B981',
                        },
                      },
                      '& .MuiFormHelperText-root': {
                        color: '#dc2626',
                        fontWeight: 500,
                        backgroundColor: 'rgba(254, 242, 242, 0.8)',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        marginTop: '8px',
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
                      borderRadius: '12px',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(102, 126, 234, 0.1))',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover': {
                        color: 'white',
                        transform: 'translateY(-1px)',
                        '&::before': {
                          opacity: 1,
                        },
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
                      py: 2.5,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #10B981 0%, #667eea 50%, #764ba2 100%)',
                      boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2) inset',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                        transition: 'left 0.6s ease',
                      },
                      '&:hover': {
                        transform: 'translateY(-4px) scale(1.02)',
                        boxShadow: '0 15px 40px rgba(16, 185, 129, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.3) inset',
                        background: 'linear-gradient(135deg, #667eea 0%, #10B981 50%, #764ba2 100%)',
                        '&::before': {
                          left: '100%',
                        },
                      },
                      '&:active': {
                        transform: 'translateY(-2px) scale(1.01)',
                      },
                      '&.Mui-disabled': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 0.5)',
                        transform: 'none',
                        boxShadow: 'none',
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