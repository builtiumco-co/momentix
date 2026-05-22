import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getTemplatesByOccasion } from '../lib/templates';
import { createStoryDraft } from '../lib/api';
import TemplateCard from '../components/story-creation/TemplateCard';
import Button from '../components/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './CreateStory.css';

const occasions = ['All occasions', 'Birthday', 'Wedding', 'Graduation', 'Baby Milestone', 'Anniversary'];

export default function CreateStory() {
  const [filter, setFilter] = useState('All occasions');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="page-loading"><div className="spinner" /></div>;

  useEffect(() => {
    setTemplates(getTemplatesByOccasion(filter));
    setSelectedTemplate(null);
  }, [filter]);

  const handleUseTemplate = async () => {
    if (!selectedTemplate || !user) return;
    setIsCreating(true);
    try {
      const defaultTitle = `My ${selectedTemplate.occasion} Story`;
      const draft = await createStoryDraft(
        user.id,
        defaultTitle,
        selectedTemplate.occasion,
        selectedTemplate.id
      );
      navigate(`/stories/${draft.id}/edit?step=2`);
    } catch (error) {
      console.error('Error creating draft:', error);
      alert('Failed to start story. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="template-picker-page fade-in">
      <header className="picker-topbar">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={16} /> Dashboard
        </button>
        <h2 className="topbar-title">Choose a template</h2>
        <div className="spacer" />
      </header>

      <main className="picker-main">
        <div className="picker-header">
          <h1>Pick a template</h1>
          <p>Choose the style that fits your story. You can adjust everything later.</p>
        </div>

        <div className="occasion-tabs">
          {occasions.map((occ) => (
            <button
              key={occ}
              className={`tab-pill ${filter === occ ? 'active' : ''}`}
              onClick={() => setFilter(occ)}
            >
              {occ}
            </button>
          ))}
        </div>

        <div className="template-grid">
          {templates.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              isSelected={selectedTemplate?.id === tpl.id}
              onClick={setSelectedTemplate}
            />
          ))}
        </div>
      </main>

      <div className={`bottom-action-bar ${selectedTemplate ? 'visible' : ''}`}>
        <div className="action-bar-content">
          {selectedTemplate && (
            <div className="selected-info">
              <span className="occasion-badge">{selectedTemplate.occasion}</span>
              <span className="selected-name">{selectedTemplate.name}</span>
            </div>
          )}
          <Button
            variant="primary"
            onClick={handleUseTemplate}
            disabled={isCreating}
            className="use-template-btn"
          >
            {isCreating ? 'Creating...' : 'Use this template'} <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
