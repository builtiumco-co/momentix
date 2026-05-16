import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  icon: Icon, 
  iconPosition = 'left',
  className = '',
  ...props 
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${loading ? 'btn-loading' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <div className="btn-spinner" />}
      {!loading && Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : 20} className="btn-icon-left" />}
      <span className="btn-text">{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : 20} className="btn-icon-right" />}
    </button>
  );
};

export default Button;
