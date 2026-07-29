import { useState, useEffect } from 'react'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import About         from './components/About'
import Education     from './components/Education'
import Skills        from './components/Skills'
import Projects      from './components/Projects'
import Internships   from './components/Internships'
import Certificates  from './components/Certificates'
import Achievements  from './components/Achievements'
import Resume        from './components/Resume'
import Contact       from './components/Contact'
import Footer        from './components/Footer'

export default function App() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') setDark(false)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('light', !dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <>
      <Navbar dark={dark} toggleTheme={() => setDark(d => !d)} />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Internships />
        <Certificates />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
