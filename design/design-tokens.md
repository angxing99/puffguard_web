# PuffGuard Design Tokens

**Version:** 1.0.0
**Last Updated:** 2025-11-30
**Platform:** iOS (Mobile-first)

## Overview

This document defines the design tokens for the PuffGuard app - a vaping cessation tracking application. Design tokens are the single source of truth for design decisions, ensuring consistency across the entire application.

---

## Color Tokens

### Primitive Colors

#### Primary Palette
```
primary-blue-500: #4339F2    // Main brand color - vibrant blue
primary-blue-400: #5D54F4
primary-blue-600: #2E25D9
```

#### Secondary Palette
```
green-500: #00C853          // Success, active states
green-400: #00E676
green-600: #00A045

red-500: #FF3B30            // Alerts, warnings, highlights
red-400: #FF6259
red-600: #E6251A

yellow-500: #FFD60A         // Encouragement, info
yellow-400: #FFED4E
yellow-600: #E6C200

cyan-500: #00D9E1           // Achievements, accents
cyan-400: #4DFFFF
cyan-600: #00B8BE

pink-500: #FF2D55           // Accents, gradients
pink-400: #FF6482
pink-600: #E6194A
```

#### Neutral Palette
```
gray-50: #FAFAFA
gray-100: #F5F5F7           // Main background
gray-200: #E5E5EA           // Borders, dividers
gray-300: #D1D1D6
gray-400: #C7C7CC
gray-500: #8E8E93           // Secondary text
gray-600: #636366
gray-700: #48484A
gray-800: #3A3A3C
gray-900: #1C1C1E           // Primary text

white: #FFFFFF
black: #000000
```

### Semantic Colors

#### Background Colors
```
bg-primary: gray-100        // Main app background (#F5F5F7)
bg-secondary: white         // Cards, modals
bg-tertiary: gray-50        // Subtle backgrounds
bg-dark: black              // Dark mode overlays
bg-overlay: rgba(0,0,0,0.4) // Modal overlays
```

#### Text Colors
```
text-primary: gray-900      // Main text
text-secondary: gray-500    // Supporting text
text-tertiary: gray-400     // Disabled text
text-inverse: white         // Text on dark backgrounds
text-accent: primary-blue-500 // Links, emphasis
```

#### Interactive Colors
```
interactive-primary: primary-blue-500
interactive-primary-hover: primary-blue-400
interactive-primary-active: primary-blue-600
interactive-secondary: gray-200
interactive-disabled: gray-300
```

#### Status Colors
```
status-success: green-500
status-warning: yellow-500
status-error: red-500
status-info: primary-blue-500
```

#### Component-Specific Colors
```
// Buttons
btn-primary-bg: primary-blue-500
btn-primary-text: white
btn-secondary-bg: transparent
btn-secondary-text: gray-500

// Cards
card-bg: white
card-border: gray-200
card-shadow: rgba(0, 0, 0, 0.08)

// Badges
badge-active-bg: green-500
badge-active-text: white
badge-locked-bg: primary-blue-200
badge-locked-icon: primary-blue-500

// Info Banners
banner-yellow-bg: #FFF9E6
banner-green-bg: #E8F5E9
banner-pink-bg: #FFE8EC
```

### Gradients
```
gradient-primary: linear-gradient(90deg, #00D9E1 0%, #FF2D55 100%)
  // Teal to Pink - Used for "Ask Puffy" button

gradient-secondary: linear-gradient(135deg, cyan-400 0%, primary-blue-500 100%)
  // Used for special highlights
```

---

## Typography Tokens

### Font Families
```
font-primary: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif
font-mono: "SF Mono", "Monaco", monospace
```

### Font Sizes
```
font-size-xs: 12px          // Small labels, captions
font-size-sm: 14px          // Secondary text
font-size-base: 16px        // Body text, buttons
font-size-lg: 18px          // Emphasized body text
font-size-xl: 20px          // Small headers
font-size-2xl: 24px         // Section headers
font-size-3xl: 28px         // Page titles
font-size-4xl: 34px         // Large headers
font-size-5xl: 48px         // Display numbers
font-size-6xl: 64px         // Hero numbers
```

