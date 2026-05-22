import { getTemplatesByOccasion, getTemplateById, templates } from './index.js';

console.log('All templates count:', templates.length);
console.log('All occasions:', getTemplatesByOccasion('All occasions').map(t=>t.id));
console.log('Birthday occasion:', getTemplatesByOccasion('Birthday').map(t=>t.id));
console.log('Non‑birthday occasion (Wedding):', getTemplatesByOccasion('Wedding').map(t=>t.id));
