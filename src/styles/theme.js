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
      main: '#1E3A8A', // Updated deep blue for trust and professionalism
      light: '#3151A6',
      dark: '#142C6F',
    },
    secondary: {
      main: '#10B981', // Updated emerald for growth and financial success
      light: '#34D399',
      dark: '#059669',
    },
    accent: {
      amber: '#F59E0B', // For calls-to-action and highlights
      indigo: '#6366F1', // For secondary elements and visual interest
    },
    text: {
      primary: '#1E293B', // Dark slate for high contrast and readability
      secondary: '#475569', // Medium slate for secondary text
      heading: '#0F172A', // Darker slate for headings
      feature: '#10B981', // Emerald for feature text
      highlight: '#F59E0B', // Amber for highlighted text
      disabled: 'rgba(30, 41, 59, 0.6)', // Disabled text
      hero: '#FFFFFF', // White for hero section text
    },
    background: {
      default: '#F8FAFC', // Light gray for main background
      paper: 'transparent', // Transparent for cards and content areas
      light: '#F1F5F9', // Lighter gray for alternate sections
      dark: '#0F172A', // Dark background for contrast sections
    },
    sections: {
      hero: {
        text: '#FFFFFF',
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
      },
      services: {
        text: '#1E293B',
        background: '#F8FAFC',
        card: 'transparent',
      },
      updates: {
        text: '#1E293B',
        background: 'transparent',
        card: '#F1F5F9',
      },
      features: {
        text: '#10B981',
        background: '#ECFDF5',
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
          borderRadius: '8px',
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #1E3A8A 0%, #3151A6 100%)',
          '&:hover': {
            background: 'linear-gradient(90deg, #142C6F 0%, #1E3A8A 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
          '&:hover': {
            background: 'linear-gradient(90deg, #059669 0%, #10B981 100%)',
          },
        },
        outlinedPrimary: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
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
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          '&.footer': {
            background: 'linear-gradient(45deg, rgba(15, 23, 42, 0.98) 0%, rgba(16, 185, 129, 0.95) 100%)',
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
            background: 'linear-gradient(to right, rgba(15, 23, 42, 0.98) 0%, rgba(16, 185, 129, 0.95) 100%)',
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
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3151A6',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
        elevation1: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
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