# PuffGuard Interaction Specification

**Version:** 1.0.0
**Last Updated:** 2025-11-30
**Platform:** iOS Mobile App

---

## Overview

This document specifies all interactions, animations, transitions, and micro-interactions in the PuffGuard app. It serves as a detailed guide for developers implementing the interactive behaviors of the application.

---

## Table of Contents

1. [Animation Principles](#animation-principles)
2. [Touch Interactions](#touch-interactions)
3. [Transitions](#transitions)
4. [Micro-interactions](#micro-interactions)
5. [Gestures](#gestures)
6. [Haptic Feedback](#haptic-feedback)
7. [Loading States](#loading-states)
8. [Error Handling](#error-handling)
9. [Keyboard Interactions](#keyboard-interactions)

---

## Animation Principles

### Design Philosophy

**Purpose-Driven**: Every animation must serve a functional purpose
- Provide feedback
- Show relationships between elements
- Guide attention
- Indicate state changes
- Create delight

**Performance-First**: Animations must be smooth and efficient
- Target 60fps minimum
- Use GPU-accelerated properties
- Avoid layout thrashing
- Test on older devices (iPhone SE)

**Respectful**: Honor user preferences and context
- Support reduced motion settings
- Keep animations brief (200-400ms typical)
- Allow interruption
- Don't block critical actions

### Core Parameters

```javascript
// Durations
const DURATION = {
  instant: 100,   // Immediate feedback
  fast: 200,      // Quick transitions
  base: 300,      // Standard animations
  slow: 400,      // Emphasized animations
  slower: 600     // Special effects
}

// Easing Functions
const EASING = {
  linear: 'cubic-bezier(0, 0, 1, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
}
```

---

## Touch Interactions

### Button Tap

**Trigger**: User taps any button

**Visual Feedback**:
```
Timeline:
0ms:    Touch down → Scale 1.0 to 0.98
100ms:  Touch up → Scale 0.98 to 1.0
```

**Specifications**:
- **Duration**: 100ms (down), 100ms (up)
- **Easing**: Ease-in-out
- **Transform**: scale(0.98)
- **Opacity**: No change
- **Haptic**: Light impact on touch down

**Code Example**:
```javascript
const buttonTapAnimation = {
  onPressIn: {
    scale: 0.98,
    duration: 100,
    easing: EASING.easeInOut
  },
  onPressOut: {
    scale: 1.0,
    duration: 100,
    easing: EASING.easeInOut
  }
}
```

**Applies To**:
- Primary buttons
- Secondary buttons
- Icon buttons
- Gradient "Ask Puffy" button


### Card Tap

**Trigger**: User taps selectable card (Feeling, Emotions, Note)

**Visual Feedback**:
```
Timeline:
0ms:    Touch down → Scale 1.0 to 0.98
100ms:  Touch up → Scale 0.98 to 1.0
200ms:  State change → Border color transition
```

**Specifications**:
- **Duration**: 100ms (scale), 200ms (border)
- **Easing**: Ease-out
- **Transform**: scale(0.98)
- **Border**: Animate color change
- **Haptic**: Medium impact on selection

**State Transitions**:
```
Default → Selected:
  border: transparent → blue (2px)
  duration: 200ms

Selected → Default:
  border: blue → transparent
  duration: 200ms

Default → Completed:
  background: white → pastel color
  border: transparent → none
  duration: 300ms
```


### List Item Tap

**Trigger**: User taps settings list item

**Visual Feedback**:
```
Timeline:
0ms:    Touch down → Background white to gray-100
100ms:  Touch up → Background gray-100 to white
200ms:  Navigate (if applicable)
```

**Specifications**:
- **Duration**: 100ms (highlight), 100ms (fade)
- **Easing**: Linear
- **Background**: gray-100
- **Haptic**: None (uses default iOS behavior)


### Number Counter (+/-)

**Trigger**: User taps + or - button for puff counting

**Visual Feedback**:
```
Timeline:
0ms:    Touch down → Button scale to 0.95
100ms:  Touch up → Button scale to 1.0
150ms:  Number starts animating
550ms:  Number animation completes
600ms:  Progress ring starts animating
900ms:  Progress ring completes
```

**Specifications**:

**Button**:
- **Duration**: 100ms
- **Transform**: scale(0.95)
- **Haptic**: Medium impact

**Number**:
- **Duration**: 400ms
- **Easing**: Ease-out
- **Method**: Interpolate from old to new value
- **Font weight**: Brief bold emphasis (400 → 700 → 400)

**Progress Ring**:
- **Duration**: 300ms
- **Easing**: Ease-out
- **Delay**: 100ms after number
- **Property**: stroke-dashoffset

---

## Transitions

### Screen Transitions

#### Navigation Push (Forward)

**Trigger**: Navigate to detail screen

**Animation**:
```
Timeline:
0ms:    New screen enters from right
        Old screen begins sliding left
300ms:  Transition complete
```

**Specifications**:
- **Duration**: 300ms
- **Easing**: Ease-out
- **New Screen**: translateX(100%) → translateX(0)
- **Old Screen**: translateX(0) → translateX(-30%), opacity 1.0 → 0.3
- **Overlap**: Yes (simultaneous)

**Applies To**:
- Home → Puff Detail
- Profile → Settings
- Progress → Detailed Stats


#### Navigation Pop (Back)

**Trigger**: Tap back button or swipe from left edge

**Animation**:
```
Timeline:
0ms:    Current screen slides right
        Previous screen fades in from left
300ms:  Transition complete
```

**Specifications**:
- **Duration**: 300ms
- **Easing**: Ease-out
- **Current Screen**: translateX(0) → translateX(100%)
- **Previous Screen**: translateX(-30%) → translateX(0), opacity 0.3 → 1.0
- **Gesture**: Edge swipe can control animation progress interactively


#### Tab Switch

**Trigger**: Tap bottom navigation tab

**Animation**:
```
Timeline:
0ms:    Old content fades out
        Tab indicator slides to new position
100ms:  Old content fully transparent
100ms:  New content starts fading in
250ms:  New content fully visible
        Transition complete
```

**Specifications**:

**Content**:
- **Duration**: 150ms (fade out), 150ms (fade in)
- **Easing**: Linear
- **Overlap**: No (fade out completes before fade in)

**Tab Indicator**:
- **Duration**: 250ms
- **Easing**: Ease-in-out
- **Property**: color (black ↔ blue), icon fill
- **Simultaneous**: Yes (with content transition)


### Modal & Sheet Transitions

#### Bottom Sheet Presentation

**Trigger**: Open modal/bottom sheet

**Animation**:
```
Timeline:
0ms:    Backdrop fades in (opacity 0 → 0.4)
        Sheet positioned below screen (translateY(100%))
50ms:   Sheet begins sliding up
350ms:  Sheet fully visible (translateY(0))
        Backdrop fully visible
```

**Specifications**:

**Backdrop**:
- **Duration**: 300ms
- **Easing**: Linear
- **Opacity**: 0 → 0.4
- **Color**: Black

**Sheet**:
- **Duration**: 300ms
- **Easing**: Ease-out
- **Transform**: translateY(100%) → translateY(0)
- **Delay**: 50ms
- **Haptic**: Medium impact when sheet appears


#### Bottom Sheet Dismissal

**Trigger**: Swipe down, tap backdrop, or tap close button

**Animation**:
```
Timeline:
0ms:    Sheet begins sliding down
        Backdrop begins fading out
300ms:  Sheet off-screen (translateY(100%))
        Backdrop fully transparent
        Remove from DOM
```

**Specifications**:
- **Duration**: 300ms
- **Easing**: Ease-in
- **Transform**: translateY(0) → translateY(100%)
- **Backdrop opacity**: 0.4 → 0
- **Simultaneous**: Yes


#### Modal Presentation (Full Screen)

**Trigger**: Onboarding, full-screen overlays

**Animation**:
```
Timeline:
0ms:    Modal fades in (opacity 0 → 1.0)
        Scale from 0.95 to 1.0
300ms:  Fully visible
```

**Specifications**:
- **Duration**: 300ms
- **Easing**: Ease-out
- **Opacity**: 0 → 1.0
- **Transform**: scale(0.95) → scale(1.0)
- **Backdrop**: Immediate (no fade)

---

## Micro-interactions

### Progress Ring Fill

**Trigger**: Puff count changes

**Animation**:
```
Timeline:
0ms:    Number updates (see Number Counter)
100ms:  Ring begins animating
400ms:  Ring animation completes
```

**Specifications**:
- **Duration**: 300ms
- **Easing**: Ease-out
- **Property**: stroke-dashoffset
- **Direction**: Clockwise from top (12 o'clock)
- **Delay**: 100ms after number update

**Visual Details**:
- Smooth interpolation between old and new percentage
- No jank or jumping
- Color changes at threshold (if applicable)

**Special Cases**:
- 0% → Any: Animate from empty
- Any → 100%: Celebrate with brief bounce (scale 1.0 → 1.05 → 1.0)
- 100% → Over: Change color to warning state


### Emoji Selection

**Trigger**: User selects emotion/feeling

**Animation**:
```
Timeline:
0ms:    Tap button (scale feedback)
100ms:  Background color begins transition
300ms:  Background fully changed to blue
        Border appears/disappears
350ms:  Previous selection deselects (if single-select)
```

**Specifications**:

**Selection**:
- **Duration**: 200ms
- **Easing**: Ease-in-out
- **Background**: white → blue
- **Text color**: black → white
- **Border**: none → 2px solid blue (or transparent → blue)

**Deselection**:
- **Duration**: 200ms
- **Easing**: Ease-in-out
- **Background**: blue → white
- **Text color**: white → black
- **Delay**: 50ms (stagger for visual interest)


### Completion Checkmark

**Trigger**: User completes daily task

**Animation**:
```
Timeline:
0ms:    Task card background begins color transition
200ms:  Checkmark icon fades in with scale
        Icon: scale(0) opacity(0) → scale(1) opacity(1)
400ms:  Animation complete
```

**Specifications**:
- **Card background**: 300ms, ease-out
- **Checkmark**: 200ms, ease-out with bounce
- **Transform**: scale(0) → scale(1.2) → scale(1.0)
- **Opacity**: 0 → 1
- **Haptic**: Success notification (medium)


### "Ask Puffy" Gradient Button Shine

**Trigger**: On render (optional, subtle)

**Animation**:
```
Timeline (continuous loop):
0ms:    Gradient position 0%
2000ms: Gradient position 100%
```

**Specifications**:
- **Duration**: 2000ms
- **Easing**: Linear
- **Loop**: Infinite
- **Property**: background-position
- **Subtle**: Low opacity overlay
- **Optional**: Can be disabled for performance


### Counter Increment

**Trigger**: Number value changes anywhere in app

**Animation**:
```
Timeline:
0ms:    Old number present
50ms:   Old number fades/slides up slightly
200ms:  New number fades/slides in from below
350ms:  Animation complete
```

**Specifications**:
- **Duration**: 300ms total
- **Easing**: Ease-out
- **Method**: Cross-fade with slight vertical motion
- **Transform**: translateY(0) → translateY(-5px) for old, translateY(5px) → translateY(0) for new
- **Overlap**: Yes (50ms)


### Encouragement Banner Appearance

**Trigger**: User achieves milestone or consistent behavior

**Animation**:
```
Timeline:
0ms:    Banner off-screen (translateY(-100%))
100ms:  Banner slides down
400ms:  Fully visible
3000ms: (Optional) Auto-dismiss: slides up
```

**Specifications**:
- **Duration**: 300ms (appear), 300ms (dismiss)
- **Easing**: Ease-out (appear), ease-in (dismiss)
- **Transform**: translateY(-100%) ↔ translateY(0)
- **Haptic**: Success notification


### Chart Data Point Interaction

**Trigger**: User taps data point on chart

**Animation**:
```
Timeline:
0ms:    Data point scales up
        Tooltip fades in above point
200ms:  Fully visible
```

**Specifications**:
- **Point**: scale(1.0) → scale(1.3), duration 150ms
- **Tooltip**: opacity 0 → 1, translateY(10px) → translateY(0), duration 200ms
- **Easing**: Ease-out
- **Haptic**: Light impact


### Achievement Badge Unlock

**Trigger**: User earns achievement

**Animation**:
```
Timeline:
0ms:    Badge appears at small scale with glow
100ms:  Badge scales up with bounce
500ms:  Glow pulses
800ms:  Animation settles
```

**Specifications**:
- **Badge**: scale(0) → scale(1.2) → scale(1.0)
- **Duration**: 600ms
- **Easing**: Bounce
- **Glow**: Pulsing opacity 0.5 → 1.0 → 0.5
- **Haptic**: Success notification (heavy)
- **Sound**: Optional success chime


---

## Gestures

### Swipe Back

**Gesture**: Swipe from left edge to go back

**Behavior**:
```
Edge Detection: 0-30px from left edge
Threshold: 50% of screen width or >150pt velocity
```

**Interactive Animation**:
- Tracks finger position during gesture
- Current screen: translateX(0 → dragDistance)
- Previous screen: translateX(-30% → -30% + dragDistance * 0.3)
- Opacity of previous: 0.3 → 1.0 proportionally

**Completion**:
- If threshold met: Complete transition (same as pop)
- If threshold not met: Spring back to original position

**Specifications**:
- **Minimum drag**: 30px to start
- **Completion threshold**: 50% width or high velocity
- **Spring back**: 250ms, ease-out


### Bottom Sheet Swipe Down

**Gesture**: Swipe down on bottom sheet to dismiss

**Behavior**:
```
Drag Detection: Anywhere on sheet
Threshold: 100pt drag or >200pt velocity downward
```

**Interactive Animation**:
- Tracks finger during drag
- Sheet: translateY(0 → dragDistance)
- Backdrop: opacity 0.4 → (0.4 * (1 - progress))

**Completion**:
- If threshold met: Complete dismissal
- If threshold not met: Spring back to open position

**Specifications**:
- **Minimum drag**: 20px to start
- **Completion threshold**: 100pt or fast swipe
- **Spring back**: 300ms, ease-out
- **Haptic**: Light impact when threshold reached


### Pull to Refresh (Future)

**Gesture**: Pull down from top of scrollable content

**Not yet implemented but prepared for**:
- Standard iOS pull-to-refresh
- Loading indicator appears
- Haptic feedback on trigger


### Long Press (Context Actions)

**Gesture**: Press and hold on certain elements

**Behavior**:
```
Duration: 500ms minimum hold
Feedback: Haptic after 500ms
Action: Show context menu or action sheet
```

**Current Usage**:
- Not widely used in v1.0
- Prepared for future features (e.g., edit/delete notes)


---

## Haptic Feedback

### Haptic Types

**Light Impact**:
- Subtle feedback for minor interactions
- Use: Chart taps, small selections

**Medium Impact**:
- Standard feedback for most interactions
- Use: Button taps, card selections, puff counter

**Heavy Impact**:
- Strong feedback for significant actions
- Use: Achievement unlocked, goal completed

**Success Notification**:
- Positive feedback pattern
- Use: Task completion, saving data

**Warning Notification**:
- Alert feedback pattern
- Use: Approaching limit, validation errors

**Error Notification**:
- Error feedback pattern
- Use: Failed actions, critical errors


### Haptic Guidelines

**When to Use**:
✅ User completes action
✅ Important state change
✅ Reaching threshold or goal
✅ Error prevention

**When NOT to Use**:
❌ Passive scrolling
❌ Frequent repetitive actions
❌ Every single tap
❌ Background updates

### Haptic Map

```javascript
const HAPTICS = {
  // Buttons
  primaryButton: 'medium',
  secondaryButton: 'light',
  iconButton: 'light',

  // Selections
  emojiSelect: 'medium',
  cardSelect: 'medium',
  tabSwitch: 'light',

  // Counters
  puffIncrement: 'medium',
  puffDecrement: 'medium',

  // Milestones
  taskComplete: 'success',
  allTasksComplete: 'success',
  achievementUnlock: 'heavy',
  goalReached: 'success',

  // Sheets/Modals
  sheetAppear: 'medium',
  sheetDismiss: 'light',

  // Errors
  validationError: 'warning',
  actionFailed: 'error',
  limitExceeded: 'warning'
}
```

---

## Loading States

### Initial App Load

**Sequence**:
```
0ms:    Splash screen (static)
1000ms: Fade to loading spinner
2000ms: Data loaded, fade to home screen
```

**Specifications**:
- **Splash**: System splash screen (logo + background)
- **Spinner**: Blue spinner, centered, 40px
- **Fade**: 300ms cross-fade


### Content Loading (Skeleton)

**Trigger**: Loading data for screen

**Behavior**:
```
Show skeleton screens with:
- Gray placeholder blocks
- Subtle shimmer animation
- Maintain layout structure
```

**Specifications**:

**Shimmer**:
- **Duration**: 1500ms
- **Loop**: Infinite
- **Gradient**: gray-200 → gray-100 → gray-200
- **Direction**: Left to right
- **Width**: 100px

**Transition to Content**:
- **Duration**: 200ms
- **Method**: Fade skeleton out, fade content in
- **Overlap**: 100ms


### Button Loading

**Trigger**: User taps button, action is processing

**Behavior**:
```
Timeline:
0ms:    Button disabled
        Text fades out (opacity 1 → 0)
100ms:  Spinner fades in (opacity 0 → 1)
...     Processing...
        Spinner fades out
        Text fades in
        Button re-enabled
```

**Specifications**:
- **Spinner**: 20px, blue, centered in button
- **Animation**: Rotate 360° every 800ms
- **Text**: Maintain button size during loading
- **Disabled**: true (prevent double-tap)


### Progress Bar (Determinate)

**Usage**: File uploads, multi-step processes (future)

**Specifications**:
- **Height**: 4px
- **Color**: Blue
- **Background**: gray-200
- **Animation**: Smooth width transition, 200ms ease-out


### Progress Indicator (Indeterminate)

**Usage**: Unknown duration processes

**Specifications**:
- **Type**: Circular spinner or linear indeterminate
- **Color**: Blue
- **Size**: 40px (large) or 20px (inline)
- **Animation**: Continuous rotation or wave


---

## Error Handling

### Inline Validation Error

**Trigger**: User enters invalid data

**Animation**:
```
Timeline:
0ms:    Field border turns red
        Error message fades in below field
200ms:  Fully visible
        Shake animation (optional)
```

**Shake Animation**:
```
0ms:    translateX(0)
50ms:   translateX(-10px)
100ms:  translateX(10px)
150ms:  translateX(-5px)
200ms:  translateX(0)
```

**Specifications**:
- **Border**: 200ms, color transition to red
- **Error text**: 200ms fade-in, red color
- **Shake**: 200ms, ease-in-out (optional)
- **Haptic**: Error notification


### Alert/Error Banner

**Trigger**: System error or important message

**Animation**:
```
Timeline:
0ms:    Banner slides down from top
300ms:  Fully visible
5000ms: Auto-dismiss (or user dismisses)
```

**Specifications**:
- **Transform**: translateY(-100%) → translateY(0)
- **Duration**: 300ms (appear), 300ms (dismiss)
- **Easing**: Ease-out
- **Color**: Red background for errors, yellow for warnings
- **Auto-dismiss**: 5 seconds (closeable earlier)
- **Haptic**: Warning or error notification


### Network Error State

**Trigger**: No internet connection

**Behavior**:
```
Show message:
"No internet connection"
Icon: Disconnected cloud
Button: "Try Again"
```

**Specifications**:
- **Icon**: Gray, 64px
- **Text**: Gray, center-aligned
- **Button**: Secondary style
- **Layout**: Centered on screen or in content area


### Empty State

**Trigger**: No data to display

**Behavior**:
```
Show message:
Illustration or icon
Headline: "No [content] yet"
Subtext: Explanation or encouragement
CTA: Action to create content (optional)
```

**Specifications**:
- **Icon**: 100px, gray
- **Headline**: 24px, semibold
- **Subtext**: 16px, gray
- **Fade in**: 300ms when state becomes empty


---

## Keyboard Interactions

### Keyboard Appearance

**Trigger**: User taps text input

**Animation**:
```
Timeline:
0ms:    Keyboard begins sliding up
        Content scrolls to keep input visible
300ms:  Keyboard fully visible
        Input focused with cursor
```

**Specifications**:
- **Duration**: 300ms (system-controlled)
- **Content scroll**: Smooth, ensures input visible with 20px padding
- **Focus**: Blue cursor appears immediately


### Keyboard Dismissal

**Trigger**: User taps "Done" or taps outside input

**Animation**:
```
Timeline:
0ms:    Keyboard begins sliding down
        Content returns to original position
300ms:  Keyboard fully hidden
```

**Specifications**:
- **Duration**: 300ms
- **Content**: Scroll back to natural position
- **Input**: Loses focus, cursor disappears


### Input Suggestions

**Trigger**: iOS keyboard provides autocomplete suggestions

**Behavior**:
```
Suggestions appear above keyboard
User can tap to accept
```

**Native iOS behavior, no custom animation needed**


---

## Accessibility Considerations

### Reduced Motion

**When User Enables "Reduce Motion"**:

**Disable**:
- All decorative animations (shimmer, shine)
- Bouncing and spring effects
- Scale transformations

**Simplify**:
- Fade instead of slide
- Instant instead of animated
- Cross-fade instead of complex transitions

**Keep**:
- Essential state changes (showing/hiding)
- User-initiated gestures
- Loading indicators


### Voice Control

**Requirements**:
- All interactive elements have tap targets ≥44pt
- Clear focus indicators
- Logical focus order
- Announce state changes to screen reader


### Dynamic Type

**Behavior**:
- Animations scale with text size
- No fixed heights that break with large text
- Maintain touch targets even with larger text


---

## Performance Optimization

### Animation Performance

**Best Practices**:
- Use `transform` and `opacity` only (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Remove animations from off-screen elements
- Limit concurrent animations to 3-4 max

**Measurement**:
- Target: 60fps (16.67ms per frame)
- Test on iPhone SE (oldest supported device)
- Profile with developer tools
- Monitor dropped frames


### Gesture Performance

**Optimization**:
- Throttle gesture callbacks to 60fps max
- Use hardware-accelerated transforms
- Minimize recalculations during gesture
- Batch DOM updates


---

## Testing Checklist

### Interaction Testing

- [ ] All buttons respond to tap with feedback
- [ ] Gestures work on all screen sizes
- [ ] Animations complete smoothly at 60fps
- [ ] Haptics fire at correct moments
- [ ] Loading states appear when appropriate
- [ ] Error states animate correctly
- [ ] Keyboard interactions are smooth
- [ ] Reduced motion mode works correctly
- [ ] Touch targets are ≥44pt
- [ ] No double-tap issues

### Animation Testing

- [ ] No jank or frame drops
- [ ] Animations respect reduced motion
- [ ] Timing is consistent across devices
- [ ] Transitions feel natural
- [ ] Interruptions handled gracefully
- [ ] Performance on iPhone SE acceptable

---

## Version History

### 1.0.0 (2025-11-30)
- Initial interaction specification
- Complete animation timing documentation
- Gesture behavior specification
- Haptic feedback mapping
- Accessibility considerations
- Performance guidelines

---

## References

- **Design Tokens**: `design-tokens.md` (animation tokens)
- **Component Library**: `component-library.md` (component states)
- **Design Spec**: `design-spec.md` (overall design system)
- **Apple Human Interface Guidelines**: Gestures, Haptics, Animations
- **iOS Animation Best Practices**: https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/animation/

---

*This specification ensures consistent, delightful, and performant interactions throughout the PuffGuard app.*
