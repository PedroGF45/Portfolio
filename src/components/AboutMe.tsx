import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import journeyTimeline from '../data/journeyTimeline'
import { trackEvent } from '../lib/analytics'

const TimelineItem: React.FC<{ phase: any; i: number }> = ({ phase, i }) => {
  const isLeft = i % 2 === 0
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  
  return (
    <motion.li
      ref={ref}
      className="mb-16 flex flex-col md:flex-row items-center w-full relative"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12, type: 'spring', bounce: 0.18 }}
    >
      <div className={`hidden md:flex w-1/2 justify-end pr-12 ${isLeft ? '' : 'invisible'}`}>
        <div className="max-w-xs text-right">
          <div className="font-bold text-blue-300 text-base">
            {phase.starStage} <span className="text-xs text-blue-100">({phase.personalStage})</span>
          </div>
          <div className="text-sm text-blue-100 mb-1">{phase.years}</div>
          <div className="text-base mb-1">{phase.description}</div>
          <div className="text-xs italic text-blue-200">{phase.comparison}</div>
        </div>
      </div>

      <div className="w-full md:w-auto flex justify-center items-center relative z-10">
        <div className="w-12 h-12 rounded-full bg-blue-900 border-2 border-blue-400 flex items-center justify-center shadow-lg z-10">
          <span className="text-2xl" title={phase.starStage}>
            {phase.starStage === 'Nebula' && '☁️'}
            {phase.starStage === 'Protostar' && '✨'}
            {phase.starStage === 'Main Sequence' && '⭐'}
            {phase.starStage === 'Stellar Evolution' && '🌠'}
            {phase.starStage === 'Red Giant' && '🔴'}
            {phase.starStage === 'Supernova' && '💥'}
          </span>
        </div>
      </div>

      <div className={`hidden md:flex w-1/2 justify-start pl-12 ${isLeft ? 'invisible' : ''}`}>
        <div className="max-w-xs text-left">
          <div className="font-bold text-blue-300 text-base">
            {phase.starStage} <span className="text-xs text-blue-100">({phase.personalStage})</span>
          </div>
          <div className="text-sm text-blue-100 mb-1">{phase.years}</div>
          <div className="text-base mb-1">{phase.description}</div>
          <div className="text-xs italic text-blue-200">{phase.comparison}</div>
        </div>
      </div>

      <div className="md:hidden w-full mt-2 flex flex-col items-center">
        <div className="font-bold text-blue-300 text-base text-center">
          {phase.starStage} <span className="text-xs text-blue-100">({phase.personalStage})</span>
        </div>
        <div className="text-sm text-blue-100 mb-1">{phase.years}</div>
        <div className="text-base mb-1 text-center">{phase.description}</div>
        <div className="text-xs italic text-blue-200 text-center">{phase.comparison}</div>
      </div>
    </motion.li>
  )
}

const primaryStack = [
  'python',
  'pandas',
  'numpy',
  'scikit-learn',
  'pytorch',
  'sql',
  'tensorflow',
  'rapids',
]

const otherStack = ['javascript', 'react', 'typescript', 'php', 'c++']

// Icons that need manual size boost (small or narrow source images)
const SMALL_ICONS = new Set(['react', 'php'])

const fileMap: Record<string, string> = {
  python: '/logos/python.png',
  pytorch: '/logos/pytorch.svg',
  'scikit-learn': '/logos/scikit-learn.png',
  tensorflow: '/logos/tensorflow.png',
  rapids: '/logos/rapids.png',
  pandas: '/logos/pandas.svg',
  numpy: '/logos/numpy.svg',
  sql: '/logos/sql.svg',
  javascript: '/logos/javascript.png',
  react: '/logos/react.svg',
  typescript: '/logos/typescript.svg',
  php: '/logos/php.webp',
  'c++': '/logos/c++.png',
}

