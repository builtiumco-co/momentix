import { birthdayWarm, birthdayMilestone } from './birthday';
import { weddingTraditional, weddingModern } from './wedding';
import { graduationJourney, graduationFirstGen } from './graduation';
import { babyFirstYear, babyNewArrival } from './baby';
import { anniversaryLoveLetter } from './anniversary';

export const templates = [
  birthdayWarm,
  birthdayMilestone,
  weddingTraditional,
  weddingModern,
  graduationJourney,
  graduationFirstGen,
  babyFirstYear,
  babyNewArrival,
  anniversaryLoveLetter
];

export const getTemplateById = (id) => {
  return templates.find(t => t.id === id);
};

export const getTemplatesByOccasion = (occasion) => {
  if (occasion === 'All occasions') return templates;
  return templates.filter(t => t.occasion === occasion);
};
