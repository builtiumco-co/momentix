# Momentix Figma PRD — Phase 3: Story Creation Flow & Templates

**Version:** 1.0
**Status:** Ready for Figma Implementation
**Scope:** Template Picker, 5-Step Creation Flow, Story Preview, Public Share View
**Date Created:** May 2026
**Extends:** Phase 1 Figma PRD (design tokens, components already defined)

---

## 📋 Overview

This PRD covers the complete Figma design for the Phase 3 story creation experience:

- Template picker screen (like Canva's template gallery)
- 5-step story creation flow
- Story preview screen
- Public story view (shareable link)
- All templates designed as layout variants (9 templates, 3 layout types)
- Desktop (1440px) and mobile (375px) for every screen

All design tokens, color styles, typography styles, shadow styles, and base components (Button, Input, Card, Nav) are already defined in Phase 1. This PRD extends that system — do not redefine existing tokens.

---

## 🆕 New Design Tokens (Phase 3 additions only)

### New Color Styles

Add these to the existing color library:

#### Template Color Schemes

| Style Name | Hex | Usage |
|---|---|---|
| Colors/Template/Terracotta/Background | `#FAF0EB` | Birthday warm template bg |
| Colors/Template/Terracotta/Accent | `#C4663A` | Birthday warm template accent |
| Colors/Template/Terracotta/Text | `#3D1A0B` | Birthday warm template text |
| Colors/Template/Blush/Background | `#FDF0F3` | Wedding template bg |
| Colors/Template/Blush/Accent | `#B85C72` | Wedding template accent |
| Colors/Template/Blush/Text | `#3D1020` | Wedding template text |
| Colors/Template/Sage/Background | `#EFF5EE` | Graduation template bg |
| Colors/Template/Sage/Accent | `#4A7A45` | Graduation template accent |
| Colors/Template/Sage/Text | `#162414` | Graduation template text |
| Colors/Template/Ivory/Background | `#FAF8F2` | Milestone/formal templates bg |
| Colors/Template/Ivory/Accent | `#8A7340` | Milestone template accent |
| Colors/Template/Ivory/Text | `#2C2410` | Milestone template text |
| Colors/Template/Slate/Background | `#F0F2F5` | Modern/minimal template bg |
| Colors/Template/Slate/Accent | `#3A5080` | Modern template accent |
| Colors/Template/Slate/Text | `#111827` | Modern template text |

#### Step Indicator Colors

| Style Name | Hex | Usage |
|---|---|---|
| Colors/Step/Active | `#D4A574` | Current step dot/line |
| Colors/Step/Complete | `#B8C5A6` | Completed step |
| Colors/Step/Inactive | `#E8E6E1` | Future step |

### New Typography Styles

| Style Name | Font | Weight | Size | Line Height |
|---|---|---|---|---|
| Typography/Narrative/Body | Playfair Display | 400 | 18px | 30px (1.67) |
| Typography/Narrative/Pull | Playfair Display | 400 italic | 22px | 34px |
| Typography/Template/Label | DM Sans | 500 | 11px | 14px |

---

## 🧩 New Components (Phase 3)

### 1. Step Indicator Component

Create component: **`Navigation/StepIndicator`**

```
StepIndicator
├── Container (horizontal, auto-layout, gap: 0)
└── Step Item (repeated × 5)
    ├── Step dot (24px circle)
    │   ├── Active: background Colors/Step/Active, number white DM Sans 500 12px
    │   ├── Complete: background Colors/Step/Complete, checkmark icon white 12px
    │   └── Inactive: background Colors/Step/Inactive, number Colors/Text/Secondary 12px
    ├── Connector line (flex-grow, height 2px)
    │   ├── Complete: Colors/Step/Complete
    │   └── Inactive: Colors/Step/Inactive
    └── Label (below dot, 11px DM Sans 400, Colors/Text/Secondary)
        Active label: Colors/Text/Primary, 500 weight
```

Steps: 1. Template · 2. Photos · 3. Memories · 4. Preview · 5. Share

---

### 2. Template Card Component

Create component: **`Templates/TemplateCard`**

**Variants:**
- State: Default / Hover / Selected
- Size: Gallery (280px wide) / Featured (400px wide)

```
TemplateCard
├── Container (border-radius: 12px, overflow hidden, border 1.5px)
│   ├── Default: border Colors/UI/Border
│   ├── Hover: border Colors/Accent/Gold, shadow Shadows/Medium
│   └── Selected: border 2.5px Colors/Accent/Gold, shadow Shadows/Large
│
├── Thumbnail (full width × 180px, object-fit cover)
│   └── Template preview — shows mini layout of the story
│
├── Selected indicator (top-right, 24px circle)
│   ├── Hidden on default/hover
│   └── Visible on selected: Colors/Accent/Gold bg, white checkmark
│
└── Card body (padding: 14px 16px, background Colors/Background/White)
    ├── Occasion badge (pill, 11px — reuse Phase 1 badge pattern)
    ├── Gap: 6px
    ├── Template name — Inter 600 15px Colors/Text/Primary
    ├── Gap: 4px
    └── Description — DM Sans 400 13px Colors/Text/Secondary, 1-line clamp
```

---

### 3. Photo Upload Zone Component

Create component: **`Upload/PhotoZone`**

**Variants:**
- State: Empty / DragOver / HasPhotos

```
PhotoZone (Empty)
├── Container (border-radius: 12px, border 2px dashed Colors/UI/Border)
├── Background: Colors/Background/Secondary
├── Padding: 48px 24px
├── Center-aligned content
│   ├── Upload icon (32px, Colors/Text/Secondary)
│   ├── Gap: 12px
│   ├── "Drag photos here" — Inter 600 16px Colors/Text/Primary
│   ├── Gap: 4px
│   ├── "or click to browse" — DM Sans 400 14px Colors/Text/Secondary
│   ├── Gap: 16px
│   └── "Browse files" — Buttons/Button (Secondary, Small)

PhotoZone (DragOver)
├── Border: 2px dashed Colors/Accent/Gold
├── Background: rgba(Colors/Accent/Gold, 8%)
└── Icon and text color shift to Colors/Accent/Gold

PhotoZone (HasPhotos)
├── No border/background
└── Photo grid (auto-fill, 120px × 120px thumbnails, gap 8px)
    └── Photo Tile
        ├── Image (120px square, border-radius 8px, object-fit cover)
        ├── Caption input (below, 100% width, 11px DM Sans)
        ├── Remove button (top-right corner, 20px × 20px circle, X icon)
        └── Drag handle (top-left, 6-dot grid icon, visible on hover)
```

---

### 4. Memory Form Section Component

Create component: **`Forms/MemorySection`**

```
MemorySection
├── Section header
│   ├── Section number badge (20px circle, Colors/Background/Secondary)
│   │   └── Number — DM Sans 500 11px Colors/Text/Secondary
│   ├── Gap: 8px
│   └── Section label — Inter 600 15px Colors/Text/Primary
├── Gap: 8px
├── Helper text — DM Sans 400 13px Colors/Text/Secondary (from template aiHint)
├── Gap: 8px
└── Textarea (border-radius 8px, min-height 96px, resize vertical)
    ├── Default: border Colors/UI/Border, bg Colors/Background/Secondary
    ├── Focus: border Colors/Accent/Gold, bg white, shadow Shadows/Small
    └── Character count (bottom-right, 11px Colors/Text/Secondary)
```

---

### 5. Story Section (rendered narrative) Component

Create component: **`Story/NarrativeSection`**

**Variants:**
- State: Loading / Generated / Editing

```
NarrativeSection (Generated)
├── Section label — DM Sans 500 11px Colors/Text/Secondary uppercase letter-spacing 0.08em
├── Gap: 8px
├── Prose text — Typography/Narrative/Body (Playfair Display 400 18px)
│   Color: Colors/Text/Primary
│   Line-height: 30px
│   Max-width: 640px
├── Gap: 8px
└── Action row (right-aligned)
    └── "Regenerate this section" — Tertiary button Small
        ├── Refresh icon (12px) + label
        └── Color: Colors/Text/Secondary on default, Colors/Accent/Gold on hover

NarrativeSection (Loading)
├── Section label (same)
├── Gap: 8px
└── Skeleton loader (3 lines, border-radius 4px, animated shimmer)
    ├── Line 1: 100% width, 14px height
    ├── Line 2: 85% width, 14px height
    └── Line 3: 60% width, 14px height

NarrativeSection (Editing)
├── Section label (same)
├── Gap: 8px
└── Textarea (pre-filled with AI text, full width, auto-height)
    Same styles as Forms/MemorySection textarea
```

---

### 6. Share Panel Component

Create component: **`Share/SharePanel`**

```
SharePanel
├── Success icon (48px, Colors/Accent/Green)
├── Gap: 16px
├── Headline — Inter 600 24px Colors/Text/Primary: "Your story is ready"
├── Gap: 8px
├── Subtext — DM Sans 400 14px Colors/Text/Secondary
├── Gap: 24px
├── Link row
│   ├── URL input (read-only, bg Colors/Background/Secondary, border Colors/UI/Border)
│   └── "Copy link" button — Primary Small (Colors/Accent/Gold)
│       Copied state: label changes to "Copied ✓", bg Colors/Accent/Green
├── Gap: 16px
├── Publish toggle row
│   ├── Label — DM Sans 500 14px: "Published"
│   ├── Subtext — 12px Colors/Text/Secondary: "Anyone with the link can view"
│   └── Toggle switch (24px height, active: Colors/Accent/Gold)
├── Gap: 24px
└── Action buttons (horizontal, gap 12px)
    ├── "View story" — Secondary Medium (opens in new tab)
    └── "Back to dashboard" — Tertiary Medium
```

---

## 📱 SCREEN 1: TEMPLATE PICKER

**Frame:** 1440 × 900px (Desktop) / 375 × 812px (Mobile)
**Route:** `/stories/new`

### Desktop Layout (1440 × 900px)

```
Frame: "Template Picker"
├── Background: Colors/Background/Primary (#FBF9F6)
│
├── Navigation/TopBar (64px, sticky)
│   ├── "← Dashboard" back link (Tertiary, Small, left)
│   ├── Center: "Choose a template" — Inter 600 18px Colors/Text/Primary
│   └── Right: empty / spacer (balanced layout)
│
├── Main content (padding: 40px, max-width 1200px centered)
│
├── Page headline
│   ├── "Pick a template" — H2, Colors/Text/Primary
│   ├── Gap: 8px
│   └── "Choose the style that fits your story. You can adjust everything later."
│       DM Sans 400 16px Colors/Text/Secondary
│
├── Gap: 32px
│
├── Occasion filter tabs (horizontal scroll, gap 8px)
│   └── Filter pill (border-radius 24px, height 36px, padding 8px 20px)
│       ├── Active: bg Colors/Accent/Gold, text Colors/Text/Primary, DM Sans 500 14px
│       └── Inactive: border 1px Colors/UI/Border, text Colors/Text/Secondary
│       Options: All · Birthday · Wedding · Graduation · Baby · Anniversary
│
├── Gap: 32px
│
└── Template grid (auto-fill columns, minmax 280px, gap 24px)
    └── Templates/TemplateCard (Gallery size, Default state)
        Show all 9 templates from the starter library
        Arrange: Birthday row first, then Wedding, Graduation, Baby, Anniversary
```

**Selected state (after user clicks a card):**
- Card border becomes 2.5px Colors/Accent/Gold
- Checkmark badge appears top-right of card
- Fixed bottom bar slides up (height 72px, bg white, shadow Shadows/XL):
  - Left: selected template name + occasion badge
  - Right: "Use this template →" Primary Medium button

### Mobile Layout (375 × 812px)

```
Frame: "Template Picker Mobile"
├── Navigation/TopBar (64px)
│   ├── "←" back icon (left)
│   └── "Choose a template" — Inter 600 16px (centered)
│
├── Content (padding: 16px)
│
├── "Pick a template" — H3, Colors/Text/Primary
├── Gap: 4px
├── Subtext — DM Sans 400 14px Colors/Text/Secondary
├── Gap: 20px
│
├── Occasion filter (horizontal scroll, no wrap, gap 8px)
│   └── Same filter pills, scrollable
│
├── Gap: 20px
│
└── Template grid (1 column, gap 16px)
    └── Templates/TemplateCard (Gallery size, full width)
```

---

## 📱 SCREEN 2: STEP 2 — PHOTO UPLOAD

**Frame:** 1440 × 900px (Desktop) / 375 × 900px (Mobile)
**Route:** `/stories/[id]/edit?step=2`

### Desktop Layout

```
Frame: "Story Creation — Step 2 Photos"
├── Background: Colors/Background/Primary
│
├── Navigation/TopBar (64px)
│   ├── "← Back" (Tertiary Small, left)
│   ├── Center: Navigation/StepIndicator (Step 2 active)
│   └── Right: "Save draft" Tertiary Small
│
├── Two-column layout (padding: 40px, gap: 48px)
│   ├── LEFT COLUMN (flex: 1, max-width 480px)
│   │   ├── Step badge — "Step 2" DM Sans 500 12px Colors/Accent/Gold
│   │   ├── Gap: 8px
│   │   ├── Headline — "Add your photos" H2 Colors/Text/Primary
│   │   ├── Gap: 8px
│   │   ├── Subtext — DM Sans 400 16px Colors/Text/Secondary
│   │   │   "Upload up to 30 photos. Add captions to help the AI tell your story better."
│   │   ├── Gap: 32px
│   │   │
│   │   ├── Upload/PhotoZone (Empty state)
│   │   ├── Gap: 16px
│   │   └── Upload constraints note
│   │       "JPG, PNG or WEBP · Max 10MB per photo · Up to 30 photos"
│   │       DM Sans 400 12px Colors/Text/Secondary
│   │
│   └── RIGHT COLUMN (flex: 1)
│       └── Upload/PhotoZone (HasPhotos state)
│           Show 6 example thumbnails in the grid
│           With caption inputs below each
│
└── Bottom action bar (fixed, height 72px, bg white, border-top Colors/UI/Border)
    ├── Left: "← Back" Tertiary Medium
    └── Right: "Continue →" Primary Medium (disabled until ≥1 photo)
```

### Mobile Layout (375 × 900px)

```
Frame: "Step 2 Photos Mobile"
├── Navigation/TopBar (64px)
│   ├── "←" back icon
│   └── Navigation/StepIndicator (compact, dots only, no labels)
│
├── Content (padding: 16px)
│   ├── Step badge + Headline (stacked)
│   ├── Gap: 16px
│   ├── Upload/PhotoZone (full width)
│   ├── Gap: 16px
│   └── Photo grid (3-column, 100px tiles)
│
└── Bottom action bar (fixed, 72px)
    ├── "Back" Tertiary
    └── "Continue" Primary
```

---

## 📱 SCREEN 3: STEP 3 — MEMORIES FORM

**Frame:** 1440 × 1000px (Desktop) / 375 × 1100px (Mobile, scrollable)
**Route:** `/stories/[id]/edit?step=3`

### Desktop Layout

```
Frame: "Story Creation — Step 3 Memories"
├── Navigation/TopBar (64px)
│   ├── "← Back" Tertiary Small
│   ├── Center: Navigation/StepIndicator (Step 3 active)
│   └── "Save draft" Tertiary Small
│
├── Two-column layout (padding: 40px, gap: 48px)
│   ├── LEFT COLUMN (max-width 400px, sticky top 40px)
│   │   ├── Step badge — "Step 3" in Colors/Accent/Gold
│   │   ├── Gap: 8px
│   │   ├── "Your memories" — H2 Colors/Text/Primary
│   │   ├── Gap: 8px
│   │   ├── Subtext — "Write as much or as little as you like.
│   │   │             The AI will fill in the rest."
│   │   │             DM Sans 400 16px Colors/Text/Secondary
│   │   ├── Gap: 32px
│   │   ├── Template info card (Cards/Card, Gradient variant)
│   │   │   ├── Selected template thumbnail (80px × 56px, border-radius 6px)
│   │   │   ├── Gap: 10px
│   │   │   ├── Template name — Inter 600 14px
│   │   │   └── "Change template" — Tertiary XSmall Colors/Accent/Gold
│   │   └── (sticky — stays visible while user scrolls form)
│   │
│   └── RIGHT COLUMN (flex: 1)
│       ├── Story title field
│       │   ├── Forms/Label ("Story title" + required *)
│       │   └── Inputs/Input (text, placeholder: "e.g. Nne's 70th Birthday")
│       ├── Gap: 24px
│       │
│       └── Memory sections (one per template section, stacked, gap 24px)
│           └── Forms/MemorySection (×4, one per template slot)
│               Show example:
│               Section 1: "The Gathering" — "Who was there? Where did it happen?"
│               Section 2: "The Moment" — "What was the highlight? What made it special?"
│               Section 3: "The People" — "Who made this day? Any words or gestures that stood out?"
│               Section 4: "Looking Ahead" — "What does this celebration mean for the future?"
│
└── Bottom action bar (fixed, 72px)
    ├── "← Back" Tertiary
    └── "Generate my story →" Primary Medium
        └── Gemini sparkle icon (16px) left of label
```

---

## 📱 SCREEN 4: STEP 4 — PREVIEW (LOADING → GENERATED)

**Frame:** 1440 × 900px (Desktop) / 375 × 900px (Mobile)
**Route:** `/stories/[id]/edit?step=4`

### Loading State

```
Frame: "Step 4 — Generating"
├── Navigation/TopBar (64px)
│   └── Center: Navigation/StepIndicator (Step 4 active)
│
├── Content (centered, padding: 80px 40px)
│   ├── Animated shimmer card (Cards/Card, 640px wide, centered)
│   │   ├── Skeleton line (100%, 14px height, shimmer animation)
│   │   ├── Gap: 12px
│   │   ├── Skeleton line (90%)
│   │   ├── Skeleton line (85%)
│   │   ├── Gap: 24px
│   │   └── (repeat 3 more section skeletons)
│   ├── Gap: 32px
│   └── "Writing your story…" — DM Sans 400 16px Colors/Text/Secondary centered
│       With animated ellipsis (…)
```

### Generated State

```
Frame: "Step 4 — Preview"
├── Navigation/TopBar (64px)
│   ├── "← Back" Tertiary Small
│   ├── Center: Navigation/StepIndicator (Step 4 active)
│   └── "Save draft" Tertiary Small
│
├── Two-column layout (padding: 40px, gap: 48px)
│   ├── LEFT COLUMN (max-width 640px)
│   │   ├── Step badge — "Step 4" in Colors/Accent/Gold
│   │   ├── Gap: 8px
│   │   ├── "Here's your story" — H2 Colors/Text/Primary
│   │   ├── Gap: 8px
│   │   ├── Subtext — "Read through it. Regenerate any section or edit directly."
│   │   ├── Gap: 32px
│   │   │
│   │   └── Narrative sections (stacked, gap: 32px)
│   │       └── Story/NarrativeSection (×4, Generated state)
│   │           Playfair Display 400 18px prose
│   │           Regenerate button below each
│   │
│   └── RIGHT COLUMN (max-width 320px, sticky)
│       ├── "Story preview" label — DM Sans 500 12px Colors/Text/Secondary
│       ├── Gap: 12px
│       └── Mini story card (Cards/Card, Gradient)
│           ├── Photo collage (2×2 grid, 140px total, border-radius 8px)
│           ├── Padding: 12px
│           ├── Story title — Inter 700 14px
│           ├── Occasion badge
│           └── "View full preview" — Tertiary XSmall
│
└── Bottom action bar (fixed, 72px)
    ├── "← Back" Tertiary
    └── "Publish & share →" Primary Medium
```

---

## 📱 SCREEN 5: STEP 5 — SHARE

**Frame:** 1440 × 900px (Desktop) / 375 × 812px (Mobile)
**Route:** `/stories/[id]/edit?step=5`

### Desktop Layout

```
Frame: "Step 5 — Share"
├── Navigation/TopBar (64px)
│   └── Center: Navigation/StepIndicator (Step 5 active, all complete)
│
├── Content (centered, max-width 560px, padding: 80px 40px)
│
├── Share/SharePanel (full component, centered)
│
└── Below panel:
    ├── Gap: 40px
    └── "What's next?" hint card (Cards/Card, Gradient, centered)
        ├── "Share it with someone you love" — Inter 600 16px
        └── "Send the link, post it on WhatsApp, or print it out."
            DM Sans 400 14px Colors/Text/Secondary
```

---

## 🖼️ SCREEN 6: PUBLIC STORY VIEW

**Frame:** 1440 × auto (Desktop) / 375 × auto (Mobile, scrollable)
**Route:** `/share/[token]`

### Desktop Layout — Centered Narrative Layout

```
Frame: "Public Story View — Centered Narrative"
├── Background: template color scheme (e.g. Colors/Template/Terracotta/Background)
│
├── Minimal top bar (height: 56px, bg transparent)
│   └── Right: "Create your own — Momentix" — DM Sans 400 13px Colors/Text/Secondary
│       With small Momentix wordmark
│
├── Hero section (padding: 80px 40px 40px, max-width 800px, centered)
│   ├── Occasion badge (pill, template accent color)
│   ├── Gap: 16px
│   ├── Story title — Playfair Display 700 48px Colors/Text/Primary line-height 1.2
│   ├── Gap: 12px
│   └── Created date — DM Sans 400 14px Colors/Text/Secondary
│
├── Photo strip (full width, horizontal scroll or masonry, padding: 0 40px)
│   └── Photos: 200px height, variable width, gap 8px, border-radius 8px
│
├── Gap: 64px
│
├── Narrative (max-width 640px, centered, padding: 0 40px)
│   └── Sections (stacked, gap 48px)
│       └── Each section:
│           ├── Section label — DM Sans 500 11px Colors/Text/Secondary uppercase
│           ├── Gap: 12px
│           └── Prose — Typography/Narrative/Body (Playfair Display 400 18px 30px lh)
│
├── Gap: 80px
│
└── Footer (centered, padding: 40px)
    ├── Thin divider (1px Colors/UI/Border, 80px wide)
    ├── Gap: 24px
    └── "Created with Momentix" — DM Sans 400 13px Colors/Text/Secondary
        with Momentix wordmark (24px height)
```

### Template Layout Variants

Design three layout frames using the same content but different arrangements:

**Layout A — Centered Narrative** (described above)
Used by: Birthday Warm, Graduation Journey, Anniversary Love Letter

**Layout B — Split Photo**
```
├── Left half (50%): Full-height photo collage, overflow hidden
└── Right half (50%): Scrollable narrative, padding 48px
    ├── Occasion badge
    ├── Title (Playfair Display 700 40px)
    └── Narrative sections
```
Used by: Wedding Traditional, Wedding Modern, Baby First Year

**Layout C — Full Bleed**
```
├── Full-width hero photo (100vw × 400px, object-fit cover)
│   └── Title overlay (bottom-left, padding 40px)
│       Playfair Display 700 48px white, text-shadow
└── Narrative below (centered, max-width 640px, padding 64px 40px)
```
Used by: Birthday Milestone, Graduation First-Gen, Baby New Arrival

---

## 🖼️ TEMPLATE THUMBNAIL DESIGNS (9 thumbnails)

Design these as mini frames (280px × 180px each) to use as template card previews.

Each thumbnail shows a scaled-down version of the public story view layout with:
- Template background color
- Placeholder text blocks (gray bars, not real text)
- 1–2 small photo placeholders (rounded rectangles)
- Template name in the appropriate font

| Template | Layout | Color | Thumbnail feel |
|---|---|---|---|
| Birthday Warm | Centered Narrative | Terracotta `#FAF0EB` | Warm, rounded, soft |
| Birthday Milestone | Full Bleed | Ivory `#FAF8F2` | Elegant, formal |
| Wedding Traditional | Split Photo | Blush `#FDF0F3` | Romantic, balanced |
| Wedding Modern | Split Photo | Slate `#F0F2F5` | Clean, editorial |
| Graduation Journey | Centered Narrative | Sage `#EFF5EE` | Fresh, hopeful |
| Graduation First-Gen | Full Bleed | Ivory `#FAF8F2` | Bold, proud |
| Baby First Year | Split Photo | Blush `#FDF0F3` | Soft, pastel |
| Baby New Arrival | Full Bleed | Ivory `#FAF8F2` | Quiet, tender |
| Anniversary Love Letter | Centered Narrative | Terracotta `#FAF0EB` | Intimate, warm |

---

## 📂 Figma File Setup

### Pages

| Page | Contents |
|---|---|
| Page 1 | 🎨 Design System (existing + Phase 3 additions) |
| Page 2 | 🧩 Components — Phase 3 (StepIndicator, TemplateCard, PhotoZone, MemorySection, NarrativeSection, SharePanel) |
| Page 3 | 🖼️ Template Thumbnails (all 9, 280×180px each) |
| Page 4 | 📱 Template Picker — Desktop + Mobile |
| Page 5 | 📱 Step 2 Photos — Desktop + Mobile |
| Page 6 | 📱 Step 3 Memories — Desktop + Mobile |
| Page 7 | 📱 Step 4 Preview — Loading + Generated, Desktop + Mobile |
| Page 8 | 📱 Step 5 Share — Desktop + Mobile |
| Page 9 | 🌐 Public Story View — Layout A, B, C (Desktop) |
| Page 10 | 🌐 Public Story View — Mobile (all 3 layouts) |

### Frame Naming Convention

```
[Screen]/[Variant]/[Breakpoint]

Examples:
  Template Picker/Default/Desktop
  Template Picker/Selected/Desktop
  Step 2 Photos/Empty/Desktop
  Step 2 Photos/With Photos/Desktop
  Step 4 Preview/Loading/Mobile
  Step 4 Preview/Generated/Mobile
  Public View/Layout A — Centered/Desktop
  Public View/Layout B — Split/Desktop
```

### Auto Layout Rules

- Every component uses Auto Layout
- All spacing from the 8px scale (8, 16, 24, 32, 40, 48, 64, 80)
- No hardcoded colors — always use color styles
- No hardcoded fonts — always use text styles

---

## ✅ Figma Design QA Checklist

### Components
- [ ] StepIndicator — all 5 states (steps 1–5 active)
- [ ] TemplateCard — Default, Hover, Selected variants
- [ ] PhotoZone — Empty, DragOver, HasPhotos variants
- [ ] MemorySection — Default, Focus, Filled variants
- [ ] NarrativeSection — Loading, Generated, Editing variants
- [ ] SharePanel — Default, Copied state

### Screens
- [ ] Template Picker Desktop (default + selected state)
- [ ] Template Picker Mobile
- [ ] Step 2 Photos Desktop (empty + with photos)
- [ ] Step 2 Photos Mobile
- [ ] Step 3 Memories Desktop
- [ ] Step 3 Memories Mobile
- [ ] Step 4 Preview Desktop (loading + generated)
- [ ] Step 4 Preview Mobile
- [ ] Step 5 Share Desktop
- [ ] Step 5 Share Mobile
- [ ] Public Story View — all 3 layouts, Desktop + Mobile

### Templates
- [ ] All 9 template thumbnails (280×180px)
- [ ] All 3 layout variants demonstrated on public view page

### Quality
- [ ] All text contrast ≥ 4.5:1
- [ ] All spacing multiples of 8px
- [ ] No hardcoded hex values
- [ ] All interactive elements have hover/active states
- [ ] Prototype connections between all 5 steps
- [ ] Mobile layouts tested at 375px

---

## 📄 Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | May 2026 | Initial Phase 3 Figma PRD — Story Creation & Templates |

---

*End of Phase 3 Figma PRD*
*Extends Momentix Phase 1 Figma PRD v1.0*
