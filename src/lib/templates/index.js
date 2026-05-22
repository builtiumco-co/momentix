import { birthdayWarm, birthdayMilestone } from './birthday';

export const templates = [
  birthdayWarm,
  birthdayMilestone,
];

export const getTemplateById = (id) => templates.find(t => t.id === id);

export const getTemplatesByOccasion = (occasion) => {
  if (occasion === 'All occasions' || occasion === 'Birthday') return templates;
  return templates.filter(t => t.occasion === occasion);
};
