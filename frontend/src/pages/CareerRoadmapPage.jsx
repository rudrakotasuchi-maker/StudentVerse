import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Compass,
  CheckCircle,
  CheckCircle2,
  Circle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award,
  ExternalLink,
  Target,
  Sparkles,
  Calendar,
  X,
  Info,
  ListOrdered,
  CheckSquare,
  Code2,
  FileQuestion,
  Hammer,
  HelpCircle,
  Cpu
} from 'lucide-react';

function renderClickableResources(text) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s),]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
          onClick={(e) => e.stopPropagation()}
        >
          <span>{part}</span>
          <ExternalLink size={13} />
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

const yearHeaders = {
  1: {
    title: 'Year 1: Foundational Academics & Core Logic',
    subtitle: 'Build algorithmic problem solving, discrete math, and procedural programming basics.'
  },
  2: {
    title: 'Year 2: Data Structures, Hardware & Core Engineering',
    subtitle: 'Deepen core branch expertise, system memory models, and fundamental algorithms.'
  },
  3: {
    title: 'Year 3: Advanced Projects, Frameworks & Internships',
    subtitle: 'Build portfolio deliverables, contribute to open-source, and apply for summer internships.'
  },
  4: {
    title: 'Year 4: Placement Drives, System Design & GATE Launch',
    subtitle: 'High-level architectures, timed mock interviews, competitive exam revision, and final defense.'
  }
};

const catchUpGuidance = {
  1: {
    tag: 'Year 1 Focus: First-Year Confusion to Solid Foundations',
    summary: 'Starting your engineering journey with zero prior coding or academic confusion? Here is your zero-to-one guide:',
    points: [
      'Focus on programming fundamentals (C/C++ or Python) and understanding memory/pointers before learning advanced frameworks.',
      'Practice 1-2 logic problems daily on loops, recursion, and basic math rather than cramming syntax.',
      'Set up Git and GitHub immediately and push every assignment or practice script to build your portfolio streak.',
      'Maintain an 8.0+ CGPA; 1st-year semester GPA is the easiest to build and provides a strong buffer for later placement cutoffs.'
    ]
  },
  2: {
    tag: 'Year 2 Focus: Catch-Up Bridge Strategy (Entering in 2nd Year)',
    summary: 'Starting career prep in 2nd year or missed Year 1 coding fundamentals? Follow this 4-week catch-up bridge:',
    points: [
      'Bridge Strategy: Spend 3-4 weeks brushing up on procedural programming (arrays, loops, functions) and Git basics alongside coursework.',
      'Do not delay Data Structures & Algorithms (DSA): Begin Arrays, Linked Lists, Stacks, and Trees immediately in your 3rd semester.',
      'Align academic subjects with placement tests: Pay extra attention to your university courses in OOP, DBMS, OS, and Computer Networks.',
      'Build your first functional mini-project (CLI tool or database application) by the end of 2nd year.'
    ]
  },
  3: {
    tag: 'Year 3 Focus: Accelerated Internship & Project Sprint (Entering in 3rd Year)',
    summary: 'Starting career prep in 3rd year? Fast-track your readiness with this focused roadmap:',
    points: [
      'Targeted DSA: Focus on top 75 interview patterns (Two Pointers, Sliding Window, Binary Search, Trees, Graphs) instead of randomly grinding 500 problems.',
      'Build 1-2 production-grade full-stack or domain projects with clean documentation, live deployment, and GitHub READMEs.',
      'Prepare your resume by month 5 and actively apply for summer internships through LinkedIn, official career pages, and hackathons.',
      'Form or join a team for national competitions like Smart India Hackathon (SIH) or open-source programs like GSoC.'
    ]
  },
  4: {
    tag: 'Year 4 Focus: Final Placement & Career Launch Sprint (Entering in 4th Year)',
    summary: 'In your final year? Prioritize high-impact placement readiness and interview conversion:',
    points: [
      '60-Day Placement Sprint: Solve company-specific previous interview questions and master quantitative/logical aptitude tests.',
      'Create an ATS-friendly single-page resume with measurable project bullet points (metrics, technologies, and results).',
      'Conduct weekly timed mock technical interviews and prepare behavioral answers using the STAR method.',
      'Simultaneously prepare for GATE/PSU exams or off-campus recruitment drives if aiming for public sector or research roles.'
    ]
  }
};

