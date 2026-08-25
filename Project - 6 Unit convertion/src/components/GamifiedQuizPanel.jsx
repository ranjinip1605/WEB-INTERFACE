import React, { useState } from 'react';
import { Trophy, Award, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { TRIVIA_QUESTIONS, BADGES } from '../data/triviaQuiz';

export function GamifiedQuizPanel({ unlockedBadges = [], onUnlockBadge, onShowToast }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = TRIVIA_QUESTIONS[currentIdx];

  const handleOptionClick = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < TRIVIA_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      if (score + (selectedOption === currentQ.correctIndex ? 1 : 0) === TRIVIA_QUESTIONS.length) {
        onUnlockBadge('quiz_champ');
        onShowToast('🏆 Trophy Unlocked: Trivia Master badge awarded!');
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="tool-card glass-panel animate-fade-in">
      <div className="tool-header">
        <Trophy className="tool-icon text-gold" />
        <div>
          <h3 className="tool-title">Gamified Converter & Achievement Badges</h3>
          <p className="tool-subtitle">Test your unit knowledge & unlock achievement trophies</p>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="badges-section">
        <h4 className="section-subtitle">Your Badges & Achievements</h4>
        <div className="badges-grid">
          {BADGES.map((b) => {
            const isUnlocked = unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`badge-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                title={b.desc}
              >
                <span className="badge-icon">{b.icon}</span>
                <span className="badge-name">{b.name}</span>
                <span className="badge-status">{isUnlocked ? 'Unlocked' : 'Locked'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Section */}
      <div className="quiz-section">
        <h4 className="section-subtitle">Daily Unit Trivia Quiz</h4>

        {!quizFinished ? (
          <div className="quiz-box">
            <div className="quiz-header-row">
              <span className="q-counter">Question {currentIdx + 1} of {TRIVIA_QUESTIONS.length}</span>
              <span className="q-score">Score: {score}</span>
            </div>

            <h4 className="question-text">{currentQ.question}</h4>

            <div className="quiz-options-list">
              {currentQ.options.map((opt, idx) => {
                let btnClass = 'quiz-option-btn';
                if (selectedOption !== null) {
                  if (idx === currentQ.correctIndex) btnClass += ' correct';
                  else if (idx === selectedOption) btnClass += ' wrong';
                }

                return (
                  <button
                    key={idx}
                    className={btnClass}
                    onClick={() => handleOptionClick(idx)}
                    disabled={selectedOption !== null}
                  >
                    <span>{opt}</span>
                    {selectedOption !== null && idx === currentQ.correctIndex && <CheckCircle2 size={16} />}
                    {selectedOption !== null && idx === selectedOption && idx !== currentQ.correctIndex && <XCircle size={16} />}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="explanation-box">
                <p>{currentQ.explanation}</p>
                <button className="next-q-btn" onClick={handleNext}>
                  {currentIdx + 1 === TRIVIA_QUESTIONS.length ? 'Finish Quiz' : 'Next Question ➔'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="quiz-finished-box">
            <Trophy size={48} className="text-gold animate-rotate" />
            <h3>Quiz Completed!</h3>
            <p className="final-score-text">Your Final Score: <strong className="text-red">{score} / {TRIVIA_QUESTIONS.length}</strong></p>
            <button className="restart-quiz-btn" onClick={handleRestart}>
              <RotateCcw size={16} /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
