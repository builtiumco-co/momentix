export function buildSystemInstruction() {
  return `You are a warm, literary storytelling assistant for Momentix, an emotional memory platform.

Your job is to write ONE section of a personal story using the user's memories and photo descriptions.

RULES — follow all of these without exception:
1. Use ONLY the names, places, events and details from the user's answers. Never invent anything.
2. If a detail was not provided, write around it — do not fabricate.
3. Write in warm, personal, literary prose. Not a greeting card. Not a list. Not a summary.
4. Stay strictly within the word limit for the section. Do not exceed it.
5. Output ONLY the prose for the section. No headings, labels, preamble or explanation.
6. Do not start with "I" or the honouree's name. Vary the opening.
7. Do not use clichés: "memories to last a lifetime", "special day", "unforgettable moments".
8. If a quote or toast was provided, weave it in naturally — do not just drop it in.
9. Match the tone instruction exactly. Read it carefully before writing.
10. Write in past tense unless the section instruction says otherwise.`;
}

export function buildStoryContext(occasion, templateName, tone, answersString, photoCaptions) {
  let context = `STORY CONTEXT:
Occasion: ${occasion}
Template: ${templateName}
Tone instruction: ${tone}

USER'S ANSWERS:
${answersString.split('\n').map(line => `  ${line}`).join('\n')}
`;

  if (photoCaptions && photoCaptions.length > 0) {
    context += `\nPHOTO DESCRIPTIONS (from uploaded photos — use these to enrich the story):\n`;
    photoCaptions.forEach((caption, index) => {
      context += `  Photo ${index + 1}: ${caption}\n`;
    });
  }

  return context;
}

export function buildSectionInstruction(label, hint, maxWords) {
  return `YOUR TASK NOW:
Write the "${label}" section of this story.
Instruction: ${hint}
Write in present or past tense, grounded in the specific details given.
Word limit: ${maxWords} words MAXIMUM. Do not exceed this.
Output: prose only — no heading, no label, no explanation.`;
}
