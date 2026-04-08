import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import content from '@/content/testimonials.json'

function TestimonialCard({ quote, author, role, index }) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <motion.div
      ref={ref}
      className="relative bg-brand-surfaceHigh p-8 h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.2, 0, 0, 1] }}
    >
      <div>
        <blockquote className="text-lg text-white/90 leading-relaxed mb-6">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div>
          <div className="font-heading font-bold text-white">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function SocialProofSection() {
  return (
    <SectionWrapper id="testimonials">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
          {content.headline}{' '}
          <span className="text-brand-amber">{content.headlineAccent}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.testimonials.map((testimonial, index) => (
          <TestimonialCard key={testimonial.author} {...testimonial} index={index} />
        ))}
      </div>
    </SectionWrapper>
  )
}
