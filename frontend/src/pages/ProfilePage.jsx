import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, CheckCircle, AlertCircle, Save, Target, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

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

export default function ProfilePage() {
  const { student, updateStudentProfile } = useAuth();

  const [fullName, setFullName] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [academicYear, setAcademicYear] = useState('1');
  const [interests, setInterests] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (student) {
      setFullName(student.full_name || '');
      setBranch(student.branch || 'CSE');
      setAcademicYear(student.academic_year?.toString() || '1');
      setInterests(student.areas_of_interest || '');
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Full name cannot be empty.');
      return;
    }

    try {
      setIsSaving(true);
      await updateStudentProfile({
        full_name: fullName.trim(),
        branch,
        academic_year: parseInt(academicYear, 10),
        areas_of_interest: interests
      });
      setSuccessMsg('Your student profile has been updated and persisted to MySQL!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-page">
      <section className="page-header-banner">
        <div className="container">
          <span className="badge badge-primary">STUDENT ACCOUNT SETTINGS</span>
          <h1 className="page-header-title">My Student Profile</h1>
          <p className="page-header-subtitle">
            Update your registered B.Tech branch, current academic year, and career interests.
          </p>
        </div>
      </section>

      <div className="container section-padding">
        <div className="card" style={{ maxWidth: '720px', margin: '0 auto' }}>
          {successMsg && (
            <div className="alert alert-success" role="alert">
              <CheckCircle size={20} />
              <div>{successMsg}</div>
            </div>
          )}

          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              <AlertCircle size={20} />
              <div>{errorMsg}</div>
            </div>
          )}

          {/* Current Target Career Summary */}
          <div className="profile-career-banner card" style={{ background: 'var(--bg-card-subtle)', marginBottom: '1.5rem' }}>
            <div className="flex-between">
              <div>
                <span className="badge badge-secondary">Selected Career Goal</span>
                <h3 style={{ fontSize: '1.2rem', marginTop: '0.35rem' }}>
                  {student?.target_career_title || 'No Career Path Selected'}
                </h3>
              </div>
              <Link to="/interest-finder" className="btn btn-sm btn-outline">
                <Target size={14} />
                <span>Change Career</span>
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="p-name" className="form-label">
                Full Name
              </label>
              <input
                id="p-name"
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="p-email" className="form-label">
                Email Address (Account Identifier)
              </label>
              <input
                id="p-email"
                type="email"
                className="form-control"
                value={student?.email || ''}
                disabled
                style={{ opacity: 0.7, cursor: 'not-allowed' }}
              />
              <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                Email cannot be modified once registered.
              </span>
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="p-branch" className="form-label">
                  B.Tech Branch
                </label>
                <select
                  id="p-branch"
                  className="form-control"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  {branches.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="p-year" className="form-label">
                  Academic Year
                </label>
                <select
                  id="p-year"
                  className="form-control"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                >
                  <option value="1">1st Year (Beginner)</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="p-interests" className="form-label">
                Areas of Interest <span className="text-muted" style={{ fontWeight: 400 }}>(Optional - discoverable via Interest Finder)</span>
              </label>
              <input
                id="p-interests"
                type="text"
                className="form-control"
                placeholder="e.g. Web Development, AI & Machine Learning, Robotics (Optional)"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
              <span className="text-muted" style={{ fontSize: '0.8rem', display: 'block', marginTop: '0.3rem' }}>
                You can also discover your ideal career path using the <Link to="/interest-finder" style={{ color: 'var(--primary)' }}>Interest Finder</Link> or <Link to="/branches" style={{ color: 'var(--primary)' }}>Branch Explorer</Link>.
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={isSaving}
              style={{ marginTop: '1rem' }}
            >
              {isSaving ? (
                <>
                  <div className="spinner spinner-white"></div>
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Update Profile Details</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
