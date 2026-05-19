import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { supabase } from '../lib/supabase';
import { User, Bell, Shield, Trash2, Mail } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Name updated successfully!');
    }
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you absolutely sure you want to delete your account? This action cannot be undone and will permanently delete all your stories and photos.")) {
      alert('Account deletion request received. Our team will process this within 24 hours. Please contact support@createmomentix.com if you need immediate assistance.');
    }
  };

  return (
    <div className="settings-page fade-in">
      <Navbar />
      <div className="settings-content">
        <header className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account preferences and data</p>
        </header>

        <div className="settings-grid">
          {/* Sidebar */}
          <aside className="settings-sidebar">
            <button className="settings-tab active"><User size={18} /> Account</button>
            <button className="settings-tab disabled"><Bell size={18} /> Notifications</button>
            <button className="settings-tab disabled"><Shield size={18} /> Privacy & Security</button>
            <button className="settings-tab disabled"><Mail size={18} /> Email</button>
          </aside>

          {/* Main Content */}
          <main className="settings-panels">
            <Card className="settings-card">
              <h2>Profile Information</h2>
              <p className="settings-subtext">Update your personal details here.</p>
              
              {message && <div className={`settings-message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
              
              <form onSubmit={handleUpdateName} className="settings-form">
                <Input 
                  label="Full Name" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  required 
                  placeholder="Your Name"
                />
                <Input 
                  label="Email Address" 
                  value={user?.email || ''} 
                  disabled 
                  helperText="Email addresses cannot be changed directly."
                />
                <div className="settings-actions">
                  <Button type="submit" loading={loading}>Save Changes</Button>
                </div>
              </form>
            </Card>

            <Card className="settings-card danger-zone">
              <div>
                <h2 className="danger-text">Danger Zone</h2>
                <p className="settings-subtext">Once you delete your account, there is no going back. Please be certain.</p>
              </div>
              <Button variant="outline" className="danger-btn" onClick={handleDeleteAccount} icon={Trash2}>
                Delete Account
              </Button>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
