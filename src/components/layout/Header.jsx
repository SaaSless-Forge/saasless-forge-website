import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useContactForm } from '@/hooks/useContactForm'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Scorecard', path: '/scorecard' }
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { openContactForm } = useContactForm()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl sm:text-2xl font-heading font-bold text-gradient">
              SaaSless Forge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-brand-violet relative group',
                  isActive(link.path)
                    ? 'text-brand-violet'
                    : 'text-muted-foreground'
                )}
              >
                {link.name}
                {isActive(link.path) ? (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-brand" />
                ) : (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-violet scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button onClick={openContactForm} className="bg-brand-coral hover:bg-brand-coral/90 text-white font-semibold px-6 transition-transform hover:scale-105">
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-brand-charcoal border-white/10">
              <div className="flex flex-col gap-6 mt-8">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-brand-violet px-4 py-3 rounded-lg min-h-[44px] flex items-center',
                        isActive(link.path)
                          ? 'text-brand-violet bg-brand-violet/10'
                          : 'text-muted-foreground'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <Button onClick={() => { setMobileOpen(false); openContactForm() }} className="bg-brand-coral hover:bg-brand-coral/90 text-white font-semibold w-full">
                  Book a Call
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
