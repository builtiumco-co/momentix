const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

export async function generateStory({ occasion, recipientName, memories, photoCount }) {
  const memoriesText = memories.filter(Boolean).map((m, i) => `  ${i + 1}. ${m}`).join('\n')

  const prompt = `You are an expert emotional storyteller. Create a beautiful, heartfelt story for a ${occasion} experience.

Details:
- Occasion: ${occasion}
- Recipient: ${recipientName || 'someone special'}
- Number of photos: ${photoCount}
- Memories shared:
${memoriesText}

Respond with ONLY valid JSON in this exact structure:
{
  "title": "An evocative story title (max 8 words)",
  "narrative": {
    "opening": "A beautiful 2-3 sentence opening that sets the emotional scene.",
    "body": "The main narrative (3-4 paragraphs, each 2-3 sentences, separated by \\n\\n) weaving together the memories into a flowing story.",
    "closing": "A heartfelt 2-3 sentence closing that captures the essence of this relationship."
  },
  "photo_captions": ["Caption for photo 1", "Caption for photo 2"],
  "highlight_quote": "A single powerful quote from the narrative (max 20 words)",
  "tone_description": "One sentence describing the emotional tone."
}

Write ${photoCount} photo captions. Make it deeply personal, avoid clichés, and write with genuine warmth.`

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
      },
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || 'Gemini API request failed')
  }

  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('No content returned from Gemini')
  return JSON.parse(text)
}
