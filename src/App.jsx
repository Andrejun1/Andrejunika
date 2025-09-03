import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaPlay, FaExternalLinkAlt, FaBars, FaTimes, FaLyft, FaLaptop, FaLink } from 'react-icons/fa'
import { SiReact, SiTypescript, SiTailwindcss, SiFramer, SiNodedotjs, SiVite, SiPostman, SiJavascript, SiCodingninjas, SiCss3, SiDart, SiPhp, SiHtml5, SiSqlite, SiMysql, SiPython } from 'react-icons/si'
import './index.css'
import NeonCanvas from './components/NeonCanvas.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import MouseBackground from './components/MouseBackground.jsx'
import { ThemeProvider, useTheme } from './contexts/ThemeContext.jsx'
import ProfilImage from './assets/Profil.jpeg'
import LogoImage from '/ex-aid.png'
import Project1 from './assets/Webrt.png'
import Project2 from './assets/Posyandu.png'
import Project3 from './assets/Zodiak.png'



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
                  className="relative px-3 py-2 text-white/80 dark:text-white/80 text-slate-700 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors after:content-[''] after:absolute after:left-2 after:right-2 after:-bottom-0.5 after:h-0.5 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:bg-gradient-to-r after:from-[#ff2bb3] after:to-[#29ffe3]"
                  onClick={(e) => handleClick(e, l.href)}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <a href="#contact" className="btn-primary rounded-xl px-4 py-2 text-sm font-semibold items-center gap-2 flex">
                <FaPlay className="text-white/90" /> Hire Me
              </a>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="h-9 w-9 grid place-items-center rounded-lg border border-white/20 dark:border-white/20 border-slate-300 text-white/90 dark:text-white/90 text-slate-700 bg-black/70 dark:bg-black/70 bg-white/70 backdrop-blur"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>
            </div>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute left-3 right-3 top-[calc(100%+8px)] rounded-2xl overflow-hidden bg-black/60 dark:bg-black/60 bg-white/80 backdrop-blur-xl border border-white/10 dark:border-white/10 border-slate-200"
            >
              <div className="flex flex-col py-2 text-white dark:text-white text-slate-800 drop-shadow-md">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="px-4 py-3 text-sm hover:bg-white/5 dark:hover:bg-white/5 hover:bg-slate-100"
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
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold font-orbitron leading-tight neon-text gentle-pulse">
            Andre Junika
          </h1>
          <p className="mt-4 text-white/80 dark:text-white/80 text-slate-700/80 max-w-xl">
          With experience in building modern and responsive UI, I combine elegant design, smooth animation, and neat structure to create a comfortable and stunning web experience. Every detail is designed to align with user needs and business goals.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#projects" className="btn-primary px-5 py-3 rounded-xl text-sm font-semibold interactive-cursor">See Projects</a>
            <a href="#contact" className="btn-ghost px-5 py-3 rounded-xl text-sm font-semibold interactive-cursor">Contact</a>
          </div>
                      <div className="mt-6 flex items-center gap-4 text-white/70 dark:text-white/70 text-slate-600">
            <a href="https://github.com/Andrejun1" target="_blank" rel="noreferrer" className="hover:text-white dark:hover:text-white hover:text-slate-800 interactive-cursor"><FaGithub size={22} /></a>
            <a href="https://lynk.id/andrejun" target="_blank" rel="noreferrer" className="hover:text-white dark:hover:text-white hover:text-slate-800 interactive-cursor"><FaLink size={22} /></a>
            <a href="mailto:junikayusuf11@gmail.com" className="hover:text-white dark:hover:text-white hover:text-slate-800 interactive-cursor"><FaEnvelope size={22} /></a>
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
      <p className="mt-3 text-white/80 dark:text-white/80 text-slate-700/80 max-w-2xl">A full stack developer who helps everyone enjoy increasingly advanced technology, making activities that were once manual easier, more automated, and simpler.</p>
      <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((it) => (
          <motion.div key={it.title} whileHover={{ y: -4 }} className="glass rounded-2xl p-5 flex flex-col h-[200px]">
            <div className="text-lg font-semibold flex-shrink-0">{it.title}</div>
            <div className="mt-2 text-white/70 dark:text-white/70 text-slate-600 text-sm flex-grow line-clamp-4">{it.desc}</div>
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
        <a href="#contact" className="text-sm text-white/70 dark:text-white/70 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-800">Request proyek →</a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <motion.div 
            key={p.name} 
            whileHover={{ y: -6 }} 
            className="group glass rounded-2xl p-5 flex flex-col h-[500px]"
          >
            <div className="h-48 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
              <img 
                src={p.image} 
                alt={p.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="mt-4 font-semibold text-lg flex-shrink-0">{p.name}</div>
            <div className="mt-2 text-sm text-white/70 dark:text-white/70 text-slate-600 flex-grow line-clamp-3">{p.desc}</div>
            <div className="mt-3 flex flex-wrap gap-2 flex-shrink-0">
              {p.tags.map(t => (
                <span key={t} className="px-2 py-1 rounded-md bg-white/5 dark:bg-white/5 bg-slate-100 border border-white/10 dark:border-white/10 border-slate-300 text-xs text-white/80 dark:text-white/80 text-slate-700">{t}</span>
              ))}
            </div>
            <div className="mt-4 flex gap-2 flex-shrink-0">
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
    { 
      name: 'React', 
      Icon: SiReact, 
      colors: ['#61dafb', '#20232a'], 
      float: 10, 
      rotate: 20,
      category: 'Frontend'
    },
    { 
      name: 'CSS', 
      Icon: SiCss3, 
      colors: ['#1572b6', '#33a9dc'], 
      float: 12, 
      rotate: -15,
      category: 'Styling'
    },
    { 
      name: 'Tailwind CSS', 
      Icon: SiTailwindcss, 
      colors: ['#38bdf8', '#0ea5e9'], 
      float: 9, 
      rotate: 10,
      category: 'Framework'
    },
    { 
      name: 'Dart', 
      Icon: SiDart, 
      colors: ['#0175c2', '#13b9fd'], 
      float: 14, 
      rotate: 25,
      category: 'Language'
    },
    { 
      name: 'Node.js', 
      Icon: SiNodedotjs, 
      colors: ['#339933', '#68cc00'], 
      float: 11, 
      rotate: -8,
      category: 'Backend'
    },
    { 
      name: 'JavaScript', 
      Icon: SiJavascript, 
      colors: ['#f7df1e', '#f0db4f'], 
      float: 8, 
      rotate: 18,
      category: 'Language'
    },
    { 
      name: 'MySQL', 
      Icon: SiMysql, 
      colors: ['#4479a1', '#f29111'], 
      float: 13, 
      rotate: -12,
      category: 'Database'
    },
    { 
      name: 'Python', 
      Icon: SiPython, 
      colors: ['#306998', '#ffd43b'], 
      float: 16, 
      rotate: 8,
      category: 'Language'
    },
  ];

  return (
    <Section id="skills">
      <div className="mb-8">
        <Badge color="green">Skills</Badge>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {skillOrbs.map(({ name, Icon, colors, float, rotate = 0, category }, index) => (
          <motion.div
            key={name}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100 
            }}
            whileHover={{ 
              scale: prefersReducedMotion ? 1.02 : 1.05, 
              y: prefersReducedMotion ? 0 : -5 
            }}
          >
            {/* Animated glow background */}
            <motion.div 
              className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
              style={{ 
                background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` 
              }}
              animate={prefersReducedMotion ? {} : {
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
                          {/* Main card */}
            <div className="relative glass h-full w-full rounded-2xl flex flex-col items-center justify-center p-4">
              
              {/* Neon canvas background */}
              <NeonCanvas 
                className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300" 
                density={prefersReducedMotion ? 0.2 : 0.7} 
                speed={prefersReducedMotion ? 0.1 : 0.3} 
              />
              
              {/* Floating skill icon */}
              <motion.div
                animate={prefersReducedMotion ? {} : { 
                  y: [0, -float, 0], 
                  rotate: rotate ? [0, rotate, 0] : 0 
                }}
                transition={{ 
                  duration: 3 + (float * 0.2), 
                  repeat: Infinity, 
                  ease: 'easeInOut',
                  delay: index * 0.2 
                }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Icon container with gradient background */}
                <motion.div 
                  className="p-3 sm:p-4 rounded-full border border-white/20 shadow-lg mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${colors[0]}15, ${colors[1]}15)`,
                    boxShadow: `0 8px 32px ${colors[0]}20`
                  }}
                  whileHover={{ 
                    scale: prefersReducedMotion ? 1 : 1.1,
                    boxShadow: `0 12px 40px ${colors[0]}40`
                  }}
                >
                  <Icon 
                    size={window.innerWidth < 640 ? 36 : 44} 
                    color={colors[0]}
                    className="drop-shadow-lg"
                  />
                </motion.div>
                
                {/* Skill name */}
                <div className="text-center">
                  <div 
                    className="text-sm sm:text-base font-semibold mb-1 transition-colors duration-300"
                    style={{ color: 'var(--text)' }}
                  >
                    {name}
                  </div>
                  <div 
                    className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: 'var(--text)', opacity: '0.7' }}
                  >
                    {category}
                  </div>
                </div>
              </motion.div>

              {/* Subtle inner glow */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${colors[0]}40, transparent 70%)`
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Optional: Skills summary */}
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
      </motion.div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact">
      <div className="mb-6 sm:mb-8">
        <Badge>Contact</Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Contact Form */}
        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 order-2 lg:order-1">
          <div 
            className="text-lg sm:text-xl font-semibold mb-4"
            style={{ color: 'var(--text)' }}
          >
            Send Message
          </div>
          
          <form 
            className="grid gap-3 sm:gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const name = e.target[0].value;
              const email = e.target[1].value;
              const message = e.target[2].value;
              
              if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
              }
              
              window.location.href = `mailto:junikayusuf11@gmail.com?subject=Message from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
            }}
          >
            <input 
              type="text"
              placeholder="Your Name" 
              required
              className="w-full rounded-lg px-3 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-all duration-300 focus:ring-2 focus:ring-[#ff2bb3]/50"
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--border)',
                color: 'var(--text)'
              }}
            />
            
            <input 
              type="email"
              placeholder="your.email@example.com" 
              required
              className="w-full rounded-lg px-3 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition-all duration-300 focus:ring-2 focus:ring-[#ff2bb3]/50"
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--border)',
                color: 'var(--text)'
              }}
            />
            
            <textarea 
              placeholder="Write your message here..." 
              rows="4"
              required
              className="w-full rounded-lg px-3 py-2.5 sm:py-3 text-sm sm:text-base outline-none resize-none transition-all duration-300 focus:ring-2 focus:ring-[#ff2bb3]/50"
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                minHeight: '100px'
              }}
            />
            
            <button 
              type="submit" 
              className="btn-primary rounded-xl px-4 py-2.5 sm:py-3 text-sm sm:text-base font-semibold w-full sm:w-auto justify-self-start hover:transform hover:scale-105 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 order-1 lg:order-2">
          <div 
            className="text-lg sm:text-xl font-semibold mb-4"
            style={{ color: 'var(--text)' }}
          >
            Let's Connect
          </div>
          
          <div 
            className="text-sm sm:text-base leading-relaxed mb-6"
            style={{ color: 'var(--text)', opacity: '0.8' }}
          >
            Open to freelance projects and collaborations. I specialize in mobile app development and currently sell applications through LYNK.ID. Let's discuss your project!
          </div>

          {/* Contact Methods */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#ff2bb3] to-[#7a2ff7] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  Email
                </div>
                <div 
                  className="text-xs"
                  style={{ color: 'var(--text)', opacity: '0.7' }}
                >
                  junikayusuf11@gmail.com
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#29ffe3] to-[#3b82f6] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  Lynk
                </div>
                <div 
                  className="text-xs"
                  style={{ color: 'var(--text)', opacity: '0.7' }}
                >
                  lynk.id/andrejun
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              className="btn-ghost px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium text-center hover:transform hover:scale-105 transition-all duration-300 flex-1 sm:flex-none" 
              href="mailto:junikayusuf11@gmail.com"
            >
              📧 Email Me
            </a>
            <a 
              className="btn-ghost px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium text-center hover:transform hover:scale-105 transition-all duration-300 flex-1 sm:flex-none" 
              href="https://lynk.id/andrejun" 
              target="_blank" 
              rel="noreferrer"
            >
              🔗 View Lynk
            </a>
          </div>

          {/* Response Time Info */}
          <div 
            className="mt-4 p-3 rounded-lg text-xs sm:text-sm text-center"
            style={{ 
              background: 'var(--glass)', 
              border: '1px solid var(--border)',
              color: 'var(--text)',
              opacity: '0.8'
            }}
          >
            ⚡ Usually responds within 24 hours
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="py-10 text-center text-white/60 dark:text-white/60 text-slate-500 text-sm">
      © {new Date().getFullYear()} Andre Junika Portfolio. Created with React + Tailwind.
    </footer>
  )
}

function AppContent() {
  const prefersReducedMotion = useReducedMotion()
  const { isDark } = useTheme()
  
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
      <MouseBackground />
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

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
