export const graduationJourney = {
  id: "graduation-journey",
  occasion: "Graduation",
  name: "Journey Reflection",
  description: "A reflective look back at the path to graduation.",
  thumbnail: "/templates/graduation-journey.png",
  colorScheme: "sage",
  fontPairing: "playfair-dmsans",
  layout: "centered-narrative",
  tone: "reflective, proud, hopeful",
  sections: [
    {
      id: "beginning",
      label: "Where It Started",
      aiHint: "Look back at the beginning of this educational journey. Describe the early days.",
      userPrompt: "Think back to day one. What was the feeling?",
      placeholder: "e.g. Moving into the dorms felt like stepping onto another planet...",
      maxWords: 80,
      required: true
    },
    {
      id: "grind",
      label: "The Grind",
      aiHint: "Describe the hard work, late nights, and challenges overcome.",
      userPrompt: "What were the toughest moments or biggest late-night grinds?",
      placeholder: "e.g. Those midnight study sessions in the library fueled by coffee...",
      maxWords: 100,
      required: true
    },
    {
      id: "moment",
      label: "The Moment",
      aiHint: "Capture the pride and emotion of walking across the stage.",
      userPrompt: "How did it feel to finally graduate?",
      placeholder: "e.g. Hearing the name called out, the cheer from the crowd...",
      maxWords: 80,
      required: true
    },
    {
      id: "future",
      label: "What's Next",
      aiHint: "End with an inspiring look forward to their career and future.",
      userPrompt: "What are the exciting plans for the future?",
      placeholder: "e.g. Now, heading off to the city to start a new career...",
      maxWords: 60,
      required: true
    }
  ]
};

export const graduationFirstGen = {
  id: "graduation-firstgen",
  occasion: "Graduation",
  name: "First Generation",
  description: "A bold and proud story honoring family sacrifice.",
  thumbnail: "/templates/graduation-firstgen.png",
  colorScheme: "ivory",
  fontPairing: "inter-dmsans",
  layout: "full-bleed",
  tone: "proud, honoring, bold",
  sections: [
    {
      id: "dream",
      label: "The Dream",
      aiHint: "Describe the dream that started it all, honoring the family's roots.",
      userPrompt: "What did this degree mean to the family?",
      placeholder: "e.g. This was a dream that started generations ago...",
      maxWords: 80,
      required: true
    },
    {
      id: "sacrifice",
      label: "The Sacrifice",
      aiHint: "Acknowledge the hard work and sacrifice that made this possible.",
      userPrompt: "Who helped make this possible?",
      placeholder: "e.g. Mom worked two jobs just to make sure tuition was paid...",
      maxWords: 100,
      required: true
    },
    {
      id: "achievement",
      label: "The Achievement",
      aiHint: "Capture the pure triumph of the graduation day.",
      userPrompt: "What was the feeling on graduation day?",
      placeholder: "e.g. Holding the diploma felt like lifting a trophy for the whole family...",
      maxWords: 80,
      required: true
    },
    {
      id: "promise",
      label: "The Promise",
      aiHint: "Conclude with a promise to the future and honoring the legacy.",
      userPrompt: "What is the promise for the future?",
      placeholder: "e.g. This is just the beginning of opening doors for others...",
      maxWords: 60,
      required: true
    }
  ]
};
