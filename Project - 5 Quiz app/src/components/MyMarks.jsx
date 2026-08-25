import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { Award, Mail, Calendar, BookOpen, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export const MyMarks = ({ onGoToQuizzes }) => {
  const { submissions, user } = useQuiz();

  // Filter submissions ONLY for the currently logged in student
  const studentSubmissions = user 
    ? submissions.filter(s => s.studentEmail === user.email)
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.75rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem' }}>
            <Award size={18} />
            <span>Academic Performance Record</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>My Examination Marks</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Showing verified results registered under <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{user?.email}</span>
          </p>
        </div>

        <button className="btn btn-outline" onClick={onGoToQuizzes}>
          <BookOpen size={16} />
          <span>Take More Quizzes</span>
        </button>
      </div>

      {/* Submissions List */}
      {studentSubmissions.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
          <FileText size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>No examination records found</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            You haven't completed any quizzes yet. Take an upcoming quiz to view your score card here.
          </p>
          <button className="btn btn-primary" onClick={onGoToQuizzes}>
            Browse Upcoming Quizzes
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Quiz & Subject</th>
                <th>Submitted On</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Status</th>
                <th>Email Dispatch</th>
              </tr>
            </thead>
            <tbody>
              {studentSubmissions.map(sub => (
                <tr key={sub.id}>
                  <td>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{sub.quizTitle}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{sub.subject}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                      <Calendar size={14} className="text-muted" />
                      <span>{sub.submittedAt}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--accent-primary)' }}>
                      {sub.score} / {sub.maxScore}
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      fontWeight: '800', 
                      fontSize: '1rem',
                      color: sub.passed ? 'var(--success-text)' : 'var(--warning-text)'
                    }}>
                      {sub.percentage}%
                    </span>
                  </td>
                  <td>
                    {sub.passed ? (
                      <span className="badge-subject" style={{ background: 'var(--success-bg)', color: 'var(--success-text)', border: '1px solid var(--success-border)' }}>
                        <CheckCircle size={12} /> PASSED
                      </span>
                    ) : (
                      <span className="badge-subject" style={{ background: 'var(--warning-bg)', color: 'var(--warning-text)', border: '1px solid var(--warning-border)' }}>
                        <AlertCircle size={12} /> NEEDS REVIEW
                      </span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--success-text)' }}>
                      <Mail size={14} />
                      <span>Dispatched</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
