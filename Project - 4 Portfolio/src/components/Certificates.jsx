import React, { useState } from 'react';
import { certificatesList } from '../data/portfolioData';
import CertificateModal from './CertificateModal';
import { Award, ExternalLink, Calendar, CheckCircle, FileText } from 'lucide-react';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="section-padding" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <Award size={16} /> // VERIFIED CREDENTIALS
          </span>
          <h2 className="section-title">
            Certifications & <span>Licenses</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            12 official certifications awarded by Microsoft, freeCodeCamp, Infosys, Scaler, Accenture, and Anthropic.
            <br />
            <span style={{ fontSize: '0.88rem', color: 'var(--primary)', fontWeight: '600', marginTop: '0.4rem', display: 'inline-block' }}>
              🖱️ Click any certificate card to view or download full PDF document.
            </span>
          </p>
        </div>

        <div className="certs-grid">
          {certificatesList.map((cert) => (
            <div
              key={cert.id}
              className="glass-card cert-card"
              onClick={() => setSelectedCert(cert)}
              title="Click to view full certificate details"
            >
              <div className="cert-top-accent" style={{ background: cert.badgeColor || 'var(--primary)' }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.8rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--primary-glow)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <FileText size={20} />
                </div>
                <div>
                  <div className="cert-issuer">{cert.issuer}</div>
                  <h3 className="cert-title">{cert.title}</h3>
                </div>
              </div>

              <p className="cert-topic">{cert.topic}</p>

              <div className="cert-footer">
                <span>
                  <Calendar size={13} style={{ display: 'inline', marginRight: '0.3rem' }} />
                  {cert.date}
                </span>

                <span className="cert-action">
                  View Credential <ExternalLink size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
