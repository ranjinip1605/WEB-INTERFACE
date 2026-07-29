import useReveal from './useReveal'

const achievements = [
  { icon: '⭐', title: 'CGPA 8.4',                     desc: 'Maintaining a strong academic record of 8.4 CGPA in B.Tech AI&DS.' },
  { icon: '📊', title: '93.2% in SSLC',                desc: 'Scored an outstanding 93.2% in the SSLC board examinations.' },
  { icon: '📘', title: '90.1% in HSC',                 desc: 'Achieved 90.1% in Higher Secondary Certificate (Science stream).' },
  { icon: '💼', title: '2 Remote Internships',         desc: 'Completed Python Development and Data Science internships remotely at CodeAlpha and Thiranex.' },
  { icon: '📜', title: '9 Certifications',              desc: 'Earned 9 certifications from Microsoft, freeCodeCamp, Scaler, Infosys, TCS iON, and Anthropic.' },
  { icon: '🤖', title: 'Anthropic Claude Code Path',   desc: 'Completed all 13 courses in Anthropic\'s Claude Code Learning Path — an advanced AI certification.' },
]

export default function Achievements() {
  useReveal()
  return (
    <section id="achievements" className="achievements-section">
      <div className="section-inner">
        <p className="section-label reveal">// milestones</p>
        <h2 className="section-title reveal">My <span>Achievements</span></h2>
        <div className="section-divider reveal" />

        <div className="achievements-grid">
          {achievements.map((a, i) => (
            <div key={i} className={`ach-card reveal d${(i % 4) + 1}`}>
              <div className="ach-icon">{a.icon}</div>
              <h3 className="ach-title">{a.title}</h3>
              <p className="ach-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
