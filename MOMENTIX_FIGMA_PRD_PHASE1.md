# Momentix Figma PRD — MVP Phase 1 Design Specifications

**Version:** 1.0  
**Status:** Ready for Figma Implementation  
**Scope:** Phase 1 Authentication Screens  
**Date Created:** May 2026

---

## 📋 Overview

This PRD covers the complete Figma setup for **Momentix MVP Phase 1**, including:
- Design tokens (colors, typography, spacing, shadows)
- Component library (buttons, inputs, cards, navigation)
- Three main screens: Login, Signup, Dashboard
- Interactive states and micro-interactions
- Responsive design for desktop & mobile

---

## 🎨 Design Tokens Setup in Figma

### **Step 1: Import Fonts**

In Figma, go to **Assets → Fonts → Add fonts**

Add these Google Fonts:
1. **DM Sans** (weights: 400, 500, 700)
2. **Inter** (weights: 400, 600, 700)
3. **Playfair Display** (weights: 400, 700)

Or use: **File → Libraries → Browse published libraries** and search "Google Fonts"

### **Step 2: Create Color Styles**

Go to **Assets → Colors → Create color style**

#### **Background Colors**

| Style Name | Hex | Usage |
|-----------|-----|-------|
| Colors/Background/Primary | `#FBF9F6` | Page backgrounds |
| Colors/Background/Secondary | `#F5F1ED` | Card backgrounds, sections |
| Colors/Background/White | `#FFFFFF` | White surfaces |

#### **Text Colors**

| Style Name | Hex | Usage |
|-----------|-----|-------|
| Colors/Text/Primary | `#2C2C2C` | Main text, headings |
| Colors/Text/Secondary | `#5A5A5A` | Secondary text, labels |

#### **Accent Colors**

| Style Name | Hex | Usage |
|-----------|-----|-------|
| Colors/Accent/Gold | `#D4A574` | Primary CTA, highlights |
| Colors/Accent/Rose | `#C89E8F` | Secondary accent |
| Colors/Accent/Green | `#B8C5A6` | Success states |
| Colors/Accent/Teal | `#7DA99A` | Info states |
| Colors/Accent/Coral | `#E8B4B0` | Error states |

#### **UI Colors**

| Style Name | Hex | Usage |
|-----------|-----|-------|
| Colors/UI/Border | `#E8E6E1` | Borders, dividers |
| Colors/UI/Disabled | `#E8E6E1` | Disabled elements |

### **Step 3: Create Typography Styles**

Go to **Assets → Typography → Create typography style**

#### **Display Styles (Headlines)**

| Style Name | Font | Weight | Size | Line Height |
|-----------|------|--------|------|-------------|
| Typography/Display/H1 | Inter | 700 | 40px | 48px (1.2) |
| Typography/Display/H2 | Inter | 700 | 32px | 40px (1.25) |
| Typography/Display/H3 | Inter | 600 | 24px | 31px (1.3) |
| Typography/Display/H4 | Inter | 600 | 20px | 27px (1.35) |

#### **Body Styles**

| Style Name | Font | Weight | Size | Line Height |
|-----------|------|--------|------|-------------|
| Typography/Body/Large | DM Sans | 400 | 18px | 27px (1.5) |
| Typography/Body/Default | DM Sans | 400 | 16px | 24px (1.5) |
| Typography/Body/Small | DM Sans | 400 | 14px | 20px (1.4) |
| Typography/Body/Label | DM Sans | 500 | 12px | 16px (1.3) |

### **Step 4: Create Shadow Styles**

Go to **Assets → Shadows → Create shadow**

| Style Name | Type | Offset | Blur | Color | Opacity |
|-----------|------|--------|------|-------|---------|
| Shadows/Small | Drop | 0, 2px | 4px | #2C2C2C | 8% |
| Shadows/Medium | Drop | 0, 4px | 8px | #2C2C2C | 12% |
| Shadows/Large | Drop | 0, 8px | 16px | #2C2C2C | 15% |
| Shadows/XL | Drop | 0, 20px | 40px | #2C2C2C | 20% |

