import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiAcademicCap, HiLocationMarker, HiCode } from 'react-icons/hi'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const stats = [
  { value: '10+', label: 'Projects Built' },
  { value: '7', label: 'Languages' },
  { value: '40+', label: 'Technologies' },
  { value: '2027', label: 'Grad Year' },
]

const badges = [
  { icon: HiAcademicCap, text: 'Illinois Institute of Technology' },
  { icon: HiLocationMarker, text: 'Chicago, IL' },
  { icon: HiCode, text: 'BS Computer Science, May 2027' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050511 0%, #080820 50%, #050511 100%)' }}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-violet-600/8 blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-sky-600/8 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: photo + badges */}
          <motion.div
            className="flex flex-col items-center lg:items-start gap-6"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0}
          >
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl p-[2px] avatar-ring">
                <div className="w-full h-full rounded-2xl bg-[#0a0a1f] flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                  <span className="text-5xl font-extrabold gradient-text">MR</span>
                  <span className="text-xs text-slate-500 font-mono">photo coming soon</span>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1.5 py-2 text-xs font-medium"
                    style={{
                      background: 'rgba(74, 222, 128, 0.12)',
                      borderTop: '1px solid rgba(74, 222, 128, 0.25)',
                      color: '#4ade80',
                    }}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Open to Work
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 w-full max-w-xs">
              {badges.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 * i + 0.3, duration: 0.5 }}
                >
                  <Icon className="text-sky-400 shrink-0" size={16} />
                  <span className="text-sm text-slate-300">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: bio */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0.2}
          >
            <span className="section-tag">
              <span className="font-mono">//</span> about me
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Building <span className="gradient-text">scalable</span> systems &{' '}
              <span className="gradient-text">intelligent</span> apps
            </h2>

            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Hey! I'm Majid, a Computer Science student at{' '}
                <span className="text-sky-400 font-medium">Illinois Institute of Technology</span>.
                Most of what I know came from building things that had to actually work, then
                finding out where they broke.
              </p>
              <p>
                I wrote <span className="text-sky-400 font-medium">Scribbet</span>, a Windows
                dictation app in Rust that runs Whisper entirely on your own GPU. It transcribes at{' '}
                <span className="text-white font-medium">183 ms p50</span>, roughly{' '}
                <span className="text-white font-medium">6.7x faster</span> than the CPU path on
                the same machine.
              </p>
              <p>
                <span className="text-violet-400 font-medium">Algomaxx</span> is a DSA practice
                platform running sandboxed code execution and Stripe billing, with 208 tests
                holding it together. The{' '}
                <span className="text-violet-400 font-medium">FragPunk Draft Tool</span> runs live
                drafts for league matches and has real people using it right now.
              </p>
              <p>
                I've also led a team at JP Morgan Chase building a budget dashboard for students,
                from scoping through delivery. What I care about most is the unglamorous part:
                benchmarks that survive scrutiny, tests that catch real bugs, and pipelines that
                ship.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-10">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  className="glass rounded-xl p-4 text-center glass-hover"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.1 * i + 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-2xl font-bold gradient-text">{value}</div>
                  <div className="text-xs text-slate-500 mt-1">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
