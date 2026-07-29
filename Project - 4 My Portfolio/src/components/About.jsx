import useReveal from './useReveal'

const details = [
  { icon: '🎓', label: 'Degree',    value: 'B.Tech — Artificial Intelligence & Data Science' },
  { icon: '🏫', label: 'College',   value: 'Prince Dr K Vasudevan College of Engineering and Technology' },
  { icon: '⭐', label: 'CGPA',      value: '8.4' },
  { icon: '📧', label: 'Email',     value: 'ranjini.p.aids29@princedrkvasudevan.com' },
  { icon: '📞', label: 'Phone',     value: '+91 9159880928' },
  { icon: '🗣️', label: 'Languages', value: 'English · Tamil · Hindi' },
]

export default function About() {
  useReveal()
  return (
    <section id="about" className="about">
      <div className="section-inner">
        <p className="section-label reveal">// about_me</p>
        <h2 className="section-title reveal">Who I <span>Am</span></h2>
        <div className="section-divider reveal" />

        <div className="about-grid">
          <div className="about-bio reveal">
            <p>I am a student of <strong>Artificial Intelligence and Data Science (AI&amp;DS)</strong> with a passion for technology, problem-solving, and continuous learning.</p>
            <p>I am interested in <strong>web development</strong>, <strong>Python programming</strong>, <strong>artificial intelligence</strong>, and <strong>data science</strong>. I enjoy building projects that help me apply my knowledge to real-world challenges.</p>
            <p>Through academic projects, internships, and self-learning, I strive to grow as a skilled technology professional and contribute to innovative solutions that make a positive impact.</p>
            <div className="about-cta">
              <a href="#contact" className="btn-primary" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>Hire Me</a>
              <a href="/Ranjini_P_Resume.pdf" download className="btn-outline">Download CV</a>
            </div>
          </div>

          <div className="about-details">
            {details.map((d, i) => (
              <div key={d.label} className={`detail-card reveal d${i + 1}`}>
                <span className="detail-icon">{d.icon}</span>
                <div className="detail-info">
                  <strong>{d.label}</strong>
                  <span>{d.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
