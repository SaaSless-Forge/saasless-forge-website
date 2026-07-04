import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { EmberCanvas } from '@/components/effects/EmberCanvas'
import { MagneticButton } from '@/components/effects/MagneticButton'
import { useContactForm } from '@/hooks/useContactForm'
import content from '@/content/hero.json'
import whyUs from '@/content/why-us.json'

const stamp = {
  hidden: { opacity: 0, y: 56, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.12,
      duration: 0.8,
      ease: [0.2, 0, 0, 1],
    },
  }),
}

// Split the CMS headline so the word "forged" (if present) gets its own
// molten line, prototype-style. Falls back to a single plain line.
function headlineLines(headline) {
  const words = headline.split(' ')
  const forgedIndex = words.findIndex((w) => /forged/i.test(w))
  if (forgedIndex === -1) return [{ text: headline, molten: false }]
  const before = words.slice(0, forgedIndex).join(' ')
  const forged = words[forgedIndex]
  const after = words.slice(forgedIndex + 1).join(' ')
  return [
    before && { text: before, molten: false },
    { text: forged, molten: true },
    after && { text: after, molten: false },
  ].filter(Boolean)
}

export function HeroSection() {
  const { openContactForm } = useContactForm()
  const lines = headlineLines(content.headline)

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden grain heat-glow bg-gradient-brand">
      <EmberCanvas className="z-[1]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-28 sm:px-6 lg:px-8">
        <motion.p
          custom={0}
          variants={stamp}
          initial="hidden"
          animate="visible"
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-amber"
        >
          SaaSless Forge — Custom Software Studio
        </motion.p>

        <h1 className="flex flex-col font-heading font-bold uppercase leading-[1.02] tracking-[-0.04em] text-white text-[clamp(3.2rem,11vw,8rem)]">
          {lines.map((line, i) => (
            <motion.span
              key={line.text}
              custom={i + 1}
              variants={stamp}
              initial="hidden"
              animate="visible"
              className={line.molten ? 'text-molten' : undefined}
            >
              {line.text}
            </motion.span>
          ))}
        </h1>

        <motion.p
          custom={lines.length + 1}
          variants={stamp}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-xl font-heading text-lg font-medium text-brand-amber sm:text-xl"
        >
          {content.subheading}
        </motion.p>

        <motion.p
          custom={lines.length + 2}
          variants={stamp}
          initial="hidden"
          animate="visible"
          className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          {content.description}
        </motion.p>

        <motion.div
          custom={lines.length + 3}
          variants={stamp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <MagneticButton>
            <Button
              size="lg"
              onClick={openContactForm}
              className="ember-hover bg-brand-amber px-8 py-6 text-base font-semibold text-brand-amberDark hover:bg-brand-amberHover"
            >
              {content.primaryButtonText}
            </Button>
          </MagneticButton>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-brand-secondary px-8 py-6 text-base font-semibold text-brand-secondary hover:bg-brand-surfaceHigh"
          >
            {content.secondaryButtonText}
          </Button>
        </motion.div>
      </div>

      <motion.div
        custom={lines.length + 4}
        variants={stamp}
        initial="hidden"
        animate="visible"
        className="relative z-10 border-t border-white/10"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-5 px-4 py-7 sm:px-6 md:grid-cols-4 lg:px-8">
          {whyUs.stats.map(({ stat, label }) => (
            <div key={label}>
              <span className="block font-heading text-2xl font-bold tracking-[-0.02em] text-white">
                {stat}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-outline">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
