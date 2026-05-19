import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import { Plus, LogOut, ChevronDown, User, Settings } from 'lucide-react';
import MLogo from '../logo/M.svg';
import TextLogo from '../logo/Momentix text.svg';
import './Navbar.css';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              <div className="user-profile" ref={dropdownRef}>
                <button 
                  className="avatar-btn" 
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="avatar">
                    {user.email[0].toUpperCase()}
                  </div>
                  <ChevronDown size={16} className="avatar-chevron" />
                </button>
                {showDropdown && (
                  <div className="avatar-dropdown fade-in">
                    <button className="dropdown-item" disabled><User size={16} /> Profile</button>
                    <button className="dropdown-item" onClick={() => { setShowDropdown(false); navigate('/settings'); }}><Settings size={16} /> Settings</button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
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
