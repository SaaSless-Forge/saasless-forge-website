import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const PULL_RADIUS = 130
const MAX_PULL = 14

/**
 * Wraps children in a container that magnetically pulls toward the cursor
 * within PULL_RADIUS. Mouse-only (pointer: fine) and disabled under
 * prefers-reduced-motion — on touch devices it renders inert.
 */
export function MagneticButton({ children, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 22 })
  const springY = useSpring(y, { stiffness: 260, damping: 22 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reducedMotion) return

    const onMove = (e) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist < PULL_RADIUS && dist > 0) {
        const pull = (1 - dist / PULL_RADIUS) * MAX_PULL
        x.set((dx / dist) * pull)
        y.set((dy / dist) * pull)
      } else {
        x.set(0)
        y.set(0)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} className={className}>
      {children}
    </motion.div>
  )
}
