import React, { useState, useEffect } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import Hero from './components/Hero'
import { FaGithub, FaEnvelope, FaLinkedin} from 'react-icons/fa'
import projects from './data/projects'
import SpaceGallery from './components/SpaceGallery'
// Removed BackgroundSpace for a cleaner look
import AboutMe from './components/AboutMe'
import HireCTA from './components/CTA'
// The app now renders About above Projects in the flow (no tabs).

export default function App() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedProject = projects.find((p) => p.id === selected) || null
  const [headerVisible, setHeaderVisible] = useState(true)
  const [inlineCTA, setInlineCTA] = useState(false)

  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down')
  const lastY = React.useRef<number>((globalThis as any).window?.scrollY ?? 0)

  // Track scroll direction so we can animate CTA entrance/exit depending on
  // whether the user is scrolling down or up (used to invert the motion).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > lastY.current) setScrollDir('down')
      else if (y < lastY.current) setScrollDir('up')
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the CTA briefly when it becomes inline (landing pulse).
  const [inlinePulseKey, setInlinePulseKey] = useState(0)

  // Start observers that will set the header visibility and contact inline
  // state (and notify when the CTA lands inline so we can trigger a pulse).
  useCTAVisibility(setHeaderVisible, setInlineCTA, setInlinePulseKey)

  // Compute whether the CTA should float bottom-right. Requirement: CTA is
  // bottom-right except when the Hero (header) or Contact are visible.
  const floatingCTA = !headerVisible && !inlineCTA

  // Debug logs to help diagnose why animations might be suppressed or not
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug('[CTA DEBUG] floating', floatingCTA, 'inline', inlineCTA, 'dir', scrollDir, 'pulseKey', inlinePulseKey, 'animationsDisabled=', globalThis.localStorage?.getItem('animationsDisabled'))
  }, [floatingCTA, inlineCTA, scrollDir, inlinePulseKey])

  // Render an on-screen debug panel when localStorage.debugCTA === 'true'
  const showDevPanel = React.useMemo(() => globalThis.localStorage?.getItem('debugCTA') === 'true', [])

  return (
    <LayoutGroup>
      <div className="min-h-screen bg-space-950 text-text-200 font-sans">
      <Hero />

      <main id="projects" className="max-w-7xl mx-auto px-4 py-6 relative">
        {/* decorative floating objects in the background */}
        {/* Background removed for a cleaner, more professional look */}
        {/* About section (above Projects) */}
        <section className="section-transition section-pad rounded-3xl overflow-hidden shadow-xl mb-12">
          <div className="max-w-5xl mx-auto px-6">
            <AboutMe />
          </div>
        </section>

        {/* Projects follow the About content */}
        <section className="section-transition-alt section-pad rounded-3xl overflow-hidden shadow-xl mb-12">
          <div className="max-w-7xl mx-auto px-6">
            <SpaceGallery />
          </div>
        </section>
      </main>

      {/* Contact section - improved visuals and justified text */}
      <motion.section
        id="contact"
        className="max-w-4xl mx-auto px-4 py-12 section-transition rounded-3xl shadow-xl mb-12 contact-card"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="relative py-2">
          {/* decorative satellite */}
          <div aria-hidden className="contact-satellite" />

          <div className="pr-28">
            <h3 className="text-lg font-semibold mb-1 text-accent-400">Interested in working together?</h3>
            <p className="mb-4 text-base text-text-200">Tell me about the problem — or click Hire me to start a conversation.</p>
          </div>

          {/* social icons cluster in the top-right of the card */}
          <div className="contact-top-right">
            <a aria-label="Email Pedro" title="Email" className="social-btn" href="mailto:pedrobfh@gmail.com?subject=Hello%20Pedro">
              <FaEnvelope />
              <span className="social-tooltip">Email</span>
            </a>
            <a aria-label="Pedro on GitHub" title="GitHub" className="social-btn" href="https://github.com/PedroGF45" target="_blank" rel="noreferrer">
              <FaGithub />
              <span className="social-tooltip">GitHub</span>
            </a>
            <a aria-label="Pedro on LinkedIn" title="LinkedIn" className="social-btn" href="https://www.linkedin.com/in/pedro-brito-272b2a192" target="_blank" rel="noreferrer">
              <FaLinkedin />
              <span className="social-tooltip">LinkedIn</span>
            </a>
          </div>
        </div>
  {/* Inline CTA slot: render CTA inside the contact section when it's visible */}
        {inlineCTA && (
          <div className="mt-6 flex justify-center md:justify-start">
            <HireCTA inline direction={scrollDir} pulseKey={inlinePulseKey} />
          </div>
        )}
  </motion.section>

      <footer className="text-center py-8 text-sm opacity-80">
        © {new Date().getFullYear()} Pedro Brito — Built with passion for space & AI
      </footer>

    {/* Floating CTA: show as floating when Hero is out of view, but move into the contact
      section (inline) when the contact section becomes visible. Uses IntersectionObserver
      so the transition can be animated by Framer Motion (CTA supports `inline` prop).
    */}
  {floatingCTA && !inlineCTA && <HireCTA direction={scrollDir} pulseKey={inlinePulseKey} />}

  {showDevPanel && (
    <div className="fixed left-4 bottom-24 z-50 bg-black/70 text-xs text-white p-3 rounded-md w-56">
      <div className="font-semibold mb-1">CTA DEBUG</div>
      <div>floating: {String(floatingCTA)}</div>
      <div>inline: {String(inlineCTA)}</div>
      <div>dir: {String(scrollDir)}</div>
      <div>pulseKey: {inlinePulseKey}</div>
      <div>animationsDisabled: {String(globalThis.localStorage?.getItem('animationsDisabled'))}</div>
      <div className="mt-2 text-[11px] opacity-80">Enable dev panel: run <code>localStorage.setItem('debugCTA','true')</code> in console</div>
    </div>
  )}

      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white text-black rounded-md p-4 max-w-3xl w-full shadow-lg overflow-hidden">
            <div className="md:flex gap-4">
              <div className="md:w-1/3 flex items-center justify-center bg-[#071428] p-4">
                {selectedProject.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selectedProject.image} alt={selectedProject.title} className="max-h-48 w-auto rounded" />
                ) : (
                  <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center text-sm">No image</div>
                )}
              </div>

              <div className="md:w-2/3 p-3">
                <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                <p className="mt-2">{selectedProject.description}</p>

                {selectedProject.tech && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProject.tech.map((t: string) => (
                      <span key={t} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-md">{t}</span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex gap-3">
                  <a className="text-sm text-blue-600" href={selectedProject.repoUrl} target="_blank" rel="noreferrer">Repo</a>
                  {selectedProject.demoUrl && (
                    <a className="text-sm text-blue-600" href={selectedProject.demoUrl} target="_blank" rel="noreferrer">Demo</a>
                  )}
                  <button className="ml-auto text-sm" onClick={() => setSelected(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </LayoutGroup>
  )
}

// We'll track visibility of the hero (header) and the contact section and decide where
// the Hire CTA should render (floating or inline). This makes it possible for Framer
// Motion to animate the CTA moving smoothly into the contact area via `layoutId`.

// Local state used by the main App component above
function useCTAVisibility(setHeaderVisible: (v: boolean) => void, setInline: (v: boolean) => void, setInlinePulseKey?: (f: (k: number) => number) => void) {
  useEffect(() => {
    const header = document.querySelector('header')
    const contact = document.getElementById('contact')

    // Header observer: floating CTA becomes visible when header is mostly out of view
    let headerObserver: IntersectionObserver | null = null
  if (header) {
      // Use a rootMargin so the floating CTA appears earlier (when header is
      // mostly scrolled past). A negative top rootMargin means the observer
      // treats the element as outside sooner. Tweak '-50% 0px 0px 0px' to
      // control how early it appears.
      headerObserver = new IntersectionObserver(
        (entries) => {
          const e = entries[0]
          // headerVisible should reflect whether the header is currently
          // intersecting the viewport. We pass that up so the App component
          // can decide whether to show the floating CTA.
          setHeaderVisible(!!e.isIntersecting)
        },
        // make CTA appear earlier while scrolling down by increasing negative top margin
        { root: null, threshold: 0, rootMargin: '-65% 0px 0px 0px' }
      )
      headerObserver.observe(header)
    } else {
      // no header present — treat header as not visible so CTA may float
      setHeaderVisible(false)
    }

    // Contact observer: when contact is visible we render the CTA inline inside it
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
          // log for debugging
          // eslint-disable-next-line no-console
          console.debug('[CTA OBSERVER] contact ratio=', e.intersectionRatio, 'isIntersecting=', e.isIntersecting, 'rect=', e.boundingClientRect)
          // Consider contact visible when at least ~15% of it is in view —
          // this is more forgiving on shorter viewports and mobile.
          const visible = (e.intersectionRatio ?? 0) >= 0.15 || e.isIntersecting
          setVisibleState(visible)
        },
        { root: null, threshold: [0, 0.15, 0.5], rootMargin: '0px 0px -20% 0px' }
      )
      contactObserver.observe(contact)
    }

    // Fallback manual check: some layouts or browsers can miss the IO event timing.
    // We'll also check boundingClientRect on scroll/resize and set `inline` when
    // the contact element is comfortably in view. This ensures the CTA moves
    // into the contact area reliably across viewport sizes.
    let raf = 0
    const manualCheck = () => {
      if (!contact) return
      const rect = contact.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      // Consider visible when top is within bottom 75% of viewport and at least
      // some part (20%) is visible — forgiving for small screens.
      const topOK = rect.top <= vh * 0.75
      const partVisible = rect.bottom > vh * 0.2
      // Also treat the contact as visible if the user is near the bottom of the
      // document (common on long pages) so the CTA can move inline reliably.
  const nearBottom = (window.scrollY + vh) >= (document.documentElement.scrollHeight - 320)
      const visible = (topOK && partVisible) || nearBottom
      // eslint-disable-next-line no-console
      console.debug('[CTA MANUAL] rect.top=', Math.round(rect.top), 'rect.bottom=', Math.round(rect.bottom), 'vh=', vh, 'visible=', visible)
      setVisibleState(visible)
    }

    const onScrollResize = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(manualCheck)
    }

    globalThis.addEventListener('scroll', onScrollResize, { passive: true })
    globalThis.addEventListener('resize', onScrollResize)
    // initial check
    manualCheck()

    return () => {
      headerObserver?.disconnect()
      contactObserver?.disconnect()
      globalThis.removeEventListener('scroll', onScrollResize)
      globalThis.removeEventListener('resize', onScrollResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [setHeaderVisible, setInline])
}

// Hook the observers into the App component's state.
// We'll initialize and use the hook in the App render body above.
