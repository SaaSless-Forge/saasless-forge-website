import { motion } from 'framer-motion'
import { Scissors, Eye, Fingerprint, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { useContactForm } from '@/hooks/useContactForm'

// Value cards data
const values = [
  {
    icon: Scissors,
    title: 'No Bloat',
    description: 'We build exactly what you need — nothing more, nothing less. Every feature earns its place.',
  },
  {
    icon: Eye,
    title: 'No Black Box',
    description: 'You own your code, your data, and your infrastructure. Full transparency, always.',
  },
  {
    icon: Fingerprint,
    title: 'No Assembly Line',
    description: 'Every project gets personal attention from senior developers. No juniors, no handoffs.',
  },
  {
    icon: Target,
    title: 'No Nonsense',
    description: 'Fixed pricing, clear timelines, weekly demos. We respect your time and your budget.',
  },
]

export default function About() {
  const { openContactForm } = useContactForm()

  return (
    <div className="min-h-screen">
      {/* Section 1: About Hero */}
      <SectionWrapper dark id="about-hero">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-brand-amber mb-8">
            Built Different. On Purpose.
          </h1>
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-brand-secondary leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SaaSless Forge is a custom software studio founded on a simple
            belief: businesses deserve software that's built for them — not
            rented from someone else. We saw too many companies forced into
            cookie-cutter SaaS tools that sort of worked, kind of fit, and
            definitely cost too much. So we started building the alternative.
          </motion.p>
          <motion.p
            className="text-lg sm:text-xl text-brand-outline leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Every project starts with a conversation, not a sales pitch. We
            listen first, plan carefully, and build fast — because your time
            matters as much as your budget.
          </motion.p>
        </motion.div>
      </SectionWrapper>

      {/* Section 2: Mission & Values */}
      <SectionWrapper id="mission-values">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-brand-amber mb-4">
            What We Stand For
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                className="group bg-brand-surfaceHigh p-8 transition-colors duration-300 hover:bg-brand-surfaceHighest"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-amber flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand-amberDark" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-brand-outline leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </SectionWrapper>

      {/* Section 3: What "SaaSless" Means */}
      <SectionWrapper className="bg-gradient-subtle" id="saasless-meaning">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-brand-amber mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why "SaaSless"?
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-brand-secondary leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            SaaS changed the world — but it also created a world of monthly
            fees, vendor lock-in, and one-size-fits-all solutions. "SaaSless"
            means taking back ownership. It means custom software that you pay
            for once and own forever. No per-seat pricing. No feature gates. No
            begging for integrations. Just software that fits your business like
            a glove.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-xl font-heading font-semibold text-white">
              Sounds good?
            </p>
            <Button
              size="lg"
              onClick={openContactForm}
              className="bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-heading font-bold text-lg px-8 py-6"
            >
              Let's Talk
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  )
}
