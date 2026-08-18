import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const archive = [
  {
    title: 'FragPunk Draft Tool',
    blurb:
      'Real-time BO3/BO5 league draft room — map bans and picks, side selection, and lancer bans synced live between both captains over Supabase Realtime, with spectator mode and Discord export. In active use for league matches.',
    stack: ['Next.js', 'TypeScript', 'Supabase Realtime', 'Playwright'],
    github: null,
    live: 'https://frag-punk-draft.vercel.app',
    year: '2026',
  },
  {
    title: 'Rate Limiter Service',
    blurb:
      'Spring Boot rate limiting service with pluggable Token Bucket and Sliding Window strategies behind a config-driven strategy interface, exposed over REST.',
    stack: ['Java', 'Spring Boot', 'Maven'],
    github: 'https://github.com/Majidraza12/ratelimiter',
    live: null,
    year: '2026',
  },
  {
    title: 'Rent Prediction Model',
    blurb:
      'End-to-end rent forecasting — data cleaning and model training in a Jupyter notebook, served through a Python API behind a Next.js frontend.',
    stack: ['Python', 'TypeScript', 'Next.js', 'Jupyter'],
    github: 'https://github.com/Majidraza12/rent-prediction-model',
    live: null,
    year: '2025',
  },
  {
    title: 'Orbitize',
    blurb:
      'Project management app — create projects, add and assign tasks, commit changes for collaboration, with email notifications on key events.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'ShadCN UI'],
    github: 'https://github.com/Majidraza12/Orbitize',
    live: null,
    year: '2025',
  },
  {
    title: 'Pomofy',
    blurb:
      'Full-stack Pomodoro timer — Express and MongoDB backend with JWT auth, session tracking, and Cloudinary uploads, paired with a Vite React client.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/Majidraza12/pomofy',
    live: null,
    year: '2025',
  },
  {
    title: 'ChatMate',
    blurb:
      'Real-time messaging platform over Socket.IO with JWT authentication, private and group chats, and media sharing.',
    stack: ['React', 'Node.js', 'Socket.IO', 'MongoDB'],
    github: 'https://github.com/Majidraza12/ChatMate',
    live: null,
    year: '2025',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function ArchiveCard({ item }) {
  const { title, blurb, stack, github, live, year } = item

  return (
    <motion.div
      variants={rowVariants}
      className="group relative rounded-xl p-5 flex flex-col gap-3"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      whileHover={{
        y: -3,
        borderColor: 'rgba(148,163,184,0.28)',
        background: 'rgba(255,255,255,0.045)',
        transition: { duration: 0.22 },
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors">
          {title}
        </h3>
        <span className="text-xs text-slate-600 font-mono shrink-0 pt-0.5">{year}</span>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed flex-1">{blurb}</p>

      <div className="flex flex-wrap gap-1.5">
        {stack.map((tech) => (
          <span
            key={tech}
            className="text-[11px] px-2 py-0.5 rounded-full border border-white/[0.08] text-slate-500"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-1">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-400 transition-colors"
          >
            <FaGithub size={13} />
            Source
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-400 transition-colors"
          >
            <FaExternalLinkAlt size={10} />
            Live
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Archive() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="archive" className="relative py-24 px-6 bg-[#050511] overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <span className="font-mono">//</span> the archive
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Everything <span className="gradient-text">Else</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm">
            Older builds and side projects — kept here because they're still mine, and the
            learning curve is part of the story.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {archive.map((item) => (
            <ArchiveCard key={item.title} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
