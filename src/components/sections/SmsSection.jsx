import { MessageSquare, Check } from 'lucide-react'
import { SectionWrapper } from '@/components/sections/SectionWrapper'
import { Button } from '@/components/ui/button'
import { useSmsWaitlist } from '@/hooks/useSmsWaitlist'
import content from '@/content/sms.json'

export function SmsSection() {
  const { openSmsWaitlist } = useSmsWaitlist()

  return (
    <SectionWrapper id="sms" dark={true} borderTop>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-brand-surfaceHigh">
            <MessageSquare className="w-3.5 h-3.5 text-brand-amber" />
            <span className="text-xs font-heading font-bold text-brand-amber uppercase tracking-widest">
              {content.eyebrow}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white uppercase tracking-tight leading-tight">
            {content.headline}{' '}
            <span className="text-brand-amber">{content.headlineAccent}</span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="lg:col-span-5 bg-brand-surfaceHigh p-8">
          <ul className="space-y-4 mb-8">
            {content.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-brand-amber flex-shrink-0 mt-0.5" />
                <span className="text-sm text-brand-secondary leading-relaxed">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            onClick={openSmsWaitlist}
            className="w-full bg-brand-amber text-brand-amberDark hover:bg-brand-amberHover font-bold text-base py-6"
          >
            {content.buttonText}
          </Button>

          <p className="mt-4 text-xs text-muted-foreground text-center">
            {content.footnote}
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
