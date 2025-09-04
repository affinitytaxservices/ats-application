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

// Create a responsive theme with breakpoints for mobile optimization
let theme = createTheme({
  ...baseTheme,
  palette: {
    primary: {
      main: '#10B981', // Light green for freshness and growth
      light: '#34D399',
      dark: '#059669',
    },
    secondary: {
      main: '#A7F3D0', // Lighter green for secondary elements
      light: '#D1FAE5',
      dark: '#6EE7B7',
    },
    accent: {
      amber: '#22C55E', // Green accent for calls-to-action
      indigo: '#16A34A', // Darker green for visual interest
    },
    text: {
      primary: '#2D1B0E', // Dark brown for high contrast and readability
      secondary: '#5D4037', // Medium brown for secondary text
      heading: '#1A0E0A', // Darker brown for headings
      feature: '#10B981', // Green for feature text
      highlight: '#16A34A', // Darker green for highlighted text
      disabled: 'rgba(45, 27, 14, 0.6)', // Disabled text
      hero: '#FFFFFF', // White for hero section text
    },
    background: {
      default: '#F0FDF4', // Light green-tinted background
      paper: 'transparent', // Transparent for cards and content areas
      light: '#ECFDF5', // Lighter green for alternate sections
      dark: '#2D1B0E', // Dark brown for contrast sections
    },
    sections: {
      hero: {
        text: '#FFFFFF',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(45, 27, 14, 0.98) 100%)',
      },
      services: {
        text: '#2D1B0E',
        background: '#F0FDF4',
        card: 'transparent',
      },
      updates: {
        text: '#2D1B0E',
        background: 'transparent',
        card: '#ECFDF5',
      },
      features: {
        text: '#10B981',
        background: '#F0FDF4',
        highlight: '#059669',
      },
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      letterSpacing: '0',
    },
    h4: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      letterSpacing: '0',
    },
    h6: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.01071em',
    },
    button: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
    caption: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'transparent',
          minHeight: '100vh',
          overflowX: 'hidden',
        },
        // Add responsive font sizing
        html: {
          fontSize: '16px',
          [baseTheme.breakpoints.down('sm')]: {
            fontSize: '14px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '14px 28px',
          background: 'linear-gradient(135deg, #10B981 0%, #16A34A 100%)',
          color: 'white',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover': {
            background: 'linear-gradient(135deg, #16A34A 0%, #10B981 100%)',
            transform: 'translateY(-3px) scale(1.02)',
            boxShadow: '0 12px 35px rgba(16, 185, 129, 0.4), 0 0 20px rgba(22, 163, 74, 0.2)',
            '&::before': {
              left: '100%',
            },
          },
          '&:active': {
            transform: 'translateY(-1px) scale(0.98)',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
          '&:hover': {
            background: 'linear-gradient(90deg, #059669 0%, #10B981 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(90deg, #A7F3D0 0%, #D1FAE5 100%)',
          color: '#2D1B0E',
          '&:hover': {
            background: 'linear-gradient(90deg, #6EE7B7 0%, #A7F3D0 100%)',
          },
        },
        outlinedPrimary: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
        outlined: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(16, 185, 129, 0.3)',
          color: '#10B981',
          '&:hover': {
            background: 'rgba(16, 185, 129, 0.1)',
            border: '2px solid rgba(16, 185, 129, 0.6)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.2)',
          },
        },
        text: {
           color: '#10B981',
           '&:hover': {
             background: 'rgba(16, 185, 129, 0.08)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(45, 27, 14, 0.85)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          '&.footer': {
            background: 'linear-gradient(45deg, rgba(45, 27, 14, 0.98) 0%, rgba(16, 185, 129, 0.95) 100%)',
            backdropFilter: 'blur(15px)',
            borderTop: '1px solid rgba(16, 185, 129, 0.2)',
             boxShadow: '0 -2px 10px rgba(16, 185, 129, 0.1)',
            '& .MuiLink-root': {
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#34D399',
                transform: 'translateY(-2px)',
              }
            },
            '& .MuiIconButton-root': {
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#34D399',
                transform: 'scale(1.1)',
              }
            },
            '& .footer-section': {
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                '& .MuiTypography-root': {
                  color: '#34D399',
                }
              }
            }
          }
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '&.footer-container': {
            background: 'linear-gradient(to right, rgba(45, 27, 14, 0.98) 0%, rgba(16, 185, 129, 0.95) 100%)',
            color: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(15px)',
            borderTop: '1px solid rgba(16, 185, 129, 0.2)',
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': {
              borderColor: 'rgba(16, 185, 129, 0.2)',
              borderWidth: '2px',
            },
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.08)',
              transform: 'translateY(-1px)',
              '& fieldset': {
                borderColor: 'rgba(16, 185, 129, 0.4)',
                 boxShadow: '0 4px 15px rgba(16, 185, 129, 0.1)',
              },
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 0.1)',
              transform: 'translateY(-2px)',
              '& fieldset': {
                borderColor: '#10B981',
                 boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1), 0 8px 25px rgba(16, 185, 129, 0.15)',
              },
            },
            '& input': {
              color: '#ffffff',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.6)',
              },
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#34D399',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-focused': {
              color: '#10B981',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          },
        },
        elevation1: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.15)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          background: 'transparent',
          padding: '24px 0',
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        root: {
          '& .MuiStepLabel-root': {
            '& .MuiStepLabel-label': {
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 500,
              '&.Mui-active': {
                color: '#10B981',
                fontWeight: 600,
              },
              '&.Mui-completed': {
                color: 'rgba(255, 255, 255, 0.9)',
              },
            },
          },
          '& .MuiStepIcon-root': {
            color: 'rgba(255, 255, 255, 0.3)',
            '&.Mui-active': {
              color: '#10B981',
            },
            '&.Mui-completed': {
              color: '#34D399',
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          '& .MuiLinearProgress-bar': {
            borderRadius: '10px',
            background: 'linear-gradient(90deg, #10B981, #16A34A)',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.6)',
          '&.Mui-checked': {
            color: '#10B981',
          },
          '&:hover': {
            background: 'rgba(16, 185, 129, 0.1)',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.9rem',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
          '&::before, &::after': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        standardError: {
          background: 'rgba(244, 67, 54, 0.1)',
          color: '#ff6b6b',
          '& .MuiAlert-icon': {
            color: '#ff6b6b',
          },
        },
        standardSuccess: {
           background: 'rgba(16, 185, 129, 0.1)',
           color: '#10B981',
           '& .MuiAlert-icon': {
             color: '#10B981',
           },
         },
      },
    },
  }
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  factor: 2,
});

export default theme;