import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Differentiators() {
  const [sectionRef, isVisible] = useScrollAnimation(0.1)

  const differentiators = [
    {
      title: "Deterministic, Not Probabilistic",
      description: "No hallucinations or silent drift. Every output is traceable and verifiable.",
      icon: "01"
    },
    {
      title: "Internal-Intel First",
      description: "Processes what companies already know — incident reports, audits, and analyst notes that currently sit unused.",
      icon: "02"
    },
    {
      title: "Full Audit Trail",
      description: "Character-level provenance from source text to detection clause to deployment decision.",
      icon: "03"
    },
    {
      title: "Behavioral Detections",
      description: "Forces attackers to change how they operate, not just rotate indicators.",
      icon: "04"
    }
  ]

  return (
    <section ref={sectionRef} className="section bg-navy relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-50" />

      <div className="container-custom relative z-10">
        <h2 className={`heading-lg text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          What's Different
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className={`group bg-navy-dark p-6 rounded-lg border border-accent/20 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-sm card-glow ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className="text-accent/30 text-4xl font-bold font-mono group-hover:text-accent/50 transition-colors">
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-accent mb-2">
                    {item.title}
                  </h3>
                  <p className="text-silver">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-semibold text-center text-white mb-6">
            Early Validation
          </h3>

          <div className="bg-navy-dark p-6 rounded-lg border border-accent/30 card-glow">
            <ul className="space-y-4 text-silver">
              <li className="flex items-start group">
                <span className="text-accent mr-3 font-bold font-mono">&gt;</span>
                <span>Confirmed pain across CISOs and detection leaders at hyperscalers and global banks</span>
              </li>
              <li className="flex items-start group">
                <span className="text-accent mr-3 font-bold font-mono">&gt;</span>
                <span><span className="text-white font-semibold">&lt;0.1%</span> of shared threat intel contains immediately usable detection logic (NDSS 2024)</span>
              </li>
              <li className="flex items-start group">
                <span className="text-accent mr-3 font-bold font-mono">&gt;</span>
                <span>MVP live with active design-partner conversations underway</span>
              </li>
              <li className="flex items-start group">
                <span className="text-accent mr-3 font-bold font-mono">&gt;</span>
                <span>Industry leader advisors</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
