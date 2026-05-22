import { useState, useCallback } from 'react';
import { captionPhotoBase64, generateSectionProseStream } from '../lib/ai/generate';
import { upsertStorySections } from '../lib/api';

// Helper to convert an image URL to base64
async function urlToBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve({ data: reader.result, mimeType: blob.type });
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function useStoryGeneration() {
  const [state, setState] = useState('idle'); // 'idle' | 'captioning' | 'generating' | 'done' | 'error'
  const [sections, setSections] = useState([]);
  const [captionsReady, setCaptionsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [durationMs, setDurationMs] = useState(null);

  const generate = useCallback(async (story, template) => {
    setState('captioning');
    setErrorMessage(null);
    const startTime = Date.now();
    
    try {
      // Initialize sections
      const initialSections = template.sections.map(tSec => ({
        sectionId: tSec.id,
        label: tSec.label,
        prose: '',
        status: 'pending'
      }));
      setSections(initialSections);

      // STEP 1 - Caption photos
      let photoCaptions = [];
      const photos = story.story_photos || [];
      
      if (photos.length > 0) {
        const captionPromises = photos.map(async (photo) => {
          if (photo.caption) return photo.caption; // Use user caption if exists
          try {
            const { data, mimeType } = await urlToBase64(photo.publicUrl);
            return await captionPhotoBase64(data, mimeType);
          } catch (e) {
            console.error('Failed to caption photo', e);
            return null; // Gracefully fail single caption
          }
        });
        
        const results = await Promise.all(captionPromises);
        photoCaptions = results.filter(Boolean);
      }
      setCaptionsReady(true);
      setState('generating');

      // STEP 2 & 3 - Generate sections sequentially with streaming
      const updatedStorySections = [...(story.story_sections || [])];
      
      for (const tSec of template.sections) {
        setSections(prev => prev.map(s => s.sectionId === tSec.id ? { ...s, status: 'generating' } : s));
        
        let attempts = 0;
        let success = false;
        let generatedProse = '';

        while (attempts < 2 && !success) {
          attempts++;
          try {
            const existingSec = updatedStorySections?.find(s => s.section_id === tSec.id);
            const userInput = existingSec?.user_input || '';

            if (existingSec && existingSec.ai_output) {
              setSections(prev => prev.map(s => s.sectionId === tSec.id ? { ...s, status: 'done', prose: existingSec.edited_text || existingSec.ai_output } : s));
              success = true;
              generatedProse = existingSec.ai_output;
              continue;
            }

            generatedProse = await generateSectionProseStream({
              occasion: story.occasion,
              templateName: template.name,
              templateTone: template.tone,
              sectionLabel: tSec.label,
              sectionHint: tSec.aiHint,
              sectionMaxWords: tSec.maxWords,
              userInput: userInput,
              photoCaptions

            }, (chunk) => {
              setSections(prev => prev.map(s => s.sectionId === tSec.id ? { ...s, prose: s.prose + chunk } : s));
            });
            success = true;
          } catch (e) {
            console.error(`Attempt ${attempts} failed for ${tSec.id}:`, e);
            if (attempts === 1) {
              await new Promise(r => setTimeout(r, 2000)); // wait 2s before retry
            }
          }
        }

        if (success) {
          setSections(prev => prev.map(s => s.sectionId === tSec.id ? { ...s, status: 'done', prose: generatedProse } : s));
          
          // Save to DB
          const secIndex = updatedStorySections.findIndex(s => s.section_id === tSec.id);
          if (secIndex >= 0) {
            updatedStorySections[secIndex].ai_output = generatedProse;
            updatedStorySections[secIndex].edited_text = generatedProse;
          } else {
            updatedStorySections.push({
              section_id: tSec.id,
              user_input: '',
              ai_output: generatedProse,
              edited_text: generatedProse,
              order_index: template.sections.indexOf(tSec)
            });
          }
          await upsertStorySections(story.id, updatedStorySections);
        } else {
          setSections(prev => prev.map(s => s.sectionId === tSec.id ? { ...s, status: 'error', error: 'Failed to generate' } : s));
        }
      }

      setState('done');
      setDurationMs(Date.now() - startTime);

    } catch (e) {
      console.error('Fatal generation error', e);
      setState('error');
      setErrorMessage(e.message || 'An unexpected error occurred.');
    }
  }, []);

  const regenerateSection = useCallback(async (story, template, sectionId, photoCaptions = []) => {
    const tSec = template.sections.find(t => t.id === sectionId);
    if (!tSec) return;

    setSections(prev => prev.map(s => s.sectionId === sectionId ? { ...s, status: 'generating', prose: '' } : s));
    
    try {
      const existingSec = story.story_sections?.find(s => s.section_id === sectionId);
      const userInput = existingSec?.user_input || '';

      const generatedProse = await generateSectionProseStream({
        occasion: story.occasion,
        templateName: template.name,
        templateTone: template.tone,
        sectionLabel: tSec.label,
        sectionHint: tSec.aiHint,
        sectionMaxWords: tSec.maxWords,
        userInput: userInput,
        photoCaptions
      }, (chunk) => {
        setSections(prev => prev.map(s => s.sectionId === sectionId ? { ...s, prose: s.prose + chunk } : s));
      });

      setSections(prev => prev.map(s => s.sectionId === sectionId ? { ...s, status: 'done', prose: generatedProse } : s));
      
      // Update DB
      if (existingSec) {
        existingSec.ai_output = generatedProse;
        existingSec.edited_text = generatedProse;
        await upsertStorySections(story.id, [existingSec]);
      }
    } catch (e) {
      setSections(prev => prev.map(s => s.sectionId === sectionId ? { ...s, status: 'error', error: 'Failed to regenerate' } : s));
    }
  }, []);

  return { state, sections, captionsReady, errorMessage, durationMs, generate, regenerateSection };
}
