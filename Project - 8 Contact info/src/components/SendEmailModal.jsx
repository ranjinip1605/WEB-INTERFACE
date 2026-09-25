import React, { useState, useEffect } from 'react';
import { X, Mail, Send, Sparkles, Check, Copy, ExternalLink, MessageSquare } from 'lucide-react';

export default function SendEmailModal({
  isOpen,
  onClose,
  contact
}) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    if (contact) {
      setSubject(`Hello from ${contact.name.split(' ')[0]}'s contact network`);
      setMessage(`Hi ${contact.name.split(' ')[0]},\n\nHope you are doing well!\n\nBest regards,\n`);
      setSentSuccess(false);
    }
  }, [contact, isOpen]);

  if (!isOpen || !contact) return null;

  const emailTemplates = [
    {
      label: '💼 Business Meeting',
      subject: `Meeting Request - ${contact.company || 'Catch up'}`,
      body: `Hi ${contact.name.split(' ')[0]},\n\nI hope this email finds you well. I would love to schedule a brief call or meeting with you to discuss our upcoming projects.\n\nPlease let me know your availability this week.\n\nBest regards,`
    },
    {
      label: '👋 Friendly Check-in',
      subject: `Checking in!`,
      body: `Hi ${contact.name.split(' ')[0]},\n\nJust wanted to reach out and say hello! How have things been with you lately?\n\nLet's catch up soon.\n\nWarm regards,`
    },
    {
      label: '📄 Project Update',
      subject: `Project Update: ${contact.company || 'General Sync'}`,
      body: `Hi ${contact.name.split(' ')[0]},\n\nHere is a quick update regarding our recent discussion. All deliverables are currently on track.\n\nFeel free to reach out if you have any questions!\n\nBest regards,`
    }
  ];

  const applyTemplate = (tpl) => {
    setSubject(tpl.subject);
    setMessage(tpl.body);
  };

  // Generate real mailto link with encoded Subject and Body
  const getEncodedMailtoLink = () => {
    const encodedSubject = encodeURIComponent(subject.trim());
    const encodedBody = encodeURIComponent(message.trim());
    return `mailto:${contact.email}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    
    // Trigger real mailto link to open system mail client (Gmail/Outlook/Apple Mail)
    const mailtoUrl = getEncodedMailtoLink();
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setTimeout(() => {
        setSentSuccess(false);
        onClose();
      }, 2000);
    }, 600);
  };

  const handleCopyMailto = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-md" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-with-icon">
            <div className="card-icon-badge icon-email">
              <Mail size={20} />
            </div>
            <div>
              <h2>Send Real Email</h2>
              <span className="text-muted text-xs">To: {contact.name} ({contact.email})</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendEmail} className="modal-body">
          {/* Quick Template Chips */}
          <div className="template-chips-section">
            <span className="picker-label">Quick Message Templates</span>
            <div className="template-chips-row">
              {emailTemplates.map((tpl, i) => (
                <button
                  key={i}
                  type="button"
                  className="chip-btn chip-sm"
                  onClick={() => applyTemplate(tpl)}
                >
                  <Sparkles size={12} />
                  <span>{tpl.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subject Field */}
          <div className="form-group">
            <label htmlFor="email-subject">Subject</label>
            <input
              id="email-subject"
              type="text"
              className="form-control"
              placeholder="Email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          {/* Message Body Field */}
          <div className="form-group">
            <label htmlFor="email-body">Message Body</label>
            <textarea
              id="email-body"
              className="form-control textarea-input"
              rows={6}
              placeholder="Write your email message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          {/* Recipient info & Copy helper */}
          <div className="email-target-box">
            <div className="target-text-wrap">
              <span className="target-label">Recipient:</span>
              <span className="target-email">{contact.email}</span>
            </div>
            <button
              type="button"
              className="btn-copy-sm"
              onClick={handleCopyMailto}
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? 'Copied Email' : 'Copy Email'}</span>
            </button>
          </div>

          {/* Success Banner */}
          {sentSuccess && (
            <div className="status-banner banner-success">
              <Check size={18} />
              <span>Mail application launched! Sending email to {contact.email}...</span>
            </div>
          )}

          {/* Action Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-icon-label" disabled={isSending}>
              {isSending ? <Send size={16} className="spin-icon" /> : <Send size={16} />}
              <span>{isSending ? 'Launching Mail...' : 'Send Real Email Now'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
