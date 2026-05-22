import React, { useState } from 'react';
import { UploadCloud, X, Grid, Sparkles, AlertTriangle } from 'lucide-react';
import Button from '../Button';
import { uploadStoryPhotos, deletePhoto } from '../../lib/api';
import { compressPhotos } from '../../lib/photos/compress';
import './Step2Photos.css';

export default function Step2Photos({ story, onNext, setStory }) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showSizeWarning, setShowSizeWarning] = useState(false);

  const photos = story.story_photos || [];

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    
    const availableSlots = 20 - photos.length;
    if (availableSlots <= 0) {
      alert('You can only upload up to 20 photos.');
      return;
    }

    const rawFiles = [];
    let hasOversize = false;

    for (let i = 0; i < Math.min(files.length, availableSlots); i++) {
      if (files[i].size > 2 * 1024 * 1024) {
        hasOversize = true;
      }
      rawFiles.push(files[i]);
    }

    if (hasOversize) {
      setShowSizeWarning(true);
    }

    setIsUploading(true);
    try {
      const filesToUpload = await compressPhotos(rawFiles);
      const newPhotos = await uploadStoryPhotos(story.id, filesToUpload);
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
        <span className="step-badge">Step 3</span>
        <h2 className="step-title">Add your photos</h2>
        <p className="step-subtext">Upload photos from the celebration. Keep them lightweight — smaller files load faster for everyone who views the story.</p>
        
        <div className="compression-banner">
          <p className="banner-text"><strong>Photos over 2MB will slow down your story.</strong></p>
          <div className="banner-links">
            <a href="#" className="banner-link">How to compress →</a>
            <a href="#" className="banner-link highlight">Compress them for you →</a>
          </div>
        </div>

        {showSizeWarning && (
          <div className="size-warning">
            <AlertTriangle size={16} />
            <p>One or more photos are over 2MB. Consider compressing them for a faster story.</p>
          </div>
        )}

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
            <input type="file" multiple accept="image/jpeg, image/png, image/webp" onChange={(e) => handleFiles(e.target.files)} />
          </label>
        </div>
        <div className="upload-constraints">
          JPG, PNG, WEBP · Max 2MB per photo · {photos.length} of 20 photos added
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
            <Sparkles size={16} /> {isUploading ? 'Uploading...' : 'Generate my story →'}
          </Button>
        </div>
      </div>
    </div>
  );
}
