export default function Hero() {
  return (
    <section className="px-4 md:px-8 lg:px-16 bg-navy relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-glow" />

      <div className="container-custom text-center relative z-10">
        <picture>
          <source srcSet="/logo.webp" type="image/webp" />
          <img
            src="/logo.jpeg"
            alt="KTLYST Labs Logo"
            className="mx-auto h-[384px] md:h-[576px] lg:h-[768px] object-contain drop-shadow-2xl -mb-8 md:-mb-12 lg:-mb-16"
          />
        </picture>

        <p className="text-accent text-base md:text-lg mb-6 tracking-[0.2em] uppercase font-medium font-mono">
          Turning Threat Intelligence Into Detection in under 10 minutes
        </p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
          The <span className="text-accent text-glow">deterministic</span> translation layer between intelligence production and detection execution
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 pb-16">
          <a
            href="https://calendly.com/assafkip"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-glow inline-block text-lg hover:scale-105 transform transition-all duration-200"
          >
            Book a Demo
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScr8iT20E4YuavrMgYM7EEOsNUAKZ61c1RkCLspidxHIOaNEg/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-lg px-8 py-3 rounded-lg border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent font-semibold transition-all duration-200 hover:scale-105 backdrop-blur-sm"
          >
            Join the Waitlist
          </a>
        </div>
      </div>
    </section>
  )
}
