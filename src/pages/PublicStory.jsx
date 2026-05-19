import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStoryByShareId } from '../lib/api';
import TemplateRenderer from '../components/story-templates/TemplateRenderer';

export default function PublicStory() {
  const { token } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadStory() {
      try {
        const data = await fetchStoryByShareId(token);
        if (!data.published && data.status !== 'published') {
          setError('This story is not public.');
        } else {
          setStory(data);
        }
      } catch (e) {
        console.error(e);
        setError('Story not found.');
      } finally {
        setLoading(false);
      }
    }
    if (token) loadStory();
  }, [token]);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>Loading story...</div>;
  if (error || !story) return <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>{error}</div>;

  return (
    <div className="public-story-page">
      <TemplateRenderer story={story} />
    </div>
  );
}
