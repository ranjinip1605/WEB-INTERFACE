import React from 'react';
import { aboutDetails, personalInfo } from '../data/portfolioData';
import { GraduationCap, Building2, Award, MapPin, Languages, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';

const iconMap = {
  GraduationCap: GraduationCap,
  Building2: Building2,
  Award: Award,
  MapPin: MapPin,
  Languages: Languages,
  Sparkles: Sparkles
};

export default function About() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <UserCheck size={16} /> // WHO I AM
          </span>
          <h2 className="section-title">
            About <span>Ranjini P</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Driven by curiosity, academic rigor, and a passion for turning complex problems into elegant digital solutions.
          </p>
        </div>

        <div className="about-grid">
          <div className="glass-card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.2rem', color: 'var(--text-main)' }}>
              Passionate AI & Data Science Engineer
            </h3>

            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.2rem' }}>
              I am currently pursuing my <strong>B.Tech in Artificial Intelligence & Data Science</strong> at <strong>Prince Dr. K. Vasudevan College of Engineering and Technology</strong>, maintaining an impressive academic record of <strong>8.4 CGPA</strong>.
            </p>

            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              My technical expertise spans full-stack web development (React, HTML5, CSS3, JavaScript), Python programming, Java object-oriented design, machine learning algorithms, and cloud services (Microsoft Azure).
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              marginBottom: '2rem',
              padding: '1.2rem',
              background: 'var(--primary-glow)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-accent)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-green)' }} />
                <span>2 Remote Industry Internships Completed (CodeAlpha & Thiranex)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-green)' }} />
                <span>12 Industry Certifications (Microsoft, freeCodeCamp, Anthropic)</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={scrollToContact}>
                Let's Connect
              </button>
              <a href={personalInfo.resumeUrl} download className="btn btn-outline">
                Download Resume
              </a>
            </div>
          </div>

          <div className="info-cards-grid">
            {aboutDetails.map((item) => {
              const IconComp = iconMap[item.icon] || Sparkles;
              return (
                <div key={item.label} className="info-mini-card">
                  <div className="info-icon">
                    <IconComp size={22} />
                  </div>
                  <div className="info-content">
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
