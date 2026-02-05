export default function Footer() {
  return (
    <footer className="section bg-navy border-t border-accent/20 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a
              href="https://calendly.com/assafkip"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-glow inline-block text-lg hover:scale-105 transform transition-all duration-200"
            >
              Book a Demo
            </a>
            <a
              href="mailto:crew@ktlystlabs.com"
              className="inline-block text-lg px-8 py-3 rounded-lg border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent font-semibold transition-all duration-200 hover:scale-105"
            >
              Contact Us
            </a>
          </div>
          <p className="text-silver text-lg">
            Email: <a href="mailto:crew@ktlystlabs.com" className="text-accent hover:text-accent-hover transition-colors">crew@ktlystlabs.com</a>
          </p>
        </div>

        <div className="border-t border-silver/20 pt-6 text-center">
          <p className="text-silver text-sm font-mono">
            &copy; {new Date().getFullYear()} KTLYST Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
