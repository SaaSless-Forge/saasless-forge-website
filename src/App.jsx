import { BrowserRouter } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedRoutes from '@/components/layout/AnimatedRoutes'
import ScrollToTop from '@/components/layout/ScrollToTop'
import { ContactFormProvider } from '@/hooks/useContactForm'
import { SprintSignupProvider } from '@/hooks/useSprintSignup'

function App() {
  return (
    <BrowserRouter>
      <ContactFormProvider>
        <SprintSignupProvider>
            <ScrollToTop />
            <div className="min-h-screen bg-brand-base flex flex-col">
              <Header />
              <main className="flex-1">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </SprintSignupProvider>
      </ContactFormProvider>
    </BrowserRouter>
  )
}

export default App
