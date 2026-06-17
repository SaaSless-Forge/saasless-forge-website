import { ArrowRight, MessageSquare } from 'lucide-react'
import { SMS_SIGNUP_URL } from '@/lib/links'

export default function AnnouncementBar() {
  return (
    <a
      href={SMS_SIGNUP_URL}
      className="group w-full bg-brand-amber text-brand-amberDark hover:bg-brand-amberHover transition-colors px-4 py-3 flex items-center justify-center gap-3 text-xs font-heading font-bold uppercase tracking-widest"
    >
      <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">New · SMS for your business is live</span>
      <span className="sm:hidden">SMS is live</span>
      <span className="inline-flex items-center gap-1">
        Sign up
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </a>
  )
}
