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
    kind: 'Backend · TFI Diseño de Sistemas · UTN FRT',
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
    kind: 'Hackathon · Solana × Superteam',
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
    kind: 'Base de datos · TFI Gestión de Datos · UTN FRT',
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
  { label: 'Uso frecuente', items: ['Java', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'Git y GitHub'] },
  { label: 'Con práctica', items: ['Spring Boot', 'React', 'MariaDB', 'Maven', 'C++', 'Redes'] },
  { label: 'En formación', items: ['C#', 'TypeScript', 'Azure'] },
]

const STATS = [
  ['4.º', 'año de Ingeniería'],
  ['5', 'proyectos en GitHub'],
  ['1', 'hackathon'],
]

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
      <div className="progress" ref={bar} />
      <header className="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#inicio">JPG<span>.</span></a>
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
          <div className="top">
            {SHOW_PHOTO && <img className="avatar" src="./juan-pablo.jpg" alt="Juan Pablo Gerez" width="72" height="72" />}
            <span className="pill"><i /> Disponible para trabajar</span>
          </div>
          <h1>Juan Pablo <em>Gerez</em></h1>
          <p className="role">Desarrollador full-stack en formación · Java, Spring Boot, MySQL y React</p>
          <p className="lead">
            Estudiante de Ingeniería en Sistemas de Información en la UTN FRT. Construyo APIs, modelo bases de datos
            y armo interfaces web. Busco mi primera experiencia profesional en el área de sistemas, sumarme a un equipo y seguir aprendiendo.
          </p>
          <div className="cta">
            <a className="btn primary" href="./CV_Juan_Pablo_Gerez.pdf" download>Descargar CV</a>
            <a className="btn" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <dl className="stats">
            {STATS.map(([a, b]) => (<div key={b}><dt>{a}</dt><dd>{b}</dd></div>))}
          </dl>
        </section>

        <section id="sobre-mi" className="wrap sec">
          <Reveal>
            <p className="eyebrow">Sobre mí</p>
            <h2>Bases sólidas y ganas de aprender haciendo.</h2>
            <div className="about">
              <p>
                Curso 4.º año de Ingeniería en Sistemas de Información. Tengo bases de arquitectura de computadoras,
                sistemas operativos y redes, y las llevé a la práctica en proyectos académicos y propios de backend,
                bases de datos y desarrollo web.
              </p>
              <p>
                Me importa dejar el trabajo documentado y reproducible: READMEs claros, scripts que corren de punta a punta
                y credenciales fuera del código. Trabajo bien en equipo, soy proactivo y responsable.
              </p>
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
                <a href="./CV_Juan_Pablo_Gerez.pdf" download>Descargar CV (PDF)</a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="wrap foot">© {new Date().getFullYear()} Juan Pablo Gerez · Las Talitas, Tucumán</footer>
    </>
  )
}
