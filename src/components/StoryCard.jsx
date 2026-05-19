import React from 'react';
import { Eye, Edit2, Share2, Trash2, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import './StoryCard.css';

const StoryCard = ({ story, onDelete }) => {
  const navigate = useNavigate();
  const thumbnail = story.story_photos?.[0]?.publicUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'; // fallback
  const date = new Date(story.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const photoCount = story.story_photos?.length || 0;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/story/${story.share_id}`);
    alert('Share link copied to clipboard!');
  };

  return (
    <Card className="story-card">
      <div className="story-card-thumbnail" style={{ backgroundImage: `url(${thumbnail})` }}>
        <div className="story-card-badges">
          <span className="badge occasion-badge">{story.occasion}</span>
          {story.status === 'draft' && <span className="badge draft-badge">Draft</span>}
        </div>
        <div className="story-card-overlay">
          <button className="overlay-btn" onClick={() => navigate(`/story/${story.share_id}`)}><Eye size={18} /> View</button>
          <button className="overlay-btn" onClick={() => navigate(`/edit/${story.id}`)}><Edit2 size={18} /> Edit</button>
        </div>
      </div>
      <div className="story-card-content">
        <h3>{story.title || 'Untitled Story'}</h3>
        <p className="story-excerpt">
          {story.ai_narrative?.excerpt || "Your beautiful story is ready to be shared with loved ones."}
        </p>
        <div className="story-card-meta">
          <span>{date}</span>
          <span>•</span>
          <span className="photo-count-meta" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ImageIcon size={14} /> {photoCount}</span>
          <span>•</span>
          <span>{story.view_count || 0} views</span>
        </div>
        <div className="story-card-actions">
          <button className="action-icon" title="Share" onClick={handleCopyLink}><Share2 size={18} /></button>
          <button className="action-icon danger" title="Delete" onClick={() => onDelete && onDelete(story.id)}><Trash2 size={18} /></button>
        </div>
      </div>
    </Card>
  );
};

export default StoryCard;