### **Step 5: Set Up Grid**

Go to **File → File settings → Layout grids**

Create grid:
- **Type:** Uniform grid
- **Grid size:** 8px
- **Offset:** 0px
- **Count:** Auto

---

## 🧩 Component Library Setup

### **1. Button Component**

Create component: **`Buttons/Button`**

#### **Main Variants**

Create component with these variant groups:

**Variant 1: Type**
- Primary
- Secondary
- Tertiary

**Variant 2: Size**
- Small (height: 32px, padding: 8px 24px)
- Medium (height: 44px, padding: 12px 32px)
- Large (height: 56px, padding: 16px 40px)

**Variant 3: State**
- Default
- Hover
- Pressed/Active
- Disabled

**Variant 4: Icon**
- Without icon (default)
- Icon left
- Icon right
- Icon only

**Component Structure (Main):**
```
Button
├── Background (shape, corner radius: 24px for primary/secondary, 8px for tertiary)
├── Content
│   ├── Icon (optional, 20px)
│   └── Text (typography: DM Sans, 16px, 500 weight)
└── State overlay (transparent, for hover/active)
```

**Primary Button Styles:**
- Default: Background = Colors/Accent/Gold, Text = Colors/Text/Primary
- Hover: Background = darken(Colors/Accent/Gold, 10%), Shadow = Shadows/Large
- Pressed: Opacity 90%
- Disabled: Background = Colors/UI/Disabled, Text = Colors/Text/Secondary, Opacity = 60%

**Secondary Button Styles:**
- Default: Background = transparent, Border = 2px Colors/Text/Primary
- Hover: Background = Colors/Background/Secondary
- Border color = Colors/Accent/Gold on hover

**Tertiary Button Styles:**
- Default: Background = transparent, Text = Colors/Accent/Gold
- Hover: Background = rgba(Colors/Accent/Gold, 10%)
- Underline on hover

---

### **2. Input Component**

Create component: **`Inputs/Input`**

#### **Variants**

**Variant 1: Type**
- Text
- Email
- Password
- Search

**Variant 2: State**
- Default
- Focus
- Error
- Disabled
- Filled

**Variant 3: Size**
- Small (height: 32px)
- Medium (height: 44px) [default]
- Large (height: 56px)

**Variant 4: Icon**
- None
- Left icon
- Right icon
- Both icons

**Component Structure:**
```
Input
├── Container (rounded: 8px, border: 1px)
├── Left icon (optional, 20px)
├── Input text (DM Sans, 16px, Colors/Text/Primary)
├── Placeholder (DM Sans, 16px, Colors/Text/Secondary, opacity: 60%)
├── Right icon (optional, 20px)
└── Error message (optional, 12px, Colors/Accent/Coral)
```

**Default State:**
- Background = Colors/Background/Secondary
- Border = 1px Colors/UI/Border
- Shadow = none

**Focus State:**
- Border = 2px Colors/Accent/Gold
- Background = Colors/Background/White
- Shadow = Shadows/Small
- Outline = 3px rgba(Colors/Accent/Gold, 10%)

**Error State:**
- Border = 2px Colors/Accent/Coral
- Background = rgba(Colors/Accent/Coral, 5%)
- Error text below input

**Disabled State:**
- Opacity = 60%
- Cursor = not-allowed

---

### **3. Form Label Component**

Create component: **`Forms/Label`**

**Component Structure:**
```
Label
├── Label text (DM Sans, 12px, 500 weight, Colors/Text/Primary)
├── Required indicator * (optional, Colors/Accent/Coral)
└── Helper text (optional, 11px, Colors/Text/Secondary)
```

**Spacing:**
- Gap between label and input: 8px
- Gap between input and helper: 4px

---

### **4. Card Component**

Create component: **`Cards/Card`**

#### **Variants**

**Variant 1: Type**
- Default
- Elevated
- Gradient

