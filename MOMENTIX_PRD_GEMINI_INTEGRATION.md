# Momentix PRD — Phase 3: Gemini AI Integration

**Version:** 1.0
**Status:** Ready for Development
**Scope:** AI story generation — prompt configuration, photo handling, streaming, compression
**Date:** May 2026
**Depends On:** Phase 1 (Auth ✅) · Phase 2 (Dashboard ✅) · Phase 3 Story Creation Flow

---

## 📋 Overview

This PRD defines the complete configuration for how Momentix uses Google Gemini to generate personalised story narratives from user answers and photos.

The AI never writes from scratch. It fills pre-defined story sections (slots) using the user's inputs, photo descriptions, and a template's locked tone and structure. This keeps quality consistent, generation fast, and API token cost minimal — well within Gemini's free tier for MVP.

---

## 🎯 Objectives

- Generate a complete, personalised story narrative in under 30 seconds
- Keep total token cost under 3,500 tokens per story
- Stream each section to the frontend as it is written — no waiting for all sections before showing output
- Never let AI invent names, places or events not provided by the user
- Handle photo uploads at lightweight file sizes (max 2MB per photo) with client-side compression
- Degrade gracefully on API failure — partial stories are better than error screens

---

## 🗂️ Folder Structure

Drop these files into the Next.js project exactly as shown. No rearranging.

```
/src
  /types
    index.ts                          ← All shared TypeScript types

  /lib
    /templates
      birthday.ts                     ← 3 birthday template definitions
      index.ts                        ← Template registry (all occasions)
    /ai
      promptBuilder.ts                ← Assembles 3-layer Gemini prompt
      generate.ts                     ← Gemini API calls + orchestrator
    /photos
      compress.ts                     ← Client-side photo compression

  /app
    /api
      /stories
        /[id]
          /generate
            route.ts                  ← POST /api/stories/:id/generate (SSE)
          /generate
            /[sectionId]
              route.ts                ← POST /api/stories/:id/generate/:sectionId (single section regeneration)

  /hooks
    useStoryGeneration.ts             ← React hook for Step 4 preview screen
```

---

## 🧠 Architecture Decision: Caption-First (Option B)

Two options exist for sending photos to Gemini:

**Option A — Photos direct to story generation call**
Send photos as base64 inline with the story generation prompt. Gemini sees raw images while writing prose.

**Option B — Caption first, text only for story generation** ✅ Chosen for MVP
Run a separate lightweight Gemini call per photo to get a one-sentence description. Pass those captions as text into the story generation prompt.

| | Option A | Option B |
|---|---|---|
| Token cost | High — images are expensive | Low — captions are short text |
| Quality | Highest | Good — loses some nuance |
| Speed | Slower | Faster |
| Free tier safe | Risky on large photo sets | Yes |
| Complexity | Single call | Two-stage |

**Decision: Option B for MVP.** Upgrade to Option A when moving to a paid Gemini plan.

---

## 🧩 Template Architecture

### What a Template Is

A TypeScript object that defines the **structure, tone, word limits, and section instructions** of a story. The AI never decides any of these. It only fills the prose for each slot.

### Template Schema

```ts
type StoryTemplate = {
  id: SubTemplate
  occasion: Occasion
  name: string
  tone: string            // passed verbatim to Gemini system prompt
  colorScheme: ColorScheme
  layout: LayoutType
  sections: TemplateSection[]
}

type TemplateSection = {
  id: string              // "gathering" | "moment" | "people" | "closing"
  label: string           // "The Gathering" — shown on the rendered story
  aiHint: string          // instruction passed to Gemini for this section
  maxWords: number        // hard output cap — Gemini cannot exceed this
  required: boolean
}
```

### Birthday Templates (MVP — 3 variants)

#### 1. Warm Celebration (`birthday-warm`)

| Field | Value |
|---|---|
| Tone | warm, celebratory, intimate, personal |
| Colour scheme | Terracotta |
| Layout | Centered narrative |

Sections:

