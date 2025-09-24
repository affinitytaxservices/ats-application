# ATS Application Style Guide

## Color Palette - Light Minimalist Theme

This document outlines the cohesive light and minimalist color palette implemented across the ATS application.

### Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Light Gray | `#E8E8E8` | Primary buttons, main interactive elements |
| Very Light Gray | `#F5F5F5` | Primary button hover states |
| Medium Light Gray | `#D0D0D0` | Primary button pressed states |

### Secondary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Off White | `#F0F0F0` | Secondary buttons, subtle backgrounds |
| Pure Off White | `#F8F8F8` | Secondary button hover states |
| Light Border Gray | `#E0E0E0` | Secondary button pressed states |

### Text Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary Text | `#6B7280` | Main body text, primary content |
| Secondary Text | `#9CA3AF` | Secondary information, captions |
| Heading Text | `#4B5563` | Headings, important labels |
| Muted Text | `#D1D5DB` | Disabled states, placeholders |

### Background Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Pure White | `#FEFEFE` | Main background, cards |
| Paper White | `#FFFFFF` | Paper components, modals |
| Subtle Gray | `#F9FAFB` | Section backgrounds |

### Status Colors (Muted)

| Status | Hex Code | Usage |
|--------|----------|-------|
| Success | `#D1FAE5` | Success messages, completed states |
| Success Text | `#065F46` | Success message text |
| Error | `#FEE2E2` | Error messages, warning states |
| Error Text | `#991B1B` | Error message text |
| Warning | `#FEF3C7` | Warning messages |
| Warning Text | `#92400E` | Warning message text |
| Info | `#DBEAFE` | Information messages |
| Info Text | `#1E40AF` | Information message text |

### Border Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Light Border | `#E5E7EB` | Default borders, dividers |
| Subtle Border | `rgba(224,224,224,0.6)` | Very subtle separators |
| Input Border | `#D1D5DB` | Form input borders |
| Focus Border | `#9CA3AF` | Focused input borders |

## Design Principles

### 1. Low Contrast Approach
- Avoid harsh black-white combinations
- Use soft grays instead of pure black for text
- Maintain readability while reducing visual strain

### 2. Soft Transitions
- Reduced shadow depths (max 4px blur)
- Gentle hover effects with subtle color shifts
- Smooth transitions (0.2s ease-in-out)

### 3. Harmonious Palette
- Consistent gray tone family throughout
- Muted status colors that blend well
- Minimal color temperature variations

### 4. Clean Aesthetics
- Simplified visual elements
- Reduced border radius (4-8px max)
- Minimal use of gradients
- Clean typography hierarchy

## Component-Specific Applications

### Buttons
- **Primary**: Light gray backgrounds with subtle gradients
- **Secondary**: Off-white with light borders
- **Hover**: Slightly darker variants of base colors
- **Disabled**: Muted grays with reduced opacity

### Forms
- **Inputs**: Light backgrounds with soft borders
- **Labels**: Medium gray text for good readability
- **Focus**: Subtle border color change, no heavy outlines
- **Validation**: Muted error/success colors

### Navigation
- **AppBar**: Light gray gradient background
- **Links**: Consistent text colors with subtle hover effects
- **Active states**: Slightly darker background variants

### Cards & Papers
- **Background**: Pure white with minimal shadows
- **Borders**: Light gray, 1px thickness
- **Content**: Proper text hierarchy with gray variants

## Accessibility Compliance

- **Contrast Ratios**: All text combinations meet WCAG AA standards (4.5:1 minimum)
- **Color Independence**: Information is not conveyed by color alone
- **Focus Indicators**: Clear focus states for keyboard navigation
- **Status Communication**: Icons and text accompany color-coded status messages

## Implementation Notes

- All colors are defined in `src/styles/theme.js`
- Material-UI component overrides ensure consistent application
- CSS custom properties can be added for additional flexibility
- Regular accessibility audits recommended to maintain compliance

## Future Maintenance

1. **Color Updates**: Modify values in theme.js for global changes
2. **New Components**: Follow established color patterns
3. **Accessibility Testing**: Regular contrast ratio validation
4. **User Feedback**: Monitor for readability concerns

---

*Last Updated: December 2024*
*Theme Version: Light Minimalist v1.0*