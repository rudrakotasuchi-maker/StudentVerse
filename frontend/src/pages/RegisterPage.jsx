import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, UserPlus, AlertCircle, ArrowRight, Sparkles, Compass } from 'lucide-react';

const branches = [
  'CSE',
  'AI&DS',
  'AI&ML',
  'IT',
  'ECE',
  'EEE',
  'Mechanical Engineering',
  'Civil Engineering'
];

const yearGuidanceInfo = {
  '1': {
    badge: '1st Year: Foundations & Branch Discovery',
    color: '#4f46e5',
    bg: '#eef2ff',
    border: '#c7d2fe',
    text: 'Explore branches, foundational engineering concepts, and diverse career options without needing any prior coding or technical knowledge.'
  },
  '2': {
    badge: '2nd Year: Core Technical Skills & Languages',
    color: '#0284c7',
    bg: '#f0f9ff',
    border: '#bae6fd',
    text: 'Explore core technical skills, foundational data structures, modern programming languages (Java, Python, C++), and possible career specializations.'
  },
  '3': {
    badge: '3rd Year: Roadmaps, Projects & Internships',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    text: 'Follow structured 4-year roadmaps, build portfolio project deliverables, practice coding, and prepare for summer internships & hackathons.'
  },
  '4': {
    badge: '4th Year: Interview Prep & Placement Readiness',
    color: '#059669',
    bg: '#ecfdf5',
    border: '#a7f3d0',
    text: 'Focus on technical interview preparation (DSA, OS, DBMS, Networks), project defense, ATS resume polishing, and campus placement drives.'
  }
};

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [academicYear, setAcademicYear] = useState('1');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setIsSubmitting(true);
      await register({
        full_name: fullName.trim(),
        email: email.trim(),
        password,
        branch,
        academic_year: parseInt(academicYear, 10)
      });
      // Direct student to their personalized dashboard tailored to their academic year
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please verify your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYearGuidance = yearGuidanceInfo[academicYear] || yearGuidanceInfo['1'];

  return (
    <div className="auth-page-wrapper">
      <div className="container-sm">
        <div className="auth-card card">
          <div className="auth-header text-center">
            <div className="auth-icon-badge">
              <GraduationCap size={28} />
            </div>
            <h1 className="auth-title">Create Your Student Profile</h1>
            <p className="auth-subtitle">
              Join StudentVerse to explore branches, learning roadmaps, coding practice, and career paths
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
              <label htmlFor="reg-fullname" className="form-label">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                id="reg-fullname"
                type="text"
                className="form-control"
                placeholder="e.g. Rahul Sharma or Priya Patel"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email" className="form-label">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                className="form-control"
                placeholder="e.g. student@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-password" className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <input
                id="reg-password"
                type="password"
                className="form-control"
                placeholder="Create a secure password (minimum 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.85rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="reg-branch" className="form-label">
                  B.Tech Branch <span className="text-danger">*</span>
                </label>
                <select
                  id="reg-branch"
                  className="form-control"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                >
                  {branches.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor="reg-year" className="form-label">
                  Current Academic Year <span className="text-danger">*</span>
                </label>
                <select
                  id="reg-year"
                  className="form-control"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  required
                >
                  <option value="1">1st Year (Beginner)</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            {/* Dynamic Academic Year Guidance Banner */}
            <div
              style={{
                background: currentYearGuidance.bg,
                border: `1px solid ${currentYearGuidance.border}`,
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                marginBottom: '1rem',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: currentYearGuidance.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  {currentYearGuidance.badge}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#334155', lineHeight: '1.45' }}>
                {currentYearGuidance.text}
              </p>
            </div>

            {/* Beginner-Friendly Post-Registration Discovery Note */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                background: '#f8fafc',
                border: '1px dashed #cbd5e1',
                borderRadius: '8px',
                padding: '0.8rem 1rem',
                marginBottom: '1.5rem',
                fontSize: '0.84rem',
                color: '#475569',
                lineHeight: '1.45'
              }}
            >
              <Sparkles size={18} style={{ color: 'var(--primary, #4f46e5)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#1e293b' }}>Discover interests at your own pace:</strong>{' '}
                No prior technical knowledge is required today. After registration, explore career options and discover your interests through our guided Interest Finder whenever you are ready.
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner spinner-white"></div>
                  <span>Creating Your Account...</span>
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>Complete Registration</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-footer text-center">
            <p>
              Already registered?{' '}
              <Link to="/login" className="auth-link">
                Log In to Existing Account <ArrowRight size={14} style={{ display: 'inline' }} />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
