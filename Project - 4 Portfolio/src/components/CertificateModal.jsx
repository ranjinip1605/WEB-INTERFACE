import React from 'react';
import { X, ExternalLink, Download, FileText, CheckCircle } from 'lucide-react';

export default function CertificateModal({ cert, onClose }) {
  if (!cert) return null;

  const isImage = cert.file && (cert.file.endsWith('.png') || cert.file.endsWith('.jpg') || cert.file.endsWith('.jpeg') || cert.file.endsWith('.webp'));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: isImage ? '800px' : '650px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: cert.badgeColor || 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <FileText size={24} />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--primary)',
              fontWeight: '600'
            }}>
              {cert.issuer}
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {cert.title}
            </h3>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          padding: '1.2rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          marginBottom: '1.2rem'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.8rem' }}>
            {cert.topic}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-dim)', flexWrap: 'wrap' }}>
            <span>📅 Issued: <strong>{cert.date}</strong></span>
            <span>🏷️ Category: <strong>{cert.category}</strong></span>
          </div>
        </div>

        {isImage && (
          <div style={{
            width: '100%',
            maxHeight: '380px',
            overflow: 'hidden',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            marginBottom: '1.5rem',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={cert.file}
              alt={cert.title}
              style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain' }}
            />
          </div>
        )}

        {cert.file ? (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              <ExternalLink size={18} /> {isImage ? 'Open Full Certificate Image' : 'View PDF Certificate'}
            </a>
            <a
              href={cert.file}
              download
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              <Download size={18} /> Download Copy
            </a>
          </div>
        ) : (
          <div style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-glow)',
            color: 'var(--primary)',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            <CheckCircle size={18} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
            Official Certificate Verified & Authorized by {cert.issuer}
          </div>
        )}
      </div>
    </div>
  );
}
