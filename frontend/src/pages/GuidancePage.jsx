import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  GraduationCap,
  Code2,
  Trophy,
  Briefcase,
  BookOpen,
  Award,
  Compass,
  CheckCircle2,
  Circle,
  Search,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  GraduationCap: GraduationCap,
  Code2: Code2,
  Trophy: Trophy,
  Briefcase: Briefcase,
  BookOpen: BookOpen,
  Award: Award,
  Compass: Compass
};

export default function GuidancePage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState(null);
  const [completedChecklistItems, setCompletedChecklistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('studentverse_guidance_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGuidance() {
      try {
        setIsLoading(true);
        const res = await api.get('/dashboard/guidance');
        if (res.success && res.categories) {
          setCategories(res.categories);
          if (res.categories.length > 0) {
            setSelectedCategory(res.categories[0].id);
            if (res.categories[0].topics && res.categories[0].topics.length > 0) {
              setExpandedTopicId(res.categories[0].topics[0].id);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load guidance center:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGuidance();
  }, []);

  const toggleChecklistItem = (itemId) => {
    setCompletedChecklistItems(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      try {
        localStorage.setItem('studentverse_guidance_checklist', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to persist checklist:', err);
      }
      return next;
    });
  };

  const activeCategoryData = categories.find(c => c.id === selectedCategory) || categories[0];

  // Filter topics based on search query
  const filteredTopics = activeCategoryData?.topics?.filter(topic => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchTitle = topic.title.toLowerCase().includes(query);
    const matchSummary = topic.summary.toLowerCase().includes(query);
    const matchPoints = topic.points?.some(p => p.toLowerCase().includes(query));
    return matchTitle || matchSummary || matchPoints;
  }) || [];

  const completedChecklistCount = Object.values(completedChecklistItems).filter(Boolean).length;

  return (
    <div className="guidance-page-container">
      {/* Hero Header */}
      <section className="page-hero">
        <div className="container">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Essential B.Tech Handbook</span>
          </div>
          <h1 className="hero-title">B.Tech Student Guidance Center</h1>
          <p className="hero-subtitle">
            From First-Year Confusion to Career Readiness — Complete, practical advice across all 7 essential dimensions of engineering college life.
          </p>

          {/* Quick Metrics Bar */}
          <div className="guidance-stats-row">
            <div className="stat-pill">
              <span className="stat-num">{categories.length}</span>
              <span className="stat-label">Core Dimensions</span>
            </div>
            <div className="stat-pill">
              <span className="stat-num">
                {categories.reduce((acc, c) => acc + (c.topics?.length || 0), 0)}
              </span>
              <span className="stat-label">Guidance Guides</span>
            </div>
            <div className="stat-pill">
              <span className="stat-num text-success">{completedChecklistCount}</span>
              <span className="stat-label">Checklist Milestones Done</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container section-padding">
        {/* Category Navigation Pills */}
        <div className="guidance-category-tabs" role="tablist">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || BookOpen;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                className={`guidance-cat-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (cat.topics && cat.topics.length > 0) {
                    setExpandedTopicId(cat.topics[0].id);
                  }
                }}
              >
                <IconComponent size={18} />
                <span>{cat.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Active Category Intro */}
        {activeCategoryData && (
          <div className="active-category-header card">
            <div className="category-header-info">
              <div className="category-icon-wrapper">
                {React.createElement(iconMap[activeCategoryData.icon] || BookOpen, { size: 28 })}
              </div>
              <div>
                <h2 className="active-cat-title">{activeCategoryData.title}</h2>
                <p className="active-cat-tagline">{activeCategoryData.tagline}</p>
              </div>
            </div>

            <div className="guidance-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder={`Search in ${activeCategoryData.title.split('&')[0]}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="guidance-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content Topics List */}
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading guidance curriculum...</p>
          </div>
        ) : (
          <div className="guidance-topics-list">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic, index) => {
                const isExpanded = expandedTopicId === topic.id;
                return (
                  <div key={topic.id} className={`card guidance-topic-card ${isExpanded ? 'is-expanded' : ''}`}>
                    {/* Clickable Header */}
                    <div
                      className="topic-card-toggle-header"
                      onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setExpandedTopicId(isExpanded ? null : topic.id);
                        }
                      }}
                    >
                      <div className="topic-header-title-group">
                        <span className="topic-order-badge">#{index + 1}</span>
                        <div>
                          <h3 className="topic-headline">{topic.title}</h3>
                          <p className="topic-summary-line">{topic.summary}</p>
                        </div>
                      </div>
                      <div className="toggle-indicator">
                        {isExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                      </div>
                    </div>

                    {/* Expandable Topic Details */}
                    {isExpanded && (
                      <div className="topic-expanded-body">
                        {/* Key Action Points */}
                        <div className="guidance-section-block">
                          <h4 className="section-mini-heading">
                            <Lightbulb size={18} className="text-primary" />
                            <span>Structured Recommendations & Action Steps</span>
                          </h4>
                          <ul className="guidance-points-list">
                            {topic.points?.map((pt, pIdx) => (
                              <li key={pIdx} className="guidance-point-item">
                                <span className="bullet-point">▸</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Interactive Student Action Checklist */}
                        {topic.checklist && topic.checklist.length > 0 && (
                          <div className="guidance-checklist-block">
                            <h4 className="section-mini-heading">
                              <CheckCircle2 size={18} className="text-success" />
                              <span>Actionable Checklist for Students</span>
                            </h4>
                            <div className="checklist-items-grid">
                              {topic.checklist.map((item, cIdx) => {
                                const itemId = `${topic.id}_chk_${cIdx}`;
                                const isChecked = !!completedChecklistItems[itemId];
                                return (
                                  <label
                                    key={cIdx}
                                    className={`checklist-item-row ${isChecked ? 'item-checked' : ''}`}
                                    onClick={() => toggleChecklistItem(itemId)}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => {}}
                                      style={{ display: 'none' }}
                                    />
                                    {isChecked ? (
                                      <CheckCircle2 size={18} className="text-success" />
                                    ) : (
                                      <Circle size={18} className="text-muted" />
                                    )}
                                    <span className="checklist-text">{item}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="card empty-state">
                <p>No guidance topics matched your search "{searchQuery}".</p>
                <button onClick={() => setSearchQuery('')} className="btn btn-sm btn-outline">
                  Reset Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* Helpful Advice Alert Card */}
        <div className="guidance-advisory-box card">
          <div className="advisory-icon">
            <AlertTriangle size={24} className="text-warning" />
          </div>
          <div>
            <h4 className="advisory-title">StudentVerse Golden Advice</h4>
            <p className="advisory-text">
              Engineering is a marathon, not a sprint. Never panic over backlogs or temporary low test scores. Consistent 2-hour daily technical study and active project creation outweigh passive classroom attendance every single time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
