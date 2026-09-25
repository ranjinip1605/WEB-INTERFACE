import React, { useState } from 'react';
import { X, Phone, Mail, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { getCleanPhone } from '../utils/validation';

export default function CallPromptModal({
  isOpen,
  onClose,
  contact,
  actionType // 'call' | 'email'
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !contact) return null;

  const isCall = actionType === 'call';
  const targetValue = isCall ? contact.phone : contact.email;
  const protocolLink = isCall ? `tel:${getCleanPhone(contact.phone)}` : `mailto:${contact.email}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(targetValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenProtocol = () => {
    window.location.href = protocolLink;
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-sm text-center" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header border-none">
          <div className={`prompt-icon-badge ${isCall ? 'badge-call' : 'badge-email'}`}>
            {isCall ? <Phone size={24} /> : <Mail size={24} />}
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="prompt-body">
          <h3>{isCall ? `Call ${contact.name}` : `Email ${contact.name}`}</h3>
          <p className="prompt-desc">
            {isCall 
              ? 'On mobile browsers, this opens your native phone dialer. On desktop, it opens your registered default calling application (FaceTime, Skype, Teams, etc.).'
              : 'This will launch your system default email application with the recipient pre-filled.'}
          </p>

          <div className="prompt-value-box">
            <span className="value-highlight">{targetValue}</span>
            <button className="btn-copy-sm" onClick={handleCopy}>
              {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="prompt-secure-note">
            <ShieldCheck size={14} />
            <span>Formatted link: <code>{protocolLink}</code></span>
          </div>

          <div className="prompt-actions-column">
            <button className="btn btn-primary btn-block btn-icon-label" onClick={handleOpenProtocol}>
              <ExternalLink size={18} />
              <span>Launch Default {isCall ? 'Dialer App' : 'Mail Client'}</span>
            </button>
            <button className="btn btn-secondary btn-block" onClick={onClose}>
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