### Font Weights
```
font-weight-regular: 400
font-weight-medium: 500
font-weight-semibold: 600
font-weight-bold: 700
```

### Line Heights
```
line-height-tight: 1.2      // Large headings
line-height-normal: 1.5     // Body text
line-height-relaxed: 1.75   // Comfortable reading
```

### Letter Spacing
```
letter-spacing-tight: -0.5px
letter-spacing-normal: 0
letter-spacing-wide: 0.5px
```

### Semantic Typography
```
// Headings
heading-1: font-size-4xl / font-weight-bold / line-height-tight
heading-2: font-size-3xl / font-weight-bold / line-height-tight
heading-3: font-size-2xl / font-weight-semibold / line-height-normal
heading-4: font-size-xl / font-weight-semibold / line-height-normal

// Body
body-large: font-size-lg / font-weight-regular / line-height-normal
body-base: font-size-base / font-weight-regular / line-height-normal
body-small: font-size-sm / font-weight-regular / line-height-normal

// Special
display-number: font-size-6xl / font-weight-bold / line-height-tight
stat-number: font-size-5xl / font-weight-bold / line-height-tight
button-text: font-size-base / font-weight-semibold / line-height-normal
caption: font-size-xs / font-weight-regular / line-height-normal
```

---

## Spacing Tokens

### Base Scale (4px grid system)
```
spacing-0: 0px
spacing-1: 4px
spacing-2: 8px
spacing-3: 12px
spacing-4: 16px
spacing-5: 20px
spacing-6: 24px
spacing-7: 28px
spacing-8: 32px
spacing-10: 40px
spacing-12: 48px
spacing-16: 64px
spacing-20: 80px
spacing-24: 96px
```

### Semantic Spacing
```
// Padding
padding-xs: spacing-2       // 8px
padding-sm: spacing-3       // 12px
padding-base: spacing-4     // 16px
padding-lg: spacing-5       // 20px
padding-xl: spacing-6       // 24px

// Margins
margin-xs: spacing-2        // 8px
margin-sm: spacing-3        // 12px
margin-base: spacing-4      // 16px
margin-lg: spacing-6        // 24px
margin-xl: spacing-8        // 32px

// Gaps (between elements)
gap-xs: spacing-2           // 8px
gap-sm: spacing-3           // 12px
gap-base: spacing-4         // 16px
gap-lg: spacing-6           // 24px

// Section spacing
section-spacing-sm: spacing-6   // 24px
section-spacing-base: spacing-8 // 32px
section-spacing-lg: spacing-12  // 48px
```

### Component-Specific Spacing
```
// Cards
card-padding: spacing-4         // 16px internal padding
card-gap: spacing-3             // 12px between cards

// Buttons
button-padding-vertical: spacing-4      // 16px
button-padding-horizontal: spacing-6    // 24px
button-gap: spacing-3                   // 12px between buttons

// Modal/Bottom Sheet
modal-padding: spacing-5        // 20px
modal-margin-top: spacing-6     // 24px

// List items
list-item-padding: spacing-4    // 16px
list-item-gap: spacing-2        // 8px

// Screen padding
screen-padding-horizontal: spacing-4    // 16px
screen-padding-vertical: spacing-5      // 20px
```

---

## Border Radius Tokens

### Base Scale
```
radius-0: 0px
radius-xs: 8px
radius-sm: 12px
radius-base: 16px
radius-lg: 20px
radius-xl: 24px
radius-2xl: 28px
radius-full: 9999px         // Perfect circles
```

