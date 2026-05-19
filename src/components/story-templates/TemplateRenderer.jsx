import React from 'react';
import './TemplateRenderer.css';
import { getTemplateById } from '../../lib/templates';

export default function TemplateRenderer({ story }) {
  const template = getTemplateById(story?.template_id);
  if (!template) return <div>Template not found</div>;

  const sections = story.story_sections || [];
  const photos = story.story_photos || [];
  
  const renderPhotos = () => {
    if (photos.length === 0) return null;
    return (
      <div className="photo-strip">
        {photos.map(p => (
          <img key={p.id} src={p.publicUrl} alt={p.caption || 'Story moment'} />
        ))}
      </div>
    );
  };

  const renderSections = () => {
    return sections.map(sec => {
      const tSec = template.sections.find(t => t.id === sec.section_id);
      return (
        <div key={sec.id} className="rendered-section">
          <span className="section-label">{tSec?.label}</span>
          <p className="section-prose">{sec.edited_text || sec.ai_output || sec.user_input}</p>
        </div>
      );
    });
  };

  const Content = () => (
    <>
      <div className="hero-section">
        <span className="occasion-pill" style={{ color: `var(--accent)` }}>
          {template.occasion}
        </span>
        <h1 className="story-title" style={{ fontFamily: template.fontPairing.split('-')[0] === 'playfair' ? '"Playfair Display", serif' : '"Inter", sans-serif' }}>
          {story.title}
        </h1>
      </div>
      {template.layout !== 'split-photo' && renderPhotos()}
      <div className="narrative-content">
        {renderSections()}
      </div>
      <div className="story-footer">
        <div className="divider"></div>
        <p>Created with Momentix</p>
      </div>
    </>
  );

  return (
    <div className={`template-renderer layout-${template.layout} color-${template.colorScheme}`}>
      {template.layout === 'split-photo' ? (
        <div className="split-layout">
          <div className="split-left">
            {photos.map(p => <img key={p.id} src={p.publicUrl} alt={p.caption} />)}
          </div>
          <div className="split-right">
            <Content />
          </div>
        </div>
      ) : (
        <div className="standard-layout">
          <Content />
        </div>
      )}
    </div>
  );
}
