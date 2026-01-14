# PuffGuard Web - Responsive Design Specifications

## Responsive Strategy

**Approach**: Mobile-First Progressive Enhancement
**Base**: 375px (iPhone SE/Mini)
**Breakpoints**: 640px → 768px → 1024px → 1280px → 1536px

## Layout Grid System

### Mobile (< 640px)
```
Container: 100% - 24px padding (12px each side)
Columns: 4
Gutter: 16px
Margin: 12px
```

### Tablet (640px - 1023px)
```
Container: 100% - 48px padding (24px each side)
Columns: 8
Gutter: 24px
Margin: 24px
```

### Desktop (1024px - 1279px)
```
Container: Max 1024px, centered
Columns: 12
Gutter: 32px
Margin: 32px
```

### Wide Desktop (≥ 1280px)
```
Container: Max 1280px, centered
Columns: 12
Gutter: 32px
Margin: auto
```

## Component Responsive Behavior

### Navigation Header

**Mobile (< 768px)**
- Logo: 32px height
- Hamburger menu icon
- Slide-out navigation drawer
- Sticky header on scroll
- Height: 56px

**Tablet/Desktop (≥ 768px)**
- Logo: 40px height
- Horizontal navigation menu
- CTA button visible
- Height: 72px

### Hero Section

**Mobile**
```
Layout: Single column
Headline: 36px → 40px
Subheadline: 18px → 20px
CTA Buttons:
  - Full width
  - Stacked vertically
  - 16px gap
Image: Background with overlay
Padding: 64px 0
```

**Tablet**
```
Layout: Single column centered
Headline: 48px
Subheadline: 20px
CTA Buttons:
  - Inline, centered
  - Max-width: 180px each
Image: Below content
Padding: 80px 0
```

**Desktop**
```
Layout: 2 columns (60/40)
Headline: 60px
Subheadline: 24px
CTA Buttons:
  - Inline, left-aligned
  - Standard width
Image: Right column
Padding: 120px 0
```

### Feature Cards

**Mobile**: 1 column, full width
**Tablet**: 2 columns
**Desktop**: 3 columns

```css
/* Responsive Grid */
.feature-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

@media (min-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Typography Scaling

```css
/* Mobile Base */
:root {
  --h1: 2.25rem;  /* 36px */
  --h2: 1.875rem; /* 30px */
  --h3: 1.5rem;   /* 24px */
  --h4: 1.25rem;  /* 20px */
  --body: 1rem;   /* 16px */
  --small: 0.875rem; /* 14px */
}

/* Tablet */
@media (min-width: 768px) {
  :root {
    --h1: 3rem;     /* 48px */
    --h2: 2.25rem;  /* 36px */
    --h3: 1.875rem; /* 30px */
    --h4: 1.5rem;   /* 24px */
  }
}

/* Desktop */
@media (min-width: 1024px) {
  :root {
    --h1: 3.75rem;  /* 60px */
    --h2: 3rem;     /* 48px */
    --h3: 2.25rem;  /* 36px */
    --h4: 1.875rem; /* 30px */
  }
}
```

### Spacing Scale Responsive

```css
/* Mobile spacing multiplier: 1x */
/* Tablet spacing multiplier: 1.25x */
/* Desktop spacing multiplier: 1.5x */

.section {
  padding: calc(var(--space-3xl) * var(--spacing-multiplier)) 0;
}
```

### Images and Media

**Mobile Optimization**
- Use `srcset` for responsive images
- Load 1x images by default
- 2x for retina displays
- WebP with JPG fallback

```html
<picture>
  <source
    media="(min-width: 1024px)"
    srcset="hero-desktop.webp 1x, hero-desktop@2x.webp 2x"
    type="image/webp">
  <source
    media="(min-width: 768px)"
    srcset="hero-tablet.webp 1x, hero-tablet@2x.webp 2x"
    type="image/webp">
  <source
    srcset="hero-mobile.webp 1x, hero-mobile@2x.webp 2x"
    type="image/webp">
  <img
    src="hero-mobile.jpg"
    alt="PuffGuard app interface"
    loading="lazy">
</picture>
```

### Touch Targets

**Mobile/Tablet**
- Minimum size: 44x44px
- Spacing between: 8px minimum
- Thumb-friendly zones considered

### Forms and Inputs

**Mobile**
```css
.form-input {
  width: 100%;
  height: 48px;
  font-size: 16px; /* Prevents zoom */
  padding: 12px 16px;
}
```

**Desktop**
```css
.form-input {
  height: 44px;
  padding: 10px 16px;
}
```

### Modals and Overlays

**Mobile**
- Full screen takeover
- Close button in top-right
- Content scrollable

**Tablet/Desktop**
- Centered modal
- Max-width: 600px
- Background overlay
- ESC key to close

### Tables

**Mobile**: Card-based layout
```html
<div class="table-card">
  <div class="table-card-header">Plan Name</div>
  <div class="table-card-body">
    <div class="table-row">
      <span>Price</span>
      <span>$4.99/mo</span>
    </div>
  </div>
</div>
```

**Desktop**: Traditional table
```html
<table class="responsive-table">
  <thead>...</thead>
  <tbody>...</tbody>
</table>
```

## Performance Considerations

### Critical CSS
```css
/* Inline critical above-the-fold styles */
/* Load non-critical CSS asynchronously */
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### Resource Hints
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://analytics.puffguard.com">
```

### Lazy Loading
- Images below fold: `loading="lazy"`
- Intersection Observer for animations
- Code splitting for route-based chunks

## Accessibility Responsive

### Focus Management
- Trap focus in modals
- Skip navigation links
- Visible focus indicators scale with element

### Zoom Support
- Support up to 200% zoom
- No horizontal scroll at 200%
- Text remains readable

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Testing Checklist

### Devices to Test
- [ ] iPhone SE (375px)
- [ ] iPhone 14 Pro (390px)
- [ ] iPad Mini (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1920px)
- [ ] 4K Display (2560px)

### Orientations
- [ ] Portrait mobile
- [ ] Landscape mobile
- [ ] Portrait tablet
- [ ] Landscape tablet

### Key Breakpoint Tests
- [ ] 639px → 640px
- [ ] 767px → 768px
- [ ] 1023px → 1024px
- [ ] 1279px → 1280px

---

**Version**: 1.0.0
**Last Updated**: January 2025