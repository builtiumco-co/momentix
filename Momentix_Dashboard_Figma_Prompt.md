# Momentix — Dashboard Screen Figma Prompt

Use this prompt to generate the Dashboard screen in Figma (or with an AI Figma plugin like Figma AI, Galileo, or Relume). It is derived directly from the Momentix Phase 1 PRD and design system.

---

## DESIGN SYSTEM REFERENCE

Before building, apply these tokens:

**Colors**
- Background/Primary: `#FBF9F6` — page background
- Background/Secondary: `#F5F1ED` — card surfaces, stat cards
- Background/White: `#FFFFFF` — elevated card surfaces
- Text/Primary: `#2C2C2C` — headings, primary text
- Text/Secondary: `#5A5A5A` — labels, subtext, dates
- Accent/Gold: `#D4A574` — primary CTA, active states, avatar ring
- Accent/Rose: `#C89E8F` — secondary accent
- Accent/Green: `#B8C5A6` — success
- Accent/Coral: `#E8B4B0` — error
- UI/Border: `#E8E6E1` — all borders and dividers

**Typography**
- H2: Inter 700, 32px, line-height 40px
- H3: Inter 600, 24px, line-height 31px
- Body/Default: DM Sans 400, 16px, line-height 24px
- Body/Small: DM Sans 400, 14px, line-height 20px
- Body/Label: DM Sans 500, 12px, line-height 16px

**Shadows**
- Small: 0px 2px 4px `#2C2C2C` at 8% opacity
- Medium: 0px 4px 8px `#2C2C2C` at 12% opacity
- Large: 0px 8px 16px `#2C2C2C` at 15% opacity

**Border radius**
- Cards: 12px
- Buttons: 24px (pill)
- Inputs: 8px
- Small UI: 4px
- Images inside cards: 8px top corners only

**Spacing scale (8px base)**
- 8px, 16px, 24px, 32px, 40px

---

## PROMPT — DESKTOP DASHBOARD (1440 × 900px)

---

Design a desktop dashboard screen for **Momentix**, an AI-powered emotional storytelling app. Frame size: **1440 × 900px**.

Use background color `#FBF9F6` (Background/Primary) as the full-bleed page fill.

---

### TOP NAVIGATION BAR

- Height: 64px, full width, sticky
- Background: `#FFFFFF`, border-bottom: 1px solid `#E8E6E1`
- Horizontal padding: 40px left and right
- Shadow: 0px 2px 4px `#2C2C2C` at 8%

**Left:** Momentix wordmark — "Momentix" in Playfair Display 700, 24px, color `#2C2C2C`. Optionally precede with a small floral/sparkle icon at 24px.

**Center:** Spacer (flex-grow).

**Right (left to right):**
1. "New Story" button — Primary, Small (height 32px, padding 8px 24px, border-radius 24px, background `#D4A574`, label DM Sans 500 16px `#2C2C2C`)
2. Gap: 16px
3. User avatar — 32px circle, background `#D4A574`, initials "JD" in DM Sans 500 14px `#FFFFFF`. Show a dropdown caret (12px chevron) to the right.

---

### MAIN CONTENT AREA

- Padding: 40px all sides
- Max-width: 1360px, centered

---

### GREETING SECTION

- Margin-bottom: 32px

Row layout (left-aligned, vertical stack):
1. Headline — "Hi, John! 👋" — Inter 700, 32px, `#2C2C2C`, line-height 40px
2. Gap: 8px
3. Subheading — "Welcome back to your stories" — DM Sans 400, 14px, `#5A5A5A`, line-height 20px

---

### QUICK STATS ROW

- 3-column grid, gap: 24px
- Margin-bottom: 40px

Each stat card:
- Background: `#F5F1ED`
- Border-radius: 12px
- Padding: 24px
- Shadow: Small (0px 2px 4px `#2C2C2C` 8%)
- No border

Card 1 — **Stories Created**
- Label: "Stories Created" — DM Sans 500, 12px, `#5A5A5A`
- Gap: 8px
- Value: "4" — Inter 600, 24px, `#2C2C2C`

Card 2 — **Total Views**
- Label: "Total Views" — DM Sans 500, 12px, `#5A5A5A`
- Gap: 8px
- Value: "1,098" — Inter 600, 24px, `#2C2C2C`

Card 3 — **People Reached**
- Label: "People Reached" — DM Sans 500, 12px, `#5A5A5A`
- Gap: 8px
- Value: "142" — Inter 600, 24px, `#2C2C2C`

---

### STORIES SECTION

**Section header row** (horizontal, space-between):
- Left: "Your Stories" — Inter 600, 24px, `#2C2C2C`
- Right: "Filter by occasion" — dropdown select, DM Sans 400 14px `#5A5A5A`, border 1px `#E8E6E1`, border-radius 8px, height 36px, padding 8px 12px

Gap below header: 24px

**Stories grid:** 2 columns, gap: 24px

---

### STORY CARD (default state, 2 per row)

- Background: `#FFFFFF`
- Border: 1px solid `#E8E6E1`
- Border-radius: 12px
- Shadow: Small (0px 2px 4px `#2C2C2C` 8%)
- No padding on the outer card (image bleeds to edges top)

**Structure (top to bottom):**

1. **Thumbnail image** — full card width × 200px height, object-fit: cover, border-radius 8px on top-left and top-right corners only. Use a warm, muted placeholder (soft terracotta or sage gradient, or a blurred photo placeholder)

