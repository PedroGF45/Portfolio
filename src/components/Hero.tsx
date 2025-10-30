import { FaGithub, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { trackEvent } from '../lib/analytics'

export default function Hero() {
  const prefersReduced = !!(
    (typeof globalThis.matchMedia === 'function' && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
    globalThis.localStorage?.getItem('animationsDisabled') === 'true'
  )

  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-space-950 via-space-900 to-space-800 section-transition pb-0">
      <div className="text-center px-6">
        <motion.h1
          className="text-5xl font-extrabold tracking-tight text-accent-400 mb-2 hero-title"
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
        >Pedro Brito</motion.h1>
        <p className="mt-4 text-2xl text-accent-200 font-medium opacity-95">Aspiring AI Engineer & Data Scientist — exploring the universe of data</p>

  {/* social icons remain; primary CTAs moved to an animated scroll cue below */}
        <div className="mt-8 flex gap-4 justify-center items-center">
          <a
            className="ml-3 text-2xl text-accent-300 hover:text-accent-400 transition-colors focus:underline"
            href="https://github.com/PedroGF45"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            className="ml-2 text-2xl text-accent-300 hover:text-accent-400 transition-colors focus:underline"
            href="mailto:pedrobfh@gmail.com"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>

      </div>
    </header>
  )
}
