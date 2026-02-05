import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Problem() {
  const [sectionRef, isVisible] = useScrollAnimation(0.1)

  return (
    <section ref={sectionRef} className="pt-0 pb-16 px-4 md:px-8 lg:px-16 bg-navy-dark relative">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy to-transparent" />

      <div className="container-custom relative z-10">
        <h2 className={`heading-lg text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          The Problem
        </h2>

        <p className={`text-silver text-lg md:text-xl mb-8 max-w-3xl mx-auto text-center leading-relaxed transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Security teams generate high-quality threat intelligence every day: incident reports, audits, advisories, analyst notes. But most of it never becomes detection.
        </p>

        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-navy p-8 rounded-lg border border-red-500/30 shadow-lg shadow-red-500/5 card-glow">
            <p className="text-white text-xl text-center font-medium">
              Translation is manual, slow, and siloed. As a result, breaches routinely occur using known tactics that were documented but never operationalized.
            </p>
          </div>
        </div>

        <h3 className={`text-2xl font-semibold text-center text-accent mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Why This Matters Now
        </h3>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { title: "Attackers Iterate in Hours", desc: "AI-powered adversaries evolve faster than ever. Detection engineering still takes days.", delay: "delay-[400ms]" },
            { title: "Indicators Are Cheap to Rotate", desc: "It's trivial for attackers to change IPs and domains. Expensive for them to retrain tradecraft.", delay: "delay-[500ms]" },
            { title: "Industry Focus Is Wrong", desc: "Most tools still focus on atomic indicators. Meanwhile, behavioral patterns go undetected.", delay: "delay-[600ms]" },
            { title: "The Result", desc: null, delay: "delay-[700ms]" }
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-navy p-6 rounded-lg border border-silver/20 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-sm card-glow ${item.delay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <h4 className="text-xl font-semibold text-accent mb-3">
                {item.title}
              </h4>
              {item.desc ? (
                <p className="text-silver">{item.desc}</p>
              ) : (
                <p className="text-silver">
                  Over <span className="text-white font-bold">50% of breaches</span> are detected externally, even in mature organizations.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
