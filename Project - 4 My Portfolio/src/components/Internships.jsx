import useReveal from './useReveal'

const internships = [
  {
    icon: '🐍',
    company: 'CodeAlpha',
    role: '// Python Development Intern (Remote)',
    desc: 'Worked on Python development tasks, building and enhancing real-world applications. Gained hands-on experience in Python programming and collaborative development practices in a professional remote environment.',
  },
  {
    icon: '📊',
    company: 'Thiranex',
    role: '// Data Science Intern (Remote)',
    desc: 'Applied data science techniques to analyse datasets and derive meaningful insights. Worked with data processing tools and contributed to data-driven project deliverables in a remote team setting.',
  },
]

export default function Internships() {
  useReveal()
  return (
    <section id="internships" className="internships-section">
      <div className="section-inner">
        <p className="section-label reveal">// work_experience</p>
        <h2 className="section-title reveal">My <span>Internships</span></h2>
        <div className="section-divider reveal" />

        <div className="internships-grid">
          {internships.map((item, i) => (
            <div key={item.company} className={`intern-card reveal d${i}`}>
              <div className="intern-icon">{item.icon}</div>
              <h3 className="intern-company">{item.company}</h3>
              <p className="intern-role">{item.role}</p>
              <p className="intern-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