| Section ID | Label | AI instruction | Max words |
|---|---|---|---|
| `gathering` | The Gathering | Set the scene before the honouree arrived. Location, atmosphere, guests, anticipation. Use location and guest list provided. | 80 |
| `moment` | The Moment | Describe the emotional peak. The highlight moment the user described. Weave in any toast or speech if provided. | 80 |
| `people` | The People | Honour the relationships in the room. Who was there and what their presence meant. Warmth and connection, not a roll call. | 70 |
| `closing` | Looking Ahead | Warm reflective send-off. What made this birthday special. Reference the age. Slightly more lyrical. | 60 |

---

#### 2. Milestone (`birthday-milestone`)

| Field | Value |
|---|---|
| Tone | reflective, dignified, legacy-focused |
| Colour scheme | Ivory |
| Layout | Split photo |

Sections:

| Section ID | Label | AI instruction | Max words |
|---|---|---|---|
| `lookingBack` | Looking Back | Reflect on the journey to this age. What it means to have arrived at this milestone. Quiet, thoughtful, not sentimental. | 80 |
| `whatTheyBuilt` | What They Built | What this person has built — relationships, character, presence. Use guest list and "what made it special" as context. | 80 |
| `celebration` | The Celebration | The celebration itself — place, people, highlight. Anchor in specific details. Warmer and more present-tense. | 75 |
| `legacy` | The Legacy | What this person leaves behind — influence, warmth, what they mean to everyone there. Last sentence should land. Echo words said if provided. | 65 |

---

#### 3. Kids Birthday (`birthday-kids`)

| Field | Value |
|---|---|
| Tone | playful, joyful, light — the way a loving parent would remember the day |
| Colour scheme | Amber |
| Layout | Full bleed |

Sections:

| Section ID | Label | AI instruction | Max words |
|---|---|---|---|
| `morning` | The Morning | The child's excitement before the party. Punchy, light, short sentences fine. | 55 |
| `party` | The Party | The chaos and joy of the party — guests, games, atmosphere. Embrace the energy. | 65 |
| `theCandles` | The Moment | Candles, wish, reaction. Use the highlight moment. Include words said if provided. Make the reader feel present. | 60 |
| `growingUp` | Growing Up | 2–3 sentences only. How fast they're growing. Reference age. Brief, precise, tender. No clichés. | 40 |

---

## 🤖 Prompt Configuration

### The 3-Layer Prompt

Every Gemini call for story generation is built from exactly three layers. These are assembled by `promptBuilder.ts`.

---

#### Layer 1 — System Instruction

This never changes across any story or section call. It defines the AI's identity, constraints, and non-negotiable rules.

```
You are a warm, literary storytelling assistant for Momentix, an emotional memory platform.

Your job is to write ONE section of a personal story using the user's memories and photo descriptions.

RULES — follow all of these without exception:
1. Use ONLY the names, places, events and details from the user's answers. Never invent anything.
2. If a detail was not provided, write around it — do not fabricate.
3. Write in warm, personal, literary prose. Not a greeting card. Not a list. Not a summary.
4. Stay strictly within the word limit for the section. Do not exceed it.
5. Output ONLY the prose for the section. No headings, labels, preamble or explanation.
6. Do not start with "I" or the honouree's name. Vary the opening.
7. Do not use clichés: "memories to last a lifetime", "special day", "unforgettable moments".
8. If a quote or toast was provided, weave it in naturally — do not just drop it in.
9. Match the tone instruction exactly. Read it carefully before writing.
10. Write in past tense unless the section instruction says otherwise.
```

---

#### Layer 2 — Story Context

Changes per story. Combines all user answers and photo captions into a structured block. This is the same for all 4 section calls within one story — it does not change between sections.

