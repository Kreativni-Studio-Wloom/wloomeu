import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects as baseProjects } from './data/projects'
import Loading from './components/Loading'
import FileTree from './components/FileTree'
import Preview from './components/Preview'
import Contact from './components/Contact'
import About from './components/About'
import Inquiry from './components/Inquiry'
import Footer from './components/Footer'

const CONTACT_NODE = {
  id: 'contact',
  name: 'Contact',
  type: 'contact',
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [muted, setMuted] = useState(false)
  const audioClickRef = useRef(null)

  const items = useMemo(() => {
    const projNodes = baseProjects.map(p => ({ ...p, type: 'project' }))
    const about = { id: 'about', name: 'O nás', type: 'about' }
    const inquiry = { id: 'inquiry', name: 'Poslat poptávku', type: 'inquiry' }
    return [CONTACT_NODE, about, inquiry, ...projNodes]
  }, [])

  const handleSelect = (node) => {
    setSelected(node)
    if (!muted) {
      if (audioClickRef.current?.play) {
        try { audioClickRef.current.currentTime = 0; audioClickRef.current.play() } catch {}
      } else if (window.AudioContext || window.webkitAudioContext) {
        try {
          const Ctx = window.AudioContext || window.webkitAudioContext
          const ctx = new Ctx()
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'square'
          osc.frequency.value = 880
          gain.gain.setValueAtTime(0.02, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06)
          osc.connect(gain).connect(ctx.destination)
          osc.start()
          osc.stop(ctx.currentTime + 0.06)
        } catch {}
      }
    }
    if (window.innerWidth < 768) setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono selection:bg-green-400 selection:text-black">
      <audio ref={audioClickRef} src="/click.mp3" preload="auto" />
      <AnimatePresence>
        {isLoading && (
          <motion.div className="fixed inset-0 z-50" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Loading onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`${isLoading ? 'blur-sm brightness-75' : ''} transition-all duration-500`}>
      <header className="border-b border-green-700/40 bg-black/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden px-2 py-1 border border-green-700/50 hover:bg-green-700/10" onClick={() => setSidebarOpen(v => !v)}>≡</button>
            <span className="text-lg">Wloom</span>
            <span className="text-green-600">—</span>
            <a href="https://wloom.eu" target="_blank" rel="noopener noreferrer" className="underline">wloom.eu</a>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="mailto:info@wloom.eu" className="hover:underline">info@wloom.eu</a>
            <a href="tel:+420606020284" className="hover:underline">+420 606 020 284</a>
            <a href="tel:+420601233000" className="hover:underline">+420 601 233 000</a>
            <div className="w-px h-5 bg-green-700/50" />
            <button onClick={() => setMuted(m => !m)} className="px-2 py-1 border border-green-700/50 hover:bg-green-700/10">{muted ? '🔇' : '🔊'}</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4 py-3 md:py-4 grid md:grid-cols-[35%_65%] gap-3 md:gap-4">
        <motion.aside layout className={`border border-green-700/40 ${sidebarOpen ? 'block' : 'hidden md:block'} max-h-[40vh] md:max-h-none overflow-auto`}>
          <FileTree items={items} selectedId={selected?.id ?? null} onSelect={handleSelect} />
        </motion.aside>
        <section className="relative border border-green-700/40 min-h-[50vh]">
          {!selected ? (
            <div className="h-full flex items-center justify-center text-green-600">Vyber položku vlevo…<span className="animate-blink">_</span></div>
          ) : selected.type === 'contact' ? (
            <Contact />
          ) : selected.type === 'about' ? (
            <About />
          ) : selected.type === 'inquiry' ? (
            <Inquiry />
          ) : (
            <Preview project={selected} onClose={() => setSelected(null)} />
          )}
          <div className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(61,252,106,0.05)_3px,rgba(61,252,106,0.05)_4px)]" />
        </section>
      </main>

      <Footer />
      </div>
    </div>
  )
}


