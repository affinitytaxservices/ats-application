# ATS Application Style Guide

## Overview
This project uses a modern, professional design system tailored for a financial/tax services application. The system is built on Material UI (MUI) v5 with a custom theme and design tokens.

## Design System

### 1. Color Palette
The color system uses a "Deep Navy & Emerald" theme to convey trust, stability, and growth.

**Primary (Trust & Authority)**
- `Primary Main`: #0F172A (Slate 900)
- `Primary Light`: #334155 (Slate 700)
- `Primary Dark`: #020617 (Slate 950)

**Secondary (Innovation & Freshness)**
- `Secondary Main`: #2563EB (Blue 600)
- `Secondary Light`: #60A5FA (Blue 400)
- `Secondary Dark`: #1D4ED8 (Blue 700)

**Accent/Success (Growth & Stability)**
- `Success Main`: #10B981 (Emerald 500)

**Neutrals**
- `Background`: #F8FAFC (Slate 50)
- `Paper`: #FFFFFF (White)
- `Text Primary`: #1E293B (Slate 800)
- `Text Secondary`: #64748B (Slate 500)

### 2. Typography
We use a dual-font stack:
- **Headings**: `Plus Jakarta Sans` - Geometric, modern, and approachable.
- **Body**: `Inter` - Clean, highly legible, and standard for modern UI.

### 3. Layout & Spacing
- **Grid System**: 8px base grid.
- **Container Max Width**: 1280px (`lg` breakpoint).
- **Header Height**: 80px (Desktop), 64px (Mobile/Scrolled).
- **Border Radius**: 
  - `sm`: 4px
  - `md`: 8px (Buttons, Inputs)
  - `lg`: 12px (Cards)
  - `xl`: 24px (Pills)

## Component Usage

### Buttons
Buttons use the `secondary` color for primary actions to stand out against the white/slate backgrounds.
```jsx
<Button variant="contained" color="secondary">
  Get Started
</Button>
```

### Cards
Cards have a subtle border and shadow, lifting on hover.
```jsx
<Card>
  <CardContent>...</CardContent>
</Card>
```

### Layout Components
- **Navbar**: Fixed position, transitions to glassmorphism effect on scroll.
- **Footer**: Dark theme (Primary color), 4-column layout, standard alignment.

## Development Workflow
1. **Theme**: Always use `useTheme()` hook to access colors and spacing. Avoid hardcoded hex values.
2. **Spacing**: Use `theme.spacing(2)` (16px) instead of `16px`.
3. **Responsive**: Use `useMediaQuery` or `sx={{ flexDirection: { xs: 'column', md: 'row' } }}`.

## File Structure
- `src/styles/designTokens.js`: Raw design values (source of truth).
- `src/styles/theme.js`: MUI Theme configuration.
- `src/components/layout/`: Layout components (Navbar, Footer).
