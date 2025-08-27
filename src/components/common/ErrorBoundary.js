import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { trackError } from '../../services/errorTracking';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    
    // Track error with additional context
    trackError(error, {
      componentStack: errorInfo.componentStack,
      pathname: window.location.pathname,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              p: 3,
              textAlign: 'center',
              gap: 2
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
            <Typography variant="h4" gutterBottom color="error">
              Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We apologize for the inconvenience. Please try refreshing the page.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;