const AboutMe: React.FC = () => {
  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.18 })
  const [stackRef, stackInView] = useInView({ triggerOnce: true, threshold: 0.18 })
  const stackContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = stackContainerRef.current
    if (!container) return

    const imgs = Array.from(container.querySelectorAll<HTMLImageElement>('img'))
    const listeners: Array<() => void> = []

    for (const img of imgs) {
      const check = () => {
        const w = img.naturalWidth || 0
        const h = img.naturalHeight || 0
        const parent = img.closest('.tech-logo')
        if (!parent || w === 0 || h === 0) return

        const ratio = Math.max(w, h) / Math.min(w, h)
        if (w < 36 || ratio > 2.2) {
          parent.classList.add('tech-logo--big')
        } else {
          parent.classList.remove('tech-logo--big')
        }
      }

      if (img.complete) {
        check()
      } else {
        const onLoad = () => check()
        img.addEventListener('load', onLoad)
        listeners.push(() => img.removeEventListener('load', onLoad))
      }
    }

    return () => {
      for (const fn of listeners) fn()
    }
  }, [stackInView])

  return (
    <motion.section
      ref={sectionRef}
      className="about-section container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">About me</h2>

        <div className="about-intro mb-6 md:flex md:items-stretch md:gap-6">
          <div className="about-avatar w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden relative mb-4 md:mb-0">
            <img src="/images/profile-256.webp" alt="Pedro Brito" className="avatar-inner w-full h-full object-cover" />
          </div>
          <div className="md:flex-1">
            <div className="block sm:hidden">
              <p className="text-sm mb-2">
                Hi — I'm Pedro, an AI engineer and data scientist. I build ML pipelines, data-driven tools, and space-themed projects.
              </p>
              <p className="text-xs text-text-300">Python • Machine Learning • Data Engineering</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-base mb-2 about-intro-par">
                Hi — I'm Pedro. I'm open to software engineering roles broadly, with a preference for data science and AI. 
                I design and implement data-driven products and tools with a focus on machine learning, data engineering, and visualization. 
                I enjoy building space-themed projects and machine learning pipelines that scale.
              </p>
              <p className="text-sm text-text-300 about-intro-par">
                I typically work with Python, scientific libraries, and modern web tooling to bring research prototypes into production-ready demos.
              </p>
            </div>
          </div>
        </div>

        <div className="timeline mb-8">
          <ol>
            {journeyTimeline.map((phase, i) => (
              <TimelineItem key={phase.id} phase={phase} i={i} />
            ))}
          </ol>
        </div>

        <div className="mt-10 mb-10 flex justify-center">
          <a
            href="/English_PedroBrito.pdf"
            download="Pedro_Brito_CV.pdf"
            onClick={() => trackEvent('cv_download')}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            Download CV
          </a>
        </div>

        <div ref={stackRef} className="w-full" aria-hidden={!stackInView}>
          <div ref={stackContainerRef} className="flex flex-wrap gap-3 items-center justify-center">
            {primaryStack.map((s, idx) => {
              const slug = s.toLowerCase()
              const mapped = fileMap[slug]
              return (
                <motion.div
                  key={s}
                  className="tech-logo tech-logo--primary flex items-center justify-center"
                  title={s}
                  aria-label={s}
                  initial={{ opacity: 0, scale: 0.9, y: 12 }}
                  animate={stackInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                >
                  <img
                    src={mapped ?? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='}
                    alt={s}
                  />
                </motion.div>
              )
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 items-center justify-center">
            {otherStack.map((s, idx) => {
              const slug = s.toLowerCase()
              const mapped = fileMap[slug]
              const isSmall = SMALL_ICONS.has(slug)
              return (
                <motion.div
                  key={s}
                  className={`tech-logo w-12 h-12 flex items-center justify-center ${isSmall ? 'tech-logo--big tech-logo--other' : 'tech-logo--other'}`}
                  title={s}
                  aria-label={s}
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  animate={stackInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                >
                  <img src={mapped ?? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='} alt={s} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default AboutMe