**Variant 2: Interactive**
- Static
- Hoverable

**Component Structure:**
```
Card
├── Background (Colors/Background/White)
├── Border (1px Colors/UI/Border)
├── Corner radius (12px)
├── Padding (24px)
├── Shadow (Shadows/Small, or Shadows/Medium on hover)
└── Content (anything inside)
```

**Default Card:**
- Background = Colors/Background/White
- Border = 1px Colors/UI/Border
- Shadow = Shadows/Small

**Elevated Card (Hover):**
- Background = Colors/Background/White
- Shadow = Shadows/Large
- Transition = 200ms ease-in-out

**Gradient Card:**
- Background = Linear gradient (135deg, Colors/Background/Primary → Colors/Background/Secondary)
- Border = 1px rgba(Colors/Accent/Gold, 20%)

---

### **5. Checkbox Component**

Create component: **`Forms/Checkbox`**

**Component Structure:**
```
Checkbox
├── Container (24px × 24px, border radius: 4px)
├── Border (2px Colors/UI/Border)
├── Checkmark (white, visible only when checked)
└── Label (16px, DM Sans, Colors/Text/Primary)
```

**States:**
- Default: Border = Colors/UI/Border, Background = transparent
- Checked: Background = Colors/Accent/Gold, Checkmark visible
- Focus: Outline = 2px Colors/Accent/Gold
- Disabled: Opacity = 60%

---

### **6. Password Strength Indicator**

Create component: **`Forms/PasswordStrengthBar`**

**Component Structure:**
```
PasswordStrengthBar
├── Background bar (height: 4px, Colors/UI/Border)
├── Filled portion (dynamic, height: 4px)
│   ├── 0-33%: Colors/Accent/Coral (Weak)
│   ├── 34-66%: Colors/Accent/Gold (Medium)
│   └── 67-100%: Colors/Accent/Green (Strong)
└── Label text (12px, Colors/Text/Secondary)
```

**Sizing:**
- Bar width: Full input width
- Bar height: 4px
- Gap from input: 8px

---

### **7. Navigation Bar (Top)**

Create component: **`Navigation/TopBar`**

**Component Structure:**
```
TopBar
├── Background (Colors/Background/White)
├── Border bottom (1px Colors/UI/Border)
├── Height (64px)
├── Padding (0 40px horizontal)
├── Logo (48px height, left-aligned)
├── Spacer (flex-grow)
└── Right items (buttons/menu)
```

**Used on:**
- Login page
- Signup page
- Dashboard page

---

### **8. Bottom Navigation (Mobile)**

Create component: **`Navigation/BottomNav`**

**Component Structure:**
```
BottomNav
├── Background (Colors/Background/White)
├── Border top (1px Colors/UI/Border)
├── Height (72px)
├── Safe area padding (bottom: 16px on mobile)
└── Nav Item (repeated 3-5 times)
    ├── Icon (24px)
    ├── Label (12px)
    ├── Active indicator (Colors/Accent/Gold)
    └── Flex: 1
```

**Used on:**
- Dashboard (mobile view)

---

### **9. Error Message Component**

Create component: **`Messages/Error`**

**Component Structure:**
```
ErrorMessage
├── Icon (12px, Colors/Accent/Coral)
├── Text (12px, Colors/Accent/Coral)
└── Spacing (gap: 4px)
```

**Usage:**
- Below input fields
- For form validation

---

## 📱 SCREEN 1: LOGIN PAGE

**Frame:** 1440px × 900px (Desktop) / 375px × 812px (Mobile)  
**Route:** `/auth/login`

### **Desktop Layout (1440px × 900px)**

