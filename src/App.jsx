import { useEffect, useRef, useState } from 'react'

const LINKEDIN = 'https://www.linkedin.com/in/juan-pablo-gerez-153898381'
const GITHUB = 'https://github.com/jpgerez-dev'
const MAIL = 'jpgerez.sistemas@gmail.com'
const ROLES = ['Desarrollador full-stack en formación', 'Backend con Java y Spring Boot', 'Bases de datos y diseño de sistemas']

const PROJECTS = [
  { n: '01', title: 'JFA Distribuciones: gestión de usuarios', ctx: 'TFI Diseño de Sistemas · UTN FRT · 2023 · equipo de 4',
    desc: 'API REST con autenticación JWT y contraseñas con Argon2 para el sistema web de una distribuidora de materiales eléctricos. Se implementó el módulo de usuarios; el resto del sistema quedó documentado en un informe de 36 páginas.',
    points: ['Registro, login, listado y baja de usuarios con tokens JWT.', 'Revisión posterior de seguridad: secretos fuera del repo, respuestas 401 y 409, protección contra XSS.'],
    stack: ['Java 21', 'Spring Boot', 'JPA / Hibernate', 'MySQL', 'JWT', 'Argon2', 'Maven'], url: GITHUB + '/DS_TFI_backend' },
  { n: '02', title: 'MatePay: cobros en USDC con QR', ctx: 'Hackathon Solana × Superteam Argentina · 2026 · equipo de 3',
    desc: 'Prototipo para que un comercio cobre en dólares digitales con un QR de Solana Pay, y el cliente pague sin necesitar SOL para las comisiones. Corre en Devnet y el pago es una simulación.',
    points: ['Monto en pesos convertido a USDC y QR de Solana Pay.', 'Pago por escaneo de QR o por alias, con fee-payer que cubre las comisiones.'],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Express', 'Solana web3.js'], url: GITHUB + '/matepay' },
  { n: '03', title: 'Modelo relacional integral en MySQL', ctx: 'TFI Gestión de Datos · UTN FRT · con una compañera de grupo',
    desc: 'Base de datos que integra cuatro módulos de una empresa: Compras, Ventas, RR. HH. y Liquidación de Haberes, con scripts de creación, datos de prueba y consultas SQL.',
    points: ['Diagramas entidad-relación por módulo y claves foráneas entre módulos.', 'Consultas con múltiples joins que responden a cada consigna.'],
    stack: ['MySQL', 'MariaDB', 'SQL', 'Modelado relacional'], url: GITHUB + '/TFI-Gestion_De_Datos' },
]
const MINI = [
  { t: 'Mi Tienda', d: 'React + Vite con flujo GitHub → Pull Request → Azure Static Web Apps.', url: GITHUB + '/mi-tienda' },
  { t: 'Práctica de C#', d: 'Ejercicios y proyectos guiados para aprender los fundamentos del lenguaje.', url: GITHUB + '/practica-csharp' },
]
const SKILLS = [
  { lvl: 'Uso frecuente', items: ['Java', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'Git y GitHub'] },
  { lvl: 'Con práctica', items: ['Spring Boot', 'React', 'MariaDB', 'Maven', 'C++', 'Redes'] },
  { lvl: 'En formación', items: ['C#', 'TypeScript', 'Azure'] },
]

function Network() {
  const ref = useRef()
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const c = ref.current, x = c.getContext('2d'), m = { x: -999, y: -999 }
    let w, h, raf, p = []
    const size = () => { w = c.width = innerWidth; h = c.height = innerHeight }
    size()
    p = Array.from({ length: innerWidth < 700 ? 32 : 70 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }))
    const tick = () => {
      x.clearRect(0, 0, w, h)
      for (const a of p) {
        a.x += a.vx; a.y += a.vy
        if (a.x < 0 || a.x > w) a.vx *= -1
        if (a.y < 0 || a.y > h) a.vy *= -1
        x.fillStyle = 'rgba(125,211,252,.8)'; x.fillRect(a.x, a.y, 2, 2)
        for (const b of p) {
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) { x.strokeStyle = `rgba(99,162,255,${.2 * (1 - d / 130)})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke() }
        }
        if (Math.hypot(a.x - m.x, a.y - m.y) < 160) { a.x += (a.x - m.x) * .004; a.y += (a.y - m.y) * .004 }
      }
      raf = requestAnimationFrame(tick)
    }
    const mv = e => { m.x = e.clientX; m.y = e.clientY }
    tick(); addEventListener('resize', size); addEventListener('mousemove', mv)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); removeEventListener('mousemove', mv) }
  }, [])
  return <canvas ref={ref} className="net" aria-hidden="true" />
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(), [on, setOn] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect() } }, { threshold: .15 })
    o.observe(ref.current); return () => o.disconnect()
  }, [])
  return <div ref={ref} className={`rv ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: delay + 'ms' }}>{children}</div>
}

function Tilt({ children, className }) {
  const ref = useRef()
  const move = e => {
    const r = ref.current.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5
    ref.current.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-4px)`
    ref.current.style.setProperty('--gx', (px + .5) * 100 + '%'); ref.current.style.setProperty('--gy', (py + .5) * 100 + '%')
  }
  return <article ref={ref} className={className} onMouseMove={move} onMouseLeave={() => (ref.current.style.transform = '')}>{children}</article>
}

function Typing() {
  const [i, setI] = useState(0), [t, setT] = useState(''), [del, setDel] = useState(false)
  useEffect(() => {
    const full = ROLES[i]
    const id = setTimeout(() => {
      if (!del) { setT(full.slice(0, t.length + 1)); if (t.length + 1 === full.length) setTimeout(() => setDel(true), 1400) }
      else { setT(full.slice(0, t.length - 1)); if (t.length - 1 === 0) { setDel(false); setI((i + 1) % ROLES.length) } }
    }, del ? 28 : 60)
    return () => clearTimeout(id)
  }, [t, del, i])
  return <span className="typing">{t}<i /></span>
}

export default function App() {
  const [prog, setProg] = useState(0)
  useEffect(() => {
    const s = () => setProg(scrollY / (document.documentElement.scrollHeight - innerHeight) * 100)
    const g = e => { document.body.style.setProperty('--mx', e.clientX + 'px'); document.body.style.setProperty('--my', e.clientY + 'px') }
    addEventListener('scroll', s); addEventListener('mousemove', g)
    return () => { removeEventListener('scroll', s); removeEventListener('mousemove', g) }
  }, [])
  return (
    <>
      <div className="aurora" aria-hidden="true"><b /><b /><b /></div>
      <Network /><div className="glow" aria-hidden="true" /><div className="bar" style={{ width: prog + '%' }} />
      <header className="nav"><div className="wrap">
        <a href="#top" className="logo">JP<span>.</span></a>
        <nav>{[['proyectos', 'Proyectos'], ['stack', 'Stack'], ['sobre-mi', 'Sobre mí'], ['contacto', 'Contacto']].map(([id, l]) => <a key={id} href={'#' + id}>{l}</a>)}</nav>
        <a className="btn sm" href="CV_Juan_Pablo_Gerez.pdf" download>Descargar CV</a>
      </div></header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-txt">
            <p className="pill"><i /> Disponible para pasantías y roles trainee / junior</p>
            <h1>Hola, soy <span className="grad">Juan Pablo Gerez</span></h1>
            <p className="role"><Typing /></p>
            <p className="lead">Estudiante avanzado de Ingeniería en Sistemas de Información (UTN FRT, Tucumán). Me gusta entender un sistema completo: del análisis y el modelo de datos al backend y la interfaz.</p>
            <div className="cta">
              <a className="btn" href="#proyectos">Ver proyectos →</a>
              <a className="btn ghost" href="CV_Juan_Pablo_Gerez.pdf" download>Descargar CV</a>
              <a className="ico" href={LINKEDIN} target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
              <a className="ico" href={GITHUB} target="_blank" rel="noopener" aria-label="GitHub">GH</a>
            </div>
          </div>
          <div className="photo"><div className="ring" /><img src="juan-pablo.jpg" alt="Retrato de Juan Pablo Gerez" width="720" height="900" /></div>
        </section>

        <section id="sobre-mi" className="wrap"><Reveal>
          <h2><em>01</em> Sobre mí</h2>
          <div className="about">
            <p>Soy estudiante de 4.º año en la UTN Facultad Regional Tucumán y me estoy orientando a desarrollo full-stack. Trabajo con Java y Spring Boot en el backend, MySQL en datos y React en la web.</p>
            <p>Me gusta pensar un sistema antes de programarlo: casos de uso, modelo de datos y arquitectura. Participé en una hackathon de Solana y practico el flujo real de trabajo con Git, Pull Requests y despliegue en la nube.</p>
          </div>
          <div className="stats">{[['4.º año', 'Ing. en Sistemas · UTN FRT'], ['5', 'Proyectos en GitHub'], ['1', 'Hackathon (Solana)']].map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}</div>
        </Reveal></section>

        <section id="proyectos" className="wrap">
          <Reveal><h2><em>02</em> Proyectos</h2></Reveal>
          <div className="grid">{PROJECTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 90}><Tilt className="card">
              <span className="num">{p.n}</span><h3>{p.title}</h3><p className="ctx">{p.ctx}</p>
              <p>{p.desc}</p><ul>{p.points.map(x => <li key={x}>{x}</li>)}</ul>
              <div className="chips">{p.stack.map(s => <i key={s}>{s}</i>)}</div>
              <a className="lnk" href={p.url} target="_blank" rel="noopener">Ver código en GitHub →</a>
            </Tilt></Reveal>))}</div>
          <div className="mini">{MINI.map(m => <Reveal key={m.t}><a className="card small" href={m.url} target="_blank" rel="noopener"><h3>{m.t}</h3><p>{m.d}</p><span className="lnk">GitHub →</span></a></Reveal>)}</div>
        </section>

        <section id="stack" className="wrap"><Reveal>
          <h2><em>03</em> Stack</h2>
          <div className="skills">{SKILLS.map(g => <div key={g.lvl} className="card"><h3>{g.lvl}</h3><div className="chips big">{g.items.map(s => <i key={s}>{s}</i>)}</div></div>)}</div>
          <div className="edu"><div><b>UTN FRT</b><span>Ingeniería en Sistemas de Información · 4.º año en curso</span></div><div><b>Inglés</b><span>Nivel intermedio en lectura y escritura</span></div></div>
        </Reveal></section>

        <section id="contacto" className="wrap contact"><Reveal>
          <h2>Busco mi primera posición como desarrollador</h2>
          <p>Estoy abierto a oportunidades trainee, junior o pasantías. Si tenés un equipo donde pueda aportar y aprender, escribime.</p>
          <div className="cta c">
            <a className="btn" href={'mailto:' + MAIL}>{MAIL}</a>
            <a className="btn ghost" href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
            <a className="btn ghost" href={GITHUB} target="_blank" rel="noopener">GitHub</a>
          </div>
        </Reveal></section>
      </main>
      <footer>© {new Date().getFullYear()} Juan Pablo Gerez · San Miguel de Tucumán, Argentina</footer>
    </>
  )
}
