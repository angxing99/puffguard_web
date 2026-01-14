# PuffGuard Web - Interaction & Animation Specifications

## Animation Principles

1. **Purpose-Driven**: Every animation serves a UX purpose
2. **Performance-First**: 60fps target, GPU-accelerated
3. **Accessibility**: Respect prefers-reduced-motion
4. **Consistency**: Unified timing and easing across site

## Global Animation Tokens

```css
:root {
  /* Timing */
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;

  /* Easing Functions */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Spring Animations */
  --spring-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --spring-bouncy: cubic-bezier(0.68, -0.25, 0.265, 1.25);
}
```

## Page Load Animations

### Hero Section Entrance
```css
/* Sequence: Logo → Headline → Subheadline → CTA → Image */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-headline {
  animation: fadeInUp var(--duration-slow) var(--ease-out);
  animation-fill-mode: both;
}

.hero-subheadline {
  animation: fadeInUp var(--duration-slow) var(--ease-out);
  animation-delay: 100ms;
  animation-fill-mode: both;
}

.hero-cta {
  animation: fadeInUp var(--duration-slow) var(--ease-out);
  animation-delay: 200ms;
  animation-fill-mode: both;
}

.hero-image {
  animation: fadeInScale var(--duration-slower) var(--ease-out);
  animation-delay: 300ms;
  animation-fill-mode: both;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

## Scroll-Triggered Animations

### Intersection Observer Setup
```javascript
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('[data-animate]').forEach(el => {
  observer.observe(el);
});
```

### Scroll Animation Classes
```css
/* Fade In */
[data-animate="fade"] {
  opacity: 0;
  transition: opacity var(--duration-slow) var(--ease-out);
}

[data-animate="fade"].animate {
  opacity: 1;
}

/* Slide Up */
[data-animate="slide-up"] {
  opacity: 0;
  transform: translateY(40px);
  transition: all var(--duration-slow) var(--ease-out);
}

[data-animate="slide-up"].animate {
  opacity: 1;
  transform: translateY(0);
}

/* Scale In */
[data-animate="scale"] {
  opacity: 0;
  transform: scale(0.8);
  transition: all var(--duration-normal) var(--ease-out);
}

[data-animate="scale"].animate {
  opacity: 1;
  transform: scale(1);
}

/* Stagger Children */
[data-animate="stagger"] > * {
  opacity: 0;
  transform: translateY(20px);
  transition: all var(--duration-normal) var(--ease-out);
}

[data-animate="stagger"].animate > * {
  opacity: 1;
  transform: translateY(0);
}

[data-animate="stagger"].animate > *:nth-child(1) { transition-delay: 0ms; }
[data-animate="stagger"].animate > *:nth-child(2) { transition-delay: 100ms; }
[data-animate="stagger"].animate > *:nth-child(3) { transition-delay: 200ms; }
[data-animate="stagger"].animate > *:nth-child(4) { transition-delay: 300ms; }
```

## Micro-Interactions

### Button Interactions
```css
.button {
  position: relative;
  overflow: hidden;
  transition: all var(--duration-fast) var(--ease-out);
}

/* Hover State */
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(67, 57, 242, 0.3);
}

/* Active State */
.button:active {
  transform: translateY(0);
  transition-duration: var(--duration-instant);
}

/* Ripple Effect */
.button::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  transform: scale(0);
  opacity: 0;
  transition: all var(--duration-normal) var(--ease-out);
}

.button:active::after {
  transform: scale(1);
  opacity: 1;
  transition-duration: 0s;
}
```

### Card Hover Effects
```css
.card {
  transition: all var(--duration-normal) var(--ease-out);
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.card-icon {
  transition: transform var(--duration-normal) var(--spring-bouncy);
}
```

### Form Input Animations
```css
.form-group {
  position: relative;
}

.form-input {
  border: 2px solid var(--color-gray-200);
  transition: all var(--duration-fast) var(--ease-out);
}

.form-input:focus {
  border-color: var(--color-primary-400);
  box-shadow: 0 0 0 3px rgba(67, 57, 242, 0.1);
}

/* Floating Label */
.form-label {
  position: absolute;
  top: 16px;
  left: 16px;
  transition: all var(--duration-fast) var(--ease-out);
  pointer-events: none;
}

.form-input:focus ~ .form-label,
.form-input:not(:placeholder-shown) ~ .form-label {
  top: -10px;
  left: 12px;
  font-size: 12px;
  color: var(--color-primary-400);
  background: white;
  padding: 0 4px;
}
```

## Navigation Animations

### Mobile Menu
```css
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  transform: translateX(-100%);
  transition: transform var(--duration-normal) var(--ease-out);
}