```
Frame: "Login"
├── Background fill (Colors/Background/Primary, full bleed)
├── Center container (flex, justify: center, align: center)
│   ├── Logo + Brand section (top)
│   │   ├── Logo image (48px height, centered)
│   │   ├── Gap (16px)
│   │   └── "Momentix" text (H2, Colors/Text/Primary, centered)
│   │
│   ├── Gap (40px)
│   │
│   └── Login Card (Cards/Card, 480px width, elevated)
│       ├── Padding (32px)
│       │
│       ├── Headline "Welcome Back" (H2, Colors/Text/Primary)
│       ├── Gap (24px)
│       │
│       ├── Email field
│       │   ├── Forms/Label ("Email")
│       │   ├── Gap (8px)
│       │   └── Inputs/Input (email type, placeholder: "you@example.com")
│       ├── Gap (16px)
│       │
│       ├── Password field
│       │   ├── Forms/Label ("Password")
│       │   ├── Gap (8px)
│       │   └── Inputs/Input (password type, show/hide icon on right)
│       ├── Gap (8px)
│       │
│       ├── Forgot password link (14px, Colors/Accent/Gold, disabled text for MVP)
│       ├── Gap (24px)
│       │
│       ├── Buttons/Button (Primary, Medium, full width)
│       │   └── Label: "Sign in"
│       ├── Gap (16px)
│       │
│       ├── Divider section
│       │   ├── Line (1px, Colors/UI/Border)
│       │   ├── "OR" text (12px, Colors/Text/Secondary, centered)
│       │   └── Line (1px, Colors/UI/Border)
│       ├── Gap (16px)
│       │
│       └── Buttons/Button (Secondary, Medium, full width, Google icon left)
│           └── Label: "Sign in with Google"
│
└── Footer section (below card)
    ├── Gap (24px)
    └── Text (14px, Colors/Text/Secondary)
        ├── "Don't have an account? "
        └── Link (14px, Colors/Accent/Gold): "Sign up"
```

### **Mobile Layout (375px × 812px)**

- Frame size: 375px × 812px
- Card width: Full width - 32px padding (32px left, 32px right)
- Logo hidden or 32px height
- All spacing: 16px horizontal padding
- Same component structure, reflow vertically
- Bottom nav NOT shown on login/signup (only on dashboard)

### **Component Instances**

| Component | Variant | Notes |
|-----------|--------|-------|
| Buttons/Button | Primary, Medium | "Sign in" CTA |
| Buttons/Button | Secondary, Medium, Icon left | "Sign in with Google" |
| Inputs/Input | Email, Medium | Focus on load (optional) |
| Inputs/Input | Password, Medium, Icon right | Show/hide toggle |
| Forms/Label | -- | "Email" and "Password" |
| Cards/Card | Default | Form wrapper |

### **Interactions**

**Email input:**
- Focus → Border gold, background white
- Invalid → Border coral, error message appears

**Password input:**
- Focus → Border gold, background white
- Show/hide icon → Toggle password visibility

**Sign in button:**
- Hover → Darker gold, lift shadow
- Click → Loading state (spinner inside button)
- Disabled → Gray, opacity 60%

**Forgot password link:**
- Hover → Underline appears
- Disabled state (for MVP) → Lighter text color

**Sign in with Google:**
- Hover → Background lighter
- Click → Opens Google OAuth flow

**Sign up link:**
- Hover → Underline appears
- Color → Colors/Accent/Gold

### **State Examples**

1. **Form Error**
   - Email input: Border coral
   - Error message: "Invalid email format"

2. **Loading**
   - Button text hidden
   - Spinner visible (Colors/Accent/Gold)

3. **Success (after login)**
   - Redirect to `/dashboard`

---

## 📱 SCREEN 2: SIGNUP PAGE

**Frame:** 1440px × 1200px (Desktop) / 375px × 1100px (Mobile)  
**Route:** `/auth/signup`

### **Desktop Layout (1440px × 1200px)**

