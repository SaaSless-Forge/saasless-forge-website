import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { cn } from '@/lib/utils'
import content from '@/content/how-it-works.json'

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
      {/* Step marker — ignites when reached */}
      <div
        className={cn(
          'relative z-10 flex items-center justify-center w-14 h-14 shrink-0 transition-all duration-500',
          isInView
            ? 'bg-brand-amber shadow-[0_0_20px_rgba(255,182,140,0.45)]'
            : 'bg-brand-surfaceHigh border-2 border-brand-outlineVariant'
        )}
      >
        <span
          className={cn(
            'text-lg font-heading font-bold transition-colors duration-500',
            isInView ? 'text-brand-amberDark' : 'text-brand-outline'
          )}
        >
          {number}
        </span>
      </div>

      {/* Content */}
      <div className={cn('pb-12', isLast && 'pb-0')}>
        <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-2 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export function HowItWorksSection() {
  const railRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 0.75', 'end 0.55'],
  })
  const heat = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <SectionWrapper id="how-it-works" borderTop>
      <div className="mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white uppercase tracking-tight">
          {content.headline}{' '}
          <span className="text-brand-amber">{content.headlineAccent}</span>
        </h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl">
          {content.description}
        </p>
      </div>

      <div ref={railRef} className="relative max-w-2xl">
        {/* Cold rail */}
        <div
          className="absolute left-[26px] top-0 bottom-0 w-[2px] bg-brand-outlineVariant"
          aria-hidden="true"
        />
        {/* Heat fill — glows down the rail as you scroll */}
        <motion.div
          className="absolute left-[26px] top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-brand-amberContainer via-brand-amber to-brand-amber shadow-[0_0_16px_rgba(255,182,140,0.6)]"
          style={{ scaleY: heat }}
          aria-hidden="true"
        />
        {content.steps.map((step, index) => (
          <StepCard
            key={step.number}
            {...step}
            index={index}
            isLast={index === content.steps.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
