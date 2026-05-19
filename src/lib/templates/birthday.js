export const birthdayWarm = {
  id: "birthday-warm",
  occasion: "Birthday",
  name: "Warm Celebration",
  description: "A heartfelt and personal birthday story.",
  thumbnail: "/templates/birthday-warm.png",
  colorScheme: "terracotta",
  fontPairing: "playfair-dmsans",
  layout: "centered-narrative",
  tone: "warm, celebratory, intimate",
  sections: [
    {
      id: "opening",
      label: "The Gathering",
      aiHint: "Set the scene. Describe the atmosphere, the people arriving, and the feeling in the air.",
      userPrompt: "Who was there? Where did it happen?",
      placeholder: "e.g. We gathered at the old oak tree park. Everyone from the office came...",
      maxWords: 80,
      required: true
    },
    {
      id: "highlight",
      label: "The Moment",
      aiHint: "Describe the highlight of the event. Build up to the surprise or the main toast.",
      userPrompt: "What was the highlight? What made it special?",
      placeholder: "e.g. When the cake came out, the lights went down and we sang...",
      maxWords: 100,
      required: true
    },
    {
      id: "people",
      label: "The People",
      aiHint: "Focus on the connections, words shared, and gestures that stood out.",
      userPrompt: "Who made this day? Any words or gestures that stood out?",
      placeholder: "e.g. Uncle Joe gave a speech that made everyone cry...",
      maxWords: 80,
      required: false
    },
    {
      id: "closing",
      label: "Looking Ahead",
      aiHint: "End on a hopeful, forward-looking note for the year ahead.",
      userPrompt: "What does this celebration mean for the future?",
      placeholder: "e.g. Here's to many more years of health and happiness.",
      maxWords: 60,
      required: true
    }
  ]
};

export const birthdayMilestone = {
  id: "birthday-milestone",
  occasion: "Birthday",
  name: "Milestone",
  description: "Elegant layout for big milestone birthdays.",
  thumbnail: "/templates/birthday-milestone.png",
  colorScheme: "ivory",
  fontPairing: "inter-dmsans",
  layout: "full-bleed",
  tone: "elegant, reflective, celebratory",
  sections: [
    {
      id: "reflection",
      label: "Reflection",
      aiHint: "Reflect on the journey so far. Set an elegant and thoughtful tone.",
      userPrompt: "What does this milestone mean to the birthday person?",
      placeholder: "e.g. Turning 50 feels like a new beginning rather than a midpoint...",
      maxWords: 80,
      required: true
    },
    {
      id: "journey",
      label: "The Journey",
      aiHint: "Describe the path they took to get here, acknowledging growth.",
      userPrompt: "What are some key memories from the past decade?",
      placeholder: "e.g. The past ten years have been filled with travel, career growth, and starting a family...",
      maxWords: 100,
      required: true
    },
    {
      id: "legacy",
      label: "The Legacy",
      aiHint: "Highlight the impact they have had on the people around them.",
      userPrompt: "How has the birthday person inspired others?",
      placeholder: "e.g. They have always been the rock of the family, always there to lend a hand...",
      maxWords: 80,
      required: false
    },
    {
      id: "toast",
      label: "The Toast",
      aiHint: "Conclude with a grand toast to the future.",
      userPrompt: "What is your wish for them going forward?",
      placeholder: "e.g. May the next chapter be the most beautiful one yet.",
      maxWords: 60,
      required: true
    }
  ]
};
