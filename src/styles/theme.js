import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Modern Color Palette
// Primary: Deep Blue/Slate for professionalism and trust
// Secondary: Vibrant Blue for actions
// Success/Warning/Error: Standard accessible colors
const palette = {
  mode: 'light',
  primary: {
    main: '#0F172A', // Slate 900
    light: '#334155', // Slate 700
    dark: '#020617', // Slate 950
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#2563EB', // Blue 600 (Accessible on white, 4.6:1)
    light: '#3B82F6', // Blue 500
    dark: '#1D4ED8', // Blue 700
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#10B981', // Emerald 500
    light: '#34D399',
    dark: '#059669',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#F59E0B', // Amber 500
    light: '#FBBF24',
    dark: '#D97706',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#EF4444', // Red 500
    light: '#F87171',
    dark: '#DC2626',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#0EA5E9', // Sky 500
    light: '#38BDF8',
    dark: '#0284C7',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F8FAFC', // Slate 50
    paper: '#FFFFFF',
    subtle: '#F1F5F9', // Slate 100
  },
  text: {
    primary: '#1E293B', // Slate 800
    secondary: '#64748B', // Slate 500
    disabled: '#94A3B8', // Slate 400
  },
  divider: '#E2E8F0', // Slate 200
  action: {
    active: '#64748B',
    hover: 'rgba(15, 23, 42, 0.04)',
    selected: 'rgba(15, 23, 42, 0.08)',
    disabled: 'rgba(15, 23, 42, 0.26)',
    disabledBackground: 'rgba(15, 23, 42, 0.12)',
  },
};

// Typography System
// Headings: Plus Jakarta Sans (Modern, geometric)
// Body: Inter (Highly readable)
const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    fontWeight: 800,
    fontSize: '2.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: palette.primary.main,
  },
  h2: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    fontWeight: 700,
    fontSize: '2rem',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    color: palette.primary.main,
  },
  h3: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    fontWeight: 700,
    fontSize: '1.75rem',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    color: palette.primary.main,
  },
  h4: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.4,
    color: palette.primary.main,
  },
  h5: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.4,
    color: palette.primary.main,
  },
  h6: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.4,
    color: palette.primary.main,
  },
  subtitle1: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '1.125rem',
    lineHeight: 1.5,
    color: palette.text.secondary,
  },
  subtitle2: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
    color: palette.text.secondary,
  },
  body1: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '1rem',
    lineHeight: 1.5,
    color: palette.text.primary,
  },
  body2: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '0.875rem',
    lineHeight: 1.57,
    color: palette.text.secondary,
  },
  button: {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
    textTransform: 'none', // No uppercase buttons by default
  },
};

// Component Overrides
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12, // Modern rounded corners
        padding: '10px 24px',
        boxShadow: 'none',
        fontSize: '0.9375rem',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transform: 'translateY(-1px)',
        },
      },
      containedPrimary: {
        background: `linear-gradient(135deg, ${palette.primary.main} 0%, ${palette.primary.light} 100%)`,
      },
      containedSecondary: {
        background: `linear-gradient(135deg, ${palette.secondary.main} 0%, ${palette.secondary.light} 100%)`,
      },
      sizeLarge: {
        padding: '12px 28px',
        fontSize: '1rem',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: `1px solid ${palette.divider}`,
        backgroundImage: 'none',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
      rounded: {
        borderRadius: 16,
      },
      elevation1: {
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
          '& fieldset': {
            borderColor: palette.divider,
          },
          '&:hover fieldset': {
            borderColor: palette.text.secondary,
          },
          '&.Mui-focused fieldset': {
            borderColor: palette.secondary.main,
            borderWidth: 2,
          },
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 500,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        color: palette.text.primary,
        boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
      },
    },
  },
};

let theme = createTheme({
  palette,
  typography,
  components,
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    // Fill the rest with standard MUI shadows or duplicates to avoid errors
    ...Array(19).fill('none'),
  ],
});

theme = responsiveFontSizes(theme);

export default theme;
