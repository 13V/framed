import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const stats = [
  { value: '2019', label: 'Founded in Surry Hills' },
  { value: 'ARRI / Sony', label: 'Shooting on' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-100px' }
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#4B0507' }}
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
