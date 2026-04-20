import { createContext, useContext, useState } from 'react'
import { SmsWaitlistDialog } from '@/components/SmsWaitlistDialog'

const SmsWaitlistContext = createContext()

export function SmsWaitlistProvider({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <SmsWaitlistContext.Provider value={{ openSmsWaitlist: () => setOpen(true) }}>
      {children}
      <SmsWaitlistDialog open={open} onOpenChange={setOpen} />
    </SmsWaitlistContext.Provider>
  )
}

export function useSmsWaitlist() {
  return useContext(SmsWaitlistContext)
}
