import React from 'react';

export default function ToastBanner({ toast, onClose }) {
  if (!toast || !toast.message) return null;

  const isError = toast.type === 'error';
  const style = isError
    ? { background: 'rgba(239, 68, 68, 0.25)', borderColor: 'rgba(239, 68, 68, 0.4)' }
    : { background: 'rgba(56, 189, 248, 0.25)', borderColor: 'rgba(56, 189, 248, 0.4)' };

  return (
    <div className="toast-banner" style={style}>
      <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span className="toast-msg">{toast.message}</span>
      <button className="toast-close" onClick={onClose}>&times;</button>
    </div>
  );
}
