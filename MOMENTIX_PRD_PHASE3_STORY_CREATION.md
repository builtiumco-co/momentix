# Momentix PRD — Phase 3: Story Creation Flow

**Version:** 1.0
**Status:** Ready for Development
**Scope:** Story Creation Flow — Template Selection, Form, AI Generation, Preview, Share
**Date Created:** May 2026
**Depends On:** Phase 1 (Auth ✅), Phase 2 (Dashboard ✅)

---

## 📋 Overview

Phase 3 builds the core product loop of Momentix: a user selects a story template, fills in their memories, the AI agent slots in the prose, and the story is published and shared via link.

This is a **template-first architecture**. The AI never writes from scratch. It fills pre-defined story sections (slots) using the user's inputs and the template's tone guidelines. This keeps output quality consistent, generation fast, and API token cost minimal.

The entire flow lives in a **dedicated folder** (`/src/app/stories`) completely separate from the dashboard, with its own components, templates library, and AI logic.

---

## 🎯 Objectives

- Let users create a complete story in under 5 minutes
- Deliver consistent, high-quality narratives regardless of how much the user writes
- Keep AI generation cost under 500 tokens per story (slot-filling, not cold generation)
- Make templates browseable and selectable like Canva
- Allow users to preview, adjust, and publish before sharing

---

## 🗂️ Folder Structure

```
/src
  /app
    /stories
      /new                    ← Entry: template picker
      /[id]
        /edit                 ← Multi-step creation form
        /preview              ← Story preview before publish
      /templates              ← Template browser (browseable gallery)
    /share
      /[token]                ← Public story view (no auth required)

  /components
    /story-creation           ← All creation flow UI components
      StepIndicator.tsx
      OccasionGrid.tsx
      TemplateCard.tsx
      TemplatePicker.tsx
      PhotoUploader.tsx
      MemoryForm.tsx
      SectionSlot.tsx
      GenerateButton.tsx
      StoryPreview.tsx
      SharePanel.tsx
    /story-templates          ← Template rendering components
      TemplateRenderer.tsx
      TemplateThumbnail.tsx
    /shared                   ← Reused across dashboard + stories
      Modal.tsx
      ProgressBar.tsx
      CopyButton.tsx

  /lib
    /templates                ← All template definitions (JSON/TS)
      index.ts                ← Template registry
      birthday.ts
      wedding.ts
      graduation.ts
      baby.ts
      anniversary.ts
    /ai
      generate.ts             ← Gemini API call wrapper
      promptBuilder.ts        ← Builds slot-filling prompt per section
      tokenEstimator.ts       ← Caps input to stay under token budget
    /stories
      crud.ts                 ← create, read, update, delete helpers
      share.ts                ← Share token generation
```

---

## 🧩 Template Architecture

### What a Template Is

A template is a TypeScript object that defines the **structure, tone, layout, and section slots** of a story. The AI never decides these — they are locked per template. The AI only fills the prose for each slot.

### Template Schema

```ts
type StoryTemplate = {
  id: string                    // e.g. "birthday-warm"
  occasion: Occasion            // Birthday | Wedding | Graduation | Baby | Anniversary
  name: string                  // Display name: "Warm Celebration"
  description: string           // One-line description shown in picker
  thumbnail: string             // Path to preview image
  colorScheme: ColorScheme      // "terracotta" | "sage" | "ivory" | "blush" | "slate"
  fontPairing: FontPairing      // "playfair-dmsans" | "inter-dmsans"
  layout: LayoutType            // "centered-narrative" | "split-photo" | "full-bleed"
  tone: string                  // Passed to AI: "warm, celebratory, intimate"
  sections: TemplateSection[]   // Ordered story slots
}

type TemplateSection = {
  id: string                    // "opening" | "highlight" | "closing" etc.
  label: string                 // Shown to user: "The Gathering"
  aiHint: string                // Passed to AI: "Set the scene, describe the atmosphere"
  userPrompt: string            // Form label shown to user
  placeholder: string           // Input placeholder text
  maxWords: number              // Output cap for this section (e.g. 80)
  required: boolean
}
```

### Starter Template Library (MVP)

