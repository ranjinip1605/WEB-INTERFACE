import { useEffect, useRef, useState } from 'react'
import useReveal from './useReveal'

const skills = [
  { icon: '🐍', name: 'Python',          pct: 88 },
  { icon: '🌐', name: 'HTML5',           pct: 92 },
  { icon: '🎨', name: 'CSS3',            pct: 90 },
  { icon: '⚡', name: 'JavaScript',      pct: 84 },
  { icon: '⚛️', name: 'React.js',        pct: 78 },
  { icon: '☕', name: 'Java',            pct: 80 },
  { icon: '⚙️', name: 'C / C++',         pct: 72 },
  { icon: '🤖', name: 'AI / Data Science', pct: 75 },
  { icon: '☁️', name: 'Microsoft Azure', pct: 68 },
]

function SkillBar({ icon, name, pct, animate }) {
  return (
    <div className="skill-item reveal">
      <div className="skill-header">
        <span className="skill-name"><span className="skill-icon">{icon}</span> {name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: animate ? `${pct}%` : '0%' }} />
      </div>
    </div>
  )
}

export default function Skills() {
  useReveal()
  const [animate, setAnimate] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimate(true) }, { threshold: 0.25 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="section-inner">
        <p className="section-label reveal">// tech_stack</p>
        <h2 className="section-title reveal">My <span>Skills</span></h2>
        <div className="section-divider reveal" />
        <div className="skills-grid">
          {skills.map((s, i) => (
            <SkillBar key={s.name} {...s} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  )
}
