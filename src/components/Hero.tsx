import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PARTICLES = [
  { left: '8%',  size: 1.5, dur: 9,  delay: 0,   opacity: 0.22, drift: 12  },
  { left: '19%', size: 1,   dur: 12, delay: 2.1, opacity: 0.15, drift: -18 },
  { left: '31%', size: 2,   dur: 8,  delay: 0.8, opacity: 0.18, drift: 8   },
  { left: '47%', size: 1.5, dur: 11, delay: 3.5, opacity: 0.25, drift: -12 },
  { left: '58%', size: 1,   dur: 10, delay: 1.4, opacity: 0.14, drift: 20  },
  { left: '67%', size: 2,   dur: 13, delay: 4,   opacity: 0.20, drift: -8  },
  { left: '74%', size: 1,   dur: 9,  delay: 2.7, opacity: 0.16, drift: 15  },
  { left: '82%', size: 1.5, dur: 11, delay: 0.3, opacity: 0.20, drift: -22 },
  { left: '23%', size: 1,   dur: 14, delay: 5,   opacity: 0.12, drift: 10  },
  { left: '55%', size: 1.5, dur: 8,  delay: 1.9, opacity: 0.18, drift: -14 },
  { left: '38%', size: 2,   dur: 10, delay: 3.2, opacity: 0.22, drift: 18  },
  { left: '88%', size: 1,   dur: 12, delay: 0.6, opacity: 0.14, drift: -10 },
  { left: '13%', size: 1.5, dur: 9,  delay: 4.3, opacity: 0.20, drift: 22  },
  { left: '44%', size: 1,   dur: 11, delay: 2.5, opacity: 0.16, drift: -16 },
  { left: '71%', size: 2,   dur: 13, delay: 1.2, opacity: 0.24, drift: 8   },
]

function DustParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: 0,
            width: p.size,
            height: p.size,
            backgroundColor: '#F5EFE0',
          }}
          animate={{
            y: [0, '-110vh'],
            x: [0, p.drift],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.08, 0.92, 1],
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100svh] overflow-hidden flex flex-col items-center justify-center select-none"
      style={{ backgroundColor: '#0D0505' }}
    >
      {/* Soft crimson glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 48%, rgba(75,5,7,0.28) 0%, transparent 60%)' }}
      />

      {/* Dust particles */}
      <DustParticles />

      {/* HUD — top */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-end px-5 sm:px-8 md:px-14 pt-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <span className="font-sans text-sm tracking-widest2 uppercase" style={{ color: 'rgba(245,239,224,0.18)' }}>
          Sydney, AU — 2026
        </span>
      </motion.div>

      {/* The mark */}
      <motion.div
        className="flex flex-col items-center gap-6 z-10"
        style={{ opacity, y, willChange: 'opacity, transform' }}
      >
        <img
          src="/framed-logo-cream.png"
          alt="Framed"
          style={{ width: 'clamp(180px, 32vw, 420px)', height: 'auto' }}
        />
      </motion.div>

      {/* Scroll indicator */}
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
