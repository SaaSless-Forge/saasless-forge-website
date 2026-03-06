import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionWrapper } from '@/components/sections/SectionWrapper'

const stats = [
  {
    stat: '100%',
    label: 'Yours',
    description: 'You own every line of code. No licensing, no lock-in.',
  },
  {
    stat: '1:1',
    label: 'Direct Access',
    description:
      'Work with the person building your software. No account managers.',
  },
  {
    stat: 'Weeks',
    label: 'Not Months',
    description: 'We ship fast without cutting corners.',
  },
  {
    stat: '$0',
    label: 'Per Seat',
    description: 'No recurring SaaS fees. Pay once, own forever.',
  },
]

function StatCard({ stat, label, description, index }) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <motion.div
      ref={ref}
      className="glass rounded-2xl p-8 text-center lg:text-left"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div className="text-5xl sm:text-6xl font-heading font-extrabold text-gradient leading-none">
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
          Why{' '}
          <span className="text-gradient">SaaSless?</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Because your business deserves software that works for you, not the
          other way around.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map((item, index) => (
          <StatCard key={item.stat} {...item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  )
}
