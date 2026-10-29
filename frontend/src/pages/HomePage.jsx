import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  BookOpen,
  Award,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Code,
  Users,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { isAuthenticated, student } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Official B.Tech Academic Guidance Portal</span>
          </div>

          <h1 className="hero-title">
            Join College. Discover Your Path. <br />
            <span className="text-gradient">Build Your Future.</span>
          </h1>

          <p className="hero-subtitle">
            StudentVerse is your end-to-end guidance platform engineered for B.Tech students. 
            From your first day in Year 1 to your campus placements and higher studies, 
            we help you navigate branches, choose verified career paths, master skills, and land your dream role.
          </p>

          <div className="hero-cta-group">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                <span>Go to My Dashboard</span>
                <ArrowRight size={20} />
              </Link>
            ) : (
              <Link to="/register" className="btn btn-primary btn-lg">
                <span>Get Started (Register Free)</span>
                <ArrowRight size={20} />
              </Link>
            )}

            <Link to="/opportunities" className="btn btn-outline-white btn-lg">
              <Briefcase size={20} />
              <span>Explore Opportunities</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="hero-stats-grid">
            <div className="hero-stat-card">
              <span className="stat-number">8</span>
              <span className="stat-label">B.Tech Branches Covered</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-number">13</span>
              <span className="stat-label">Structured Career Roadmaps</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-number">220+</span>
              <span className="stat-label">Step-by-Step Learning Milestones</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Genuine & Verified Resources</span>
            </div>
          </div>
        </div>
      </section>

      {/* How the Platform Works */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">A CLEAR 4-STEP BLUEPRINT</span>
            <h2 className="section-title">How StudentVerse Works</h2>
            <p className="section-desc">
              No confusion, no guesswork. Follow our proven progression from your first semester to placement day.
            </p>
          </div>

          <div className="how-it-works-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">
                <Compass size={28} />
              </div>
              <h3 className="step-title">Select & Explore Branch</h3>
              <p className="step-desc">
                Learn what CSE, AI&DS, AI&ML, IT, ECE, EEE, Mechanical, and Civil engineering really offer in terms of syllabus and career pathways without hype.
              </p>
              <Link to="/branches" className="step-link">
                <span>Explore 8 Branches</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">
                <TrendingUp size={28} />
              </div>
              <h3 className="step-title">Career Interest Discovery</h3>
              <p className="step-desc">
                Answer 8 transparent interest questions covering coding, math, AI/ML, electronics, networks, and UI design to explore compatible engineering careers.
              </p>
              <Link to="/interest-finder" className="step-link">
                <span>Discover Paths</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">
                <BookOpen size={28} />
              </div>
              <h3 className="step-title">Follow 4-Year Roadmap</h3>
              <p className="step-desc">
                Unlock structured milestones for Year 1 (Foundations), Year 2 (Core Skills), Year 3 (Internships), and Year 4 (Placements & GATE).
              </p>
              <Link to="/career-roadmap" className="step-link">
                <span>View 13 Roadmaps</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="step-card">
              <div className="step-number">04</div>
              <div className="step-icon">
                <Code size={28} />
              </div>
              <h3 className="step-title">Coding Practice & Placement</h3>
              <p className="step-desc">
                Practice 15+ curated programming drills in Java, Python, C++, JS, and SQL, review tiered project blueprints, and master technical interview Q&A.
              </p>
              <Link to="/coding-practice" className="step-link">
                <span>Start Practice</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">BUILT FOR ENGINEERING EXCELLENCE</span>
            <h2 className="section-title">Everything You Need In One Platform</h2>
            <p className="section-desc">
              Designed specifically around the realities of Indian B.Tech colleges, curricula, and recruitment drives.
            </p>
          </div>

          <div className="grid grid-cols-3 features-grid">
            <div className="feature-card card">
              <div className="feature-icon bg-indigo">
                <Compass size={24} />
              </div>
              <h3 className="feature-title">Branch Navigator</h3>
              <p className="feature-desc">
                In-depth guidance for CSE, AI&DS, ECE, EEE, Mechanical, and Civil engineering. Understand future scope without hype.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon bg-purple">
                <TrendingUp size={24} />
              </div>
              <h3 className="feature-title">Rule-Based Interest Finder</h3>
              <p className="feature-desc">
                Transparent multi-criteria scoring algorithm matches your problem-solving style to the most fitting career paths.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon bg-blue">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="feature-title">Persistent Progress Tracking</h3>
              <p className="feature-desc">
                Mark learning topics as completed, save bookmarks, and watch your roadmap completion percentage climb in real-time.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon bg-emerald">
                <BookOpen size={24} />
              </div>
              <h3 className="feature-title">Verified Educational URLs</h3>
              <p className="feature-desc">
                Zero fake links. Hand-curated resources from Harvard CS50, NPTEL, MDN, LeetCode, Kaggle, and MIT OpenCourseWare.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon bg-amber">
                <Briefcase size={24} />
              </div>
              <h3 className="feature-title">Opportunities Hub</h3>
              <p className="feature-desc">
                Track internships (GSoC, ISRO, DRDO), hackathons (SIH), scholarships, and GATE exam schedules with verified deadlines.
              </p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon bg-rose">
                <Award size={24} />
              </div>
              <h3 className="feature-title">Tests & Placement Ready Kit</h3>
              <p className="feature-desc">
                Practice technical MCQ quizzes, review ATS resume formatting, explore tiered project ideas, and master interview FAQs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-section">
        <div className="container cta-container">
          <div className="cta-content text-center">
            <h2 className="cta-title">Ready to Take Control of Your B.Tech Journey?</h2>
            <p className="cta-desc">
              Join your fellow engineering students. Sign up in seconds, pick your branch, and build a career you can be proud of.
            </p>
            <div className="cta-buttons">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Enter My Dashboard
                </Link>
              ) : (
                <Link to="/register" className="btn btn-primary btn-lg">
                  Create Student Account
                </Link>
              )}
              <Link to="/branches" className="btn btn-secondary btn-lg">
                Explore Branches
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
