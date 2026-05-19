export const babyFirstYear = {
  id: "baby-first-year",
  occasion: "Baby Milestone",
  name: "First Year",
  description: "A soft, pastel layout tracking the journey of year one.",
  thumbnail: "/templates/baby-firstyear.png",
  colorScheme: "blush",
  fontPairing: "playfair-dmsans",
  layout: "split-photo",
  tone: "soft, joyful, tender",
  sections: [
    {
      id: "arrival",
      label: "The Arrival",
      aiHint: "Describe the day they were born and the immediate joy.",
      userPrompt: "What was it like when they finally arrived?",
      placeholder: "e.g. They came two weeks early, surprising us all...",
      maxWords: 80,
      required: true
    },
    {
      id: "months",
      label: "Month by Month",
      aiHint: "Capture the rapid changes and little discoveries over the first few months.",
      userPrompt: "What were some funny or sweet moments as they grew?",
      placeholder: "e.g. Month three was the first real smile, month six was the first tooth...",
      maxWords: 100,
      required: true
    },
    {
      id: "milestones",
      label: "Milestones",
      aiHint: "Focus on the big moments: first steps, first words, or favorite toys.",
      userPrompt: "What are their favorite things or biggest achievements so far?",
      placeholder: "e.g. They learned to crawl backwards first...",
      maxWords: 80,
      required: false
    },
    {
      id: "year_one",
      label: "Year One",
      aiHint: "Conclude with a reflection on how fast the year went and hopes for the toddler years.",
      userPrompt: "How does it feel to hit one year?",
      placeholder: "e.g. It feels like just yesterday we brought them home.",
      maxWords: 60,
      required: true
    }
  ]
};

export const babyNewArrival = {
  id: "baby-new-arrival",
  occasion: "Baby Milestone",
  name: "New Arrival",
  description: "A quiet, tender narrative for welcoming a newborn.",
  thumbnail: "/templates/baby-newarrival.png",
  colorScheme: "ivory",
  fontPairing: "inter-dmsans",
  layout: "full-bleed",
  tone: "quiet, tender, emotional",
  sections: [
    {
      id: "wait",
      label: "The Wait",
      aiHint: "Describe the anticipation before the birth.",
      userPrompt: "What was it like waiting for them?",
      placeholder: "e.g. We spent months painting the nursery and dreaming...",
      maxWords: 80,
      required: true
    },
    {
      id: "day",
      label: "The Day",
      aiHint: "Tell the story of the birth day, focusing on the emotion of meeting them.",
      userPrompt: "How did the big day unfold?",
      placeholder: "e.g. It was a whirlwind of a day, but when they finally cried...",
      maxWords: 100,
      required: true
    },
    {
      id: "first_days",
      label: "First Days",
      aiHint: "Capture the quiet, sleepy, overwhelming magic of the first days home.",
      userPrompt: "What were the first few days home like?",
      placeholder: "e.g. We barely slept, but we couldn't stop staring at them...",
      maxWords: 80,
      required: false
    },
    {
      id: "new_world",
      label: "Our New World",
      aiHint: "Look forward to the life ahead as a new family.",
      userPrompt: "What does this new chapter mean to you?",
      placeholder: "e.g. Our hearts have doubled in size forever.",
      maxWords: 60,
      required: true
    }
  ]
};
