import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

export function SectionWrapper({ children, className, dark = true, id }) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section
      id={id}
      className={cn(
        'py-24 px-4 sm:px-6 lg:px-8',
        dark ? 'bg-brand-charcoal' : 'bg-[#131B2E]',
        className
      )}
    >
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  )
}
