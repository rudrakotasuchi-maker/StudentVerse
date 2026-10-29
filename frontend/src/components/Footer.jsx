import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-content">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <div className="footer-logo-icon">
              <GraduationCap size={22} />
            </div>
            <span className="footer-brand-name">StudentVerse</span>
          </div>
          <p className="footer-tagline">
            Join College. Discover Your Path. Build Your Future.
          </p>
          <p className="footer-desc">
            Empowering B.Tech students across India with clear branch exploration, structured 4-year career roadmaps, curated resources, and placement preparation.
          </p>
          <div className="footer-badge">
            <ShieldCheck size={16} />
            <span>Academic Demonstration Platform</span>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">B.Tech Guidance</h4>
          <ul className="footer-links">
            <li><Link to="/branches">Branch Explorer (6 Disciplines)</Link></li>
            <li><Link to="/interest-finder">Career Interest Finder</Link></li>
            <li><Link to="/career-roadmap">4-Year Structured Roadmaps</Link></li>
            <li><Link to="/dashboard">Student Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Skill & Preparation</h4>
          <ul className="footer-links">
            <li><Link to="/learning-resources">Searchable Resource Hub</Link></li>
            <li><Link to="/opportunities">Verified Opportunities Hub</Link></li>
            <li><Link to="/tests-practice">MCQ Practice & History</Link></li>
            <li><Link to="/project-prep">Projects & Interview Kit</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Branches Covered</h4>
          <div className="footer-branch-tags">
            <span className="branch-pill">CSE</span>
            <span className="branch-pill">AI&DS</span>
            <span className="branch-pill">ECE</span>
            <span className="branch-pill">EEE</span>
            <span className="branch-pill">Mechanical</span>
            <span className="branch-pill">Civil</span>
          </div>
          <p className="footer-note">
            Built using React JS, Node.js, Express, and MySQL. Designed for placement readiness and student excellence.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} StudentVerse. All rights reserved.</p>
          <p className="footer-credits">
            Crafted for B.Tech Student Success
          </p>
        </div>
      </div>
    </footer>
  );
}