```
STORY CONTEXT:
Occasion: Birthday
Template: Warm Celebration
Tone instruction: warm, celebratory, intimate, personal — like a close friend writing about someone they love

USER'S ANSWERS:
  Who this is for: My mum, Ngozi
  Age they are turning: 70
  When it happened: 10 May 2025
  Where it happened: our compound in Lagos
  Who was there: close family, church friends, grandchildren
  Highlight moment: she walked in and didn't expect anyone
  What made it special: seeing her face when she realised we'd all come
  Words said on the day: "Seventy years and she still makes every room feel like home"

PHOTO DESCRIPTIONS (from uploaded photos — use these to enrich the story):
  Photo 1: A large outdoor gathering with decorated chairs and yellow garlands
  Photo 2: An elderly woman in blue lace covering her mouth in surprise
  Photo 3: A group of children sitting in a row, dressed in matching outfits
  Photo 4: A woman cutting a tall white cake surrounded by family
```

---

#### Layer 3 — Section Instruction

Changes per section call. Tells Gemini exactly what to write for this specific section.

```
YOUR TASK NOW:
Write the "The Gathering" section of this story.
Instruction: Set the scene before the honouree arrived. Describe the location, the atmosphere,
who was there and the feeling of anticipation. Use the location and guest list provided.
Write in present or past tense, grounded in the specific details given.
Word limit: 80 words MAXIMUM. Do not exceed this.
Output: prose only — no heading, no label, no explanation.
```

---

### Caption Prompt (per photo)

A separate lightweight call before story generation. One sentence only.

```
System: You are a photo description assistant. Describe images clearly and concisely.

User: Describe what you see in this photo in ONE sentence (20 words maximum).
Focus on: people present, their expressions or actions, the setting, and the mood.
Do not start with "The image shows" or "In this photo". Just describe it directly.
```

---

## ⚙️ Gemini API Configuration

| Setting | Value | Reason |
|---|---|---|
| Model | `gemini-1.5-flash` | Fast, cheap, sufficient for slot-filling prose |
| Temperature | `0.7` | Warm but consistent. Never above 0.9 (unpredictable), never below 0.5 (flat) |
| Max output tokens (sections) | `ceil(maxWords × 1.5) + 20` | Covers word limit with breathing room |
| Max output tokens (captions) | `60` | One sentence — 60 is generous ceiling |
| Caption temperature | `0.3` | Factual, not creative |
| Retry on failure | Once, after 2 second delay | Transient API errors |
| Fallback on second failure | Return empty prose, mark section `needs_regeneration` | Never block the whole story |

---

## 📸 Photo Handling

### Client-Side Compression (before upload)

All photos are compressed in the browser before being sent to the API. No server-side compression needed.

**Compression settings:**

| Setting | Value |
|---|---|
| Max file size | 1.5MB |
| Max dimension (longest side) | 1200px |
| Output format | JPEG |
| Quality | 0.82 |
| Method | HTML Canvas API (no external libraries) |

**Compression flow:**

```
User selects photos
  → Check file size
  → If over 1.5MB: draw to canvas at max 1200px, re-encode as JPEG 0.82
  → If under 1.5MB: convert to base64, pass through
  → Show size warning banner if any file was over 2MB before compression
  → Show "Compress for me" option if any file still over 2MB after compression
```

**Upload constraints:**

| Constraint | Value |
|---|---|
| Accepted formats | JPG, PNG, WEBP |
| Max per file (before compression) | No hard limit — compression handles it |
| Max per file (after compression, sent to API) | 2MB |
| Max photos per story | 20 |
| Min photos per story | 1 |

**Compression UI states:**

| State | Trigger | Message |
|---|---|---|
| Info banner | Always visible on photo screen | "Photos over 2MB will slow down your story. How to compress / Compress for me" |
| Size warning | Any file over 2MB selected | "One or more photos are over 2MB. Consider compressing them." |
| Compress for me | User clicks "Compress for me" link | Runs `compressPhotos()` on all oversized files, replaces them in the grid |

---

## 🔄 Full Generation Pipeline

