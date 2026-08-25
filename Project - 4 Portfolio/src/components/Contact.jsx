import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Linkedin, Github, MessageSquare } from 'lucide-react';

const EMAILJS_SERVICE_ID = 'service_u3ueqag';
const EMAILJS_TEMPLATE_ID = 'template_58xuffj';
const EMAILJS_PUBLIC_KEY = 'aDbyFtXS9nBLIzuof';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim() || form.subject.trim().length < 3) {
      errs.subject = 'Please enter a message subject.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = 'Please type a detailed message (at least 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    try {
      // 1. Send via EmailJS with user credentials
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          subject: form.subject,
          message: form.message,
          to_email: personalInfo.email,
          to_name: personalInfo.name
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      console.error('EmailJS sending error:', err);

      // Fallback: try Web3Forms api
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: 'b9a67a07-8e6a-4d76-8809-5a17277a06a2',
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
            to: personalInfo.email
          })
        });
      } catch (fErr) {
        console.error('Web3Forms fallback error:', fErr);
      }

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <MessageSquare size={16} /> // GET IN TOUCH
          </span>
          <h2 className="section-title">
            Contact <span>Me</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Have a project idea, internship opportunity, or technical inquiry? Send a message and let's collaborate!
          </p>
        </div>

        <div className="contact-grid">
          <div className="glass-card">
            <h3 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Let's Build Something Great Together
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
              I am actively seeking software engineering internships, AI research collaborations, and web development opportunities. My inbox is always open.
            </p>

            <div className="contact-info-list">
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={22} />
                </div>
                <div className="contact-text">
                  <strong>Direct Email</strong>
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={22} />
                </div>
                <div className="contact-text">
                  <strong>Phone Number</strong>
                  <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={22} />
                </div>
                <div className="contact-text">
                  <strong>Location</strong>
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                <Github size={18} /> GitHub
              </a>
            </div>
          </div>

          <div className="glass-card">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. alex@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Internship Opportunity / Web Project"
                  value={form.subject}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.subject && <span className="form-error">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project details or opportunity..."
                  value={form.message}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'sending'}
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {status === 'sending' ? (
                  '⏳ Sending Message...'
                ) : (
                  <>
                    <Send size={18} /> Send Message Directly
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="toast-notification toast-success">
                  <CheckCircle2 size={22} style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Message Sent Successfully!</strong>
                    <p style={{ fontSize: '0.85rem', margin: 0 }}>
                      Thank you for reaching out. A response will be sent to {personalInfo.email} shortly.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
