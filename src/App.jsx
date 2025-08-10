import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaPlay, FaExternalLinkAlt, FaBars, FaTimes, FaLyft, FaLaptop, FaLink } from 'react-icons/fa'
import { SiReact, SiTypescript, SiTailwindcss, SiFramer, SiNodedotjs, SiVite, SiPostman, SiJavascript, SiCodingninjas, SiCss3, SiDart, SiPhp, SiHtml5, SiSqlite, SiMysql, SiPython } from 'react-icons/si'
import './index.css'
import NeonCanvas from './components/NeonCanvas.jsx'
import ProfilImage from './assets/Profil.jpeg';
import LogoImage from '/ex-aid.png'
import Project1 from './assets/Webrt.png';
import Project2 from './assets/Posyandu.png';
import Project3 from './assets/Zodiak.png';



const Section = ({ id, children }) => (
  <section id={id} className="relative py-24 sm:py-28 md:py-32">
    <div className="absolute inset-0 exaid-grid pointer-events-none" />
    <div className="relative container mx-auto px-5 max-w-6xl">
      {children}
    </div>
  </section>
)

const Badge = ({ children, color = 'pink' }) => {
  const colorMap = {
    pink: 'from-[#ff2bb3] to-[#7a2ff7]',
    green: 'from-[#8bfd00] to-[#29ffe3]',
    cyan: 'from-[#29ffe3] to-[#7a2ff7]'
  }
  return (
    <span className={`inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-gradient-to-r ${colorMap[color]} text-black/90`}>{children}</span>
  )
}

function Navbar() {
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ]
  const [menuOpen, setMenuOpen] = useState(false)
  function handleClick(e, href) {
    e.preventDefault()
    const el = document.querySelector(href)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 88
    window.scrollTo({ top: y, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-5 rounded-2xl glass relative"
        >
          <div className="flex items-center justify-between px-5 py-3">
            <a href="#home" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-center bg-cover"style={{ backgroundImage: `url(${LogoImage})` }}/>
              <span className="font-orbitron text-sm tracking-widest">Andre Junika</span>
            </a>
            <nav className="hidden md:flex items-center gap-2 text-sm">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="relative px-3 py-2 text-white/80 hover:text-white transition-colors after:content-[''] after:absolute after:left-2 after:right-2 after:-bottom-0.5 after:h-0.5 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:bg-gradient-to-r after:from-[#ff2bb3] after:to-[#29ffe3]"
                  onClick={(e) => handleClick(e, l.href)}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <a href="#contact" className="btn-primary rounded-xl px-4 py-2 text-sm font-semibold items-center gap-2 hidden md:flex">
              <FaPlay className="text-white/90" /> Hire Me
            </a>
            <button
              className="md:hidden h-9 w-9 grid place-items-center rounded-lg border border-white/20 text-white/90 bg-black/70 backdrop-blur"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute left-3 right-3 top-[calc(100%+8px)] rounded-2xl overflow-hidden bg-black/60 backdrop-blur-xl border border-white/10"
            >
              <div className="flex flex-col py-2 text-white drop-shadow-md">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="px-4 py-3 text-sm hover:bg-white/5"
                    onClick={(e) => handleClick(e, l.href)}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, '#contact')}
                  className="m-2 btn-primary rounded-xl px-4 py-2 text-sm font-semibold text-center"
                >
                  <span className="inline-flex items-center gap-2 justify-center">
                    <FaPlay className="text-white" /> Hire Me
                  </span>
                </a>
              </div>
            </motion.div>            
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  )
}

function Hero({ prefersReducedMotion = false }) {
  return (
    <Section id="home">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <Badge>Portofolio</Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold font-orbitron leading-tight neon-text">
            Andre Junika
          </h1>
          <p className="mt-4 text-white/80 max-w-xl">
          With experience in building modern and responsive UI, I combine elegant design, smooth animation, and neat structure to create a comfortable and stunning web experience. Every detail is designed to align with user needs and business goals.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#projects" className="btn-primary px-5 py-3 rounded-xl text-sm font-semibold">See Projects</a>
            <a href="#contact" className="btn-ghost px-5 py-3 rounded-xl text-sm font-semibold">Contact</a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-white/70">
            <a href="https://github.com/Andrejun1" target="_blank" rel="noreferrer" className="hover:text-white"><FaGithub size={22} /></a>
            <a href="https://lynk.id/andrejun" target="_blank" rel="noreferrer" className="hover:text-white"><FaLink size={22} /></a>
            <a href="mailto:junikayusuf11@gmail.com" className="hover:text-white"><FaEnvelope size={22} /></a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="relative aspect-square">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#ff2bb3] via-[#7a2ff7] to-[#29ffe3] blur-xl opacity-30 rounded-3xl" />
            <div 
  className="relative glass rounded-3xl h-full w-full overflow-hidden bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${ProfilImage})`,
    backgroundSize: 'cover', // atau 'contain' kalau mau full tanpa crop
    backgroundPosition: 'center 60%' // bisa diatur misal 'center 20%' buat fokus wajah
  }}
