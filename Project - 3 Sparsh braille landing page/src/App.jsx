import { useState } from "react";

const BRAILLE_MAP = {
  a: [1], b: [1, 2], c: [1, 4], d: [1, 4, 5], e: [1, 5],
  f: [1, 2, 4], g: [1, 2, 4, 5], h: [1, 2, 5], i: [2, 4], j: [2, 4, 5],
  k: [1, 3], l: [1, 2, 3], m: [1, 3, 4], n: [1, 3, 4, 5], o: [1, 3, 5],
  p: [1, 2, 3, 4], q: [1, 2, 3, 4, 5], r: [1, 2, 3, 5], s: [2, 3, 4],
  t: [2, 3, 4, 5], u: [1, 3, 6], v: [1, 2, 3, 6], w: [2, 4, 5, 6],
  x: [1, 3, 4, 6], y: [1, 3, 4, 5, 6], z: [1, 3, 5, 6],
};

function DotCell({ letter }) {
  const dots = BRAILLE_MAP[letter.toLowerCase()] || [];
  if (letter === " ") return <div className="dot-cell dot-cell--space" aria-hidden="true" />;
  return (
    <div className="dot-cell" title={letter}>
      <div className="dot-grid">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <span key={n} className={dots.includes(n) ? "dot dot--on" : "dot"} />
        ))}
      </div>
      <span className="dot-letter">{letter}</span>
    </div>
  );
}

