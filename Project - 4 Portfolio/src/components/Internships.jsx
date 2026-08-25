import React, { useState } from 'react';
import { internshipsList } from '../data/portfolioData';
import CertificateModal from './CertificateModal';
import { Briefcase, Terminal, BarChart3, Building, CheckCircle2, ExternalLink, FileText, Award } from 'lucide-react';

const iconMap = {
  Terminal: Terminal,
  BarChart3: BarChart3
};

export default function Internships() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="internships" className="section-padding" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <Briefcase size={16} /> // INDUSTRY EXPERIENCE
          </span>
          <h2 className="section-title">
            Work <span>Internships</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Hands-on professional experience applying Python, AI, and Data Science methods with official certificates of completion.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '2rem' }}>
          {internshipsList.map((item) => {
            const IconComp = iconMap[item.icon] || Building;
            return (
              <div key={item.company} className="glass-card" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '4px',
                  height: '100%',
                  background: 'var(--primary-gradient)'
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-glow)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-accent)',
                    flexShrink: 0
                  }}>
                    <IconComp size={24} />
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-main)' }}>
                      {item.company}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'var(--primary)',
                      fontWeight: '600'
                    }}>
                      {item.role}
                    </p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      📅 {item.duration}
                    </span>
                  </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  {item.desc}
                </p>

                {item.certificate && (
                  <div
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                    onClick={() => setSelectedCert({
                      title: item.certTitle || `${item.company} Certificate`,
                      issuer: item.company,
                      topic: `${item.certId} · ${item.certIssueDate}`,
                      date: item.duration,
                      file: item.certificate,
                      badgeColor: item.company === 'CodeAlpha' ? '#7C3AED' : '#0078D4',
                      category: 'Internship Certificate'
                    })}
                    title="Click to view full certificate"
                  >
                    <div style={{
                      width: '90px',
                      height: '65px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      flexShrink: 0
                    }}>
                      <img
                        src={item.certificate}
                        alt={`${item.company} Certificate`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'block', marginBottom: '0.2rem' }}>
                        📜 {item.certTitle || 'Official Internship Certificate'}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontWeight: '600', display: 'block' }}>
                        {item.certId}
                      </span>
                    </div>

                    <span className="btn btn-outline btn-sm" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      <ExternalLink size={14} /> View
                    </span>
                  </div>
                )}

                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.8rem'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    color: 'var(--accent-green)',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <CheckCircle2 size={14} /> Verified Internship Completion
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
