import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import StoryCard from '../components/StoryCard';
import { fetchUserStories, deleteStory } from '../lib/api';
import { supabase } from '../lib/supabase';
import { Image as ImageIcon, Sparkles, ChevronDown } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'User';
  
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All occasions');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let subscription = null;

    async function loadData() {
      if (!user) return;
      try {
        const data = await fetchUserStories(user.id);
        setStories(data || []);
      } catch (err) {
        console.error('Failed to load stories', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();

    if (user) {
      subscription = supabase
        .channel('public:stories')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'stories', filter: `user_id=eq.${user.id}` }, () => {
          loadData();
        })
        .subscribe();
    }

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await deleteStory(id);
        setStories(stories.filter(s => s.id !== id));
      } catch (err) {
        console.error('Failed to delete story', err);
        alert('Failed to delete story');
      }
    }
  };

  const stats = {
    created: stories.length,
    views: stories.reduce((sum, s) => sum + (s.view_count || 0), 0)
  };
  stats.reached = Math.floor(stats.views * 0.1293); // MVP approximation based on design

  const filteredStories = stories.filter(s => {
    const matchesOccasion = filter === 'All occasions' ? true : s.occasion === filter;
    const matchesSearch = s.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    return matchesOccasion && (searchQuery.trim() === '' || matchesSearch);
  });

  return (
    <div className="dashboard-page fade-in">
      <Navbar />
      
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Hi, {firstName}! 👋</h1>
          <p>Welcome back to your stories</p>
        </header>

        <section className="stats-row">
          <Card className="stat-card">
            <span className="stat-label">STORIES CREATED</span>
            <span className="stat-value">{stats.created}</span>
          </Card>
          <Card className="stat-card">
            <span className="stat-label">TOTAL VIEWS</span>
            <span className="stat-value">{stats.views.toLocaleString()}</span>
          </Card>
          <Card className="stat-card">
            <span className="stat-label">PEOPLE REACHED</span>
            <span className="stat-value">{stats.reached.toLocaleString()}</span>
          </Card>
        </section>

        <section className="stories-section">
          <div className="stories-header">
            <h2>Your Stories</h2>
            <div className="stories-controls">
              <input 
                type="text" 
                className="search-input"
                placeholder="Search stories..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="filter-dropdown">
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="All occasions">All occasions</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Baby Milestone">Baby Milestone</option>
                  <option value="Anniversary">Anniversary</option>
                </select>
                <ChevronDown size={16} className="select-icon" />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-state"><div className="spinner" /></div>
          ) : stories.length === 0 ? (
            <Card variant="default" className="empty-state">
              <div className="empty-illustration">
                <div className="blob" />
                <ImageIcon size={64} color="var(--color-accent-gold)" />
              </div>
              <h2>No stories yet</h2>
              <p>Create your first story to turn your memories into beautiful narratives.</p>
              <Button size="lg" icon={Sparkles} className="create-cta" onClick={() => window.location.href='/create'}>
                Create My First Story
              </Button>
            </Card>
          ) : (
            <div className="stories-grid">
              {filteredStories.map(story => (
                <StoryCard key={story.id} story={story} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
