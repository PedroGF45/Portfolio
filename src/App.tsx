import React, { useState, useEffect } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import Hero from './components/Hero'
import { FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa'
import SpaceGallery from './components/SpaceGallery'
import AboutMe from './components/AboutMe'
import HireCTA from './components/CTA'
import { trackEvent } from './lib/analytics'

export default function App() {
  const [headerVisible, setHeaderVisible] = useState(true)
  const [inlineCTA, setInlineCTA] = useState(false)
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down')
  const [inlinePulseKey, setInlinePulseKey] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const lastY = React.useRef<number>((globalThis as any).window?.scrollY ?? 0)

  useEffect(() => {
    const onScroll = () => {
      const y = globalThis.window.scrollY
      if (y > lastY.current) setScrollDir('down')
      else if (y < lastY.current) setScrollDir('up')
      lastY.current = y
    }
    globalThis.window.addEventListener('scroll', onScroll, { passive: true })
    return () => globalThis.window.removeEventListener('scroll', onScroll)
  }, [])

  useCTAVisibility(setHeaderVisible, setInlineCTA, setInlinePulseKey)

  const floatingCTA = !headerVisible && !inlineCTA && !galleryOpen

  return (
    <LayoutGroup>
      <div className="min-h-screen bg-space-950 text-text-200 font-sans">
      <Hero />

      <main id="projects" className="max-w-7xl mx-auto px-4 py-6 relative">
        <section className="section-transition section-pad rounded-3xl overflow-hidden shadow-xl mb-12">
          <div className="max-w-5xl mx-auto px-6">
            <AboutMe />
          </div>
        </section>

        <section className="section-transition-alt section-pad rounded-3xl overflow-hidden shadow-xl mb-12">
          <div className="max-w-7xl mx-auto px-6">
            <SpaceGallery onGalleryChange={setGalleryOpen} />
          </div>
        </section>
      </main>

      <motion.section
        id="contact"
        className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 section-transition rounded-3xl shadow-xl mb-12 contact-card"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="relative py-2">
          <div aria-hidden className="contact-satellite hidden sm:block" />

          <div className="pr-0 sm:pr-28">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-accent-400">
              Interested in working together?
            </h3>
            <p className="mb-4 text-xs sm:text-sm md:text-base text-text-200">
              Tell me about the problem or click Hire me to start a conversation.
            </p>
          </div>
        </div>

        {inlineCTA && !galleryOpen && (
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <HireCTA inline direction={scrollDir} pulseKey={inlinePulseKey} />

            <div className="flex gap-3 items-center justify-center">
              <a
                aria-label="Email Pedro"
                title="Email"
                className="social-btn"
                href="mailto:pedrobfh@gmail.com?subject=Hello%20Pedro"
                onClick={() => trackEvent('contact_email_click')}
              >
                <FaEnvelope />
                <span className="social-tooltip">Email</span>
              </a>
              <a
                aria-label="Pedro on GitHub"
                title="GitHub"
                className="social-btn"
                href="https://github.com/PedroGF45"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('contact_github_click')}
              >
                <FaGithub />
                <span className="social-tooltip">GitHub</span>
              </a>
              <a
                aria-label="Pedro on LinkedIn"
                title="LinkedIn"
                className="social-btn"
                href="https://www.linkedin.com/in/pedro-brito-272b2a192"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('contact_linkedin_click')}
              >
                <FaLinkedin />
                <span className="social-tooltip">LinkedIn</span>
              </a>
            </div>
          </div>
        )}
      </motion.section>

      <footer className="text-center py-8 text-sm opacity-80">
        © {new Date().getFullYear()} Pedro Brito. Built with passion for space & AI
      </footer>

      {floatingCTA && !inlineCTA && <HireCTA direction={scrollDir} pulseKey={inlinePulseKey} />}
    </div>
  </LayoutGroup>
  )
}

function useCTAVisibility(
  setHeaderVisible: (v: boolean) => void,
  setInline: (v: boolean) => void,
  setInlinePulseKey?: (f: (k: number) => number) => void
) {
  useEffect(() => {
    const header = document.querySelector('header')
    const contact = document.getElementById('contact')

    let headerObserver: IntersectionObserver | null = null
    if (header) {
      headerObserver = new IntersectionObserver(
        (entries) => {
          setHeaderVisible(!!entries[0].isIntersecting)
        },
        { root: null, threshold: 0, rootMargin: '-65% 0px 0px 0px' }
      )
      headerObserver.observe(header)
    } else {
      setHeaderVisible(false)
    }

    let contactObserver: IntersectionObserver | null = null
    let lastVisible = false
    const setVisibleState = (visible: boolean) => {
      if (visible !== lastVisible) {
        if (visible) {
          setInline(true)
          setInlinePulseKey?.((k) => k + 1)
        } else {
          setInline(false)
        }
        lastVisible = visible
      }
    }

    if (contact) {
      contactObserver = new IntersectionObserver(
        (entries) => {
          const e = entries[0]
          const visible = (e.intersectionRatio ?? 0) >= 0.15 || e.isIntersecting
          setVisibleState(visible)
        },
        { root: null, threshold: [0, 0.15, 0.5], rootMargin: '0px 0px -20% 0px' }
      )
      contactObserver.observe(contact)
    }

    let raf = 0
    const manualCheck = () => {
      if (!contact) return
      const rect = contact.getBoundingClientRect()
      const vh = globalThis.window.innerHeight || document.documentElement.clientHeight
      const topOK = rect.top <= vh * 0.75
      const partVisible = rect.bottom > vh * 0.2
      const nearBottom = (globalThis.window.scrollY + vh) >= document.documentElement.scrollHeight - 320
      const visible = (topOK && partVisible) || nearBottom
      setVisibleState(visible)
    }

    const onScrollResize = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(manualCheck)
    }

    globalThis.addEventListener('scroll', onScrollResize, { passive: true })
    globalThis.addEventListener('resize', onScrollResize)
    manualCheck()

    return () => {
      headerObserver?.disconnect()
      contactObserver?.disconnect()
      globalThis.removeEventListener('scroll', onScrollResize)
      globalThis.removeEventListener('resize', onScrollResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [setHeaderVisible, setInline, setInlinePulseKey])
}
