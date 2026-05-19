export const weddingTraditional = {
  id: "wedding-traditional",
  occasion: "Wedding",
  name: "Traditional",
  description: "A classic and romantic wedding story.",
  thumbnail: "/templates/wedding-traditional.png",
  colorScheme: "blush",
  fontPairing: "playfair-dmsans",
  layout: "split-photo",
  tone: "romantic, timeless, emotional",
  sections: [
    {
      id: "morning",
      label: "The Day Begins",
      aiHint: "Set the scene of the morning. Describe the anticipation, the getting ready process, and the excitement.",
      userPrompt: "How did the morning start? Who was getting ready together?",
      placeholder: "e.g. The morning was filled with laughter as the bridesmaids got their hair done...",
      maxWords: 80,
      required: true
    },
    {
      id: "ceremony",
      label: "The Ceremony",
      aiHint: "Describe the ceremony, the exchange of vows, and the feeling of unity.",
      userPrompt: "What was the most emotional part of the ceremony?",
      placeholder: "e.g. When the doors opened, there wasn't a dry eye in the church...",
      maxWords: 120,
      required: true
    },
    {
      id: "celebration",
      label: "The Celebration",
      aiHint: "Capture the joy and energy of the reception, the first dance, and the speeches.",
      userPrompt: "Tell us about the reception. Any funny or touching moments?",
      placeholder: "e.g. The best man's speech had everyone roaring with laughter...",
      maxWords: 100,
      required: true
    },
    {
      id: "forever",
      label: "Forever",
      aiHint: "Conclude with a romantic and timeless wish for their future together.",
      userPrompt: "What is your wish for the couple?",
      placeholder: "e.g. Here's to a lifetime of love and joy.",
      maxWords: 60,
      required: true
    }
  ]
};

export const weddingModern = {
  id: "wedding-modern",
  occasion: "Wedding",
  name: "Modern Minimal",
  description: "A clean and editorial wedding narrative.",
  thumbnail: "/templates/wedding-modern.png",
  colorScheme: "slate",
  fontPairing: "inter-dmsans",
  layout: "split-photo",
  tone: "modern, clean, joyful",
  sections: [
    {
      id: "first_look",
      label: "First Look",
      aiHint: "Describe the first look or the moments before the ceremony. Keep it clean and focused on the emotion.",
      userPrompt: "What happened during the first look?",
      placeholder: "e.g. They met in the courtyard, and the moment they saw each other...",
      maxWords: 80,
      required: true
    },
    {
      id: "vows",
      label: "The Vows",
      aiHint: "Highlight the promises made and the intimacy of the ceremony.",
      userPrompt: "What stood out during the vows?",
      placeholder: "e.g. They wrote their own vows, mixing humor with deep promises...",
      maxWords: 100,
      required: true
    },
    {
      id: "party",
      label: "The Party",
      aiHint: "Capture the energy, the music, and the celebration.",
      userPrompt: "How was the party? Who dominated the dance floor?",
      placeholder: "e.g. The band kept everyone dancing until 2 AM...",
      maxWords: 100,
      required: false
    },
    {
      id: "whats_next",
      label: "What's Next",
      aiHint: "Look forward to their new life together with an uplifting closing.",
      userPrompt: "What does the future hold for them?",
      placeholder: "e.g. Now, they embark on their greatest adventure yet...",
      maxWords: 60,
      required: true
    }
  ]
};
