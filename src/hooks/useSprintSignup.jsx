import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SprintSignupModal } from '@/components/SprintSignupModal'

const STORAGE_KEY = 'sprint-signup-seen'
const AUTO_OPEN_DELAY_MS = 600
// Routes where the auto-opening promo would steal keyboard focus / cover the
// content (e.g. the interactive game). The modal can still be opened manually.
const AUTO_OPEN_BLOCKLIST = ['/zelda', '/game']

const SprintSignupContext = createContext()

export function SprintSignupProvider({ children }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.localStorage.getItem(STORAGE_KEY)) return
    if (AUTO_OPEN_BLOCKLIST.includes(location.pathname)) return

    const timer = window.setTimeout(() => setOpen(true), AUTO_OPEN_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [location.pathname])

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
