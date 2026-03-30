import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    id: '01',
    title: 'Nomad Coffee',
    category: 'Brand film',
    year: '2025',
    tags: ['Food & Bev', 'Brand'],
    aspect: 'tall',
    color: '#1A0505',
  },
  {
    id: '02',
    title: 'Kin — S/S 25',
    category: 'Fashion campaign',
    year: '2025',
    tags: ['Fashion', 'Campaign'],
    aspect: 'wide',
    color: '#2A1010',
  },
  {
    id: '03',
    title: 'Acre Dining',
    category: 'Hospitality',
    year: '2024',
    tags: ['Hospitality', 'Interiors'],
    aspect: 'square',
    color: '#150808',
  },
  {
    id: '04',
    title: 'Sable',
    category: 'Product film',
    year: '2024',
    tags: ['Luxury', 'Product'],
    aspect: 'tall',
    color: '#0D0505',
  },
  {
    id: '05',
    title: 'Platform — Sydney Rd',
    category: 'Property',
    year: '2024',
    tags: ['Property', 'Interiors'],
    aspect: 'wide',
    color: '#200A0A',
  },
]

const aspectClasses: Record<string, string> = {
  tall:   'aspect-[3/4]',
  wide:   'aspect-[16/9]',
  square: 'aspect-square',
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.645, 0.045, 0.355, 1] }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor
    >
      {/* Image frame */}
      <div className={`relative overflow-hidden ${aspectClasses[project.aspect]} border border-crimson/10`}>
        {/* Placeholder dark frame — replace src with actual video/image */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${project.color} 0%, #3A0509 100%)` }}
        />

        {/* Project number watermark */}
        <span
          className="absolute top-4 left-5 font-display text-cream/8 font-light select-none"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: 1 }}
        >
          {project.id}
        </span>

        {/* Tags — only first tag on mobile to avoid overflow */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              className={`font-sans text-sm tracking-widest text-cream/40 uppercase bg-ink/40 px-2 py-0.5 backdrop-blur-sm ${i > 0 ? 'hidden sm:inline' : ''}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{ background: 'linear-gradient(to top, rgba(13,5,5,0.9) 0%, transparent 60%)' }}
        >
          <div>
            <p className="font-sans text-sm tracking-widest2 uppercase text-cream/50 mb-1">{project.category}</p>
            <h3 className="font-display text-cream text-xl sm:text-2xl font-light italic">{project.title}</h3>
          </div>
        </motion.div>

        {/* View arrow */}
        <motion.div
          className="absolute bottom-6 right-6"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.35 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#F5EFE0" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
        </motion.div>
      </div>

      {/* Meta below card */}
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg font-light text-ink italic">{project.title}</h3>
          <p className="font-sans text-sm text-ink/40 tracking-wider uppercase mt-0.5">{project.category}</p>
        </div>
        <span className="font-mono text-xs text-ink/30 mt-1">{project.year}</span>
      </div>
    </motion.div>
  )
}

export default function Work() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="work" className="py-20 md:py-32 px-5 sm:px-8 md:px-16 bg-cream">
      {/* Section header */}
      <div ref={headerRef} className="mb-12 md:mb-20">
        <motion.p
          className="font-sans text-sm tracking-widest3 uppercase text-crimson/60 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Work
        </motion.p>
        <div className="flex items-end justify-between">
          <motion.h2
            className="font-display font-light text-ink"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.645, 0.045, 0.355, 1] }}
          >
            Recent projects.
          </motion.h2>
          <motion.a
            href="#contact"
            className="hidden md:flex items-center gap-3 font-sans text-sm tracking-widest2 uppercase text-crimson/60 hover:text-crimson transition-colors pb-2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </motion.a>
        </div>
        <div className="rule mt-6" />
      </div>

      {/* Mobile: 2-col grid. Desktop: full editorial asymmetric layout */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
        {/* Row 1: large left (7 cols) + tall right (5 cols) */}
        <div className="col-span-2 md:col-span-7">
          <ProjectCard project={projects[1]} index={0} />
        </div>
        <div className="col-span-1 md:col-span-5 md:mt-16">
          <ProjectCard project={projects[0]} index={1} />
        </div>

        {/* Row 2: small (4) + medium (4) + small (4), offset top */}
        <div className="col-span-1 md:col-span-4 md:mt-[-4rem]">
          <ProjectCard project={projects[2]} index={2} />
        </div>
        <div className="col-span-1 md:col-span-4">
          <ProjectCard project={projects[3]} index={3} />
        </div>
        <div className="col-span-2 md:col-span-4 md:mt-8">
          <ProjectCard project={projects[4]} index={4} />
        </div>
      </div>
    </section>
  )
}
