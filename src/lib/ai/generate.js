import { buildSystemInstruction, buildStoryContext, buildSectionInstruction } from './promptBuilder';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function captionPhotoBase64(base64Data, mimeType) {
  if (!GEMINI_API_KEY) throw new Error("Gemini API key is missing.");

  const prompt = `Describe what you see in this photo in ONE sentence (20 words maximum).
Focus on: people present, their expressions or actions, the setting, and the mood.
Do not start with "The image shows" or "In this photo". Just describe it directly.`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: "You are a photo description assistant. Describe images clearly and concisely." }] },
      contents: [{
        parts: [
          { text: prompt },
          { inlineData: { data: base64Data.split(',')[1], mimeType } }
        ]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 60,
      }
    })
  });

  if (!response.ok) {
    throw new Error('Captioning failed');
  }

  const data = await response.json();
  if (!data.candidates || data.candidates.length === 0) {
    return '';
  }
  
  return data.candidates[0].content.parts[0].text.trim();
}

export async function generateSectionProseStream({ occasion, templateName, templateTone, sectionLabel, sectionHint, sectionMaxWords, userInput, photoCaptions }, onChunk) {
  if (!GEMINI_API_KEY) throw new Error("Gemini API key is missing.");

  const systemInstruction = buildSystemInstruction();
  const storyContext = buildStoryContext(occasion, templateName, templateTone, userInput, photoCaptions);
  const sectionInstruction = buildSectionInstruction(sectionLabel, sectionHint, sectionMaxWords);

  const prompt = `${storyContext}\n\n${sectionInstruction}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: Math.ceil(sectionMaxWords * 1.5) + 20,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Gemini API Error: ${errorData.error?.message || response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const dataStr = line.replace('data: ', '').trim();
        if (dataStr === '[DONE]') continue;
        
        try {
          const data = JSON.parse(dataStr);
          if (data.candidates && data.candidates[0].content) {
            const textPart = data.candidates[0].content.parts[0].text;
            if (textPart) {
              fullText += textPart;
              if (onChunk) onChunk(textPart);
            }
          }
        } catch (e) {
          // ignore incomplete json chunks, streamGenerateContent with alt=sse sends complete JSON objects per chunk usually, 
          // but just in case.
        }
      }
    }
  }

  return fullText.trim();
}

// Fallback for non-streaming
export async function generateSectionProse(params) {
  let fullText = "";
  await generateSectionProseStream(params, (chunk) => {
    fullText += chunk;
  });
  return fullText.trim();
}
