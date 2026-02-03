import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { colors, typography, layout, shadows } from './designTokens';

// Map design tokens to MUI Palette
const palette = {
  mode: 'light',
  primary: colors.primary,
  secondary: colors.secondary,
  success: {
    main: colors.success,
    contrastText: '#FFFFFF',
  },
  warning: {
    main: colors.warning,
    contrastText: '#FFFFFF',
  },
  error: {
    main: colors.error,
    contrastText: '#FFFFFF',
  },
  info: {
    main: colors.info,
    contrastText: '#FFFFFF',
  },
  background: colors.background,
  text: colors.text,
  divider: colors.border.light,
  action: {
    active: colors.text.secondary,
    hover: 'rgba(37, 99, 235, 0.08)', // Blue tint
    selected: 'rgba(37, 99, 235, 0.12)',
    disabled: colors.text.disabled,
    disabledBackground: 'rgba(148, 163, 184, 0.12)',
  },
};

// Map design tokens to MUI Typography
const typographyTheme = {
  fontFamily: typography.fontFamily.sans,
  h1: {
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.weights.extrabold,
    fontSize: '3.5rem',
    lineHeight: typography.lineHeights.tight,
    letterSpacing: '-0.02em',
    color: colors.primary.main,
  },
  h2: {
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.weights.bold,
    fontSize: '2.5rem',
    lineHeight: typography.lineHeights.tight,
    letterSpacing: '-0.015em',
    color: colors.primary.main,
  },
  h3: {
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.weights.bold,
    fontSize: '2rem',
    lineHeight: typography.lineHeights.tight,
    letterSpacing: '-0.01em',
    color: colors.primary.main,
  },
  h4: {
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.weights.semibold,
    fontSize: '1.5rem',
    lineHeight: 1.3,
    color: colors.primary.main,
  },
  h5: {
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.weights.semibold,
    fontSize: '1.25rem',
    lineHeight: 1.4,
    color: colors.primary.main,
  },
  h6: {
    fontFamily: typography.fontFamily.heading,
    fontWeight: typography.weights.semibold,
    fontSize: '1.125rem',
    lineHeight: 1.4,
    color: colors.primary.main,
  },
  subtitle1: {
    fontFamily: typography.fontFamily.sans,
    fontSize: '1.125rem',
    lineHeight: 1.5,
    color: colors.text.secondary,
    fontWeight: typography.weights.medium,
  },
  subtitle2: {
    fontFamily: typography.fontFamily.sans,
    fontSize: '0.9375rem',
    fontWeight: typography.weights.medium,
    lineHeight: 1.57,
    color: colors.text.secondary,
  },
  body1: {
    fontFamily: typography.fontFamily.sans,
    fontSize: '1rem',
    lineHeight: 1.6,
    color: colors.text.primary,
  },
  body2: {
    fontFamily: typography.fontFamily.sans,
    fontSize: '0.875rem',
    lineHeight: 1.6,
    color: colors.text.secondary,
  },
  button: {
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.weights.semibold,
    textTransform: 'none',
    letterSpacing: '0.01em',
    fontSize: '0.9375rem',
  },
  caption: {
    fontFamily: typography.fontFamily.sans,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    color: colors.text.disabled,
  },
};

// Component Overrides
const components = {
  MuiCssBaseline: {
    styleOverrides: `
      body {
        background-color: ${colors.background.default};
      }
    `,
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: layout.borderRadius.md,
        padding: '10px 24px',
        boxShadow: 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: shadows.md,
        },
      },
      containedPrimary: {
        backgroundColor: colors.primary.main,
        '&:hover': {
          backgroundColor: colors.primary.light,
        },
      },
      containedSecondary: {
        backgroundColor: colors.secondary.main,
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: colors.secondary.dark,
        },
      },
      outlined: {
        borderWidth: '1.5px',
        '&:hover': {
          borderWidth: '1.5px',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: layout.borderRadius.lg,
        boxShadow: shadows.sm,
        border: `1px solid ${colors.border.light}`,
        backgroundImage: 'none',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: shadows.lg,
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
      rounded: {
        borderRadius: layout.borderRadius.lg,
      },
      elevation1: {
        boxShadow: shadows.sm,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: layout.borderRadius.md,
          backgroundColor: '#FFFFFF',
          transition: 'all 0.2s',
          '& fieldset': {
            borderColor: colors.border.light,
            borderWidth: '1px',
          },
          '&:hover fieldset': {
            borderColor: colors.text.secondary,
          },
          '&.Mui-focused': {
            boxShadow: `0 0 0 4px ${colors.secondary.main}20`, // 20 = 12% opacity roughly
          },
          '&.Mui-focused fieldset': {
            borderColor: colors.secondary.main,
            borderWidth: '1px',
          },
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: layout.borderRadius.md,
        fontWeight: typography.weights.semibold,
        fontSize: '0.8125rem',
      },
      filled: {
        backgroundColor: colors.background.subtle,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Glassmorphism
        backdropFilter: 'blur(12px)',
        color: colors.text.primary,
        boxShadow: 'none',
        borderBottom: `1px solid ${colors.border.light}`,
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: colors.background.paper,
        color: colors.text.primary,
        borderRight: `1px solid ${colors.border.light}`,
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        maxWidth: layout.containerWidth.lg,
      },
      maxWidthLg: {
        maxWidth: layout.containerWidth.lg,
      }
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: layout.borderRadius.md,
        margin: '4px 8px',
        '&.Mui-selected': {
          backgroundColor: colors.secondary.main,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: colors.secondary.dark,
          },
          '& .MuiListItemIcon-root': {
            color: '#FFFFFF',
          },
        },
      },
    },
  },
};

let theme = createTheme({
  palette,
  typography: typographyTheme,
  components,
  shape: {
    borderRadius: 8,
  },
  shadows: Array(25).fill('none').map((_, index) => {
    if (index === 0) return 'none';
    if (index === 1) return shadows.sm;
    if (index === 4) return shadows.md;
    if (index === 8) return shadows.lg;
    if (index === 12) return shadows.xl;
    return shadows.md; // Fallback
  }),
});

theme = responsiveFontSizes(theme);

export default theme;
