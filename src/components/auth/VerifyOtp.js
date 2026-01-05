import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, Stack } from '@mui/material';
import { authAPI } from '../../services/api';

function VerifyOtp() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!/^\d{6}$/.test(code)) {
      setError('Please enter the 6-digit code');
      return;
    }
    setLoading(true);
    try {
      const res = await authAPI.verifyOtp(code);
      if (res?.success) {
        setSuccess('Email verified. Redirecting...');
        setTimeout(() => { window.location.href = '/dashboard'; }, 1000);
      }
    } catch (err) {
      setError(err.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');
    setResendLoading(true);
    try {
      await authAPI.resendOtp();
      setSuccess('A new code has been sent');
    } catch (err) {
      setError(err.error || 'Failed to resend code');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper sx={{ p: 4, maxWidth: 420, width: '100%', border: '1px solid #E5E7EB', borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Verify your email</Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#6B7280' }}>
          Enter the 6-digit code sent to your email. The code expires in 15 minutes.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleVerify}>
          <Stack spacing={2}>
            <TextField
              label="Verification code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0,6))}
              inputProps={{ inputMode: 'numeric', pattern: '\\d{6}', maxLength: 6 }}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
            <Button variant="text" onClick={handleResend} disabled={resendLoading}>
              {resendLoading ? 'Resending...' : 'Resend code'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default VerifyOtp;