### Semantic Border Radius
```
// Buttons
btn-radius: radius-base         // 16px

// Cards
card-radius: radius-base        // 16px
card-radius-large: radius-lg    // 20px

// Modals
modal-radius: radius-xl         // 24px (top corners)

// Pills/Chips
pill-radius: radius-full        // Fully rounded

// Badges
badge-radius: radius-sm         // 12px

// Input fields
input-radius: radius-base       // 16px

// Icons
icon-bg-radius: radius-sm       // 12px
```

---

## Elevation & Shadow Tokens

### Shadow Depths
```
shadow-none: none

shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04)

shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06),
           0 1px 2px rgba(0, 0, 0, 0.04)

shadow-base: 0 4px 8px rgba(0, 0, 0, 0.08),
             0 2px 4px rgba(0, 0, 0, 0.04)

shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.10),
           0 4px 8px rgba(0, 0, 0, 0.06)

shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.12),
           0 8px 16px rgba(0, 0, 0, 0.08)

shadow-2xl: 0 24px 48px rgba(0, 0, 0, 0.16),
            0 16px 32px rgba(0, 0, 0, 0.12)
```

### Semantic Shadows
```
card-shadow: shadow-base
modal-shadow: shadow-xl
button-shadow: shadow-sm
floating-shadow: shadow-lg
```

---

## Border Tokens

### Border Widths
```
border-0: 0px
border-1: 1px
border-2: 2px
border-4: 4px
```

### Border Colors
```
border-default: gray-200
border-hover: gray-300
border-focus: primary-blue-500
border-error: red-500
border-success: green-500
```

---

## Animation & Transition Tokens

### Durations
```
duration-instant: 100ms
duration-fast: 200ms
duration-base: 300ms
duration-slow: 400ms
duration-slower: 600ms
```

### Easing Functions
```
ease-linear: cubic-bezier(0, 0, 1, 1)
ease-in: cubic-bezier(0.4, 0, 1, 1)
ease-out: cubic-bezier(0, 0, 0.2, 1)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Semantic Transitions
```
transition-base: all duration-base ease-in-out
transition-fast: all duration-fast ease-out
transition-color: color duration-fast ease-in-out
transition-transform: transform duration-base ease-out
transition-opacity: opacity duration-fast ease-in-out
```

---

## Icon Sizes

```
icon-xs: 16px
icon-sm: 20px
icon-base: 24px
icon-lg: 32px
icon-xl: 48px
```

---

## Z-Index Scale

```
z-base: 0
z-dropdown: 100
z-sticky: 200
z-fixed: 300
z-modal-backdrop: 400
z-modal: 500
z-popover: 600
z-tooltip: 700
z-toast: 800
```

---

## Opacity Scale

```
opacity-0: 0
opacity-10: 0.1
opacity-20: 0.2
opacity-40: 0.4
opacity-60: 0.6
opacity-80: 0.8
opacity-100: 1
```

---

## Token Usage Philosophy

### Hierarchy
```
Primitive Tokens → Semantic Tokens → Component Tokens
(gray-500)       → (text-secondary)  → (card-subtitle-color)
```

### Naming Convention
- **Primitive tokens**: Named by property (color-value, size-scale)
- **Semantic tokens**: Named by purpose (text-primary, bg-secondary)
- **Component tokens**: Named by component-property (button-bg, card-padding)

### Best Practices

1. **Always use semantic tokens in components**, not primitive tokens directly
2. **Maintain consistency** across platforms by sharing token values
3. **Document changes** to tokens with version notes
4. **Test token changes** across all components before deployment
5. **Use descriptive names** that indicate purpose, not appearance

---

## Export Formats

These tokens are available in multiple formats:

- **Markdown**: This documentation (human-readable)
- **JSON**: For programmatic access and tooling
- **CSS/SCSS**: CSS custom properties for web
- **iOS**: Swift constants for native development
- **React Native**: JavaScript constants for cross-platform

---

## Changelog

### Version 1.0.0 (2025-11-30)
- Initial token system created
- Established color palette based on PuffGuard brand
- Defined typography scale and semantic mappings
- Created spacing system based on 4px grid
- Defined border radius, shadow, and animation tokens
