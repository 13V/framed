import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Live 24fps timecode counter — signals the craft, not decoration
function Timecode() {
  const [frames, setFrames] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setFrames(f => f + 1), 1000 / 24)
    return () => clearInterval(id)
  }, [])
  const pad = (n: number) => String(n).padStart(2, '0')
  const ff = frames % 24
  const ss = Math.floor(frames / 24) % 60
  const mm = Math.floor(frames / (24 * 60)) % 60
  const hh = Math.floor(frames / (24 * 3600))
  return <>{pad(hh)}:{pad(mm)}:{pad(ss)}:{pad(ff)}</>
}

const services = ['Brand Film', 'Campaign', 'Hospitality', 'Product', 'Property']

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} id="hero" className="relative h-[100svh] overflow-hidden bg-ink flex flex-col select-none">

      {/* Radial crimson atmosphere — bottom-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 15% 90%, rgba(92,10,20,0.35) 0%, transparent 55%)' }}
      />

      {/* Subtle horizontal scan lines — film texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(245,239,224,0.012) 3px, rgba(245,239,224,0.012) 4px)',
        }}
      />

      <motion.div className="relative z-10 flex flex-col h-full" style={{ opacity }}>

        {/* ── TOP HUD BAR ───────────────────────────────────────── */}
        <motion.div
          className="flex items-center justify-between px-5 sm:px-8 md:px-14 pt-20 md:pt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
        >
          {/* REC + timecode */}
          <div className="flex items-center gap-3">
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full bg-crimson"
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono text-xs tracking-widest text-cream/25 uppercase">Rec</span>
            <span className="font-mono text-xs text-cream/15 ml-2 tabular-nums">
              <Timecode />
            </span>
          </div>

          {/* Location tag */}
          <span className="font-sans text-xs tracking-widest2 uppercase text-cream/20">
            Sydney, AU — 2026
          </span>
        </motion.div>

        {/* ── MAIN TITLE REVEAL ─────────────────────────────────── */}
        <motion.div
          className="flex-1 flex items-center overflow-hidden px-4 sm:px-6 md:px-10"
          style={{ y: titleY }}
        >
          {/* Wipe-reveal container */}
          <motion.div
            className="w-full overflow-hidden"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.5, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1
              className="font-display text-cream leading-none w-full"
              style={{
                fontSize: 'clamp(3.2rem, 19.5vw, 17rem)',
                fontWeight: 300,
                letterSpacing: '0.16em',
                marginTop: '-0.06em',
              }}
            >
              FRAMED
            </h1>
          </motion.div>
        </motion.div>

        {/* ── LOWER EDITORIAL FOOTER ────────────────────────────── */}
        <motion.div
          className="px-5 sm:px-8 md:px-14 pb-8 md:pb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.645, 0.045, 0.355, 1] }}
        >
          {/* Rule */}
          <div className="h-px w-full mb-7" style={{ background: 'rgba(245,239,224,0.08)' }} />

          <div className="flex items-end justify-between gap-4">

            {/* Tagline — left */}
            <p className="font-sans text-xs text-cream/30 leading-loose tracking-wide flex-shrink-0">
              Cinematographers working out of<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Surry Hills since 2019.
            </p>

            {/* Service labels — center (desktop only) */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {services.map((s, i) => (
                <div key={s} className="flex items-center gap-1">
                  <span className="font-sans text-xs uppercase tracking-widest"
                        style={{ color: 'rgba(245,239,224,0.18)' }}>
                    {s}
                  </span>
                  {i < services.length - 1 && (
                    <span className="mx-1" style={{ color: 'rgba(92,10,20,0.3)', fontSize: '0.5rem' }}>◆</span>
                  )}
                </div>
              ))}
            </div>

            {/* Scroll — right */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="font-sans text-xs tracking-widest uppercase text-cream/20">Scroll</span>
              <motion.div
                className="w-px h-8"
                style={{ background: 'linear-gradient(to bottom, rgba(245,239,224,0.25), transparent)', transformOrigin: 'top' }}
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
