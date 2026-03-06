import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

export default function ScorecardPlaceholder() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="relative overflow-hidden glass">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-brand opacity-20 blur-xl" />

          <CardHeader className="relative text-center space-y-2">
            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="flex justify-center mb-4"
            >
              <Sparkles className="h-12 w-12 text-brand-violet" />
            </motion.div>

            <CardTitle className="text-3xl font-heading font-bold text-gradient">
              Digital Health Scorecard
            </CardTitle>

            <CardDescription className="text-muted-foreground text-base">
              Coming soon — we're building something special.
            </CardDescription>
          </CardHeader>

          <CardContent className="relative text-center pb-8">
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <p className="text-sm text-muted-foreground">
                Get notified when we launch
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
