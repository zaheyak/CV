import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [mounted, setMounted] = useState(false)
  const [visibleSections, setVisibleSections] = useState({})

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
        <div className="nav-links">
          <a href="#summary">Summary</a>
          <a href="#education">Education</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
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
            Honors Graduate · Technion · Full Stack & AI
          </p>
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
            <span className="section-icon">◆</span> Summary
          </h2>
          <p className="summary-text">
            Seeking a challenging position in computer science and technology, where I can continue to grow
            and develop professionally. Broad knowledge of programming languages, hands-on experience in
            diverse projects, and a strong desire to contribute to an innovative team. Motivated to
            work in a dynamic environment and bring added value through technical and creative skills.
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
              <div className="tech-stack">React · Node.js · SQL · PayPal</div>
            </article>
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
