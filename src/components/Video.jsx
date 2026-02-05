import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Video() {
  const [sectionRef, isVisible] = useScrollAnimation(0.1)

  return (
    <section ref={sectionRef} className="section bg-navy relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container-custom relative z-10">
        <h2 className={`heading-lg text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          MVP in Action
        </h2>

        <p className={`text-silver text-lg text-center mb-10 max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          See how KTLYST transforms threat intelligence into detection candidates.
        </p>

        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative rounded-lg overflow-hidden border border-accent/30 shadow-glow">
            <div style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/QyH0oCKBnIQ"
                title="KTLYST MVP Demo"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
