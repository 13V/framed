export default function Footer() {
  return (
    <footer
      className="py-10 px-5 sm:px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6"
      style={{ backgroundColor: '#0D0505', borderTop: '1px solid rgba(75,5,7,0.2)' }}
    >
      <div className="flex items-center gap-3">
        <img src="/framed-logo-cream.png" alt="Framed" className="w-7 h-7 object-contain opacity-70" />
        <span className="font-display text-cream/40 italic text-sm tracking-widest">Framed</span>
      </div>

      <p className="font-sans text-sm text-cream/20 tracking-wider text-center">
        © 2026 Framed. Surry Hills, Sydney.
      </p>

      <div className="flex gap-6">
        {['Instagram', 'Vimeo', 'LinkedIn'].map(link => (
          <a
            key={link}
            href="#"
            className="font-sans text-sm tracking-widest uppercase text-cream/20 hover:text-cream/60 transition-colors duration-300"
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  )
}
