import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PageLayout from './PageLayout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import ScorecardPlaceholder from '@/pages/ScorecardPlaceholder'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'

export default function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageLayout>
              <Home />
            </PageLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PageLayout>
              <About />
            </PageLayout>
          }
        />
        <Route
          path="/scorecard"
          element={
            <PageLayout>
              <ScorecardPlaceholder />
            </PageLayout>
          }
        />
        <Route
          path="/privacy"
          element={
            <PageLayout>
              <Privacy />
            </PageLayout>
          }
        />
        <Route
          path="/terms"
          element={
            <PageLayout>
              <Terms />
            </PageLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}
