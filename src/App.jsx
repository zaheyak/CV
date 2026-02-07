import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './App.css'

const MODA_MAKERS_IMAGES = [
  '1.png', '2.png', '3.png', '4.png', '5.png',
  '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png', '13.png',
]

const getModaImageLabel = (index) =>
  index < 5 ? 'User Dashboard' : 'Manager Dashboard'

function App() {
  const [mounted, setMounted] = useState(false)
  const [visibleSections, setVisibleSections] = useState({})
  const [modaImageIndex, setModaImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [pdfError, setPdfError] = useState(null)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cv-theme-v2')
      if (saved === 'light' || saved === 'dark') return saved
      return 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('cv-theme-v2', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const PDF_URL = '/Zaheya%20Kdmany%20CV%202026.pdf'
  const PDF_FILENAME = 'Zaheya-Kdmany-CV-2026.pdf'

  const handleDownloadPdf = async (e) => {
    e.preventDefault()
    setPdfError(null)
    try {
      const res = await fetch(PDF_URL)
      if (!res.ok) throw new Error('PDF load failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = PDF_FILENAME
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      setPdfError('הטעינה של מסמך ה-PDF נכשלה.')
      window.open(PDF_URL, '_blank')
    }
  }

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const lightboxPrev = () => {
    setLightboxIndex((i) => (i === 0 ? MODA_MAKERS_IMAGES.length - 1 : i - 1))
  }

  const lightboxNext = () => {
    setLightboxIndex((i) => (i + 1) % MODA_MAKERS_IMAGES.length)
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') lightboxPrev()
      if (e.key === 'ArrowRight') lightboxNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, lightboxIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      setModaImageIndex((i) => (i + 1) % MODA_MAKERS_IMAGES.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setMounted(true)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }))
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )
    document.querySelectorAll('section').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const skills = [
    'Python', 'Java', 'JavaScript', 'C++', 'C#', 'React', 'Node.js', 'Express',
    'HTML', 'CSS', 'REST API', 'SQL', 'NoSQL', 'OOP', 'QA', 'GitHub',
    'Data Structures', 'Algorithms', 'Operating Systems', 'Prompt Engineering',
  ]

  return (
    <div className="app">
      <div className="bg-gradient" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />

      <nav className="nav">
        <a href="#hero">Zaheya</a>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#summary">Summary</a>
            <a href="#education">Education</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? (
              <svg className="theme-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg className="theme-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <main>
        <section id="hero" className={`hero ${mounted ? 'visible' : ''}`}>
          <div className="hero-badge">Software Engineer</div>
          <h1 className="hero-title">
            <span className="gradient-text">Zaheya</span>
            <span className="hero-title-last"> Kdmany</span>
          </h1>
          <p className="hero-subtitle">
            Full Stack & AI Developer
          </p>
          <p className="hero-subtitle hero-subtitle-muted">
            Honors Graduate · Technion
          </p>
          <button
            type="button"
            className="hero-download-btn"
            onClick={handleDownloadPdf}
            aria-label="Download CV as PDF"
          >
            <span className="hero-download-icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </span>
            Download CV (PDF)
          </button>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-download-fallback"
          >
            Open PDF in new tab
          </a>
          {pdfError && (
            <p className="hero-pdf-error" role="alert">
              {pdfError}
            </p>
          )}
          <div className="hero-links">
            <a
              href="https://www.linkedin.com/in/zaheya-kdmany-493778353/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="mailto:zaheyakdmany1231@gmail.com"
              className="hero-link"
              aria-label="Email"
              title="Email"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a
              href="https://github.com/zaheyak"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
          <div className="hero-langs">
            <span>English</span>
            <span>Hebrew</span>
            <span>Arabic</span>
          </div>
          <a href="#summary" className="scroll-hint">
            <span>Scroll</span>
            <div className="scroll-arrow" />
          </a>
        </section>

        <section
          id="summary"
          className={`section card ${visibleSections.summary ? 'visible' : ''}`}
        >
          <h2 className="section-title">
            <span className="section-icon">◆</span> TECHNICAL SUMMARY
          </h2>
          <p className="summary-text">
            Full-Stack Developer with hands-on experience building AI-driven systems, microservices architectures,
            and scalable content platforms. Strong background in software engineering, database design, and modern
            web technologies. Passionate about developing intelligent, high-performance digital solutions and
            contributing to innovative engineering teams.
          </p>
        </section>

        <section
          id="education"
          className={`section ${visibleSections.education ? 'visible' : ''}`}
        >
          <h2 className="section-title">
            <span className="section-icon">◆</span> Education & Courses
          </h2>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-date">Oct 2025 – Present</span>
              <h3>Bachelor of Science (B.Sc.) – Computer Science</h3>
              <p>The Open University of Israel</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-date">Sep 2025 – Dec 2025</span>
              <h3>Full Stack Development with AI</h3>
              <p>LOTUS Women's Hi-Tech Hub</p>
            </div>
            <div className="timeline-item">
              <span className="timeline-date">Oct 2022 – Dec 2024</span>
              <h3>Diploma in Software Engineering (Technician)</h3>
              <p>The National School for Practical Engineers, Technion – Haifa</p>
              <p className="timeline-highlight">Honors · GPA 94 · Excellence letters in all semesters</p>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className={`section ${visibleSections.projects ? 'visible' : ''}`}
        >
          <h2 className="section-title">
            <span className="section-icon">◆</span> Projects
          </h2>
          <div className="projects-grid">
            <article className="project-card project-featured">
              <span className="project-date">Sep 2025 – Present</span>
              <h3>EduCore AI – Content Studio Microservice</h3>
              <p>
                Part of EduCore AI corporate LMS. Independent Content Studio microservice for creation,
                management, and storage of courses/topics. AI-driven multi-format content (avatar video,
                text, audio, slides, code, mind maps).
              </p>
              <div className="project-video-wrap">
                <video
                  className="project-video"
                  src="/Content%20Studio%20Overview%20(1).mp4"
                  controls
                  playsInline
                  poster=""
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <a
                href="https://content-studio-two.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View project →
              </a>
              <div className="tech-stack">
                React · Tailwind · Node.js/Express · Production · Vercel · Railway · Supabase
              </div>
            </article>
            <article className="project-card">
              <span className="project-date">2024</span>
              <h3>MODA MAKERS – Personalized E-Commerce</h3>
              <p>
                Online clothing store with personalized recommendations by body shape. React, Node.js, SQL.
                PayPal integration. Final Diploma Project – Grade 100.
              </p>
              <div className="project-carousel-wrap">
                <div className="project-carousel-label">
                  {getModaImageLabel(modaImageIndex)}
                </div>
                <button
                  type="button"
                  className="project-carousel-img-btn"
                  onClick={() => openLightbox(modaImageIndex)}
                  aria-label="View image larger"
                >
                  <img
                    key={modaImageIndex}
                    className="project-carousel-img"
                    src={`/${MODA_MAKERS_IMAGES[modaImageIndex]}`}
                    alt={`MODA MAKERS – ${getModaImageLabel(modaImageIndex)} – ${modaImageIndex + 1}`}
                    draggable={false}
                  />
                </button>
                <div className="project-carousel-dots">
                  {MODA_MAKERS_IMAGES.map((_, i) => (
                    <span
                      key={i}
                      className={`project-carousel-dot ${i === modaImageIndex ? 'active' : ''}`}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
              <div className="tech-stack">React · Node.js · SQL · PayPal</div>
            </article>
          </div>
        </section>

        {lightboxOpen && createPortal(
          <div
            className="lightbox-overlay"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="MODA MAKERS image gallery"
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <button
              type="button"
              className="lightbox-prev"
              onClick={(e) => { e.stopPropagation(); lightboxPrev() }}
              aria-label="Previous image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <span className="lightbox-label">
                {getModaImageLabel(lightboxIndex)}
              </span>
              <img
                className="lightbox-img"
                src={`/${MODA_MAKERS_IMAGES[lightboxIndex]}`}
                alt={`MODA MAKERS – ${getModaImageLabel(lightboxIndex)} – ${lightboxIndex + 1} of ${MODA_MAKERS_IMAGES.length}`}
                draggable={false}
              />
              <span className="lightbox-counter">
                {lightboxIndex + 1} / {MODA_MAKERS_IMAGES.length}
              </span>
            </div>
            <button
              type="button"
              className="lightbox-next"
              onClick={(e) => { e.stopPropagation(); lightboxNext() }}
              aria-label="Next image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>,
          document.body
        )}

        <section
          id="skills"
          className={`section ${visibleSections.skills ? 'visible' : ''}`}
        >
          <h2 className="section-title">
            <span className="section-icon">◆</span> Skills
          </h2>
          <div className="skills-wrap">
            {skills.map((skill, i) => (
              <span
                key={skill}
                className="skill-tag"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className={`section card ${visibleSections.experience ? 'visible' : ''}`}
        >
          <h2 className="section-title">
            <span className="section-icon">◆</span> Employment Experience
          </h2>
          <div className="experience-grid">
            <div className="exp-card">
              <span className="exp-date">May 2022 – Aug 2025</span>
              <h3>Shift Manager</h3>
              <p>HoneySweets Ltd, Yarka</p>
            </div>
            <div className="exp-card">
              <span className="exp-date">Sep 2021 – Aug 2022</span>
              <h3>National Service</h3>
              <p>Yarka – 12 months volunteering in kindergarten. Time management, problem-solving, teamwork.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Zaheya Kdmany · Technion Honors · Full Stack & AI</p>
      </footer>
    </div>
  )
}

export default App
