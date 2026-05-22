import { birthdayWarm, birthdayMilestone, birthdayKids } from './birthday';

export const templates = [
  birthdayWarm,
  birthdayMilestone,
  birthdayKids,
];

export const getTemplateById = (id) => templates.find(t => t.id === id);

export const getTemplatesByOccasion = (occasion) => {
  if (occasion === 'All occasions' || occasion === 'Birthday') return templates;
  return templates.filter(t => t.occasion === occasion);
};
