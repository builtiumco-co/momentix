import React from 'react';
import { useParams } from 'react-router-dom';

const StoryView = () => {
  const { shareId } = useParams();

  return (
    <div className="story-view-page">
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Momentix Story</h1>
        <p>Story ID: {shareId}</p>
        <p>This viewer is coming in Phase 2!</p>
      </div>
    </div>
  );
};

export default StoryView;