const technologySubtopics = {
  java: {
    name: 'Java Programming',
    topics: [
      'Variables and data types (primitive vs non-primitive)',
      'Operators (arithmetic, relational, logical, bitwise)',
      'Conditional statements (if-else, switch-case)',
      'Loops (for, while, do-while, enhanced for-each)',
      'Methods and parameter passing (pass-by-value)',
      'Arrays (1D, 2D) and String manipulation (String, StringBuilder, StringBuffer)',
      'Object-Oriented Programming (Classes, Objects, Constructors)',
      'Inheritance and Polymorphism (method overloading vs overriding)',
      'Interfaces and Abstract classes',
      'Exception handling (try-catch-finally, custom exceptions, throw vs throws)',
      'Collections framework (List, Set, Map, Queue, ArrayList vs LinkedList)',
      'Generics and Type Safety',
      'File handling (FileReader, FileWriter, BufferedReader, NIO)',
      'Advanced concepts (Multithreading, Streams API, Lambda expressions)'
    ]
  },
  python: {
    name: 'Python Programming',
    topics: [
      'Syntax, dynamic typing, and variables',
      'Data types (int, float, complex, bool, str)',
      'Conditions (if-elif-else) and loops (for, while, range, enumerate)',
      'Functions, default arguments, *args and **kwargs',
      'Lists, tuples, sets, and dictionaries (comprehensions & slicing)',
      'String methods, formatting (f-strings), and regex basics',
      'Modules, packages, and virtual environments (venv)',
      'File handling (with open(), reading/writing CSV & JSON)',
      'Exception handling (try-except-else-finally, custom exceptions)',
      'Object-Oriented Programming (Classes, self, __init__, inheritance, dunder methods)',
      'Career-specific libraries (NumPy, Pandas, Matplotlib, Requests)'
    ]
  },
  html: {
    name: 'HTML5 Semantic Web',
    topics: [
      'Elements, tags, attributes, and document tree structure',
      'Headings, paragraphs, text formatting, and typography',
      'Hyperlinks (href, target, rel), image optimization (alt, loading="lazy")',
      'Ordered, unordered, description lists, and data tables',
      'Forms, input types (text, email, password, date), labels, and validation',
      'Semantic HTML (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>)',
      'Web accessibility fundamentals (WCAG, ARIA labels, keyboard navigability)'
    ]
  },
  css: {
    name: 'Modern CSS3 Layouts',
    topics: [
      'Selectors (class, ID, attribute, pseudo-classes, pseudo-elements)',
      'Colors, hex, rgba, and web typography (Google Fonts, line-height)',
      'Box Model (content, padding, border, margin, box-sizing: border-box)',
      'Margins, padding, and collapsible margins',
      'Positioning (static, relative, absolute, fixed, sticky, z-index)',
      'Flexbox (flex-direction, justify-content, align-items, flex-wrap, gap)',
      'CSS Grid (grid-template-columns, fr units, grid-area, auto-fit/minmax)',
      'Responsive design with media queries & mobile-first architecture',
      'CSS transitions, transforms, keyframe animations, and custom variables'
    ]
  },
  javascript: {
    name: 'Modern JavaScript (ES6+)',
    topics: [
      'Variables (var, let, const) and lexical scope',
      'Data types and type coercion (typeof, null vs undefined, == vs ===)',
      'Operators and truthy/falsy evaluation',
      'Conditions and loops (for...of, for...in, break, continue)',
      'Functions, arrow functions, and the `this` context',
      'Arrays and Objects (destructuring, spread & rest operators)',
      'Array methods (map, filter, reduce, find, some, every, sort)',
      'DOM manipulation (querySelector, createElement, classList)',
      'Event listeners, event bubbling, and event delegation',
      'ES6+ modules (import/export), template literals, and optional chaining',
      'Asynchronous programming: Promises, chaining, and error handling',
      'Async/await syntax with try/catch blocks',
      'Fetch API and HTTP request methods (GET, POST, PUT, DELETE)',
      'JavaScript Event Loop (call stack, web APIs, microtask vs macrotask queues)'
    ]
  },
  react: {
    name: 'React.js Component Architecture',
    topics: [
      'Components (functional components vs class components)',
      'JSX syntax, expressions, and fragments',
      'Props (passing data, default props, prop drilling)',
      'State management (component local state vs global state)',
      'Event handling and synthetic events',
      'useState hook for reactive UI updates',
      'useEffect hook (side effects, dependencies, and cleanup functions)',
      'Controlled forms, input bindings, and form validation',
      'Lists and keys (rendering arrays, why keys matter for reconciliation)',
      'React Router (BrowserRouter, Routes, Route, Link, useParams, useNavigate)',
      'REST API integration with Fetch / Axios inside useEffect',
      'Reusable component design, layout wrappers, and custom hooks'
    ]
  },
  node: {
    name: 'Node.js & Express.js Backend',
    topics: [
      'Node.js runtime fundamentals and single-threaded event loop',
      'CommonJS (require) vs ES Modules (import)',
      'Creating HTTP servers and handling request/response objects',
      'Express.js setup, application configuration, and environment variables',
      'RESTful routing architecture (GET, POST, PUT, DELETE)',
      'Middleware (application-level, router-level, error-handling, body-parser, cors)',
      'REST API design conventions, status codes (200, 201, 400, 401, 404, 500)',
      'Request validation and sanitization',
      'Centralized error handling middleware',
      'Relational and document database integration (MySQL / MongoDB)'
    ]
  },
  sql: {
    name: 'MySQL & Relational Databases',
    topics: [
      'Database and table creation (CREATE DATABASE, CREATE TABLE, ALTER, DROP)',
      'SQL data types (INT, VARCHAR, TEXT, TIMESTAMP, BOOLEAN, DECIMAL)',
      'Primary keys and Auto-Increment',
      'Foreign keys, referential integrity, and ON DELETE CASCADE/SET NULL',
      'CRUD Operations: INSERT, SELECT, UPDATE, DELETE',
      'Filtering & sorting: WHERE, ORDER BY, LIMIT, OFFSET, LIKE',
      'Aggregate functions: COUNT, SUM, AVG, MIN, MAX',
      'Grouping data: GROUP BY and HAVING clauses',
      'Table joins: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN',
      'Database relationships: One-to-One, One-to-Many, Many-to-Many with junction tables',
      'Indexing basics (B-Tree, Clustered vs Non-Clustered) and query optimization'
    ]
  }
};

