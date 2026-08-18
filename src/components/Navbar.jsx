import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const links = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
  { name: 'Resume', href: '/MajidRaza_Resume.pdf', external: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 60)
  })

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-[#050511]/80 border-b border-white/[0.07] shadow-xl shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="font-mono font-bold text-xl tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="gradient-text">{'<MR />'}</span>
          </motion.a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.35, duration: 0.5 }}
              >
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="relative text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 group"
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-sky-400 to-violet-400 group-hover:w-full transition-all duration-300 ease-out" />
                </a>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="#contact"
            className="hidden md:block btn-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Hire Me</span>
          </motion.a>

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden text-white/80 hover:text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="fixed top-16 left-0 right-0 z-40 backdrop-blur-xl bg-[#050511]/95 border-b border-white/[0.07] px-6 py-4 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => setMobileOpen(false)}
              className="flex items-center py-3.5 text-slate-300 hover:text-white border-b border-white/[0.07] last:border-0 text-sm font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block mt-4 text-center btn-primary"
          >
            <span>Hire Me</span>
          </a>
        </motion.div>
      )}
    </>
  )
}
