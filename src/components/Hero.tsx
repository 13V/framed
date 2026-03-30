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
  const logoY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100svh] overflow-hidden flex flex-col select-none"
      style={{ backgroundColor: '#0D0505' }}
    >
      {/* Radial warmth behind the logo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(92,10,20,0.22) 0%, transparent 65%)' }}
      />

      {/* HUD bar — top */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 sm:px-8 md:px-14 pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        style={{ zIndex: 10 }}
      >
        <div className="flex items-center gap-3">
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full bg-crimson"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-mono text-xs tracking-widest text-cream/25 uppercase">Rec</span>
          <span className="font-mono text-xs text-cream/15 ml-2">
            <Timecode />
          </span>
        </div>
        <span className="font-sans text-sm tracking-widest2 uppercase text-cream/20">
          Sydney, AU — 2026
        </span>
      </motion.div>

      {/* Centre — logo + wordmark */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-10"
        style={{ opacity, willChange: 'opacity' }}
      >
        {/* Logo mark */}
        <motion.div
          style={{ y: logoY, willChange: 'transform' }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.645, 0.045, 0.355, 1] }}
        >
          <div className="relative border border-crimson/25 p-1.5">
            <div
              className="border border-crimson/12 flex items-center justify-center"
              style={{ width: 'clamp(140px, 22vw, 240px)', height: 'clamp(140px, 22vw, 240px)' }}
            >
              <img
                src="/framed-logo.jpg"
                alt="Framed"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-crimson/50" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-crimson/50" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-crimson/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-crimson/50" />
          </div>
        </motion.div>

        {/* Wordmark */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
        >
          <h1
            className="font-display text-cream font-light tracking-widest3 uppercase"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', letterSpacing: '0.45em' }}
          >
            Framed
          </h1>
          <p className="font-sans text-sm text-cream/30 tracking-widest mt-3">
            Cinematographers · Surry Hills · Since 2019
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — bottom */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <span className="font-sans text-sm tracking-widest uppercase text-cream/20">Scroll</span>
        <motion.div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(245,239,224,0.2), transparent)', transformOrigin: 'top' }}
          animate={{ scaleY: [1, 0.25, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