```
Frame: "Signup"
├── Background fill (Colors/Background/Primary, full bleed)
├── Center container (flex, justify: center, align: center)
│   ├── Logo + Brand section (top)
│   │   ├── Logo image (48px height, centered)
│   │   ├── Gap (16px)
│   │   ├── "Momentix" text (H2, Colors/Text/Primary)
│   │   ├── Gap (8px)
│   │   └── Subheading (16px, Colors/Text/Secondary): "Turn memories into beautiful stories"
│   │
│   ├── Gap (40px)
│   │
│   └── Signup Card (Cards/Card, 480px width, elevated)
│       ├── Padding (32px)
│       │
│       ├── Headline "Create Your Account" (H2, Colors/Text/Primary)
│       ├── Gap (24px)
│       │
│       ├── Email field
│       │   ├── Forms/Label ("Email")
│       │   ├── Gap (8px)
│       │   └── Inputs/Input (email type, placeholder: "you@example.com")
│       ├── Gap (16px)
│       │
│       ├── Full Name field
│       │   ├── Forms/Label ("Full Name")
│       │   ├── Gap (8px)
│       │   └── Inputs/Input (text type, placeholder: "John Doe")
│       ├── Gap (16px)
│       │
│       ├── Password field
│       │   ├── Forms/Label ("Password")
│       │   ├── Gap (8px)
│       │   ├── Inputs/Input (password type, show/hide icon)
│       │   ├── Gap (8px)
│       │   └── Forms/PasswordStrengthBar
│       ├── Gap (16px)
│       │
│       ├── Confirm Password field
│       │   ├── Forms/Label ("Confirm Password")
│       │   ├── Gap (8px)
│       │   └── Inputs/Input (password type, show/hide icon)
│       ├── Gap (16px)
│       │
│       ├── Terms checkbox
│       │   ├── Forms/Checkbox (unchecked by default)
│       │   └── Label text (14px): "I agree to Terms & Conditions"
│       │       └── Link to terms (Colors/Accent/Gold)
│       ├── Gap (24px)
│       │
│       ├── Buttons/Button (Primary, Medium, full width)
│       │   └── Label: "Create Account"
│       ├── Gap (16px)
│       │
│       ├── Divider section
│       │   ├── Line (1px, Colors/UI/Border)
│       │   ├── "OR" text (12px, Colors/Text/Secondary, centered)
│       │   └── Line (1px, Colors/UI/Border)
│       ├── Gap (16px)
│       │
│       └── Buttons/Button (Secondary, Medium, full width, Google icon left)
│           └── Label: "Sign up with Google"
│
└── Footer section (below card)
    ├── Gap (24px)
    └── Text (14px, Colors/Text/Secondary)
        ├── "Already have an account? "
        └── Link (14px, Colors/Accent/Gold): "Sign in"
```

### **Mobile Layout (375px × 1100px)**

- Frame size: 375px × 1100px
- Card width: Full width - 32px padding
- Scroll required due to form length
- Same component structure

### **Component Instances**

| Component | Variant | Notes |
|-----------|--------|-------|
| Buttons/Button | Primary, Medium | "Create Account" CTA |
| Buttons/Button | Secondary, Medium, Icon left | "Sign up with Google" |
| Inputs/Input | Email, Medium | Email validation |
| Inputs/Input | Text, Medium | Full name input |
| Inputs/Input | Password, Medium, Icon right | Password input |
| Inputs/Input | Password, Medium, Icon right | Confirm password |
| Forms/Label | -- | For each input |
| Forms/PasswordStrengthBar | -- | Below password input |
| Forms/Checkbox | -- | Terms acceptance |
| Cards/Card | Default | Form wrapper |

### **Password Strength Indicator Logic**

Bar fills based on password strength:
- **Weak (0-33%):** Coral, "Weak"
- **Medium (34-66%):** Gold, "Medium"
- **Strong (67-100%):** Green, "Strong"

Criteria (JavaScript logic, not Figma, but reference):
- 8+ characters: ✓
- Uppercase letter: ✓
- Number: ✓
- Special character: ✓
- Length 12+ for "strong": ✓

### **Interactions**

**Email input:**
- Blur → Validate format
- Error → Border coral, "Invalid email format"
- Duplicate email → "Email already in use"

**Full name input:**
- Required field
- No special validation

