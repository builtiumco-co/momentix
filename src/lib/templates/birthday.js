export const birthdayWarm = {
  id: "birthday-warm",
  occasion: "Birthday",
  name: "Warm Celebration",
  description: "A heartfelt and personal birthday story.",
  thumbnail: "/templates/birthday-warm.png",
  colorScheme: "terracotta",
  fontPairing: "playfair-dmsans",
  layout: "centered-narrative",
  tone: "warm, celebratory, intimate, personal",
  sections: [
    {
      id: "gathering",
      label: "The Gathering",
      aiHint: "Set the scene before the honouree arrived. Location, atmosphere, guests, anticipation. Use location and guest list provided.",
      maxWords: 80,
      required: true
    },
    {
      id: "moment",
      label: "The Moment",
      aiHint: "Describe the emotional peak. The highlight moment the user described. Weave in any toast or speech if provided.",
      maxWords: 80,
      required: true
    },
    {
      id: "people",
      label: "The People",
      aiHint: "Honour the relationships in the room. Who was there and what their presence meant. Warmth and connection, not a roll call.",
      maxWords: 70,
      required: true
    },
    {
      id: "closing",
      label: "Looking Ahead",
      aiHint: "Warm reflective send-off. What made this birthday special. Reference the age. Slightly more lyrical.",
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
  tone: "reflective, dignified, legacy-focused",
  sections: [
    {
      id: "lookingBack",
      label: "Looking Back",
      aiHint: "Reflect on the journey to this age. What it means to have arrived at this milestone. Quiet, thoughtful, not sentimental.",
      maxWords: 80,
      required: true
    },
    {
      id: "whatTheyBuilt",
      label: "What They Built",
      aiHint: "What this person has built — relationships, character, presence. Use guest list and \"what made it special\" as context.",
      maxWords: 80,
      required: true
    },
    {
      id: "celebration",
      label: "The Celebration",
      aiHint: "The celebration itself — place, people, highlight. Anchor in specific details. Warmer and more present-tense.",
      maxWords: 75,
      required: true
    },
    {
      id: "legacy",
      label: "The Legacy",
      aiHint: "What this person leaves behind — influence, warmth, what they mean to everyone there. Last sentence should land. Echo words said if provided.",
      maxWords: 65,
      required: true
    }
  ]
};

export const birthdayKids = {
  id: "birthday-kids",
  occasion: "Birthday",
  name: "Kids Birthday",
  description: "Playful and joyous layout for children's birthdays.",
  thumbnail: "/templates/birthday-kids.png",
  colorScheme: "amber",
  fontPairing: "inter-dmsans",
  layout: "full-bleed",
  tone: "playful, joyful, light — the way a loving parent would remember the day",
  sections: [
    {
      id: "morning",
      label: "The Morning",
      aiHint: "The child's excitement before the party. Punchy, light, short sentences fine.",
      maxWords: 55,
      required: true
    },
    {
      id: "party",
      label: "The Party",
      aiHint: "The chaos and joy of the party — guests, games, atmosphere. Embrace the energy.",
      maxWords: 65,
      required: true
    },
    {
      id: "theCandles",
      label: "The Moment",
      aiHint: "Candles, wish, reaction. Use the highlight moment. Include words said if provided. Make the reader feel present.",
      maxWords: 60,
      required: true
    },
    {
      id: "growingUp",
      label: "Growing Up",
      aiHint: "2–3 sentences only. How fast they're growing. Reference age. Brief, precise, tender. No clichés.",
      maxWords: 40,
      required: true
    }
  ]
};
