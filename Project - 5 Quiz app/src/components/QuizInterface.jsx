import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export const QuizInterface = ({ quiz, onSubmitQuiz, onCancel }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz.durationMinutes * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer Countdown Effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = quiz.questions[currentIdx];
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    onSubmitQuiz(quiz.id, selectedAnswers);
  };

  const isUrgent = timeLeft < 60;

  return (
    <div className="modal-overlay" style={{ background: 'var(--bg-primary)', zIndex: 90, padding: 0 }}>
      <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Exam Header Bar */}
        <header style={{ 
          background: 'var(--bg-secondary)', 
          borderBottom: '1px solid var(--border-color)',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
              {quiz.subject}
            </span>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{quiz.title}</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Live Countdown Timer */}
            <div className={`quiz-timer-box ${isUrgent ? 'quiz-timer-urgent' : ''}`}>
              <Clock size={18} />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={onCancel}>
              Quit Test
            </button>
          </div>
        </header>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '4px', background: 'var(--bg-tertiary)' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${progressPercent}%`, 
              background: 'var(--accent-primary)',
              transition: 'width 0.3s ease'
            }} 
          />
        </div>

        {/* Question Area */}
        <main style={{ flex: 1, maxWidth: '800px', width: '100%', margin: '0 auto', padding: '2.5rem 1.5rem', overflowY: 'auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
              Question {currentIdx + 1} of {totalQuestions}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Answered {answeredCount} / {totalQuestions}
            </span>
          </div>

          {/* Question Card */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: '1.5', marginBottom: '1.75rem' }}>
              {currentQ.questionText}
            </h2>

            {/* Answer Choices */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                const optionLabel = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={optIdx}
                    className={`choice-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(optIdx)}
                  >
                    <span className="choice-indicator">
                      {optionLabel}
                    </span>
                    <span style={{ flex: 1 }}>{optionText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentIdx === 0}
              style={{ opacity: currentIdx === 0 ? 0.5 : 1 }}
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {currentIdx < totalQuestions - 1 ? (
                <button className="btn btn-primary" onClick={handleNext}>
                  <span>Next Question</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  className="btn btn-primary" 
                  style={{ background: 'var(--success-border)', borderColor: 'var(--success-border)', color: '#ffffff' }}
                  onClick={handleFinalSubmit}
                >
                  <CheckCircle2 size={18} />
                  <span>Submit Final Exam</span>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
