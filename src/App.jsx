import { useEffect, useRef, useState } from 'react'

// Poné false para ocultar tu foto en todo el sitio.
const SHOW_PHOTO = true

const LINKEDIN = 'https://www.linkedin.com/in/juan-pablo-gerez-153898381'
const GITHUB = 'https://github.com/jpgerez-dev'
const MAIL = 'jpgerez.sistemas@gmail.com'

const PROJECTS = [
  {
    n: '01',
    title: 'JFA Distribuciones',
    kind: 'Backend · TFI Diseño de Sistemas · UTN FRT · 2023',
    text: 'API REST del módulo de usuarios (registro, inicio de sesión, listado y baja) para el sistema web de una distribuidora de materiales eléctricos. Trabajo en equipo de cuatro personas.',
    points: [
      'Autenticación con tokens JWT y contraseñas con hash Argon2.',
      'Persistencia en MySQL con JPA/Hibernate; dependencias con Maven.',
      'Credenciales fuera del código, validaciones y protección contra XSS.',
    ],
    tags: ['Java 21', 'Spring Boot', 'JWT', 'Argon2', 'MySQL'],
    href: GITHUB + '/DS_TFI_backend',
  },
  {
    n: '02',
    title: 'MatePay',
    kind: 'Hackathon · Solana × Superteam · Oct 2026',
    text: 'Prototipo de pagos y cobros en USDC mediante QR de Solana Pay y alias, sobre Devnet. Ayudé a desarrollar el frontend en un equipo de tres personas.',
    points: [
      'Colaboración continua en el repositorio hasta la presentación final.',
    ],
    tags: ['Solana Pay', 'USDC', 'Devnet', 'Frontend'],
    href: GITHUB + '/matepay',
  },
  {
    n: '03',
    title: 'Modelo relacional en MySQL',
    kind: 'Base de datos · TFI Gestión de Datos · UTN FRT · 2023',
    text: 'Diseño e implementación de una base de datos relacional de 44 tablas, con scripts de creación y carga de datos y consultas SQL con múltiples joins.',
    points: [
      'Claves foráneas y restricciones de integridad.',
      'Script reproducible que se ejecuta de punta a punta.',
    ],
    tags: ['MySQL', 'MariaDB', 'SQL', 'Modelado'],
    href: GITHUB + '/TFI-Gestion_De_Datos',
  },
]

const MINI = [
  { title: 'Mi Tienda', tags: 'Proyecto de práctica' },
  { title: 'Práctica de C#', tags: 'C# · ejercicios' },
]

const SKILLS = [
  { label: 'Lenguajes', items: ['Java', 'JavaScript', 'C#', 'C++'] },
  { label: 'Desarrollo web', items: ['React', 'HTML5', 'CSS3', 'Spring Boot'] },
  { label: 'Bases de datos', items: ['MySQL', 'MariaDB'] },
  { label: 'Herramientas', items: ['Git', 'GitHub', 'Maven'] },
]

const STATS = [['4.º', 'año de Ingeniería'], ['3', 'proyectos destacados'], ['1', 'hackathon']]

const FACTS = [
  ['Carrera', 'Ing. en Sistemas de Información · UTN FRT'],
  ['Cursando', '4.º año'],
  ['Ubicación', 'Las Talitas, Tucumán'],
  ['Busco', 'Trainee, junior o pasantía'],
]

const ROLE = 'Estudiante de Ingeniería en Sistemas · Java, Spring Boot, MySQL y React'

// Frases que se escriben y borran debajo del nombre.
const ROLES = [
  'Estudiante de Ingeniería en Sistemas',
  'Backend con Java y Spring Boot',
  'Bases de datos con MySQL',
  'Desarrollo web con React',
]

