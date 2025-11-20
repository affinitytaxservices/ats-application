import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a base theme first to avoid the reference error
let baseTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const premiumPalette = {
  primary: {
    main: '#2E5077',
    light: '#4A6A8E',
    dark: '#24405F',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#6C757D',
    light: '#868E96',
    dark: '#495057',
    contrastText: '#FFFFFF',
  },
  accent: {
    purple: '#E5E7EB',
    pink: '#F3E0E7',
    orange: '#F8E9C8',
    cyan: '#E6F3F7',
    gold: '#F5F2E8',
    rose: '#F8E4E4',
  },
  text: {
    primary: '#111827',
    secondary: '#1F2937',
    disabled: '#6B7280',
    hint: '#9CA3AF',
  },
  background: {
    default: '#F7F9FC',
    paper: '#FFFFFF',
    gradient: 'linear-gradient(0deg, #F7F9FC, #F7F9FC)',
    cardGradient: 'linear-gradient(0deg, #FFFFFF, #FFFFFF)',
    heroGradient: 'linear-gradient(0deg, #F7F9FC, #F7F9FC)',
    premiumGradient: 'linear-gradient(0deg, #F7F9FC, #F7F9FC)',
  },
  error: {
    main: '#F87171',
    light: '#FCA5A5',
    dark: '#EF4444',
  },
  warning: {
    main: '#FBBF24',
    light: '#FCD34D',
    dark: '#F59E0B',
  },
  success: {
    main: '#34D399',
    light: '#6EE7B7',
    dark: '#10B981',
  },
  info: {
    main: '#60A5FA',
    light: '#93C5FD',
    dark: '#3B82F6',
  },
};

