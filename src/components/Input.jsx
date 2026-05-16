import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './Input.css';

const Input = ({ 
  label, 
  error, 
  type = 'text', 
  className = '', 
  required, 
  helperText,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      
      <div className={`input-container ${error ? 'input-error' : ''}`}>
        <input 
          type={inputType}
          className="input-field"
          {...props}
        />
        
        {isPassword && (
          <button 
            type="button" 
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <span className="error-message">{error}</span>}
      {helperText && !error && <span className="helper-text">{helperText}</span>}
    </div>
  );
};

export default Input;