**Password input:**
- Real-time strength indicator
- Show/hide toggle on right
- Visual feedback (color changes as strength increases)

**Confirm password input:**
- Only validates on blur
- Error if doesn't match password
- Error message: "Passwords don't match"

**Terms checkbox:**
- Required to enable "Create Account" button
- Unchecked → Button disabled
- Checked → Button enabled

**Create Account button:**
- Disabled until all fields valid + terms checked
- Click → Loading state
- Success → Redirect to dashboard (auto-login)
- Error → Show error message above form

**Sign up with Google:**
- Click → Opens Google OAuth flow
- Auto-creates account if new user

**Sign in link:**
- Click → Navigate to `/auth/login`

### **Validation States**

1. **Empty form**
   - Button: Disabled (opacity 60%)
   - No errors shown

2. **Invalid email**
   - Input: Border coral
   - Message: "Invalid email format"

3. **Weak password**
   - Bar: Coral (0-33%)
   - Strength indicator shows

4. **Password mismatch**
   - Confirm input: Border coral
   - Message: "Passwords don't match"

5. **Email in use**
   - Email input: Border coral
   - Message: "Email already in use"

6. **Terms unchecked**
   - Button: Disabled
   - Message below checkbox (optional): "Please accept terms"

7. **All valid**
   - Button: Enabled, gold
   - Ready for submission

---

## 📊 SCREEN 3: DASHBOARD

**Frame:** 1440px × 900px (Desktop) / 375px × 812px (Mobile)  
**Route:** `/dashboard` (Protected, redirects to `/auth/login` if not authenticated)

### **Desktop Layout (1440px × 900px)**

```
Frame: "Dashboard"
├── Background fill (Colors/Background/Primary, full bleed)
│
├── Top Navigation Bar (Navigation/TopBar, height: 64px, sticky)
│   ├── Logo (48px height, left)
│   ├── Spacer (flex-grow)
│   ├── Buttons/Button (Primary, Small): "New Story"
│   └── User menu (32px avatar, right)
│       ├── Avatar circle (Colors/Accent/Gold)
│       ├── Initials or image
│       └── Dropdown on click (with "Logout" option)
│
├── Main content (padding: 40px)
│
├── Greeting section (margin-bottom: 32px)
│   ├── Headline "Hi, John! 👋" (H2, Colors/Text/Primary)
│   └── Subheading (14px, Colors/Text/Secondary): "Welcome back to your stories"
│
├── Quick stats (optional for MVP, can be skipped)
│   ├── Stat card (Card, 3-column grid)
│   │   ├── Label (12px, "Stories Created")
│   │   └── Value (H3, "0")
│   ├── Stat card
│   │   ├── Label (12px, "Total Views")
│   │   └── Value (H3, "0")
│   └── Stat card
│       ├── Label (12px, "People Reached")
│       └── Value (H3, "0")
│
├── Gap (40px)
│
└── Stories section
    ├── If stories exist:
    │   ├── Headline (H3): "Your Stories"
    │   ├── Gap (24px)
    │   └── Stories grid (2 columns, gap: 24px)
    │       └── Story card (Card, hoverable)
    │           ├── Image/thumbnail (400px × 250px, object-fit: cover, border-radius: 8px top)
    │           ├── Padding (16px)
    │           ├── Title (16px, 700 weight, Colors/Text/Primary)
    │           ├── Occasion (14px, Colors/Text/Secondary)
    │           ├── Created date (12px, Colors/Text/Secondary)
    │           ├── Gap (8px)
    │           └── Actions on hover
    │               ├── Buttons/Button (Tertiary, Small): "View"
    │               └── Buttons/Button (Tertiary, Small): "Edit"
    │
    └── If NO stories (empty state):
        ├── Empty container (center, vertical)
        │   ├── Icon (illustrations/empty-box, 120px)
        │   ├── Gap (24px)
        │   ├── Headline (H2, Colors/Text/Primary): "No stories yet"
        │   ├── Subheading (16px, Colors/Text/Secondary): "Create your first story to get started"
        │   ├── Gap (24px)
        │   └── Buttons/Button (Primary, Medium): "Create Story"
        └── This overlays where grid would be
```

