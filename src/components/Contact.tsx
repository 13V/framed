import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const budgets = ['Under $5k', '$5k – $15k', '$15k – $30k', '$30k+']
const services = ['Brand Film', 'Commercial', 'Documentary', 'Social Content', 'Event Coverage']

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', brand: '', budget: '', service: '', message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const field = (
    label: string,
    key: keyof typeof form,
    type = 'text',
    placeholder = ''
  ) => (
    <div className="group">
      <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/30 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        className="w-full bg-transparent border-b border-cream/15 pb-3 font-sans text-sm text-cream placeholder:text-cream/20
                   focus:outline-none focus:border-crimson/60 transition-colors duration-300"
        required
      />
    </div>
  )

  return (
    <section id="contact" className="py-20 md:py-32 px-5 sm:px-8 md:px-16 bg-cream">
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <motion.p
            className="font-sans text-sm tracking-widest3 uppercase text-crimson/60 mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            Contact
          </motion.p>
          <motion.h2
            className="font-display font-light text-ink"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 5.5rem)', lineHeight: 1.0 }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.645, 0.045, 0.355, 1] }}
          >
            Start a<br />
            <span className="italic text-ink/30">conversation.</span>
          </motion.h2>
          <div className="rule mt-6" />
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.645, 0.045, 0.355, 1] }}
        >
          {sent ? (
            <div className="py-20 text-center">
              <p className="font-display italic text-5xl text-crimson font-light mb-4">
                Got it.
              </p>
              <p className="font-sans text-sm text-ink/40 tracking-wider">
                We'll follow up within a day, usually sooner.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div
                className="grid md:grid-cols-2 gap-7 md:gap-10"
                style={{ backgroundColor: '#4B0507', padding: 'clamp(1.25rem, 5vw, 3rem)', border: '1px solid rgba(75,5,7,0.15)' }}
              >
                {field('Your Name', 'name', 'text', 'Full name')}
                {field('Email', 'email', 'email', 'hello@yourbrand.com')}
                {field('Brand / Company', 'brand', 'text', 'Brand name')}

                {/* Budget selector */}
                <div>
                  <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/30 mb-2">
                    Estimated Budget
                  </label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {budgets.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, budget: b }))}
                        className="font-sans text-sm uppercase tracking-widest px-3 py-2 border transition-colors duration-300"
                        style={{
                          borderColor: form.budget === b ? '#4B0507' : 'rgba(245,239,224,0.15)',
                          color: form.budget === b ? '#F5EFE0' : 'rgba(245,239,224,0.35)',
                          backgroundColor: form.budget === b ? '#4B0507' : 'transparent',
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service selector */}
                <div className="md:col-span-2">
                  <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/30 mb-3">
                    Type of Project
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, service: s }))}
                        className="font-sans text-sm uppercase tracking-widest px-4 py-2.5 border transition-colors duration-300"
                        style={{
                          borderColor: form.service === s ? '#4B0507' : 'rgba(245,239,224,0.15)',
                          color: form.service === s ? '#F5EFE0' : 'rgba(245,239,224,0.35)',
                          backgroundColor: form.service === s ? '#4B0507' : 'transparent',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/30 mb-2">
                    Project brief
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Give us a rough idea of what you're after."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-transparent border-b border-cream/15 pb-3 font-sans text-sm text-cream
                               placeholder:text-cream/20 focus:outline-none focus:border-crimson/60 transition-colors duration-300 resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="font-sans text-sm text-ink/30 tracking-wider">
                  Usually back within a day.
                </p>
                <button
                  type="submit"
                  className="group flex items-center gap-3 font-sans text-sm tracking-widest2 uppercase
                             bg-crimson text-cream px-6 py-3 sm:px-8 sm:py-4 hover:bg-crimson-dark transition-colors duration-300 w-full sm:w-auto justify-center sm:justify-start"
                >
                  Send Inquiry
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
