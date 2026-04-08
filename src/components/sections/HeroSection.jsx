import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useContactForm } from '@/hooks/useContactForm'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.2, 0, 0, 1],
    },
  }),
}

export function HeroSection() {
  const { openContactForm } = useContactForm()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Metallic gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(45deg, #353534 0%, #0E0E0E 100%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight tracking-[-0.04em]"
        >
          Software That Fits.
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-brand-amber"
        >
          No templates. No bloat. Just yours.
        </motion.p>

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          We build custom software that replaces the SaaS tools draining your
          budget. You own every line of code, forever.
        </motion.p>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={openContactForm}
            className="bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-semibold text-base px-8 py-6"
          >
            Book a Discovery Call
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-brand-secondary text-brand-secondary hover:bg-brand-surfaceHigh font-semibold text-base px-8 py-6"
          >
            See How It Works
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