```
User completes question flow + photo upload
          ↓
Client compresses photos (Canvas API)
          ↓
POST /api/stories/:id/generate
  { subTemplateId, answers, photos[] }
          ↓
  ┌── Auth check (Supabase session)
  ├── Story ownership check (RLS)
  └── Open SSE stream to client
          ↓
  STEP 1 — Caption all photos (parallel Gemini calls)
  For each photo:
    → Send photo base64 + caption prompt to Gemini Flash
    → Receive one-sentence caption
    → Collect all captions
  → Fire event: captions_done
          ↓
  STEP 2 — Build story context (answers + captions)
  Assemble Layer 2 once — reused for all section calls
          ↓
  STEP 3 — Generate sections (sequential, streaming)
  For each template section:
    → Build full 3-layer prompt
    → Call Gemini Flash with streaming
    → Stream chunks to client via SSE (section_chunk events)
    → On section complete: save to story_sections table
    → Fire event: section_done
          ↓
  All sections done
  → Update stories table: narrative = 'generated'
  → Fire event: done
          ↓
Client renders full story
```

---

## 📡 SSE Event Reference

The API route returns a Server-Sent Events stream. The frontend consumes this with `useStoryGeneration` hook.

| Event | Payload | When fired |
|---|---|---|
| `start` | `{ storyId, subTemplateId }` | Pipeline starts |
| `captions_done` | `{ count, successCount }` | All photos captioned |
| `section_start` | `{ sectionId, label }` | A section begins writing |
| `section_chunk` | `{ sectionId, chunk }` | A text chunk streams in |
| `section_done` | `{ sectionId, label, prose, hasError }` | Section complete |
| `section_error` | `{ sectionId, error }` | Section failed after retry |
| `done` | `{ totalSections, errors, durationMs, totalTokensUsed }` | All sections done |
| `fatal_error` | `{ error }` | Pipeline crashed entirely |

---

## 💾 Database — story_sections Table

Sections are saved to the database as each one completes (not all at the end).

```sql
CREATE TABLE story_sections (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id      UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  section_id    TEXT NOT NULL,       -- matches template section id
  user_input    TEXT,                -- raw user notes for this slot
  ai_output     TEXT,                -- AI-generated prose (original, never modified)
  edited_text   TEXT,                -- final text (user may edit after generation)
  order_index   INTEGER NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Unique constraint: one row per section per story
CREATE UNIQUE INDEX idx_sections_story_section
  ON story_sections(story_id, section_id);
```

**On save:**
- `ai_output` — always stores the original AI output, never overwritten
- `edited_text` — starts as a copy of `ai_output`, updated when user edits inline
- Upsert on `(story_id, section_id)` — safe to call multiple times (e.g. on regeneration)

---

## 🔁 Single Section Regeneration

Users can regenerate any individual section from the preview screen without affecting others.

**Endpoint:** `POST /api/stories/:id/generate/:sectionId`

**Flow:**
```
User clicks "Regenerate this section"
  → POST /api/stories/:storyId/generate/:sectionId
  → Fetch existing story context from DB (answers stored on story row)
  → Fetch existing captions from DB (stored on photo rows)
  → Build 3-layer prompt for that section only
  → Stream response via SSE
  → On complete: update story_sections row (ai_output + edited_text)
```

**Token cost per regeneration:** ~300–400 tokens. No photo captions re-run.

---

## 💰 Token Budget

| Step | API calls | Tokens per call | Total |
|---|---|---|---|
| Photo captions — 10 photos | 10 (parallel) | ~150 | ~1,500 |
| Story sections — 4 sections | 4 (sequential) | ~400 | ~1,600 |
| **Per full story** | **14** | — | **~3,100** |
| Single section regeneration | 1 | ~400 | ~400 |

**Gemini Flash free tier:** 1M tokens/day
**Stories per day on free tier:** ~320 (3,100 tokens each)
**Budget limit set in code:** 900,000 tokens/day (10% buffer before hard limit)

---

## 🚨 Error Handling

| Failure scenario | Behaviour |
|---|---|
| Caption call fails (one photo) | Skip that caption, continue without it. Log warning. |
| Caption call fails (all photos) | Continue with no photo context. Story still generates. |
| Section call fails (first attempt) | Retry once after 2 second delay |
| Section call fails (second attempt) | Return empty prose, mark section `needs_regeneration`. User sees "Regenerate" button for that section only. |
| All section calls fail | Return `fatal_error` SSE event. Show error screen with "Try again" button. |
| Network timeout | Treat as failure. Same retry logic applies. |
| Gemini rate limit (429) | Treat as failure. Retry after 5 seconds (not 2). |
| Invalid Gemini response (empty text) | Treat as failure. Same retry logic. |
| Story not found | 404 response before stream opens |
| Unauthorised user | 401 response before stream opens |
| Wrong user for this story | 403 response before stream opens |

