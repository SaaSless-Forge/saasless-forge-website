import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useContactForm } from '@/hooks/useContactForm'
import { Button } from '@/components/ui/button'
import content from '@/content/cta.json'

export function CTASection() {
  const { ref, isInView } = useScrollAnimation()
  const { openContactForm } = useContactForm()

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t-4 border-brand-outlineVariant">
      {/* Metallic gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(45deg, #353534 0%, #0E0E0E 100%)' }}
        aria-hidden="true"
      />

      <motion.div
        ref={ref}
        className="relative z-10 max-w-5xl mx-auto text-left"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight uppercase tracking-tight">
          {content.headline}
        </h2>
        <p className="mt-6 text-sm sm:text-base text-brand-secondary max-w-2xl leading-relaxed">
          {content.description}
        </p>
        <div className="mt-10">
          <Button
            size="lg"
            onClick={openContactForm}
            className="bg-brand-amber text-brand-amberDark hover:bg-brand-amberHover font-bold text-base px-10 py-6"
          >
            {content.buttonText}
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
