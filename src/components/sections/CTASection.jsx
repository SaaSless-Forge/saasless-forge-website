import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useContactForm } from '@/hooks/useContactForm'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/effects/MagneticButton'
import content from '@/content/cta.json'

// Last word of the CMS headline gets the molten treatment
function splitHeadline(headline) {
  const words = headline.trim().split(' ')
  if (words.length < 2) return { lead: '', molten: headline }
  return { lead: words.slice(0, -1).join(' '), molten: words[words.length - 1] }
}

export function CTASection() {
  const { ref, isInView } = useScrollAnimation()
  const { openContactForm } = useContactForm()
  const { lead, molten } = splitHeadline(content.headline)

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-t-4 border-brand-outlineVariant grain heat-glow">
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
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight uppercase tracking-tight">
          {lead && <>{lead} </>}
          <span className="text-molten">{molten}</span>
        </h2>
        <p className="mt-6 text-sm sm:text-base text-brand-secondary max-w-2xl leading-relaxed">
          {content.description}
        </p>
        <div className="mt-10">
          <MagneticButton className="inline-block">
            <Button
              size="lg"
              onClick={openContactForm}
              className="ember-hover bg-brand-amber text-brand-amberDark hover:bg-brand-amberHover font-bold text-base px-10 py-6"
            >
              {content.buttonText}
            </Button>
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  )
}
