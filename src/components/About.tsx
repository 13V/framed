import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const stats = [
  { value: '2019', label: 'Founded in Surry Hills' },
  { value: 'ARRI / Sony', label: 'Shooting on' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#0D0505' }}
    >
      {/* Textured background — subtle crimson noise */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
        }}
      />

      <div className="relative z-10 px-5 sm:px-8 md:px-16 grid md:grid-cols-12 gap-10 md:gap-8 items-center">
        {/* Left — parallax image/logo frame */}
        <div className="md:col-span-5">
          <motion.div
            className="relative"
            style={{ y: imgY, willChange: 'transform' }}
          >
            {/* Decorative frame border */}
            <div className="relative border border-crimson/30 p-1">
              <div className="border border-crimson/15 p-6 sm:p-8 flex items-center justify-center"
                   style={{ minHeight: 'clamp(260px, 40vh, 480px)', background: 'linear-gradient(160deg, #1A0505 0%, #0D0505 100%)' }}>
                {/* Large cursive f monogram */}
                <div className="text-center">
                  <img
                    src="/framed-logo-cream.png"
                    alt="Framed monogram"
                    className="w-40 h-40 object-contain opacity-80 mx-auto"
                  />
                  <div className="rule mt-8 opacity-30" />
                  <p className="font-sans text-sm tracking-widest3 text-cream/20 uppercase mt-6">
                    Est. 2019
                  </p>
                </div>
              </div>
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-crimson/50" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-crimson/50" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-crimson/50" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-crimson/50" />
            </div>
          </motion.div>
        </div>

        {/* Right — copy */}
        <div ref={headerRef} className="md:col-span-7 md:pl-8">
          <motion.p
            className="font-sans text-sm tracking-widest3 uppercase text-crimson/50 mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            About
          </motion.p>

          <motion.h2
            className="font-display font-light text-cream mb-8"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.645, 0.045, 0.355, 1] }}
          >
            We shoot on<br />
            <span className="italic text-cream/40">location.</span>
          </motion.h2>

          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p className="font-sans text-sm leading-relaxed text-cream/50 font-light">
              Framed is a small team — two directors, one editor, and whoever the job calls for.
              We've been shooting in Sydney since 2019, mostly for food, fashion, and property
              brands, though our best work has come from clients who had a clear brief and got
              out of the way.
            </p>
            <p className="font-sans text-sm leading-relaxed text-cream/50 font-light">
              We don't do event recap videos or social media packages. If you need something that
              looks and feels like it was made by people who care what it looks like, we're
              probably the right fit.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-12 pt-10 border-t border-cream/10 grid grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((s, i) => (
              <div key={i}>
                <p className="font-display text-cream font-light" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                  {s.value}
                </p>
                <p className="font-sans text-sm text-cream/30 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Signature quote */}
          <motion.blockquote
            className="mt-12 border-l-2 border-crimson/40 pl-5"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="font-display italic text-cream/40 text-lg leading-relaxed">
              "We try to make work we'd show our parents."
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  )
}
