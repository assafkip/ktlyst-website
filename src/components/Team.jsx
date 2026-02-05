import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Team() {
  const [sectionRef, isVisible] = useScrollAnimation(0.1)

  const team = [
    {
      name: "Assaf Kipnis",
      title: "Founder & CEO",
      bio: "Built and operated threat intel and detection systems at Google, Meta, and LinkedIn.",
      initials: "AK",
      linkedin: "https://www.linkedin.com/in/assafkipnis/",
      companies: ["Google", "Meta", "LinkedIn"]
    },
    {
      name: "Stephan Kaufmann",
      title: "Co-Founder & COO",
      bio: "Built large-scale threat intel and detection systems at Meta, McAfee, Elevenlabs, and HP.",
      initials: "SK",
      linkedin: "https://www.linkedin.com/in/stephan-kaufmann/",
      companies: ["Meta", "McAfee", "ElevenLabs", "HP"]
    }
  ]

  return (
    <section ref={sectionRef} className="section bg-navy-dark relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="container-custom relative z-10">
        <h2 className={`heading-lg text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Team
        </h2>

        <p className={`text-silver text-lg text-center mb-10 max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Combined 30+ years in the industry. Experienced firsthand how intelligence dies between teams.
        </p>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Avatar with glow */}
              <div className="relative w-32 h-32 mx-auto mb-6 group">
                <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl group-hover:bg-accent/50 transition-all duration-300" />
                <div className="relative w-32 h-32 bg-navy border-2 border-accent text-accent rounded-full flex items-center justify-center group-hover:border-accent-hover group-hover:shadow-glow transition-all duration-300">
                  <span className="text-4xl font-bold font-mono">{member.initials}</span>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
              <p className="text-accent font-medium mb-4 font-mono">{member.title}</p>
              <p className="text-silver mb-4">{member.bio}</p>

              {/* Company logos/badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {member.companies.map((company) => (
                  <span
                    key={company}
                    className="px-3 py-1 text-xs font-medium bg-navy border border-silver/30 rounded-full text-silver"
                  >
                    {company}
                  </span>
                ))}
              </div>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver hover:text-accent transition-colors inline-flex items-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
