import { useEffect, useRef, useState } from 'react'
import photo from '../assets/ranjini.png'

function useCounter(target, duration = 1800, triggered) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!triggered) return
    let start = null
    const step = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.round(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [triggered, target, duration])
  return val
}

export default function Hero() {
  const canvasRef = useRef(null)
  const [counted, setCounted] = useState(false)

  const cgpa   = useCounter(8, 1600, counted)
  const certs  = useCounter(9, 1800, counted)
  const projs  = useCounter(4, 1500, counted)
  const interns = useCounter(2, 1400, counted)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCounted(true) }, { threshold: 0.4 })
    const el  = document.querySelector('.hero-stats')
    if (el) obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, particles, raf

    const COUNT = 70, MAX_D = 120

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    const randP = () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 1.5 + 0.5,
    })

    const getCol = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#8B5CF6'

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const col = getCol()
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = col + '99'; ctx.fill()
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j], dx = p.x - q.x, dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_D) {
            const a = (1 - d / MAX_D) * 0.3
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = col + Math.round(a * 255).toString(16).padStart(2, '0')
            ctx.lineWidth = 0.6; ctx.stroke()
          }
        }
      })
      raf = requestAnimationFrame(draw)
    }

    resize()
    particles = Array.from({ length: COUNT }, randP)
    draw()
    window.addEventListener('resize', () => { resize(); particles = Array.from({ length: COUNT }, randP) })
    return () => cancelAnimationFrame(raf)
  }, [])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>

      <div className="hero-inner">
        <div className="hero-text">
          <p className="hero-greeting">&gt; Hello, World! I'm</p>
          <h1 className="hero-name"><span className="highlight">Ranjini P</span></h1>
          <p className="hero-role">AI &amp; Data Science Student &nbsp;·&nbsp; Aspiring Developer</p>
          <p className="hero-bio">
            B.Tech AI&amp;DS student (CGPA 8.4) passionate about Python, web development, and data science.
            Turning ideas into impactful digital solutions — one line of code at a time.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => scrollTo('#projects')}>View My Work</button>
            <a href="/Ranjini_P_Resume.pdf" download className="btn-outline">Download CV</a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">{interns}+</div>
              <div className="stat-label">Internships</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{certs}+</div>
              <div className="stat-label">Certifications</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{projs}+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{cgpa}.4</div>
              <div className="stat-label">CGPA</div>
            </div>
          </div>
        </div>

        <div className="photo-wrap">
          <div className="photo-ring">
            <img src={photo} alt="Ranjini P" />
          </div>
        </div>
      </div>
    </section>
  )
}
