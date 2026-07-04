import { useEffect, useRef } from 'react'

// Pre-rendered radial ember sprite — drawing gradients per-particle per-frame is too slow
function makeSprite() {
  const sprite = document.createElement('canvas')
  sprite.width = sprite.height = 32
  const ctx = sprite.getContext('2d')
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  g.addColorStop(0, 'rgba(255, 232, 210, 1)')
  g.addColorStop(0.3, 'rgba(255, 182, 140, 0.85)')
  g.addColorStop(0.7, 'rgba(180, 101, 49, 0.35)')
  g.addColorStop(1, 'rgba(180, 101, 49, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 32, 32)
  return sprite
}

function spawn(width, height, anywhere) {
  const spark = Math.random() < 0.12
  return {
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : height + 20,
    vy: spark ? -(1.4 + Math.random() * 2.2) : -(0.3 + Math.random() * 1.2),
    sway: Math.random() * Math.PI * 2,
    swaySpeed: 0.004 + Math.random() * 0.012,
    size: spark ? 2 + Math.random() * 3 : 3 + Math.random() * 8,
    life: 0.5 + Math.random() * 0.5,
    decay: spark ? 0.004 + Math.random() * 0.004 : 0.001 + Math.random() * 0.002,
    bright: spark ? 1 : 0.55 + Math.random() * 0.45,
  }
}

/**
 * Rising ember particles on a transparent canvas. Fills its nearest
 * positioned ancestor — place inside a `relative` container.
 * Pauses offscreen and when the tab is hidden; renders nothing under
 * prefers-reduced-motion.
 */
export function EmberCanvas({ className = '', density = 1 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    const sprite = makeSprite()
    let particles = []
    let rafId = null
    let visible = true

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const base = window.innerWidth < 700 ? 70 : 140
      const count = Math.round(base * density)
      particles = Array.from({ length: count }, () =>
        spawn(canvas.width, canvas.height, true)
      )
    }

    const tick = () => {
      rafId = null
      if (!visible || document.hidden) return
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'
      const speedScale = height / 900
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.y += p.vy * speedScale
        p.sway += p.swaySpeed
        p.x += Math.sin(p.sway) * 0.45
        p.life -= p.decay
        if (p.life <= 0 || p.y < -24) particles[i] = spawn(width, height, false)
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life)) * p.bright
        ctx.drawImage(sprite, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      rafId = requestAnimationFrame(tick)
    }

    const start = () => {
      if (rafId === null && visible && !document.hidden) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      start()
    })
    io.observe(canvas)

    const onVisibility = () => start()
    document.addEventListener('visibilitychange', onVisibility)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)

    resize()
    start()

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
