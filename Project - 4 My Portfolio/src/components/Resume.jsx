import useReveal from './useReveal'

export default function Resume() {
  useReveal()
  return (
    <section id="resume">
      <div className="section-inner resume-wrap">
        <p className="section-label reveal" style={{ textAlign: 'center' }}>// curriculum_vitae</p>
        <h2 className="section-title reveal" style={{ textAlign: 'center' }}>My <span>Resume</span></h2>
        <div className="section-divider reveal" style={{ margin: '0 auto 3rem' }} />

        <div className="resume-card reveal">
          <div className="resume-icon">📄</div>
          <h3>Download My Resume</h3>
          <p>
            A complete overview of my education (CGPA 8.4), skills, internships,
            projects, and 9 certifications — all in one document.
          </p>
          <a href="/Ranjini_P_Resume.pdf" download="Ranjini_P_Resume.pdf" className="btn-primary">
            ⬇ Download CV
          </a>
        </div>
      </div>
    </section>
  )
}
