import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Compass,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Info,
  Award,
  Sparkles,
  HelpCircle,
  BarChart3,
  ShieldCheck,
  Cpu,
  Layers,
  Search,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

const questionsConfig = [
  {
    id: 'coding_software',
    title: '1. Coding and Software Development',
    sub: 'Writing application code in languages like Java, Python, C++, or JavaScript, building software modules, and resolving bugs.',
    defaultValue: 4
  },
  {
    id: 'math_statistics',
    title: '2. Mathematics and Statistics',
    sub: 'Working with linear algebra, matrices, probability, calculus, and evaluating quantitative models.',
    defaultValue: 4
  },
  {
    id: 'ai_ml',
    title: '3. AI and Machine Learning',
    sub: 'Training deep neural networks, computer vision, natural language processing, and building predictive intelligent systems.',
    defaultValue: 4
  },
  {
    id: 'data_analysis',
    title: '4. Data Analysis & Insights',
    sub: 'Extracting actionable metrics from business databases with SQL, identifying data trends, and creating executive dashboards.',
    defaultValue: 3
  },
  {
    id: 'electronics_hardware',
    title: '5. Electronics and Hardware',
    sub: 'Interfacing with physical microcontrollers (ESP32/STM32), silicon circuits, IoT sensor buses, and embedded firmware.',
    defaultValue: 3
  },
  {
    id: 'networks_cybersecurity',
    title: '6. Networks and Cybersecurity',
    sub: 'Analyzing communication protocols (TCP/IP), ethical hacking, auditing vulnerabilities, and safeguarding systems against threats.',
    defaultValue: 3
  },
  {
    id: 'web_ui_design',
    title: '7. Designing Websites and Interfaces',
    sub: 'Crafting responsive user interfaces, frontend component architecture in React/CSS, and user experience design.',
    defaultValue: 4
  },
  {
    id: 'problem_solving_algorithms',
    title: '8. Problem-Solving and Algorithms',
    sub: 'Optimizing algorithmic time and space complexity, dynamic programming, tree traversals, and competitive logic puzzles.',
    defaultValue: 4
  }
];

