import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  Compass,
  BookOpen,
  Briefcase,
  CheckSquare,
  Award,
  User,
  LogOut,
  LogIn,
  Menu,
  X,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar() {
  const { student, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <div className="brand-icon">
            <GraduationCap size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">StudentVerse</span>
            <span className="brand-tagline">B.Tech Guidance Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links desktop-only" aria-label="Main Navigation">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Home
          </NavLink>
          <NavLink to="/branches" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Branches
          </NavLink>
          <NavLink to="/guidance" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Guidance Center
          </NavLink>
          <NavLink to="/interest-finder" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Interest Finder
          </NavLink>
          <NavLink to="/career-roadmap" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Roadmaps
          </NavLink>
          <NavLink to="/coding-practice" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Coding Practice
          </NavLink>
          <NavLink to="/learning-resources" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Resources
          </NavLink>
          <NavLink to="/opportunities" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Opportunities
          </NavLink>
          <NavLink to="/tests-practice" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Quizzes
          </NavLink>
          <NavLink to="/project-prep" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            Placement Prep
          </NavLink>
        </nav>

        {/* Desktop Auth Actions */}
        <div className="nav-actions desktop-only">
          {isAuthenticated ? (
            <div className="user-nav-group">
              <Link to="/dashboard" className="btn btn-sm btn-outline">
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
              <Link to="/profile" className="btn btn-sm btn-secondary" title="View Profile">
                <User size={16} />
                <span>{student?.full_name?.split(' ')[0] || 'Profile'}</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-sm btn-outline" title="Log Out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="guest-nav-group">
              <Link to="/login" className="btn btn-sm btn-outline">
                <LogIn size={16} />
                <span>Log In</span>
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-toggle mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer mobile-only">
          <nav className="mobile-nav-list">
            <Link to="/" onClick={closeMenu} className="mobile-nav-item">
              Home
            </Link>
            <Link to="/branches" onClick={closeMenu} className="mobile-nav-item">
              B.Tech Branches
            </Link>
            <Link to="/guidance" onClick={closeMenu} className="mobile-nav-item">
              Guidance Center
            </Link>
            <Link to="/interest-finder" onClick={closeMenu} className="mobile-nav-item">
              Interest Finder
            </Link>
            <Link to="/career-roadmap" onClick={closeMenu} className="mobile-nav-item">
              Career Roadmaps
            </Link>
            <Link to="/coding-practice" onClick={closeMenu} className="mobile-nav-item">
              Coding Practice
            </Link>
            <Link to="/learning-resources" onClick={closeMenu} className="mobile-nav-item">
              Learning Resources
            </Link>
            <Link to="/opportunities" onClick={closeMenu} className="mobile-nav-item">
              Opportunities Hub
            </Link>
            <Link to="/tests-practice" onClick={closeMenu} className="mobile-nav-item">
              Tests & Practice
            </Link>
            <Link to="/project-prep" onClick={closeMenu} className="mobile-nav-item">
              Placement Prep
            </Link>
            
            <div className="mobile-drawer-divider"></div>

            {isAuthenticated ? (
              <div className="mobile-drawer-auth">
                <Link to="/dashboard" onClick={closeMenu} className="btn btn-primary btn-block">
                  <LayoutDashboard size={18} />
                  <span>My Dashboard</span>
                </Link>
                <Link to="/profile" onClick={closeMenu} className="btn btn-secondary btn-block">
                  <User size={18} />
                  <span>My Profile ({student?.full_name})</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-outline btn-block">
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="mobile-drawer-auth">
                <Link to="/login" onClick={closeMenu} className="btn btn-outline btn-block">
                  Log In
                </Link>
                <Link to="/register" onClick={closeMenu} className="btn btn-primary btn-block">
                  Get Started (Register)
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
