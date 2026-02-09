import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy/95 backdrop-blur-md border-b border-accent/20 shadow-lg shadow-navy/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-xl font-bold font-mono text-accent group-hover:text-glow transition-all">
              KTLYST
            </span>
            <span className={`text-silver text-sm font-mono transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
              Labs
            </span>
          </a>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <a
              href="/signals"
              className="text-silver hover:text-accent text-sm font-medium transition-colors"
            >
              Signals
            </a>
            {/* CTA Button */}
            <a
              href="https://calendly.com/assafkip"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-primary text-sm transition-all duration-300 ${
                isScrolled
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
