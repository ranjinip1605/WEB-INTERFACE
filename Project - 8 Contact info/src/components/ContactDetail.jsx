import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Star, 
  Download, 
  Edit3, 
  Trash2, 
  Copy, 
  Check, 
  Building, 
  FileText, 
  ArrowLeft, 
  Calendar
} from 'lucide-react';
import { getInitials, getAvatarColor, getCleanPhone, exportVCard } from '../utils/validation';

export default function ContactDetail({
  contact,
  onBack,
  onToggleFavorite,
  onEditContact,
  onDeleteContact,
  onInitiateCall,
  onInitiateEmail
}) {
  const [copiedField, setCopiedField] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!contact) {
    return (
      <main className="contact-detail-panel empty-detail-state">
        <div className="empty-detail-content">
          <div className="pulse-avatar-placeholder">
            <span className="placeholder-text">Select a contact</span>
          </div>
          <h2>No Contact Selected</h2>
          <p>Choose a contact from the list on the left to view details, call, email, or edit.</p>
        </div>
      </main>
    );
  }

  const initials = getInitials(contact.name);
  const avatarBg = getAvatarColor(contact.name);
  const cleanPhone = getCleanPhone(contact.phone);
  const gmailDraftUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}`;

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <main className="contact-detail-panel">
      {/* Mobile Top Navigation */}
      <div className="mobile-detail-nav">
        <button className="btn-icon-label-back" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Contacts</span>
        </button>
        <div className="mobile-nav-actions">
          <button 
            className={`btn-icon ${contact.isFavorite ? 'favorite-active' : ''}`}
            onClick={() => onToggleFavorite(contact.id)}
            title="Toggle Favorite"
          >
            <Star size={20} fill={contact.isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="detail-scroll-content">
        {/* Profile Card Header */}
        <div className="profile-header-card">
          <div className="profile-avatar-large">
            {contact.avatar ? (
              <img src={contact.avatar} alt={contact.name} className="avatar-img-lg" />
            ) : (
              <div className="avatar-initials-lg" style={{ background: avatarBg }}>
                {initials}
              </div>
            )}
          </div>

          <div className="profile-main-info">
            <div className="profile-name-heading">
              <h2>{contact.name}</h2>
              <button 
                className={`favorite-toggle-btn hide-mobile ${contact.isFavorite ? 'favorite-active' : ''}`}
                onClick={() => onToggleFavorite(contact.id)}
                title={contact.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star size={22} fill={contact.isFavorite ? '#eab308' : 'none'} color={contact.isFavorite ? '#eab308' : 'currentColor'} />
              </button>
            </div>

            {contact.company && (
              <div className="profile-company-text">
                <Building size={16} />
                <span>{contact.company}</span>
              </div>
            )}

            {contact.group && (
              <span className={`group-pill pill-${contact.group.toLowerCase()}`}>
                {contact.group}
              </span>
            )}
          </div>
        </div>

        {/* Primary 1-Tap Action Bar */}
        <div className="primary-actions-grid">
          <a
            href={`tel:${cleanPhone}`}
            className="action-tile call-tile"
            onClick={(e) => onInitiateCall(e, contact)}
          >
            <div className="tile-icon">
              <Phone size={22} />
            </div>
            <span className="tile-label">Call</span>
            <span className="tile-subtext">Phone Dialer</span>
          </a>

          <a
            href={gmailDraftUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-tile email-tile"
            onClick={(e) => onInitiateEmail(e, contact)}
          >
            <div className="tile-icon">
              <Mail size={22} />
            </div>
            <span className="tile-label">Email Draft</span>
            <span className="tile-subtext">Gmail Web Draft</span>
          </a>

          <a
            href={`sms:${cleanPhone}`}
            className="action-tile sms-tile"
          >
            <div className="tile-icon">
              <MessageSquare size={22} />
            </div>
            <span className="tile-label">Message</span>
            <span className="tile-subtext">SMS</span>
          </a>

          <button
            className="action-tile vcard-tile"
            onClick={() => exportVCard(contact)}
          >
            <div className="tile-icon">
              <Download size={22} />
            </div>
            <span className="tile-label">Export</span>
            <span className="tile-subtext">.vCard File</span>
          </button>
        </div>

        {/* Info Cards Section */}
        <div className="info-cards-container">
          {/* Phone Card */}
          <div className="info-card">
            <div className="card-left">
              <div className="card-icon-badge icon-phone">
                <Phone size={18} />
              </div>
              <div className="card-content">
                <span className="card-label">Phone Number</span>
                <a href={`tel:${cleanPhone}`} className="card-value-link" onClick={(e) => onInitiateCall(e, contact)}>
                  {contact.phone}
                </a>
              </div>
            </div>
            <button
              className="copy-btn"
              onClick={() => handleCopy(contact.phone, 'phone')}
              title="Copy Phone Number"
            >
              {copiedField === 'phone' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              <span className="copy-tooltip">{copiedField === 'phone' ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Email Card */}
          <div className="info-card">
            <div className="card-left">
              <div className="card-icon-badge icon-email">
                <Mail size={18} />
              </div>
              <div className="card-content">
                <span className="card-label">Email Address</span>
                <a 
                  href={gmailDraftUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="card-value-link" 
                  onClick={(e) => onInitiateEmail(e, contact)}
                >
                  {contact.email}
                </a>
              </div>
            </div>
            <button
              className="copy-btn"
              onClick={() => handleCopy(contact.email, 'email')}
              title="Copy Email Address"
            >
              {copiedField === 'email' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              <span className="copy-tooltip">{copiedField === 'email' ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Company Card */}
          {contact.company && (
            <div className="info-card">
              <div className="card-left">
                <div className="card-icon-badge icon-company">
                  <Building size={18} />
                </div>
                <div className="card-content">
                  <span className="card-label">Company / Organization</span>
                  <span className="card-value-text">{contact.company}</span>
                </div>
              </div>
            </div>
          )}

          {/* Notes Card */}
          {contact.notes && (
            <div className="info-card notes-card">
              <div className="card-left align-top">
                <div className="card-icon-badge icon-notes">
                  <FileText size={18} />
                </div>
                <div className="card-content">
                  <span className="card-label">Notes</span>
                  <p className="notes-text">{contact.notes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Metadata Card */}
          <div className="meta-info-row">
            <Calendar size={14} />
            <span>Added on {new Date(contact.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Footer Actions (Edit & Delete) */}
        <div className="detail-footer-actions">
          <button className="btn btn-secondary btn-icon-label" onClick={() => onEditContact(contact)}>
            <Edit3 size={16} />
            <span>Edit Contact</span>
          </button>

          {!showDeleteConfirm ? (
            <button className="btn btn-danger-outline btn-icon-label" onClick={() => setShowDeleteConfirm(true)}>
              <Trash2 size={16} />
              <span>Delete Contact</span>
            </button>
          ) : (
            <div className="delete-confirm-box">
              <span>Delete {contact.name}?</span>
              <button className="btn btn-danger btn-sm" onClick={() => onDeleteContact(contact.id)}>
                Yes, Delete
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
