import { useState, useEffect } from 'react'

const links = [
  { href: '#home',         label: 'Home' },
  { href: '#about',        label: 'About' },
  { href: '#education',    label: 'Education' },
  { href: '#skills',       label: 'Skills' },
  { href: '#projects',     label: 'Projects' },
  { href: '#internships',  label: 'Internships' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#resume',       label: 'Resume' },
  { href: '#contact',      label: 'Contact' },
]

export default function Navbar({ dark, toggleTheme }) {
  const [active, setActive]   = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      let cur = ''
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 90) cur = s.id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="navbar">
        <span className="nav-logo">Ranjini.P</span>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={active === l.href.slice(1) ? 'active' : ''}
                onClick={e => handleNav(e, l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            <span className="theme-btn-dot">{dark ? '🌙' : '☀️'}</span>
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={e => handleNav(e, l.href)}>
            {l.label}
          </a>
        ))}
      </nav>
    </>
  )
}
