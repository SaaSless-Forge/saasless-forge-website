import { createContext, useContext, useEffect, useState } from 'react'
import { SprintSignupModal } from '@/components/SprintSignupModal'

const STORAGE_KEY = 'sprint-signup-seen'
const AUTO_OPEN_DELAY_MS = 600

const SprintSignupContext = createContext()

export function SprintSignupProvider({ children }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.localStorage.getItem(STORAGE_KEY)) return

    const timer = window.setTimeout(() => setOpen(true), AUTO_OPEN_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const markSeen = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, '1')
    }
  }

  const handleOpenChange = (value) => {
    setOpen(value)
    if (!value) markSeen()
  }

  return (
    <SprintSignupContext.Provider
      value={{ openSprintSignup: () => setOpen(true) }}
    >
      {children}
      <SprintSignupModal open={open} onOpenChange={handleOpenChange} />
    </SprintSignupContext.Provider>
  )
}

export function useSprintSignup() {
  return useContext(SprintSignupContext)
}
