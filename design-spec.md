# PuffGuard Web Design Specification

## Overview

**Design Task**: Complete website redesign and enhancement
**Platform**: Responsive Web (Mobile-first)
**Brand**: PuffGuard - Health & Wellness Technology
**Accessibility Target**: WCAG AA
**Design Philosophy**: Clean, trustworthy, supportive, and modern

## Brand Identity

### Core Values
- **Supportive**: Non-judgmental, encouraging tone
- **Scientific**: Data-driven, evidence-based approach
- **Personal**: Tailored to individual journeys
- **Modern**: Contemporary, tech-forward solution

### Visual Language
- Clean and minimalist with purposeful use of color
- Soft, approachable design elements
- Professional healthcare aesthetic with modern twist
- Focus on clarity and ease of use

## Design Tokens

### Color System

#### Primary Palette
```css
/* Blues - Primary brand colors */
--color-primary-50: #E5E3FD;
--color-primary-100: #B8B3F9;
--color-primary-200: #8A83F6;
--color-primary-300: #5D54F4;
--color-primary-400: #4339F2;  /* Main brand color */
--color-primary-500: #2E25D9;
--color-primary-600: #1F19B3;

/* Semantic Colors */
--color-success: #00C853;
--color-warning: #FFD60A;
--color-error: #FF3B30;
--color-info: #00D9E1;

/* Neutrals */
--color-gray-50: #FAFAFA;
--color-gray-100: #F5F5F7;
--color-gray-200: #E5E5EA;
--color-gray-300: #D1D1D6;
--color-gray-400: #C7C7CC;
--color-gray-500: #8E8E93;
--color-gray-600: #636366;
--color-gray-700: #48484A;
--color-gray-800: #3A3A3C;
--color-gray-900: #1C1C1E;
```

### Typography

```css
/* Font Family */
--font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
--font-mono: 'SF Mono', Monaco, Consolas, monospace;

/* Font Sizes - Mobile First */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing Scale

```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
--space-4xl: 6rem;     /* 96px */
--space-5xl: 8rem;     /* 128px */
```

### Effects

```css
/* Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

/* Border Radius */
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-2xl: 1rem;     /* 16px */
--radius-full: 9999px;

/* Transitions */
--transition-fast: 150ms ease-in-out;
--transition-base: 250ms ease-in-out;
--transition-slow: 350ms ease-in-out;
```

## Responsive Breakpoints

```css
--screen-sm: 640px;   /* Mobile landscape */
--screen-md: 768px;   /* Tablet */
--screen-lg: 1024px;  /* Desktop */
--screen-xl: 1280px;  /* Wide desktop */
--screen-2xl: 1536px; /* Extra wide */
```

## Page Structure

### 1. Hero Section

**Purpose**: Immediate value proposition and conversion

**Desktop Layout**:
- Split layout: Content left (60%), Visual right (40%)
- Headline: 60px, bold, line-height 1.1
- Subheadline: 24px, regular, gray-600
- CTA buttons: Primary and secondary side-by-side
- Trust badges below CTA

**Mobile Layout**:
- Single column
- Visual element as background with overlay
- Headline: 36px
- Stacked CTA buttons (full width)

**Components**:
```
HeroSection
├── Container (max-width: 1280px)
├── Content
│   ├── Headline
│   ├── Subheadline
│   ├── CTAGroup
│   │   ├── PrimaryButton
│   │   └── SecondaryButton
│   └── TrustBadges
└── Visual
    ├── PhoneMockup
    └── BackgroundGradient
```

### 2. Features Section

**Purpose**: Showcase key app features

**Layout**: 3-column grid (desktop), single column (mobile)

**Feature Card Component**:
```
FeatureCard
├── Icon (48x48, gradient background)
├── Title (20px, semibold)
├── Description (16px, gray-600)
└── LearnMoreLink (optional)
```

**Interaction**: Subtle hover effect with shadow and transform

### 3. How It Works Section

**Purpose**: Explain the process in simple steps

**Layout**: Alternating left/right with connecting line

**Step Component**:
```
ProcessStep
├── StepNumber (circular, 48px)
├── Content
│   ├── Title
│   ├── Description
│   └── Visual
└── ConnectorLine (except last)
```

### 4. Testimonials Section

**Purpose**: Build trust through social proof

**Layout**: Carousel with 3 visible cards (desktop), 1 (mobile)

**TestimonialCard**:
```
TestimonialCard
├── QuoteIcon
├── TestimonialText
├── Rating (5 stars)
└── Author
    ├── Avatar
    ├── Name
    └── Metadata
```

### 5. Pricing Section

**Purpose**: Clear pricing communication

**Layout**: 3-tier pricing cards with highlight on recommended

**PricingCard**:
```
PricingCard
├── Badge (if recommended)
├── PlanName
├── Price
│   ├── Amount
│   └── Period
├── Description
├── FeatureList
├── CTAButton
└── GuaranteeText
```

### 6. FAQ Section

**Purpose**: Address common concerns

**Layout**: Accordion style with smooth animations

**FAQItem**:
```
FAQItem
├── Question
│   ├── Text
│   └── ToggleIcon
└── Answer (collapsible)
```

## Component Library

### Buttons

**Primary Button**
```css
.btn-primary {
  background: var(--color-primary-400);
  color: white;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  font-weight: var(--font-semibold);
  transition: all var(--transition-base);
}

.btn-primary:hover {
  background: var(--color-primary-500);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

**Secondary Button**
```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary-400);
  border: 2px solid var(--color-primary-400);
  padding: 12px 26px;
}
```

### Cards

```css
.card {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}
```

## Animation Guidelines

### Scroll Animations
- Use Intersection Observer for performance
- Fade in with subtle upward movement
- Stagger animations for lists
- Duration: 600-800ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

### Micro-interactions
- Button hover: Scale 1.05, shadow increase
- Card hover: Translate Y -4px
- Link hover: Underline animation
- Form focus: Border color transition

### Loading States
- Skeleton screens for content
- Shimmer effect for placeholders
- Progress indicators for actions

## Accessibility Requirements

### Color Contrast
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

### Keyboard Navigation
- All interactive elements keyboard accessible
- Visible focus indicators
- Logical tab order
- Skip navigation link

### Screen Reader Support
- Semantic HTML structure
- ARIA labels where needed
- Alt text for images
- Descriptive link text

## Mobile Considerations

### Touch Targets
- Minimum 44x44px
- 8px spacing between targets
- Clear visual feedback on tap

### Performance
- Lazy load images
- Optimize web fonts
- Minimize JavaScript
- Use CSS containment

### Viewport
- Prevent horizontal scroll
- Safe area considerations
- Responsive images

## Implementation Notes

### CSS Architecture
- Use CSS custom properties
- Mobile-first approach
- Component-based structure
- Utility classes for spacing

### Performance Budget
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Total page weight: < 1MB
- Image optimization: WebP with fallbacks

### Browser Support
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile browsers: iOS 14+, Android 8+

## Next Steps

1. Create Figma/Sketch mockups based on specs
2. Build component library
3. Implement responsive layouts
4. Add animations and interactions
5. Conduct accessibility audit
6. Performance optimization

---

**Version**: 1.0.0
**Created**: January 2025
**Status**: Ready for Implementation