import { Globe, Wrench, Zap, ArrowRightLeft, Rocket, RefreshCw } from 'lucide-react'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { cn } from '@/lib/utils'
import content from '@/content/services.json'

const icons = [Globe, Wrench, Zap, ArrowRightLeft, Rocket, RefreshCw]

function ServiceCard({ icon: Icon, title, description }) {
  return (
    <div
      className="group bg-brand-surfaceHigh p-8 transition-colors duration-300 hover:bg-brand-surfaceHighest"
    >
      <div className="mb-5 inline-flex items-center justify-center w-12 h-12 bg-brand-surfaceHighest">
        <Icon className="w-6 h-6 text-brand-amber" />
      </div>
      <h3 className="text-xl font-heading font-bold text-white mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

export function ServicesSection() {
  return (
    <SectionWrapper id="services" dark={false}>
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white">
          {content.headline}{' '}
          <span className="text-brand-amber">{content.headlineAccent}</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {content.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.services.map((service, index) => (
          <ServiceCard key={service.title} icon={icons[index] || Globe} {...service} />
        ))}
      </div>
    </SectionWrapper>
  )
}
