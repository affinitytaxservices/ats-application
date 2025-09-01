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
  Container,
  Paper,
  Fade,
  Slide,
  Zoom,
  Stack,
  Chip,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
  LocationOn,
  PersonAdd,
  Google,
  Fingerprint,
  CheckCircle,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import { fadeIn, slideUp, scaleUp, pulse } from '../../styles/animations';

function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const steps = [
    'Personal Information',
    'Account Security',
    'Contact Details'
  ];

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

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

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

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Personal Information
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        break;
      case 1: // Account Security
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters long';
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
      case 2: // Contact Details
        if (!formData.phoneNumber.trim()) {
          newErrors.phoneNumber = 'Phone number is required';
        }
        if (!formData.address.trim()) {
          newErrors.address = 'Address is required';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (validateStep(activeStep)) {
      setIsSubmitting(true);

      try {
        const result = await register(formData);

        if (result.success) {
          navigate('/client-dashboard');
        } else {
          setGeneralError(result.error || 'Registration failed. Please try again.');
        }
      } catch (err) {
        setGeneralError('An error occurred. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
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
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyles}
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
                    <Person sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyles}
            />
          </Stack>
        );
      case 1:
        return (
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyles}
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
              sx={textFieldStyles}
            />
            {formData.password && (
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                  Password Strength
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={passwordStrength}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: passwordStrength < 50 ? '#ff6b6b' : passwordStrength < 75 ? '#ffd93d' : '#6bcf7f',
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            )}
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
                    <Lock sx={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                      sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyles}
            />
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              autoComplete="tel"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyles}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={3}
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              autoComplete="street-address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                    <LocationOn sx={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyles}
            />
          </Stack>
        );
      default:
        return 'Unknown step';
    }
  };

  const textFieldStyles = {
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
          background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)',
          animation: `${pulse} 15s infinite ease-in-out alternate`,
        }
      }}
    >
      {/* Floating Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          animation: `${pulse} 10s infinite ease-in-out`,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '8%',
          width: '80px',
          height: '80px',
          borderRadius: '30%',
          background: 'rgba(0,0,0,0.08)',
          backdropFilter: 'blur(15px)',
          animation: `${pulse} 14s infinite ease-in-out reverse`,
          zIndex: 1,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
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
                    <PersonAdd sx={{ fontSize: 40, color: 'white' }} />
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
                  Create Account
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(0, 0, 0, 0.7)',
                    fontWeight: 500,
                    animation: `${fadeIn} 1s ease-out`,
                  }}
                >
                  Join us and start your journey today
                </Typography>
              </Box>
            </Slide>

            {/* Stepper */}
            <Slide direction="up" in={animationStage >= 3} timeout={800}>
              <Box sx={{ mb: 4 }}>
                <Stepper
                  activeStep={activeStep}
                  sx={{
                    '& .MuiStepLabel-root .Mui-completed': {
                      color: '#6bcf7f',
                    },
                    '& .MuiStepLabel-root .Mui-active': {
                      color: '#667eea',
                    },
                    '& .MuiStepLabel-root': {
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                    '& .MuiStepLabel-label': {
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 500,
                      '&.Mui-active': {
                        color: 'white',
                        fontWeight: 600,
                      },
                      '&.Mui-completed': {
                        color: 'rgba(255, 255, 255, 0.9)',
                      },
                    },
                    '& .MuiStepConnector-line': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel
                        StepIconComponent={({ active, completed }) => (
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: completed
                                ? 'linear-gradient(135deg, #6bcf7f 0%, #4caf50 100%)'
                                : active
                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                : 'rgba(255, 255, 255, 0.2)',
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {completed ? <CheckCircle sx={{ fontSize: 20 }} /> : index + 1}
                          </Box>
                        )}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Slide>

            {/* Form Section */}
            <Slide direction="up" in={animationStage >= 3} timeout={1000}>
              <Box component="form" onSubmit={activeStep === steps.length - 1 ? handleSubmit : undefined}>
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
                        color: 'white',
                        '& .MuiAlert-icon': {
                          color: '#ff6b6b',
                        }
                      }}
                    >
                      {generalError}
                    </Alert>
                  </Fade>
                )}

                <Box sx={{ minHeight: '300px', mb: 4 }}>
                  {getStepContent(activeStep)}
                </Box>

                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    startIcon={<ArrowBack />}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '12px',
                      px: 3,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&.Mui-disabled': {
                        color: 'rgba(255, 255, 255, 0.3)',
                      },
                    }}
                  >
                    Back
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      startIcon={!isSubmitting && <PersonAdd />}
                      sx={{
                        py: 2,
                        px: 4,
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
                        'Create Account'
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      endIcon={<ArrowForward />}
                      sx={{
                        py: 2,
                        px: 4,
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
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Box>

                {activeStep === 0 && (
                  <>
                    <Divider sx={{ my: 4 }}>
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

                    {/* Social Registration Buttons */}
                    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
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
                  </>
                )}

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}
                  >
                    Already have an account?
                  </Typography>
                  
                  <Button
                    component={RouterLink}
                    to="/login"
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
                    Sign In Instead
                  </Button>
                </Box>
              </Box>
            </Slide>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

export default Register;