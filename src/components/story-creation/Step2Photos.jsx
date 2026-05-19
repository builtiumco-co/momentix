import React, { useState } from 'react';
import { UploadCloud, X, Grid } from 'lucide-react';
import Button from '../Button';
import { uploadStoryPhotos, deletePhoto } from '../../lib/api';
import './Step2Photos.css';

export default function Step2Photos({ story, onNext, setStory }) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const photos = story.story_photos || [];

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const newPhotos = await uploadStoryPhotos(story.id, files);
      setStory({ ...story, story_photos: [...photos, ...newPhotos] });
    } catch (e) {
      console.error(e);
      alert('Failed to upload photos.');
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (photo) => {
    try {
      await deletePhoto(photo.id, photo.storage_path);
      setStory({
        ...story,
        story_photos: photos.filter(p => p.id !== photo.id)
      });
    } catch (e) {
      console.error(e);
      alert('Failed to delete photo.');
    }
  };

  return (
    <div className="step-container fade-in">
      <div className="step-left-col">
        <span className="step-badge">Step 2</span>
        <h2 className="step-title">Add your photos</h2>
        <p className="step-subtext">Upload up to 30 photos. Add captions to help the AI tell your story better.</p>
        
        <div 
          className={`upload-zone ${dragOver ? 'drag-over' : ''} ${photos.length > 0 ? 'compact' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          <UploadCloud size={32} className="upload-icon" />
          <h4>Drag photos here</h4>
          <p>or click to browse</p>
          <label className="upload-label-btn">
            Browse files
            <input type="file" multiple accept="image/*" onChange={(e) => handleFiles(e.target.files)} />
          </label>
        </div>
        <div className="upload-constraints">
          JPG, PNG or WEBP · Max 10MB per photo · Up to 30 photos
        </div>
      </div>

      <div className="step-right-col">
        {photos.length > 0 && (
          <div className="photo-grid">
            {photos.map((photo) => (
              <div key={photo.id} className="photo-tile">
                <div className="photo-image-wrapper">
                  <img src={photo.publicUrl || 'https://via.placeholder.com/120'} alt="Story content" />
                  <button className="delete-btn" onClick={() => handleDelete(photo)}>
                    <X size={14} />
                  </button>
                  <div className="drag-handle"><Grid size={16} /></div>
                </div>
                <input 
                  className="photo-caption" 
                  placeholder="Add caption..." 
                  defaultValue={photo.caption || ''} 
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom-action-bar">
        <div className="action-bar-content">
          <Button variant="tertiary" onClick={() => window.history.back()}>← Back</Button>
          <Button 
            variant="primary" 
            onClick={onNext} 
            disabled={photos.length === 0 || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Continue →'}
          </Button>
        </div>
      </div>
    </div>
  );
}
