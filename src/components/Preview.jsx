import { useEffect, useRef, useState } from 'react'

export default function Preview({ project, onClose }) {
  const frameRef = useRef(null)
  const [blocked, setBlocked] = useState(false)
  const [key, setKey] = useState(0)
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [box, setBox] = useState({ w: 1920, h: 1080 })
  const [loading, setLoading] = useState(true)
  const [attempts, setAttempts] = useState(0)
  const [currentUrl, setCurrentUrl] = useState(project?.url)
  const FORCE_HTTP_HOST = 'portfolio.extroworld.com'

  useEffect(() => {
    setBlocked(false)
    setLoading(true)
    try {
      const u = new URL(project?.url)
      if (u.hostname === FORCE_HTTP_HOST) u.protocol = 'http:'
      setCurrentUrl(u.toString())
    } catch {
      setCurrentUrl(project?.url)
    }
    setKey(k => k + 1)
    setAttempts(0)
  }, [project?.url])

  useEffect(() => {
    const iframe = frameRef.current
    if (!iframe) return
    let resolved = false
    const timeout = setTimeout(() => {
      if (!resolved) {
        if (attempts < 1) {
          setAttempts(a => a + 1)
          // For specific host force HTTP and just retry once, no toggling
          try {
            const u = new URL(currentUrl)
            if (u.hostname === FORCE_HTTP_HOST) {
              u.protocol = 'http:'
              setCurrentUrl(u.toString())
              setKey(k => k + 1)
            } else {
              // Try alternate protocol (http <-> https)
              u.protocol = u.protocol === 'https:' ? 'http:' : 'https:'
              setCurrentUrl(u.toString())
            }
          } catch {
            setKey(k => k + 1)
          }
        } else {
          setBlocked(true)
          setLoading(false)
        }
      }
    }, 5000)
    const onLoad = () => {
      resolved = true
      clearTimeout(timeout)
      setBlocked(false)
      setLoading(false)
    }
    const onError = () => {
      resolved = true
      clearTimeout(timeout)
      if (attempts < 1) {
        setAttempts(a => a + 1)
        try {
          const u = new URL(currentUrl)
          if (u.hostname === FORCE_HTTP_HOST) {
            u.protocol = 'http:'
            setCurrentUrl(u.toString())
            setKey(k => k + 1)
          } else {
            u.protocol = u.protocol === 'https:' ? 'http:' : 'https:'
            setCurrentUrl(u.toString())
          }
        } catch {
          setKey(k => k + 1)
        }
      } else {
        setBlocked(true)
        setLoading(false)
      }
    }
    iframe.addEventListener('load', onLoad)
    iframe.addEventListener('error', onError)
    return () => {
      clearTimeout(timeout)
      iframe.removeEventListener('load', onLoad)
      iframe.removeEventListener('error', onError)
    }
  }, [key, attempts, currentUrl])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const compute = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      const s = Math.min(w / 1920, h / 1080)
      const finalScale = s > 1 ? 1 : s
      setScale(finalScale)
      setBox({ w: Math.floor(1920 * finalScale), h: Math.floor(1080 * finalScale) })
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    window.addEventListener('orientationchange', compute)
    window.addEventListener('resize', compute)
    return () => {
      ro.disconnect()
      window.removeEventListener('orientationchange', compute)
      window.removeEventListener('resize', compute)
    }
  }, [])

  const reload = () => { setLoading(true); setBlocked(false); setCurrentUrl(project?.url); setKey(k => k + 1); setAttempts(0) }

  return (
    <div className="h-[60vh] sm:h-[65vh] md:h-[76vh] relative crt">
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="px-2 py-1 border border-green-700/50 hover:bg-green-700/10">Open</a>
        <button onClick={reload} className="px-2 py-1 border border-green-700/50 hover:bg-green-700/10">Reload</button>
        <button onClick={onClose} className="px-2 py-1 border border-green-700/50 hover:bg-green-700/10">Close</button>
      </div>
      {project?.url?.includes('uctarna.fun') && (
        <div className="absolute top-2 left-2 z-10 text-xs sm:text-sm bg-black/70 border border-green-700/60 px-2 py-1">
          <div>email: <span className="text-green-300">test@test.cz</span></div>
          <div>heslo: <span className="text-green-300">test123</span></div>
        </div>
      )}
      {!blocked ? (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-auto">
          <div className="relative" style={{ width: box.w, height: box.h }}>
            <div className="absolute inset-0" style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
              <iframe key={key} ref={frameRef} src={currentUrl} title={project.name} className="w-[1920px] h-[1080px] bg-black" referrerPolicy="no-referrer" />
            </div>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="animate-spin h-8 w-8 border-2 border-green-500 border-t-transparent rounded-full" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-center gap-3">
          <div className="text-green-500">Preview not available — open in new tab</div>
          <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 border border-green-700/50 hover:bg-green-700/10">Open</a>
        </div>
      )}
    </div>
  )
}


