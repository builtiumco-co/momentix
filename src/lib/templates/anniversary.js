export const anniversaryLoveLetter = {
  id: "anniversary-love-letter",
  occasion: "Anniversary",
  name: "Love Letter",
  description: "An intimate, warm template perfect for deep reflections.",
  thumbnail: "/templates/anniversary-loveletter.png",
  colorScheme: "terracotta",
  fontPairing: "playfair-dmsans",
  layout: "centered-narrative",
  tone: "intimate, warm, enduring",
  sections: [
    {
      id: "meeting",
      label: "How We Met",
      aiHint: "Look back at the beginning of the relationship. Capture the spark.",
      userPrompt: "How did you first meet or realize they were the one?",
      placeholder: "e.g. We met at that coffee shop in the rain, and we talked for hours...",
      maxWords: 80,
      required: true
    },
    {
      id: "built",
      label: "What We've Built",
      aiHint: "Summarize the life and memories created together over the years.",
      userPrompt: "What are you most proud of building together?",
      placeholder: "e.g. We bought our first home, adopted two dogs, and traveled...",
      maxWords: 100,
      required: true
    },
    {
      id: "hard_parts",
      label: "The Hard Parts",
      aiHint: "Acknowledge that love takes work, and how challenges made the bond stronger.",
      userPrompt: "How have you grown stronger through challenges?",
      placeholder: "e.g. Even during the tough years, we never stopped laughing...",
      maxWords: 80,
      required: false
    },
    {
      id: "choosing",
      label: "Still Choosing You",
      aiHint: "End with a powerful declaration of enduring love for the future.",
      userPrompt: "What is your promise for the years ahead?",
      placeholder: "e.g. I would choose you all over again, every single time.",
      maxWords: 60,
      required: true
    }
  ]
};
