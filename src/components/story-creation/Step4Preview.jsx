import React, { useEffect } from 'react';
import { getTemplateById } from '../../lib/templates';
import { useStoryGeneration } from '../../hooks/useStoryGeneration';
import TemplateRenderer from '../story-templates/TemplateRenderer';
import Button from '../Button';
import { Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';
import './Step4Preview.css';

export default function Step4Preview({ story, onNext, setStory }) {
  const template = getTemplateById(story.template_id);
  const { state, sections, errorMessage, generate, regenerateSection } = useStoryGeneration();

  useEffect(() => {
    if (template) {
      generate(story, template);
    }
  }, []); // Run once on mount

  const handleRegenerate = async (sectionId) => {
    await regenerateSection(story, template, sectionId);
  };

  const updateStoryEditedText = (sectionId, newText) => {
    const newSections = story.story_sections?.map(s => 
      s.section_id === sectionId ? { ...s, edited_text: newText } : s
    );
    if (newSections) setStory({ ...story, story_sections: newSections });
  };

  if (state === 'error') {
    return (
      <div className="step-container fade-in" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <AlertTriangle size={48} color="red" style={{ marginBottom: 16 }} />
          <h3>Generation Failed</h3>
          <p>{errorMessage}</p>
          <Button variant="primary" onClick={() => generate(story, template)} style={{ marginTop: 24 }}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-container fade-in">
      <div className="step-left-col">
        <span className="step-badge">Step 4</span>
        <h2 className="step-title">Here's your story</h2>
        <p className="step-subtext">Read through it. Regenerate any section or edit directly.</p>

        {state === 'captioning' && (
          <div className="captioning-indicator" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)' }}>
            <Sparkles size={16} className="spin-slow" />
            <span>Reading your photos...</span>
          </div>
        )}

        <div className="narrative-editor">
          {sections.map(sec => {
            const isGenerating = sec.status === 'generating' || sec.status === 'pending';
            // If it's already in DB and not currently generating, use DB text to allow live edits
            const dbSec = story.story_sections?.find(s => s.section_id === sec.sectionId);
            const displayProse = (sec.status === 'done' && dbSec) ? (dbSec.edited_text || dbSec.ai_output) : sec.prose;

            return (
              <div key={sec.sectionId} className="narrative-section">
                <div className="ns-header">
                  <span className="ns-label">{sec.label}</span>
                  {sec.status === 'done' && (
                    <button className="regenerate-btn" onClick={() => handleRegenerate(sec.sectionId)}>
                      <RefreshCw size={12} /> Regenerate
                    </button>
                  )}
                </div>
                {isGenerating && sec.prose === '' ? (
                  <div className="shimmer-card" style={{ padding: 16 }}>
                    <div className="shimmer-line l1"></div>
                    <div className="shimmer-line l2"></div>
                    <div className="shimmer-line l3"></div>
                  </div>
                ) : (
                  <textarea 
                    className="ns-prose"
                    value={displayProse}
                    readOnly={isGenerating}
                    onChange={(e) => {
                      if (!isGenerating) {
                        updateStoryEditedText(sec.sectionId, e.target.value);
                      }
                    }}
                  />
                )}
                {sec.status === 'error' && (
                  <div style={{ color: 'red', fontSize: 12, marginTop: 8 }}>
                    Failed to generate. <button onClick={() => handleRegenerate(sec.sectionId)}>Retry</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="step-right-col preview-sticky">
        <p className="preview-label">Story preview</p>
        <div className="mini-preview-card">
          <div className="mini-render">
            <TemplateRenderer story={story} liveSections={sections} />
          </div>
        </div>
      </div>

      <div className="bottom-action-bar">
        <div className="action-bar-content">
          <Button variant="tertiary" onClick={() => window.history.back()}>← Back</Button>
          <Button variant="primary" onClick={onNext} disabled={state !== 'done'}>
            {state === 'done' ? 'Publish & share →' : 'Generating...'}
          </Button>
        </div>
      </div>
    </div>
  );
}
