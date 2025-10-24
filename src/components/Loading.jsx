import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
  'Hacking website…',
  'Booting kernel modules…',
  'Accessing secure server…',
  'Decrypting payload…',
  'Establishing tunnel…',
  'ACCESS GRANTED',
]

export default function Loading({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)
  const [showGranted, setShowGranted] = useState(false)

  useEffect(() => {
    const total = 100
    const interval = setInterval(() => {
      setProgress(p => {
        const next = Math.min(total, p + Math.floor(Math.random() * 6) + 1)
        return next
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setShowGranted(true)
      const t = setTimeout(() => onComplete?.(), 900)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setLineIdx(i => Math.min(steps.length - 1, i + 1)), 500)
    return () => clearTimeout(t)
  }, [progress, onComplete])

  return (
    <div className="absolute inset-0 bg-black text-green-400 flex items-center justify-center">
      <div className="w-full max-w-xl px-6">
        <div className="mb-6 space-y-1">
          {steps.slice(0, lineIdx + 1).map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-green-600">$</span>
              <span>{t}</span>
              {i === lineIdx && <span className="animate-blink">_</span>}
            </div>
          ))}
        </div>
        <div className="h-2 w-full bg-green-900/30 overflow-hidden border border-green-700/50">
          <motion.div
            className="h-full bg-green-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
          />
        </div>
        <div className="mt-2 text-right text-sm text-green-500">{progress}%</div>
      </div>
      {showGranted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="border border-green-700/60 bg-black px-6 py-4 shadow-[0_0_30px_rgba(61,252,106,0.15)]">
            <div className="text-center text-2xl tracking-widest">ACCESS GRANTED</div>
          </div>
        </div>
      )}
    </div>
  )
}


