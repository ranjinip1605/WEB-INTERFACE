import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { UserCheck, ShieldCheck, Mail, Lock, User, Key, X } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose, isMandatory = false }) => {
  const { loginStudent, loginStaff } = useQuiz();
  const [activeRole, setActiveRole] = useState('student'); // 'student' or 'staff'

  // Student Form state
  const [studentEmail, setStudentEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');

  // Staff Form state
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPass, setStaffPass] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!studentEmail || !studentEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    loginStudent(studentEmail, studentName, studentId);
    onClose();
  };

  const handleStaffSubmit = (e) => {
    e.preventDefault();
    if (!staffEmail) {
      setErrorMsg('Please enter your staff email.');
      return;
    }
    loginStaff(staffEmail, staffPass);
    onClose();
  };



  return (
    <div className="modal-overlay" onClick={() => !isMandatory && onClose()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{ 
          padding: '1.5rem 1.5rem 1rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>Account Login</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Select portal role to access assessment dashboard
            </p>
          </div>
          {!isMandatory && (
            <button className="btn-icon" onClick={onClose}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Dual Role Selector Tabs */}
        <div style={{ padding: '1.25rem 1.5rem 0' }}>
          <div className="nav-tabs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <button
              className={`nav-tab ${activeRole === 'student' ? 'active' : ''}`}
              style={{ justifyContent: 'center', padding: '0.65rem' }}
              onClick={() => { setActiveRole('student'); setErrorMsg(''); }}
            >
              <UserCheck size={18} />
              <span>Student Portal</span>
            </button>

            <button
              className={`nav-tab ${activeRole === 'staff' ? 'active' : ''}`}
              style={{ justifyContent: 'center', padding: '0.65rem' }}
              onClick={() => { setActiveRole('staff'); setErrorMsg(''); }}
            >
              <ShieldCheck size={18} />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {errorMsg && (
            <div className="toast-banner toast-danger" style={{ marginBottom: '1rem' }}>
              {errorMsg}
            </div>
          )}

          {activeRole === 'student' ? (
            /* Student Form */
            <form onSubmit={handleStudentSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Student Email ID <span style={{ color: 'var(--danger-border)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="student@university.edu"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    required
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.3rem' }}>
                  ⚡ Exam marks & certificates will be automatically sent to this email address.
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="e.g. Alex Turner"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Student Roll No. / ID (Optional)</label>
                <div style={{ position: 'relative' }}>
                  <Key size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="e.g. STU-2026-089"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
                  Enter Student Portal
                </button>
              </div>
            </form>
          ) : (
            /* Staff Form */
            <form onSubmit={handleStaffSubmit}>
              <div className="form-group">
                <label className="form-label">Staff Email / Employee ID</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="staff@quiz.com"
                    value={staffEmail}
                    onChange={(e) => setStaffEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Staff Security Passcode</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="••••••••"
                    value={staffPass}
                    onChange={(e) => setStaffPass(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
                  Enter Staff Portal
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
