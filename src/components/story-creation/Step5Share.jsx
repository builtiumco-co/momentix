import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Copy, Check } from 'lucide-react';
import Button from '../Button';
import { createShareToken, updateStory } from '../../lib/api';
import './Step5Share.css';

export default function Step5Share({ story }) {
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [published, setPublished] = useState(story.published || false);
  const navigate = useNavigate();

  useEffect(() => {
    async function initShare() {
      try {
        const token = await createShareToken(story.id);
        setShareUrl(`${window.location.origin}/share/${token}`);
      } catch (e) {
        console.error(e);
      }
    }
    initShare();
  }, [story.id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePublishToggle = async () => {
    try {
      const newStatus = !published;
      await updateStory(story.id, { published: newStatus, status: newStatus ? 'published' : 'draft' });
      setPublished(newStatus);
    } catch (e) {
      console.error(e);
      alert('Failed to update publish status.');
    }
  };

  return (
    <div className="share-step fade-in">
      <div className="share-panel">
        <CheckCircle size={48} className="success-icon" />
        <h2>Your story is ready</h2>
        <p className="subtext">You can now share this beautiful memory with the world.</p>

        <div className="link-row">
          <input type="text" readOnly value={shareUrl} className="share-input" />
          <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
            {copied ? <Check size={16} /> : <Copy size={16} />} 
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>

        <div className="publish-toggle-row">
          <div>
            <span className="toggle-label">Published</span>
            <span className="toggle-subtext">Anyone with the link can view</span>
          </div>
          <label className="switch">
            <input type="checkbox" checked={published} onChange={handlePublishToggle} />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="action-buttons">
          <Button variant="secondary" onClick={() => window.open(shareUrl, '_blank')}>
            View story
          </Button>
          <Button variant="tertiary" onClick={() => navigate('/dashboard')}>
            Back to dashboard
          </Button>
        </div>
      </div>

      <div className="hint-card">
        <h4>Share it with someone you love</h4>
        <p>Send the link, post it on WhatsApp, or print it out.</p>
      </div>
    </div>
  );
}
