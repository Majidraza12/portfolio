import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail, HiPaperAirplane } from 'react-icons/hi'

const socials = [
  { icon: FaGithub, href: 'https://github.com/Majidraza12', label: 'GitHub', color: '#fff' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/majid-raza', label: 'LinkedIn', color: '#0ea5e9' },
  { icon: HiMail, href: 'mailto:majidraza.bss@gmail.com', label: 'Email', color: '#a78bfa' },
]

function InputField({ label, type = 'text', id, placeholder, multiline = false }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:ring-2 resize-none transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(56,189,248,0.45)'
            e.target.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.08)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.10)'
            e.target.style.boxShadow = 'none'
          }}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(56,189,248,0.45)'
            e.target.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.08)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.10)'
            e.target.style.boxShadow = 'none'
          }}
        />
      )}
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section
      id="contact"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050511 0%, #080820 100%)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 dot-grid opacity-40" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-violet-700/6 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div ref={ref} className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <span className="section-tag">
            <span className="font-mono">//</span> contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Build Something</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Have an idea, a project, or just want to chat AI? I'm always open to interesting
            conversations and collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left info panel */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Info card */}
            <div
              className="rounded-2xl p-6 flex-1"
              style={{
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h3 className="font-semibold text-white mb-2">Get in touch</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Whether it's a research collaboration, an internship opportunity, or a side
                project — I'd love to hear from you. Usually respond within 24 hours.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <HiMail className="text-sky-400 shrink-0" size={16} />
                  <span className="text-slate-300 font-mono text-xs">majidraza.bss@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-4 h-4 flex items-center justify-center text-green-400 shrink-0">⏱</span>
                  <span className="text-slate-400 text-xs">Response time: &lt; 24h</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3 mt-6 pt-5 border-t border-white/[0.07]">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                    whileHover={{ scale: 1.15, color, borderColor: color + '60', y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              className="rounded-2xl p-4 flex items-center gap-3"
              style={{
                background: 'rgba(74,222,128,0.05)',
                border: '1px solid rgba(74,222,128,0.2)',
              }}
              animate={{ boxShadow: ['0 0 0px rgba(74,222,128,0)', '0 0 20px rgba(74,222,128,0.08)', '0 0 0px rgba(74,222,128,0)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-400">Available for opportunities</p>
                <p className="text-xs text-slate-500 mt-0.5">Internships · Research · Projects</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-6 sm:p-8 space-y-5"
              style={{
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Name" id="name" placeholder="Your name" />
                <InputField label="Email" type="email" id="email" placeholder="you@example.com" />
              </div>

              <InputField label="Subject" id="subject" placeholder="What's this about?" />

              <InputField
                label="Message"
                id="message"
                placeholder="Tell me about your project, idea, or question..."
                multiline
              />

              <motion.button
                type="submit"
                className="w-full btn-primary justify-center py-3.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  {sent ? (
                    <>
                      <span>Message Sent!</span>
                      <span>🎉</span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <HiPaperAirplane size={16} className="rotate-90" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-20 pt-8 border-t border-white/[0.07]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-slate-500 text-sm">
            Designed & built by{' '}
            <span className="gradient-text font-medium">Majid Raza</span> · 2025
          </p>
          <p className="text-slate-600 text-xs mt-1 font-mono">
            React · Framer Motion · Tailwind CSS
          </p>
        </motion.div>
      </div>
    </section>
  )
}
