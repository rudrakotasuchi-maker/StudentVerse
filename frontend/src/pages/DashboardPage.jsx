import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  LayoutDashboard,
  Target,
  Compass,
  CheckCircle2,
  Bookmark,
  Calendar,
  Award,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  BookOpen,
  Sparkles,
  User,
  Clock,
  Lightbulb,
  CheckSquare,
  Code
} from 'lucide-react';

export default function DashboardPage() {
  const { student } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSummary = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/dashboard/summary');
      if (res.success && res.dashboard) {
        setDashboardData(res.dashboard);
      }
    } catch (err) {
      console.error('Failed to load dashboard summary:', err);
      setError(err.message || 'Could not load your dashboard.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-state" style={{ minHeight: '70vh' }}>
        <div className="spinner"></div>
        <p>Loading your personal academic dashboard...</p>
      </div>
    );
  }

  const s = dashboardData?.student || student;
  const roadmap = dashboardData?.roadmap || { total_topics: 0, completed_topics_count: 0, completion_percentage: 0, completed_topics: [], next_recommended_topic: null };
  const savedResources = dashboardData?.saved_resources || { total_count: 0, items: [] };
  const upcoming = dashboardData?.upcoming_opportunities || [];
  const recentQuizzes = dashboardData?.recent_quizzes || [];
  const recommendedActions = dashboardData?.recommended_actions || [];
  const nextTopic = roadmap.next_recommended_topic;

  return (
    <div className="dashboard-page">
      {/* Student Profile Header Banner */}
      <section className="dashboard-header-banner">
        <div className="container dashboard-header-content">
          <div className="dashboard-student-meta">
            <div className="student-avatar">
              <GraduationCap size={36} />
            </div>
            <div>
              <div className="student-tags-row">
                <span className="badge badge-primary">{s?.branch || 'B.Tech'}</span>
                <span className="badge badge-secondary">Year {s?.academic_year || 1} Engineering</span>
                {s?.target_career_title && (
                  <span className="badge badge-success">
                    <Target size={12} />
                    <span>{s.target_career_title}</span>
                  </span>
                )}
              </div>
              <h1 className="student-welcome-title">
                Welcome, {s?.full_name || 'Engineering Student'}
              </h1>
              <p className="student-subtext">
                Track your semester progress, persistent roadmap milestones, and placement readiness in real time.
              </p>
            </div>
          </div>

          <div className="dashboard-header-actions">
            <Link to="/coding-practice" className="btn btn-secondary btn-sm">
              <Code size={16} />
              <span>Coding Practice</span>
            </Link>
            <Link to="/guidance" className="btn btn-primary btn-sm">
              <BookOpen size={16} />
              <span>Guidance Center</span>
            </Link>
            <Link to="/profile" className="btn btn-outline-white btn-sm">
              <User size={16} />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="container section-padding">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Next Recommended Topic Feature Card */}
        {nextTopic ? (
          <div className="card next-topic-hero-card">
            <div className="next-topic-badge-row">
              <span className="badge badge-secondary">
                <Sparkles size={14} />
                <span>Next Recommended Roadmap Topic</span>
              </span>
              <span className="next-topic-year">
                Year {nextTopic.year_level} Milestone {nextTopic.order_num}
              </span>
            </div>

            <h2 className="next-topic-title">{nextTopic.topic_name}</h2>
            <p className="next-topic-desc">{nextTopic.description}</p>

            {nextTopic.suggested_next_step && (
              <div className="next-topic-action-hint">
                <Lightbulb size={16} className="text-warning" />
                <span><strong>Recommended Action:</strong> {nextTopic.suggested_next_step}</span>
              </div>
            )}

            <div className="next-topic-btn-row">
              <Link
                to={`/career-roadmap/${s?.target_career_slug || 'software-engineering'}`}
                className="btn btn-primary"
              >
                <span>Continue Roadmap & View Blueprint</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : (
          !s?.target_career_id && (
            <div className="card next-topic-hero-card">
              <div className="next-topic-badge-row">
                <span className="badge badge-warning">Action Required</span>
              </div>
              <h2 className="next-topic-title">Choose Your Target B.Tech Career Path</h2>
              <p className="next-topic-desc">
                Welcome to StudentVerse! You haven't chosen your target career path yet. Take our 8-dimension Interest Discovery questionnaire or explore your branch options to discover compatible career paths at your own pace.
              </p>
              <div className="next-topic-btn-row" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/interest-finder" className="btn btn-primary">
                  <span>Take Interest Finder</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/branches" className="btn btn-secondary">
                  <span>Explore B.Tech Branches</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )
        )}

        {/* 4 Key Performance Metrics Cards */}
        <div className="grid grid-cols-4 dashboard-stats-grid">
          <div className="card stat-widget">
            <div className="stat-widget-header">
              <span className="stat-widget-title">Roadmap Progress</span>
              <TrendingUp size={20} className="text-primary" />
            </div>
            <div className="stat-widget-value">{roadmap.completion_percentage}%</div>
            <div className="progress-container" style={{ margin: '0.5rem 0' }}>
              <div className="progress-bar" style={{ width: `${roadmap.completion_percentage}%` }}></div>
            </div>
            <span className="stat-widget-sub">
              {roadmap.completed_topics_count} of {roadmap.total_topics} topics completed in MySQL
            </span>
          </div>

          <div className="card stat-widget">
            <div className="stat-widget-header">
              <span className="stat-widget-title">Target Career</span>
              <Target size={20} className="text-secondary" />
            </div>
            <div className="stat-widget-value" style={{ fontSize: '1.25rem', lineHeight: '1.4' }}>
              {s?.target_career_title ? s.target_career_title : 'Not Selected'}
            </div>
            <Link
              to={s?.target_career_slug ? `/career-roadmap/${s.target_career_slug}` : '/interest-finder'}
              className="stat-widget-link"
            >
              <span>{s?.target_career_title ? 'View Roadmap' : 'Discover Path'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="card stat-widget">
            <div className="stat-widget-header">
              <span className="stat-widget-title">Saved Resources</span>
              <Bookmark size={20} className="text-info" />
            </div>
            <div className="stat-widget-value">{savedResources.total_count}</div>
            <Link to="/learning-resources" className="stat-widget-link">
              <span>Explore Library</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="card stat-widget">
            <div className="stat-widget-header">
              <span className="stat-widget-title">Practice Tests</span>
              <Award size={20} className="text-success" />
            </div>
            <div className="stat-widget-value">{recentQuizzes.length}</div>
            <Link to="/tests-practice" className="stat-widget-link">
              <span>Take Quiz</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Actionable Recommendations for Student Year */}
        {recommendedActions.length > 0 && (
          <div className="card recommended-action-card" style={{ margin: '1.5rem 0' }}>
            <div className="rec-card-header">
              <Sparkles size={20} className="text-primary" />
              <h3 style={{ fontSize: '1.15rem' }}>Personalized Next Steps for You</h3>
            </div>
            <div className="rec-items-grid">
              {recommendedActions.map((rec, i) => (
                <div key={i} className="rec-item">
                  <div className="rec-item-header">
                    <span className="badge badge-primary">{rec.badge}</span>
                    <h4 className="rec-item-title">{rec.action}</h4>
                  </div>
                  <p className="rec-item-tip">{rec.tip}</p>
                  <Link to={rec.link} className="btn btn-sm btn-outline">
                    <span>Take Action</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Two Columns */}
        <div className="grid grid-cols-2" style={{ gap: '1.5rem', margin: '1.5rem 0' }}>
          {/* Completed Milestones List */}
          <div className="card">
            <div className="card-section-title">
              <CheckCircle2 size={20} className="text-success" />
              <h3>Completed Roadmap Topics</h3>
            </div>

            {roadmap.completed_topics && roadmap.completed_topics.length > 0 ? (
              <div className="completed-topics-list">
                {roadmap.completed_topics.map((t) => (
                  <div key={t.id} className="completed-topic-item">
                    <div className="topic-bullet-done">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="topic-info">
                      <span className="topic-meta">Year {t.year_level} Milestone</span>
                      <h4 className="topic-name-sm">{t.topic_name}</h4>
                      {t.completed_at && (
                        <span className="topic-date">
                          Completed on {new Date(t.completed_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-sub-state">
                <Target size={36} className="text-muted" style={{ margin: '0 auto 0.75rem auto' }} />
                <h4>No Topics Completed Yet</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                  {s?.target_career_slug
                    ? 'Start ticking off milestones in your 4-year career roadmap to build momentum.'
                    : 'Choose your target career path first to unlock your structured milestones.'}
                </p>
                <Link
                  to={s?.target_career_slug ? `/career-roadmap/${s.target_career_slug}` : '/interest-finder'}
                  className="btn btn-sm btn-primary"
                >
                  {s?.target_career_slug ? 'Open 4-Year Roadmap' : 'Take Interest Finder'}
                </Link>
              </div>
            )}
          </div>

          {/* Bookmarked Resources Quick Access */}
          <div className="card">
            <div className="card-section-title">
              <Bookmark size={20} className="text-info" />
              <h3>Your Saved Learning Resources</h3>
            </div>

            {savedResources.items && savedResources.items.length > 0 ? (
              <div className="saved-resources-list">
                {savedResources.items.map((r) => (
                  <div key={r.id} className="saved-resource-item">
                    <div>
                      <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{r.category}</span>
                      <h4 className="saved-res-title">{r.title}</h4>
                      <span className="saved-res-provider">Provided by {r.provider}</span>
                    </div>
                    <a
                      href={r.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline"
                    >
                      <span>Visit</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-sub-state">
                <BookOpen size={36} className="text-muted" style={{ margin: '0 auto 0.75rem auto' }} />
                <h4>No Bookmarked Resources</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Bookmark tutorials, CS50, and NPTEL courses from our verified library for instant reference.
                </p>
                <Link to="/learning-resources" className="btn btn-sm btn-secondary">
                  Browse Resource Library
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row: Upcoming Opportunities & Recent Quiz Scores */}
        <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
          {/* Upcoming Opportunities */}
          <div className="card">
            <div className="card-section-title">
              <Calendar size={20} className="text-primary" />
              <h3>Upcoming Verified Opportunities</h3>
            </div>
            {upcoming.length > 0 ? (
              <div className="dashboard-opps-list">
                {upcoming.map((opp) => (
                  <div key={opp.id} className="dashboard-opp-item">
                    <div>
                      <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>{opp.category}</span>
                      <h4 className="dash-opp-title">{opp.title}</h4>
                      {opp.deadline && (
                        <span className="dash-opp-deadline">
                          Deadline: {new Date(opp.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <a
                      href={opp.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                      <span>Details</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No active opportunities found.</p>
            )}
            <Link to="/opportunities" className="view-all-link">
              <span>Explore all opportunities</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Recent Quiz Scores */}
          <div className="card">
            <div className="card-section-title">
              <Award size={20} className="text-secondary" />
              <h3>Recent Quiz Scores</h3>
            </div>
            {recentQuizzes.length > 0 ? (
              <div className="dashboard-quizzes-list">
                {recentQuizzes.map((q) => (
                  <div key={q.id} className="dashboard-quiz-item">
                    <div>
                      <span className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>{q.topic}</span>
                      <h4 className="dash-quiz-score">
                        {q.score} / {q.total_questions} Correct ({q.percentage}%)
                      </h4>
                      <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                        Attempted on {new Date(q.attempted_at).toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`badge ${parseFloat(q.percentage) >= 70 ? 'badge-success' : 'badge-warning'}`}>
                      {parseFloat(q.percentage) >= 70 ? 'Passed' : 'Needs Practice'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-sub-state">
                <Award size={36} className="text-muted" style={{ margin: '0 auto 0.75rem auto' }} />
                <h4>No Quizzes Attempted Yet</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Test your Programming, SQL, and Aptitude fundamentals to build placement confidence.
                </p>
                <Link to="/tests-practice" className="btn btn-sm btn-secondary">
                  Take a Quick Quiz
                </Link>
              </div>
            )}
            <Link to="/tests-practice" className="view-all-link">
              <span>Practice more tests</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
