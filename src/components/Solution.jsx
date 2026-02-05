import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Solution() {
  const [sectionRef, isVisible] = useScrollAnimation(0.1)

  return (
    <section ref={sectionRef} className="section bg-navy relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-glow-top" />

      <div className="container-custom relative z-10">
        <h2 className={`heading-lg text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          What We Built
        </h2>

        <p className={`text-white text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-center font-semibold transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          KTLYST converts unstructured security narratives into review-ready behavioral detection candidates in under 10 minutes.
        </p>

        <div className="max-w-4xl mx-auto">
          <div className={`bg-navy-dark p-8 rounded-lg border border-accent/30 mb-8 card-glow transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-silver text-lg text-center mb-6">
              Full provenance and human approval before anything ships to production.
            </p>

            <div className="bg-navy p-6 rounded-lg border border-accent/20 shadow-glow-sm">
              <p className="text-accent text-center text-lg font-medium font-mono">
                This is not alerting, MDR, or another detection engine.
              </p>
              <p className="text-white text-center text-xl font-semibold mt-2">
                It is the missing translation layer between intelligence production and detection execution.
              </p>
            </div>
          </div>

          <h3 className={`text-xl font-semibold text-accent mb-6 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Who It's For
          </h3>

          <div className={`bg-navy-dark p-6 rounded-lg border border-accent/20 mb-8 card-glow transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-silver text-lg mb-4">
              Mid-to-large enterprises with:
            </p>
            <ul className="space-y-3 text-silver text-lg">
              <li className="flex items-start group">
                <span className="text-accent mr-3 font-bold group-hover:text-glow transition-all">&gt;</span>
                <span>Internal threat intel capacity</span>
              </li>
              <li className="flex items-start group">
                <span className="text-accent mr-3 font-bold group-hover:text-glow transition-all">&gt;</span>
                <span>Detection engineering teams</span>
              </li>
              <li className="flex items-start group">
                <span className="text-accent mr-3 font-bold group-hover:text-glow transition-all">&gt;</span>
                <span>A growing backlog of intelligence they can't operationalize fast enough</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
