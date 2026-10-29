import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  Search,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Filter,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const categories = [
  'All',
  'Programming languages',
  'Data structures and algorithms',
  'Web development',
  'AI and machine learning',
  'Data analytics',
  'Cybersecurity',
  'Core engineering subjects',
  'Aptitude',
  'Technical interviews',
  'GATE preparation'
];

export default function LearningResourcesPage() {
  const { isAuthenticated } = useAuth();
  const [resources, setResources] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewSavedOnly, setViewSavedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      if (viewSavedOnly && isAuthenticated) {
        const res = await api.get('/resources/saved');
        if (res.success && res.saved_resources) {
          setResources(res.saved_resources);
        }
      } else {
        const params = {
          category: activeCategory !== 'All' ? activeCategory : undefined,
          difficulty: difficultyFilter !== 'All' ? difficultyFilter : undefined,
          search: searchQuery.trim() || undefined
        };
        const res = await api.get('/resources', params);
        if (res.success && res.resources) {
          setResources(res.resources);
        }
      }
    } catch (err) {
      console.error('Failed to load resources:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [activeCategory, difficultyFilter, viewSavedOnly]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchResources();
  };

  const handleToggleSave = async (resourceId) => {
    if (!isAuthenticated) {
      setToastMsg('Please log in or register to bookmark resources!');
      setTimeout(() => setToastMsg(''), 3500);
      return;
    }

    try {
      const res = await api.post('/resources/toggle-save', { resource_id: resourceId });
      if (res.success) {
        setResources(prev =>
          prev.map(r => (r.id === resourceId ? { ...r, is_saved: res.is_saved } : r))
        );
        setToastMsg(res.is_saved ? 'Resource bookmarked to your profile!' : 'Resource removed from bookmarks.');
        setTimeout(() => setToastMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to toggle save:', err);
    }
  };

  return (
    <div className="resources-page">
      {/* Header Banner */}
      <section className="page-header-banner">
        <div className="container">
          <span className="badge badge-primary">GENUINE EDUCATIONAL REPOSITORIES</span>
          <h1 className="page-header-title">Curated B.Tech Learning Resources</h1>
          <p className="page-header-subtitle">
            Authoritative, hand-curated educational portals and open courseware from Harvard, MIT, NPTEL, and industry leaders with verified external links.
          </p>
        </div>
      </section>

      <div className="container section-padding">
        {toastMsg && (
          <div className="alert alert-info" role="status" style={{ marginBottom: '1.5rem' }}>
            <Sparkles size={18} />
            <div>{toastMsg}</div>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="resource-toolbar card">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search tutorials, courses, and platforms (e.g. CS50, Algorithms, NPTEL)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          <div className="toolbar-controls">
            <div className="control-group">
              <label htmlFor="filter-diff" className="control-label">Difficulty:</label>
              <select
                id="filter-diff"
                className="form-control form-control-sm"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {isAuthenticated && (
              <button
                type="button"
                className={`btn btn-sm ${viewSavedOnly ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setViewSavedOnly(!viewSavedOnly)}
              >
                {viewSavedOnly ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                <span>{viewSavedOnly ? 'Showing Saved' : 'My Bookmarks'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Slider */}
        {!viewSavedOnly && (
          <div className="category-pills-bar" role="tablist">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  className={`category-pill-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Resources Grid */}
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching educational resources...</p>
          </div>
        ) : resources.length > 0 ? (
          <div className="grid grid-cols-3" style={{ marginTop: '1.5rem' }}>
            {resources.map((item) => (
              <div key={item.id} className="resource-card card">
                <div className="res-card-top">
                  <span className="badge badge-primary">{item.category}</span>
                  <button
                    type="button"
                    onClick={() => handleToggleSave(item.id)}
                    className={`bookmark-btn ${item.is_saved ? 'saved' : ''}`}
                    title={item.is_saved ? 'Remove bookmark' : 'Bookmark this resource'}
                    aria-label="Bookmark resource"
                  >
                    {item.is_saved ? (
                      <BookmarkCheck size={20} className="text-primary" />
                    ) : (
                      <Bookmark size={20} />
                    )}
                  </button>
                </div>

                <h3 className="res-card-title">{item.title}</h3>
                <p className="res-card-desc">{item.description}</p>

                <div className="res-meta-row">
                  <span className="res-provider">By {item.provider}</span>
                  <span className={`badge ${
                    item.difficulty_level === 'Beginner' ? 'badge-success' :
                    item.difficulty_level === 'Intermediate' ? 'badge-info' : 'badge-warning'
                  }`}>
                    {item.difficulty_level}
                  </span>
                </div>

                <div className="res-card-footer">
                  <a
                    href={item.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline btn-block"
                  >
                    <span>Visit Genuine Resource</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <BookOpen size={48} className="empty-state-icon" />
            <h3 className="empty-state-title">No matching learning resources found</h3>
            <p className="empty-state-desc">
              Try adjusting your category pills, difficulty filter, or search keywords.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setDifficultyFilter('All');
                setSearchQuery('');
                setViewSavedOnly(false);
              }}
              className="btn btn-secondary"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