| Occasion | Template ID | Name | Color Scheme | Sections |
|---|---|---|---|---|
| Birthday | `birthday-warm` | Warm Celebration | Terracotta | Opening, The Moment, The People, Looking Ahead |
| Birthday | `birthday-milestone` | Milestone | Ivory | Reflection, Journey, Legacy, Toast |
| Wedding | `wedding-traditional` | Traditional | Blush | The Day Begins, The Ceremony, The Celebration, Forever |
| Wedding | `wedding-modern` | Modern Minimal | Slate | First Look, The Vows, The Party, What's Next |
| Graduation | `graduation-journey` | Journey Reflection | Sage | Where It Started, The Grind, The Moment, What's Next |
| Graduation | `graduation-firstgen` | First Generation | Ivory | The Dream, The Sacrifice, The Achievement, The Promise |
| Baby | `baby-first-year` | First Year | Blush | The Arrival, Month by Month, Milestones, Year One |
| Baby | `baby-new-arrival` | New Arrival | Ivory | The Wait, The Day, First Days, Our New World |
| Anniversary | `anniversary-love-letter` | Love Letter | Terracotta | How We Met, What We've Built, The Hard Parts, Still Choosing You |

---

## 📊 API Endpoints

### Story CRUD

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/stories` | Required | Create story (title, occasion, template_id) as draft |
| GET | `/api/stories` | Required | List all user's stories |
| GET | `/api/stories/:id` | Required | Get single story with photos and sections |
| PUT | `/api/stories/:id` | Required | Update story fields |
| DELETE | `/api/stories/:id` | Required | Delete story, cascade photos |

### Photos

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/photos/upload` | Required | Upload photo to Supabase Storage, associate with story |
| DELETE | `/api/photos/:id` | Required | Delete photo from storage and DB |

### AI Generation

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/stories/:id/generate` | Required | Generate prose for all unfilled sections |
| POST | `/api/stories/:id/generate/:sectionId` | Required | Regenerate a single section only |

### Sharing

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/stories/:id/share` | Required | Get or create share token, return full URL |
| GET | `/api/share/:token` | None | Public: fetch story by share token |

---

## 🗄️ Database Migrations

### Stories Table

```sql
CREATE TABLE stories (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  occasion     TEXT NOT NULL,
  template_id  TEXT NOT NULL,
  published    BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stories_user_id ON stories(user_id);
```

### Story Sections Table

```sql
CREATE TABLE story_sections (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id     UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  section_id   TEXT NOT NULL,        -- matches template section id
  user_input   TEXT,                 -- raw user notes for this slot
  ai_output    TEXT,                 -- AI-generated prose
  edited_text  TEXT,                 -- final text (user may have edited)
  order_index  INTEGER NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sections_story_id ON story_sections(story_id);
```

### Photos Table

```sql
CREATE TABLE photos (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id     UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  url          TEXT NOT NULL,
  caption      TEXT,
  order_index  INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_photos_story_id ON photos(story_id);
```

### Story Shares Table

```sql
CREATE TABLE story_shares (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id     UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  share_token  TEXT UNIQUE NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  expires_at   TIMESTAMPTZ              -- NULL = never expires
);

CREATE UNIQUE INDEX idx_shares_token ON story_shares(share_token);
```

### RLS Policies

```sql
-- Stories: users can only access their own
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own their stories"
  ON stories FOR ALL USING (auth.uid() = user_id);

-- Sections: inherit story ownership
ALTER TABLE story_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own their sections"
  ON story_sections FOR ALL
  USING (story_id IN (SELECT id FROM stories WHERE user_id = auth.uid()));

-- Photos: same
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own their photos"
  ON photos FOR ALL
  USING (story_id IN (SELECT id FROM stories WHERE user_id = auth.uid()));

-- Shares: public read by token, owner manages
ALTER TABLE story_shares ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read shares"
  ON story_shares FOR SELECT USING (true);
CREATE POLICY "Owner manages shares"
  ON story_shares FOR ALL
  USING (story_id IN (SELECT id FROM stories WHERE user_id = auth.uid()));
```

---

## 🤖 AI Integration

### Guiding Principle

The AI fills **one section at a time**. It receives:
1. The template's tone instruction
2. The section's aiHint
3. The user's input for that section
4. The story's occasion and title (for context)
5. A strict word limit

It never sees other sections. It never decides structure. It never writes layout.

### Prompt Structure (per section)

```
You are a warm, literary storytelling assistant for Momentix.

STORY CONTEXT:
- Occasion: {occasion}
- Title: {title}
- Template tone: {template.tone}

YOUR TASK:
Write the "{section.label}" section of this story.
Instruction: {section.aiHint}
Word limit: {section.maxWords} words maximum.

USER'S NOTES FOR THIS SECTION:
{userInput}

Write only the prose for this section. No headings, no labels.
Warm, personal, specific. Use the user's details.
```

### Token Budget

| Input | Estimated tokens |
|---|---|
| System prompt + context | ~120 |
| User input per section | ~80 |
| Output per section | ~100 |
| **Total per section** | **~300** |
| **Total per story (4 sections)** | **~1,200** |

This is well within Gemini free tier limits even at scale.

