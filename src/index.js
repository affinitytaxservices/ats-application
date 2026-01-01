import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import theme from './styles/theme';
import App from './App';  // Import using correct case-sensitive filename
import ErrorBoundary from './components/common/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { TaskManagementProvider } from './contexts/TaskManagementContext';

// Dev-only: preload JWT token from env to localStorage for quick testing
if (process.env.NODE_ENV !== 'production') {
  const devToken = process.env.REACT_APP_DEV_AUTH_TOKEN;
  if (devToken) {
    try {
      localStorage.setItem('auth_token', devToken);
      // optional: store minimal user data so UI can render protected routes
      const devUser = { id: 1, email: 'user@example.com', role: 'admin' };
      localStorage.setItem('user_data', JSON.stringify(devUser));
      // eslint-disable-next-line no-console
      console.log('[Dev Auth] Preloaded auth_token from REACT_APP_DEV_AUTH_TOKEN');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[Dev Auth] Failed to preload token:', e);
    }
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <TaskManagementProvider>
              <App />
            </TaskManagementProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);