.mobile-menu.open {
  transform: translateX(0);
}

/* Menu Items Stagger */
.mobile-menu.open .menu-item {
  animation: slideInRight var(--duration-normal) var(--ease-out) both;
}

.mobile-menu.open .menu-item:nth-child(1) { animation-delay: 100ms; }
.mobile-menu.open .menu-item:nth-child(2) { animation-delay: 150ms; }
.mobile-menu.open .menu-item:nth-child(3) { animation-delay: 200ms; }
.mobile-menu.open .menu-item:nth-child(4) { animation-delay: 250ms; }

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Hamburger to X Animation
```css
.hamburger {
  width: 24px;
  height: 24px;
  position: relative;
}

.hamburger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-gray-900);
  transition: all var(--duration-fast) var(--ease-out);
}

.hamburger span:nth-child(1) { top: 6px; }
.hamburger span:nth-child(2) { top: 11px; }
.hamburger span:nth-child(3) { top: 16px; }

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg);
  top: 11px;
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg);
  top: 11px;
}
```

## Loading States

### Skeleton Loading
```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-gray-200) 25%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

### Progress Indicators
```css
.progress-bar {
  position: relative;
  height: 4px;
  background: var(--color-gray-200);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary-400);
  transform-origin: left;
  transition: transform var(--duration-normal) var(--ease-out);
}

/* Indeterminate Progress */
@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

.progress-indeterminate::after {
  content: '';
  position: absolute;
  inset: 0;
  width: 50%;
  background: var(--color-primary-400);
  animation: progress-indeterminate 1.5s infinite var(--ease-in-out);
}
```

## Accordion/FAQ Animations
```css
.accordion-item {
  border-bottom: 1px solid var(--color-gray-200);
}

.accordion-header {
  padding: 24px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color var(--duration-fast) var(--ease-out);
}

.accordion-header:hover {
  color: var(--color-primary-400);
}

.accordion-icon {
  transition: transform var(--duration-fast) var(--ease-out);
}

.accordion-item.open .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--duration-normal) var(--ease-out);
}

.accordion-item.open .accordion-content {
  max-height: 500px; /* Adjust based on content */
  transition: max-height var(--duration-normal) var(--ease-in);
}

.accordion-content-inner {
  padding: 0 0 24px 0;
  opacity: 0;
  transform: translateY(-10px);
  transition: all var(--duration-fast) var(--ease-out) 100ms;
}

.accordion-item.open .accordion-content-inner {
  opacity: 1;
  transform: translateY(0);
}
```

## Number Counter Animation
```javascript
function animateValue(element, start, end, duration) {
  const range = end - start;
  const startTime = performance.now();

  function updateValue(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (range * easeOutQuart));

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateValue);
    }
  }

  requestAnimationFrame(updateValue);
}

// Usage
const counter = document.querySelector('[data-counter]');
const targetValue = parseInt(counter.dataset.counter);
animateValue(counter, 0, targetValue, 2000);
```

## Performance Guidelines

### CSS Transform Best Practices
```css
/* DO: Use transform and opacity */
.optimized {
  transform: translateX(100px);
  opacity: 0.5;
}

/* DON'T: Animate position or dimensions */
.not-optimized {
  left: 100px;
  width: 200px;
}
```

### Will-Change Usage
```css
/* Add before animation */
.element-will-animate {
  will-change: transform, opacity;
}

/* Remove after animation */
.element-done-animating {
  will-change: auto;
}
```

### Reduce Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Testing Checklist

- [ ] All animations run at 60fps
- [ ] No layout thrashing
- [ ] Animations work on low-end devices
- [ ] Reduced motion preference respected
- [ ] Touch feedback is immediate
- [ ] Loading states for all async operations
- [ ] No animation conflicts
- [ ] Smooth scroll behavior
- [ ] Focus states animated appropriately

---

**Version**: 1.0.0
**Last Updated**: January 2025