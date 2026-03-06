import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Button } from '@/components/ui/button'

export function CTASection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-violet via-brand-violet/80 to-brand-cyan animate-gradient-shift"
        style={{ backgroundSize: '200% 200%' }}
        aria-hidden="true"
      />

      {/* Subtle overlay pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <motion.div
        ref={ref}
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
          Ready to Build Something Real?
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          Let&apos;s talk about your project. No commitment, no pitch — just a
          conversation about what&apos;s possible.
        </p>
        <div className="mt-10">
          <Button
            size="lg"
            className="bg-white text-brand-charcoal hover:bg-white/90 font-bold text-base px-10 py-6 rounded-xl shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl"
          >
            Book Your Free Discovery Call
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
