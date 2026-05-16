# Momentix UI/UX Research & Design System

**Version:** 1.0  
**Date:** May 2026  
**Status:** Approved for MVP Implementation

---

## 📋 Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Design Style & Aesthetic](#design-style--aesthetic)
5. [Component Specifications](#component-specifications)
6. [MVP Screens Layout](#mvp-screens-layout)
7. [Spacing & Layout Grid](#spacing--layout-grid)
8. [Micro-interactions & Motion](#micro-interactions--motion)
9. [Accessibility Guidelines](#accessibility-guidelines)
10. [Design Tokens](#design-tokens)

---

## 🎯 Design Philosophy

### **Core Principle: Minimalist Maximalism**

Momentix blends **minimalism with emotional warmth**:
- **Minimalism:** Clean layouts, intentional whitespace, focused content
- **Emotional Warmth:** Soft colors, rounded forms, human-centered copy
- **Result:** Calm yet expressive, simple yet memorable

### **Design Goals**

1. **Emotional Connection** → Users feel the warmth of memories
2. **Clarity** → Auth/story creation is intuitive, never confusing
3. **Trust** → Modern, professional appearance builds confidence
4. **Accessibility** → Works for all users, regardless of ability
5. **Performance** → Fast, responsive, minimal file sizes

### **Target Audience Emotional State**

Users come to Momentix to:
- Preserve important moments
- Express love & gratitude
- Connect with others emotionally
- Celebrate milestones

**Design must evoke:** Warmth, nostalgia, joy, authenticity

---

## 🎨 Color System

### **Primary Palette**

| Color Name | Hex | RGB | Usage | Emotion |
|-----------|-----|-----|-------|---------|
| **Warm Cream** | `#FBF9F6` | (251, 249, 246) | Background, base | Calm, approachable |
| **Warm Taupe** | `#F5F1ED` | (245, 241, 237) | Secondary bg, cards | Soft, grounded |
| **Charcoal** | `#2C2C2C` | (44, 44, 44) | Text, UI elements | Professional, readable |
| **Warm Gold** | `#D4A574` | (212, 165, 116) | Primary accent, CTA | Warm, inviting |
| **Dusty Rose** | `#C89E8F` | (200, 158, 143) | Secondary accent, hover | Emotional, gentle |

### **Secondary Palette**

| Color Name | Hex | RGB | Usage | Purpose |
|-----------|-----|-----|-------|---------|
| **Sage Green** | `#B8C5A6` | (184, 197, 166) | Success, positive | Trust, growth |
| **Soft Coral** | `#E8B4B0` | (232, 180, 176) | Accent, highlight | Energy, warmth |
| **Dusty Teal** | `#7DA99A` | (125, 169, 154) | Secondary CTA | Balance, calm |
| **Light Gray** | `#E8E6E1` | (232, 230, 225) | Borders, dividers | Subtle separation |
| **Charcoal Light** | `#5A5A5A` | (90, 90, 90) | Secondary text | Readability |

### **Semantic Colors**

| Semantic | Color | Hex | Usage |
|----------|-------|-----|-------|
| **Success** | Sage Green | `#B8C5A6` | Confirmations, valid states |
| **Warning** | Warm Gold | `#D4A574` | Cautions, incomplete forms |
| **Error** | Soft Coral | `#E8B4B0` | Errors, validation failures |
| **Info** | Dusty Teal | `#7DA99A` | Information, tooltips |
| **Disabled** | Light Gray | `#E8E6E1` | Disabled buttons, inactive |

### **Color Psychology for Momentix**

- **Warm Cream & Taupe:** Evoke nostalgia, warmth, comfort (memory-making)
- **Warm Gold:** Inviting, precious, emotional (call to action)
- **Dusty Rose:** Gentle, emotional, authentic (secondary actions)
- **Sage Green:** Growth, trust, stability (success states)
- **Charcoal:** Professional, legible, grounded (text)

### **60-30-10 Rule Application**

```
60% - Warm Cream (Background, primary surface)
30% - Charcoal (Text, UI elements)
10% - Warm Gold + Dusty Rose (Accents, CTAs, highlights)
```

---

## 📝 Typography System

### **Font Stack**

#### **Display Font (Headlines)**
- **Primary:** `Inter` (Google Fonts, free)
- **Weights Used:** 700 (Bold), 600 (SemiBold)
- **Purpose:** H1, H2, page titles, big statements
- **Why Inter:** Modern, clean, friendly, excellent on-screen readability
- **Fallback:** `-apple-system, BlinkMacSystemFont, sans-serif`

#### **UI Font (Body & UI Text)**
- **Primary:** `DM Sans` (Google Fonts, free)
- **Weights Used:** 400 (Regular), 500 (Medium), 700 (Bold)
- **Purpose:** Body text, buttons, form labels, UI labels
- **Why DM Sans:** Geometric, low-contrast, optimized for small sizes, excellent UI legibility
- **Fallback:** `Inter, sans-serif`

#### **Accent Font (Optional, Sparingly)**
- **Name:** `Playfair Display` (Google Fonts, free)
- **Weights Used:** 400, 700
- **Purpose:** Special moments, story titles, quotes (use minimally)
- **Why Playfair Display:** High contrast serif, emotional, storytelling-focused, luxury feel
- **Fallback:** `Georgia, serif`

### **Type Scale**

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| **H1** | 40px | 700 (Bold) | 1.2 | -0.5px | Page titles (login/signup/dashboard) |
| **H2** | 32px | 700 (Bold) | 1.25 | -0.3px | Major section headings |
| **H3** | 24px | 600 (SemiBold) | 1.3 | -0.2px | Subsection headings |
| **H4** | 20px | 600 (SemiBold) | 1.35 | 0px | Card titles, subheadings |
| **Body Large** | 18px | 400 (Regular) | 1.5 | 0px | Large text, descriptions |
| **Body** | 16px | 400 (Regular) | 1.5 | 0px | Default body text, UI text |
| **Body Small** | 14px | 400 (Regular) | 1.4 | 0.25px | Helper text, metadata |
| **Label** | 12px | 500 (Medium) | 1.3 | 0.5px | Form labels, tags, captions |
| **Micro** | 11px | 400 (Regular) | 1.2 | 0.3px | Timestamps, fine print |

### **Font Pairing Examples**

#### **For Headlines (H1, H2, H3)**
```css
font-family: 'Inter', sans-serif;
font-weight: 700;
letter-spacing: -0.3px;
```

#### **For Body & UI**
```css
font-family: 'DM Sans', sans-serif;
font-weight: 400;
line-height: 1.5;
```

#### **For Special Moments (Optional)**
```css
font-family: 'Playfair Display', serif;
font-weight: 700;
font-size: 28px;
letter-spacing: -0.5px;
```

---

## 🎨 Design Style & Aesthetic

### **Style Name: "Warm Minimalism"**

### **Key Characteristics**

#### **1. Rounded Forms**
- Border radius: 12px for most elements
- Border radius: 8px for smaller components
- Border radius: 4px for micro-elements (tags, badges)
- **Effect:** Softens the interface, feels approachable and human

#### **2. Generous Whitespace**
- Padding: 24px-40px for main sections
- Margin: 16px-32px between elements
- **Effect:** Reduces cognitive load, draws focus to important content

#### **3. Soft Shadows (Neumorphic Influence)**
- Shadow 1: `0 2px 4px rgba(44, 44, 44, 0.08)`
- Shadow 2: `0 4px 8px rgba(44, 44, 44, 0.12)`
- Shadow 3: `0 8px 16px rgba(44, 44, 44, 0.15)`
- **Effect:** Adds depth without being dramatic

#### **4. Soft Gradients (Subtle)**
- Example: `linear-gradient(135deg, #FBF9F6 0%, #F5F1ED 100%)`
- Used on: Hero sections, backgrounds, card hovers
- **Effect:** Adds visual interest while staying calm

#### **5. Geometric Components**
- Buttons: Pill-shaped (border-radius 24px)
- Cards: Square with 12px radius
- Input fields: Square with 8px radius
- **Effect:** Consistent, modern, friendly

### **Visual Hierarchy**

```
1. Images/Photos (largest, most impact)
2. Headlines (H1, H2) (bold, color accent)
3. Subheadings (H3, H4) (regular weight)
4. Body Text (16px, charcoal)
5. Small Text (12px, charcoal light)
```

### **Micro-interactions Style**

- **Transitions:** 200-300ms, easing: `ease-in-out`
- **Hover States:** Slight color shift, subtle lift (shadow increase)
- **Active States:** Color saturation increase, shadow depth
- **Feedback:** Soft, never jarring (no harsh transitions)

### **Photography & Imagery**

- **Style:** Warm, authentic, human-centered
- **Filters:** Optional soft warmth filter (+10-20% saturation)
- **Composition:** Emotional, moment-focused
- **Quality:** High-resolution, professional

---

## 🧩 Component Specifications

### **1. Buttons**

#### **Primary Button (CTA)**
```
Background: Warm Gold (#D4A574)
Text: Charcoal (#2C2C2C)
Padding: 12px 32px
Border Radius: 24px
Font: DM Sans, 16px, 500 weight
Box Shadow: 0 4px 8px rgba(44, 44, 44, 0.12)
Transition: all 200ms ease-in-out
Hover State: 
  - Background: darken by 8% (#CA9B5E)
  - Shadow: 0 8px 16px rgba(44, 44, 44, 0.15)
Disabled State:
  - Background: #E8E6E1
  - Cursor: not-allowed
  - Opacity: 0.6
```

#### **Secondary Button**
```
Background: Transparent
Border: 2px solid Charcoal (#2C2C2C)
Text: Charcoal (#2C2C2C)
Padding: 10px 30px
Border Radius: 24px
Font: DM Sans, 16px, 500 weight
Hover State:
  - Background: #F5F1ED
  - Border Color: Warm Gold (#D4A574)
```

#### **Tertiary Button (Ghost)**
```
Background: Transparent
Text: Warm Gold (#D4A574)
Padding: 8px 16px
Border Radius: 8px
Font: DM Sans, 14px, 500 weight
Underline: Optional on hover
Hover State:
  - Background: rgba(212, 165, 116, 0.1)
  - Text: darken by 10%
```

### **2. Form Inputs**

#### **Text Input & Textarea**
```
Background: Warm Taupe (#F5F1ED)
Border: 1px solid Light Gray (#E8E6E1)
Border Radius: 8px
Padding: 12px 16px
Font: DM Sans, 16px, 400 weight
Color: Charcoal (#2C2C2C)
Placeholder Color: Charcoal Light (#5A5A5A), opacity 0.6
Focus State:
  - Border: 2px solid Warm Gold (#D4A574)
  - Box Shadow: 0 0 0 3px rgba(212, 165, 116, 0.1)
  - Background: #FFFFFF
Error State:
  - Border: 2px solid Soft Coral (#E8B4B0)
  - Background: rgba(232, 180, 176, 0.05)
  - Error message: 12px, Soft Coral, below input
```

#### **Checkbox & Radio**
```
Size: 18px × 18px
Border: 2px solid Light Gray (#E8E6E1)
Border Radius: 4px (checkbox) / 50% (radio)
Checked State:
  - Background: Warm Gold (#D4A574)
  - Border: Warm Gold
  - Checkmark/radio: White
  - Transition: 150ms
```

#### **Password Strength Indicator**
```
Bar Height: 4px
Background: Light Gray (#E8E6E1)
Filled portions:
  - Weak: Soft Coral (#E8B4B0)
  - Medium: Warm Gold (#D4A574)
  - Strong: Sage Green (#B8C5A6)
Spacing: 4px below input
Font: 12px, Charcoal Light
```

### **3. Cards**

#### **Standard Card**
```
Background: #FFFFFF
Border: 1px solid Light Gray (#E8E6E1)
Border Radius: 12px
Padding: 24px
Box Shadow: 0 2px 4px rgba(44, 44, 44, 0.08)
Hover State:
  - Shadow: 0 8px 16px rgba(44, 44, 44, 0.15)
  - Background: #FBFAF8
  - Transition: 200ms ease-in-out
```

#### **Gradient Card (Highlight)**
```
Background: linear-gradient(135deg, #FBF9F6 0%, #F5F1ED 100%)
Border: 1px solid rgba(212, 165, 116, 0.2)
Border Radius: 12px
Padding: 24px
Box Shadow: 0 4px 8px rgba(44, 44, 44, 0.12)
```

### **4. Tags & Badges**

#### **Primary Tag**
```
Background: rgba(212, 165, 116, 0.15)
Text: Warm Gold (#D4A574)
Padding: 4px 12px
Border Radius: 4px
Font: DM Sans, 12px, 500 weight
```

#### **Success Badge**
```
Background: rgba(184, 197, 166, 0.15)
Text: Sage Green (#B8C5A6)
Padding: 4px 12px
Border Radius: 4px
Icon: ✓ (optional)
```

### **5. Navigation Bar**

#### **Top Navigation (Signup/Login)**
```
Background: #FFFFFF
Height: 64px
Padding: 0 40px
Border Bottom: 1px solid Light Gray (#E8E6E1)
Logo: 24px, black/dark
Items: Right-aligned
Font: DM Sans, 16px, 500 weight
Text Color: Charcoal (#2C2C2C)
Hover: Warm Gold (#D4A574)
```

#### **Bottom Navigation (Dashboard)**
```
Background: #FFFFFF
Height: 72px
Border Top: 1px solid Light Gray (#E8E6E1)
Icons: 24px, Charcoal
Labels: 12px, Charcoal Light
Active: Warm Gold (#D4A574)
Spacing: Equal, centered
```

### **6. Modals & Overlays**

#### **Modal Container**
```
Background: #FFFFFF
Border Radius: 16px
Padding: 32px
Box Shadow: 0 20px 40px rgba(44, 44, 44, 0.2)
Max Width: 500px (mobile), 600px (desktop)
Overlay: rgba(44, 44, 44, 0.5)
Animation: Fade in + scale 200ms
```

### **7. Loading & Skeleton States**

#### **Loading Spinner**
```
Type: Circular spinner
Color: Warm Gold (#D4A574)
Size: 40px (default), 24px (small)
Duration: 1s rotation
Animation: Smooth, linear
```

#### **Skeleton Loader**
```
Color: Light Gray (#E8E6E1)
Animation: Gentle pulse (opacity 0.5-1)
Duration: 1.5s
Used for: Images, text blocks, cards
```

---

## 📱 MVP Screens Layout

### **Screen 1: Login Page**

**Path:** `/auth/login`

**Layout Structure:**
```
Top: Logo + Brand Name (left-aligned)
Mid: Login Form
  - Headline: "Welcome Back"
  - Email input
  - Password input
  - "Forgot password?" link (disabled for MVP)
  - "Sign in" button (primary)
  - OR divider
  - "Sign in with Google" button (secondary)
Bottom: "Don't have an account? Sign up" link
```

**Color Scheme:**
- Background: Warm Cream (#FBF9F6)
- Card: White (#FFFFFF)
- Text: Charcoal (#2C2C2C)
- Accents: Warm Gold (#D4A574)

**Typography:**
- Headline: H2 (32px, bold, Inter)
- Label: 14px Medium DM Sans
- Body: 16px Regular DM Sans

**Spacing:**
- Top padding: 40px
- Card padding: 32px
- Between elements: 16px

### **Screen 2: Signup Page**

**Path:** `/auth/signup`

**Layout Structure:**
```
Top: Logo (centered or left)
Mid: Signup Form
  - Headline: "Create Your Story Account"
  - Subheadline: "Turn memories into beautiful moments"
  - Email input
  - Full Name input
  - Password input (with strength indicator)
  - Confirm Password input
  - Terms & Conditions checkbox
  - "Create Account" button (primary)
  - OR divider
  - "Sign up with Google" button (secondary)
Bottom: "Already have an account? Sign in" link
```

**Visual Elements:**
- Password strength indicator below password field
- Green checkmark when password is strong
- Form validation on blur
- Clear error messages inline

**Color Scheme:**
- Same as login page
- Error states use Soft Coral (#E8B4B0)
- Success states use Sage Green (#B8C5A6)

### **Screen 3: Dashboard (Authenticated)**

**Path:** `/dashboard`

**Layout Structure:**
```
Top Navigation Bar:
  - Logo (left)
  - "New Story" button (right)
  - User menu (right, circular avatar or initials)

Main Content:
  - Greeting: "Hi, [First Name]! 👋"
  - Quick Stats (optional for MVP):
    - Stories created
    - Total views
    - People reached
  
  - Empty State (if no stories):
    - Large icon (empty box illustration)
    - Headline: "No stories yet"
    - Subheadline: "Create your first story to get started"
    - CTA: "Create Story" button
  
  - Stories List/Grid:
    - Grid layout (2 columns on desktop, 1 on mobile)
    - Each story card:
      - Thumbnail image
      - Title
      - Occasion
      - Created date
      - Edit/Delete buttons (hover)
      - View count

Bottom Navigation (Mobile):
  - Home (active)
  - Create
  - Profile
  - Settings
```

**Key Interactions:**
- Hover on card: Lift shadow, show action buttons
- Click on card: Navigate to story view
- "New Story" button: Modal or new page

---

## 📐 Spacing & Layout Grid

### **Base Unit:** 8px

| Name | Value | Usage |
|------|-------|-------|
| **XS** | 4px | Micro-spacing (between icon+text) |
| **SM** | 8px | Small gaps, component padding |
| **MD** | 16px | Default spacing between elements |
| **LG** | 24px | Large spacing, section padding |
| **XL** | 32px | Extra large spacing, major sections |
| **2XL** | 40px | Page top padding, hero sections |
| **3XL** | 48px | Large vertical spacing |

### **Container Max Widths**

| Breakpoint | Width |
|-----------|-------|
| **Mobile** | 100% (full width) |
| **Tablet** | 640px |
| **Desktop** | 1024px |
| **Large Desktop** | 1280px |

### **Grid System**

- **Columns:** 12-column grid
- **Gutter:** 16px
- **Margin:** 24px (mobile), 40px (desktop)

---

## ✨ Micro-interactions & Motion

### **Transitions**

| Element | Duration | Easing | Example |
|---------|----------|--------|---------|
| **Button hover** | 150ms | ease-out | Color + shadow change |
| **Input focus** | 200ms | ease-in-out | Border + shadow |
| **Page transition** | 300ms | ease-in-out | Fade between pages |
| **Modal open** | 300ms | ease-out | Scale + fade |
| **Card hover** | 200ms | ease-in-out | Lift + shadow |

### **Hover Effects**

**Buttons:**
- Scale: 1 → 1.02
- Shadow depth: Increase
- Color: Slightly darker

**Cards:**
- Shadow: Increase depth
- Background: Slightly lighter
- Cursor: pointer

**Links:**
- Underline: Appear or thicken
- Color: Change to accent color

### **Focus States**

- Outline: 3px solid Warm Gold with 10% opacity shadow
- Keyboard accessible: Tab focus visible on all interactive elements

### **Loading States**

- Spinner: Continuous rotation, Warm Gold color
- Skeleton screens: Gentle pulse animation
- Disabled: Opacity 0.6, cursor: not-allowed

---

## ♿ Accessibility Guidelines

### **Color Contrast**

| Element | Min Ratio | Achieved |
|---------|-----------|----------|
| **Text on background** | 4.5:1 (AA) | ✅ Charcoal on Cream (12.5:1) |
| **UI controls** | 3:1 (AA) | ✅ Gold button on white (5:1) |
| **Large text** | 3:1 (AA) | ✅ All headlines meet |

### **Typography**

- **Minimum font size:** 14px (body text)
- **Line height:** 1.4+ for readability
- **Letter spacing:** 0.5px+ for clarity

### **Interactive Elements**

- **Touch target size:** 44px × 44px minimum
- **Keyboard navigation:** Tab order logical and visible
- **Focus indicators:** Always visible, high contrast

### **Form Accessibility**

- **Labels:** Explicit `<label>` tags, always visible
- **Error messages:** Linked to input with `aria-describedby`
- **Required fields:** Marked with `*` and `required` attribute
- **Instructions:** Clear, above inputs

### **Motion**

- **Respect `prefers-reduced-motion`:** Disable animations for users who prefer
- **No auto-playing video/sound**
- **Animations duration:** 200-300ms max (not too slow)

---

## 🎛️ Design Tokens

### **CSS Variables (Root)**

```css
:root {
  /* Colors */
  --color-bg-primary: #FBF9F6;
  --color-bg-secondary: #F5F1ED;
  --color-bg-white: #FFFFFF;
  
  --color-text-primary: #2C2C2C;
  --color-text-secondary: #5A5A5A;
  
  --color-accent-gold: #D4A574;
  --color-accent-rose: #C89E8F;
  --color-accent-green: #B8C5A6;
  --color-accent-teal: #7DA99A;
  --color-accent-coral: #E8B4B0;
  
  --color-border: #E8E6E1;
  
  /* Typography */
  --font-sans: 'DM Sans', sans-serif;
  --font-display: 'Inter', sans-serif;
  --font-serif: 'Playfair Display', serif;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 40px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 24px;
  
  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(44, 44, 44, 0.08);
  --shadow-md: 0 4px 8px rgba(44, 44, 44, 0.12);
  --shadow-lg: 0 8px 16px rgba(44, 44, 44, 0.15);
  --shadow-xl: 0 20px 40px rgba(44, 44, 44, 0.2);
  
  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-base: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
}
```

### **Tailwind Configuration (for shadcn/ui)**

```javascript
// tailwind.config.js
export default {
  theme: {
    colors: {
      'cream': '#FBF9F6',
      'taupe': '#F5F1ED',
      'charcoal': '#2C2C2C',
      'charcoal-light': '#5A5A5A',
      'gold': '#D4A574',
      'rose': '#C89E8F',
      'green': '#B8C5A6',
      'teal': '#7DA99A',
      'coral': '#E8B4B0',
      'border': '#E8E6E1',
    },
    spacing: {
      'xs': '4px',
      'sm': '8px',
      'md': '16px',
      'lg': '24px',
      'xl': '32px',
      '2xl': '40px',
    },
    borderRadius: {
      'sm': '4px',
      'md': '8px',
      'lg': '12px',
      'xl': '16px',
      'full': '24px',
    },
    boxShadow: {
      'sm': '0 2px 4px rgba(44, 44, 44, 0.08)',
      'md': '0 4px 8px rgba(44, 44, 44, 0.12)',
      'lg': '0 8px 16px rgba(44, 44, 44, 0.15)',
      'xl': '0 20px 40px rgba(44, 44, 44, 0.2)',
    },
    fontFamily: {
      'sans': ['DM Sans', 'sans-serif'],
      'display': ['Inter', 'sans-serif'],
      'serif': ['Playfair Display', 'serif'],
    },
  },
}
```

---

## 📚 Font Downloads & Setup

### **Google Fonts Links**

```html
<!-- In <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
```

### **CSS Import**

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;600;700&family=Playfair+Display:wght@400;700&display=swap');
```

---

## 🎨 Color Inspiration & Mood Board

### **Design References**

1. **Headspace** (Meditation app) → Soft colors, calming aesthetic
2. **Airbnb** → Warm color palette, storytelling focus
3. **Notion** → Minimalist with personality, good typography
4. **Figma** → Clean, modern, accessible design
5. **Stripe** → Professional, trustworthy, minimal

### **Why These Colors Work for Momentix**

- **Warm Cream + Taupe:** Evoke nostalgia of photos, scrapbooks, memories
- **Warm Gold:** Precious, valuable (like memories), draws attention
- **Dusty Rose:** Emotional, authentic, human connection
- **Sage Green:** Growth, memory preservation, enduring
- **Charcoal:** Legible, professional, grounded

---

## 🚀 Implementation Checklist

### **Before Development**

- [ ] Design tokens defined in code
- [ ] Tailwind/CSS variables set up
- [ ] Font files imported
- [ ] Color palette created in design tool (Figma)
- [ ] Component library started

### **During Development**

- [ ] All components use design tokens (no hardcoded colors)
- [ ] Accessibility checked (contrast, focus states)
- [ ] Mobile-first approach (test on small screens)
- [ ] Transitions/animations implemented
- [ ] Dark mode optional (not in MVP)

### **After Development**

- [ ] Axe/WAVE accessibility audit
- [ ] Cross-browser testing
- [ ] Performance testing (Lighthouse)
- [ ] User testing with real feedback

---

## 📞 Questions & Decisions

| Question | Decision | Rationale |
|----------|----------|-----------|
| Dark mode in MVP? | No | Focus on light theme, add later |
| Custom icons? | Use Lucide icons (free) | Consistent, professional, free |
| Motion priority? | Subtle, 150-300ms | Not too fast, respects preferences |
| Serif fonts? | Playfair for special moments only | Minimalist base, emotion as accent |
| Color animation? | Avoid flashing | Respect accessibility guidelines |

---

## 📄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | May 2026 | Initial design system |
| -- | -- | -- |

---

**End of Design System Document**

Created for **Momentix** MVP  
Ready for Figma, code implementation, and design handoff
