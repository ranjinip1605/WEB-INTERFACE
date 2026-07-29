import useReveal from './useReveal'

const certs = [
  { icon: '🪟', title: 'Applied Skills: Azure Storage',          issuer: 'Microsoft',           topic: 'Secure Storage for Azure Files and Azure Blob Storage' },
  { icon: '🌐', title: 'Responsive Web Design',                  issuer: 'freeCodeCamp',         topic: 'Developer Certification' },
  { icon: '🌐', title: 'Legacy Responsive Web Design V8',        issuer: 'freeCodeCamp',         topic: 'Developer Certification' },
  { icon: '☕', title: 'Java — Mastering the Fundamentals',      issuer: 'Scaler Topics',        topic: 'Core Java Programming Course' },
  { icon: '☕', title: 'Java Programming Fundamentals',          issuer: 'Infosys Springboard',  topic: 'OOP · Classes · Java Basics' },
  { icon: '⚡', title: 'Unlocking the Power of JavaScript',      issuer: 'Scaler',               topic: 'JavaScript Programming Course' },
  { icon: '🐍', title: 'Basics of Python',                       issuer: 'Infosys Springboard',  topic: 'Python Programming Fundamentals' },
  { icon: '🗣️', title: 'Communication Skills',                   issuer: 'TCS iON',              topic: 'Professional Communication & Soft Skills' },
  { icon: '🤖', title: 'Claude Code Learning Path',              issuer: 'Anthropic',            topic: '13 Courses · AI & Prompt Engineering' },
]

export default function Certificates() {
  useReveal()
  return (
    <section id="certificates">
      <div className="section-inner">
        <p className="section-label reveal">// credentials</p>
        <h2 className="section-title reveal">My <span>Certificates</span></h2>
        <div className="section-divider reveal" />

        <div className="certs-grid">
          {certs.map((c, i) => (
            <div key={i} className={`cert-card reveal d${(i % 4) + 1}`}>
              <div className="cert-icon">{c.icon}</div>
              <div className="cert-info">
                <strong>{c.title}</strong>
                <span className="cert-issuer">{c.issuer}</span>
                <p className="cert-topic">{c.topic}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
