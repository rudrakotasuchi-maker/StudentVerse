import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Briefcase,
  Code,
  FileText,
  CheckSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  Search,
  ExternalLink,
  Award,
  Sparkles,
  BookOpen,
  Target,
  BrainCircuit,
  MessageSquare,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function ProjectPlacementPrepPage() {
  const [prepData, setPrepData] = useState(null);
  const [activeSection, setActiveSection] = useState('projects'); // 'projects', 'interview', 'strategy', 'resume', 'checklist'
  const [projectSearch, setProjectSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [interviewCategory, setInterviewCategory] = useState('All');
  const [interviewSearch, setInterviewSearch] = useState('');
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('studentverse_placement_checklist');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [projectStatus, setProjectStatus] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('studentverse_project_status') || '{}');
    } catch {
      return {};
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const res = await api.get('/dashboard/prep-materials');
        if (res.success) {
          setPrepData(res);
        }
      } catch (err) {
        console.error('Failed to load prep materials:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleAccordion = (id) => {
    setExpandedQuestionId(prev => (prev === id ? null : id));
  };

  const toggleChecklistItem = (id) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('studentverse_placement_checklist', JSON.stringify(Array.from(next)));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleStatusChange = (projectId, status) => {
    const updated = { ...projectStatus, [projectId]: status };
    setProjectStatus(updated);
    try {
      localStorage.setItem('studentverse_project_status', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const projects = prepData?.project_ideas || [];
  const interviewQuestions = prepData?.interview_prep?.technical_questions || [];
  const resumeGuidelines = prepData?.interview_prep?.resume_guidelines || [];
  const placementChecklist = prepData?.interview_prep?.placement_checklist || [];

  // Filter Projects
  const filteredProjects = projects.filter(p => {
    const term = projectSearch.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(term) ||
                          (p.domain && p.domain.toLowerCase().includes(term)) ||
                          (p.required_tech && p.required_tech.some(t => t.toLowerCase().includes(term)));
    const matchesLevel = levelFilter === 'All' || p.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  // Extract unique interview categories
  const interviewCategories = ['All', ...Array.from(new Set(interviewQuestions.map(q => q.category)))];

  // Filter Interview Questions
  const filteredQuestions = interviewQuestions.filter(q => {
    const matchesCategory = interviewCategory === 'All' || q.category === interviewCategory;
    const term = interviewSearch.toLowerCase();
    const matchesSearch = !term || q.question.toLowerCase().includes(term) || q.answer.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="prep-page">
      {/* Header Banner */}
      <section className="page-header-banner">
        <div className="container">
          <span className="badge badge-primary">PLACEMENT & INTERVIEW READINESS</span>
          <h1 className="page-header-title">Projects & Placement Preparation Hub</h1>
          <p className="page-header-subtitle">
            Tiered B.Tech project deliverables, core technical interview questions, comprehensive placement strategy, and ATS-friendly resume guides.
          </p>
        </div>
      </section>

      <div className="container section-padding">
        {/* Navigation Tabs */}
        <div className="prep-tabs-bar" role="tablist">
          <button
            className={`prep-tab-btn ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveSection('projects')}
          >
            <Code size={18} />
            <span>Project Deliverables ({projects.length})</span>
          </button>
          <button
            className={`prep-tab-btn ${activeSection === 'interview' ? 'active' : ''}`}
            onClick={() => setActiveSection('interview')}
          >
            <HelpCircle size={18} />
            <span>Interview Q&A ({interviewQuestions.length})</span>
          </button>
          <button
            className={`prep-tab-btn ${activeSection === 'strategy' ? 'active' : ''}`}
            onClick={() => setActiveSection('strategy')}
          >
            <Target size={18} />
            <span>Placement Strategy & Syllabus</span>
          </button>
          <button
            className={`prep-tab-btn ${activeSection === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveSection('resume')}
          >
            <FileText size={18} />
            <span>1-Page Resume Guide</span>
          </button>
          <button
            className={`prep-tab-btn ${activeSection === 'checklist' ? 'active' : ''}`}
            onClick={() => setActiveSection('checklist')}
          >
            <CheckSquare size={18} />
            <span>Placement Checklist</span>
          </button>
        </div>

        {/* Section 1: Project Ideas */}
        {activeSection === 'projects' && (
          <div className="prep-section">
            <div className="resource-toolbar card" style={{ marginBottom: '1.5rem' }}>
              <div className="search-input-wrapper">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Filter projects by title, domain, or technology (e.g. React, Python, IoT)..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                />
              </div>
              <div className="toolbar-controls">
                <div className="control-group">
                  <label htmlFor="p-level" className="control-label">Skill Level:</label>
                  <select
                    id="p-level"
                    className="form-control form-control-sm"
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                  >
                    <option value="All">All Levels</option>
                    <option value="Beginner">Beginner (1st - 2nd Year)</option>
                    <option value="Intermediate">Intermediate (2nd - 3rd Year)</option>
                    <option value="Advanced">Advanced (3rd - 4th Year Capstone)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
              {filteredProjects.map((p) => {
                const techList = p.required_tech || p.tech_stack || [];
                const steps = p.implementation_steps || [];
                const currentStatus = projectStatus[p.id] || 'Not Started';

                return (
                  <div key={p.id} className="card project-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="project-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span className={`badge ${
                          p.level === 'Beginner' ? 'badge-success' :
                          p.level === 'Intermediate' ? 'badge-info' : 'badge-warning'
                        }`}>
                          {p.level}
                        </span>
                        <span className="badge badge-neutral">{p.domain}</span>
                      </div>

                      {/* Project Progress Tracker */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <label htmlFor={`status-${p.id}`} style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                          Status:
                        </label>
                        <select
                          id={`status-${p.id}`}
                          value={currentStatus}
                          onChange={(e) => handleStatusChange(p.id, e.target.value)}
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #cbd5e1',
                            background: currentStatus === 'Completed' ? '#dcfce7' : currentStatus === 'In Progress' ? '#fef3c7' : '#f8fafc',
                            color: currentStatus === 'Completed' ? '#166534' : currentStatus === 'In Progress' ? '#92400e' : '#475569',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Built & In Portfolio</option>
                        </select>
                      </div>
                    </div>

                    <h3 className="project-title" style={{ marginTop: '0.75rem', fontSize: '1.2rem', color: '#0f172a' }}>
                      {p.title}
                    </h3>

                    {/* Problem Statement */}
                    <div className="project-detail-section" style={{ marginTop: '0.5rem' }}>
                      <strong style={{ fontSize: '0.88rem', color: '#334155' }}>Real Problem It Solves:</strong>
                      <p className="project-desc" style={{ fontSize: '0.9rem', color: '#475569', marginTop: '0.25rem', lineHeight: '1.5' }}>
                        {p.problem_statement || p.description}
                      </p>
                    </div>

                    {/* Required Skills & Technologies */}
                    <div className="project-tech-stack" style={{ marginTop: '0.75rem' }}>
                      <strong style={{ fontSize: '0.85rem', color: '#334155' }}>Required Technologies & Skills:</strong>
                      {p.skills_required && (
                        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.2rem 0 0.4rem 0' }}>
                          <em>Skills:</em> {p.skills_required}
                        </p>
                      )}
                      <div className="tech-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                        {techList.map((t, idx) => (
                          <span key={idx} className="tech-tag" style={{ background: '#f1f5f9', color: '#0f172a', padding: '0.2rem 0.55rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Implementation Steps */}
                    {steps.length > 0 && (
                      <div className="project-steps-section" style={{ marginTop: '0.85rem' }}>
                        <strong style={{ fontSize: '0.85rem', color: '#334155' }}>Suggested Step-by-Step Implementation:</strong>
                        <ol className="project-steps-list" style={{ marginTop: '0.35rem', paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
                          {steps.map((st, sIdx) => (
                            <li key={sIdx} className="project-step-item">
                              {st}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Expected Outcome & Skills Demonstrated */}
                    <div style={{ marginTop: '0.85rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                      {p.expected_outcome && (
                        <div style={{ marginBottom: p.skills_demonstrated ? '0.4rem' : 0 }}>
                          <strong style={{ color: '#0f172a' }}>Expected Outcome:</strong> <span style={{ color: '#334155' }}>{p.expected_outcome}</span>
                        </div>
                      )}
                      {p.skills_demonstrated && (
                        <div>
                          <strong style={{ color: '#0f172a' }}>Skills Demonstrated:</strong> <span style={{ color: '#0284c7' }}>{p.skills_demonstrated}</span>
                        </div>
                      )}
                    </div>

                    {/* Possible Interview Questions on this Project */}
                    {p.interview_questions && p.interview_questions.length > 0 && (
                      <div style={{ marginTop: '0.85rem', borderTop: '1px dashed #cbd5e1', paddingTop: '0.75rem' }}>
                        <strong style={{ fontSize: '0.85rem', color: '#b45309', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <HelpCircle size={14} />
                          Questions Interviewers Will Ask on This Project:
                        </strong>
                        <ul style={{ margin: '0.35rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#475569', lineHeight: '1.4' }}>
                          {p.interview_questions.map((iq, iIdx) => (
                            <li key={iIdx} style={{ fontStyle: 'italic', marginBottom: '0.2rem' }}>"{iq}"</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Demo / Repo Links */}
                    <div className="project-links-row" style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                      {p.repo_link && (
                        <a
                          href={p.repo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline"
                        >
                          <span>Repository Architecture</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {p.demo_link && (
                        <a
                          href={p.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-secondary"
                        >
                          <span>Live System Prototype</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: Technical Interview Q&A */}
        {activeSection === 'interview' && (
          <div className="prep-section">
            <div className="section-header" style={{ marginBottom: '1.2rem' }}>
              <h2 className="section-title" style={{ fontSize: '1.4rem' }}>
                Frequently Asked Core Technical & Behavioral Interview Questions
              </h2>
              <p className="text-muted" style={{ fontSize: '0.92rem' }}>
                Tested in campus placement screening rounds and technical interviews by top tech organizations. Click each question to expand the complete verified explanation.
              </p>
            </div>

            {/* Filter and Search Bar for Interview */}
            <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem', background: '#ffffff' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: '1', minWidth: '240px' }} className="search-input-wrapper">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search interview questions by keyword (e.g. index, deadlock, closure, join)..."
                    value={interviewSearch}
                    onChange={(e) => setInterviewSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.85rem' }}>
                {interviewCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setInterviewCategory(cat)}
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '2rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: '1px solid',
                      borderColor: interviewCategory === cat ? 'var(--primary-color, #2563eb)' : '#cbd5e1',
                      background: interviewCategory === cat ? 'var(--primary-color, #2563eb)' : '#ffffff',
                      color: interviewCategory === cat ? '#ffffff' : '#475569',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="faq-accordion-list">
              {filteredQuestions.length === 0 ? (
                <div className="card" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                  No interview questions match your current search/filter.
                </div>
              ) : (
                filteredQuestions.map((item) => {
                  const isOpen = expandedQuestionId === item.id;
                  return (
                    <div key={item.id} className="card accordion-card" style={{ marginBottom: '0.85rem' }}>
                      <button
                        type="button"
                        className="accordion-header"
                        onClick={() => toggleAccordion(item.id)}
                        aria-expanded={isOpen}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', padding: '1rem', cursor: 'pointer', textAlign: 'left' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                            {item.category}
                          </span>
                          <span className="accordion-title" style={{ fontWeight: 600, fontSize: '0.98rem', color: '#0f172a' }}>
                            {item.question}
                          </span>
                        </div>
                        {isOpen ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-secondary" />}
                      </button>

                      {isOpen && (
                        <div className="accordion-body" style={{ padding: '0 1rem 1.25rem 1rem', borderTop: '1px solid #f1f5f9' }}>
                          <div className="accordion-answer" style={{ whiteSpace: 'pre-line', fontSize: '0.9rem', color: '#334155', lineHeight: '1.6', background: '#f8fafc', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid var(--primary-color, #2563eb)' }}>
                            {item.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Section 3: Placement Preparation Strategy & Structured Sequence (Section 13) */}
        {activeSection === 'strategy' && (
          <div className="prep-section">
            <div className="section-header" style={{ marginBottom: '1.5rem' }}>
              <h2 className="section-title" style={{ fontSize: '1.4rem' }}>
                End-to-End B.Tech Placement Preparation Strategy
              </h2>
              <p className="text-muted" style={{ fontSize: '0.92rem' }}>
                Organized roadmap across foundational academics, data structures, core computer science, aptitude, communication, and mock interviews. Note: StudentVerse offers systematic preparation guidance and does not make misleading placement guarantees.
              </p>
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
              {/* Step 1: Programming & DSA */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ background: '#dbeafe', color: '#1e40af', padding: '0.3rem 0.6rem', borderRadius: '50%', fontWeight: 700, fontSize: '0.85rem' }}>1</span>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Programming Fundamentals & DSA</h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                  Choose one primary language (Java, C++, or Python). Master Time & Space complexity ($O(1)$ to $O(n!)$) before grinding algorithms.
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.83rem', color: '#334155', lineHeight: '1.6', marginTop: '0.5rem' }}>
                  <li><strong>Tier 1:</strong> Arrays, Strings, Two Pointers, Sliding Window</li>
                  <li><strong>Tier 2:</strong> Linked Lists, Stacks, Queues, Binary Search</li>
                  <li><strong>Tier 3:</strong> Recursion, Trees, BST, Heaps</li>
                  <li><strong>Tier 4:</strong> Graphs (BFS/DFS), Dynamic Programming (Knapsack, LCS)</li>
                </ul>
              </div>

              {/* Step 2: SQL & Databases */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ background: '#dcfce7', color: '#166534', padding: '0.3rem 0.6rem', borderRadius: '50%', fontWeight: 700, fontSize: '0.85rem' }}>2</span>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>SQL & Database Architecture</h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                  Almost every campus technical round tests SQL queries and database normalization principles.
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.83rem', color: '#334155', lineHeight: '1.6', marginTop: '0.5rem' }}>
                  <li><strong>Queries:</strong> 2nd highest salary, aggregate functions, self joins</li>
                  <li><strong>Joins:</strong> INNER, LEFT, RIGHT, and FULL OUTER joins with NULL checks</li>
                  <li><strong>Normalization:</strong> 1NF, 2NF, 3NF, and BCNF with real examples</li>
                  <li><strong>Transactions:</strong> ACID properties, indexing, and deadlock handling</li>
                </ul>
              </div>

              {/* Step 3: Core CS Concepts */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.3rem 0.6rem', borderRadius: '50%', fontWeight: 700, fontSize: '0.85rem' }}>3</span>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Core Computer Science Fundamentals</h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                  Service and product companies evaluate candidates heavily on core university curriculum subjects.
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.83rem', color: '#334155', lineHeight: '1.6', marginTop: '0.5rem' }}>
                  <li><strong>Operating Systems:</strong> Processes vs Threads, Virtual Memory, Deadlocks</li>
                  <li><strong>Computer Networks:</strong> OSI 7 layers, TCP 3-way handshake, DNS, HTTPS</li>
                  <li><strong>DBMS:</strong> Indexing structures, Sharding, Relational vs NoSQL</li>
                  <li><strong>OOP:</strong> Encapsulation, Abstraction, Inheritance, Polymorphism</li>
                </ul>
              </div>

              {/* Step 4: Aptitude & Logical Reasoning */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ background: '#fae8ff', color: '#86198f', padding: '0.3rem 0.6rem', borderRadius: '50%', fontWeight: 700, fontSize: '0.85rem' }}>4</span>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Aptitude & Logical Reasoning</h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                  60% of students are eliminated in Round 1 online assessments due to quantitative aptitude speed.
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.83rem', color: '#334155', lineHeight: '1.6', marginTop: '0.5rem' }}>
                  <li><strong>Quantitative:</strong> Time & Work, Speed & Distance, Percentages, Probability</li>
                  <li><strong>Logical:</strong> Blood Relations, Seating Arrangements, Syllogisms, Series</li>
                  <li><strong>Verbal:</strong> Reading Comprehension, Sentence Correction, Error Spotting</li>
                  <li><strong>Target Speed:</strong> 1 question per minute during online tests</li>
                </ul>
              </div>

              {/* Step 5: Resume & Portfolio */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.3rem 0.6rem', borderRadius: '50%', fontWeight: 700, fontSize: '0.85rem' }}>5</span>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Resume & GitHub Portfolio</h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                  Your resume must pass automated applicant tracking systems (ATS) and make a strong impression in under 30 seconds.
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.83rem', color: '#334155', lineHeight: '1.6', marginTop: '0.5rem' }}>
                  <li>Strict 1-page format with clean single-column structure</li>
                  <li>Include 2-3 substantial projects with live demo and GitHub repository links</li>
                  <li>Use action verbs and quantitative metrics (e.g. "Reduced query latency by 40%")</li>
                  <li>Ensure GitHub profile has active contribution streaks and clear README documentation</li>
                </ul>
              </div>

              {/* Step 6: HR & Behavioral Round */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ background: '#fef2f2', color: '#991b1b', padding: '0.3rem 0.6rem', borderRadius: '50%', fontWeight: 700, fontSize: '0.85rem' }}>6</span>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>HR & Behavioral Rounds (STAR Technique)</h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
                  Technical skill gets you the interview; communication and culture fit secure the final offer.
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.83rem', color: '#334155', lineHeight: '1.6', marginTop: '0.5rem' }}>
                  <li><strong>Tell me about yourself:</strong> 90-second crisp elevator pitch (Academics → Tech Stack → Projects → Why this company)</li>
                  <li><strong>STAR Method:</strong> Situation, Task, Action taken, Result achieved</li>
                  <li><strong>Conflict & Failure:</strong> Honest examples showing accountability and learning</li>
                  <li><strong>Questions for Interviewer:</strong> Ask about engineering culture, team tech stacks, or onboarding</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: 1-Page Resume Guide */}
        {activeSection === 'resume' && (
          <div className="prep-section">
            <div className="card resume-guide-card" style={{ padding: '1.5rem' }}>
              <div className="card-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText size={24} className="text-primary" />
                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Undergraduate B.Tech Resume Guidelines (ATS-Friendly)</h3>
              </div>
              <p className="text-secondary" style={{ marginBottom: '1.5rem', fontSize: '0.92rem' }}>
                Campus recruitment teams and ATS software review hundreds of resumes daily. Adhere to these proven guidelines to maximize interview shortlists:
              </p>

              <div className="guidelines-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                {resumeGuidelines.map((rule, idx) => (
                  <div key={idx} className="guideline-item" style={{ background: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', gap: '0.75rem' }}>
                    <span className="guideline-number" style={{ fontWeight: 800, color: 'var(--primary-color, #2563eb)', fontSize: '1.1rem' }}>0{idx + 1}</span>
                    <p className="guideline-text" style={{ margin: 0, fontSize: '0.88rem', color: '#334155', lineHeight: '1.5' }}>{rule}</p>
                  </div>
                ))}
              </div>

              <div className="star-formula-box" style={{ marginTop: '1.5rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af', fontSize: '1rem' }}>Google "X-Y-Z" Project Bullet Formula:</h4>
                <div className="formula-example" style={{ fontSize: '0.9rem', color: '#1e3a8a', lineHeight: '1.6' }}>
                  <em>"Accomplished [X: real-time student guidance portal], as measured by [Y: supporting 8 B.Tech branches and 100% normalized SQL query throughput], by doing [Z: architecting an Express.js REST API with React SPA and MySQL connection pooling]."</em>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Placement Checklist */}
        {activeSection === 'checklist' && (
          <div className="prep-section">
            <div className="card checklist-card" style={{ padding: '1.5rem' }}>
              <div className="card-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <CheckSquare size={24} className="text-success" />
                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Campus Placement Milestone Checklist</h3>
              </div>
              <p className="text-secondary" style={{ marginBottom: '1.5rem', fontSize: '0.92rem' }}>
                Keep yourself accountable throughout your 4 years. Items checked here are automatically remembered across your browsing sessions:
              </p>

              <div className="checklist-items" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {placementChecklist.map((item) => {
                  const isChecked = checkedItems.has(item.id);
                  return (
                    <label
                      key={item.id}
                      className={`checklist-row ${isChecked ? 'item-checked' : ''}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.85rem 1rem',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: isChecked ? '#bbf7d0' : '#e2e8f0',
                        background: isChecked ? '#f0fdf4' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleChecklistItem(item.id)}
                        className="checklist-checkbox"
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <div className="checklist-details" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <span className="checklist-task" style={{ fontSize: '0.92rem', color: isChecked ? '#166534' : '#1e293b', textDecoration: isChecked ? 'line-through' : 'none' }}>
                          {item.task}
                        </span>
                        <span className="checklist-phase badge badge-info" style={{ fontSize: '0.75rem' }}>
                          {item.phase}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
