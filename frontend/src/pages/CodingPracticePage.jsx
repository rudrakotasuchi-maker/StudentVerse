import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Code,
  Terminal,
  ExternalLink,
  Search,
  CheckCircle2,
  Circle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Copy,
  Check,
  Award,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';

const languages = [
  'All',
  'Java',
  'Python',
  'C / C++',
  'JavaScript',
  'SQL',
  'Web & React'
];

const externalPlatforms = [
  {
    name: 'LeetCode',
    description: 'Premier platform for DSA, algorithmic problem solving & technical interview preparation.',
    url: 'https://leetcode.com/',
    badge: 'Interview Standard'
  },
  {
    name: 'HackerRank',
    description: 'Structured domains for language basics, problem solving certifications & contests.',
    url: 'https://www.hackerrank.com/',
    badge: 'Skill Certifications'
  },
  {
    name: 'GeeksforGeeks',
    description: 'Comprehensive tutorials, DSA theory, practice tracks & company-specific question sets.',
    url: 'https://www.geeksforgeeks.org/',
    badge: 'Detailed Explanations'
  },
  {
    name: 'CodeChef',
    description: 'Competitive programming challenges, division ratings, and timed monthly contests.',
    url: 'https://www.codechef.com/',
    badge: 'Competitive Rating'
  },
  {
    name: 'freeCodeCamp',
    description: 'Interactive browser-based web development, JavaScript algorithms & responsive projects.',
    url: 'https://www.freecodecamp.org/',
    badge: 'Beginner Friendly'
  }
];

