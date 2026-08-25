import React, { useEffect, useRef, useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import profilePhoto from '../assets/ranjini.png';
import { ArrowRight, Download, Terminal, Award, Code, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Hero({ isDark }) {
  const canvasRef = useRef(null);
  const [counts, setCounts] = useState({ cgpa: 0, certs: 0, projs: 0, interns: 0 });

  // Animate stats numbers when component mounts
  useEffect(() => {
    let start = null;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      
      setCounts({
        cgpa: (progress * 8.4).toFixed(1),
        certs: Math.floor(progress * 12),
        projs: Math.floor(progress * 4),
        interns: Math.floor(progress * 2)
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, []);

  // HTML5 Canvas Particle Constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;

    const particleCount = 65;
    const maxDistance = 125;

    const resizeCanvas = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.8 + 0.6
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const computedStyle = getComputedStyle(document.documentElement);
      const particleColor = isDark ? 'rgba(139, 92, 246, 0.6)' : 'rgba(79, 70, 229, 0.5)';
      const lineColor = isDark ? 'rgba(139, 92, 246, ' : 'rgba(79, 70, 229, ';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = lineColor + alpha + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDark]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 75;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-glow-orb orb-top" />
      <div className="hero-glow-orb orb-bottom" />

      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-greeting">
            <Terminal size={18} /> {personalInfo.greeting}
          </div>
          
          <h1 className="hero-name">
            <span style={{
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {personalInfo.name}
            </span>
          </h1>

          <p className="hero-role">{personalInfo.title}</p>
          <p className="hero-bio">{personalInfo.bio}</p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              Explore My Projects <ArrowRight size={18} />
            </button>
            
            <a href={personalInfo.resumeUrl} download className="btn btn-outline">
              <Download size={18} /> Download CV
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-box">
              <div className="stat-number">{counts.cgpa}</div>
              <div className="stat-label">Academic CGPA</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{counts.certs}+</div>
              <div className="stat-label">Certifications</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{counts.interns}</div>
              <div className="stat-label">Remote Internships</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{counts.projs}+</div>
              <div className="stat-label">Featured Projects</div>
            </div>
          </div>
        </div>

        <div className="hero-avatar-wrap">
          <div className="avatar-ring">
            <img src={profilePhoto} alt={personalInfo.name} className="avatar-img" />
          </div>

          <div className="floating-badge badge-top-left">
            <Award size={18} className="text-amber-500" style={{ color: 'var(--accent-amber)' }} />
            <span>CGPA 8.4 Distinction</span>
          </div>

          <div className="floating-badge badge-bottom-right">
            <Code size={18} style={{ color: 'var(--primary)' }} />
            <span>AI & Web Specialist</span>
          </div>
        </div>
      </div>
    </section>
  );
}
