const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateSectionProse({ occasion, title, templateTone, sectionLabel, sectionHint, sectionMaxWords, userInput }) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  const prompt = `You are a warm, literary storytelling assistant for Momentix.

STORY CONTEXT:
- Occasion: ${occasion}
- Title: ${title}
- Template tone: ${templateTone}

YOUR TASK:
Write the "${sectionLabel}" section of this story.
Instruction: ${sectionHint}
Word limit: ${sectionMaxWords} words maximum.

USER'S NOTES FOR THIS SECTION:
${userInput || "Make it sound beautiful and authentic based on the occasion."}

Write only the prose for this section. No headings, no labels, no bullet points.
Be warm, personal, and specific. Use the user's details if provided. Ensure the output strictly respects the word limit.
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: Math.floor(sectionMaxWords * 1.5), // Rough estimation of words to tokens
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No output generated from Gemini.");
    }
    
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
}
