import React from 'react'

type Star = {
  x: number
  y: number
  z: number
  size: number
  speed: number
  twinkle: number
}

export default function BackgroundSpaceNew() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const rafRef = React.useRef<number | null>(null)
  const pointerRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const starsRef = React.useRef<Star[]>([])

  React.useEffect(() => {
  if (!('window' in globalThis)) return

  const prefersReduced = !!(
    (typeof globalThis.matchMedia === 'function' && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
    globalThis.localStorage?.getItem('animationsDisabled') === 'true'
  )
    const canvas = canvasRef.current!
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

  let w = globalThis.innerWidth
  let h = globalThis.innerHeight
  const dpr = Math.max(1, globalThis.devicePixelRatio || 1)

    function resize() {
      w = globalThis.innerWidth
      h = globalThis.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStars()
    }

    function rand(min: number, max: number) { return Math.random() * (max - min) + min }

    function initStars() {
      const count = Math.floor((w * h) / 14000) // reduced density for a gentler look
      const stars: Star[] = []
      for (let i = 0; i < count; i++) {
        const z = Math.random() // depth
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          size: Math.max(0.28, Math.random() * 1.4) * (1 + (1 - z)),
          speed: rand(4, 18) * (0.15 + (1 - z)),
          twinkle: Math.random() * Math.PI * 2,
        })
      }
      starsRef.current = stars
    }

    function draw(timestamp: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)

      // subtle nebula overlay (manual radial gradients) behind stars
      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, 'rgba(8,10,20,0.12)')
      g.addColorStop(0.5, 'rgba(14,22,48,0.06)')
      g.addColorStop(1, 'rgba(6,8,18,0.12)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      const px = pointerRef.current.x
      const py = pointerRef.current.y

      for (const s of starsRef.current) {
        // parallax shift based on pointer and depth
        const parx = (px - w / 2) * (1 - s.z) * 0.01
        const pary = (py - h / 2) * (1 - s.z) * 0.01

        const x = (s.x + parx + (timestamp / 1000) * (s.speed * (1 - s.z) * 0.02)) % (w + 20)
        const y = (s.y + pary + Math.sin(s.twinkle + timestamp / 1000 * (0.6 + s.z)) * 0.6) % h

        const intensity = 0.5 + (1 - s.z) * 0.45 + Math.sin(s.twinkle + timestamp / 700) * 0.11
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, intensity)})`
        ctx.arc(x, y < 0 ? y + h : y, s.size, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!prefersReduced) rafRef.current = requestAnimationFrame(draw)
    }

    function onMove(e: MouseEvent) {
      pointerRef.current.x = e.clientX
      pointerRef.current.y = e.clientY
    }

    function onTouch(e: TouchEvent) {
      const t = e.touches?.[0]
      if (t) {
        pointerRef.current.x = t.clientX
        pointerRef.current.y = t.clientY
      }
    }

  // setup
    resize()
    globalThis.addEventListener('resize', resize)
    globalThis.addEventListener('mousemove', onMove, { passive: true })
    globalThis.addEventListener('touchmove', onTouch, { passive: true })

    if (prefersReduced) {
      // draw one static frame for reduced-motion preference
      draw(0)
    } else {
      rafRef.current = requestAnimationFrame(draw)
    }

    // occasional shooting/star events
    let shootingTimer = globalThis.setInterval(() => {
      if (prefersReduced) return
      spawnShootingStar()
    }, 14000)

    // backdrop parallax on scroll (subtle)
    let latestScroll = 0
    let rafId: number | null = null
    const layers = Array.from(document.querySelectorAll<HTMLElement>('.stars-layer'))
    const nebula = document.getElementById('nebula-overlay')

    function applyParallax() {
      const scrollY = latestScroll
      // calm multipliers
      const mults = [0.02, 0.012, 0.007]
      let i = 0
      for (const el of layers) {
        const y = scrollY * (mults[i] || 0)
        el.style.transform = `translate3d(0, ${y}px, 0)`
        i++
      }
      if (nebula) nebula.style.transform = `translate3d(0, ${scrollY * 0.01}px, 0)`
      rafId = null
    }

    function onScroll() {
      latestScroll = globalThis.scrollY || globalThis.pageYOffset || 0
      if (!rafId) rafId = requestAnimationFrame(applyParallax)
    }

    if (!prefersReduced) {
      globalThis.addEventListener('scroll', onScroll, { passive: true })
      // initialize position
      latestScroll = globalThis.scrollY || globalThis.pageYOffset || 0
      applyParallax()
    }

    function spawnShootingStar() {
      const ctxLocal = ctx
      const startX = Math.random() * w * 0.5
      const startY = Math.random() * h * 0.6
      const len = Math.random() * 220 + 120
      const angle = Math.random() * -0.8 - 0.2
      const speed = Math.random() * 12 + 10
      let progress = 0

      function step() {
        progress += speed
        // draw a brief bright streak
        ctxLocal.save()
        ctxLocal.globalCompositeOperation = 'lighter'
        ctxLocal.strokeStyle = 'rgba(255,255,255,0.8)'
        ctxLocal.lineWidth = 2
        ctxLocal.beginPath()
        ctxLocal.moveTo(startX + Math.cos(angle) * progress, startY + Math.sin(angle) * progress)
        ctxLocal.lineTo(startX + Math.cos(angle) * (progress - len), startY + Math.sin(angle) * (progress - len))
        ctxLocal.stroke()
        ctxLocal.restore()
        if (progress < w * 1.2) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    return () => {
      globalThis.removeEventListener('resize', resize)
      globalThis.removeEventListener('mousemove', onMove)
      globalThis.removeEventListener('touchmove', onTouch)
      if (!prefersReduced) globalThis.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (rafId) cancelAnimationFrame(rafId)
      clearInterval(shootingTimer)
    }
  }, [])

  return (
    <div className="background-space fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* decorative star layers (CSS-driven, keep for color and subtle parallax) */}
      <div className="stars-layer layer-1" />
      <div className="stars-layer layer-2" />
      <div className="stars-layer layer-3" />

      {/* canvas on top of CSS layers for performant movement/twinkle */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* nebula / interstellar tint — leave as decorative overlay (targetable for parallax) */}
      <div id="nebula-overlay" className="absolute inset-0 bg-gradient-to-br from-[#03040a]/40 via-[#071428]/20 to-transparent" />
    </div>
  )
}
