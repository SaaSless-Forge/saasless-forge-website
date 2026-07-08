import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PageLayout from './PageLayout'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const ScorecardPlaceholder = lazy(() => import('@/pages/ScorecardPlaceholder'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const Terms = lazy(() => import('@/pages/Terms'))
const Security = lazy(() => import('@/pages/Security'))
const SmsSignup = lazy(() => import('@/pages/SmsSignup'))
const SprintOfferPage = lazy(() => import('@/pages/SprintOfferPage'))
const SprintIntakePage = lazy(() => import('@/pages/SprintIntakePage'))

const pages = [
  ['/', Home],
  ['/about', About],
  ['/scorecard', ScorecardPlaceholder],
  ['/privacy', Privacy],
  ['/terms', Terms],
  ['/security', Security],
  ['/sms-signup', SmsSignup],
  ['/sprint-offer', SprintOfferPage],
  ['/sprint-intake', SprintIntakePage],
]

export default function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          {pages.map(([path, Page]) => (
            <Route
              key={path}
              path={path}
              element={
                <PageLayout>
                  <Page />
                </PageLayout>
              }
            />
          ))}
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}
