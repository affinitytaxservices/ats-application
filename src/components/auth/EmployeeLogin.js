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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Work,
  AdminPanelSettings,
  AccountBalance,
  Person,
  ArrowBack,
  Security,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

function EmployeeLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    employeeType: 'preparer',
    employeeId: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const employeeTypes = [
    { value: 'preparer', label: 'Tax Preparer', icon: <AccountBalance />, color: '#10B981' },
    { value: 'admin', label: 'Administrator', icon: <AdminPanelSettings />, color: '#6366F1' },
    { value: 'manager', label: 'Manager', icon: <Work />, color: '#8B5CF6' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    } else if (formData.employeeId.length < 3) {
      newErrors.employeeId = 'Employee ID must be at least 3 characters';
    }

    if (!formData.employeeType) {
      newErrors.employeeType = 'Please select your role';
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
      // Add employee-specific login logic here
      const loginData = {
        ...formData,
        userType: 'employee',
        role: formData.employeeType,
      };

      const success = await login(loginData);
      if (success) {
        // Navigate based on employee type
        switch (formData.employeeType) {
          case 'admin':
            navigate('/admin');
            break;
          case 'manager':
            navigate('/manager-dashboard');
            break;
          case 'preparer':
            navigate('/preparer-dashboard');
            break;
          default:
            navigate('/employee-dashboard');
        }
      } else {
        setGeneralError('Invalid credentials. Please check your information and try again.');
      }
    } catch (error) {
      setGeneralError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedEmployeeType = employeeTypes.find(type => type.value === formData.employeeType);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%)',
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
          x: [0, 150, 0],
          y: [0, -100, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '120px',
          height: '120px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 120, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: '180px',
          height: '180px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%',
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
              boxShadow: '0 40px 100px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Header */}
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
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 20px 40px rgba(30, 58, 138, 0.4)',
                  }}
                >
                  <Security sx={{ fontSize: 40, color: 'white' }} />
                </Box>
              </motion.div>
              
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #581c87 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Employee Portal
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: '#6B7280',
                  fontWeight: 500,
                }}
              >
                Secure access for tax professionals and administrators
              </Typography>
            </Box>

            {/* Form */}
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

              <Stack spacing={3}>
                {/* Employee Type Selection */}
                <FormControl fullWidth error={!!errors.employeeType}>
                  <InputLabel>Employee Role</InputLabel>
                  <Select
                    name="employeeType"
                    value={formData.employeeType}
                    onChange={handleChange}
                    label="Employee Role"
                    sx={{
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {employeeTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ color: type.color }}>{type.icon}</Box>
                          <Typography>{type.label}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.employeeType && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                      {errors.employeeType}
                    </Typography>
                  )}
                </FormControl>

                {/* Employee ID */}
                <TextField
                  fullWidth
                  label="Employee ID"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  error={!!errors.employeeId}
                  helperText={errors.employeeId}
                  autoComplete="username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: selectedEmployeeType?.color || '#6B7280' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                    },
                  }}
                />

                {/* Email */}
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
                        <Email sx={{ color: selectedEmployeeType?.color || '#6B7280' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                    },
                  }}
                />

                {/* Password */}
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
                        <Lock sx={{ color: selectedEmployeeType?.color || '#6B7280' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: selectedEmployeeType?.color || '#6B7280' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                    },
                  }}
                />

                {/* Role Information */}
                {selectedEmployeeType && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${selectedEmployeeType.color}15 0%, ${selectedEmployeeType.color}08 100%)`,
                        border: `1px solid ${selectedEmployeeType.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <Box sx={{ color: selectedEmployeeType.color }}>
                        {selectedEmployeeType.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: selectedEmployeeType.color }}>
                          {selectedEmployeeType.label} Access
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6B7280' }}>
                          {selectedEmployeeType.value === 'admin' && 'Full system administration privileges'}
                          {selectedEmployeeType.value === 'manager' && 'Team management and oversight capabilities'}
                          {selectedEmployeeType.value === 'preparer' && 'Tax preparation and client management tools'}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : selectedEmployeeType?.icon}
                  sx={{
                    py: 2,
                    borderRadius: '12px',
                    background: selectedEmployeeType 
                      ? `linear-gradient(135deg, ${selectedEmployeeType.color} 0%, ${selectedEmployeeType.color}CC 100%)`
                      : 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    boxShadow: `0 8px 32px ${selectedEmployeeType?.color || '#1e3a8a'}40`,
                    '&:hover': {
                      background: selectedEmployeeType 
                        ? `linear-gradient(135deg, ${selectedEmployeeType.color}DD 0%, ${selectedEmployeeType.color}AA 100%)`
                        : 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 12px 40px ${selectedEmployeeType?.color || '#1e3a8a'}50`,
                    },
                    '&:disabled': {
                      background: 'rgba(107, 114, 128, 0.5)',
                      transform: 'none',
                    },
                  }}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In to Portal'}
                </Button>
              </Stack>

              <Divider sx={{ my: 4 }}>
                <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                  Need help?
                </Typography>
              </Divider>

              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    borderColor: '#E5E7EB',
                    color: '#6B7280',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#1e3a8a',
                      background: 'rgba(30, 58, 138, 0.05)',
                      color: '#1e3a8a',
                    },
                  }}
                >
                  Contact IT Support
                </Button>

                <Button
                  component={RouterLink}
                  to="/login"
                  variant="text"
                  startIcon={<ArrowBack />}
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    color: '#6B7280',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'rgba(107, 114, 128, 0.1)',
                      color: '#1e3a8a',
                    },
                  }}
                >
                  Back to Client Login
                </Button>
              </Stack>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default EmployeeLogin;