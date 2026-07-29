import useReveal from './useReveal'

const edu = [
  { period: '2025 – 2029', degree: 'B.Tech — Artificial Intelligence & Data Science', institution: 'Prince Dr K Vasudevan College of Engineering and Technology, Chennai', score: 'CGPA: 8.4' },
  { period: 'Completed 2025', degree: 'Higher Secondary Certificate (HSC)', institution: 'Tamil Nadu State Board', score: '90.1%' },
  { period: 'Completed 2023', degree: 'Secondary School Leaving Certificate (SSLC)', institution: 'Tamil Nadu State Board', score: '93.2%' },
]

export default function Education() {
  useReveal()
  return (
    <section id="education">
      <div className="section-inner">
        <p className="section-label reveal">// education</p>
        <h2 className="section-title reveal">My <span>Education</span></h2>
        <div className="section-divider reveal" />

        <div className="edu-timeline">
          {edu.map((e, i) => (
            <div key={i} className={`edu-item reveal d${i}`}>
              <p className="edu-period">{e.period}</p>
              <h3 className="edu-degree">{e.degree}</h3>
              <p className="edu-institution">{e.institution}</p>
              <p className="edu-score">{e.score}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
