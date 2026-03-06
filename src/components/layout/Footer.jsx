import { Link } from 'react-router-dom'
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Scorecard', path: '/scorecard' }
]

const socialLinks = [
  { icon: Mail, href: 'mailto:hello@saaslessforge.com', label: 'Email' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }
]

export default function Footer() {
  return (
    <footer className="relative bg-brand-charcoal border-t-2 border-transparent" style={{ borderImage: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 50%, #F97316 100%) 1' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold text-gradient">
              SaaSless Forge
            </h3>
            <p className="text-muted-foreground text-sm">
              Custom software, forged for you.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading font-semibold text-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-muted-foreground hover:text-brand-violet transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading font-semibold text-foreground">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-brand-violet transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
            <p className="text-muted-foreground text-sm">
              hello@saaslessforge.com
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SaaSless Forge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
