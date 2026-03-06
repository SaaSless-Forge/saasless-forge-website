import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedRoutes from '@/components/layout/AnimatedRoutes'
import ScrollToTop from '@/components/layout/ScrollToTop'
import LoadingScreen from '@/components/layout/LoadingScreen'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-brand-charcoal flex flex-col">
            <Header />
            <main className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      )}
    </>
  )
}

export default App
