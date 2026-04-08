import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { cn } from '@/lib/utils'

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description:
      'We dig into your problem, your workflow, and your vision. No pitch deck required.',
  },
  {
    number: '02',
    title: 'Blueprint & Estimate',
    description:
      'You get a clear plan with fixed pricing. No surprises, no scope creep.',
  },
  {
    number: '03',
    title: 'Build Sprint',
    description:
      'We build in focused sprints with weekly demos. You see progress, not promises.',
  },
  {
    number: '04',
    title: 'Launch & Handoff',
    description:
      'Your software goes live. You own everything — code, data, the whole thing.',
  },
]

function StepCard({ number, title, description, index, isLast }) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 lg:gap-8"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.2, 0, 0, 1] }}
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-14 h-14 bg-brand-amber shrink-0">
          <span className="text-lg font-heading font-bold text-brand-amberDark">
            {number}
          </span>
        </div>
        {!isLast && (
          <div className="w-[2px] flex-1 mt-3 bg-brand-outlineVariant min-h-[40px]" />
        )}
      </div>

      {/* Content */}
      <div className={cn('pb-12', isLast && 'pb-0')}>
        <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
          How It{' '}
          <span className="text-brand-amber">Works</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A straightforward process designed to get you from idea to launch
          without the runaround.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <StepCard
            key={step.number}
            {...step}
            index={index}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