export default function App() {
  const [word, setWord] = useState("sparsh");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  const cleanWord = word.replace(/[^a-zA-Z ]/g, "").slice(0, 14);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        .page {
          --ink: #211d16;
          --paper: #f7f2e9;
          --paper-soft: #f1ead9;
          --teal: #1f6f5c;
          --teal-dark: #164f42;
          --gold: #c89b3c;
          --line: #ddd3bb;
          font-family: 'Work Sans', sans-serif;
          background: var(--paper);
          color: var(--ink);
          min-height: 100vh;
          line-height: 1.5;
        }

        .page a, .page button { font-family: inherit; }

        .nav {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 2rem;
          background: rgba(247, 242, 233, 0.9);
          backdrop-filter: blur(6px);
          border-bottom: 1px solid var(--line);
        }

        .nav__logo {
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-size: 1.35rem;
          letter-spacing: 0.02em;
          color: var(--teal-dark);
        }

        .nav__links {
          display: flex;
          gap: 1.75rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav__links button {
          background: none;
          border: none;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--ink);
          cursor: pointer;
          padding: 0.25rem 0.1rem;
          border-bottom: 2px solid transparent;
          transition: border-color 0.2s ease, color 0.2s ease;
        }

        .nav__links button:hover,
        .nav__links button:focus-visible {
          color: var(--teal-dark);
          border-bottom-color: var(--gold);
          outline: none;
        }

        section {
          padding: 5rem 2rem;
          max-width: 1080px;
          margin: 0 auto;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 3rem;
          align-items: center;
          padding-top: 4.5rem;
        }

        .hero__eyebrow {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--teal-dark);
          margin-bottom: 0.9rem;
        }

        .hero__title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(2.4rem, 4.5vw, 3.4rem);
          line-height: 1.1;
          margin: 0 0 1.1rem;
        }

        .hero__title em {
          font-style: italic;
          color: var(--teal);
        }

        .hero__body {
          font-size: 1.05rem;
          color: #454038;
          max-width: 40ch;
          margin-bottom: 1.8rem;
        }

        .btn {
          display: inline-block;
          background: var(--teal-dark);
          color: var(--paper);
          border: none;
          padding: 0.85rem 1.6rem;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 3px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .btn:hover, .btn:focus-visible { background: var(--teal); outline: none; }
        .btn:active { transform: translateY(1px); }

        .translator {
          background: var(--paper-soft);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 1.5rem;
        }

        .translator__label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--teal-dark);
          margin-bottom: 0.5rem;
        }

        .translator input {
          width: 100%;
          font-family: 'Work Sans', sans-serif;
          font-size: 1.05rem;
          padding: 0.7rem 0.9rem;
          border: 1px solid var(--line);
          border-radius: 6px;
          background: var(--paper);
          color: var(--ink);
          margin-bottom: 1.3rem;
        }

        .translator input:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 1px;
        }

        .dot-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          min-height: 84px;
        }

        .dot-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
        }

        .dot-cell--space { width: 14px; }

        .dot-grid {
          display: grid;
          grid-template-columns: repeat(2, 11px);
          grid-template-rows: repeat(3, 11px);
          gap: 3px;
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 5px;
          padding: 6px;
        }

        .dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--line);
        }

        .dot--on { background: var(--teal); }

        .dot-letter {
          font-size: 0.75rem;
          color: #6b6459;
          text-transform: lowercase;
        }

        .about {
          border-top: 1px solid var(--line);
        }

        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .section-eyebrow {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--teal-dark);
          margin-bottom: 0.8rem;
        }

        .about h2, .contact h2 {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 2rem;
          margin: 0 0 1rem;
        }

        .about p { color: #454038; margin-bottom: 1rem; }

        .stats {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .stat {
          border-left: 3px solid var(--gold);
          padding-left: 1rem;
        }

        .stat__num {
          font-family: 'Fraunces', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--teal-dark);
          display: block;
        }

        .stat__label {
          font-size: 0.9rem;
          color: #6b6459;
        }

        .contact {
          border-top: 1px solid var(--line);
        }

        .contact__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .contact-info p {
          color: #454038;
          margin: 0 0 0.4rem;
        }

        .contact-info__label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--teal-dark);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 1.2rem;
        }

        form { display: flex; flex-direction: column; gap: 1rem; }

        .field label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .field input, .field textarea {
          width: 100%;
          font-family: 'Work Sans', sans-serif;
          font-size: 0.95rem;
          padding: 0.65rem 0.8rem;
          border: 1px solid var(--line);
          border-radius: 6px;
          background: var(--paper-soft);
          color: var(--ink);
        }

        .field input:focus-visible, .field textarea:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 1px;
        }

        .field textarea { min-height: 100px; resize: vertical; }

        .confirm {
          background: var(--paper-soft);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 1rem 1.2rem;
          color: var(--teal-dark);
          font-weight: 500;
        }

        .footer {
          text-align: center;
          padding: 2rem;
          font-size: 0.85rem;
          color: #8a8377;
          border-top: 1px solid var(--line);
        }

        @media (max-width: 720px) {
          .hero, .about__grid, .contact__grid {
            grid-template-columns: 1fr;
          }
          .nav { padding: 1rem 1.2rem; }
          .nav__links { gap: 1rem; }
          section { padding: 3.5rem 1.2rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .page * { transition: none !important; }
        }
      `}</style>

      <div className="page">
        <nav className="nav">
          <span className="nav__logo">Sparsh</span>
          <ul className="nav__links">
            <li><button onClick={() => scrollToId("home")}>Home</button></li>
            <li><button onClick={() => scrollToId("about")}>About</button></li>
            <li><button onClick={() => scrollToId("contact")}>Contact</button></li>
          </ul>
        </nav>

        <section id="home" className="hero">
          <div>
            <div className="hero__eyebrow">Sparsh Braille Trust</div>
            <h1 className="hero__title">Every dot tells<br /><em>a story.</em></h1>
            <p className="hero__body">
              We teach braille literacy to blind and visually impaired children and
              adults across community centers, one raised dot at a time.
            </p>
            <button className="btn" onClick={() => scrollToId("about")}>
              Learn about our work
            </button>
          </div>

          <div className="translator">
            <label className="translator__label" htmlFor="word-input">
              Type a word to see it in braille
            </label>
            <input
              id="word-input"
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              maxLength={14}
              placeholder="Type here..."
            />
            <div className="dot-row">
              {cleanWord.split("").map((ch, i) => (
                <DotCell letter={ch} key={i} />
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="about__grid">
            <div>
              <div className="section-eyebrow">About us</div>
              <h2>Literacy is a right, not a privilege.</h2>
              <p>
                Founded by a small group of teachers and volunteers, Sparsh runs
                braille literacy programs in community centers and schools, training
                readers, transcribing textbooks, and lending tactile learning kits
                to families at no cost.
              </p>
              <p>
                Our volunteers are trained braille instructors, many of whom are
                blind or visually impaired themselves, teaching from lived
                experience rather than theory alone.
              </p>
            </div>
            <div className="stats">
              <div className="stat">
                <span className="stat__num">1,200+</span>
                <span className="stat__label">Readers taught since we began</span>
              </div>
              <div className="stat">
                <span className="stat__num">18</span>
                <span className="stat__label">Community centers across Tamil Nadu</span>
              </div>
              <div className="stat">
                <span className="stat__num">40+</span>
                <span className="stat__label">Trained volunteer instructors</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="contact__grid">
            <div className="contact-info">
              <div className="section-eyebrow">Get in touch</div>
              <h2>Volunteer, donate, or just say hello.</h2>
              <p className="contact-info__label">Email</p>
              <p>hello@sparshbraille.org</p>
              <p className="contact-info__label">Phone</p>
              <p>+91 98765 43210</p>
              <p className="contact-info__label">Address</p>
              <p>14 Kamaraj Salai, Chennai, Tamil Nadu</p>
            </div>

            <div>
              {sent ? (
                <div className="confirm">
                  Thank you — your message has been received. We'll write back soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn">Send message</button>
                </form>
              )}
            </div>
          </div>
        </section>

        <footer className="footer">
          © 2026 Sparsh Braille Trust. All rights reserved.
        </footer>
      </div>
    </>
  );
}
