import { motion } from 'framer-motion'
import { Scissors, Eye, Fingerprint, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { useContactForm } from '@/hooks/useContactForm'
import content from '@/content/about.json'

const valueIcons = [Scissors, Eye, Fingerprint, Target]

export default function About() {
  const { openContactForm } = useContactForm()

  return (
    <div className="min-h-screen">
      {/* Section 1: About Hero */}
      <SectionWrapper dark id="about-hero">
        <motion.div
          className="max-w-4xl text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-brand-amber mb-8 uppercase tracking-tight">
            {content.hero.headline}
          </h1>
          <motion.p
            className="text-sm sm:text-base text-brand-secondary leading-relaxed mb-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {content.hero.paragraph1}
          </motion.p>
          <motion.p
            className="text-sm sm:text-base text-brand-outline leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {content.hero.paragraph2}
          </motion.p>
        </motion.div>
      </SectionWrapper>

      {/* Section 2: Mission & Values */}
      <SectionWrapper id="mission-values" borderTop>
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-brand-amber mb-4 uppercase tracking-tight">
            {content.values.headline}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {content.values.items.map((value, index) => {
            const Icon = valueIcons[index] || Scissors
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
                    <h3 className="text-lg font-heading font-bold text-white mb-2 uppercase tracking-wide">
                      {value.title}
                    </h3>
                    <p className="text-sm text-brand-outline leading-relaxed">
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
      <SectionWrapper className="bg-gradient-subtle" id="saasless-meaning" borderTop>
        <div className="max-w-4xl text-left">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-brand-amber mb-8 uppercase tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {content.saaslessMeaning.headline}
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-brand-secondary leading-relaxed mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {content.saaslessMeaning.description}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-xl font-heading font-semibold text-white">
              {content.saaslessMeaning.ctaPrompt}
            </p>
            <Button
              size="lg"
              onClick={openContactForm}
              className="bg-brand-amber hover:bg-brand-amberHover text-brand-amberDark font-heading font-bold text-lg px-8 py-6"
            >
              {content.saaslessMeaning.buttonText}
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  )
}