// Create a responsive theme with premium design tokens
let theme = createTheme({
  ...baseTheme,
  spacing: (factor) => `${0.25 * factor}rem`,
  palette: premiumPalette,
  typography: {
    fontFamily: '"Quicksand", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 700,
      fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#2E5077',
    },
    h2: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#2E5077',
    },
    h3: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#1F2937',
    },
    h4: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
      lineHeight: 1.4,
      color: '#6B7280',
    },
    h5: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
      lineHeight: 1.5,
      color: '#6B7280',
    },
    h6: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      lineHeight: 1.5,
      color: '#6B7280',
    },
    body1: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
      color: '#1F2937',
    },
    body2: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01071em',
      color: '#1F2937',
    },
    button: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 20,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.12)',
    '0px 16px 32px rgba(0, 0, 0, 0.15)',
    '0px 20px 40px rgba(0, 0, 0, 0.18)',
    '0px 24px 48px rgba(0, 0, 0, 0.2)',
    '0px 32px 64px rgba(0, 0, 0, 0.25)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 48px 96px rgba(0, 0, 0, 0.35)',
    '0px 56px 112px rgba(0, 0, 0, 0.4)',
    '0px 64px 128px rgba(0, 0, 0, 0.45)',
    '0px 72px 144px rgba(0, 0, 0, 0.5)',
    '0px 80px 160px rgba(0, 0, 0, 0.55)',
    '0px 88px 176px rgba(0, 0, 0, 0.6)',
    '0px 96px 192px rgba(0, 0, 0, 0.65)',
    '0px 104px 208px rgba(0, 0, 0, 0.7)',
    '0px 112px 224px rgba(0, 0, 0, 0.75)',
    '0px 120px 240px rgba(0, 0, 0, 0.8)',
    '0px 128px 256px rgba(0, 0, 0, 0.85)',
    '0px 136px 272px rgba(0, 0, 0, 0.9)',
    '0px 144px 288px rgba(0, 0, 0, 0.95)',
    '0px 152px 304px rgba(0, 0, 0, 1)',
    '0px 160px 320px rgba(0, 0, 0, 1)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#F7F9FC',
          backgroundAttachment: 'scroll',
          minHeight: '100vh',
          overflowX: 'hidden',
          position: 'relative',
        },
        '*': {
          scrollBehavior: 'smooth',
        },
        '::selection': {
          backgroundColor: 'rgba(46, 80, 119, 0.2)',
          color: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '16px 40px',
          fontSize: '1rem',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
            transition: 'left 0.8s ease',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'inherit',
            filter: 'blur(0px)',
            zIndex: -1,
          },
        },
        containedPrimary: {
          background: '#2E5077',
          border: '1px solid rgba(46, 80, 119, 0.3)',
          color: '#FFFFFF',
          boxShadow: '0 6px 20px rgba(46, 80, 119, 0.3)',
          '&:hover': {
            background: '#24405F',
            border: '1px solid rgba(46, 80, 119, 0.5)',
            boxShadow: '0 10px 30px rgba(46, 80, 119, 0.4)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            boxShadow: '0 4px 15px rgba(46, 80, 119, 0.3)',
            transform: 'translateY(0)',
          },
        },
        containedSecondary: {
          background: '#6C757D',
          border: '1px solid rgba(108, 117, 125, 0.3)',
          color: '#FFFFFF',
          boxShadow: '0 6px 20px rgba(108, 117, 125, 0.3)',
          '&:hover': {
            background: '#495057',
            border: '1px solid rgba(108, 117, 125, 0.5)',
            boxShadow: '0 10px 30px rgba(108, 117, 125, 0.4)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            boxShadow: '0 4px 15px rgba(108, 117, 125, 0.3)',
            transform: 'translateY(0)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: 'rgba(46, 80, 119, 0.3)',
          color: '#2E5077',
          background: 'transparent',
          boxShadow: 'none',
          '&:hover': {
            borderColor: 'rgba(46, 80, 119, 0.5)',
            background: 'rgba(46, 80, 119, 0.06)',
            color: '#24405F',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        text: {
          color: '#2E5077',
          background: 'transparent',
          border: '1px solid transparent',
          '&:hover': {
            background: 'rgba(46, 80, 119, 0.06)',
            border: '1px solid rgba(46, 80, 119, 0.15)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            background: 'transparent',
            transition: 'border-color 0.2s ease',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(46, 80, 119, 0.3)',
              borderWidth: '1px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(46, 80, 119, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2E5077',
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: '#EF4444',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#475569',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#2E5077',
            },
            '&.Mui-error': {
              color: '#EF4444',
            },
          },
          '& .MuiFormHelperText-root': {
            marginTop: '8px',
            fontSize: '0.875rem',
            fontWeight: 500,
            '&.Mui-error': {
              color: '#EF4444',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 35px 100px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-5px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.12)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #1e40af, #1e3a8a, #1e293b)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            boxShadow: '0 40px 120px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-8px) scale(1.02)',
            '&::before': {
              opacity: 1,
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          fontWeight: 500,
          backdropFilter: 'blur(10px)',
          '& .MuiAlert-icon': {
            fontSize: '1.5rem',
          },
        },
        standardError: {
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#DC2626',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
        standardSuccess: {
          background: 'rgba(16, 185, 129, 0.15)',
          color: '#059669',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        },
        standardInfo: {
          background: 'rgba(59, 130, 246, 0.15)',
          color: '#2563EB',
          border: '1px solid rgba(59, 130, 246, 0.3)',
        },
        standardWarning: {
          background: 'rgba(245, 158, 11, 0.15)',
          color: '#D97706',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          height: '10px',
          background: 'rgba(46, 80, 119, 0.12)',
          '& .MuiLinearProgress-bar': {
            borderRadius: '12px',
            background: '#2E5077',
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          background: 'transparent',
          padding: '32px 0',
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          fontSize: '2rem',
          '&.Mui-active': {
            color: '#2E5077',
          },
          '&.Mui-completed': {
            color: '#10B981',
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: '1rem',
          fontWeight: 500,
          '&.Mui-active': {
            color: '#2E5077',
            fontWeight: 600,
          },
          '&.Mui-completed': {
            color: '#10B981',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          transition: 'all 0.3s ease',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '&:hover': {
            background: 'rgba(46, 80, 119, 0.12)',
            border: '1px solid rgba(46, 80, 119, 0.2)',
            boxShadow: '0 8px 25px rgba(46, 80, 119, 0.15)',
            transform: 'translateY(-2px) scale(1.05)',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#6B7280',
          '&.Mui-checked': {
            color: '#2E5077',
          },
          '&:hover': {
            background: 'rgba(46, 80, 119, 0.08)',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.95rem',
          fontWeight: 500,
          color: '#374151',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(46, 80, 119, 0.15)',
          '&::before, &::after': {
            borderColor: 'rgba(46, 80, 119, 0.15)',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          '& .MuiListItemText-primary': { color: '#111827' },
          '& .MuiListItemText-secondary': { color: '#1F2937' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          fontWeight: 500,
          background: 'rgba(46, 80, 119, 0.12)',
          color: '#2E5077',
          border: '1px solid rgba(46, 80, 119, 0.25)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            background: 'rgba(46, 80, 119, 0.18)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(46, 80, 119, 0.2)',
          },
        },
      },
    },
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  factor: 2,
});

export default theme;