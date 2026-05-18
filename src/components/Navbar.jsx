import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import { Plus, LogOut, User } from 'lucide-react';
import MLogo from '../logo/M.svg';
import TextLogo from '../logo/Momentix text.svg';
import './Navbar.css';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={MLogo} alt="Momentix Icon" className="logo-img" />
          <img src={TextLogo} alt="Momentix Text" className="logo-text-img" />
        </Link>

        <div className="navbar-actions">
          {user ? (
            <>
              <Button 
                variant="primary" 
                size="sm" 
                icon={Plus} 
                onClick={() => navigate('/create')}
                className="nav-btn"
              >
                New Story
              </Button>
              <div className="user-profile">
                <div className="avatar">
                  {user.email[0].toUpperCase()}
                </div>
                <button onClick={handleLogout} className="logout-btn" title="Sign out">
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="nav-link">Sign in</Link>
              <Button size="sm" onClick={() => navigate('/auth/signup')}>Get Started</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