### Error Handling

- API timeout → retry once after 2s
- Second failure → return fallback placeholder text, mark section as `needs_regeneration`
- Invalid response format → log and surface graceful error to user
- Never block story save on generation failure

---

## 🖥️ Frontend — Creation Flow (5 Steps)

All steps live under `/stories/new` and `/stories/[id]/edit`.
State is persisted to the DB as a draft after each step (auto-save).

### Step 1 — Pick a Template

Route: `/stories/new`

- Grid of template cards, filterable by occasion
- Each card: thumbnail, template name, occasion badge, short description
- Selecting a template creates a story draft via `POST /api/stories` and redirects to `/stories/[id]/edit?step=2`

### Step 2 — Upload Photos

Route: `/stories/[id]/edit?step=2`

- Drag-and-drop zone or file picker
- Upload on selection (not on submit) via `POST /api/photos/upload`
- Show upload progress per photo
- Reorder via drag-and-drop
- Optional caption per photo
- Min: 1 photo. Max: 30 photos.

### Step 3 — Your Memories

Route: `/stories/[id]/edit?step=3`

- Form inputs mapped to each template section's `userPrompt`
- Story title field (required)
- One textarea per section (e.g. "What happened at the gathering?")
- Helper text pulled from section's `placeholder`
- Auto-save on blur

### Step 4 — Preview

Route: `/stories/[id]/edit?step=4`

- Triggers `POST /api/stories/:id/generate` for all unfilled sections
- Loading state: animated card with "Writing your story…" message
- Renders full story using `TemplateRenderer` component with the template's layout and color scheme
- Each section shows AI prose with an inline "Regenerate this section" button
- Inline editing allowed (user can type over AI output)
- "Looks good" CTA proceeds to Step 5

### Step 5 — Share

Route: `/stories/[id]/edit?step=5`

- Calls `GET /api/stories/:id/share` to generate share token
- Displays full share URL with copy-to-clipboard button
- Toggle: Publish / Keep as Draft
- "View your story" link opens `/share/[token]` in new tab
- "Back to Dashboard" returns to `/dashboard`

---

## 📄 Public Story View

Route: `/share/[token]` — no authentication required

- Fetches story via `GET /api/share/:token`
- Renders story using the same `TemplateRenderer` with the original template layout
- Shows: title, occasion, narrative sections, photo grid, creation date
- No dashboard chrome, no navigation — just the story
- Momentix watermark at bottom: "Created with Momentix"
- Increment view count on each unique page load

---

## ✅ Success Criteria

| Criteria | Definition of done |
|---|---|
| Template picker works | User can browse, filter, and select any template |
| Photos upload correctly | Images appear in correct order with captions |
| AI fills all sections | Each section generates prose using user input |
| Single section regeneration | User can regenerate one section without affecting others |
| Story renders correctly | Template layout, colors, and fonts applied correctly |
| Share link works | Public URL accessible without login, story displays correctly |
| Draft auto-saves | Refreshing the page does not lose progress |
| Token cost stays low | No single story generation exceeds 2,000 tokens |
| Mobile responsive | All 5 steps work on 375px viewport |
| WCAG AA | All form elements and text meet contrast requirements |

---

## 🔗 Dependencies

| Dependency | Status |
|---|---|
| Phase 1 Auth | ✅ Complete |
| Phase 2 Dashboard | ✅ Complete |
| Supabase Storage bucket | Must be configured before photo upload |
| Google Gemini API key | Required — free tier sufficient for MVP |
| Template JSON definitions | Must be written before Step 1 UI |

---

## 🚫 Out of Scope (Phase 3)

- Story editing after publish (Phase 4)
- Template customisation by user (Phase 4)
- Video uploads (Phase 4)
- Email sharing (Phase 4)
- Analytics beyond view counts (Phase 4)
- User-created templates (Future)

---

## 📋 Build Order

```
1. Write all template JSON definitions (/lib/templates)
2. DB migrations (stories, sections, photos, shares)
3. POST /api/stories — create draft
4. POST /api/photos/upload — photo handler
5. PUT /api/stories/:id — update sections/user input
6. POST /api/stories/:id/generate — AI slot filling
7. GET /api/stories/:id/share — share token
8. GET /api/share/:token — public view
9. Step 1 UI — template picker
10. Step 2 UI — photo uploader
11. Step 3 UI — memory form
12. Step 4 UI — preview + regenerate
13. Step 5 UI — share panel
14. Public story view (/share/[token])
15. TemplateRenderer component
16. Tests
17. Deploy
```

---

## 📄 Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | May 2026 | Initial Phase 3 PRD — Story Creation Flow |

---

*End of Phase 3 PRD*
