import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { Image as ImageIcon, Sparkles } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'User';

  return (
    <div className="dashboard-page fade-in">
      <Navbar />
      
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Hi, {firstName}! 👋</h1>
          <p>Welcome back to your stories</p>
        </header>

        <section className="stories-section">
          <Card variant="default" className="empty-state">
            <div className="empty-illustration">
              <div className="blob" />
              <ImageIcon size={64} color="var(--color-accent-gold)" />
            </div>
            <h2>No stories yet</h2>
            <p>Create your first story to turn your memories into beautiful narratives.</p>
            <Button size="lg" icon={Sparkles} className="create-cta">
              Create My First Story
            </Button>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
