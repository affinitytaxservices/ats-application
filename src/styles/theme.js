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

// Premium color palette with sophisticated gradients and enhanced accessibility
const premiumPalette = {
  primary: {
    main: '#A78BFA', // Light Purple
    light: '#C4B5FD',
    dark: '#8B5CF6',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#6EE7B7', // Light Emerald
    light: '#A7F3D0',
    dark: '#34D399',
    contrastText: '#FFFFFF',
  },
  accent: {
    purple: '#DDD6FE',
    pink: '#F9A8D4',
    orange: '#FDE68A',
    cyan: '#A5F3FC',
    gold: '#FEF3C7',
    rose: '#FECACA',
  },
  text: {
    primary: '#374151',
    secondary: '#6B7280',
    disabled: '#D1D5DB',
    hint: '#E5E7EB',
  },
  background: {
    default: 'linear-gradient(135deg, #F3E8FF 0%, #E0E7FF 50%, #DBEAFE 100%)',
    paper: 'rgba(255, 255, 255, 0.98)',
    gradient: 'linear-gradient(135deg, #F3E8FF 0%, #E0E7FF 50%, #DBEAFE 100%)',
    cardGradient: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
    heroGradient: 'linear-gradient(135deg, #F3E8FF 0%, #E0E7FF 50%, #DBEAFE 100%)',
    premiumGradient: 'linear-gradient(135deg, #F3E8FF 0%, #E0E7FF 25%, #DBEAFE 50%, #F0F9FF 75%, #ECFDF5 100%)',
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
      fontFamily: '"Dancing Script", cursive',
      fontWeight: 700,
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
      background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 50%, #6366F1 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 4px 8px rgba(167, 139, 250, 0.3)',
    },
    h2: {
      fontFamily: '"Dancing Script", cursive',
      fontWeight: 600,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h3: {
      fontFamily: '"Comfortaa", cursive',
      fontWeight: 600,
      fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#6B7280',
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
      color: '#6B7280',
    },
    body2: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01071em',
      color: '#6B7280',
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
          background: 'linear-gradient(135deg, #F3E8FF 0%, #E0E7FF 50%, #DBEAFE 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          overflowX: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(167, 139, 250, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(196, 181, 253, 0.2) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(219, 234, 254, 0.2) 0%, transparent 50%)',
            zIndex: -1,
            pointerEvents: 'none',
          },
        },
        '*': {
          scrollBehavior: 'smooth',
        },
        '::selection': {
          backgroundColor: 'rgba(99, 102, 241, 0.3)',
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
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          color: '#FFFFFF',
          boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          '&::after': {
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.95) 0%, rgba(139, 92, 246, 0.95) 100%)',
          },
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.95) 0%, rgba(124, 58, 237, 0.95) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.5)',
            boxShadow: '0 20px 60px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            transform: 'translateY(-3px) scale(1.02)',
            '&::after': {
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 1) 0%, rgba(124, 58, 237, 1) 100%)',
            },
          },
          '&:active': {
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-1px) scale(1.01)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(6, 182, 212, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#FFFFFF',
          boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          '&::after': {
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(6, 182, 212, 0.95) 100%)',
          },
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.95) 0%, rgba(8, 145, 178, 0.95) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.5)',
            boxShadow: '0 20px 60px rgba(16, 185, 129, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            transform: 'translateY(-3px) scale(1.02)',
            '&::after': {
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 1) 0%, rgba(8, 145, 178, 1) 100%)',
            },
          },
          '&:active': {
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-1px) scale(1.01)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: 'rgba(99, 102, 241, 0.4)',
          color: '#6366F1',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          '&:hover': {
            borderColor: 'rgba(99, 102, 241, 0.8)',
            background: 'rgba(99, 102, 241, 0.1)',
            color: '#4F46E5',
            boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-3px) scale(1.02)',
          },
          '&:active': {
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-1px) scale(1.01)',
          },
        },
        text: {
          color: '#6366F1',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.25)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: 'rgba(99, 102, 241, 0.3)',
              borderWidth: '2px',
            },
            '&:hover': {
              background: 'rgba(255, 255, 255, 1)',
              '& fieldset': {
                borderColor: 'rgba(99, 102, 241, 0.5)',
              },
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 1)',
              '& fieldset': {
                borderColor: '#6366F1',
                boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.15)',
              },
            },
            '&.Mui-error': {
              '& fieldset': {
                borderColor: '#EF4444',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: '#475569',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#6366F1',
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
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '4px 8px',
              borderRadius: '8px',
              marginTop: '8px',
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
          background: 'rgba(99, 102, 241, 0.15)',
          '& .MuiLinearProgress-bar': {
            borderRadius: '12px',
            background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #EC4899)',
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
            color: '#6366F1',
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
            color: '#6366F1',
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
            background: 'rgba(99, 102, 241, 0.2)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
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
            color: '#6366F1',
          },
          '&:hover': {
            background: 'rgba(99, 102, 241, 0.1)',
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
          borderColor: 'rgba(99, 102, 241, 0.2)',
          '&::before, &::after': {
            borderColor: 'rgba(99, 102, 241, 0.2)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          fontWeight: 500,
          background: 'rgba(99, 102, 241, 0.15)',
          color: '#6366F1',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            background: 'rgba(99, 102, 241, 0.25)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
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