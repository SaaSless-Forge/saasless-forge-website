import { BrowserRouter } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedRoutes from '@/components/layout/AnimatedRoutes'
import ScrollToTop from '@/components/layout/ScrollToTop'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import { ContactFormProvider } from '@/hooks/useContactForm'
import { SmsWaitlistProvider } from '@/hooks/useSmsWaitlist'
import { SprintSignupProvider } from '@/hooks/useSprintSignup'

function App() {
  return (
    <BrowserRouter>
      <ContactFormProvider>
        <SmsWaitlistProvider>
          <SprintSignupProvider>
            <ScrollToTop />
            <div className="min-h-screen bg-brand-base flex flex-col">
              <AnnouncementBar />
              <Header />
              <main className="flex-1">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </SprintSignupProvider>
        </SmsWaitlistProvider>
      </ContactFormProvider>
    </BrowserRouter>
  )
}

export default App
