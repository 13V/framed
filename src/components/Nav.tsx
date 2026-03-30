import { useEffect, useState } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'

const links = ['Work', 'About', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', v => setScrolled(v > 60))
  }, [scrollY])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      {/* Plain header — no transform/opacity on the outer element so no
          accidental compositing layer that blocks transparency */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <motion.div
          className="flex items-center justify-between mx-5 sm:mx-8 md:mx-16 py-4 md:py-5 transition-all duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            borderBottom: scrolled ? '1px solid rgba(92,10,20,0.12)' : '1px solid transparent',
            backdropFilter: scrolled ? 'blur(14px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
            backgroundColor: scrolled ? 'rgba(245,239,224,0.88)' : 'transparent',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 z-10"
            aria-label="Framed home"
          >
            <img
              src="/framed-logo.jpg"
              alt="Framed"
              className="w-8 h-8 md:w-9 md:h-9 object-cover rounded-sm border border-crimson/20"
            />
            <span
              className="font-display text-lg md:text-xl text-crimson uppercase font-light"
              style={{
                letterSpacing: '0.22em',
                color: menuOpen ? '#F5EFE0' : undefined,
              }}
            >
              Framed
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="relative font-display text-sm tracking-widest text-ink/60 uppercase hover:text-crimson transition-colors duration-300 group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-crimson transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="mailto:hello@framed.com.au"
            className="hidden md:block font-display text-sm tracking-widest uppercase border border-crimson/30 text-crimson px-5 py-2.5 hover:bg-crimson hover:text-cream transition-all duration-300"
          >
            Email us
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden z-10 flex flex-col justify-center items-end gap-1.5 w-8 h-8"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              className="block h-px w-6 origin-center"
              style={{ backgroundColor: menuOpen ? '#F5EFE0' : '#5C0A14' }}
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-px origin-center"
              style={{ backgroundColor: menuOpen ? '#F5EFE0' : '#5C0A14', width: menuOpen ? 24 : 16 }}
              animate={menuOpen ? { rotate: -45, y: -4, width: 24 } : { rotate: 0, y: 0, width: 16 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </motion.div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between px-6 pb-12 pt-28"
            style={{ backgroundColor: '#0D0505' }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-2 mt-8">
              {links.map((link, i) => (
                <motion.button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left font-display font-light text-cream border-b border-cream/10 py-5"
                  style={{ fontSize: 'clamp(2.5rem, 12vw, 4rem)' }}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                >
                  {link}
                </motion.button>
              ))}
            </nav>

            <motion.div
              className="flex items-end justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
            >
              <div>
                <p className="font-display text-sm text-cream/30 tracking-wider mb-2">Get in touch</p>
                <a
                  href="mailto:hello@framed.com.au"
                  className="font-display text-base text-cream/70 hover:text-cream transition-colors"
                >
                  hello@framed.com.au
                </a>
              </div>
              <div className="flex gap-5">
                {['IG', 'VM', 'LI'].map(s => (
                  <a key={s} href="#"
                    className="font-display text-sm tracking-widest uppercase text-cream/25 hover:text-cream/60 transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
