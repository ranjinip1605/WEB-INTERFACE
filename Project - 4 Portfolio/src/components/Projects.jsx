import React, { useState } from 'react';
import { projectsList } from '../data/portfolioData';
import { FolderGit2, ExternalLink, Github, Sparkles, Check } from 'lucide-react';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Web Dev', 'Python & AI', 'Java & Systems'];

  const filteredProjects = activeCategory === 'All'
    ? projectsList
    : projectsList.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">
            <FolderGit2 size={16} /> // FEATURED CREATIONS
          </span>
          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A curated showcase of applications built with modern web technologies, Java OOP patterns, and Python automation tools.
          </p>
        </div>

        <div className="skills-filter" style={{ justifyContent: 'center' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-card project-card">
              <div className="project-header">
                <div className="project-emoji">{project.emoji}</div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  title="View on GitHub"
                >
                  <Github size={16} /> GitHub Repo
                </a>
              </div>

              <h3 className="project-title">{project.name}</h3>
              <p className="project-desc">{project.desc}</p>

              <div style={{ marginBottom: '1.2rem' }}>
                <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Key Features:
                </strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.features.map((feat) => (
                    <span key={feat} style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-main)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'var(--bg-surface)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)'
                    }}>
                      <Check size={12} style={{ color: 'var(--primary)' }} /> {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="tag-badges" style={{ marginTop: 'auto' }}>
                {project.tech.map((t) => (
                  <span key={t} className="badge primary">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
