import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { SUBJECT_OPTIONS } from '../data/initialQuizzes';
import { Clock, HelpCircle, Award, Play, Filter, Sparkles, AlertCircle, Calendar, CheckCircle } from 'lucide-react';

export const StudentDashboard = ({ onStartQuiz, onOpenLogin, defaultStatusFilter = 'all' }) => {
  const { quizzes, user, submissions } = useQuiz();
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [statusFilter, setStatusFilter] = useState(defaultStatusFilter); // 'all', 'active', 'upcoming'

  const filteredQuizzes = quizzes.filter(q => {
    const matchesSubject = selectedSubject === 'All' || q.subject === selectedSubject;
    const isUpcoming = q.status === 'upcoming';
    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === 'upcoming' ? isUpcoming :
      !isUpcoming; // 'active'

    return matchesSubject && matchesStatus;
  });

  const getSubjectBadgeClass = (subject) => {
    if (subject.includes('Java')) return 'badge-java';
    if (subject.includes('Python')) return 'badge-python';
    if (subject.includes('Web')) return 'badge-web';
    if (subject.includes('Database')) return 'badge-dbms';
    return 'badge-web';
  };

  // Check if current logged in student has already attempted a quiz
  const getStudentQuizSubmission = (quizId) => {
    if (!user || user.role !== 'student') return null;
    return submissions.find(s => s.quizId === quizId && s.studentEmail === user.email);
  };

  const activeCount = quizzes.filter(q => q.status !== 'upcoming').length;
  const upcomingCount = quizzes.filter(q => q.status === 'upcoming').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Banner */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.14), rgba(14, 165, 233, 0.14))',
          border: '1px solid var(--border-color)',
          position: 'relative',
          overflow: 'hidden',
          padding: '2.25rem'
        }}
      >
        <div style={{ maxWidth: '680px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-light)', color: 'var(--accent-primary)', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.85rem' }}>
            <Sparkles size={14} />
            <span>Academic Assessment Portal</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            {user ? `Welcome back, ${user.name}!` : 'Examinations & Upcoming Assessments'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
            Test your knowledge across Java Data Structures, Python Data Science, Web Interfaces, and DBMS. 
            Results are graded instantly and dispatched directly to your email ID.
          </p>
        </div>
      </div>

      {/* Login Prompt Banner if Not Logged In */}
      {!user && (
        <div className="toast-banner toast-info" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertCircle size={20} />
            <span>Please log in with your email address before taking a quiz to receive your instant report card.</span>
          </div>
          <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={onOpenLogin}>
            Student Login
          </button>
        </div>
      )}

      {/* Primary Status Tabs (All vs Available Now vs Upcoming Quizzes) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="nav-tabs">
          <button
            className={`nav-tab ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            <span>All Examinations ({quizzes.length})</span>
          </button>
          <button
            className={`nav-tab ${statusFilter === 'active' ? 'active' : ''}`}
            onClick={() => setStatusFilter('active')}
          >
            <Play size={15} />
            <span>Available Now ({activeCount})</span>
          </button>
          <button
            className={`nav-tab ${statusFilter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setStatusFilter('upcoming')}
          >
            <Calendar size={15} />
            <span>Upcoming Scheduled ({upcomingCount})</span>
          </button>
        </div>

        {/* Category Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          <button
            className={`btn ${selectedSubject === 'All' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '9999px', padding: '0.35rem 0.9rem', fontSize: '0.8rem' }}
            onClick={() => setSelectedSubject('All')}
          >
            All Categories
          </button>
          {SUBJECT_OPTIONS.map(sub => (
            <button
              key={sub}
              className={`btn ${selectedSubject === sub ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: '9999px', padding: '0.35rem 0.9rem', fontSize: '0.8rem' }}
              onClick={() => setSelectedSubject(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Cards Grid */}
      <div className="grid-cards">
        {filteredQuizzes.length === 0 ? (
          <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3.5rem 1.5rem' }}>
            <HelpCircle size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>No quizzes found for selected filter</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Try selecting a different subject or tab option above.
            </p>
          </div>
        ) : (
          filteredQuizzes.map(quiz => {
            const previousAttempt = getStudentQuizSubmission(quiz.id);
            const isUpcoming = quiz.status === 'upcoming';

            return (
              <div key={quiz.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className={`badge-subject ${getSubjectBadgeClass(quiz.subject)}`}>
                      {quiz.subject}
                    </span>

                    {/* Status Pill */}
                    {isUpcoming ? (
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: '800', 
                        color: 'var(--warning-text)', 
                        background: 'var(--warning-bg)', 
                        padding: '0.25rem 0.6rem', 
                        borderRadius: '9999px',
                        border: '1px solid var(--warning-border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <Calendar size={12} />
                        <span>UPCOMING</span>
                      </span>
                    ) : previousAttempt ? (
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: '800', 
                        color: 'var(--success-text)', 
                        background: 'var(--success-bg)', 
                        padding: '0.25rem 0.6rem', 
                        borderRadius: '9999px',
                        border: '1px solid var(--success-border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <CheckCircle size={12} />
                        <span>COMPLETED</span>
                      </span>
                    ) : (
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: '800', 
                        color: 'var(--accent-primary)', 
                        background: 'var(--accent-light)', 
                        padding: '0.25rem 0.6rem', 
                        borderRadius: '9999px',
                        border: '1px solid var(--border-focus)'
                      }}>
                        LIVE NOW
                      </span>
                    )}
                  </div>

                  <h2 style={{ fontSize: '1.2rem', fontWeight: '700', lineHeight: '1.4', marginBottom: '0.5rem' }}>
                    {quiz.title}
                  </h2>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                    {quiz.description}
                  </p>
                </div>

                <div>
                  {/* Meta statistics */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 1fr', 
                    gap: '0.5rem', 
                    padding: '0.75rem', 
                    background: 'var(--bg-tertiary)', 
                    borderRadius: '0.65rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <HelpCircle size={14} />
                      <span>{quiz.questions.length} Qs</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} />
                      <span>{quiz.durationMinutes} mins</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Award size={14} />
                      <span>{quiz.totalPoints || quiz.questions.length * 10} pts</span>
                    </div>
                  </div>

                  {/* Schedule Info Banner if Upcoming */}
                  {isUpcoming && (
                    <div style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: '600', 
                      color: 'var(--warning-text)', 
                      background: 'var(--warning-bg)', 
                      padding: '0.5rem 0.75rem', 
                      borderRadius: '0.5rem',
                      marginBottom: '0.75rem',
                      textAlign: 'center'
                    }}>
                      📅 Scheduled: {quiz.scheduleDate || 'Starts Soon'}
                    </div>
                  )}

                  <button
                    className={`btn ${isUpcoming ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ width: '100%' }}
                    onClick={() => {
                      if (!user) {
                        onOpenLogin();
                      } else {
                        onStartQuiz(quiz);
                      }
                    }}
                  >
                    {isUpcoming ? (
                      <>
                        <Calendar size={16} />
                        <span>Preview Upcoming Examination</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        <span>{previousAttempt ? 'Retake Examination' : 'Start Examination'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

