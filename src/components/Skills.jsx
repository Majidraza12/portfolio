import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCode, FaBrain, FaGlobe, FaTools } from 'react-icons/fa'

const categories = [
  {
    title: 'Languages',
    icon: FaCode,
    accent: '#38bdf8',
    accentBg: 'rgba(56,189,248,0.08)',
    accentBorder: 'rgba(56,189,248,0.25)',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Rust', 'Java', 'C/C++', 'SQL'],
  },
  {
    title: 'AI / Machine Learning',
    icon: FaBrain,
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.08)',
    accentBorder: 'rgba(167,139,250,0.25)',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas', 'Whisper', 'CNN / LSTM', 'Claude API', 'RAG', 'Matplotlib', 'Seaborn'],
  },
  {
    title: 'Frameworks & Backend',
    icon: FaGlobe,
    accent: '#22d3ee',
    accentBg: 'rgba(34,211,238,0.08)',
    accentBorder: 'rgba(34,211,238,0.25)',
    skills: ['Next.js', 'React', 'Svelte', 'Tauri', 'Node.js', 'Express.js', 'FastAPI', 'Spring Boot', 'Supabase', 'Tailwind CSS'],
  },
  {
    title: 'Tools & Platforms',
    icon: FaTools,
    accent: '#f472b6',
    accentBg: 'rgba(244,114,182,0.08)',
    accentBorder: 'rgba(244,114,182,0.25)',
    skills: ['Git', 'GitHub Actions', 'Docker', 'Vercel', 'AWS', 'Redis', 'Judge0', 'Stripe', 'Vulkan', 'Streamlit', 'Postman', 'VS Code', 'Cursor', 'Claude Code'],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

function SkillCard({ category }) {
  const { title, icon: Icon, accent, accentBg, accentBorder, skills } = category

  return (
    <motion.div
      variants={cardVariants}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
      }}
      whileHover={{
        y: -4,
        borderColor: accentBorder,
        boxShadow: `0 0 40px ${accentBg}`,
        transition: { duration: 0.25 },
      }}
    >
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
          >
            <Icon size={16} style={{ color: accent }} />
          </div>
          <h3 className="font-semibold text-white text-sm">{title}</h3>
        </div>

        <motion.div
          className="flex flex-wrap gap-2"
          variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              className="skill-chip"
              variants={chipVariants}
              whileHover={{ scale: 1.07, color: accent, borderColor: accent }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-28 px-6 bg-[#050511] overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-700/5 blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag">
            <span className="font-mono">//</span> skills & tools
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Languages, frameworks, and tools I use to build scalable systems and intelligent applications.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {categories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
