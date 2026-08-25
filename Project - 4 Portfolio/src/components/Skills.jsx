import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { Cpu, FileCode2, Code2, Zap, Atom, Coffee, Brain, Cloud, Layers } from 'lucide-react';

const skillIcons = {
  FileCode2: FileCode2,
  Code2: Code2,
  Zap: Zap,
  Atom: Atom,
  Coffee: Coffee,
  Cpu: Cpu,
  Brain: Brain,
  Cloud: Cloud
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Languages', 'Web Dev', 'AI & Data', 'Cloud & Tools'];

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">
            <Layers size={16} /> // TECH STACK
          </span>
          <h2 className="section-title">
            Skills & <span>Proficiency</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A versatile repertoire of programming languages, modern web frameworks, data tools, and cloud platforms.
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

        <div className="skills-grid">
          {filteredSkills.map((skill) => {
            const IconComp = skillIcons[skill.icon] || Code2;
            return (
              <div key={skill.name} className="skill-card">
                <div className="skill-header">
                  <div className="skill-title">
                    <span style={{
                      color: 'var(--primary)',
                      background: 'var(--primary-glow)',
                      padding: '0.4rem',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex'
                    }}>
                      <IconComp size={18} />
                    </span>
                    <span>{skill.name}</span>
                  </div>
                  <span className="skill-pct">{skill.pct}%</span>
                </div>

                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${skill.pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
