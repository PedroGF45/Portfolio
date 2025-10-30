import React from 'react'
// framer-motion not required here; ScrollCue uses simple motion where available
import { trackEvent } from '../lib/analytics'

// Try to load an optional Lottie animation from public/animations/comet.json.
// If lottie-web isn't available or the file is missing, fall back to the inline SVG.

type Props = { readonly targetId?: string }

export default function ScrollCue({ targetId = 'projects' }: Props) {
  // respect OS reduced-motion or user's saved preference
  const prefersReduced = !!(
    (typeof globalThis.matchMedia === 'function' && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
    globalThis.localStorage?.getItem('animationsDisabled') === 'true'
  )

  const containerRef = React.useRef<HTMLDivElement | null>(null)

  function scrollToTarget() {
    const el = document.getElementById(targetId)
    trackEvent('scroll_cue_click', { target: targetId })
    if (!el) return
    el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
  }

  React.useEffect(() => {
    if (prefersReduced) return
    let cancelled = false
    async function tryLoadLottie() {
      try {
          const lottieModule: any = await import('lottie-web')
          const res = await fetch('/animations/comet.json')
          if (!res.ok || cancelled) return
          const data = await res.json()
          if (containerRef.current && !cancelled) {
            lottieModule.loadAnimation({
              container: containerRef.current,
              renderer: 'svg',
              loop: true,
              autoplay: true,
              animationData: data,
            })
          }
        } catch {
          // fail silently and let the fallback SVG render
        }
    }
    tryLoadLottie()
    return () => { cancelled = true }
  }, [prefersReduced])

  return (
    <button onClick={scrollToTarget} aria-label="Scroll to content" className="flex flex-col items-center gap-2 focus:outline-none">
      {/* Lottie container (if available) - falls back to inline SVG if lottie or JSON is missing */}
      <div ref={containerRef} style={{ width: 72, height: 48 }} aria-hidden="true">
        {/* Fallback inline SVG (calm palette) */}
        <svg width="72" height="48" viewBox="0 0 72 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={prefersReduced ? '' : 'animate-bounce-slow'}>
          <defs>
            <linearGradient id="cg" x1="0" x2="1">
              <stop offset="0%" stopColor="#9fdde9" />
              <stop offset="100%" stopColor="#d9c9ff" />
            </linearGradient>
          </defs>
          <circle cx="36" cy="24" r="34" fill="url(#cg)" fillOpacity="0.03" />
          <path d="M8 12 C 30 18, 38 22, 54 26" stroke="url(#cg)" strokeWidth={5} strokeLinecap="round" strokeOpacity="0.22" style={{ filter: 'blur(4px)' }} />
          <circle cx="18" cy="16" r="5" fill="#fff" />
        </svg>
      </div>

      <span className="text-sm text-accent-300">Scroll</span>
    </button>
  )
}

// tiny animation helper: bounce-slow
// We'll add a small utility in CSS if Tailwind doesn't provide the exact timing.
