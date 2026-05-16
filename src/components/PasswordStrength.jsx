import React from 'react';
import './PasswordStrength.css';

const PasswordStrength = ({ password }) => {
  if (!password) return null;

  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score++;
    return score;
  };

  const strength = getStrength(password);
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['#E8B4B0', '#D4A574', '#D4A574', '#B8C5A6'];

  return (
    <div className="password-strength-container">
      <div className="strength-bars">
        {[1, 2, 3, 4].map((level) => (
          <div 
            key={level}
            className={`strength-bar ${level <= strength ? 'active' : ''}`}
            style={{ backgroundColor: level <= strength ? colors[strength - 1] : 'var(--color-border)' }}
          />
        ))}
      </div>
      <span className="strength-label" style={{ color: colors[strength - 1] }}>
        {labels[strength - 1]}
      </span>
    </div>
  );
};

export default PasswordStrength;
