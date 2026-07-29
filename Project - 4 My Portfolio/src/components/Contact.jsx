import { useState } from 'react'
import useReveal from './useReveal'

const initForm  = { name: '', email: '', subject: '', message: '' }
const initErrors = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  useReveal()
  const [form, setForm]       = useState(initForm)
  const [errors, setErrors]   = useState(initErrors)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e = { ...initErrors }
    let ok = true
    if (form.name.trim().length < 2)                       { e.name    = 'Please enter your full name (at least 2 characters).'; ok = false }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))   { e.email   = 'Please enter a valid email address.'; ok = false }
    if (form.subject.trim().length < 3)                    { e.subject = 'Please enter a subject.'; ok = false }
    if (form.message.trim().length < 10)                   { e.message = 'Message must be at least 10 characters.'; ok = false }
    setErrors(e)
    return ok
  }

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!validate()) return
    setForm(initForm)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-inner">
        <p className="section-label reveal">// get_in_touch</p>
        <h2 className="section-title reveal">Contact <span>Me</span></h2>
        <div className="section-divider reveal" />

        <div className="contact-grid">
          <div className="contact-info reveal">
            <h3>Let's Work Together</h3>
            <p>I'm open to internship opportunities, collaborative projects, and academic discussions. Whether you have a project idea or just want to connect — my inbox is always open!</p>

            {[
              { icon: '📧', label: 'Email',    content: <a href="mailto:ranjini.p.aids29@princedrkvasudevan.com">ranjini.p.aids29@princedrkvasudevan.com</a> },
              { icon: '📞', label: 'Phone',    content: <a href="tel:+919159880928">+91 9159880928</a> },
              { icon: '📍', label: 'Location', content: <span>Tamil Nadu, India</span> },
            ].map(item => (
              <div key={item.label} className="contact-item">
                <span className="c-icon">{item.icon}</span>
                <div className="c-text"><strong>{item.label}</strong>{item.content}</div>
              </div>
            ))}

            <div className="social-links">
              <a href="https://www.linkedin.com/in/ranjini-p-3601a1387/" target="_blank" rel="noopener noreferrer" className="social-btn">🔗 LinkedIn</a>
              <a href="https://github.com/ranjinip1605" target="_blank" rel="noopener noreferrer" className="social-btn">🐙 GitHub</a>
            </div>
          </div>

          <div className="contact-form-box reveal d2">
            <form onSubmit={handleSubmit} noValidate>
              {[
                { id: 'name',    label: 'Full Name',      type: 'text',  placeholder: 'Your full name' },
                { id: 'email',   label: 'Email Address',  type: 'email', placeholder: 'your@email.com' },
                { id: 'subject', label: 'Subject',        type: 'text',  placeholder: "What's this about?" },
              ].map(f => (
                <div key={f.id} className="form-group">
                  <label htmlFor={f.id}>{f.label}</label>
                  <input
                    id={f.id} name={f.id} type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.id]}
                    onChange={handleChange}
                    className={errors[f.id] ? 'invalid' : ''}
                  />
                  <span className="form-error">{errors[f.id]}</span>
                </div>
              ))}

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message" name="message"
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? 'invalid' : ''}
                />
                <span className="form-error">{errors.message}</span>
              </div>

              <button type="submit" className="btn-primary submit-btn">Send Message ✉️</button>
              {success && <div className="form-success">✅ Message sent! I'll get back to you soon.</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
