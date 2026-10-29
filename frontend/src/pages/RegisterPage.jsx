import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, UserPlus, AlertCircle, ArrowRight } from 'lucide-react';

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

const availableInterests = [
  'Web Development',
  'AI & Machine Learning',
  'Data Analytics',
  'Cybersecurity',
  'Embedded Systems & IoT',
  'Power & Electric Vehicles',
  'CAD & Robotics',
  'Civil & Structural BIM',
  'GATE Preparation',
  'Government Engineering Services'
];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [academicYear, setAcademicYear] = useState('1');
  const [selectedInterests, setSelectedInterests] = useState(['Web Development']);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

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
        academic_year: parseInt(academicYear, 10),
        areas_of_interest: selectedInterests
      });
      // Redirect to branch exploration for guided onboarding
      navigate('/branches');
    } catch (err) {
      setError(err.message || 'Registration failed. Please verify your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Join StudentVerse to discover career opportunities and personalized B.Tech roadmaps
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
                Create Password (Min 6 characters) <span className="text-danger">*</span>
              </label>
              <input
                id="reg-password"
                type="password"
                className="form-control"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
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
                  <option value="1">1st Year (Freshman)</option>
                  <option value="2">2nd Year (Sophomore)</option>
                  <option value="3">3rd Year (Junior)</option>
                  <option value="4">4th Year (Senior)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Areas of Interest (Select all that apply)
              </label>
              <div className="interest-chips-container">
                {availableInterests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      type="button"
                      key={interest}
                      className={`interest-chip ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </button>
                  );
                })}
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
