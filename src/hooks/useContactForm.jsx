import { createContext, useContext, useState } from 'react'
import { ContactFormDialog } from '@/components/ContactFormDialog'

const ContactFormContext = createContext()

export function ContactFormProvider({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <ContactFormContext.Provider value={{ openContactForm: () => setOpen(true) }}>
      {children}
      <ContactFormDialog open={open} onOpenChange={setOpen} />
    </ContactFormContext.Provider>
  )
}

export function useContactForm() {
  return useContext(ContactFormContext)
}
