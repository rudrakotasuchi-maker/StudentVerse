import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, LogIn, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAccount = () => {
    setEmail('suchirmai@example.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="auth-page-wrapper">
      <div className="container-sm">
        <div className="auth-card card">
          <div className="auth-header text-center">
            <div className="auth-icon-badge">
              <GraduationCap size={28} />
            </div>
            <h1 className="auth-title">Welcome Back to StudentVerse</h1>
            <p className="auth-subtitle">
              Log in to continue tracking your B.Tech roadmaps and milestones
            </p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              <AlertCircle size={20} />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="login-email" className="form-label">
                College / Student Email Address
              </label>
              <input
                id="login-email"
                type="email"
                className="form-control"
                placeholder="e.g. yourname@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>
              </div>
              <input
                id="login-password"
                type="password"
                className="form-control"
                placeholder="Enter your account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner spinner-white"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Log In to Account</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials for presentation */}
          <div className="demo-credentials-box">
            <div className="demo-credentials-header">
              <Sparkles size={16} />
              <span>Quick Demo Sign-In Shortcut</span>
            </div>
            <p className="demo-text">
              Testing for a presentation? Click below to populate demo credentials:
            </p>
            <button
              type="button"
              onClick={fillDemoAccount}
              className="btn btn-sm btn-outline btn-block"
            >
              Use Demo: suchirmai@example.com
            </button>
          </div>

          <div className="auth-footer text-center">
            <p>
              Don't have an account yet?{' '}
              <Link to="/register" className="auth-link">
                Register as a Student <ArrowRight size={14} style={{ display: 'inline' }} />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
