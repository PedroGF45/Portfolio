export function trackEvent(name: string, payload: Record<string, any> = {}) {
  try {
    const data = { event: name, ...payload }
    // Push to dataLayer if present (Google Tag Manager style)
    if (Array.isArray((globalThis as any).dataLayer)) {
      (globalThis as any).dataLayer.push(data)
    } else if (typeof (globalThis as any).gtag === 'function') {
      ;(globalThis as any).gtag('event', name, payload)
    } else {
      // fallback: console
      // Keep output small and helpful for debugging
      // eslint-disable-next-line no-console
      console.log('trackEvent', data)
    }
  } catch {
    // intentionally ignore analytics errors
  }
}
