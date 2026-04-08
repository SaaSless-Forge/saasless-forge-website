import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      key="loading-screen"
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-base"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center">
        <motion.h1
          className="text-5xl sm:text-6xl font-heading font-extrabold text-brand-amber"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          SaaSless Forge
        </motion.h1>
        <motion.div
          className="mt-4 text-xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Software That Fits
        </motion.div>
      </div>
    </motion.div>
  )
}
