# PuffGuard Component Library

**Version:** 1.0.0
**Last Updated:** 2025-11-30
**Platform:** iOS (Mobile-first)

## Overview

This document catalogs all reusable UI components in the PuffGuard app, including their anatomy, variants, states, props, and usage guidelines.

---

## Table of Contents

1. [Buttons](#buttons)
2. [Cards](#cards)
3. [Navigation](#navigation)
4. [Progress Indicators](#progress-indicators)
5. [Selection Controls](#selection-controls)
6. [Banners & Alerts](#banners--alerts)
7. [Modals & Sheets](#modals--sheets)
8. [Lists & Items](#lists--items)
9. [Badges & Pills](#badges--pills)
10. [Data Visualization](#data-visualization)
11. [Input Fields](#input-fields)
12. [Avatar & Icons](#avatar--icons)

---

## Buttons

### Primary Button

**Purpose:** Main call-to-action buttons for primary user actions.

#### Anatomy
- Background: `btn-primary-bg` (Blue #4339F2)
- Text: `btn-primary-text` (White)
- Padding: `button-padding-vertical` (16px) × `button-padding-horizontal` (24px)
- Border Radius: `btn-radius` (16px)
- Font: `button-text` (16px / Semibold)
- Shadow: `button-shadow`

#### Variants
1. **Full Width**: Spans entire container width
   - Used for: Continue, Save, Primary actions
   - Example: "Continue", "Save my feeling"

2. **Icon Button**: Square button with icon only
   - Size: 68px × 68px
   - Border Radius: 16px
   - Icons: Plus (+), Minus (-)
   - Example: Puff counter increment/decrement buttons

#### States
- **Default**: Blue background, white text
- **Hover**: Lighter blue (`primary-blue-400`)
- **Active/Pressed**: Darker blue (`primary-blue-600`)
- **Disabled**: Gray background (`gray-300`), gray text
- **Loading**: Show spinner, disabled state

#### Accessibility
- Minimum touch target: 44×44pt (iOS)
- Color contrast: 4.5:1 minimum
- Support VoiceOver labels
- Keyboard focusable

#### Usage
```jsx
<PrimaryButton
  text="Continue"
  onPress={handleContinue}
  fullWidth={true}
  disabled={false}
/>
```

#### Do's and Don'ts
✅ Use for primary actions on each screen
✅ Limit to one primary button per screen
✅ Use clear, action-oriented text
❌ Don't use for navigation
❌ Don't stack multiple primary buttons


### Secondary Button

**Purpose:** Alternative actions or dismissive actions.

#### Anatomy
- Background: Transparent
- Text: `text-secondary` (Gray)
- Padding: `button-padding-vertical` (12px)
- Font: `button-text` (16px / Regular)
- No border, no shadow

#### Variants
1. **Text Only**: "No thanks, later", "Maybe later"
2. **Text Link**: Blue text for navigation ("See All", "View feelings →")

#### States
- **Default**: Gray text
- **Pressed**: Opacity 0.6

#### Usage
```jsx
<SecondaryButton
  text="No thanks, later"
  onPress={handleDismiss}
/>
```


### Gradient Button

**Purpose:** Special feature button for AI assistant.

#### Anatomy
- Background: `gradient-primary` (Teal → Pink)
- Text: White with sparkle icon (✨)
- Padding: 12px × 20px
- Border Radius: 20px (pill shape)
- Font: 16px / Semibold

#### Variants
1. **Compact**: "Ask Puffy" (appears in nav)
2. **Full Width**: "Ask Puffy" (in modals)

#### Usage
Only used for the "Ask Puffy" AI assistant feature.

```jsx
<GradientButton
  text="Ask Puffy"
  icon="sparkles"
  onPress={handleAskPuffy}
/>
```

---

## Cards

### Stat Card

**Purpose:** Display key metrics and statistics.

#### Anatomy
- Background: `card-bg` (White)
- Border Radius: `card-radius` (16px)
- Padding: `card-padding` (16px)
- Shadow: `card-shadow`
- Icon: 48px with light purple background
- Label: Gray text, 16px
- Value: Blue text, large size

#### Variants
1. **With Info Icon**: Shows additional info on tap
   - Icon position: Top right
   - Example: Profile insights cards

2. **Colored Background**: Pastel backgrounds
   - Light purple/lavender: Default
   - Used in: Personal Insights section

#### Structure
```
┌─────────────────────────┐
│  [Icon]           (i)   │
│                         │
│  Label Text             │
│  Large Value            │
└─────────────────────────┘
```

#### Props
- `icon`: Icon component or emoji
- `label`: String (e.g., "Total Money saved")
- `value`: String or number (e.g., "$0")
- `hasInfo`: Boolean
- `onInfoPress`: Function

#### Usage
```jsx
<StatCard
  icon={<MoneyBagIcon />}
  label="Total Money saved"
  value="$0"
  hasInfo={true}
  onInfoPress={showMoneyInfo}
/>
```


### Action Card

**Purpose:** Selectable cards for daily tracking (Feeling, Emotions, Note).

#### Anatomy
- Background: White (default), pastel colors (selected/completed)
- Border: 2px blue border (selected), none (default)
- Border Radius: 16px
- Padding: 16px
- Icon: Emoji or illustration (centered)
- Label: Black text, uppercase, bold, 16px

#### Variants
1. **Default**: White background, no border
2. **Selected**: Blue border, white background
3. **Completed**: Pastel background (teal/pink/yellow), emoji changes

#### States
- **Default**: White bg, gray label
- **Selected**: Blue border
- **Completed**: Colored bg, updated emoji
- **Pressed**: Scale 0.98

#### Color Mapping
```
FEELING   → Completed: Light teal (#E8F9FA)
EMOTIONS  → Completed: Light pink (#FFE8EC)
NOTE      → Completed: Light yellow (#FFF9E6)
```

#### Usage
```jsx
<ActionCard
  icon="🌸"
  label="FEELING"
  state="selected"
  onPress={handleFeeling}
/>
```


### Info Banner Card

**Purpose:** Display helpful tips and encouragement.

#### Anatomy
- Background: Pastel color
- Border Radius: 12px
- Padding: 12px
- Icon: Emoji in small circle (left)
- Text: Black, 14px, multiple lines

#### Variants
1. **Yellow**: General tips
2. **Green**: Success/achievements
3. **Pink**: Reflections/notes

#### Usage
```jsx
<InfoBanner
  icon="🍃"
  text="Users who name their emotions are 2x more likely to hit their puff reduction goals."
  variant="green"
/>
```


### List Card

**Purpose:** Group related settings or navigation items.

#### Anatomy
- Background: White
- Border Radius: 16px
- Padding: 0 (items have internal padding)
- Shadow: `shadow-sm`
- Header: Bold text above card

#### Structure
```
Header Text
┌─────────────────────────┐
│ [Icon] Item 1        → │
│ [Icon] Item 2        → │
│ [Icon] Item 3        → │
└─────────────────────────┘
```

#### Usage
Seen in Settings screen.

---

## Navigation

### Bottom Navigation Bar

**Purpose:** Primary app navigation between main sections.

#### Anatomy
- Position: Fixed bottom
- Background: White
- Height: 80px (including safe area)
- Items: 4 tabs
- Shadow: Top shadow

#### Tab Structure
Each tab contains:
- Icon: 24px (top)
- Label: 12px (bottom)
- Active indicator: Blue icon + blue text
- Inactive: Black icon + black text

#### Tabs
1. **Home**: Plus icon in square
2. **Plan**: Clipboard icon
3. **Progress**: Chart icon
4. **Profile**: Person icon

#### States
- **Active**: Blue icon + blue label
- **Inactive**: Black icon + black label
- **Pressed**: Scale 0.95

#### Accessibility
- Each tab has clear label for screen readers
- Touch targets: 44×44pt minimum

#### Usage
```jsx
<BottomNav
  activeTab="home"
  onTabChange={handleTabChange}
/>
```


### Back Navigation

**Purpose:** Return to previous screen.

#### Anatomy
- Icon: Left-pointing chevron
- Size: 24px
- Color: Black
- Position: Top left (24px from edges)
- Touch target: 44×44pt

#### Usage
```jsx
<BackButton onPress={goBack} />
```


### Tab Bar (Segmented Control)

**Purpose:** Switch between views within a screen.

#### Anatomy
- Height: 44px
- Border Radius: 12px
- Background: `gray-200`
- Active segment: Blue background, white text
- Inactive segment: Transparent bg, black text

#### Example
Statistics | Feelings (in Progress screen)

#### Usage
```jsx
<TabBar
  tabs={["Statistics", "Feelings"]}
  activeTab={0}
  onTabChange={handleTabChange}
/>
```

---

## Progress Indicators

### Circular Progress Ring

**Purpose:** Show daily puff count vs. limit.

#### Anatomy
- Outer diameter: ~280px
- Ring width: 40px
- Background ring: `gray-300`
- Progress ring: Blue (under limit) or Blue (at limit)
- Center content: Large number + label
- Below ring: Gray pill with "Last one: [time]"

#### Variants
1. **Empty**: Gray ring, "0/1"
2. **In Progress**: Partial blue fill
3. **Complete**: Full blue ring, "100% of your limit"

#### Animation
- Progress animates smoothly (300ms ease-out)
- Rotates clockwise from top

#### Usage
```jsx
<CircularProgress
  current={0}
  total={1}
  percentage={0}
  lastTime="-"
/>
```


### Linear Progress Bar

**Purpose:** Show completion of tasks (e.g., "0/3 completed").

#### Anatomy
- Text: Emoji + fraction + "completed"
- Visual: Implicit (shown via card states)

#### Example
"👋 0/3 completed" → "👑 3/3 completed"


### Quit Plan Progress Circles

**Purpose:** Show day-by-day progress in quit plan.

#### Anatomy
- Size: 48px diameter
- Spacing: 12px gap
- Horizontal scroll
- Current day: Red outline, filled
- Future days: Gray outline, empty
- Day number inside: Black text

#### Usage
```jsx
<QuitPlanDays
  currentDay={1}
  totalDays={7}
/>
```


### Bar Chart

**Purpose:** Show hourly activity pattern.

#### Anatomy
- Bars: 24 bars (one per hour)
- Bar width: Variable
- Bar height: Proportional to data
- Active bar: Blue
- Inactive bars: Light gray
- X-axis labels: 0h, 6h, 12h, 18h
- Y-axis: Implicit scale

#### Usage
Seen in Progress → Puff Today section.


### Line Chart

**Purpose:** Show progress over time vs. plan.

#### Anatomy
- Axes: X (dates), Y (count)
- Lines:
  - Red: Planned puffs
  - Blue: Actual progress
  - Black: Today marker
- Background: Grid lines
- Points: Circles on data points

#### Legend
- Red dot: "Planned Puff"
- Blue dot: "Your Progress"
- Black dot: "Today"

#### Usage
Seen in My Quit Plan screen.

---

## Selection Controls

### Emoji Selector Buttons

**Purpose:** Select mood/feeling/emotion from predefined options.

#### Anatomy
- Layout: Grid (varies by context)
- Button size: Variable
- Background: White (default), Blue (selected)
- Content: Emoji + label below
- Border Radius: 16px
- Padding: 16px

#### Variants

1. **Mood Selector** (5 options, horizontal)
   - Size: ~100px × 120px
   - Layout: Horizontal scroll
   - Options: Awesome, Good, Okay, Rough, Bad

2. **Emotion Selector** (12+ options, grid)
   - Size: ~100px × 120px
   - Layout: 3 columns
   - Multi-select capable
   - Options: Happy, Excited, Proud, Blessed, Silly, Relaxed, Calm, Surprised, Nervous, etc.

#### States
- **Default**: White bg, black text
- **Selected**: Blue bg, white text
- **Hover**: Scale 0.98

#### Accessibility
- Each option has descriptive label
- Support keyboard navigation
- Announce selection to screen reader

#### Usage
```jsx
<EmojiSelector
  options={moods}
  selected="good"
  multiSelect={false}
  onSelect={handleMoodSelect}
/>
```


### Calendar Day Selector

**Purpose:** Select specific day for tracking.

#### Anatomy
- Size: 48px diameter circles
- Layout: Horizontal row (7 days)
- Labels: Day abbreviation above (SUN, MON, TUE...)
- State indicators: Colors/fills

#### States
- **Default**: White circle, gray border
- **Selected**: Colored fill
- **Today**: Special indicator

#### Usage
Seen in Home screen top section.

---

## Banners & Alerts

### Info Banner

**Purpose:** Provide contextual tips and encouragement.

**Covered under Cards → Info Banner Card**


### Encouragement Banner

**Purpose:** Positive reinforcement for consistent tracking.

#### Anatomy
- Background: Light yellow (#FFF9E6)
- Border Radius: 12px
- Padding: 12px
- Icon: Target emoji in circle (left)
- Text: Black, multi-line
- Border: None

#### Example
"Every day of consistent tracking. Keep the momentum going!"

#### Usage
```jsx
<EncouragementBanner
  message="Every day of consistent tracking. Keep the momentum going!"
/>
```

---

## Modals & Sheets

### Bottom Sheet

**Purpose:** Overlay for additional content or forms.

#### Anatomy
- Background: White with slight transparency
- Border Radius: 24px (top corners only)
- Padding: 20px
- Handle: Gray horizontal bar (top, centered)
- Animation: Slide up from bottom
- Backdrop: Black overlay (40% opacity)

#### Variants

1. **Onboarding/Feature Intro**
   - Content: Icon, title, description, screenshot preview
   - Buttons: Primary + secondary

2. **Form/Input**
   - Content: Title, description, input area
   - Buttons: Primary + secondary

3. **Selection Grid**
   - Content: Title, description, grid of options
   - Buttons: Primary + secondary

#### Animation
- Duration: 300ms
- Easing: ease-out
- Dismissal: Swipe down or tap backdrop

#### Accessibility
- Trap focus within sheet
- Close on ESC key
- Announce sheet opening

#### Usage
```jsx
<BottomSheet
  isOpen={isOpen}
  onClose={handleClose}
  title="How did you feel today?"
>
  <EmojiSelector options={emotions} />
</BottomSheet>
```


### Modal Dialog

**Purpose:** Full-screen overlay for important content.

#### Anatomy
- Background: White or dark overlay
- Close button: X or back arrow (top left/right)
- Content area: Scrollable

#### Example
Onboarding "Meet Puffy" screen

#### Usage
```jsx
<Modal
  isOpen={showOnboarding}
  onClose={dismissOnboarding}
>
  <OnboardingContent />
</Modal>
```

---

## Lists & Items

### Settings List Item

**Purpose:** Navigate to settings sub-screens.

#### Anatomy
- Height: 56px
- Padding: 16px horizontal
- Background: White (in grouped card)
- Icon: Left (24px)
- Label: Center-left, black
- Chevron: Right (gray)
- Separator: Bottom border (gray-200)

#### States
- **Default**: White bg
- **Pressed**: Gray bg (gray-100)

#### Usage
```jsx
<ListItem
  icon={<MailIcon />}
  label="Need help?"
  onPress={handleHelp}
  showChevron={true}
/>
```


### Daily Tip Card

**Purpose:** Display helpful tips with expandable content.

#### Anatomy
- Background: White card
- Icon: Center top (emoji in circle)
- Text: Black, center-aligned
- Button: Blue "SEE MORE" link

#### Usage
```jsx
<DailyTipCard
  icon="💧"
  text="Drink plenty of water to help your body flush out toxins faster."
  onSeeMore={handleSeeMore}
/>
```

---

## Badges & Pills

### Status Badge

**Purpose:** Display user membership status.

#### Anatomy
- Background: Green (#00C853)
- Text: White, uppercase, bold, 14px
- Padding: 6px × 12px
- Border Radius: 8px

#### Variants
1. **Active**: Green background
2. **Inactive**: Gray background

#### Example
"ACTIVE MEMBER"

#### Usage
```jsx
<StatusBadge status="active" text="ACTIVE MEMBER" />
```


### Achievement Badge

**Purpose:** Show locked/unlocked achievements.

#### Anatomy
- Size: ~100px × 120px
- Icon: Badge illustration (centered)
- Label: Black text below
- Lock icon: Blue lock (top right if locked)

#### States
1. **Unlocked**: Full color badge (cyan/pink gradient)
2. **Locked**: Desaturated/light blue with lock icon

#### Usage
```jsx
<AchievementBadge
  icon={badgeIcon}
  label="Begin"
  locked={false}
/>
```


### Pill Button (Chat Suggestion)

**Purpose:** Quick action suggestions in chat.

#### Anatomy
- Background: White
- Border: 1px gray
- Border Radius: 20px (full pill)
- Padding: 10px × 16px
- Icon: Emoji (left)
- Text: Black, 14px

#### Examples
🔥 Streaks | 💡 Tips | 📝 Quit Plan | 💰 Money | 💨 Puff | 😊 Feelings

#### Usage
```jsx
<PillButton
  icon="🔥"
  label="Streaks"
  onPress={handleStreaks}
/>
```

---

## Data Visualization

### Mood Graph

**Purpose:** Visualize mood tracking over time.

#### Anatomy
- Layout: Vertical timeline
- Days: Columns with dates
- Emojis: Positioned vertically by mood level
- Grid: Subtle background grid
- Height: Variable based on mood range

#### Example
Shows emojis plotted across days (Mon Nov 30, Tue Dec 1, etc.)

#### Usage
```jsx
<MoodGraph
  data={moodData}
  startDate="2025-11-30"
  endDate="2025-12-06"
/>
```

---

## Input Fields

### Text Input

**Purpose:** Free-form text entry for notes and reflections.

#### Anatomy
- Background: White
- Border: None (appears on modal/sheet)
- Padding: 16px
- Font: 16px, regular
- Placeholder: Gray text
- Multi-line: Yes

#### States
- **Default**: Gray placeholder
- **Focused**: Blue cursor
- **Filled**: Black text

#### Keyboard
- Type: Default text keyboard
- Autocomplete: Enabled
- Suggestions: Shown above keyboard

#### Usage
```jsx
<TextInput
  placeholder="I eat good food"
  value={note}
  onChange={handleNoteChange}
  multiline={true}
/>
```

---

## Avatar & Icons

### App Mascot (Puffy)

**Purpose:** Brand mascot for AI assistant.

#### Anatomy
- Shape: Cloud-like character
- Color: White with blue background
- Size: 48px (nav) or 100px (intro)
- Features: Simple face (eyes, mouth)
- Background: Blue circle

#### Usage
Appears in "Ask Puffy" button and onboarding.


### Icon System

**Purpose:** Visual indicators throughout app.

#### Style
- Line-based icons (outline style)
- Consistent stroke width: 2px
- Size: 24px standard
- Color: Matches context (black, blue, gray)

#### Common Icons
- ✚ Plus (add)
- − Minus (subtract)
- ✓ Checkmark (complete)
- → Arrow right (navigate)
- ← Arrow left (back)
- ⚙ Settings gear
- 🔒 Lock (locked content)
- ℹ Info circle
- 📊 Chart/graph
- 📋 Clipboard
- 👤 Person/profile
- ✨ Sparkles (AI feature)

---

## Component Interaction Patterns

### Touch States

All interactive components support:
- **Tap**: Primary interaction
- **Long press**: Context actions (where applicable)
- **Swipe**: Dismissal (sheets, modals)

### Feedback

- **Visual**: Color change, scale, opacity
- **Haptic**: Light impact on tap, medium on success
- **Audio**: Optional (system sounds)

---

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

All components must meet:

1. **Color Contrast**: Minimum 4.5:1 for text, 3:1 for UI components
2. **Touch Targets**: Minimum 44×44pt
3. **Focus Indicators**: Visible focus state (blue outline)
4. **Screen Reader**: Descriptive labels and hints
5. **Keyboard Navigation**: Full keyboard support
6. **Motion**: Respect reduced motion preferences

---

## Responsive Behavior

### Mobile-First Approach

Components are designed for iPhone screen sizes:
- iPhone SE: 375pt width (minimum)
- iPhone Pro: 390pt width (standard)
- iPhone Pro Max: 430pt width (maximum)

### Adaptive Patterns

1. **Cards**: Full width with horizontal margins
2. **Grids**: 2-3 columns based on screen width
3. **Text**: Scales with system font size
4. **Spacing**: Proportional to screen size

---

## Design System Integration

All components use design tokens from `design-tokens.md`:
- Colors: Semantic color tokens
- Typography: Font scale and weights
- Spacing: 4px grid system
- Borders: Radius and width tokens
- Shadows: Elevation scale

---

## Version History

### 1.0.0 (2025-11-30)
- Initial component library
- 40+ components documented
- Based on PuffGuard mobile app design
- iOS-first, mobile-optimized components
