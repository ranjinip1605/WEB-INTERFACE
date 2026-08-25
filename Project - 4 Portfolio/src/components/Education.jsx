import React from 'react';
import { educationList } from '../data/portfolioData';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="section-padding" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <BookOpen size={16} /> // ACADEMIC BACKGROUND
          </span>
          <h2 className="section-title">
            Educational <span>Journey</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A strong foundation built on academic excellence and continuous technical learning.
          </p>
        </div>

        <div className="timeline">
          {educationList.map((edu, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span className="timeline-period">
                    <Calendar size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />
                    {edu.period}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: 'var(--accent-green)',
                    background: 'rgba(16, 185, 129, 0.12)',
                    padding: '0.2rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    {edu.score}
                  </span>
                </div>

                <h3 className="timeline-title">{edu.degree}</h3>
                <p className="timeline-sub">{edu.institution}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {edu.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
