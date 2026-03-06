import { Globe, Wrench, Zap, ArrowRightLeft, Rocket, RefreshCw } from 'lucide-react'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: Globe,
    title: 'Custom Web Apps',
    description: 'Full-stack applications built to your exact specifications.',
  },
  {
    icon: Wrench,
    title: 'Internal Tools',
    description:
      'Dashboards, admin panels, and workflow tools your team actually wants to use.',
  },
  {
    icon: Zap,
    title: 'SaaS Alternatives',
    description: 'Own your software instead of renting it. No per-seat fees, ever.',
  },
  {
    icon: ArrowRightLeft,
    title: 'Automation & Integration',
    description: 'Connect your tools and automate the tedious stuff.',
  },
  {
    icon: Rocket,
    title: 'MVP Development',
    description: 'Go from idea to working product in weeks, not months.',
  },
  {
    icon: RefreshCw,
    title: 'Legacy Modernization',
    description: 'Breathe new life into outdated systems without starting over.',
  },
]

function ServiceCard({ icon: Icon, title, description }) {
  return (
    <div
      className={cn(
        'group glass rounded-2xl p-8 transition-all duration-300',
        'hover:-translate-y-1 hover:border-brand-violet/40 hover:shadow-lg hover:shadow-brand-violet/10'
      )}
    >
      <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-violet/15">
        <Icon className="w-6 h-6 text-brand-violet" />
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
          What We{' '}
          <span className="text-gradient">Build</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          From MVPs to enterprise platforms, we build the software that SaaS
          companies wish they could sell you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </SectionWrapper>
  )
}
