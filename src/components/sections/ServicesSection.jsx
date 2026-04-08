import { Globe, Wrench, Zap, ArrowRightLeft, Rocket, RefreshCw } from 'lucide-react'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { cn } from '@/lib/utils'
import content from '@/content/services.json'

const icons = [Globe, Wrench, Zap, ArrowRightLeft, Rocket, RefreshCw]

function ServiceCard({ icon: Icon, title, description, index }) {
  return (
    <div
      className="group relative bg-brand-surfaceHigh p-8 transition-colors duration-300 hover:bg-brand-surfaceHighest overflow-hidden"
    >
      <span className="absolute top-2 right-4 text-6xl font-heading font-extrabold text-white/[0.03] select-none" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="relative">
        <div className="mb-5 inline-flex items-center justify-center w-12 h-12 bg-brand-surfaceHighest">
          <Icon className="w-6 h-6 text-brand-amber" />
        </div>
        <h3 className="text-lg font-heading font-bold text-white mb-2 uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export function ServicesSection() {
  return (
    <SectionWrapper id="services" dark={false} borderTop>
      <div className="mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white uppercase tracking-tight">
          {content.headline}{' '}
          <span className="text-brand-amber">{content.headlineAccent}</span>
        </h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl">
          {content.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.services.map((service, index) => (
          <ServiceCard key={service.title} icon={icons[index] || Globe} index={index} {...service} />
        ))}
      </div>
    </SectionWrapper>
  )
}
