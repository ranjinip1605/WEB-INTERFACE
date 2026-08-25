import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="brand-logo" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
            <span>&lt;</span>Ranjini.P <span>/&gt;</span>
          </a>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            B.Tech Artificial Intelligence & Data Science Specialist
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-toggle-btn"
            title="GitHub Profile"
          >
            <Github size={20} />
          </a>
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-toggle-btn"
            title="LinkedIn Profile"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="theme-toggle-btn"
            title="Send Email"
          >
            <Mail size={20} />
          </a>

          <button
            onClick={scrollToTop}
            className="theme-toggle-btn"
            title="Scroll to Top"
            style={{ background: 'var(--primary)', color: '#FFFFFF', border: 'none' }}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>

      <div className="container" style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Ranjini P. Designed & Engineered with precision. All rights reserved.
      </div>
    </footer>
  );
}
