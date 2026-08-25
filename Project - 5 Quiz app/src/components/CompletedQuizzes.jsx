import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Eye, 
  Printer, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  X,
  FileCheck
} from 'lucide-react';

export const CompletedQuizzes = () => {
  const { submissions, user } = useQuiz();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubForModal, setSelectedSubForModal] = useState(null);
  const [certificateModalSub, setCertificateModalSub] = useState(null);

  // Filter submissions based on role and search query
  const userSubmissions = user?.role === 'staff'
    ? submissions
    : submissions.filter(s => s.studentEmail?.toLowerCase() === user?.email?.toLowerCase());

  const filteredSubmissions = userSubmissions.filter(s =>
    s.quizTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.studentName && s.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getSubjectBadgeClass = (subject) => {
    if (subject.includes('Java')) return 'badge-java';
    if (subject.includes('Python')) return 'badge-python';
    if (subject.includes('Web')) return 'badge-web';
    if (subject.includes('Database')) return 'badge-dbms';
    return 'badge-web';
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Banner */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(99, 102, 241, 0.12))',
          border: '1px solid var(--border-color)',
          padding: '2.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--success-bg)', color: 'var(--success-text)', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.85rem' }}>
              <Award size={14} />
              <span>Assessment History & Scorecards</span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
              {user?.role === 'staff' ? 'All Completed Student Examinations' : 'My Completed Quizzes'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Review past exam attempts, analyze correct answers vs selected options, and download official pass certificates.
            </p>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.5rem', fontSize: '0.85rem' }}
              placeholder="Search scorecards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid of Completed Cards */}
      {filteredSubmissions.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
          <FileCheck size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>No Completed Quizzes Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            {user?.role === 'staff' 
              ? 'No students have completed examinations yet.' 
              : 'You have not completed any quizzes yet. Take an upcoming quiz to view your scorecard here!'}
          </p>
        </div>
      ) : (
        <div className="grid-cards">
          {filteredSubmissions.map(sub => (
            <div key={sub.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <span className={`badge-subject ${getSubjectBadgeClass(sub.subject)}`}>
                    {sub.subject}
                  </span>

                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '800', 
                    color: sub.passed ? 'var(--success-text)' : 'var(--warning-text)', 
                    background: sub.passed ? 'var(--success-bg)' : 'var(--warning-bg)', 
                    padding: '0.25rem 0.6rem', 
                    borderRadius: '9999px',
                    border: `1px solid ${sub.passed ? 'var(--success-border)' : 'var(--warning-border)'}`
                  }}>
                    {sub.passed ? 'PASSED' : 'NEEDS REVIEW'}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.15rem', fontWeight: '700', lineHeight: '1.4', marginBottom: '0.4rem' }}>
                  {sub.quizTitle}
                </h2>

                {user?.role === 'staff' && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    Student: <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{sub.studentName}</span> ({sub.studentEmail})
                  </p>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <Clock size={14} />
                  <span>Submitted: {sub.submittedAt}</span>
                </div>
              </div>

              <div>
                {/* Score Stats */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '0.5rem', 
                  padding: '0.75rem', 
                  background: 'var(--bg-tertiary)', 
                  borderRadius: '0.65rem',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Score</span>
                    <span style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--accent-primary)' }}>
                      {sub.score} / {sub.maxScore}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Percentage</span>
                    <span style={{ fontWeight: '800', fontSize: '1.1rem', color: sub.passed ? 'var(--success-text)' : 'var(--warning-text)' }}>
                      {sub.percentage}%
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-outline"
                    style={{ flex: 1, fontSize: '0.825rem', padding: '0.5rem' }}
                    onClick={() => setSelectedSubForModal(sub)}
                  >
                    <Eye size={14} />
                    <span>Review Answers</span>
                  </button>

                  {sub.passed && (
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: '0.825rem', padding: '0.5rem 0.85rem' }}
                      onClick={() => setCertificateModalSub(sub)}
                      title="View Pass Certificate"
                    >
                      <Award size={14} />
                      <span>Certificate</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: QUESTION BY QUESTION ANSWER REVIEW */}
      {selectedSubForModal && (
        <div className="modal-overlay" onClick={() => setSelectedSubForModal(null)}>
          <div className="modal-content" style={{ maxWidth: '750px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <div>
                <span className={`badge-subject ${getSubjectBadgeClass(selectedSubForModal.subject)}`} style={{ marginBottom: '0.35rem' }}>
                  {selectedSubForModal.subject}
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }}>{selectedSubForModal.quizTitle}</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Detailed Scorecard for {selectedSubForModal.studentName} ({selectedSubForModal.studentEmail})
                </p>
              </div>
              <button className="btn-icon" onClick={() => setSelectedSubForModal(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Score Summary Box */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FINAL SCORE</span>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                  {selectedSubForModal.score} / {selectedSubForModal.maxScore}
                </div>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'var(--border-color)' }} />
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PERCENTAGE</span>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: selectedSubForModal.passed ? 'var(--success-text)' : 'var(--warning-text)' }}>
                  {selectedSubForModal.percentage}%
                </div>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'var(--border-color)' }} />
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>STATUS</span>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: selectedSubForModal.passed ? 'var(--success-text)' : 'var(--warning-text)' }}>
                  {selectedSubForModal.passed ? 'PASSED' : 'NEEDS REVIEW'}
                </div>
              </div>
            </div>

            {/* Questions Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '50vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {(selectedSubForModal.quizQuestions || []).map((q, idx) => {
                const studentAnsIdx = selectedSubForModal.answers?.[idx];
                const isCorrect = studentAnsIdx === q.correctAnswerIndex;

                return (
                  <div key={idx} className="card" style={{ padding: '1.15rem', background: isCorrect ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)', border: `1px solid ${isCorrect ? 'var(--success-border)' : 'var(--danger-border)'}` }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Q{idx + 1}. {q.questionText}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '800', color: isCorrect ? 'var(--success-text)' : 'var(--danger-text)' }}>
                        {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        {isCorrect ? `+${q.points || 10} pts` : `0 / ${q.points || 10} pts`}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                      {q.options.map((opt, optIdx) => {
                        const isStudentChoice = studentAnsIdx === optIdx;
                        const isCorrectChoice = q.correctAnswerIndex === optIdx;
                        let optStyle = { padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' };

                        if (isCorrectChoice) {
                          optStyle = { ...optStyle, background: 'var(--success-bg)', borderColor: 'var(--success-border)', color: 'var(--success-text)', fontWeight: '700' };
                        } else if (isStudentChoice && !isCorrectChoice) {
                          optStyle = { ...optStyle, background: 'var(--danger-bg)', borderColor: 'var(--danger-border)', color: 'var(--danger-text)', fontWeight: '700' };
                        }

                        return (
                          <div key={optIdx} style={optStyle}>
                            <span style={{ fontWeight: '700', marginRight: '0.4rem' }}>{String.fromCharCode(65 + optIdx)}:</span>
                            <span>{opt}</span>
                            {isStudentChoice && <span style={{ marginLeft: '0.4rem', fontSize: '0.7rem' }}>(Your Choice)</span>}
                            {isCorrectChoice && <span style={{ marginLeft: '0.4rem', fontSize: '0.7rem' }}>(Correct Answer)</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINTABLE CERTIFICATE MODAL */}
      {certificateModalSub && (
        <div className="modal-overlay" onClick={() => setCertificateModalSub(null)}>
          <div className="modal-content" style={{ maxWidth: '680px', padding: '2.5rem', textAlign: 'center', background: 'var(--bg-secondary)', border: '2px solid var(--accent-primary)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ border: '3px double var(--accent-primary)', padding: '2rem', borderRadius: '1rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                <Sparkles size={20} />
                <span>Certificate of Achievement</span>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'serif', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                EXCELLENCE IN ASSESSMENT
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                This is to officially certify that
              </p>

              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--accent-primary)', textDecoration: 'underline', marginBottom: '1rem' }}>
                {certificateModalSub.studentName}
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                has successfully passed the examination for <br />
                <strong style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>{certificateModalSub.quizTitle}</strong> ({certificateModalSub.subject}) <br />
                with an outstanding score of <strong>{certificateModalSub.score} / {certificateModalSub.maxScore} ({certificateModalSub.percentage}%)</strong>.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <div>
                  <strong>Issued On:</strong> {certificateModalSub.submittedAt}
                </div>
                <div>
                  <strong>Verification ID:</strong> CERT-{certificateModalSub.id.toUpperCase()}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={() => setCertificateModalSub(null)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={handlePrintCertificate}>
                <Printer size={16} />
                <span>Print / Download Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
