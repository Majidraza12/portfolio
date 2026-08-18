import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiArrowDown, HiDocumentText } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const WORDS = ['Software Engineer', 'AI/ML Developer', 'Full-Stack Dev', 'CS @ IIT Chicago']

function useTypewriter(words) {
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let delay

    if (!deleting) {
      if (charIdx < word.length) {
        delay = setTimeout(() => setCharIdx((c) => c + 1), 95)
      } else {
        delay = setTimeout(() => setDeleting(true), 2400)
      }
    } else {
      if (charIdx > 0) {
        delay = setTimeout(() => setCharIdx((c) => c - 1), 48)
      } else {
        setDeleting(false)
        setWordIdx((i) => (i + 1) % words.length)
      }
    }

    return () => clearTimeout(delay)
  }, [charIdx, deleting, wordIdx, words])

  return words[wordIdx].slice(0, charIdx)
}

// Deterministic pseudo-random particles — stable across renders
const PARTICLES = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  left: `${((i * 37 + 11) % 97) + 1}%`,
  top: `${((i * 61 + 7) % 93) + 2}%`,
  size: (i % 3) + 1,
  opacity: 0.08 + ((i % 6) * 0.06),
  duration: 5 + (i % 7),
  delay: (i % 9) * 0.4,
}))

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const displayText = useTypewriter(WORDS)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 dot-grid" />

      {/* Radial center glow */}
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/20 via-transparent to-transparent" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-[15%] w-80 h-80 rounded-full bg-violet-600/14 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 50, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-[12%] w-96 h-96 rounded-full bg-sky-600/12 blur-3xl"
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -25, 0], scale: [1, 0.94, 1.06, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-2/3 left-1/3 w-64 h-64 rounded-full bg-cyan-500/8 blur-3xl"
        animate={{ x: [0, 25, -35, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-sky-400"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{ y: [0, -18, 0], opacity: [p.opacity, p.opacity * 3, p.opacity] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tag */}
        <motion.div variants={itemVariants}>
          <span className="section-tag">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for internships & projects
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-4"
        >
          <span className="text-white">Majid </span>
          <span className="gradient-text">Raza</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-light mb-6 h-10"
        >
          <span className="text-slate-400">I'm a </span>
          <span className="font-mono font-semibold text-sky-400">
            {displayText}
            <span className="cursor-blink text-sky-300">|</span>
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          CS student at{' '}
          <span className="text-sky-400 font-medium">Illinois Institute of Technology</span>{' '}
          (Minor in AI) — building local-first Rust apps, deep-learning pipelines, and full-stack products.
          Previously at JP Morgan Chase & Wells Fargo.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap mb-14">
          <motion.a
            href="#projects"
            className="btn-primary"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>View My Work</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-ghost"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Get In Touch
          </motion.a>
          <motion.a
            href="/MajidRaza_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <HiDocumentText size={16} />
            Resume
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex gap-5 justify-center mb-16">
          {[
            { icon: FaGithub, href: 'https://github.com/Majidraza12', label: 'GitHub' },
            { icon: FaLinkedin, href: 'https://linkedin.com/in/majid-raza', label: 'LinkedIn' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-slate-500 hover:text-sky-400 transition-colors duration-200"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-sky-400 transition-colors"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiArrowDown size={22} />
        </motion.div>
      </motion.a>
    </section>
  )
}
