import { ArrowRight, MessageSquare } from 'lucide-react'
import { useSmsWaitlist } from '@/hooks/useSmsWaitlist'

export default function AnnouncementBar() {
  const { openSmsWaitlist } = useSmsWaitlist()

  return (
    <button
      type="button"
      onClick={openSmsWaitlist}
      className="group w-full bg-brand-amber text-brand-amberDark hover:bg-brand-amberHover transition-colors px-4 py-3 flex items-center justify-center gap-3 text-xs font-heading font-bold uppercase tracking-widest"
    >
      <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">New · SMS waitlist now open</span>
      <span className="sm:hidden">SMS waitlist open</span>
      <span className="inline-flex items-center gap-1">
        Join here
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </button>
  )
}
