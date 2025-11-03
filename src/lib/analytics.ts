import { track } from '@vercel/analytics'

export function trackEvent(name: string, payload: Record<string, any> = {}) {
  try {
    // Track with Vercel Analytics
    track(name, payload)
    
    // Also support Google Analytics if present
    const data = { event: name, ...payload }
    if (Array.isArray((globalThis as any).dataLayer)) {
      (globalThis as any).dataLayer.push(data)
    } else if (typeof (globalThis as any).gtag === 'function') {
      ;(globalThis as any).gtag('event', name, payload)
    } else if (import.meta.env?.MODE === 'development') {
      // eslint-disable-next-line no-console
      console.log('trackEvent', data)
    }
  } catch {
    // intentionally ignore analytics errors
  }
}