>
              {/* Canvas efek dinonaktifkan untuk tampilan normal */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center p-8"
              >
                <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function PageIntro() {
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    const hideTimer = setTimeout(() => setIsVisible(false), 2200)
    return () => clearTimeout(hideTimer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.25, ease: 'easeInOut', delay: 0.35 }}
        >
          {/* Background layers — elegan hitam */}
          <div className="absolute inset-0 bg-[#0a0a0c]" />
          <div className="absolute inset-0 opacity-60" style={{
            background:
              'radial-gradient(800px 300px at 20% 0%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(800px 300px at 80% 100%, rgba(255,255,255,0.10), transparent 60%)'
          }} />
          <div className="absolute inset-0 scanlines pointer-events-none" />

          {/* Staggered panels */}
          <div className="absolute inset-0 flex flex-col gap-2 p-6">
            {[0,1,2].map((i) => (
              <motion.div
                key={i}
                initial={{ x: i % 2 === 0 ? -60 : 60, opacity: 0 }}
                animate={{ x: 0, opacity: 0.9 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
                className="flex-1 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))',
                  border: '1px solid rgba(255,255,255,0.12)'
                }}
              />
            ))}
          </div>

          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-center">
              <div className="font-orbitron text-4xl font-extrabold pulse">Andre Junika</div>
              <div className="mt-1 text-xs tracking-widest text-white/60 blink">INITIALIZING UI</div>
            </motion.div>
          </div>

          {/* Sweep glow */}
          <motion.div
            initial={{ x: '-20%' }}
            animate={{ x: '120%' }}
            transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.6 }}
            className="absolute inset-y-0 w-[20%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function About() {
  const items = [
    { title: 'Experience-Based Development', desc: 'Every detail of the UI and UX is designed with a focus on user comfort and ease of navigation.' },
    { title: 'Optimal Performance', desc: 'Utilizing React technology and Tailwind CSS optimization for fast performance without compromising visual quality.' },
    { title: 'Responsive', desc: 'Optimal display on mobile, tablet, and wide desktop.' },
  ]
  return (
    <Section id="about">
      <div className="mb-8"><Badge color="green">About</Badge></div>
      <h2 className="text-3xl sm:text-4xl font-bold font-orbitron">About Me</h2>
      <p className="mt-3 text-white/80 max-w-2xl">A full stack developer who helps everyone enjoy increasingly advanced technology, making activities that were once manual easier, more automated, and simpler.</p>
      <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((it) => (
          <motion.div key={it.title} whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
            <div className="text-lg font-semibold">{it.title}</div>
            <div className="mt-1 text-white/70 text-sm">{it.desc}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Projects() {
  const projects = useMemo(() => ([
    {
      name: 'Website Perum Korpri RT 14',
      image: Project1,
      desc: 'The Perum Korpri RT 14 website contains information about RT activities and a gallery for residents.',
      tags: ['Html', 'Css', 'Js', 'Supabase'],
      live: 'https://rt14perumkorpri.vercel.app',
      github: 'https://github.com/Andrejun1/WebsiteRT14PerumKorpri'
    },
    {
      name: 'Website Posyandu Perum Korpri RT 14',
      image: Project2,
      desc: 'The Posyandu Perum Korpri RT 14 website shares activity info and helps mothers record data digitally.',
      tags: ['Html', 'Css', 'Js', 'Supabase'],
      live: 'https://posyanduperumkorpri.vercel.app',
      github: 'https://github.com/Andrejun1/PosyanduPerumKorpri'
    },
    {
      name: 'Zodiac forecast',
      image: Project3,
      desc: 'Website for predicting your zodiac sign and fortune.',
      tags: ['Html', 'Css'],
      live: 'https://andrejun1.github.io/Zodiak/',
      github: 'https://github.com/Andrejun1/Zodiak'
    }
  ]), [])

  return (
    <Section id="projects">
      <div className="mb-8 flex items-end justify-between">
        <Badge color="cyan">Projects</Badge>
        <a href="#contact" className="text-sm text-white/70 hover:text-white">Request proyek →</a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <motion.div 
            key={p.name} 
            whileHover={{ y: -6 }} 
            className="group glass rounded-2xl p-5"
          >
            <div className="h-36 rounded-xl overflow-hidden border border-white/10">
              <img 
                src={p.image} 
                alt={p.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="mt-4 font-semibold">{p.name}</div>
            <div className="mt-1 text-sm text-white/70">{p.desc}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map(t => (
                <span key={t} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs">{t}</span>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <a href={p.live} target="_blank" rel="noreferrer" className="btn-primary px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2">
                <FaExternalLinkAlt size={12} /> Live
              </a>
              <a href={p.github} target="_blank" rel="noreferrer" className="btn-ghost px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2">
                <FaGithub size={14} /> GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Skills({ prefersReducedMotion = false }) {
  const skillOrbs = [
    { name: 'React', Icon: SiReact, colors: ['#61dafb', '#7a2ff7'], float: 10, rotate: 20 },
    { name: 'CSS', Icon: SiCss3, colors: ['#61dafb', '#7a2ff7'], float: 12 },
    { name: 'Tailwind', Icon: SiTailwindcss, colors: ['#38bdf8', '#29ffe3'], float: 9 },
    { name: 'Dart', Icon: SiDart, colors: ['#61dafb', '#7a2ff7'], float: 14 },
    { name: 'Node.js', Icon: SiNodedotjs, colors: ['#8cc84b', '#8bfd00'], float: 11 },
    { name: 'JavaScript', Icon: SiJavascript, colors: ['#ffff00', '#ffff00'], float: 8 },
    { name: 'SQL', Icon: SiMysql, colors: ['#38bdf8', '#f3f5e7'], float: 13 },
    { name: 'Python', Icon: SiPython, colors: ['#61dafb', '#7a2ff7'], float: 14 },
  ]

  return (
    <Section id="skills">
      <div className="mb-8"><Badge color="green">Skills</Badge></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {skillOrbs.map(({ name, Icon, colors, float, rotate = 0 }) => (
          <motion.div
            key={name}
            className="relative aspect-square rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -inset-0.5 rounded-2xl blur-xl" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`, opacity: 0.35 }} />
            <div className="relative glass h-full w-full rounded-2xl flex items-center justify-center">
              <NeonCanvas className="absolute inset-0 opacity-50" density={prefersReducedMotion ? 0.3 : 0.9} speed={prefersReducedMotion ? 0.2 : 0.45} />
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [0, -float, 0], rotate: rotate ? [0, rotate, 0] : 0 }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="p-4 rounded-full bg-white/5 border border-white/10">
                  <Icon size={44} color={colors[0]} />
                </div>
                <div className="mt-3 text-sm text-white/80">{name}</div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact">
      <div className="mb-8"><Badge>Contact</Badge></div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <div className="text-lg font-semibold">Send Message</div>
          <form className="mt-4 grid gap-3"onSubmit={(e) => {e.preventDefault();
                const name = e.target[0].value;
                const email = e.target[1].value;
                const message = e.target[2].value;
                window.location.href = `mailto:junikayusuf11@gmail.com?subject=Message from ${name}&body=${message}%0AFrom: ${email}`;}}>
                <input placeholder="Name" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-[#ff2bb3]" />
                <input placeholder="Email" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-[#ff2bb3]" />
                <textarea placeholder="Message" rows="4" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-[#ff2bb3]" />
                <button type="submit" className="btn-primary rounded-xl px-4 py-2 text-sm font-semibold">Send</button>
          </form>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="text-lg font-semibold">Info</div>
          <div className="mt-2 text-white/70 text-sm">Open to freelancers and collaborations. Please contact me via email. I sell mobile applications to LYNK.ID.</div>
          <div className="mt-4 flex gap-3">
            <a className="btn-ghost px-4 py-2 rounded-xl text-sm" href="mailto:junikayusuf11@gmail.com">Email</a>
            <a className="btn-ghost px-4 py-2 rounded-xl text-sm" href="https://lynk.id/andrejun" target="_blank" rel="noreferrer">Lynk</a>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="py-10 text-center text-white/60 text-sm">
      © {new Date().getFullYear()} Andre Junika Portfolio. Created with React + Tailwind.
    </footer>
  )
}

export default function App() {
  const prefersReducedMotion = useReducedMotion()
  useEffect(() => {
    // Hindari auto-restore scroll atau scroll ke hash saat initial load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    window.scrollTo(0, 0)
    setTimeout(() => window.scrollTo(0, 0), 0)
  }, [])

  return (
    <div className="has-fixed-header">
      <PageIntro />
      <Navbar />
      <main className="pt-24">
        <Hero prefersReducedMotion={prefersReducedMotion} />
        <About />
        <Projects />
        <Skills prefersReducedMotion={prefersReducedMotion} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
