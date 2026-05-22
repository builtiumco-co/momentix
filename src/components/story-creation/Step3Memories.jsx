import React, { useState, useEffect } from 'react';
import { getTemplateById } from '../../lib/templates';
import { updateStory, upsertStorySections } from '../../lib/api';
import Button from '../Button';
import './Step3Memories.css';


export default function Step3Memories({ story, onNext, setStory }) {
  const template = getTemplateById(story.template_id);
  const [title, setTitle] = useState(story.title || '');
  const [sections, setSections] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (template) {
      const initialSections = template.sections.map((tSec, i) => {
        const existing = story.story_sections?.find(s => s.section_id === tSec.id);
        return {
          section_id: tSec.id,
          user_input: existing ? existing.user_input : '',
          order_index: i
        };
      });
      setSections(initialSections);
    }
  }, [template, story.story_sections]);

  const handleInputChange = (sectionId, value) => {
    setSections(prev => prev.map(s => s.section_id === sectionId ? { ...s, user_input: value } : s));
  };

  const handleContinue = async () => {
    setIsSaving(true);
    try {
      if (title !== story.title) {
        await updateStory(story.id, { title });
      }
      await upsertStorySections(story.id, sections);
      onNext();
    } catch (e) {
      console.error(e);
      alert('Failed to save memories.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!template) return <div>Template not found.</div>;

  return (
    <div className="step-container fade-in">
      <div className="step-left-col sticky">
        <span className="step-badge">Step 2</span>
        <h2 className="step-title">Your memories</h2>
        <p className="step-subtext">Write as much or as little as you like. The AI will fill in the rest.</p>
        
        <div className="template-info-card">
          <div className="template-info-thumb" style={{ backgroundColor: getTemplateColor(template.colorScheme) }}>
            <span>{template.name}</span>
          </div>
          <div className="template-info-text">
            <h4>{template.name}</h4>
            <button className="tertiary-btn xsmall">Change template</button>
          </div>
        </div>
      </div>

      <div className="step-right-col">
        <div className="form-group">
          <label>Story title *</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. Nne's 70th Birthday"
            className="title-input"
          />
        </div>

        <div className="memory-sections">
          {template.sections.map((sec, index) => {
            const sectionData = sections.find(s => s.section_id === sec.id) || {};
            return (
              <div key={sec.id} className="memory-section">
                <div className="section-header">
                  <div className="section-number">{index + 1}</div>
                  <h4>{sec.userPrompt}</h4>
                </div>
                <p className="section-helper">{sec.placeholder}</p>
                <textarea 
                  value={sectionData.user_input || ''}
                  onChange={(e) => handleInputChange(sec.id, e.target.value)}
                  placeholder="Type your notes here..."
                  className="memory-textarea"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="bottom-action-bar">
        <div className="action-bar-content">
          <Button variant="tertiary" onClick={() => window.history.back()}>← Back</Button>
          <Button 
            variant="primary" 
            onClick={handleContinue} 
            disabled={isSaving || !title.trim()}
          >
            {isSaving ? 'Saving...' : 'Continue to photos →'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function getTemplateColor(scheme) {
  const colors = { terracotta: '#FAF0EB', blush: '#FDF0F3', sage: '#EFF5EE', ivory: '#FAF8F2', slate: '#F0F2F5' };
  return colors[scheme] || '#F0F2F5';
}
