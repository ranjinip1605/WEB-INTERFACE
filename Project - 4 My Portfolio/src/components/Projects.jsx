import useReveal from './useReveal'

const projects = [
  {
    emoji: '🏫', thumb: 'pt-blue',
    name: 'College Website',
    desc: 'Developed a responsive and user-friendly college website providing information about departments, courses, facilities, and academic activities with an interactive interface.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    techSec: ['Responsive'],
    link: 'https://github.com/ranjinip1605',
  },
  {
    emoji: '📚', thumb: 'pt-green',
    name: 'Library Management Website',
    desc: 'Designed and developed a library management website for organising and managing book records with a simple, clean, and responsive interface.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    techSec: ['Responsive'],
    link: 'https://github.com/ranjinip1605',
  },
  {
    emoji: '🔐', thumb: 'pt-pink',
    name: 'Password Strength Checker',
    desc: 'Built a Python tool that evaluates password strength based on length, uppercase/lowercase letters, numbers, and special characters to encourage secure password creation.',
    tech: ['Python'],
    techSec: ['Security'],
    link: 'https://github.com/ranjinip1605',
  },
  {
    emoji: '🎬', thumb: 'pt-gold',
    name: 'Movie Ticket Management System',
    desc: 'Developed a movie ticket management system using Java OOP concepts — classes, constructors, methods, and arrays of objects for a complete booking workflow.',
    tech: ['Java'],
    techSec: ['OOP'],
    link: 'https://github.com/ranjinip1605',
  },
  {
    emoji: '🍲', thumb: 'pt-blue',
    name: 'Community Kitchen - Meal Distribution and Stock Register',
    desc: 'Built a React-based platform to manage community kitchen operations, tracking meal distribution and maintaining a live stock register for ingredients and supplies.',
    tech: ['React'],
    techSec: ['Web App'],
    link: 'https://github.com/ranjinip1605/Community-Kitchen-Meal-Distribution-and-Stock-Register',
  },
  {
    emoji: '🦯', thumb: 'pt-green',
    name: 'Sparsh - Braille Landing Page',
    desc: 'Designed and developed a React landing page for Sparsh, an initiative focused on braille accessibility, with a clean and accessible interface.',
    tech: ['React'],
    techSec: ['Accessibility'],
    link: 'https://github.com/ranjinip1605/sparsh-braille-landing-page',
  },
]

export default function Projects() {
  useReveal()
  return (
    <section id="projects">
      <div className="section-inner">
        <p className="section-label reveal">// featured_work</p>
        <h2 className="section-title reveal">My <span>Projects</span></h2>
        <div className="section-divider reveal" />

        <div className="projects-grid">
          {projects.map((p, i) => (
            <article key={p.name} className={`project-card reveal d${i}`}>
              <div className={`project-thumb ${p.thumb}`}>{p.emoji}</div>
              <div className="project-body">
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="tech-badges">
                  {p.tech.map(t => <span key={t} className="badge">{t}</span>)}
                  {p.techSec.map(t => <span key={t} className="badge sec">{t}</span>)}
                </div>
                <div className="project-links">
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-sm primary">View on GitHub</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
