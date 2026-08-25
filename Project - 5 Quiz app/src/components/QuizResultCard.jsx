import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, XCircle, Mail, RotateCcw } from 'lucide-react';

export const QuizResultCard = ({ result, onReturnDashboard }) => {
  useEffect(() => {
    if (result.passed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti effect triggered');
      }
    }
  }, [result]);

  return (
    <div className="modal-overlay" style={{ background: 'var(--bg-primary)', zIndex: 100 }}>
      <div className="modal-content" style={{ maxWidth: '600px', padding: '2.5rem', textAlign: 'center' }}>
        
        {/* Pass / Fail Icon Badge */}
        <div style={{ margin: '0 auto 1.5rem', display: 'inline-flex' }}>
          {result.passed ? (
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'var(--success-bg)', 
              color: 'var(--success-text)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px solid var(--success-border)'
            }}>
              <CheckCircle size={48} />
            </div>
          ) : (
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'var(--warning-bg)', 
              color: 'var(--warning-text)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px solid var(--warning-border)'
            }}>
              <XCircle size={48} />
            </div>
          )}
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.25rem' }}>
          {result.passed ? 'Examination Passed!' : 'Assessment Completed'}
        </h1>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
          {result.quizTitle} • <span style={{ fontWeight: '600' }}>{result.subject}</span>
        </p>

        {/* Email Dispatch Notice */}
        <div className="toast-banner toast-info" style={{ textAlign: 'left', marginBottom: '1.75rem', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Mail size={24} style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.875rem' }}>
            <span style={{ fontWeight: '700', display: 'block' }}>Email Scorecard Dispatched</span>
            Your mark breakdown has been automatically sent to <span style={{ fontWeight: '700', textDecoration: 'underline' }}>{result.studentEmail}</span>.
          </div>
        </div>

        {/* Score Statistics Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Score</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '0.2rem' }}>
              {result.score} / {result.maxScore}
            </h2>
          </div>

          <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Percentage</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: result.passed ? 'var(--success-text)' : 'var(--warning-text)', marginTop: '0.2rem' }}>
              {result.percentage}%
            </h2>
          </div>

          <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Result</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: result.passed ? 'var(--success-text)' : 'var(--warning-text)', marginTop: '0.35rem' }}>
              {result.passed ? 'PASS' : 'REVIEW'}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="btn btn-primary" style={{ minWidth: '200px' }} onClick={onReturnDashboard}>
            <RotateCcw size={16} />
            <span>Return to Dashboard</span>
          </button>
        </div>

      </div>
    </div>
  );
};
