import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated gradient blobs */}
      <div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-brand-violet/20 blur-3xl animate-blob-float"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-brand-cyan/20 blur-3xl animate-blob-float"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-brand-coral/20 blur-3xl animate-blob-float"
        style={{ animationDelay: '4s' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Badge className="bg-brand-violet/20 text-brand-violet border-brand-violet/30 hover:bg-brand-violet/30 text-sm px-4 py-1.5 mb-8">
            Custom Software Studio
          </Badge>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight tracking-tight"
        >
          Software That Fits.
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gradient"
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
            className="bg-brand-coral hover:bg-brand-coral/90 text-white font-semibold text-base px-8 py-6 rounded-xl shadow-lg shadow-brand-coral/25 transition-all hover:shadow-xl hover:shadow-brand-coral/30 hover:scale-[1.02]"
          >
            Book a Discovery Call
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 font-semibold text-base px-8 py-6 rounded-xl transition-all"
          >
            See How It Works
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