function Typewriter({ phrases, still }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduced) return
    const full = phrases[i]
    let delay = deleting ? 35 : 70
    if (!deleting && text === full) delay = 1800
    else if (deleting && text === '') delay = 400
    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true)
      else if (deleting && text === '') { setDeleting(false); setI((i + 1) % phrases.length) }
      else setText(full.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, i, phrases, reduced])

  if (reduced) return <span aria-hidden="true">{still}</span>
  return <span aria-hidden="true">{text}<span className="caret" /></span>
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setOn(true)
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`}>{children}</div>
}

export default function App() {
  const bar = useRef(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div className="aurora" aria-hidden="true"><span /><span /><span /></div>
      <div className="progress" ref={bar} />
      <header className="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#inicio">
            <span className="logo">JPG</span>
            <span className="brand-text">
              <strong>Juan Pablo Gerez</strong>
              <small>Portfolio · Estudiante de Ingeniería en Sistemas</small>
            </span>
          </a>
          <nav>
            <a href="#sobre-mi">Sobre mí</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#stack">Stack</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero wrap">
          <div className="hero-text">
            <span className="pill"><i /> Disponible para trabajar</span>
            <h1>Juan Pablo <em>Gerez</em></h1>
            <p className="role"><span className="sr-only">{ROLE}</span><Typewriter phrases={ROLES} still={ROLE} /></p>
            <p className="lead">
              Estudiante de 4.º año de Ingeniería en Sistemas de Información en la UTN FRT, con práctica en desarrollo
              backend (Java, Spring Boot), bases de datos relacionales y desarrollo web. Busco ganar experiencia profesional en el área de sistemas.
            </p>
            <div className="cta">
              <a className="btn primary" href="./CV_Juan_Pablo_Gerez_Harvard.pdf" download>Descargar CV</a>
              <a className="btn" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
              <a className="btn" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          {SHOW_PHOTO && (
            <div className="photo">
              <img className="avatar" src="./juan-pablo.jpg" alt="Juan Pablo Gerez" width="320" height="320" />
            </div>
          )}
          <dl className="stats">
            {STATS.map(([a, b]) => (<div key={b}><dt>{a}</dt><dd>{b}</dd></div>))}
          </dl>
        </section>

        <section id="sobre-mi" className="wrap sec">
          <Reveal>
            <p className="eyebrow">Sobre mí</p>
            <h2>Bases sólidas y ganas de aprender haciendo.</h2>
            <div className="about-grid">
            <div className="about">
              <p>
                Curso 4.º año de Ingeniería en Sistemas de Información. Tengo práctica en proyectos académicos y propios
                de backend, bases de datos y desarrollo web.
              </p>
              <p>
                Me importa dejar el trabajo documentado y reproducible: READMEs claros, scripts que corren de punta a punta
                y credenciales fuera del código. Trabajo bien en equipo, soy proactivo y responsable.
              </p>
            </div>
            <dl className="facts">
              {FACTS.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
            </dl>
            </div>
          </Reveal>
        </section>

        <section id="proyectos" className="wrap sec">
          <Reveal>
            <p className="eyebrow">Proyectos</p>
            <h2>Lo que construí.</h2>
          </Reveal>
          <div className="grid">
            {PROJECTS.map((p) => (
              <Reveal key={p.n} className="card-wrap">
                <article className="card">
                  <div className="card-top"><span className="num">{p.n}</span><span className="kind">{p.kind}</span></div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                  <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  <a className="link" href={p.href} target="_blank" rel="noreferrer">Ver repositorio →</a>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mini">
              {MINI.map((m) => (
                <a key={m.title} href={GITHUB} target="_blank" rel="noreferrer">
                  <strong>{m.title}</strong><span>{m.tags}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="stack" className="wrap sec">
          <Reveal>
            <p className="eyebrow">Stack</p>
            <h2>Tecnologías con las que trabajo.</h2>
            <div className="skills">
              {SKILLS.map((g) => (
                <div key={g.label}>
                  <h4>{g.label}</h4>
                  <div className="chips">{g.items.map((i) => <span key={i}>{i}</span>)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="contacto" className="wrap sec">
          <Reveal>
            <div className="contact">
              <div>
                <p className="eyebrow">Contacto</p>
                <h2>¿Hablamos?</h2>
                <p className="muted">Estoy buscando una oportunidad (trainee, junior o pasantía) para ganar experiencia en sistemas.</p>
              </div>
              <div className="contact-links">
                <a href={`mailto:${MAIL}`}>{MAIL}</a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
                <a href="./CV_Juan_Pablo_Gerez_Harvard.pdf" download>Descargar CV (PDF)</a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="wrap foot">© {new Date().getFullYear()} Juan Pablo Gerez · Las Talitas, Tucumán</footer>
    </>
  )
}