const getMatchedSubtopics = (topic) => {
  if (!topic) return [];
  const text = `${topic.topic_name} ${topic.tools_technologies || ''} ${topic.description || ''} ${topic.learning_sequence || ''}`.toLowerCase();
  const matched = [];
  if (text.includes('html')) matched.push(technologySubtopics.html);
  if (text.includes('css')) matched.push(technologySubtopics.css);
  if (text.includes('javascript') || text.includes('es6') || text.includes('dom')) matched.push(technologySubtopics.javascript);
  if (text.includes('react')) matched.push(technologySubtopics.react);
  if (text.includes('node') || text.includes('express')) matched.push(technologySubtopics.node);
  if (text.includes('sql') || text.includes('mysql') || text.includes('database') || text.includes('rdbms')) matched.push(technologySubtopics.sql);
  if (text.includes('java ') || text.includes('java,') || text.includes('java/') || text.includes('spring') || text.includes('core java')) matched.push(technologySubtopics.java);
  if (text.includes('python') || text.includes('django') || text.includes('flask') || text.includes('numpy') || text.includes('pandas')) matched.push(technologySubtopics.python);
  
  return Array.from(new Map(matched.map(item => [item.name, item])).values());
};

export default function CareerRoadmapPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { student, isAuthenticated, updateStudentProfile } = useAuth();

  const [allCareers, setAllCareers] = useState([]);
  const [currentCareer, setCurrentCareer] = useState(null);
  const [roadmapByYear, setRoadmapByYear] = useState({ 1: [], 2: [], 3: [], 4: [] });
  const [allTopics, setAllTopics] = useState([]);
  const [completedTopicIds, setCompletedTopicIds] = useState(new Set());
  const [activeYearTab, setActiveYearTab] = useState(student?.academic_year || 1);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [settingTarget, setSettingTarget] = useState(false);
  const [message, setMessage] = useState('');

  // Automatically adapt active year tab to student's current academic year
  useEffect(() => {
    if (student?.academic_year && [1, 2, 3, 4].includes(student.academic_year)) {
      setActiveYearTab(student.academic_year);
    }
  }, [student?.academic_year]);

  // 1. Fetch list of all careers for dropdown
  useEffect(() => {
    async function fetchCareers() {
      try {
        const res = await api.get('/careers');
        if (res.success && res.careers) {
          setAllCareers(res.careers);
        }
      } catch (err) {
        console.error('Failed to load careers:', err);
      }
    }
    fetchCareers();
  }, []);

  // 2. Determine target slug: URL param > student's saved career > default 'software-engineering'
  const targetSlug = slug || student?.target_career_slug || 'software-engineering';

  // 3. Fetch career details & roadmap
  useEffect(() => {
    async function loadRoadmap() {
      try {
        setIsLoading(true);
        const res = await api.get(`/careers/${targetSlug}`);
        if (res.success && res.career) {
          setCurrentCareer(res.career);
          setRoadmapByYear(res.roadmap || { 1: [], 2: [], 3: [], 4: [] });
          setAllTopics(res.allTopics || []);
        }
      } catch (err) {
        console.error('Failed to load roadmap for slug:', targetSlug, err);
      } finally {
        setIsLoading(false);
      }
    }

    loadRoadmap();
  }, [targetSlug]);

  // 4. Fetch student progress if authenticated
  useEffect(() => {
    async function loadProgress() {
      if (!isAuthenticated) return;
      try {
        const res = await api.get('/progress');
        if (res.success && res.completed_topic_ids) {
          setCompletedTopicIds(new Set(res.completed_topic_ids));
        }
      } catch (err) {
        console.error('Failed to load student progress:', err);
      }
    }
    loadProgress();
  }, [isAuthenticated, targetSlug]);

  // Toggle completion of a roadmap topic in MySQL
  const handleToggleTopic = async (topicId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setIsUpdatingProgress(true);
      const res = await api.post('/progress/toggle-topic', { topic_id: topicId });
      if (res.success) {
        setCompletedTopicIds(prev => {
          const next = new Set(prev);
          if (res.completed) {
            next.add(topicId);
          } else {
            next.delete(topicId);
          }
          return next;
        });
      }
    } catch (err) {
      console.error('Failed to toggle topic:', err);
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  // Set as primary target career
  const handleSetPrimaryCareer = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!currentCareer) return;

    try {
      setSettingTarget(true);
      const res = await api.post('/progress/set-career', { career_id: currentCareer.id });
      if (res.success) {
        await updateStudentProfile({ target_career_id: currentCareer.id });
        setMessage(`Selected "${currentCareer.title}" as your primary target career!`);
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      setMessage('Failed to set target career.');
    } finally {
      setSettingTarget(false);
    }
  };

  // Calculate statistics
  const totalTopicsCount = allTopics.length;
  const completedInThisCareer = allTopics.filter(t => completedTopicIds.has(t.id)).length;
  const percentage = totalTopicsCount > 0 ? Math.round((completedInThisCareer / totalTopicsCount) * 100) : 0;

  const isCurrentStudentTarget = student?.target_career_id === currentCareer?.id;

  return (
    <div className="roadmap-page">
      {/* Header Banner */}
      <section className="page-header-banner">
        <div className="container">
          <div className="roadmap-banner-flex">
            <div>
              <span className="badge badge-secondary">4-YEAR STRUCTURED CURRICULUM</span>
              <h1 className="page-header-title">{currentCareer?.title || 'B.Tech Career Roadmap'}</h1>
              <p className="page-header-subtitle">
                {currentCareer?.short_description}
              </p>
            </div>

            {/* Career Selector Dropdown */}
            <div className="career-dropdown-box">
              <label htmlFor="career-select" className="dropdown-label">
                Switch Career Roadmap:
              </label>
              <select
                id="career-select"
                className="form-control"
                value={targetSlug}
                onChange={(e) => navigate(`/career-roadmap/${e.target.value}`)}
              >
                {allCareers.map(c => (
                  <option key={c.id} value={c.slug}>
                    {c.title} ({c.category})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <div className="container section-padding">
        {message && (
          <div className="alert alert-success" role="alert" style={{ marginBottom: '1.5rem' }}>
            <CheckCircle size={20} />
            <div>{message}</div>
          </div>
        )}

        {/* Career Meta Card & Progress Bar */}
        {currentCareer && (
          <div className="card roadmap-progress-card">
            <div className="roadmap-progress-top">
              <div className="career-attributes">
                <span className="badge badge-primary">{currentCareer.category}</span>
                <span className="salary-badge">Avg Package: {currentCareer.avg_package_range}</span>
                <span className="badge badge-neutral">Branch Affinity: {currentCareer.branch_affinity}</span>
              </div>

              {isAuthenticated && !isCurrentStudentTarget && (
                <button
                  onClick={handleSetPrimaryCareer}
                  disabled={settingTarget}
                  className="btn btn-sm btn-primary"
                >
                  <Target size={16} />
                  <span>Set as My Target Career</span>
                </button>
              )}

              {isCurrentStudentTarget && (
                <span className="badge badge-success" style={{ fontSize: '0.85rem' }}>
                  <CheckCircle size={14} />
                  <span>Your Active Target Career</span>
                </span>
              )}
            </div>

            {/* Non-Branch Prerequisites Notice */}
            {currentCareer.prerequisites_non_branch && (
              <div className="non-branch-prereq-box">
                <div className="prereq-badge-row">
                  <Info size={16} className="text-primary" />
                  <strong>Guidance for Students Outside These Branches:</strong>
                </div>
                <p className="prereq-text">{currentCareer.prerequisites_non_branch}</p>
              </div>
            )}

            {/* Progress Visualization */}
            <div className="roadmap-metrics-row">
              <div className="metric-info">
                <span className="metric-title">Persistent Roadmap Progress</span>
                <span className="metric-detail">
                  {completedInThisCareer} of {totalTopicsCount} milestones mastered in MySQL
                </span>
              </div>
              <span className="metric-percentage">{percentage}%</span>
            </div>

            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
            </div>

            <p className="roadmap-overview-text">
              <strong>Career Scope:</strong> {currentCareer.full_overview}
            </p>
            <p className="roadmap-skills-text">
              <strong>Core Competencies:</strong> {currentCareer.key_skills}
            </p>
          </div>
        )}

        {/* Year Level Tab Selector */}
        <div className="year-tabs-wrapper" role="tablist">
          {[1, 2, 3, 4].map((year) => {
            const countForYear = roadmapByYear[year]?.length || 0;
            const completedForYear = roadmapByYear[year]?.filter(t => completedTopicIds.has(t.id)).length || 0;
            const isActive = activeYearTab === year;
            const isStudentCurrentYear = student?.academic_year === year;
            return (
              <button
                key={year}
                role="tab"
                aria-selected={isActive}
                className={`year-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveYearTab(year)}
              >
                <div className="year-tab-title">
                  <span>Year {year}</span>
                  {isStudentCurrentYear && (
                    <span className="current-year-indicator-badge">Your Year</span>
                  )}
                </div>
                <div className="year-tab-sub">
                  {completedForYear}/{countForYear} Completed
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Year Topics Display */}
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading roadmap milestones...</p>
          </div>
        ) : (
          <div className="year-content-container">
            <div className="year-header-card">
              <div className="year-icon-badge">
                <Calendar size={22} />
              </div>
              <div>
                <h3 className="year-headline">{yearHeaders[activeYearTab]?.title}</h3>
                <p className="year-subheadline">{yearHeaders[activeYearTab]?.subtitle}</p>
              </div>
            </div>

            {/* Year-Specific Catch-Up & Fast-Track Bridge Guidance */}
            {catchUpGuidance[activeYearTab] && (
              <div className="year-catchup-card card">
                <div className="year-catchup-header">
                  <Sparkles size={18} className="text-primary" />
                  <h4 className="year-catchup-title">{catchUpGuidance[activeYearTab].tag}</h4>
                </div>
                <p className="year-catchup-summary">{catchUpGuidance[activeYearTab].summary}</p>
                <ul className="catchup-points-list">
                  {catchUpGuidance[activeYearTab].points.map((pt, pIdx) => (
                    <li key={pIdx} className="catchup-point-item">
                      <CheckCircle2 size={16} className="text-success catchup-icon" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="topics-list">
              {roadmapByYear[activeYearTab] && roadmapByYear[activeYearTab].length > 0 ? (
                roadmapByYear[activeYearTab].map((topic, index) => {
                  const isCompleted = completedTopicIds.has(topic.id);
                  return (
                    <div
                      key={topic.id}
                      className={`topic-card card ${isCompleted ? 'topic-completed' : ''}`}
                      onClick={() => setSelectedTopic(topic)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedTopic(topic);
                        }
                      }}
                      title="Click to view full curriculum, exercises, and interview questions"
                    >
                      <div className="topic-card-header" onClick={(e) => e.stopPropagation()}>
                        <div className="topic-number">
                          <span>Milestone {activeYearTab}.{index + 1}</span>
                          <span className="badge badge-neutral" style={{ fontSize: '0.75rem', marginLeft: '0.5rem' }}>
                            12-Section Blueprint
                          </span>
                          {topic.estimated_effort && (
                            <span className="badge badge-info" style={{ fontSize: '0.75rem', marginLeft: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                              <Calendar size={12} />
                              {topic.estimated_effort}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleTopic(topic.id)}
                          className={`btn-complete-toggle ${isCompleted ? 'completed' : ''}`}
                          title={isCompleted ? 'Click to mark as incomplete' : 'Click to mark as completed in MySQL'}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle2 size={18} className="text-success" />
                              <span>Completed</span>
                            </>
                          ) : (
                            <>
                              <Circle size={18} />
                              <span>Mark as Completed</span>
                            </>
                          )}
                        </button>
                      </div>

                      <h4 className="topic-name">{topic.topic_name}</h4>

                      {topic.learning_objective && (
                        <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, margin: '0.35rem 0' }}>
                          🎯 <strong>Objective:</strong> {topic.learning_objective}
                        </div>
                      )}

                      <p className="topic-desc">{topic.description}</p>

                      {topic.tools_technologies && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', margin: '0.5rem 0' }}>
                          {topic.tools_technologies.split(',').map((tool, tIdx) => (
                            <span key={tIdx} style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', background: 'var(--border-light)', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                              {tool.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      {topic.importance && (
                        <div className="topic-highlight-line">
                          <strong>Why it matters:</strong> {topic.importance}
                        </div>
                      )}

                      <div className="topic-card-footer">
                        <span className="explore-blueprint-link">
                          <span>View Step-by-Step Curriculum, Projects & Interview Qs</span>
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-state card">
                  <p>Milestone topics for Year {activeYearTab} are being curated.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 12-Section Pedagogical Milestone Detail Modal */}
      {selectedTopic && (
        <div
          className="topic-modal-overlay"
          onClick={() => setSelectedTopic(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="topic-modal-title"
        >
          <div className="topic-modal-content card" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="topic-modal-header">
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span className="badge badge-primary">
                    Year {selectedTopic.year_level} Milestone
                  </span>
                  {selectedTopic.estimated_effort && (
                    <span className="badge badge-info" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Calendar size={13} />
                      {selectedTopic.estimated_effort}
                    </span>
                  )}
                </div>
                <h3 id="topic-modal-title" className="modal-topic-title">
                  {selectedTopic.topic_name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                className="modal-close-btn"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body with all 12 Pedagogical Sections */}
            <div className="topic-modal-body">
              {/* 1. Core Learning Objective */}
              {selectedTopic.learning_objective && (
                <div className="modal-section-block" style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <h4 className="modal-section-heading">
                    <Target size={18} className="text-primary" />
                    <span>1. Core Learning Objective</span>
                  </h4>
                  <p className="modal-section-text" style={{ fontWeight: 600, color: 'var(--primary-dark, var(--text-main))' }}>
                    {selectedTopic.learning_objective}
                  </p>
                </div>
              )}

              {/* 2. Foundational Explanation */}
              <div className="modal-section-block">
                <h4 className="modal-section-heading">
                  <BookOpen size={18} className="text-primary" />
                  <span>2. Foundational & Beginner-Friendly Explanation</span>
                </h4>
                <p className="modal-section-text">{selectedTopic.description}</p>
              </div>

              {/* 3. Why the Topic is Important */}
              {selectedTopic.importance && (
                <div className="modal-section-block">
                  <h4 className="modal-section-heading">
                    <TrendingUp size={18} className="text-success" />
                    <span>3. Why This Skill is Essential for Career</span>
                  </h4>
                  <p className="modal-section-text">{selectedTopic.importance}</p>
                </div>
              )}

              {/* 4. Prerequisites */}
              {selectedTopic.prerequisites && (
                <div className="modal-section-block">
                  <h4 className="modal-section-heading">
                    <Info size={18} className="text-warning" />
                    <span>4. Knowledge Prerequisites</span>
                  </h4>
                  <p className="modal-section-text">{selectedTopic.prerequisites}</p>
                </div>
              )}

              {/* 5. Concepts in Learning Sequence */}
              {selectedTopic.learning_sequence && (
                <div className="modal-section-block">
                  <h4 className="modal-section-heading">
                    <ListOrdered size={18} className="text-primary" />
                    <span>5. Ordered Syllabus & Systematic Learning Sequence</span>
                  </h4>
                  <div className="learning-sequence-flow">
                    {selectedTopic.learning_sequence.split('->').map((step, sIdx) => (
                      <div key={sIdx} className="sequence-step-pill">
                        <span className="step-idx">{sIdx + 1}</span>
                        <span className="step-label">{step.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Recommended Languages, Tools & Technologies */}
              {selectedTopic.tools_technologies && (
                <div className="modal-section-block">
                  <h4 className="modal-section-heading">
                    <Cpu size={18} className="text-secondary" />
                    <span>6. Recommended Languages, Tools & Technologies</span>
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem' }}>
                    {selectedTopic.tools_technologies.split(',').map((tool, tIdx) => (
                      <span key={tIdx} style={{ padding: '0.3rem 0.75rem', background: 'var(--border-light)', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 600 }}>
                        {tool.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Concrete Subtopics Breakdown (Section 7 Requirement) */}
              {(() => {
                const matched = getMatchedSubtopics(selectedTopic);
                if (!matched || matched.length === 0) return null;
                return (
                  <div className="modal-section-block" style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <h4 className="modal-section-heading" style={{ color: '#0f172a', marginBottom: '0.4rem' }}>
                      <Code2 size={18} className="text-primary" />
                      <span>In-Depth Technology Syllabus & Subtopic Breakdown</span>
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                      Never just learn a tool at a surface level. Ensure you master each foundational concept and syntax component below:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                      {matched.map(tech => (
                        <div key={tech.name} style={{ background: '#ffffff', padding: '0.85rem', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                          <h5 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-color, #2563eb)' }}></span>
                            {tech.name} Core Syllabus
                          </h5>
                          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#334155', lineHeight: '1.5' }}>
                            {tech.topics.map((sub, sIdx) => (
                              <li key={sIdx}>{sub}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* 7. Recommended Learning Resources */}
              {selectedTopic.recommended_resources && (
                <div className="modal-section-block">
                  <h4 className="modal-section-heading">
                    <Compass size={18} className="text-secondary" />
                    <span>7. Verified Free Learning Resources</span>
                  </h4>
                  <div className="resources-links-box">
                    <p className="modal-section-text">{renderClickableResources(selectedTopic.recommended_resources)}</p>
                  </div>
                </div>
              )}

              {/* 8. Practice Questions & Exercises */}
              {selectedTopic.practice_exercises && (
                <div className="modal-section-block">
                  <h4 className="modal-section-heading">
                    <Code2 size={18} className="text-info" />
                    <span>8. Practice Drills & Concrete Exercises</span>
                  </h4>
                  <p className="modal-section-text">{selectedTopic.practice_exercises}</p>
                </div>
              )}

              {/* 9. Mini-Project Suggestions */}
              {selectedTopic.mini_project && (
                <div className="modal-section-block">
                  <h4 className="modal-section-heading">
                    <Hammer size={18} className="text-primary" />
                    <span>9. Hands-on Mini-Project Deliverable</span>
                  </h4>
                  <div className="mini-project-box">
                    <p className="modal-section-text">
                      <strong>Portfolio Deliverable:</strong> {selectedTopic.mini_project}
                    </p>
                  </div>
                </div>
              )}

              {/* 10. Completion Criteria */}
              {selectedTopic.completion_criteria && (
                <div className="modal-section-block">
                  <h4 className="modal-section-heading">
                    <CheckSquare size={18} className="text-success" />
                    <span>10. Milestone Completion Criteria</span>
                  </h4>
                  <p className="modal-section-text">{selectedTopic.completion_criteria}</p>
                </div>
              )}

              {/* 11. Relevant Interview Questions */}
              {selectedTopic.interview_questions && (
                <div className="modal-section-block">
                  <h4 className="modal-section-heading">
                    <HelpCircle size={18} className="text-warning" />
                    <span>11. Real Technical Interview Preparation</span>
                  </h4>
                  <div className="interview-questions-box">
                    <p className="modal-section-text">{selectedTopic.interview_questions}</p>
                  </div>
                </div>
              )}

              {/* 12. Estimated Effort & Suggested Schedule */}
              {selectedTopic.estimated_effort && (
                <div className="modal-section-block">
                  <h4 className="modal-section-heading">
                    <Calendar size={18} className="text-info" />
                    <span>12. Estimated Effort & Suggested Weekly Schedule</span>
                  </h4>
                  <p className="modal-section-text">{selectedTopic.estimated_effort}</p>
                </div>
              )}

              {/* Suggested Next Step */}
              {selectedTopic.suggested_next_step && (
                <div className="modal-section-block next-step-summary">
                  <h4 className="modal-section-heading">
                    <ArrowRight size={18} />
                    <span>Suggested Next Action</span>
                  </h4>
                  <p className="modal-section-text">{selectedTopic.suggested_next_step}</p>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="topic-modal-footer">
              <button
                type="button"
                onClick={() => handleToggleTopic(selectedTopic.id)}
                className={`btn ${completedTopicIds.has(selectedTopic.id) ? 'btn-success' : 'btn-primary'}`}
                disabled={isUpdatingProgress}
              >
                {completedTopicIds.has(selectedTopic.id) ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Marked as Completed in MySQL</span>
                  </>
                ) : (
                  <>
                    <Circle size={18} />
                    <span>Mark Milestone as Completed</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                className="btn btn-outline"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
