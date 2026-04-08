import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import content from '@/content/why-us.json'

function StatCard({ stat, label, description, index }) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <motion.div
      ref={ref}
      className="bg-brand-surfaceHigh p-8 text-center lg:text-left"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0, 0, 1] }}
    >
      <div className="text-5xl sm:text-6xl font-heading font-extrabold text-brand-amber leading-none">
        {stat}
      </div>
      <div className="mt-2 text-xl font-heading font-bold text-white">
        {label}
      </div>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

export function WhyUsSection() {
  return (
    <SectionWrapper id="why-us" dark={false}>
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
          {content.headline}{' '}
          <span className="text-brand-amber">{content.headlineAccent}</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {content.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {content.stats.map((item, index) => (
          <StatCard key={item.stat} {...item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  )
}