---

## 🌐 Frontend — `useStoryGeneration` Hook

The React hook that drives Step 4 (Preview screen). Consumes the SSE stream and provides live state.

### State shape

```ts
state: 'idle' | 'captioning' | 'generating' | 'done' | 'error'
sections: LiveSection[]      // grows as sections complete
captionsReady: boolean
errorMessage: string | null
durationMs: number | null
```

### LiveSection shape

```ts
{
  sectionId: string
  label: string
  prose: string         // fills character by character as chunks arrive
  status: 'pending' | 'generating' | 'done' | 'error'
  error?: string
}
```

### Usage in Step 4

```tsx
const { state, sections, generate } = useStoryGeneration()

// Trigger on mount
useEffect(() => {
  generate(storyId, subTemplateId, answers, compressedPhotos)
}, [])

// Render
return (
  <div>
    {state === 'captioning' && <p>Reading your photos…</p>}
    {sections.map(section => (
      <div key={section.sectionId}>
        <SectionLabel>{section.label}</SectionLabel>
        {section.status === 'generating'
          ? <SkeletonLoader />
          : <Prose>{section.prose}</Prose>
        }
        {section.status === 'done' && (
          <RegenerateButton sectionId={section.sectionId} />
        )}
        {section.status === 'error' && (
          <ErrorState message={section.error} />
        )}
      </div>
    ))}
  </div>
)
```

---

## 🔑 Environment Variables

Add to `.env.local` (never commit this file):

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Add to Vercel project settings under Environment Variables (Production + Preview).

The API key is only used server-side (in the API route). It is never exposed to the client.

---

## ✅ Success Criteria

| Criteria | Definition of done |
|---|---|
| Story generates end-to-end | Full 4-section story produced from answers + photos |
| Sections stream to frontend | Each section appears as it is written, not all at once |
| Photos influence output | Photo descriptions visible in generated prose |
| AI stays in bounds | No invented names, places or events not in user's answers |
| Word limits respected | No section exceeds its defined max words |
| Partial failure handled | One failed section does not block others |
| Compression works | Photos over 2MB compressed client-side before upload |
| Regeneration works | Single section can be re-generated without affecting others |
| Token cost within budget | Full story under 3,500 tokens |
| Response time | Full story generated under 30 seconds |
| Auth enforced | Unauthenticated or wrong-user requests blocked at API level |

---

## 🚫 Out of Scope (Phase 3 Gemini Integration)

- Option A (photos direct to story generation) — deferred to paid tier
- Multi-language story generation — Phase 4
- Custom tone settings by user — Phase 4
- Story editing by AI after user edits — Phase 4
- Analytics on AI generation quality — Phase 4
- Caching generated stories — Phase 4

---

## 📋 Implementation Order

```
1. types.ts — define all shared types first
2. lib/templates/birthday.ts — all 3 template definitions
3. lib/photos/compress.ts — compression utility
4. lib/ai/promptBuilder.ts — 3-layer prompt assembler
5. lib/ai/generate.ts — Gemini API client + orchestrator
6. app/api/stories/[id]/generate/route.ts — SSE API route
7. app/api/stories/[id]/generate/[sectionId]/route.ts — single section regeneration
8. hooks/useStoryGeneration.ts — frontend hook
9. Wire hook into Step 4 (Preview) screen
10. Test full flow end-to-end
11. Add photo compression to Step 2 (Photo Upload) screen
```

---

## 📄 Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | May 2026 | Initial Gemini integration PRD — Birthday templates |

---

*End of Momentix Gemini Integration PRD*
*Version 1.0 · May 2026*
*Part of Phase 3: Story Creation Flow*
