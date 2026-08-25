import React from 'react';
import { achievementsList } from '../data/portfolioData';
import { Trophy, CheckCircle2, Briefcase, Award, BrainCircuit, Star } from 'lucide-react';

const iconMap = {
  Trophy: Trophy,
  CheckCircle2: CheckCircle2,
  Briefcase: Briefcase,
  Award: Award,
  BrainCircuit: BrainCircuit
};

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <Star size={16} /> // KEY MILESTONES
          </span>
          <h2 className="section-title">
            Honors & <span>Achievements</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Academic honors, competitive distinctions, and industry milestones achieved throughout my career.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {achievementsList.map((item, idx) => {
            const IconComp = iconMap[item.icon] || Star;
            return (
              <div key={idx} className="glass-card" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-gradient)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: 'var(--shadow-glow)'
                }}>
                  <IconComp size={26} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
