import React, { useState, useEffect } from 'react';
import { getTemplateById } from '../../lib/templates';
import { updateStory, upsertStorySections } from '../../lib/api';
import Button from '../Button';
import './Step3Memories.css';

const BIRTHDAY_QUESTIONS = [
  { id: 'q1', type: 'text', label: 'Who is this birthday for?', hint: 'Their name, and your relationship to them', placeholder: 'e.g. My mum, Ngozi or My friend Emeka', max: 80, required: true },
  { id: 'q2', type: 'number', label: 'How old are they turning?', hint: 'Just the number is fine', placeholder: 'e.g. 70', min: 1, max: 120, required: true },
  { id: 'q3', type: 'text', label: 'When did the celebration happen?', hint: 'A date or something like "last Saturday" works perfectly', placeholder: 'e.g. 10 May 2025 or last Saturday', max: 60, required: true },
  { id: 'q4', type: 'text', label: 'Where did it happen?', hint: 'Could be a place, a city, a home — whatever sets the scene', placeholder: 'e.g. our compound in Enugu, a restaurant in Lagos', max: 100, required: true },
  { id: 'q5', type: 'textarea', label: 'Who was there?', hint: 'A quick list — family, friends, the people who made it feel special', placeholder: 'e.g. close family, her church friends, the grandchildren', max: 200, required: true },
  { id: 'q6', type: 'textarea', label: 'What was the highlight moment?', hint: 'The one thing everyone will remember — a surprise, a speech, a dance, a reaction', placeholder: "e.g. when she walked in and didn't expect us", max: 300, required: true },
  { id: 'q7', type: 'textarea', label: 'What made this birthday special?', hint: 'In your own words — one or two sentences is enough. This is the heart of the story.', placeholder: "e.g. She had no idea we'd all come. Seeing her face when she walked in was worth everything.", max: 400, required: true },
  { id: 'q8', type: 'textarea', label: 'Any words said on the day?', hint: 'A toast, a prayer, a speech, something someone said that stuck. If you have it, the AI will weave it in.', placeholder: 'e.g. "Seventy years and she still makes every room feel like home."', max: 400, required: false },
];

export default function Step3Memories({ story, onNext, setStory }) {
  const template = getTemplateById(story.template_id);
  const [answers, setAnswers] = useState({});
  const [viewMode, setViewMode] = useState('questions'); // 'questions' | 'summary'
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (story.story_sections && story.story_sections.length > 0) {
      const firstInput = story.story_sections[0].user_input;
      if (firstInput && firstInput.includes('Who:')) {
        const lines = firstInput.split('\n');
        const loadedAnswers = {};
        lines.forEach(line => {
          if (line.startsWith('Who: ')) loadedAnswers.q1 = line.replace('Who: ', '');
          if (line.startsWith('Age: ')) loadedAnswers.q2 = line.replace('Age: ', '');
          if (line.startsWith('When: ')) loadedAnswers.q3 = line.replace('When: ', '');
          if (line.startsWith('Where: ')) loadedAnswers.q4 = line.replace('Where: ', '');
          if (line.startsWith('Guests: ')) loadedAnswers.q5 = line.replace('Guests: ', '');
          if (line.startsWith('Highlight: ')) loadedAnswers.q6 = line.replace('Highlight: ', '');
          if (line.startsWith('What made it special: ')) loadedAnswers.q7 = line.replace('What made it special: ', '');
          if (line.startsWith('Words said: ')) {
            const val = line.replace('Words said: ', '');
            loadedAnswers.q8 = val === 'none provided' ? '' : val;
          }
        });
        setAnswers(loadedAnswers);
      }
    }
  }, [story.story_sections]);

  const handleInputChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const isFormValid = () => {
    return BIRTHDAY_QUESTIONS.every(q => !q.required || (answers[q.id] && answers[q.id].toString().trim() !== ''));
  };

  const handleContinueToSummary = () => {
    if (isFormValid()) {
      setViewMode('summary');
      window.scrollTo(0, 0);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleContinue = async () => {
    setIsSaving(true);
    try {
      const compiled = `Who: ${answers.q1 || ''}\nAge: ${answers.q2 || ''}\nWhen: ${answers.q3 || ''}\nWhere: ${answers.q4 || ''}\nGuests: ${answers.q5 || ''}\nHighlight: ${answers.q6 || ''}\nWhat made it special: ${answers.q7 || ''}\nWords said: ${answers.q8 ? answers.q8 : 'none provided'}`;

      if (story.title === `My Birthday Story` || !story.title) {
          await updateStory(story.id, { title: `${answers.q1}'s ${answers.q2} Birthday` });
      }

      if (template) {
         const sections = template.sections.map((tSec, i) => {
            const existing = story.story_sections?.find(s => s.section_id === tSec.id);
            return {
              id: existing ? existing.id : undefined,
              section_id: tSec.id,
              user_input: compiled,
              order_index: i
            };
         });
         await upsertStorySections(story.id, sections);
      }

      onNext();
    } catch (e) {
      console.error(e);
      alert('Failed to save answers.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!template) return <div>Template not found.</div>;

  if (viewMode === 'summary') {
    return (
      <div className="step-container fade-in summary-view-container">
        <div className="summary-card">
          <h2 className="step-title" style={{textAlign: 'center', marginBottom: '8px'}}>Does this look right?</h2>
          <p className="step-subtext" style={{textAlign: 'center', marginBottom: '32px'}}>Review your answers before we move to photos. You can edit anything.</p>
          
          <div className="summary-list">
            {BIRTHDAY_QUESTIONS.map(q => (
              <div key={q.id} className="summary-row">
                <div className="summary-label">{q.label.split('?')[0]}</div>
                <div className="summary-value">{answers[q.id] || <span className="empty-val">Not added</span>}</div>
                <button className="tertiary-btn xsmall edit-val-btn" onClick={() => setViewMode('questions')}>Edit</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bottom-action-bar">
          <div className="action-bar-content">
            <Button variant="tertiary" onClick={() => setViewMode('questions')}>← Edit</Button>
            <Button variant="primary" onClick={handleContinue} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Add photos →'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-container fade-in">
      <div className="step-left-col sticky">
        <span className="step-badge">Step 2</span>
        <h2 className="step-title">The Basics</h2>
        <p className="step-subtext">Fill in these quick questions to give the AI everything it needs to write a beautiful story.</p>
      </div>

      <div className="step-right-col">
        <div className="questions-list">
          {BIRTHDAY_QUESTIONS.map((q, index) => (
            <div key={q.id} className="memory-section">
              <div className="section-header">
                <div className="section-number">{index + 1}</div>
                <h4>{q.label} {q.required && '*'}</h4>
              </div>
              <p className="section-helper">{q.hint}</p>
              {q.type === 'textarea' ? (
                <textarea 
                  value={answers[q.id] || ''}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  className="memory-textarea"
                  maxLength={q.max}
                />
              ) : (
                <input 
                  type={q.type}
                  value={answers[q.id] || ''}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  className="title-input"
                  maxLength={q.max}
                  min={q.min}
                  max={q.max}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-action-bar">
        <div className="action-bar-content">
          <Button variant="tertiary" onClick={() => window.history.back()}>← Back</Button>
          <Button 
            variant="primary" 
            onClick={handleContinueToSummary} 
            disabled={!isFormValid()}
          >
            Review answers →
          </Button>
        </div>
      </div>
    </div>
  );
}