### **Mobile Layout (375px × 812px)**

```
Frame: "Dashboard Mobile"
├── Top Navigation Bar (Navigation/TopBar, height: 64px)
│   ├── Logo (32px height, left)
│   ├── Spacer
│   └── User menu (32px avatar)
│
├── Main content (padding: 16px)
│
├── Greeting section
│   ├── Headline (H3): "Hi, John! 👋"
│   └── Subheading (14px)
│
├── Gap (24px)
│
├── Stats (1 column, full width, optional)
│   └── Stat cards stacked vertically
│
├── Gap (24px)
│
├── Stories section
│   ├── Headline (H3): "Your Stories"
│   ├── Gap (16px)
│   └── Stories grid (1 column, full width)
│       └── Story card (Card, hoverable)
│           ├── Image/thumbnail (full width, 200px height)
│           ├── Padding (12px)
│           ├── Title (14px)
│           ├── Occasion (12px)
│           ├── Date (11px)
│
└── Bottom Navigation (Navigation/BottomNav, sticky)
    ├── Home (active, Colors/Accent/Gold)
    ├── Create
    ├── Profile
    ├── Settings
    └── More (if needed)
```

### **Component Instances**

| Component | Variant | Notes |
|-----------|--------|-------|
| Navigation/TopBar | -- | Header |
| Buttons/Button | Primary, Small | "New Story" |
| Cards/Card | Default | Story cards |
| Buttons/Button | Tertiary, Small | "View", "Edit" on hover |
| Navigation/BottomNav | -- | Mobile only |

### **Story Card Details**

**Desktop Story Card (400px width):**
```
Card
├── Image (400px × 250px, border-radius: 8px)
├── Padding (16px)
├── Title (16px, 700, Colors/Text/Primary)
├── Occasion (14px, Colors/Text/Secondary)
├── Date (12px, Colors/Text/Secondary)
├── Gap (8px)
└── Actions (hidden, show on hover)
    ├── View button
    └── Edit button
```

**Hover state:**
- Card shadow: Shadows/Large
- Background: Slightly lighter
- Buttons appear with Tertiary style

### **Interactions**

**"New Story" button:**
- Click → Navigate to story creation flow (Phase 2)
- Or open modal (to be designed in Phase 2)

**User avatar menu:**
- Click → Dropdown with options:
  - "Profile" (disabled for MVP)
  - "Settings" (disabled for MVP)
  - "Logout" → Sign out, redirect to `/auth/login`

**Story card:**
- Click → Navigate to story detail/preview page (Phase 2)
- Hover → Lift with shadow, show action buttons

**View button:**
- Click → Navigate to story preview

**Edit button:**
- Click → Navigate to story editor (Phase 2)

**Create Story button (empty state):**
- Click → Navigate to story creation flow (Phase 2)

**Home nav item (active):**
- Color: Colors/Accent/Gold
- Icon filled

**Create nav item (mobile):**
- Click → Navigate to story creation (same as "New Story" button)

---

## 🎨 Visual Style & Specifications

### **Spacing Scale**

All spacing uses 8px base unit:
- 4px (xs): Between icon + text
- 8px (sm): Small gaps
- 16px (md): Default spacing
- 24px (lg): Section spacing
- 32px (xl): Large section spacing
- 40px (2xl): Page padding top

### **Border Radius**

- Buttons: 24px (pill shape)
- Cards: 12px
- Inputs: 8px
- Small UI elements: 4px
- Images in cards: 8px

### **Shadows**

All shadows use predefined shadow styles:
- Default card: Shadows/Small
- Hover card: Shadows/Large
- Buttons: Shadows/Medium (no shadow default for secondary/tertiary)
- Modals: Shadows/XL

### **Transitions**

- Button interactions: 150ms ease-out
- Card hover: 200ms ease-in-out
- Input focus: 200ms ease-in-out
- Page transitions: 300ms ease-in-out

