import React, { useState } from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { Navbar } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { StudentDashboard } from './components/StudentDashboard';
import { QuizInterface } from './components/QuizInterface';
import { QuizResultCard } from './components/QuizResultCard';
import { StaffDashboard } from './components/StaffDashboard';
import { CompletedQuizzes } from './components/CompletedQuizzes';

const MainAppContent = () => {
  const { user, submitQuiz } = useQuiz();
  const [activeTab, setActiveTab] = useState('quizzes');
  const [isLoginOpen, setIsLoginOpen] = useState(!user);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [recentResult, setRecentResult] = useState(null);
  const [activeStaffSubTab, setActiveStaffSubTab] = useState('create-quiz');

  // Automatically prompt for login if no user is logged in
  React.useEffect(() => {
    if (!user) {
      setIsLoginOpen(true);
    }
  }, [user]);

  // Handle Quiz Start
  const handleStartQuiz = (quizObj) => {
    setActiveQuiz(quizObj);
  };

  // Handle Quiz Submission
  const handleSubmitQuiz = async (quizId, selectedAnswers) => {
    const result = await submitQuiz(quizId, selectedAnswers);
    setActiveQuiz(null);
    setRecentResult(result);
  };

  // Sync navbar tabs with views
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    if (['templates', 'create-quiz', 'all-marks', 'logout-logs'].includes(tabName)) {
      setActiveStaffSubTab(tabName);
    }
  };

  const renderMainView = () => {
    if (!user) {
      return (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', margin: '2rem auto', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>Authentication Required</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Please sign in with your Student Email or Staff Credentials to access assessments and administrative tools.
          </p>
          <button className="btn btn-primary" onClick={() => setIsLoginOpen(true)}>
            Open Login Portal
          </button>
        </div>
      );
    }

    if (activeTab === 'completed') {
      return <CompletedQuizzes />;
    }

    if (user.role === 'staff' && ['templates', 'create-quiz', 'all-marks', 'logout-logs'].includes(activeTab)) {
      return (
        <StaffDashboard 
          activeStaffSubTab={activeStaffSubTab} 
          setActiveStaffSubTab={setActiveStaffSubTab} 
        />
      );
    }

    if (activeTab === 'upcoming') {
      return (
        <StudentDashboard
          defaultStatusFilter="upcoming"
          onStartQuiz={handleStartQuiz}
          onOpenLogin={() => setIsLoginOpen(true)}
        />
      );
    }

    return (
      <StudentDashboard
        defaultStatusFilter="all"
        onStartQuiz={handleStartQuiz}
        onOpenLogin={() => setIsLoginOpen(true)}
      />
    );
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Main Container */}
      <main className="main-content">
        {renderMainView()}
      </main>

      {/* Active Quiz Taking Interface Modal */}
      {activeQuiz && (
        <QuizInterface
          quiz={activeQuiz}
          onSubmitQuiz={handleSubmitQuiz}
          onCancel={() => setActiveQuiz(null)}
        />
      )}

      {/* Quiz Completion Score Card Modal */}
      {recentResult && (
        <QuizResultCard
          result={recentResult}
          onReturnDashboard={() => setRecentResult(null)}
        />
      )}

      {/* Mandatory Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        isMandatory={!user}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <QuizProvider>
      <MainAppContent />
    </QuizProvider>
  );
}

export default App;
