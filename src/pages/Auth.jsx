import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import PasswordStrength from '../components/PasswordStrength';
import IconLogo from '../logo/icon.svg';
import './Auth.css';

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/auth/login' || location.pathname === '/auth';
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    termsAccepted: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isFormValid = isLogin 
    ? formData.email && formData.password 
    : formData.email && formData.fullName && formData.password && (formData.password === formData.confirmPassword) && formData.termsAccepted;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, formData.fullName);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page fade-in">
      <div className="auth-header">
        <div className="logo-container">
          <div className="logo-icon">
            <img src={IconLogo} alt="Momentix Icon" width="32" height="32" />
          </div>
          <h1>Momentix</h1>
          <p className="auth-tagline">Turn memories into beautiful stories</p>
        </div>
      </div>

      <Card variant="elevated" className="auth-card">
        <h2>{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
        
        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <Input 
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          {!isLogin && (
            <Input 
              label="Full Name"
              type="text"
              placeholder="John Doe"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          )}

          <Input 
            label="Password"
            type="password"
            placeholder={isLogin ? "••••••••" : "Create a strong password"}
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          {!isLogin && <PasswordStrength password={formData.password} />}

          {!isLogin && (
            <Input 
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={formData.confirmPassword && formData.password !== formData.confirmPassword ? "Passwords do not match" : null}
            />
          )}

          {isLogin ? (
            <div className="auth-links">
              <span className="forgot-password disabled">Forgot password?</span>
            </div>
          ) : (
            <div className="terms-container">
              <input 
                type="checkbox" 
                id="terms"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
              />
              <label htmlFor="terms">I agree to the <a href="#">Terms & Conditions</a></label>
            </div>
          )}

          <Button 
            type="submit" 
            loading={loading} 
            disabled={!isFormValid}
            className="submit-btn"
          >
            {isLogin ? 'Sign in' : 'Create Account'}
          </Button>

          <div className="auth-divider">
            <span className="divider-line"></span>
            <span className="divider-text">OR</span>
            <span className="divider-line"></span>
          </div>

          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleGoogleSignIn}
            className="google-btn"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" />
            <span>{isLogin ? 'Sign in' : 'Sign up'} with Google</span>
          </Button>
        </form>
      </Card>

      <div className="auth-footer">
        {isLogin ? (
          <p>Don't have an account? <Link to="/auth/signup">Sign up</Link></p>
        ) : (
          <p>Already have an account? <Link to="/auth/login">Sign in</Link></p>
        )}
      </div>
    </div>
  );

};

export default Auth;