### **Color Usage (60-30-10 Rule)**

- **60%** Background colors (Cream, Taupe, White)
- **30%** Text colors (Charcoal, Charcoal Light)
- **10%** Accent colors (Gold, Rose, Green, Coral)

---

## 📱 Responsive Breakpoints

### **Desktop**
- Width: 1440px+
- Typography: Full size
- Spacing: 40px padding
- Grid: 2+ columns

### **Tablet**
- Width: 768px - 1439px
- Typography: Slightly reduced
- Spacing: 24px padding
- Grid: 1-2 columns (flex)

### **Mobile**
- Width: 375px - 767px
- Typography: 14px-16px body minimum
- Spacing: 16px padding
- Grid: 1 column (full width)
- Bottom navigation shown

---

## 🚀 Implementation Checklist

### **Before Building**

- [ ] All design tokens created in Figma
- [ ] All components built and variants set
- [ ] All screens designed and prototyped
- [ ] Handoff document shared with engineers
- [ ] Design specs exported/documented

### **Design System**

- [ ] Colors library complete
- [ ] Typography styles created
- [ ] Shadow styles defined
- [ ] Components published as library
- [ ] Version control set up (Figma Teams)

### **Screens**

- [ ] Login screen desktop & mobile
- [ ] Signup screen desktop & mobile
- [ ] Dashboard empty state desktop & mobile
- [ ] Dashboard with stories desktop & mobile
- [ ] Interactive prototypes created (flows between screens)

### **Interactions**

- [ ] Button hover states
- [ ] Input focus states
- [ ] Form validation states
- [ ] Loading states
- [ ] Navigation interactions

### **QA**

- [ ] Accessibility checked (color contrast, text size)
- [ ] Responsive design tested on mobile
- [ ] Prototype tested in browser
- [ ] Handed off to developers

---

## 📋 Handoff to Development

### **What Developers Get**

1. **Figma file link** (view access)
2. **Design system guide** (this document)
3. **Component specs** (measurements, colors, fonts)
4. **Responsive specs** (desktop, tablet, mobile)
5. **Interactive spec** (animations, transitions)
6. **Color/typography tokens** (CSS variables)

### **Developer Workflow**

1. Open Figma file
2. Use Inspect tool to get measurements
3. Use color swatch to get hex values
4. Use typography to get font specs
5. Build components in shadcn/ui
6. Map Figma components to React components

---

## 🎯 Design QA Checklist

### **Typography**

- [ ] All headlines use Inter font
- [ ] All body text uses DM Sans
- [ ] Line heights match spec
- [ ] Color contrast ≥ 4.5:1
- [ ] Minimum font size 12px

### **Colors**

- [ ] All colors use defined color styles
- [ ] No hardcoded hex values
- [ ] Accent color used sparingly (10% rule)
- [ ] Error states use Coral
- [ ] Success states use Green

### **Spacing**

- [ ] All spacing multiples of 8px
- [ ] Consistent padding/margins
- [ ] Visual hierarchy clear

### **Components**

- [ ] All buttons use Button component
- [ ] All inputs use Input component
- [ ] All cards use Card component
- [ ] States clearly labeled (default, hover, active, disabled)

### **Responsive**

- [ ] Desktop layout ≥1440px
- [ ] Tablet layout 768-1439px
- [ ] Mobile layout <768px
- [ ] Navigation changes appropriately
- [ ] Text readable on all sizes

---

## 📞 Design System Updates

As the product evolves, maintain this design system:

1. **Phase 2 additions:**
   - Story creation form components
   - Story preview/display components
   - Photo uploader component
   - Modal components

2. **Future phases:**
   - Dark mode variants
   - Additional color themes
   - Advanced components (tables, date pickers, etc.)

---

## 📄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | May 2026 | Initial design system for Phase 1 (Auth screens) |

---

**End of Figma PRD**

Ready for Figma implementation. Start with design tokens, then components, then screens.
