import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  Paper,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  IconButton,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { fadeIn, slideUp, scaleUp } from '../../styles/animations';

function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
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
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const steps = ['Personal Information', 'Account Security', 'Additional Details'];
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  // Handle animation completion on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []); // Empty dependency array - runs only once on mount
  
  // Calculate password strength
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    
    // Length check
    if (formData.password.length >= 8) strength += 25;
    
    // Contains uppercase
    if (/[A-Z]/.test(formData.password)) strength += 25;
    
    // Contains number
    if (/[0-9]/.test(formData.password)) strength += 25;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
    
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (activeStep === 0) {
      // Validate personal information
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
    } else if (activeStep === 1) {
      // Validate account security
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
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateCurrentStep()) {
      setIsSubmitting(true);
      setGeneralError('');
      
      try {
        const result = await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          address: formData.address
        });
        
        if (result.success) {
          // Navigate to login after successful registration
          navigate('/login');
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
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'error.main';
    if (passwordStrength < 50) return 'warning.main';
    if (passwordStrength < 75) return 'info.main';
    return 'success.main';
  };
  
  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  // Render different form content based on active step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
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
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 12px rgba(56, 178, 172, 0.25)'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500
                  },
                  '& .MuiInputBase-input': {
                    padding: '14px 14px 14px 0'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
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
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 12px rgba(56, 178, 172, 0.25)'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500
                  },
                  '& .MuiInputBase-input': {
                    padding: '14px 14px 14px 0'
                  }
                }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 12px rgba(56, 178, 172, 0.25)'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500
                  },
                  '& .MuiInputBase-input': {
                    padding: '14px 14px 14px 0'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
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
                      <LockOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 12px rgba(56, 178, 172, 0.25)'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500
                  },
                  '& .MuiInputBase-input': {
                    padding: '14px 14px 14px 0'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ width: '100%', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Password Strength:
                  </Typography>
                  <Typography variant="caption" color={getPasswordStrengthColor()}>
                    {getPasswordStrengthLabel()}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={passwordStrength} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 5,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getPasswordStrengthColor(),
                    }
                  }} 
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
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
                      <LockOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={toggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 12px rgba(56, 178, 172, 0.25)'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500
                  },
                  '& .MuiInputBase-input': {
                    padding: '14px 14px 14px 0'
                  }
                }}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number (Optional)"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 12px rgba(56, 178, 172, 0.25)'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500
                  },
                  '& .MuiInputBase-input': {
                    padding: '14px 14px 14px 0'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address (Optional)"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={3}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 12px rgba(56, 178, 172, 0.25)'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 500
                  },
                  '& .MuiInputBase-input': {
                    padding: '14px 14px 14px 0'
                  }
                }}
              />
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ 
      animation: `${fadeIn} 0.8s ease-out`,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4,
      background: 'linear-gradient(135deg, rgba(46, 80, 119, 0.05) 0%, rgba(56, 178, 172, 0.05) 100%)',
      '& .MuiPaper-root': {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }
    }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          animation: animationComplete ? `${scaleUp} 0.5s ease-out` : 'none',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '5px',
            background: 'linear-gradient(90deg, #2E5077 0%, #38B2AC 100%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '5px',
            background: 'linear-gradient(90deg, #38B2AC 0%, #2E5077 100%)',
          }
        }}
      >
        <Avatar sx={{ 
          m: 1, 
          bgcolor: 'secondary.main',
          transform: 'scale(1.2)',
          boxShadow: '0 4px 20px rgba(56, 178, 172, 0.3)',
          animation: `${scaleUp} 0.5s ease-out`,
          '&:hover': {
            transform: 'scale(1.3) rotate(360deg)',
            transition: 'transform 0.5s ease-in-out'
          }
        }}>
          <LockOutlinedIcon />
        </Avatar>
        
        <Typography
          component="h1" 
          variant="h5" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            letterSpacing: '0.5px',
            mb: 3,
            animation: `${slideUp} 0.6s ease-out`,
            position: 'relative',
            color: '#2E5077',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              background: 'linear-gradient(90deg, #2E5077 0%, #38B2AC 100%)',
              borderRadius: '2px',
              animation: `${scaleUp} 0.8s ease-out`
            }
          }}
        >
          Create Your Account
        </Typography>
        
        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            width: '100%', 
            mb: 4, 
            animation: `${slideUp} 0.7s ease-out`,
            '& .MuiStepLabel-root .Mui-active': {
              color: '#38B2AC',
            },
            '& .MuiStepLabel-root .Mui-completed': {
              color: '#2E5077',
            },
            '& .MuiStepConnector-line': {
              borderColor: 'rgba(46, 80, 119, 0.2)',
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box
          component="form" 
          sx={{ 
            mt: 1, 
            width: '100%',
            animation: `${slideUp} 0.8s ease-out`,
            opacity: animationComplete ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          {generalError && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                animation: `${fadeIn} 0.3s ease-out`,
                '& .MuiAlert-icon': {
                  fontSize: '1.5rem'
                }
              }}
            >
              {generalError}
            </Alert>
          )}
          
          {getStepContent(activeStep)}
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: 3,
            gap: 2
          }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              sx={{ 
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                px: 3,
                py: 1,
                '&:hover': {
                  transform: 'translateX(-5px)',
                  backgroundColor: 'rgba(46, 80, 119, 0.08)'
                }
              }}
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                type="button"
                variant="contained"
                onClick={handleSubmit}
                disabled={isSubmitting}
                sx={{ 
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(56, 178, 172, 0.3)',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(90deg, #2E5077 0%, #38B2AC 100%)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(56, 178, 172, 0.4)',
                    background: 'linear-gradient(90deg, #38B2AC 0%, #2E5077 100%)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(90deg, #2E5077 0%, #38B2AC 100%)',
                    opacity: 0.7
                  }
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Complete Registration'
                )}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  py: 1.5,
                  px: 4,
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(56, 178, 172, 0.3)',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(90deg, #2E5077 0%, #38B2AC 100%)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(56, 178, 172, 0.4)',
                    background: 'linear-gradient(90deg, #38B2AC 0%, #2E5077 100%)',
                  }
                }}
              >
                Next
              </Button>
            )}
          </Box>
          
          <Grid container justifyContent="center" sx={{ mt: 4 }}>
            <Grid item>
              <Link 
                component={RouterLink} 
                to="/login" 
                variant="body2" 
                sx={{
                  color: 'secondary.main',
                  textDecoration: 'none',
                  display: 'inline-block',
                  fontSize: '1rem',
                  fontWeight: 600,
                  padding: '8px 16px',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  background: 'rgba(16, 185, 129, 0.05)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  '&:hover': { 
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    textDecoration: 'none',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.5)',
                    color: 'secondary.dark'
                  }
                }}
              >
                Already have an account? <strong>Sign in</strong>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;