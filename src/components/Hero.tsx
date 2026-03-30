import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Writes directly to the DOM — zero React re-renders at 24fps
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

const services = ['Brand Film', 'Campaign', 'Hospitality', 'Product', 'Property']

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} id="hero" className="relative h-[100svh] overflow-hidden bg-cream flex flex-col select-none">

      {/* Subtle warm vignette — bottom edge only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 110%, rgba(92,10,20,0.07) 0%, transparent 60%)' }}
      />

      {/* Grain texture — tuned for light background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(13,5,5,0.018) 3px, rgba(13,5,5,0.018) 4px)',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col h-full"
        style={{ opacity, willChange: 'opacity' }}
      >
        {/* ── TOP HUD BAR ── */}
        <motion.div
          className="flex items-center justify-between px-5 sm:px-8 md:px-14 pt-20 md:pt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full bg-crimson"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono text-xs tracking-widest text-ink/35 uppercase">Rec</span>
            <span className="font-mono text-xs text-ink/20 ml-2">
              <Timecode />
            </span>
          </div>
          <span className="font-sans text-sm tracking-widest2 uppercase text-ink/25">
            Sydney, AU — 2026
          </span>
        </motion.div>

        {/* ── MAIN TITLE REVEAL ── */}
        <motion.div
          className="flex-1 flex items-center overflow-hidden px-4 sm:px-6 md:px-10"
          style={{ y: titleY, willChange: 'transform' }}
        >
          <motion.div
            className="w-full overflow-hidden"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.5, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1
              className="font-display leading-none w-full"
              style={{
                fontSize: 'clamp(3.2rem, 19.5vw, 17rem)',
                fontWeight: 300,
                letterSpacing: '0.16em',
                marginTop: '-0.06em',
                color: '#5C0A14',
              }}
            >
              FRAMED
            </h1>
          </motion.div>
        </motion.div>

        {/* ── LOWER EDITORIAL FOOTER ── */}
        <motion.div
          className="px-5 sm:px-8 md:px-14 pb-8 md:pb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.645, 0.045, 0.355, 1] }}
        >
          <div className="h-px w-full mb-7" style={{ background: 'rgba(13,5,5,0.08)' }} />

          <div className="flex items-end justify-between gap-4">
            <p className="font-sans text-sm text-ink/40 leading-loose tracking-wide flex-shrink-0">
              Cinematographers working out of<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Surry Hills since 2019.
            </p>

            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {services.map((s, i) => (
                <div key={s} className="flex items-center gap-1">
                  <span className="font-sans text-sm uppercase tracking-widest" style={{ color: 'rgba(13,5,5,0.22)' }}>
                    {s}
                  </span>
                  {i < services.length - 1 && (
                    <span className="mx-1" style={{ color: 'rgba(92,10,20,0.25)', fontSize: '0.5rem' }}>◆</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="font-sans text-sm tracking-widest uppercase text-ink/30">Scroll</span>
              <motion.div
                className="w-px h-8"
                style={{ background: 'linear-gradient(to bottom, rgba(13,5,5,0.25), transparent)', transformOrigin: 'top' }}
                animate={{ scaleY: [1, 0.25, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}
