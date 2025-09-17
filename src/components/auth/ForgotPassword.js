import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  CircularProgress,
  Container,
  Paper,
  Stack,
} from '@mui/material';
import {
  Email,
  ArrowBack,
  Send,
  CheckCircle,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setErrors({});

    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsEmailSent(true);
    } catch (error) {
      setGeneralError('Failed to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({});
    }
  };

  if (isEmailSent) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Paper
              elevation={24}
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
              }}
            >
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
                    background: 'rgba(16, 185, 129, 0.15)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 20px 40px rgba(16, 185, 129, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(52, 211, 153, 0.8) 100%)',
                      borderRadius: '50%',
                      zIndex: -1,
                    },
                  }}
                >
                  <CheckCircle sx={{ fontSize: 40, color: 'white' }} />
                </Box>
              </motion.div>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Check Your Email
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#6B7280',
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your inbox and follow the instructions to reset your password.
              </Typography>

              <Stack spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/login')}
                  startIcon={<ArrowBack />}
                  sx={{
                    py: 2,
                    borderRadius: '16px',
                    fontWeight: 600,
                    textTransform: 'none',
                  }}
                >
                  Back to Login
                </Button>

                <Button
                  variant="text"
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail('');
                  }}
                  sx={{
                    color: '#6B7280',
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Try different email
                </Button>
              </Stack>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
  }

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
                    background: 'rgba(99, 102, 241, 0.15)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.8) 100%)',
                      borderRadius: '50%',
                      zIndex: -1,
                    },
                  }}
                >
                  <Email sx={{ fontSize: 40, color: 'white' }} />
                </Box>
              </motion.div>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Forgot Password?
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#6B7280',
                  fontWeight: 500,
                }}
              >
                No worries! Enter your email and we'll send you reset instructions.
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

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#6366F1' }} />
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <Send />}
                sx={{
                  py: 2.5,
                  mb: 3,
                  borderRadius: '16px',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4)',
                  },
                  '&:disabled': {
                    background: 'rgba(99, 102, 241, 0.5)',
                    transform: 'none',
                  },
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  startIcon={<ArrowBack />}
                  sx={{
                    color: '#6B7280',
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      background: 'rgba(99, 102, 241, 0.1)',
                    },
                  }}
                >
                  Back to Login
                </Button>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default ForgotPassword;