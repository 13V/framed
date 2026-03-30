import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Timecode() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let frames = 0
    const pad = (n: number) => String(n).padStart(2, '0')
    const id = setInterval(() => {
      frames++
      if (ref.current) {
        const ff = frames % 24
        const ss = Math.floor(frames / 24) % 60
        const mm = Math.floor(frames / (24 * 60)) % 60
        const hh = Math.floor(frames / (24 * 3600))
        ref.current.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`
      }
    }, 1000 / 24)
    return () => clearInterval(id)
  }, [])
  return <span ref={ref} className="tabular-nums">00:00:00:00</span>
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100svh] overflow-hidden flex flex-col items-center justify-center select-none"
      style={{ backgroundColor: '#0D0505' }}
    >
      {/* Soft crimson glow behind the mark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 48%, rgba(75,5,7,0.28) 0%, transparent 60%)' }}
      />

      {/* HUD — top */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 sm:px-8 md:px-14 pt-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <div className="flex items-center gap-3">
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full bg-crimson"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-mono text-xs tracking-widest text-cream/20 uppercase">Rec</span>
          <span className="font-mono text-xs text-cream/12 ml-2" style={{ color: 'rgba(245,239,224,0.12)' }}>
            <Timecode />
          </span>
        </div>
        <span className="font-sans text-sm tracking-widest2 uppercase text-cream/18" style={{ color: 'rgba(245,239,224,0.18)' }}>
          Sydney, AU — 2026
        </span>
      </motion.div>

      {/* The mark */}
      <motion.div
        className="flex flex-col items-center gap-6 z-10"
        style={{ opacity, y, willChange: 'opacity, transform' }}
      >
        <motion.img
          src="/framed-logo-cream.png"
          alt="Framed"
          style={{ width: 'clamp(180px, 32vw, 420px)', height: 'auto' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
        />
      </motion.div>

      {/* Scroll */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span className="font-sans text-sm tracking-widest uppercase" style={{ color: 'rgba(245,239,224,0.2)' }}>Scroll</span>
        <motion.div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(245,239,224,0.18), transparent)', transformOrigin: 'top' }}
          animate={{ scaleY: [1, 0.25, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