export default function CodingPracticePage() {
  const { student, isAuthenticated } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Expandable states for each exercise
  const [expandedSolutions, setExpandedSolutions] = useState(new Set());
  const [expandedHints, setExpandedHints] = useState(new Set());
  const [copiedId, setCopiedId] = useState(null);

  // Student solved state saved in localStorage
  const storageKey = `studentverse_solved_${student?.id || 'guest'}`;
  const [solvedIds, setSolvedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const loadExercises = async () => {
    try {
      setIsLoading(true);
      const params = {
        language: selectedLanguage !== 'All' ? selectedLanguage : undefined,
        difficulty: selectedDifficulty !== 'All' ? selectedDifficulty : undefined,
        search: searchQuery.trim() || undefined
      };
      const res = await api.get('/dashboard/coding-practice', params);
      if (res.success && res.exercises) {
        setExercises(res.exercises);
      }
    } catch (err) {
      console.error('Failed to load coding exercises:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExercises();
  }, [selectedLanguage, selectedDifficulty]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadExercises();
  };

  const toggleSolution = (id) => {
    setExpandedSolutions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleHints = (id) => {
    setExpandedHints(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSolved = (id) => {
    setSolvedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(storageKey, JSON.stringify([...next]));
      } catch (e) {
        console.warn('Could not save solved state to localStorage:', e);
      }
      return next;
    });
  };

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const solvedCount = exercises.filter(e => solvedIds.has(e.id)).length;
  const progressPercent = exercises.length > 0 ? Math.round((solvedCount / exercises.length) * 100) : 0;

  return (
    <div className="coding-practice-page">
      {/* Header Banner */}
      <section className="page-header-banner">
        <div className="container">
          <span className="badge badge-primary">PRACTICAL CODING & PROBLEM SOLVING</span>
          <h1 className="page-header-title">Engineering Coding Practice Hub</h1>
          <p className="page-header-subtitle">
            Curated exercises in Java, Python, C/C++, JavaScript, SQL, and Web Development with step-by-step hints, working solutions, and official platform links.
          </p>
        </div>
      </section>

      <div className="container section-padding">
        {/* Recommended External Coding Platforms Directory */}
        <section className="card" style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={20} className="text-primary" />
                <span>Industry Practice & Competitive Programming Platforms</span>
              </h3>
              <p className="text-muted" style={{ fontSize: '0.88rem', margin: '0.2rem 0 0 0' }}>
                StudentVerse curates exercises and directly guides you to reputable external platforms where tech companies recruit:
              </p>
            </div>
            <span className="badge badge-secondary">External Link Directory</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
            {externalPlatforms.map((plat) => (
              <a
                key={plat.name}
                href={plat.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{
                  padding: '1rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all 0.2s ease',
                  background: 'var(--bg-main)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--primary)' }}>{plat.name}</strong>
                  <ExternalLink size={14} className="text-muted" />
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
                  {plat.description}
                </p>
                <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>
                  {plat.badge}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Progress Tracker Card */}
        <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Award size={20} className="text-success" />
              <strong style={{ fontSize: '1.1rem' }}>Your Coding Practice Progress</strong>
            </div>
            <p className="text-muted" style={{ fontSize: '0.88rem', margin: 0 }}>
              Completed {solvedCount} of {exercises.length} available exercises ({progressPercent}%)
            </p>
          </div>
          <div style={{ minWidth: '220px', flex: 1, maxWidth: '350px' }}>
            <div className="progress-bar-container" style={{ height: '10px' }}>
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%`, background: 'var(--success)' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="practice-filters-wrapper" style={{ marginBottom: '2rem' }}>
          {/* Language Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                className={`btn btn-sm ${selectedLanguage === lang ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Difficulty & Search Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Difficulty:</span>
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                <button
                  key={diff}
                  type="button"
                  className={`btn btn-sm ${selectedDifficulty === diff ? 'btn-secondary' : 'btn-outline'}`}
                  style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: 1, maxWidth: '360px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search problem topic or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '0.88rem' }}
              />
              <button type="submit" className="btn btn-sm btn-primary">
                <Search size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Exercises List */}
        {isLoading ? (
          <div className="loading-state" style={{ minHeight: '30vh' }}>
            <div className="spinner"></div>
            <p>Loading curated coding exercises...</p>
          </div>
        ) : exercises.length === 0 ? (
          <div className="empty-state card" style={{ padding: '3rem', textAlign: 'center' }}>
            <HelpCircle size={40} className="text-muted" style={{ margin: '0 auto 1rem auto' }} />
            <h4>No exercises match your filter criteria</h4>
            <p className="text-muted">Try selecting a different programming language or difficulty level.</p>
            <button
              className="btn btn-sm btn-outline"
              style={{ marginTop: '1rem' }}
              onClick={() => { setSelectedLanguage('All'); setSelectedDifficulty('All'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {exercises.map((item) => {
              const isSolved = solvedIds.has(item.id);
              const isSolutionOpen = expandedSolutions.has(item.id);
              const isHintsOpen = expandedHints.has(item.id);

              return (
                <div
                  key={item.id}
                  className="card"
                  style={{
                    padding: '1.5rem',
                    border: isSolved ? '1px solid var(--success)' : '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                    background: 'var(--bg-card)'
                  }}
                >
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                        <span className="badge badge-primary">{item.language}</span>
                        <span className="badge badge-secondary">{item.topic}</span>
                        <span
                          className={`badge ${
                            item.difficulty === 'Beginner' ? 'badge-success' : item.difficulty === 'Intermediate' ? 'badge-warning' : 'badge-danger'
                          }`}
                        >
                          {item.difficulty}
                        </span>
                        {isSolved && (
                          <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <CheckCircle2 size={12} />
                            <span>Solved</span>
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                        {item.title}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => toggleSolved(item.id)}
                        className={`btn btn-sm ${isSolved ? 'btn-success' : 'btn-outline'}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        {isSolved ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                        <span>{isSolved ? 'Marked Solved' : 'Mark as Solved'}</span>
                      </button>

                      {item.external_url && (
                        <a
                          href={item.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline"
                          title={`Solve on ${item.external_platform}`}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                        >
                          <span>{item.external_platform}</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Problem Statement */}
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {item.problem_statement}
                  </p>

                  {/* Sample Input & Output */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ background: 'var(--bg-main)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                        Sample Input:
                      </span>
                      <code style={{ display: 'block', marginTop: '0.25rem', fontSize: '0.88rem', color: 'var(--primary)' }}>
                        {item.sample_input}
                      </code>
                    </div>

                    <div style={{ background: 'var(--bg-main)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                        Sample Output:
                      </span>
                      <code style={{ display: 'block', marginTop: '0.25rem', fontSize: '0.88rem', color: 'var(--success)' }}>
                        {item.sample_output}
                      </code>
                    </div>
                  </div>

                  {/* Hints Section */}
                  {item.hints && item.hints.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => toggleHints(item.id)}
                        className="btn btn-sm btn-outline"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem' }}
                      >
                        <Lightbulb size={14} className="text-warning" />
                        <span>{isHintsOpen ? 'Hide Hints' : `Show Hints (${item.hints.length})`}</span>
                        {isHintsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {isHintsOpen && (
                        <div style={{ marginTop: '0.75rem', background: 'rgba(245, 158, 11, 0.08)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #f59e0b' }}>
                          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                            {item.hints.map((hint, hIdx) => (
                              <li key={hIdx}>{hint}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Solution Accordion */}
                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => toggleSolution(item.id)}
                        className="btn btn-sm btn-secondary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <Code size={16} />
                        <span>{isSolutionOpen ? 'Hide Working Solution' : 'View Working Solution & Explanation'}</span>
                        {isSolutionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {isSolutionOpen && (
                        <button
                          type="button"
                          onClick={() => handleCopyCode(item.id, item.solution_code)}
                          className="btn btn-sm btn-outline"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                        >
                          {copiedId === item.id ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                          <span>{copiedId === item.id ? 'Copied!' : 'Copy Code'}</span>
                        </button>
                      )}
                    </div>

                    {isSolutionOpen && (
                      <div style={{ marginTop: '1rem' }}>
                        {item.explanation && (
                          <div style={{ marginBottom: '0.75rem', padding: '0.75rem 1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                            <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '0.2rem' }}>
                              Algorithmic Approach & Explanation:
                            </strong>
                            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{item.explanation}</p>
                          </div>
                        )}

                        <div style={{ position: 'relative' }}>
                          <pre
                            style={{
                              background: '#1e1e2e',
                              color: '#cdd6f4',
                              padding: '1.25rem',
                              borderRadius: 'var(--radius-md)',
                              overflowX: 'auto',
                              fontSize: '0.88rem',
                              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                              lineHeight: 1.5,
                              margin: 0
                            }}
                          >
                            <code>{item.solution_code}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
