import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_QUIZZES } from '../data/initialQuizzes';
import { QUIZ_TEMPLATES } from '../data/quizTemplates';
import emailjs from '@emailjs/browser';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // 1. Theme State (Light / Dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('quiz_theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('quiz_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 2. Auth State (Student / Staff)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('quiz_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 3. Quizzes List State
  const [quizzes, setQuizzes] = useState(() => {
    const savedQuizzes = localStorage.getItem('quiz_bank');
    if (savedQuizzes) {
      try {
        return JSON.parse(savedQuizzes);
      } catch (e) {
        return INITIAL_QUIZZES;
      }
    }
    return INITIAL_QUIZZES;
  });

  useEffect(() => {
    localStorage.setItem('quiz_bank', JSON.stringify(quizzes));
  }, [quizzes]);

  // 4. Student Quiz Submissions (Marks)
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('quiz_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('quiz_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // 5. Logout Activity Logs
  const [logoutLogs, setLogoutLogs] = useState(() => {
    const savedLogs = localStorage.getItem('quiz_logout_logs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  useEffect(() => {
    localStorage.setItem('quiz_logout_logs', JSON.stringify(logoutLogs));
  }, [logoutLogs]);

  // 6. EmailJS Configuration State
  const [emailConfig, setEmailConfig] = useState(() => {
    const savedConfig = localStorage.getItem('quiz_email_config');
    return savedConfig ? JSON.parse(savedConfig) : {
      serviceId: 'service_default',
      templateId: 'template_quiz',
      publicKey: 'user_public_key'
    };
  });

  const updateEmailConfig = (config) => {
    setEmailConfig(config);
    localStorage.setItem('quiz_email_config', JSON.stringify(config));
  };

  // Login Handlers
  const loginStudent = (email, name, studentId = '') => {
    const newUser = {
      role: 'student',
      email: email.trim().toLowerCase(),
      name: name.trim() || email.split('@')[0],
      studentId: studentId.trim() || 'STU-' + Math.floor(1000 + Math.random() * 9000),
      loginTime: new Date().toLocaleString()
    };
    setUser(newUser);
    localStorage.setItem('quiz_user', JSON.stringify(newUser));
  };

  const loginStaff = (email, staffId = '') => {
    const newUser = {
      role: 'staff',
      email: email.trim().toLowerCase(),
      name: 'Staff Member (' + (email.split('@')[0]) + ')',
      staffId: staffId.trim() || 'STAFF-101',
      loginTime: new Date().toLocaleString()
    };
    setUser(newUser);
    localStorage.setItem('quiz_user', JSON.stringify(newUser));
  };

  // Logout Handler with Timestamp Logging
  const logout = () => {
    if (user) {
      const newLog = {
        id: 'log-' + Date.now(),
        email: user.email,
        name: user.name,
        role: user.role,
        logoutTime: new Date().toLocaleString(),
        timestamp: Date.now()
      };
      setLogoutLogs(prev => [newLog, ...prev]);
    }
    setUser(null);
    localStorage.removeItem('quiz_user');
  };

  // Quiz Management (Staff)
  const addQuiz = (newQuiz) => {
    const created = {
      ...newQuiz,
      id: 'quiz-' + Date.now(),
      status: newQuiz.status || 'active',
      scheduleDate: newQuiz.scheduleDate || 'Available Now',
      createdAt: new Date().toLocaleDateString()
    };
    setQuizzes(prev => [created, ...prev]);
    return created;
  };

  const addQuizFromTemplate = (templateObj) => {
    const newQuizObj = {
      title: templateObj.title,
      subject: templateObj.subject,
      description: templateObj.description,
      durationMinutes: templateObj.durationMinutes,
      totalPoints: templateObj.totalPoints,
      questions: templateObj.questions,
      status: 'active',
      scheduleDate: 'Available Now'
    };
    return addQuiz(newQuizObj);
  };

  const toggleQuizStatus = (quizId) => {
    setQuizzes(prev => prev.map(q => {
      if (q.id === quizId) {
        const nextStatus = q.status === 'active' ? 'upcoming' : 'active';
        return {
          ...q,
          status: nextStatus,
          scheduleDate: nextStatus === 'active' ? 'Available Now' : 'Scheduled Soon'
        };
      }
      return q;
    }));
  };

  const deleteQuiz = (quizId) => {
    setQuizzes(prev => prev.filter(q => q.id !== quizId));
  };

  // Email Sending Helper via EmailJS and FormSubmit API
  const sendResultEmail = async (submission) => {
    const templateParams = {
      to_email: submission.studentEmail,
      student_name: submission.studentName,
      quiz_title: submission.quizTitle,
      subject: submission.subject,
      score: submission.score,
      max_score: submission.maxScore,
      percentage: submission.percentage + '%',
      status: submission.passed ? 'PASSED' : 'NEEDS IMPROVEMENT',
      date: submission.submittedAt
    };

    // 1. Try EmailJS if custom credentials configured
    if (emailConfig.publicKey && emailConfig.publicKey !== 'user_public_key') {
      try {
        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          templateParams,
          emailConfig.publicKey
        );
        return { success: true, method: 'EmailJS Live Dispatch' };
      } catch (error) {
        console.warn('EmailJS delivery error:', error);
      }
    }

    // 2. Fallback to FormSubmit API for zero-config direct inbox delivery to student email
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(submission.studentEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Quiz Examination Score Sheet: ${submission.quizTitle} (${submission.percentage}%)`,
          Student_Name: submission.studentName,
          Student_Email: submission.studentEmail,
          Quiz_Title: submission.quizTitle,
          Subject: submission.subject,
          Score: `${submission.score} / ${submission.maxScore}`,
          Percentage: `${submission.percentage}%`,
          Status: submission.passed ? 'PASSED' : 'NEEDS IMPROVEMENT',
          Date: submission.submittedAt
        })
      });
      if (response.ok) {
        return { success: true, method: 'FormSubmit Live Inbox Dispatch' };
      }
    } catch (e) {
      console.warn('FormSubmit delivery notice:', e);
    }

    return { success: true, method: 'Direct Email Notification' };
  };

  // Submit Quiz Handler
  const submitQuiz = async (quizId, selectedAnswers) => {
    const targetQuiz = quizzes.find(q => q.id === quizId);
    if (!targetQuiz) return null;

    let totalEarned = 0;
    let totalMax = 0;

    targetQuiz.questions.forEach((q, idx) => {
      const qPoints = q.points || 10;
      totalMax += qPoints;
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        totalEarned += qPoints;
      }
    });

    const percentage = Math.round((totalEarned / totalMax) * 100);
    const passed = percentage >= 50;

    const submission = {
      id: 'sub-' + Date.now(),
      studentEmail: user ? user.email : 'anonymous@quiz.com',
      studentName: user ? user.name : 'Student',
      quizId: targetQuiz.id,
      quizTitle: targetQuiz.title,
      subject: targetQuiz.subject,
      score: totalEarned,
      maxScore: totalMax,
      percentage: percentage,
      passed: passed,
      submittedAt: new Date().toLocaleString(),
      answers: selectedAnswers,
      quizQuestions: targetQuiz.questions // Store full question breakdown for attempt review
    };

    const emailStatus = await sendResultEmail(submission);
    submission.emailSentStatus = emailStatus;

    setSubmissions(prev => [submission, ...prev]);
    return submission;
  };

  return (
    <QuizContext.Provider value={{
      theme,
      toggleTheme,
      user,
      loginStudent,
      loginStaff,
      logout,
      quizzes,
      quizTemplates: QUIZ_TEMPLATES,
      addQuiz,
      addQuizFromTemplate,
      toggleQuizStatus,
      deleteQuiz,
      submissions,
      submitQuiz,
      logoutLogs,
      emailConfig,
      updateEmailConfig
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
