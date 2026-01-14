# PuffGuard Web - Implementation Guide

## Quick Start

This guide helps developers implement the PuffGuard website using the design specifications.

## Tech Stack Recommendations

### Option 1: Next.js (Recommended)
```bash
npx create-next-app@latest puffguard-web --typescript --tailwind --app
```

**Benefits:**
- Built-in SEO optimization
- Image optimization
- Server-side rendering
- API routes for forms
- Excellent performance

### Option 2: Astro
```bash
npm create astro@latest -- --template minimal
```

**Benefits:**
- Zero JavaScript by default
- Excellent performance
- Component islands
- Built for content sites

### Option 3: Vite + React
```bash
npm create vite@latest puffguard-web -- --template react-ts
```

**Benefits:**
- Fast development
- Modern tooling
- Full React ecosystem

## File Structure
```
puffguard-web/
├── public/
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Section.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── Features.tsx
│   │       ├── HowItWorks.tsx
│   │       ├── Testimonials.tsx
│   │       ├── Pricing.tsx
│   │       └── FAQ.tsx
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tokens.css
│   │   └── animations.css
│   ├── hooks/
│   │   ├── useIntersection.ts
│   │   └── useMediaQuery.ts
│   └── utils/
│       ├── analytics.ts
│       └── constants.ts
└── package.json
```

## CSS Implementation

### Design Tokens Setup
```css
/* tokens.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  /* Colors */
  --color-primary-50: #E5E3FD;
  --color-primary-100: #B8B3F9;
  --color-primary-200: #8A83F6;
  --color-primary-300: #5D54F4;
  --color-primary-400: #4339F2;
  --color-primary-500: #2E25D9;
  --color-primary-600: #1F19B3;

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Add all other tokens from design-spec.md */
}
```

### Tailwind Config (if using Tailwind)
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E5E3FD',
          100: '#B8B3F9',
          200: '#8A83F6',
          300: '#5D54F4',
          400: '#4339F2',
          500: '#2E25D9',
          600: '#1F19B3',
        },
        // Add other colors
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        // Add other animations
      },
    },
  },
  plugins: [],
};
```

## Component Examples

### Hero Section Component
```tsx
// components/sections/Hero.tsx
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <motion.h1
            className="hero-headline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Take Control of Your Vaping Journey
          </motion.h1>

          <motion.p
            className="hero-subheadline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands who are successfully reducing their nicotine
            dependency with personalized plans and real-time insights.
          </motion.p>

          <motion.div
            className="hero-cta-group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="primary" size="large">
              Start Free Today
            </Button>
            <Button variant="secondary" size="large">
              See How It Works
            </Button>
          </motion.div>
        </div>

        <div className="hero-visual">
          <img
            src="/images/hero-mockup.png"
            alt="PuffGuard app interface"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};
```

### Intersection Observer Hook
```typescript
// hooks/useIntersection.ts
import { useEffect, useRef, useState } from 'react';

export const useIntersection = (options: IntersectionObserverInit = {}) => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
      ...options
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isIntersecting };
};
```

## Performance Optimization

### Image Optimization
```tsx
// Use next/image or implement responsive images
<picture>
  <source
    media="(min-width: 1024px)"
    srcSet="/images/hero-desktop.webp"
  />
  <source
    media="(min-width: 768px)"
    srcSet="/images/hero-tablet.webp"
  />
  <img
    src="/images/hero-mobile.webp"
    alt="PuffGuard app"
    loading="lazy"
    decoding="async"
  />
</picture>
```

### Critical CSS
```html
<!-- Inline critical CSS -->
<style>
  /* Include above-the-fold styles */
  :root { /* tokens */ }
  .hero { /* hero styles */ }
</style>

<!-- Load non-critical CSS -->
<link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

## SEO Implementation

### Meta Tags
```html
<head>
  <title>PuffGuard - Track, Reduce & Quit Vaping</title>
  <meta name="description" content="Join thousands using PuffGuard to quit vaping with personalized plans, real-time tracking, and science-based insights. Start your journey today.">

  <!-- Open Graph -->
  <meta property="og:title" content="PuffGuard - Your Personal Quit Vaping Companion">
  <meta property="og:description" content="Track your vaping habits and quit with confidence">
  <meta property="og:image" content="https://puffguard.com/og-image.png">
  <meta property="og:url" content="https://puffguard.com">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="PuffGuard - Track, Reduce & Quit Vaping">
  <meta name="twitter:description" content="Your personal companion for quitting vaping">
  <meta name="twitter:image" content="https://puffguard.com/twitter-card.png">

  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": "PuffGuard",
    "description": "Quit vaping app with personalized plans and tracking",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  </script>
</head>
```

## Analytics Setup

```javascript
// utils/analytics.ts
export const trackEvent = (eventName: string, parameters?: any) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Track CTA clicks
trackEvent('cta_click', {
  cta_text: 'Start Free Today',
  cta_location: 'hero'
});
```

## Launch Checklist

### Pre-Launch
- [ ] All responsive breakpoints tested
- [ ] Cross-browser testing complete
- [ ] Performance audit (Lighthouse score > 90)
- [ ] Accessibility audit (WCAG AA)
- [ ] SEO audit complete
- [ ] Analytics implemented
- [ ] Forms connected to backend
- [ ] Error pages created (404, 500)
- [ ] Legal pages added (Privacy, Terms)
- [ ] SSL certificate installed

### Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1
- Total Bundle Size: < 200KB

### Testing Checklist
- [ ] Desktop Chrome/Edge/Firefox/Safari
- [ ] Mobile iOS Safari
- [ ] Mobile Chrome Android
- [ ] Tablet landscape/portrait
- [ ] Slow 3G network test
- [ ] JavaScript disabled test
- [ ] Screen reader test

---

**Next Steps:**
1. Choose tech stack
2. Set up development environment
3. Implement design tokens
4. Build components
5. Add animations
6. Optimize performance
7. Launch! 🚀