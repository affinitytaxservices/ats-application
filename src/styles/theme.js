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
  spacing: (factor) => `${0.25 * factor}rem`, // 4px base unit
  palette: {
    primary: {
      main: '#E8E8E8', // Soft light gray
      light: '#F5F5F5',
      dark: '#D0D0D0',
    },
    secondary: {
      main: '#F0F0F0', // Very light gray for secondary elements
      light: '#F8F8F8',
      dark: '#E0E0E0',
    },
    accent: {
      amber: '#F5F5F5', // Subtle light accent
      indigo: '#EEEEEE', // Gentle gray for visual interest
    },
    text: {
      primary: '#6B7280', // Soft gray for readable text
      secondary: '#9CA3AF', // Lighter gray for secondary text
      heading: '#4B5563', // Medium gray for headings
      feature: '#8B8B8B', // Muted gray for feature text
      highlight: '#7A7A7A', // Subtle gray for highlighted text
      disabled: 'rgba(107, 114, 128, 0.4)', // Disabled text
      hero: '#F9FAFB', // Very light gray for hero section text
    },
    background: {
      default: '#FEFEFE', // Pure white background
      paper: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white for cards
      light: '#FBFBFB', // Slightly off-white for alternate sections
      dark: '#F7F7F7', // Light gray for contrast sections
    },
    sections: {
      hero: {
        text: '#4B5563',
        background: 'linear-gradient(135deg, rgba(235, 235, 235, 0.95) 0%, rgba(225, 225, 225, 0.98) 100%)',
      },
      services: {
        text: '#6B7280',
        background: '#F5F5F5',
        card: 'rgba(240, 240, 240, 0.6)',
      },
      updates: {
        text: '#6B7280',
        background: 'rgba(240, 240, 240, 0.4)',
        card: '#F0F0F0',
      },
      features: {
        text: '#8B8B8B',
        background: '#F5F5F5',
        highlight: '#7A7A7A',
      },
    },
    error: {
      main: '#F3B4B4',
      light: '#F8D7D7',
      dark: '#E89999',
    },
    warning: {
      main: '#F5D5A8',
      light: '#F9E5C7',
      dark: '#F0C78A',
    },
    info: {
      main: '#B4D4F1',
      light: '#D7E7F7',
      dark: '#99C5EB',
    },
    success: {
      main: '#C4E5C7',
      light: '#E0F2E2',
      dark: '#A8D8AC',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: 'clamp(2rem, 5vw, 2.5rem)',
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      lineHeight: 1.3,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)',
      lineHeight: 1.4,
      letterSpacing: '0',
    },
    h4: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
      lineHeight: 1.4,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
      lineHeight: 1.5,
      letterSpacing: '0',
    },
    h6: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
      lineHeight: 1.5,
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
      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
      color: '#1F2937', // Dark gray color for paragraphs
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#111827', // Darker on hover
        transform: 'translateY(-1px)',
      },
    },
    body2: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
      lineHeight: 1.6,
      letterSpacing: '0.01071em',
      color: '#374151', // Dark gray color for smaller paragraphs
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#1F2937', // Darker on hover
        transform: 'translateY(-1px)',
      },
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
        // Add global paragraph animations
        p: {
          animation: 'fadeInUp 0.6s ease-out',
          '&:hover': {
            animation: 'pulse 1s ease-in-out',
          },
        },
        '@keyframes fadeInUp': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        '@keyframes pulse': {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.02)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
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
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 500,
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
          color: '#FFFFFF',
          border: '1px solid rgba(30, 58, 138, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(30, 58, 138, 0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(30, 58, 138, 0.35)',
            color: '#FFFFFF',
          },
          '&:active': {
            transform: 'translateY(0px)',
            boxShadow: '0 1px 4px rgba(30, 58, 138, 0.3)',
          },
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #1E40AF 0%, #2563EB 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(90deg, #1E3A8A 0%, #1E40AF 100%)',
            color: '#FFFFFF',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(90deg, #1E3A8A 0%, #1E40AF 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(90deg, #1D4ED8 0%, #2563EB 100%)',
            color: '#FFFFFF',
          },
        },
        outlinedPrimary: {
          borderWidth: '2px',
          borderColor: '#1E40AF',
          color: '#1E40AF',
          '&:hover': {
            borderWidth: '2px',
            borderColor: '#1E3A8A',
            background: 'rgba(30, 64, 175, 0.1)',
            color: '#1E3A8A',
          },
        },
        outlined: {
          borderColor: '#1E40AF',
          color: '#1E40AF',
          background: 'rgba(30, 64, 175, 0.05)',
          '&:hover': {
            borderColor: '#1E3A8A',
            color: '#1E3A8A',
            background: 'rgba(30, 64, 175, 0.15)',
          },
        },
        text: {
          color: '#1E40AF',
          '&:hover': {
            color: '#1E3A8A',
            background: 'rgba(30, 64, 175, 0.1)',
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
          background: 'rgba(248, 248, 248, 0.95)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          borderBottom: '1px solid rgba(224, 224, 224, 0.3)',
          '&.footer': {
            background: 'linear-gradient(45deg, rgba(240, 240, 240, 0.98) 0%, rgba(232, 232, 232, 0.95) 100%)',
            backdropFilter: 'blur(15px)',
            borderTop: '1px solid rgba(224, 224, 224, 0.4)',
             boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.04)',
            '& .MuiLink-root': {
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#4B5563',
                transform: 'translateY(-2px)',
              }
            },
            '& .MuiIconButton-root': {
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#4B5563',
                transform: 'scale(1.1)',
              }
            },
            '& .footer-section': {
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                '& .MuiTypography-root': {
                  color: '#4B5563',
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
            background: 'linear-gradient(to right, rgba(240, 240, 240, 0.98) 0%, rgba(232, 232, 232, 0.95) 100%)',
            color: '#6B7280',
            backdropFilter: 'blur(15px)',
            borderTop: '1px solid rgba(224, 224, 224, 0.4)',
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              background: 'rgba(248, 248, 248, 0.8)',
              transition: 'all 0.2s ease',
            '& fieldset': {
              borderColor: 'rgba(224, 224, 224, 0.6)',
              borderWidth: '1px',
            },
            '&:hover': {
                background: 'rgba(240, 240, 240, 0.95)',
                '& fieldset': {
                  borderColor: 'rgba(176, 176, 176, 0.8)',
                   boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                },
              },
              '&.Mui-focused': {
                background: 'rgba(248, 248, 248, 1)',
              '& fieldset': {
                borderColor: '#B0B0B0',
                 boxShadow: '0 0 0 2px rgba(176, 176, 176, 0.2)',
              },
            },
            '& input': {
              color: '#6B7280',
              '&::placeholder': {
                color: '#9CA3AF',
              },
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#B0B0B0',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#9CA3AF',
            '&.Mui-focused': {
              color: '#6B7280',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          background: 'rgba(248, 248, 248, 0.8)',
          border: '1px solid rgba(224, 224, 224, 0.4)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            background: 'rgba(240, 240, 240, 0.95)',
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
          background: 'rgba(240, 240, 240, 0.6)',
          border: '1px solid rgba(224, 224, 224, 0.4)',
          color: '#6B7280',
          borderRadius: '16px',
          '&:hover': {
            background: 'rgba(224, 224, 224, 0.8)',
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
              color: '#9CA3AF',
              fontWeight: 500,
              '&.Mui-active': {
                color: '#6B7280',
                fontWeight: 600,
              },
              '&.Mui-completed': {
                color: '#4B5563',
              },
            },
          },
          '& .MuiStepIcon-root': {
            color: '#D1D5DB',
            '&.Mui-active': {
              color: '#6B7280',
            },
            '&.Mui-completed': {
              color: '#4B5563',
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          height: '6px',
          background: 'rgba(224, 224, 224, 0.4)',
          '& .MuiLinearProgress-bar': {
            borderRadius: '8px',
            background: 'linear-gradient(90deg, #D0D0D0, #B0B0B0)',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#9CA3AF',
          '&.Mui-checked': {
            color: '#6B7280',
          },
          '&:hover': {
            background: 'rgba(224, 224, 224, 0.3)',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: '#6B7280',
          fontSize: '0.9rem',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(224, 224, 224, 0.6)',
          '&::before, &::after': {
            borderColor: 'rgba(224, 224, 224, 0.6)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          border: '1px solid rgba(224, 224, 224, 0.4)',
        },
        standardError: {
          background: 'rgba(243, 180, 180, 0.3)',
          color: '#E89999',
          '& .MuiAlert-icon': {
            color: '#E89999',
          },
        },
        standardSuccess: {
           background: 'rgba(196, 229, 199, 0.3)',
           color: '#A8D8AC',
           '& .MuiAlert-icon': {
             color: '#A8D8AC',
           },
         },
      },
    },
    // Mobile-optimized components
    MuiIconButton: {
      styleOverrides: {
        root: {
          minHeight: '48px',
          minWidth: '48px',
          '@media (max-width: 600px)': {
            minHeight: '44px',
            minWidth: '44px',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          minHeight: '56px',
          minWidth: '56px',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          minHeight: '48px',
          '@media (max-width: 600px)': {
            minHeight: '56px',
            paddingTop: '12px',
            paddingBottom: '12px',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: '48px',
          '@media (max-width: 600px)': {
            minHeight: '56px',
            paddingTop: '16px',
            paddingBottom: '16px',
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