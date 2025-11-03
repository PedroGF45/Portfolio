import { FaGithub, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { trackEvent } from '../lib/analytics'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  left: string
  top: string
  animationDuration: string
  animationDelay: string
  drift: string
  animationType: 'straight' | 'wave' | 'zigzag'
}

export default function Hero() {
  const prefersReduced = !!(
    (typeof globalThis.matchMedia === 'function' && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
    globalThis.localStorage?.getItem('animationsDisabled') === 'true'
  )

  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (prefersReduced) return

    const animationTypes: Array<'straight' | 'wave' | 'zigzag'> = ['straight', 'wave', 'zigzag']
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 120}%`,
      animationDuration: `${15 + Math.random() * 25}s`,
      animationDelay: `${Math.random() * -40}s`,
      drift: `${(Math.random() - 0.5) * 150}px`,
      animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)]
    }))
    setParticles(newParticles)
  }, [prefersReduced])

  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-space-950 via-space-900 to-space-800 section-transition pb-0 px-4 overflow-hidden">
      {!prefersReduced && (
        <div className="hero-grid">
          <div className="grid-container" />
        </div>
      )}

      {!prefersReduced && (
        <div className="hero-particles">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={`particle-star particle-${particle.animationType}`}
              style={{
                left: particle.left,
                top: particle.top,
                animationDuration: particle.animationDuration,
                animationDelay: particle.animationDelay,
                '--drift': particle.drift
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {!prefersReduced && <div className="hero-glow" />}

      <div className="text-center px-4 max-w-4xl mx-auto hero-content">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-accent-400 mb-2 hero-title"
          initial={{ textShadow: '0px 0px 0px rgba(125,218,255,0.0)' }}
          animate={prefersReduced ? undefined : {
            textShadow: [
              '0px 0px 0px rgba(125,218,255,0.0)',
              '0px 0px 12px rgba(125,218,255,0.08)',
              '0px 0px 0px rgba(125,218,255,0.0)'
            ]
          }}
          transition={prefersReduced ? undefined : { duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          onMouseEnter={() => trackEvent('hero_title_hover')}
        >
          Pedro Brito
        </motion.h1>
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-accent-200 font-medium opacity-95 px-4">
          Aspiring software engineer and data scientist. I turn data into impact.
        </p>
        <div className="mt-8 flex gap-4 justify-center items-center">
          <a
            className="text-2xl text-accent-300 hover:text-accent-400 transition-colors focus:underline"
            href="https://github.com/PedroGF45"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            onClick={() => trackEvent('hero_github_click')}
          >
            <FaGithub />
          </a>
          <a
            className="text-2xl text-accent-300 hover:text-accent-400 transition-colors focus:underline"
            href="mailto:pedrobfh@gmail.com"
            aria-label="Email"
            onClick={() => trackEvent('hero_email_click')}
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <motion.div
          className="flex flex-col items-center gap-2 text-accent-300/70 cursor-pointer pointer-events-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={prefersReduced ? { opacity: 0.7 } : {
            opacity: [0.4, 0.8, 0.4],
            y: [0, 8, 0]
          }}
          transition={prefersReduced ? { duration: 0.5, delay: 0.8 } : {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
            trackEvent('scroll_indicator_click')
          }}
          whileHover={prefersReduced ? undefined : { scale: 1.1 }}
        >
          <span className="text-sm font-medium">Scroll down</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </div>
    </header>
  )
}
