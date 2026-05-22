// src/lib/templates/generic.js
/**
 * Generic Question‑Flow Template Builder
 *
 * `createTemplate(meta, questions)` builds a full template object compatible with the
 * existing story‑creation flow. `questions` is an ordered array of objects that match
 * the shape required by the UI (id, label, aiHint, userPrompt, placeholder, maxWords, required).
 */
export function createTemplate(meta, questions) {
  return {
    ...meta,
    sections: questions.map((q) => ({
      id: q.id,
      label: q.label,
      aiHint: q.aiHint,
      userPrompt: q.userPrompt,
      placeholder: q.placeholder,
      maxWords: q.maxWords,
      required: q.required,
    })),
  };
}

/** Helper to quickly build a question descriptor */
export const qItem = (
  id,
  label,
  aiHint,
  userPrompt,
  placeholder,
  maxWords = 80,
  required = true
) => ({
  id,
  label,
  aiHint,
  userPrompt,
  placeholder,
  maxWords,
  required,
});
