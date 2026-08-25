import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { 
  Sun, 
  Moon, 
  Zap, 
  LogOut, 
  User, 
  BookOpen, 
  Award, 
  PlusCircle, 
  Users, 
  History,
  Calendar,
  FileCode,
  CheckCircle2
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onOpenLogin }) => {
  const { theme, toggleTheme, user, logout } = useQuiz();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => setActiveTab('quizzes')} style={{ cursor: 'pointer' }}>
          <span className="brand-badge">
            <Zap size={20} className="text-white" />
          </span>
          <span>Quiz<span style={{ color: 'var(--accent-primary)' }}>Pulse</span></span>
        </div>

        {/* Navigation Tabs based on Role */}
        <div className="nav-actions">
          <div className="nav-tabs">
            {(!user || user.role === 'student') && (
              <>
                <button
                  className={`nav-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  <Calendar size={16} />
                  <span>Upcoming Quizzes</span>
                </button>

                <button
                  className={`nav-tab ${activeTab === 'quizzes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('quizzes')}
                >
                  <BookOpen size={16} />
                  <span>Available Examinations</span>
                </button>

                <button
                  className={`nav-tab ${activeTab === 'completed' ? 'active' : ''}`}
                  onClick={() => setActiveTab('completed')}
                >
                  <CheckCircle2 size={16} />
                  <span>Completed Quizzes</span>
                </button>
              </>
            )}

            {user && user.role === 'staff' && (
              <>
                <button
                  className={`nav-tab ${activeTab === 'templates' ? 'active' : ''}`}
                  onClick={() => setActiveTab('templates')}
                >
                  <FileCode size={16} />
                  <span>Quiz Templates</span>
                </button>

                <button
                  className={`nav-tab ${activeTab === 'create-quiz' ? 'active' : ''}`}
                  onClick={() => setActiveTab('create-quiz')}
                >
                  <PlusCircle size={16} />
                  <span>Create Quiz</span>
                </button>

                <button
                  className={`nav-tab ${activeTab === 'quizzes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('quizzes')}
                >
                  <BookOpen size={16} />
                  <span>Exams Audit</span>
                </button>

                <button
                  className={`nav-tab ${activeTab === 'completed' ? 'active' : ''}`}
                  onClick={() => setActiveTab('completed')}
                >
                  <CheckCircle2 size={16} />
                  <span>Completed History</span>
                </button>

                <button
                  className={`nav-tab ${activeTab === 'all-marks' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all-marks')}
                >
                  <Users size={16} />
                  <span>Student Marks</span>
                </button>

                <button
                  className={`nav-tab ${activeTab === 'logout-logs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('logout-logs')}
                >
                  <History size={16} />
                  <span>Logout Logs</span>
                </button>
              </>
            )}
          </div>

          {/* Theme Switcher Toggle */}
          <button 
            className="btn-icon" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          {/* User Auth Controls */}
          {user ? (
            <div className="user-badge">
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col" style={{ lineHeight: '1.2' }}>
                <span className="font-semibold text-xs text-primary">{user.name}</span>
                <span className="text-muted text-xs capitalize">({user.role})</span>
              </div>
              <button 
                className="btn-icon" 
                onClick={logout} 
                title="Logout"
                style={{ border: 'none', background: 'transparent', padding: '0.2rem' }}
              >
                <LogOut size={16} className="text-danger" />
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={onOpenLogin}>
              <User size={16} />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
