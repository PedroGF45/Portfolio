import React from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { FaGithub, FaEnvelope, FaTimes } from 'react-icons/fa'
import { trackEvent } from '../lib/analytics'

type Props = { readonly inline?: boolean; readonly direction?: 'down' | 'up'; readonly pulseKey?: number }

export default function CTA({ inline, direction, pulseKey }: Props) {
  const [open, setOpen] = React.useState(false)
  const prefersReduced = !!(
    (typeof globalThis.matchMedia === 'function' && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
    globalThis.localStorage?.getItem('animationsDisabled') === 'true'
  )
  const effectivePrefersReduced = prefersReduced

  function openModal() {
    trackEvent('hire_modal_open')
    setOpen(true)
  }
  function closeModal() {
    trackEvent('hire_modal_close')
    setOpen(false)
  }

  const buttonClass = inline
    ? 'mx-auto bg-accent-500 hover:bg-accent-400 text-space-950 px-6 py-3 rounded-full shadow-lg focus:ring-2 focus:ring-accent-300 focus:outline-none'
    : 'fixed right-6 bottom-6 bg-accent-500 hover:bg-accent-400 text-space-950 px-4 py-3 rounded-full shadow-lg z-50 focus:ring-2 focus:ring-accent-300 focus:outline-none'

  const controls = useAnimation()

  React.useEffect(() => {
    if (effectivePrefersReduced) {
      controls.set({ opacity: 1, y: 0, scale: 1 })
      return
    }
    controls.start({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: 'easeOut' } })
  }, [controls, effectivePrefersReduced, direction])

  return (
    <>
      <AnimatePresence>
        <div className="relative inline-block">
          {!effectivePrefersReduced && inline && typeof pulseKey === 'number' && (
            <motion.span
              key={`pulse-${pulseKey}`}
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ opacity: 0.56, scale: 0.6 }}
              animate={{ opacity: 0, scale: 1.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{ boxShadow: '0 0 0 6px rgba(124, 234, 255, 0.12)' }}
            />
          )}

          <motion.button
            key={`${inline ? 'inline' : 'float'}-${direction ?? 'down'}`}
            layoutId="hire-cta"
            onClick={openModal}
            aria-label="Hire Pedro"
            className={buttonClass}
            initial={effectivePrefersReduced ? undefined : { opacity: 0, y: (direction === 'down' ? 18 : -18), scale: 0.94 }}
            animate={controls}
            exit={effectivePrefersReduced ? undefined : { opacity: 0, y: (direction === 'down' ? 10 : -10), scale: 0.96 }}
            transition={effectivePrefersReduced ? undefined : { duration: 0.32, ease: 'easeOut' }}
            whileHover={effectivePrefersReduced ? undefined : { scale: 1.06 }}
            whileTap={effectivePrefersReduced ? undefined : { scale: 0.98 }}
          >
            Hire me
          </motion.button>
        </div>
      </AnimatePresence>

      <HireModal open={open} closeModal={closeModal} prefersReduced={effectivePrefersReduced} />
    </>
  )
}

function HireModal({ open, closeModal, prefersReduced }: { readonly open: boolean; readonly closeModal: () => void; readonly prefersReduced: boolean }) {
  const previouslyFocused = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement as HTMLElement | null

  const root = document.querySelector('[data-hire-modal]')
  const focusableSelector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  const focusable = root ? Array.from(root.querySelectorAll<HTMLElement>(focusableSelector)) : []
  const first = focusable[0]
  const last = focusable.at(-1)
    first?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeModal()
        return
      }
      if (e.key === 'Tab') {
        if (!focusable.length) {
          e.preventDefault()
          return
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previouslyFocused.current?.focus()
    }
  }, [open, closeModal])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />

          <motion.dialog
            data-hire-modal
            open
            aria-labelledby="hire-title"
            className="relative bg-space-900 rounded-2xl p-8 shadow-2xl w-full max-w-md mx-4 text-center"
            initial={prefersReduced ? undefined : { opacity: 0, scale: 0.98 }}
            animate={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: prefersReduced ? 0 : 0.34, ease: 'easeInOut' }}
          >
            <h3 id="hire-title" className="text-2xl font-bold mb-2">Let's build something together</h3>
            <p className="text-text-200 mb-4">I'm open to software engineering roles broadly, with a preference for data science and AI. Reach out and let's chat.</p>

            {/* X button to close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-text-300 hover:text-accent-400 transition-colors outline-none"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>

            <div className="flex items-center justify-center gap-6 text-2xl text-accent-300 mb-4">
              <a href="mailto:pedrobfh@gmail.com" onClick={() => trackEvent('hire_click_email')} aria-label="Email">
                <FaEnvelope />
              </a>
              <a href="https://github.com/PedroGF45" target="_blank" rel="noreferrer" onClick={() => trackEvent('hire_click_github')} aria-label="GitHub">
                <FaGithub />
              </a>
            </div>

            <div className="flex justify-center">
              <a href="mailto:pedrobfh@gmail.com" className="px-6 py-3 bg-accent-500 text-space-950 rounded-md font-semibold hover:bg-accent-400 transition-colors" onClick={() => trackEvent('hire_send_email')}>Email me</a>
            </div>
          </motion.dialog>
        </div>
      )}
    </AnimatePresence>
  )
}
