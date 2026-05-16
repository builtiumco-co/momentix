import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { Sparkles, Heart, Share2, ShieldCheck } from 'lucide-react';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page fade-in">
      <Navbar />
      
      <header className="hero">
        <div className="hero-content">
          <div className="hero-tagline">
            <Sparkles size={18} />
            <span>AI-Powered Storytelling</span>
          </div>
          <h1>Turn memories into beautiful story experiences</h1>
          <p>Momentix transforms your photos and notes into heartfelt, shareable narratives. Don't just send a message—share a moment.</p>
          <div className="hero-actions">
            <Button size="lg" onClick={() => navigate('/auth/signup')}>Create Your Story</Button>
            <Button variant="secondary" size="lg">See Examples</Button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card c1">
            <Heart size={20} fill="var(--color-accent-rose)" color="var(--color-accent-rose)" />
            <span>Anniversary Tribute</span>
          </div>
          <div className="floating-card c2">
            <Share2 size={20} color="var(--color-accent-gold)" />
            <span>Shared 12 times</span>
          </div>
          <div className="hero-image-placeholder">
            <div className="shimmer" />
          </div>
        </div>
      </header>

      <section className="features">
        <div className="feature-card">
          <ShieldCheck size={32} color="var(--color-accent-teal)" />
          <h3>Secure & Private</h3>
          <p>Your memories are yours. Protected by world-class security.</p>
        </div>
        <div className="feature-card">
          <Sparkles size={32} color="var(--color-accent-gold)" />
          <h3>AI Narrative</h3>
          <p>Our AI weaves your memories into a flowing emotional journey.</p>
        </div>
        <div className="feature-card">
          <Share2 size={32} color="var(--color-accent-rose)" />
          <h3>Easy Sharing</h3>
          <p>Share a beautiful link that opens like a digital storybook.</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
