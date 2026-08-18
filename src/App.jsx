import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Archive from './components/Archive'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="bg-[#050511] min-h-screen text-slate-100 font-sans">
      <Navbar />
      <Hero />
      <Projects />
      <Archive />
      <Skills />
      <About />
      <Contact />
    </div>
  )
}
