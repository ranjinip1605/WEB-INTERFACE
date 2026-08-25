import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

export function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className={`toast-notification ${type} animate-fade-in`}>
      {type === 'success' ? (
        <CheckCircle2 size={18} className="toast-icon text-green" />
      ) : (
        <Info size={18} className="toast-icon text-red" />
      )}
      <span className="toast-message">{message}</span>
    </div>
  );
}
