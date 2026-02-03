// Source of Truth for Design System
// Fresh, Modern, Professional Financial Identity

export const colors = {
  // Brand Colors
  primary: {
    main: '#0F172A', // Slate 900 - Trust, Authority, Professionalism
    light: '#334155', // Slate 700
    dark: '#020617', // Slate 950
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#2563EB', // Blue 600 - Innovation, Clarity, Freshness
    light: '#60A5FA', // Blue 400
    dark: '#1D4ED8', // Blue 700
    contrastText: '#FFFFFF',
  },
  accent: {
    main: '#10B981', // Emerald 500 - Growth, Success, Stability
    light: '#34D399',
    dark: '#059669',
    contrastText: '#FFFFFF',
  },
  
  // Semantic Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#0EA5E9',

  // Neutrals
  background: {
    default: '#F8FAFC', // Slate 50 - Soft, modern background
    paper: '#FFFFFF',   // Pure white for cards/surfaces
    subtle: '#F1F5F9',  // Slate 100 - Secondary backgrounds
  },
  text: {
    primary: '#1E293B',   // Slate 800 - High contrast for readability
    secondary: '#64748B', // Slate 500 - Soft contrast for meta info
    disabled: '#94A3B8',  // Slate 400
    hint: '#CBD5E1',      // Slate 300
  },
  border: {
    light: '#E2E8F0',   // Slate 200
    medium: '#CBD5E1',  // Slate 300
  }
};

export const typography = {
  fontFamily: {
    sans: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    heading: '"Plus Jakarta Sans", "Inter", sans-serif', // Modern, geometric headings
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  }
};

export const spacing = {
  base: 8, // 8px grid system
  // Helper for consistent spacing calculations
  px: (multiplier) => `${multiplier * 8}px`,
};

export const layout = {
  headerHeight: {
    mobile: 64,
    desktop: 80,
  },
  containerWidth: {
    lg: 1280, // Consistent max-width for alignment
    xl: 1440,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 24, // For modern, pill-shaped elements
  }
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};
