import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const projects = [
  {
    title: 'Scribbet',
    tagline: 'Local-first Windows dictation — fully on-device',
    description:
      'Windows dictation app in Rust (10-crate workspace, Tauri + Svelte) transcribing speech entirely on-device via Whisper (whisper.cpp) — no cloud, no account. A Vulkan GPU backend falls back to CPU at runtime. Benchmarked at 183 ms p50 latency, 6.7x faster than the CPU fallback on identical hardware. Ships NSIS/MSI installers with checksums, provenance attestation, and a version guard.',
    stack: ['Rust', 'Tauri', 'Svelte', 'Whisper', 'Vulkan', 'GitHub Actions'],
    accent: '#38bdf8',
    accentBg: 'rgba(56,189,248,0.08)',
    gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    category: 'Rust / Systems',
    github: 'https://github.com/Majidraza12/Scribbet',
    live: 'https://scribbet.vercel.app/',
    date: 'Jun 2026 – Aug 2026',
  },
  {
    title: 'Algomaxx',
    tagline: 'DSA practice SaaS with an AI coach',
    description:
      'Full-stack DSA practice platform on Next.js and Supabase (Postgres/Auth/RLS) with Stripe billing, a 150-problem bank, timed focus mode, curated tracks, and a Claude-powered coach with weak-pattern analysis — backed by 208 tests. Grading runs on sandboxed Judge0 execution with layered checkers for linked-list, graph, and tree problems.',
    stack: ['Next.js', 'React', 'Supabase', 'Judge0', 'Stripe', 'Claude API'],
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.08)',
    gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    category: 'Full-Stack SaaS',
    github: 'https://github.com/Majidraza12/Algomaxx',
    live: null,
    date: 'Jun 2026 – Aug 2026',
  },
  {
    title: 'Video Violence Detection',
    tagline: 'CNN-LSTM classifier for video streams',
    description:
      'End-to-end CNN-LSTM video classifier — per-frame ResNet-18 feature extraction feeding an LSTM over 16 frames — reaching 89% accuracy and 0.92 F1 on the violent class, shipped as a Streamlit app and CLI. Built with stratified splits, inverse-frequency weighted loss for a 2:1 imbalance, and fixed-seed reproducibility across all RNGs.',
    stack: ['Python', 'PyTorch', 'ResNet-18', 'LSTM', 'Streamlit'],
    accent: '#22d3ee',
    accentBg: 'rgba(34,211,238,0.08)',
    gradient: 'linear-gradient(135deg, #0891b2, #0e7490)',
    category: 'AI / ML',
    github: 'https://github.com/Majidraza12/incident-detection-project',
    live: null,
    date: 'Jul 2026 – Aug 2026',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

function ProjectCard({ project }) {
  const { title, tagline, description, stack, accent, accentBg, gradient, category, github, live, date } = project

  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
      }}
      whileHover={{
        y: -6,
        borderColor: `${accent}40`,
        boxShadow: `0 20px 60px ${accentBg}, 0 0 0 1px ${accent}20`,
        transition: { duration: 0.28 },
      }}
    >
      <div className="relative h-1.5" style={{ background: gradient }} />

      <div className="flex items-center justify-between px-5 pt-5 pb-0">
        <span
          className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full"
          style={{ color: accent, background: accentBg, border: `1px solid ${accent}30` }}
        >
          {category}
        </span>
        <span className="text-xs text-slate-600 font-mono">{date}</span>
      </div>

      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <p className="text-xs font-medium" style={{ color: accent }}>{tagline}</p>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed flex-1">{description}</p>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-slate-400"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-white/[0.07] mt-1">
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <FaGithub size={14} />
            View on GitHub
          </motion.a>
          {live && (
            <>
              <span className="text-white/10">·</span>
              <motion.a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs transition-colors"
                style={{ color: accent }}
                whileHover={{ scale: 1.05 }}
              >
                <FaExternalLinkAlt size={11} />
                Live Demo
              </motion.a>
            </>
          )}
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(ellipse at top, ${accentBg} 0%, transparent 70%)` }}
      />
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="projects"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080820 0%, #050511 100%)' }}
    >
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 rounded-full bg-violet-700/6 blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <span className="section-tag">
            <span className="font-mono">//</span> my work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A selection of things I've built — from systems programming in Rust to full-stack SaaS and deep-learning pipelines.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a
            href="https://github.com/Majidraza12"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <FaGithub size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
