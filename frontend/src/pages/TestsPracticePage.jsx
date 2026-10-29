import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  History,
  TrendingUp,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

const quizTopics = [
  'Programming',
  'SQL',
  'Aptitude',
  'Technical Fundamentals'
];

export default function TestsPracticePage() {
  const { isAuthenticated } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState('Programming');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' or 'history'
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch questions for current topic
  const loadQuestions = async (topic) => {
    try {
      setIsLoadingQuestions(true);
      setError('');
      setQuizResult(null);
      setUserAnswers({});
      const res = await api.get('/quizzes/questions', { topic });
      if (res.success && res.questions) {
        setQuestions(res.questions);
      }
    } catch (err) {
      console.error('Failed to load quiz questions:', err);
      setError(err.message || 'Could not load quiz questions.');
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // 2. Fetch history if logged in
  const loadHistory = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await api.get('/quizzes/history');
      if (res.success && res.attempts) {
        setHistory(res.attempts);
      }
    } catch (err) {
      console.error('Failed to load quiz history:', err);
    }
  };

  useEffect(() => {
    loadQuestions(selectedTopic);
    loadHistory();
  }, [selectedTopic, isAuthenticated]);

  const handleOptionSelect = (questionId, optionLetter) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionLetter
    }));
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please log in or register to record your scores in MySQL.');
      return;
    }

    if (Object.keys(userAnswers).length === 0) {
      setError('Please answer at least one question before submitting.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      const res = await api.post('/quizzes/submit', {
        topic: selectedTopic,
        answers: userAnswers
      });
      if (res.success && res.result) {
        setQuizResult(res.result);
        loadHistory(); // Refresh history
      }
    } catch (err) {
      setError(err.message || 'Failed to submit quiz attempt.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    loadQuestions(selectedTopic);
  };

  return (
    <div className="tests-page">
      {/* Header Banner */}
      <section className="page-header-banner">
        <div className="container">
          <div className="flex-between">
            <div>
              <span className="badge badge-primary">SKILL VERIFICATION & MCQ PRACTICE</span>
              <h1 className="page-header-title">Technical & Aptitude Practice Tests</h1>
              <p className="page-header-subtitle">
                Test your conceptual clarity in C/C++, Java, SQL, Operating Systems, Computer Networks, and Quantitative Aptitude.
              </p>
            </div>
            {isAuthenticated && (
              <div className="tests-nav-tabs">
                <button
                  className={`btn btn-sm ${activeTab === 'quiz' ? 'btn-primary' : 'btn-outline-white'}`}
                  onClick={() => setActiveTab('quiz')}
                >
                  <Award size={16} />
                  <span>Take Quiz</span>
                </button>
                <button
                  className={`btn btn-sm ${activeTab === 'history' ? 'btn-primary' : 'btn-outline-white'}`}
                  onClick={() => {
                    setActiveTab('history');
                    loadHistory();
                  }}
                >
                  <History size={16} />
                  <span>Score History ({history.length})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container section-padding">
        {error && (
          <div className="alert alert-danger" role="alert" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={20} />
            <div>{error}</div>
          </div>
        )}

        {/* Tab 1: Quiz Mode */}
        {activeTab === 'quiz' && (
          <div>
            {/* Topic Selector */}
            <div className="topic-selector-tabs">
              {quizTopics.map((topic) => (
                <button
                  key={topic}
                  className={`topic-tab-btn ${selectedTopic === topic ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTopic(topic);
                  }}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Questions Container */}
            {isLoadingQuestions ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading {selectedTopic} practice questions...</p>
              </div>
            ) : quizResult ? (
              /* Quiz Result Feedback Screen */
              <div className="card quiz-results-card">
                <div className="quiz-results-header text-center">
                  <div className="quiz-result-score-badge">
                    <span className="score-num">{quizResult.score} / {quizResult.total_questions}</span>
                    <span className="score-pct">{quizResult.percentage}% Score</span>
                  </div>
                  <h2 className="results-headline">
                    {quizResult.percentage >= 70 ? 'Excellent Performance! 🎉' : 'Good Attempt! Review the Solutions Below.'}
                  </h2>
                  <p className="results-subtext">
                    Your test attempt has been securely recorded to your student history in MySQL.
                  </p>
                  <button onClick={handleRetake} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                    <RotateCcw size={16} />
                    <span>Try Another Set / Retake</span>
                  </button>
                </div>

                <div className="results-details-list">
                  <h3 style={{ margin: '1.5rem 0 1rem 0', fontSize: '1.2rem' }}>Detailed Answer Explanations:</h3>
                  {quizResult.details.map((item, idx) => (
                    <div key={idx} className={`result-item-box ${item.is_correct ? 'item-correct' : 'item-incorrect'}`}>
                      <div className="result-item-header">
                        <span className="question-idx-pill">Q{idx + 1}</span>
                        {item.is_correct ? (
                          <span className="badge badge-success">
                            <CheckCircle2 size={14} /> Correct
                          </span>
                        ) : (
                          <span className="badge badge-warning">
                            <XCircle size={14} /> Incorrect
                          </span>
                        )}
                      </div>
                      <p className="result-question-text">{item.question_text}</p>
                      <div className="result-answers-meta">
                        <span><strong>Your Selection:</strong> Option {item.selected_option}</span>
                        <span><strong>Correct Answer:</strong> Option {item.correct_option}</span>
                      </div>
                      <div className="result-explanation">
                        <strong>Conceptual Explanation:</strong> {item.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : questions.length > 0 ? (
              /* Active Quiz Form */
              <form onSubmit={handleSubmitQuiz} className="quiz-questions-form">
                <div className="quiz-info-bar card">
                  <div className="flex-between">
                    <span>
                      <strong>Topic:</strong> {selectedTopic} | <strong>Total Questions:</strong> {questions.length}
                    </span>
                    <span>
                      Answered: {Object.keys(userAnswers).length} of {questions.length}
                    </span>
                  </div>
                </div>

                <div className="questions-list">
                  {questions.map((q, idx) => (
                    <div key={q.id} className="card question-card">
                      <div className="question-number-tag">Question {idx + 1} of {questions.length}</div>
                      <h3 className="question-title">{q.question_text}</h3>

                      <div className="options-group">
                        {[
                          { key: 'A', text: q.option_a },
                          { key: 'B', text: q.option_b },
                          { key: 'C', text: q.option_c },
                          { key: 'D', text: q.option_d }
                        ].map((opt) => {
                          const isSelected = userAnswers[q.id] === opt.key;
                          return (
                            <label
                              key={opt.key}
                              className={`option-label ${isSelected ? 'selected' : ''}`}
                            >
                              <input
                                type="radio"
                                name={`q_${q.id}`}
                                value={opt.key}
                                checked={isSelected}
                                onChange={() => handleOptionSelect(q.id, opt.key)}
                                className="option-radio"
                              />
                              <span className="option-letter">{opt.key}</span>
                              <span className="option-text">{opt.text}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="quiz-submit-bar card text-center">
                  <p className="text-muted" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                    {isAuthenticated
                      ? 'Submitting will compute your score and record the attempt in your MySQL profile.'
                      : 'You must be logged in to save your score history.'}
                  </p>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Evaluating Answers...' : 'Submit Quiz & View Results'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="empty-state">
                <p>No questions currently available for {selectedTopic}.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Score History */}
        {activeTab === 'history' && (
          <div className="card score-history-card">
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.3rem' }}>Your Past Test Attempts</h3>
            {history.length > 0 ? (
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Topic</th>
                      <th>Score</th>
                      <th>Accuracy</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h) => {
                      const pct = parseFloat(h.percentage);
                      return (
                        <tr key={h.id}>
                          <td>{new Date(h.attempted_at).toLocaleDateString()}</td>
                          <td><strong>{h.topic}</strong></td>
                          <td>{h.score} / {h.total_questions}</td>
                          <td>{pct}%</td>
                          <td>
                            <span className={`badge ${pct >= 70 ? 'badge-success' : 'badge-warning'}`}>
                              {pct >= 70 ? 'Passed' : 'Needs Review'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <History size={48} className="empty-state-icon" />
                <h4 className="empty-state-title">No Past Attempts Recorded</h4>
                <p className="empty-state-desc">
                  Take a quick quiz in Programming, SQL, or Aptitude to start building your score trajectory.
                </p>
                <button onClick={() => setActiveTab('quiz')} className="btn btn-primary">
                  Start a Quiz Now
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
