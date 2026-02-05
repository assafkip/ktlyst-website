import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function HowItWorks() {
  const [sectionRef, isVisible] = useScrollAnimation(0.1)

  const steps = [
    {
      number: "01",
      title: "Input",
      description: "Internal security artifacts: incident writeups, audit findings, analyst notes, government advisories"
    },
    {
      number: "02",
      title: "Process",
      description: "Deterministic compiler extracts attacker behaviors and maps them to detection logic"
    },
    {
      number: "03",
      title: "Output",
      description: "Detection candidates targeting behavior (not IPs), delivered into existing workflows"
    },
    {
      number: "04",
      title: "Control",
      description: "Character-level provenance + human-in-the-loop review before production"
    }
  ]

  return (
    <section ref={sectionRef} className="section bg-navy-dark relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container-custom relative z-10">
        <h2 className={`heading-lg text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          How It Works
        </h2>

        <p className={`text-silver text-lg text-center mb-12 max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          From security narrative to detection candidate in <span className="text-accent font-semibold text-glow">under 10 minutes</span>
        </p>

        {/* Steps with connector line */}
        <div className="relative max-w-6xl mx-auto">
          {/* Horizontal connector line (desktop) */}
          <div className="hidden lg:block absolute top-[72px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`text-center relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="bg-navy p-6 rounded-lg border border-silver/20 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-sm card-glow h-full">
                  {/* Step number */}
                  <div className="relative mx-auto mb-4 w-16 h-16">
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl" />
                    <div className="relative bg-navy border-2 border-accent text-accent w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold font-mono">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-accent">{step.title}</h3>
                  <p className="text-silver text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-12 max-w-3xl mx-auto transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent p-6 rounded-lg border border-accent/30 shadow-glow-sm">
            <p className="text-white text-center text-lg">
              <span className="font-bold text-accent font-mono">&gt;_</span> We process what companies <span className="text-accent font-semibold">already know</span> — internal intelligence that's sitting unused because translation is too slow.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
