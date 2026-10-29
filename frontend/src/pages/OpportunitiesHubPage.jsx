import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Briefcase,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Clock,
  PlusCircle,
  X,
  CheckCircle,
  FileText
} from 'lucide-react';

const categories = [
  'All',
  'Internships',
  'Hackathons',
  'Coding competitions',
  'Scholarships',
  'Jobs',
  'Government opportunities',
  'GATE and higher studies'
];

export default function OpportunitiesHubPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // New Opportunity Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Internships',
    description: '',
    eligibility: '',
    deadline: '',
    official_source_url: '',
    application_url: '',
    status: 'Active',
    is_verified: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const loadOpportunities = async () => {
    try {
      setIsLoading(true);
      const params = {
        category: activeCategory !== 'All' ? activeCategory : undefined,
        status: statusFilter !== 'All' ? statusFilter : undefined,
        search: searchQuery.trim() || undefined
      };
      const res = await api.get('/opportunities', params);
      if (res.success && res.opportunities) {
        setOpportunities(res.opportunities);
      }
    } catch (err) {
      console.error('Failed to load opportunities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOpportunities();
  }, [activeCategory, statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadOpportunities();
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title || !formData.description || !formData.eligibility || !formData.official_source_url) {
      setFormError('Please fill in all required fields (title, description, eligibility, and source URL).');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.post('/opportunities', formData);
      if (res.success) {
        setFeedbackMsg('New opportunity listing created and saved to MySQL!');
        setModalOpen(false);
        setFormData({
          title: '',
          category: 'Internships',
          description: '',
          eligibility: '',
          deadline: '',
          official_source_url: '',
          application_url: '',
          status: 'Active',
          is_verified: true
        });
        loadOpportunities();
        setTimeout(() => setFeedbackMsg(''), 4000);
      }
    } catch (err) {
      setFormError(err.message || 'Failed to submit opportunity.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="opportunities-page">
      {/* Header Banner */}
      <section className="page-header-banner">
        <div className="container">
          <div className="flex-between">
            <div>
              <span className="badge badge-primary">AUTHENTIC & VERIFIED LISTINGS</span>
              <h1 className="page-header-title">Opportunities Hub</h1>
              <p className="page-header-subtitle">
                Explore summer internships, national hackathons, coding contests, scholarships, and public sector engineering recruitment.
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-secondary"
              style={{ marginTop: '1rem' }}
            >
              <PlusCircle size={18} />
              <span>Post New Opportunity</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container section-padding">
        {feedbackMsg && (
          <div className="alert alert-success" role="alert" style={{ marginBottom: '1.5rem' }}>
            <CheckCircle size={20} />
            <div>{feedbackMsg}</div>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="resource-toolbar card">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search by title, department, or keywords (e.g. GSoC, ISRO, TCS, GATE)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Filter
            </button>
          </form>

          <div className="toolbar-controls">
            <div className="control-group">
              <label htmlFor="filter-status" className="control-label">Status:</label>
              <select
                id="filter-status"
                className="form-control form-control-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
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

        {/* Transparent External Redirection Notice */}
        <div className="alert alert-info" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
          <ShieldCheck size={20} style={{ flexShrink: 0 }} />
          <div>
            <strong>External Application Notice:</strong> StudentVerse aggregates verified listings. Clicking "Apply / Details" securely opens the official institutional portal (e.g. Google, ISRO, TCS, NSP) where your application is completed and verified.
          </div>
        </div>

        {/* Opportunities Grid */}
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading verified opportunities...</p>
          </div>
        ) : opportunities.length > 0 ? (
          <div className="grid grid-cols-2" style={{ marginTop: '1rem', gap: '1.5rem' }}>
            {opportunities.map((opp) => (
              <div key={opp.id} className="opportunity-card card">
                <div className="opp-header">
                  <span className="badge badge-primary">{opp.category}</span>
                  <div className="opp-status-group">
                    {opp.is_verified ? (
                      <span className="badge badge-success" title="Verified against official institutional portal">
                        <ShieldCheck size={14} />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="badge badge-warning" title="Sample or unverified listing">
                        <AlertTriangle size={14} />
                        <span>Sample</span>
                      </span>
                    )}

                    <span className={`badge ${
                      opp.status === 'Active' ? 'badge-info' :
                      opp.status === 'Upcoming' ? 'badge-neutral' : 'badge-warning'
                    }`}>
                      {opp.status}
                    </span>
                  </div>
                </div>

                <h3 className="opp-title">{opp.title}</h3>
                <p className="opp-desc">{opp.description}</p>

                <div className="opp-meta-box">
                  <div className="opp-meta-item">
                    <strong>Eligibility:</strong> {opp.eligibility}
                  </div>
                  {opp.deadline && (
                    <div className="opp-meta-item" style={{ marginTop: '0.35rem', color: 'var(--primary)' }}>
                      <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
                      <strong>Deadline:</strong> {new Date(opp.deadline).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  )}
                </div>

                <div className="opp-footer">
                  <a
                    href={opp.official_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-secondary"
                  >
                    <span>Official Portal</span>
                    <ExternalLink size={14} />
                  </a>

                  <a
                    href={opp.application_url || opp.official_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    <span>Apply / Details</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Briefcase size={48} className="empty-state-icon" />
            <h3 className="empty-state-title">No opportunities found in this category</h3>
            <p className="empty-state-desc">
              Try switching your category or search term to discover more listings.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setStatusFilter('All');
                setSearchQuery('');
              }}
              className="btn btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Admin / Post Opportunity Modal */}
      {modalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-window card">
            <div className="modal-header">
              <h3 id="modal-title" style={{ fontSize: '1.25rem' }}>Post New Opportunity Listing</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className="alert alert-danger" role="alert">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="new-title">
                  Opportunity Title <span className="text-danger">*</span>
                </label>
                <input
                  id="new-title"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Google Summer of Code 2026 or ISRO Internship"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="new-cat">
                    Category <span className="text-danger">*</span>
                  </label>
                  <select
                    id="new-cat"
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="new-status">
                    Status
                  </label>
                  <select
                    id="new-status"
                    className="form-control"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-elig">
                  Eligibility Criteria <span className="text-danger">*</span>
                </label>
                <input
                  id="new-elig"
                  type="text"
                  className="form-control"
                  placeholder="e.g. 2nd and 3rd year B.Tech students in CSE, ECE, EEE"
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-desc">
                  Detailed Description <span className="text-danger">*</span>
                </label>
                <textarea
                  id="new-desc"
                  className="form-control"
                  rows="3"
                  placeholder="Summarize the initiative, stipends, and expectations..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="new-source">
                    Official Source URL <span className="text-danger">*</span>
                  </label>
                  <input
                    id="new-source"
                    type="url"
                    className="form-control"
                    placeholder="https://..."
                    value={formData.official_source_url}
                    onChange={(e) => setFormData({ ...formData, official_source_url: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="new-deadline">
                    Application Deadline
                  </label>
                  <input
                    id="new-deadline"
                    type="date"
                    className="form-control"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="new-verified"
                  checked={formData.is_verified}
                  onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                />
                <label htmlFor="new-verified" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                  Mark as officially verified listing
                </label>
              </div>

              <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? 'Submitting...' : 'Save to MySQL Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
