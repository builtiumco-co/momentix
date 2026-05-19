import React, { useState, useEffect } from 'react';
import { getTemplateById } from '../../lib/templates';
import { generateSectionProse } from '../../lib/ai/generate';
import { upsertStorySections } from '../../lib/api';
import TemplateRenderer from '../story-templates/TemplateRenderer';
import Button from '../Button';
import { Sparkles, RefreshCw } from 'lucide-react';
import './Step4Preview.css';

export default function Step4Preview({ story, onNext, setStory }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Writing your story...');
  const template = getTemplateById(story.template_id);

  useEffect(() => {
    generateAllUnfilled();
  }, []);

  const generateAllUnfilled = async () => {
    if (!story.story_sections) return;
    
    // Check if any sections lack ai_output
    const needsGeneration = story.story_sections.some(s => !s.ai_output);
    if (!needsGeneration) return;

    setIsGenerating(true);
    let updatedSections = [...story.story_sections];

    for (let i = 0; i < updatedSections.length; i++) {
      const sec = updatedSections[i];
      if (sec.ai_output) continue; // Already generated

      const tSec = template.sections.find(t => t.id === sec.section_id);
      if (!tSec) continue;

      try {
        setLoadingMsg(`Writing "${tSec.label}"...`);
        const prose = await generateSectionProse({
          occasion: story.occasion,
          title: story.title,
          templateTone: template.tone,
          sectionLabel: tSec.label,
          sectionHint: tSec.aiHint,
          sectionMaxWords: tSec.maxWords,
          userInput: sec.user_input
        });
        
        updatedSections[i] = { ...sec, ai_output: prose };
      } catch (e) {
        console.error('Generation failed for section', tSec.label, e);
        // Fallback gracefully
        updatedSections[i] = { ...sec, ai_output: `[Generated content for ${tSec.label} would go here. AI generation failed. Please try regenerating.]` };
      }
    }

    // Save to DB
    try {
      setLoadingMsg('Saving your story...');
      const saved = await upsertStorySections(story.id, updatedSections);
      setStory({ ...story, story_sections: saved });
    } catch (e) {
      console.error(e);
      alert('Failed to save generated story.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async (sectionId) => {
    setIsGenerating(true);
    try {
      const secIndex = story.story_sections.findIndex(s => s.section_id === sectionId);
      const sec = story.story_sections[secIndex];
      const tSec = template.sections.find(t => t.id === sectionId);
      
      setLoadingMsg(`Rewriting "${tSec.label}"...`);
      const prose = await generateSectionProse({
        occasion: story.occasion,
        title: story.title,
        templateTone: template.tone,
        sectionLabel: tSec.label,
        sectionHint: tSec.aiHint,
        sectionMaxWords: tSec.maxWords,
        userInput: sec.user_input
      });

      const updatedSections = [...story.story_sections];
      updatedSections[secIndex] = { ...sec, ai_output: prose };
      
      const saved = await upsertStorySections(story.id, updatedSections);
      setStory({ ...story, story_sections: saved });
    } catch (e) {
      console.error(e);
      alert('Failed to regenerate section.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="generating-state fade-in">
        <div className="shimmer-card">
          <div className="shimmer-line l1"></div>
          <div className="shimmer-line l2"></div>
          <div className="shimmer-line l3"></div>
          <div className="shimmer-line l1" style={{marginTop: '24px'}}></div>
          <div className="shimmer-line l2"></div>
        </div>
        <p className="loading-msg"><Sparkles size={16} /> {loadingMsg}</p>
      </div>
    );
  }

  return (
    <div className="step-container fade-in">
      <div className="step-left-col">
        <span className="step-badge">Step 4</span>
        <h2 className="step-title">Here's your story</h2>
        <p className="step-subtext">Read through it. Regenerate any section or edit directly.</p>

        <div className="narrative-editor">
          {story.story_sections?.map(sec => {
            const tSec = template.sections.find(t => t.id === sec.section_id);
            return (
              <div key={sec.id} className="narrative-section">
                <div className="ns-header">
                  <span className="ns-label">{tSec?.label}</span>
                  <button className="regenerate-btn" onClick={() => handleRegenerate(sec.section_id)}>
                    <RefreshCw size={12} /> Regenerate
                  </button>
                </div>
                <textarea 
                  className="ns-prose"
                  value={sec.edited_text || sec.ai_output || ''}
                  onChange={(e) => {
                    const newSections = story.story_sections.map(s => s.id === sec.id ? { ...s, edited_text: e.target.value } : s);
                    setStory({ ...story, story_sections: newSections });
                    // Auto-saving could be debounced here
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="step-right-col preview-sticky">
        <p className="preview-label">Story preview</p>
        <div className="mini-preview-card">
          {/* A miniature rendering using CSS scale */}
          <div className="mini-render">
            <TemplateRenderer story={story} />
          </div>
        </div>
      </div>

      <div className="bottom-action-bar">
        <div className="action-bar-content">
          <Button variant="tertiary" onClick={() => window.history.back()}>← Back</Button>
          <Button variant="primary" onClick={onNext}>
            Publish & share →
          </Button>
        </div>
      </div>
    </div>
  );
}