export default function InterestFinderPage() {
  const { student, updateStudentProfile } = useAuth();
  const navigate = useNavigate();

  // State with 8 core interest dimensions
  const [formData, setFormData] = useState({
    coding_software: 4,
    math_statistics: 4,
    ai_ml: 4,
    data_analysis: 3,
    electronics_hardware: 3,
    networks_cybersecurity: 3,
    web_ui_design: 4,
    problem_solving_algorithms: 4
  });

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [savingCareerId, setSavingCareerId] = useState(null);

  const handleSliderChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseInt(value, 10)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsEvaluating(true);

    try {
      const res = await api.post('/careers/evaluate-interests', formData);
      if (res.success && res.recommendations) {
        setResults(res);
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      setError(err.message || 'Failed to evaluate interests. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSelectCareer = async (careerId, slug) => {
    try {
      setSavingCareerId(careerId);
      if (student) {
        await api.post('/progress/set-career', { career_id: careerId });
        await updateStudentProfile({ target_career_id: careerId });
      }
      navigate(`/career-roadmap/${slug}`);
    } catch (err) {
      console.error('Failed to set career:', err);
      navigate(`/career-roadmap/${slug}`);
    } finally {
      setSavingCareerId(null);
    }
  };

  return (
    <div className="interest-finder-page">
      {/* Header Banner */}
      <section className="page-header-banner">
        <div className="container">
          <span className="badge badge-primary">CAREER DISCOVERY QUESTIONNAIRE</span>
          <h1 className="page-header-title">B.Tech Career Interest Finder</h1>
          <p className="page-header-subtitle">
            Answer 8 simple questions about your interests in coding, mathematics, AI/ML, data analysis, hardware, cybersecurity, UI design, and algorithmic problem-solving.
            Discover potential pathways tailored to your technical curiosities.
          </p>
        </div>
      </section>

      <div className="container section-padding">
        {/* Transparent Methodology Advisory */}
        <div className="alert alert-info" role="status" style={{ marginBottom: '2rem' }}>
          <Info size={22} style={{ flexShrink: 0 }} />
          <div>
            <strong>Exploratory Guidance Notice:</strong> This questionnaire is designed to help you explore career possibilities based on your current interests. It does <em>not</em> scientifically or permanently dictate your career path. You are encouraged to explore any of the 13 career roadmaps and update your choices whenever you wish.
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            <div>{error}</div>
          </div>
        )}

        {/* Assessment Form Card */}
        <div className="card" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} noValidate>
            {questionsConfig.map((q) => (
              <div key={q.id} className="question-block">
                <div className="question-header">
                  <div>
                    <label htmlFor={`q-${q.id}`} className="question-label">
                      {q.title}
                    </label>
                    <p className="question-sub">{q.sub}</p>
                  </div>
                </div>
                <div className="slider-wrapper">
                  <input
                    id={`q-${q.id}`}
                    type="range"
                    min="1"
                    max="5"
                    value={formData[q.id]}
                    onChange={(e) => handleSliderChange(q.id, e.target.value)}
                    className="rating-slider"
                  />
                  <div className="rating-labels">
                    <span>1 (Dislike)</span>
                    <span>2 (Low)</span>
                    <span>3 (Moderate)</span>
                    <span>4 (High)</span>
                    <span className="active-rating">5 (Passionate: {formData[q.id]}/5)</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="assessment-submit-row">
              <button
                type="submit"
                disabled={isEvaluating}
                className="btn btn-primary btn-lg btn-block"
              >
                {isEvaluating ? (
                  <>
                    <div className="spinner-sm"></div>
                    <span>Calculating Transparent Recommendations...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Evaluate Career Compatibility</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Recommendation Results Section */}
        {results && (
          <div id="results-section" className="results-wrapper">
            <div className="results-intro card">
              <div className="results-intro-top">
                <div className="sparkle-circle">
                  <Award size={26} className="text-primary" />
                </div>
                <div>
                  <h2 className="results-title">Your Tailored Career Recommendations</h2>
                  <p className="results-subtitle">
                    Algorithm: {results.algorithm} ({results.total_careers_evaluated} engineering paths evaluated)
                  </p>
                </div>
              </div>

              {/* Crucial Ethical Guidance Disclaimer */}
              <div className="assessment-disclaimer-box">
                <AlertCircle size={18} className="text-warning" />
                <p className="disclaimer-text">{results.disclaimer}</p>
              </div>
            </div>

            {/* Top Recommendations Cards */}
            <div className="recommendations-grid">
              {results.recommendations.map((rec, index) => (
                <div key={rec.career_id} className={`card rec-card ${index === 0 ? 'top-match' : ''}`}>
                  {index === 0 && (
                    <div className="top-match-badge">
                      <Sparkles size={14} />
                      <span>Highest Compatibility Match</span>
                    </div>
                  )}

                  <div className="rec-card-header">
                    <div>
                      <span className="badge badge-secondary">{rec.category}</span>
                      <h3 className="rec-career-title">{rec.title}</h3>
                      <span className="salary-pill">{rec.avg_package_range}</span>
                    </div>
                    <div className="rec-score-bubble">
                      <span className="score-percentage">{rec.match_percentage}%</span>
                      <span className="score-label">Fit</span>
                    </div>
                  </div>

                  <p className="rec-description">{rec.short_description}</p>

                  {/* Why this career is recommended */}
                  <div className="matching-factors-box">
                    <span className="factors-title">Why this is recommended for you:</span>
                    <ul className="factors-list">
                      {rec.matching_factors.map((factor, fIdx) => (
                        <li key={fIdx} className="factor-item">
                          <CheckCircle2 size={15} className="text-success" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {rec.prerequisites_non_branch && (
                    <div className="rec-prereq-note">
                      <strong>Non-Branch Note:</strong> {rec.prerequisites_non_branch}
                    </div>
                  )}

                  <div className="rec-card-actions">
                    <button
                      onClick={() => handleSelectCareer(rec.career_id, rec.slug)}
                      disabled={savingCareerId === rec.career_id}
                      className="btn btn-primary btn-block"
                    >
                      <span>Choose Career & View 4-Year Roadmap</span>
                      <ArrowRight size={16} />
                    </button>
                    <Link to={`/career-roadmap/${rec.slug}`} className="btn btn-outline btn-block">
                      Preview Roadmap First
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* All Remaining Careers Exploration */}
            {results.all_results && results.all_results.length > 4 && (
              <div className="all-careers-fallback card">
                <h3 className="section-title">Explore All Other Career Paths</h3>
                <p className="section-sub">
                  You are never locked into your top recommendation. Explore the full curriculum of any engineering career independently:
                </p>
                <div className="all-careers-pills">
                  {results.all_results.slice(4).map(c => (
                    <Link
                      key={c.career_id}
                      to={`/career-roadmap/${c.slug}`}
                      className="career-pill-link"
                    >
                      <span>{c.title}</span>
                      <span className="pill-pct">{c.match_percentage}%</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
