import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

export function SectionWrapper({ children, className, dark = true, id, borderTop = false }) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section
      id={id}
      className={cn(
        'py-24 px-4 sm:px-6 lg:px-8',
        dark ? 'bg-brand-base' : 'bg-brand-surfaceLow',
        borderTop && 'border-t-4 border-brand-outlineVariant',
        className
      )}
    >
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 40, filter: 'blur(6px)' }
        }
        transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}