2. **Occasion badge** — positioned overlapping the bottom-left of the image (8px from bottom, 12px from left). Pill shape, border-radius 24px, height 22px, padding 4px 10px. Background varies by occasion:
   - Birthday: `#FAECE7` text `#993C1D`
   - Wedding: `#E1F5EE` text `#0F6E56`
   - Graduation: `#EEEDFE` text `#3C3489`
   - Baby Milestone: `#FAEEDA` text `#854F0B`
   Font: DM Sans 500 11px

3. **Card body** — padding: 16px

   - Story title — Inter 700, 16px, `#2C2C2C`, line-height 22px
   - Gap: 4px
   - Occasion label — DM Sans 400, 14px, `#5A5A5A`
   - Gap: 4px
   - Created date — DM Sans 400, 12px, `#5A5A5A`
   - Gap: 8px
   - Excerpt — DM Sans 400, 13px, `#5A5A5A`, line-height 19px, 2-line clamp (ellipsis)

4. **Card footer** — border-top: 1px solid `#E8E6E1`, padding: 12px 16px

   Row, space-between:
   - Left: photo count pill (icon 🖼 + number, 12px DM Sans, `#5A5A5A`) and view count (icon 👁 + number, 12px)
   - Right (only shown in hover state): "View" and "Edit" — Tertiary buttons, Small. DM Sans 500 14px, color `#D4A574`, no background, no border

**Show 4 story cards** (2 rows × 2 columns). Example content:

Card 1:
- Title: "Nne's 70th Birthday"
- Occasion: Birthday
- Date: 10 May 2025
- Excerpt: "The compound was alive with the scent of jollof smoke and hibiscus as we gathered to celebrate seventy years of grace…"
- Photos: 8 · Views: 142

Card 2:
- Title: "Obinna & Chisom's Wedding"
- Occasion: Wedding
- Date: 22 Apr 2025
- Excerpt: "Under a canopy of golden harmattan light, two families became one. The ululation rose like a prayer answered…"
- Photos: 24 · Views: 389

Card 3:
- Title: "Graduation — Unilag 2025"
- Occasion: Graduation
- Date: 15 Mar 2025
- Excerpt: "Five years of early morning lectures, of 3am typing and quiet victories. Today the gown finally fit…"
- Photos: 12 · Views: 0
- Show "Draft" badge (top-right of card body): `#F5F1ED` bg, `#5A5A5A` text, 11px, border-radius 4px

Card 4:
- Title: "Baby Temi — First Year"
- Occasion: Baby Milestone
- Date: 8 Feb 2025
- Excerpt: "She grabbed my finger at dawn on a Tuesday, and nothing has been the same since. This is her year in light…"
- Photos: 31 · Views: 567

---

### HOVER STATE (create as a separate variant or overlay frame)

Apply to any story card on hover:
- Shadow upgrades to Large: 0px 8px 16px `#2C2C2C` 15%
- "View" and "Edit" tertiary buttons appear in the card footer right side
- Transition: 200ms ease-in-out

---

## PROMPT — MOBILE DASHBOARD (375 × 812px)

---

Design the same dashboard for a **375 × 812px** mobile frame.

**Top Navigation Bar**
- Height: 64px, full width
- Background: `#FFFFFF`, border-bottom: 1px `#E8E6E1`
- Horizontal padding: 16px
- Left: "Momentix" wordmark, Playfair Display 700 20px `#2C2C2C`
- Right: User avatar circle 32px, `#D4A574` bg, initials "JD" white

**Main content** — padding: 16px horizontal

**Greeting section**
- "Hi, John! 👋" — Inter 700, 24px, `#2C2C2C`
- "Welcome back to your stories" — DM Sans 400, 14px, `#5A5A5A`
- Margin-bottom: 24px

**Stats row** — 3 columns, gap: 8px, same card design as desktop but condensed (padding: 12px 10px)

**Stories section**
- "Your Stories" heading — Inter 600, 20px
- Gap: 16px
- 1-column grid, full width
- Story cards: same structure but thumbnail height 160px

**Bottom Navigation Bar**
- Height: 72px, fixed bottom
- Background: `#FFFFFF`, border-top: 1px `#E8E6E1`
- 4 items evenly spaced: Home, Create, Profile, Settings
- Each item: 24px icon + 12px label below, DM Sans 400
- Active (Home): icon and label color `#D4A574`
- Inactive: icon and label color `#5A5A5A`
- Safe area padding-bottom: 16px

---

## EMPTY STATE VARIANT

Also create an empty state frame (no stories). Replace the stories grid with:

- Center-aligned, vertically stacked content in the stories area
- Empty box illustration (120px, muted line art, warm gray tones)
- Gap: 24px
- "No stories yet" — Inter 600, 24px, `#2C2C2C`
- Gap: 8px
- "Create your first story to get started" — DM Sans 400, 16px, `#5A5A5A`
- Gap: 24px
- "Create Story" Primary button, Medium size (height 44px, border-radius 24px, bg `#D4A574`)

---

## FIGMA FILE SETUP CHECKLIST

When creating the file:

- [ ] Page 1: Design System (colors, type, shadows)
- [ ] Page 2: Components (Button, Input, Card, Nav)
- [ ] Page 3: Dashboard Desktop — with stories
- [ ] Page 4: Dashboard Desktop — empty state
- [ ] Page 5: Dashboard Mobile — with stories
- [ ] Page 6: Dashboard Mobile — empty state
- [ ] Label all frames clearly (e.g. "Dashboard/Desktop/With Stories")
- [ ] Use Auto Layout on all components
- [ ] Apply color styles (not hardcoded hex values)
- [ ] Apply text styles (not hardcoded font properties)
- [ ] Mark interactive elements with prototype connections where relevant

---

*Based on Momentix Phase 1 PRD v1.0 — May 2026*
