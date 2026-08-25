import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { SUBJECT_OPTIONS } from '../data/initialQuizzes';
import { 
  PlusCircle, 
  Users, 
  History, 
  Trash2, 
  Check, 
  Search, 
  Mail, 
  Clock, 
  HelpCircle, 
  Sparkles,
  Save,
  Key,
  FileCode,
  Calendar,
  Layers,
  Zap,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const StaffDashboard = ({ activeStaffSubTab = 'create-quiz', setActiveStaffSubTab }) => {
  const { 
    quizzes, 
    quizTemplates,
    addQuiz, 
    addQuizFromTemplate,
    toggleQuizStatus,
    deleteQuiz, 
    submissions, 
    logoutLogs 
  } = useQuiz();

  // Create Quiz Form State
  const [quizTitle, setQuizTitle] = useState('');
  const [quizSubject, setQuizSubject] = useState(SUBJECT_OPTIONS[0]);
  const [quizDesc, setQuizDesc] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(10);
  const [quizStatus, setQuizStatus] = useState('active'); // active | upcoming
  const [scheduleDate, setScheduleDate] = useState('Available Now');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswerIndex: 0,
      points: 10
    }
  ]);
  const [createMsg, setCreateMsg] = useState('');

  // Search & Filter state for All Marks table
  const [marksSearch, setMarksSearch] = useState('');

  // Handle template selection
  const handleLoadTemplateToEditor = (tpl) => {
    setQuizTitle(tpl.title);
    setQuizSubject(tpl.subject);
    setQuizDesc(tpl.description);
    setDurationMinutes(tpl.durationMinutes);
    setQuestions(tpl.questions);
    setActiveStaffSubTab('create-quiz');
    setCreateMsg(`Template "${tpl.title}" loaded into editor! You can customize it now.`);
    setTimeout(() => setCreateMsg(''), 4000);
  };

  const handleInstantPublishTemplate = (tpl) => {
    addQuizFromTemplate(tpl);
    setCreateMsg(`Template "${tpl.title}" published successfully to student portal!`);
    setTimeout(() => setCreateMsg(''), 4000);
  };

  // Question handlers for Quiz Creator
  const handleQuestionTextChange = (idx, text) => {
    const updated = [...questions];
    updated[idx].questionText = text;
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, optIdx, val) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = val;
    setQuestions(updated);
  };

  const handleCorrectChoiceChange = (qIdx, optIdx) => {
    const updated = [...questions];
    updated[qIdx].correctAnswerIndex = optIdx;
    setQuestions(updated);
  };

  const addQuestionField = () => {
    setQuestions(prev => [
      ...prev,
      {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0,
        points: 10
      }
    ]);
  };

  const removeQuestionField = (idx) => {
    if (questions.length === 1) return;
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSaveQuiz = (e) => {
    e.preventDefault();
    if (!quizTitle.trim()) {
      setCreateMsg('Please enter a Quiz Title.');
      return;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].questionText.trim()) {
        setCreateMsg(`Question ${i + 1} text cannot be empty.`);
        return;
      }
      for (let j = 0; j < 4; j++) {
        if (!questions[i].options[j].trim()) {
          setCreateMsg(`Question ${i + 1} option ${String.fromCharCode(65 + j)} cannot be empty.`);
          return;
        }
      }
    }

    const totalPts = questions.reduce((acc, q) => acc + (parseInt(q.points) || 10), 0);

    const newQuizObj = {
      title: quizTitle.trim(),
      subject: quizSubject,
      description: quizDesc.trim() || `Quiz on ${quizSubject}`,
      durationMinutes: parseInt(durationMinutes) || 10,
      totalPoints: totalPts,
      status: quizStatus,
      scheduleDate: quizStatus === 'active' ? 'Available Now' : scheduleDate,
      questions: questions
    };

    addQuiz(newQuizObj);
    setCreateMsg(`Quiz "${newQuizObj.title}" created successfully as ${quizStatus.toUpperCase()}!`);

    // Reset Form
    setQuizTitle('');
    setQuizDesc('');
    setQuestions([
      { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0, points: 10 }
    ]);
    setTimeout(() => setCreateMsg(''), 4000);
  };

  // Filter student submissions
  const filteredSubmissions = submissions.filter(sub => 
    sub.studentName.toLowerCase().includes(marksSearch.toLowerCase()) ||
    sub.studentEmail.toLowerCase().includes(marksSearch.toLowerCase()) ||
    sub.quizTitle.toLowerCase().includes(marksSearch.toLowerCase()) ||
    sub.subject.toLowerCase().includes(marksSearch.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Staff Header */}
      <div className="card" style={{ padding: '1.75rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.14), rgba(168, 85, 247, 0.14))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              <Sparkles size={16} />
              <span>Staff Administration Portal</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Faculty Control Center</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              Select pre-built templates, create custom exams, schedule upcoming quizzes, and audit student performance.
            </p>
          </div>

          {/* Sub-tab Navigation Buttons */}
          <div className="nav-tabs">
            <button
              className={`nav-tab ${activeStaffSubTab === 'templates' ? 'active' : ''}`}
              onClick={() => setActiveStaffSubTab('templates')}
            >
              <FileCode size={16} />
              <span>Quiz Templates</span>
            </button>

            <button
              className={`nav-tab ${activeStaffSubTab === 'create-quiz' ? 'active' : ''}`}
              onClick={() => setActiveStaffSubTab('create-quiz')}
            >
              <PlusCircle size={16} />
              <span>Create Quiz</span>
            </button>

            <button
              className={`nav-tab ${activeStaffSubTab === 'all-marks' ? 'active' : ''}`}
              onClick={() => setActiveStaffSubTab('all-marks')}
            >
              <Users size={16} />
              <span>Student Marks ({submissions.length})</span>
            </button>

            <button
              className={`nav-tab ${activeStaffSubTab === 'logout-logs' ? 'active' : ''}`}
              onClick={() => setActiveStaffSubTab('logout-logs')}
            >
              <History size={16} />
              <span>Logout Logs ({logoutLogs.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 0: QUIZ TEMPLATES */}
      {activeStaffSubTab === 'templates' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'var(--bg-secondary)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileCode size={22} className="text-accent" />
                  <span>Pre-built Staff Quiz Templates</span>
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Select from ready-to-use assessment templates across Java, Python, React, and SQL DBMS domains.
                </p>
              </div>
            </div>
          </div>

          {createMsg && (
            <div className="toast-banner toast-success">
              {createMsg}
            </div>
          )}

          <div className="grid-cards">
            {(quizTemplates || []).map(tpl => (
              <div key={tpl.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="badge-subject badge-web">
                      {tpl.subject}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-primary)', background: 'var(--accent-light)', padding: '0.25rem 0.5rem', borderRadius: '0.4rem' }}>
                      {tpl.category}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.2rem', fontWeight: '700', lineHeight: '1.4', marginBottom: '0.5rem' }}>
                    {tpl.title}
                  </h2>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                    {tpl.description}
                  </p>
                </div>

                <div>
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
                      <span>{tpl.questions.length} Qs</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} />
                      <span>{tpl.durationMinutes} mins</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Zap size={14} />
                      <span>{tpl.totalPoints} pts</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-outline"
                      style={{ flex: 1, fontSize: '0.825rem', padding: '0.5rem' }}
                      onClick={() => handleLoadTemplateToEditor(tpl)}
                    >
                      <PlusCircle size={14} />
                      <span>Customize in Editor</span>
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: '0.825rem', padding: '0.5rem 0.85rem' }}
                      onClick={() => handleInstantPublishTemplate(tpl)}
                    >
                      <Zap size={14} />
                      <span>Publish</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 1: CREATE QUIZ */}
      {activeStaffSubTab === 'create-quiz' && (
        <div className="card">
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlusCircle size={20} className="text-accent" />
            <span>Create New Quiz Assessment</span>
          </h2>

          {createMsg && (
            <div className={`toast-banner ${createMsg.includes('successfully') ? 'toast-success' : 'toast-danger'}`}>
              {createMsg}
            </div>
          )}

          <form onSubmit={handleSaveQuiz}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Quiz Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Advanced Trees & Graphs in Java"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject Domain *</label>
                <select
                  className="form-select"
                  value={quizSubject}
                  onChange={(e) => setQuizSubject(e.target.value)}
                >
                  {SUBJECT_OPTIONS.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Short Description</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Brief overview of topics covered..."
                  value={quizDesc}
                  onChange={(e) => setQuizDesc(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Duration (Minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  className="form-input"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Exam Status / Availability *</label>
                <select
                  className="form-select"
                  value={quizStatus}
                  onChange={(e) => setQuizStatus(e.target.value)}
                >
                  <option value="active">Active (Available Now)</option>
                  <option value="upcoming">Upcoming (Scheduled Examination)</option>
                </select>
              </div>
            </div>

            {quizStatus === 'upcoming' && (
              <div className="form-group">
                <label className="form-label">Scheduled Launch Date / Note *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Tomorrow at 10:00 AM or Sep 1, 2:00 PM"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>
            )}

            <hr style={{ borderColor: 'var(--border-color)', margin: '1.5rem 0' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Questions ({questions.length})</h3>
              <button type="button" className="btn btn-secondary" onClick={addQuestionField} style={{ fontSize: '0.85rem' }}>
                <PlusCircle size={16} />
                <span>Add Question</span>
              </button>
            </div>

            {/* Questions List Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {questions.map((q, qIdx) => (
                <div key={qIdx} className="card" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Question #{qIdx + 1}</span>
                    {questions.length > 1 && (
                      <button 
                        type="button" 
                        className="btn-icon" 
                        onClick={() => removeQuestionField(qIdx)}
                        style={{ color: 'var(--danger-text)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      style={{ background: 'var(--bg-secondary)' }}
                      placeholder="Type your question statement here..."
                      value={q.questionText}
                      onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="radio"
                          name={`correct-opt-${qIdx}`}
                          checked={q.correctAnswerIndex === optIdx}
                          onChange={() => handleCorrectChoiceChange(qIdx, optIdx)}
                          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                          title="Mark as Correct Option"
                        />
                        <span style={{ fontWeight: '700', fontSize: '0.85rem', width: '20px' }}>
                          {String.fromCharCode(65 + optIdx)}:
                        </span>
                        <input
                          type="text"
                          className="form-input"
                          style={{ background: 'var(--bg-secondary)', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                          placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                          value={opt}
                          onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    * Select the radio button next to the option that represents the correct answer.
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                <Save size={18} />
                <span>Save & Publish Quiz</span>
              </button>
            </div>
          </form>

          {/* Published Quizzes Management Table */}
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} className="text-accent" />
              <span>Manage Existing Published Quizzes ({quizzes.length})</span>
            </h3>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title & Subject</th>
                    <th>Questions / Duration</th>
                    <th>Availability Status</th>
                    <th>Schedule Launch</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map(q => (
                    <tr key={q.id}>
                      <td>
                        <div style={{ fontWeight: '700' }}>{q.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{q.subject}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.85rem' }}>{q.questions.length} Questions</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{q.durationMinutes} Minutes</div>
                      </td>
                      <td>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: '800', 
                          color: q.status === 'upcoming' ? 'var(--warning-text)' : 'var(--success-text)', 
                          background: q.status === 'upcoming' ? 'var(--warning-bg)' : 'var(--success-bg)', 
                          padding: '0.2rem 0.5rem', 
                          borderRadius: '0.4rem',
                          border: `1px solid ${q.status === 'upcoming' ? 'var(--warning-border)' : 'var(--success-border)'}`
                        }}>
                          {q.status === 'upcoming' ? 'UPCOMING' : 'ACTIVE'}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>
                        {q.scheduleDate || 'Available Now'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button
                            type="button"
                            className="btn btn-outline"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                            onClick={() => toggleQuizStatus(q.id)}
                            title="Toggle Status (Active <-> Upcoming)"
                          >
                            <span>Switch to {q.status === 'active' ? 'Upcoming' : 'Active'}</span>
                          </button>

                          <button
                            type="button"
                            className="btn-icon"
                            style={{ color: 'var(--danger-text)', padding: '0.35rem' }}
                            onClick={() => deleteQuiz(q.id)}
                            title="Delete Quiz"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ALL STUDENTS MARKS */}
      {activeStaffSubTab === 'all-marks' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>All Student Examination Marks</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Audited list of student submissions across all subjects
              </p>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.5rem', fontSize: '0.85rem' }}
                placeholder="Search student or subject..."
                value={marksSearch}
                onChange={(e) => setMarksSearch(e.target.value)}
              />
            </div>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-secondary)' }}>
              No student submission records found.
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student Details</th>
                    <th>Email Address</th>
                    <th>Quiz Title & Subject</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map(sub => (
                    <tr key={sub.id}>
                      <td>
                        <div style={{ fontWeight: '700' }}>{sub.studentName}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                          <Mail size={14} className="text-muted" />
                          <span>{sub.studentEmail}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{sub.quizTitle}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{sub.subject}</div>
                      </td>
                      <td>
                        <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>
                          {sub.score} / {sub.maxScore}
                        </span>
                      </td>
                      <td>
                        <span style={{ 
                          fontWeight: '800', 
                          color: sub.passed ? 'var(--success-text)' : 'var(--warning-text)'
                        }}>
                          {sub.percentage}%
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <Clock size={14} />
                          <span>{sub.submittedAt}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LOGOUT LOGS */}
      {activeStaffSubTab === 'logout-logs' && (
        <div className="card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>System Logout Activity Logs</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Tracks recent session logout timestamps for students and staff members
            </p>
          </div>

          {logoutLogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-secondary)' }}>
              No user logout activity logged yet in this session.
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>System Role</th>
                    <th>Logout Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logoutLogs.map(log => (
                    <tr key={log.id}>
                      <td style={{ fontWeight: '700' }}>{log.name}</td>
                      <td>{log.email}</td>
                      <td>
                        <span className={`badge-subject ${log.role === 'staff' ? 'badge-java' : 'badge-web'}`}>
                          {log.role.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                          <Clock size={14} className="text-muted" />
                          <span>{log.logoutTime}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
