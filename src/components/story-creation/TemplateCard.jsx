import React from 'react';
import { Check } from 'lucide-react';
import './TemplateCard.css';

export default function TemplateCard({ template, isSelected, onClick, size = 'gallery' }) {
  return (
    <div 
      className={`template-card ${size} ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(template)}
    >
      <div className="template-card-inner">
        {/* Mocking the thumbnail purely with CSS blocks for now since we don't have actual images */}
        <div className="template-thumbnail" style={{ backgroundColor: getTemplateColor(template.colorScheme) }}>
          <div className="template-mock-content">
            <span style={{ fontFamily: template.fontPairing.split('-')[0] === 'playfair' ? '"Playfair Display", serif' : '"Inter", sans-serif' }}>
              {template.name}
            </span>
          </div>
        </div>
        
        {isSelected && (
          <div className="selected-indicator fade-in">
            <Check size={14} strokeWidth={3} />
          </div>
        )}

        <div className="template-body">
          <span className="occasion-badge">{template.occasion}</span>
          <h4 className="template-name">{template.name}</h4>
          <p className="template-desc">{template.description}</p>
        </div>
      </div>
    </div>
  );
}

function getTemplateColor(scheme) {
  const colors = {
    terracotta: '#FAF0EB',
    blush: '#FDF0F3',
    sage: '#EFF5EE',
    ivory: '#FAF8F2',
    slate: '#F0F2F5'
  };
  return colors[scheme] || '#F0F2F5';
}
