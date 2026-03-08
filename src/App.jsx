import { useState, useEffect, useRef } from 'react'

function GovernedGraph() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const teamColors = { cti: '#06b6d4', soc: '#f97316', email: '#a855f7', iam: '#eab308', endpoint: '#ef4444' }
    const teamLabels = ['CTI', 'SOC', 'Email', 'IAM', 'Endpoint']
    const teamKeys = ['cti', 'soc', 'email', 'iam', 'endpoint']
    const connections = [[0,2],[2,3],[1,3],[3,4],[0,4],[1,4]]

    let nodes = [], centerNode = null, W = 0, H = 0, animId

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      W = rect.width; H = rect.height
      canvas.width = W * dpr; canvas.height = H * dpr
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cx = W / 2, cy = H / 2
      const radius = Math.min(W, H) * 0.35
      centerNode = { x: cx, y: cy, r: 30 }
      nodes = teamKeys.map((key, i) => {
        const angle = (-Math.PI / 2) + (i / 5) * Math.PI * 2
        return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius, r: 28, label: teamLabels[i], color: teamColors[key] }
      })
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Connection lines
      connections.forEach(([a, b]) => {
        ctx.beginPath(); ctx.moveTo(nodes[a].x, nodes[a].y); ctx.lineTo(nodes[b].x, nodes[b].y)
        ctx.strokeStyle = 'rgba(59,157,255,0.2)'; ctx.lineWidth = 1.5; ctx.stroke()
      })

      // Center glow
      const cg = ctx.createRadialGradient(centerNode.x, centerNode.y, 0, centerNode.x, centerNode.y, centerNode.r * 5)
      cg.addColorStop(0, 'rgba(34,197,94,0.09)'); cg.addColorStop(1, 'transparent')
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(centerNode.x, centerNode.y, centerNode.r * 5, 0, Math.PI * 2); ctx.fill()

      // Center node
      ctx.beginPath(); ctx.arc(centerNode.x, centerNode.y, centerNode.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(34,197,94,0.12)'; ctx.fill()
      ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2.5; ctx.stroke()
      ctx.fillStyle = '#22c55e'; ctx.font = '700 13px -apple-system, sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('KTLYST', centerNode.x, centerNode.y)

      // Spokes + particles
      nodes.forEach((n, i) => {
        ctx.beginPath(); ctx.moveTo(centerNode.x, centerNode.y); ctx.lineTo(n.x, n.y)
        ctx.strokeStyle = n.color + '50'; ctx.lineWidth = 1.5; ctx.stroke()
        const ap = ((Date.now() / 2500 + i * 0.2) % 1)
        ctx.beginPath()
        ctx.arc(centerNode.x + (n.x - centerNode.x) * ap, centerNode.y + (n.y - centerNode.y) * ap, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = n.color; ctx.fill()
      })

      // Team nodes
      nodes.forEach(n => {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.5)
        g.addColorStop(0, n.color + '15'); g.addColorStop(1, 'transparent')
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.color + '20'; ctx.fill()
        ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2; ctx.stroke()
        ctx.fillStyle = n.color; ctx.font = '600 11px -apple-system, sans-serif'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(n.label, n.x, n.y)
        ctx.fillStyle = '#22c55e'; ctx.font = '500 9px -apple-system, sans-serif'
        ctx.fillText('governed', n.x, n.y + n.r + 12)
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}

function App() {
  const [demoExpanded, setDemoExpanded] = useState(false)

  const toggleDemo = () => {
    setDemoExpanded(!demoExpanded)
  }

  return (
    <>
      {/* Navigation */}
      <nav className="site-nav">
        <div className="logo">KTLYST <span className="labs">Labs</span></div>
        <div className="nav-right">
          <a href="#how">How It Works</a>
          <a href="/about">About</a>
          <a href="/research">Research</a>
          <a href="/insights">Insights</a>
          <a href="/partners">Partners</a>
          <a href="/signals">Signals</a>
          <a href="https://calendly.com/assafkip" className="cta-button">Let's Talk</a>
        </div>
      </nav>

      {/* Hero — Fork in the road: two clear destinations */}
      <section className="hero">
        <div className="hero-logo">KTLYST <span className="labs">LABS</span></div>

        <h1 className="hero-headline"><span className="emphasis">Memory &gt; more tools.</span></h1>

        <p className="hero-tagline">Every enterprise has 60+ security tools &mdash; 60 muscles with no nervous system. KTLYST is the nervous system.</p>

        <div className="hero-fork">
          <a href="/signals" className="fork-card">
            <span className="fork-icon">&#9678;</span>
            <h2>Explore Security Signals</h2>
            <p>Live intel feed — curated threats, vulnerabilities, and industry signals.</p>
          </a>

          <a href="/demo" className="fork-card">
            <span className="fork-icon">&#9654;</span>
            <h2>See How It Works</h2>
            <p>Watch KTLYST turn raw intelligence into governed detection rules.</p>
          </a>
        </div>
      </section>

      {/* Problem — "Why does this matter right now?" */}
      <section className="site-section problem" id="why">
        <h2 className="section-heading">Why This Matters Now</h2>

        <div className="governed-graph-container">
          <GovernedGraph />
        </div>

        <div className="problem-statement">
          <span className="result-number">Over 50% of breaches</span> are detected externally. Not because translation is slow &mdash; because institutional knowledge doesn't persist. Lessons learned vanish. Effectiveness resets.
          <br /><br />
          Your security stack has muscles &mdash; SIEMs, EDRs, firewalls, IAM. What it doesn't have is a nervous system that connects what each muscle learns.
          <br /><br />
          LastPass, T-Mobile, Okta, MGM, Rackspace &mdash; all responded to Breach 1, none institutionalized the lesson. <a href="/research" style={{ color: '#ff6b6b' }}>$900M+ in combined damages</a>.
        </div>

        <div className="silo-diagram">
          <div className="silo-column">
            <div className="silo-header">Threat Intel</div>
            <div className="silo-stack">
              <div className="silo-item">Reports</div>
              <div className="silo-item">Findings</div>
              <div className="silo-item">Analysis</div>
            </div>
            <div className="silo-drain">Knowledge dies here</div>
          </div>
          <div className="silo-gap">
            <span className="silo-x-mark">&times;</span>
            <span>No bridge</span>
          </div>
          <div className="silo-column">
            <div className="silo-header">Incident Response</div>
            <div className="silo-stack">
              <div className="silo-item">Tickets</div>
              <div className="silo-item">Post-mortems</div>
              <div className="silo-item">Runbooks</div>
            </div>
            <div className="silo-drain">Knowledge dies here</div>
          </div>
          <div className="silo-gap">
            <span className="silo-x-mark">&times;</span>
            <span>No bridge</span>
          </div>
          <div className="silo-column">
            <div className="silo-header">Red Team</div>
            <div className="silo-stack">
              <div className="silo-item">Pentest reports</div>
              <div className="silo-item">Findings</div>
              <div className="silo-item">Test data</div>
            </div>
            <div className="silo-drain">Knowledge dies here</div>
          </div>
        </div>
      </section>

      {/* Solution — "What is KTLYST?" Plain definition. */}
      <section className="site-section solution">
        <h2>What We Built</h2>

        <p className="solution-description">
          KTLYST is the nervous system for enterprise security&mdash;the layer above your 60 execution tools that owns the boundary where learning either compounds or dies. Technically: a Security Learning Control Plane (SLCP). It captures what your teams learn, governs it with provenance and ownership, and enforces it across your existing stack.
        </p>

        <p className="solution-description">
          Two layers working together:
        </p>

        <div className="architecture-diagram">
          <div className="arch-layer arch-platform">
            <div className="arch-badge">Long-term moat</div>
            <div className="arch-content">
              <div className="arch-label-text">LAYER 2: THE PLATFORM</div>
              <div className="arch-details">
                <span>Knowledge Graph</span>
                <span>Learning Infrastructure</span>
                <span>Compound Effects</span>
              </div>
            </div>
          </div>
          <div className="arch-connector">
            <svg viewBox="0 0 100 40" className="arch-connector-svg">
              <path d="M 50 0 L 50 30" stroke="#3b9dff" strokeWidth="2" strokeDasharray="4 3"/>
              <polygon points="42,22 58,22 50,36" fill="#3b9dff"/>
            </svg>
            <span>feeds into</span>
          </div>
          <div className="arch-layer arch-wedge">
            <div className="arch-badge">Proof point</div>
            <div className="arch-content">
              <div className="arch-label-text">LAYER 1: TODAY'S WEDGE</div>
              <div className="arch-details">
                <span>Governed Translation</span>
                <span>Fully Auditable</span>
                <span>Minutes, Not Months</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — Show credible example. Demo collapsed. Neutral tokens. Plain definitions. */}
      <section className="site-section how-it-works" id="how">
        <h2 className="section-heading">How It Works</h2>
        <p style={{ textAlign: 'center', color: '#c0d0e0', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          Human judgment goes in. Auditable, versioned enforcement comes out. Provenance traces every decision back to source.
        </p>

        {/* Plain-language definitions */}
        <div className="plain-definition">
          <p>Same input produces the same output every time&mdash;no variability, no guessing.</p>
          <p>Changes are versioned and reviewable before deployment.</p>
          <p>Nothing ships without explicit human approval.</p>
        </div>

        <div className="provenance-flow">
          <div className="flow-node">
            <div className="flow-step-num">01</div>
            <h4>Ingest</h4>
            <p>Security learning from intel reports, incidents, red team findings, and investigations</p>
          </div>
          <div className="flow-connector"><div className="flow-connector-line"></div></div>
          <div className="flow-node">
            <div className="flow-step-num">02</div>
            <h4>Normalize</h4>
            <p>Messy human findings become structured, reusable learning artifacts with evidence chains</p>
          </div>
          <div className="flow-connector"><div className="flow-connector-line"></div></div>
          <div className="flow-node">
            <div className="flow-step-num">03</div>
            <h4>Govern</h4>
            <p>Decisions, ownership, and approval recorded. Every artifact is reviewable and auditable</p>
          </div>
          <div className="flow-connector"><div className="flow-connector-line"></div></div>
          <div className="flow-node">
            <div className="flow-step-num">04</div>
            <h4>Enforce</h4>
            <p>Governed outputs published into your existing tools as detections, playbooks, and controls</p>
          </div>
          <div className="flow-connector"><div className="flow-connector-line"></div></div>
          <div className="flow-node">
            <div className="flow-step-num">05</div>
            <h4>Compound</h4>
            <p>Every new finding enriches the next response. The system remembers what your teams learned</p>
          </div>
        </div>

        <div className="provenance-trace">
          <div className="trace-line-bar"></div>
          <span>Every output clause traces back to source text &mdash; full provenance chain</span>
        </div>

        {/* Demo as collapsed teaser with expand affordance */}
        <div className="proof-teaser">
          <h3>Example: From Intelligence to Detection</h3>

          <div className="demo-teaser-excerpt">
            <p style={{ color: '#a0b0c0', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Extracted behaviors from a sample incident report:</p>
            <span className="behavior-tag">cloud API access</span>
            <span className="behavior-tag">lateral movement</span>
            <span className="behavior-tag">data exfiltration</span>
          </div>

          <div className="demo-teaser-mini">
            <span className="token-neutral">cloud_api_calls</span> &rarr; <span className="token-neutral">unusual_frequency</span><br />
            <span className="token-neutral">lateral_movement</span> &rarr; <span className="token-neutral">user_enum</span><br />
            <span className="token-neutral">data_exfil</span> + <span className="token-neutral">external_ip</span><br />
            rule : Block metadata queries after auth anomaly
          </div>

          <div className="provenance-indicator">
            <span className="prov-dot"></span>
            Every output clause traced back to the source text
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button
              className={`demo-expand-btn ${demoExpanded ? 'active' : ''}`}
              onClick={toggleDemo}
            >
              {demoExpanded ? 'Collapse example' : 'View full example'}{' '}
              <span className="chevron">{demoExpanded ? '\u25B2' : '\u25BC'}</span>
            </button>
          </div>

          <div className={`demo-collapsed ${demoExpanded ? 'expanded' : ''}`}>
            <div className="demo-teaser-content" style={{ marginTop: '1.5rem' }}>
              <div className="demo-input">
                <h4 style={{ color: '#3b9dff', marginBottom: '1rem' }}>Input: Incident Report Excerpt</h4>
                <p style={{ fontFamily: 'Monaco, Menlo, monospace', fontSize: '0.9rem', color: '#a0b0c0', lineHeight: '1.6' }}>
                  "Attacker used exfiltrated credentials to access cloud provider APIs. Suspicious activity included lateral movement through cloud services, querying user metadata, and exporting sensitive data to attacker-controlled IP."
                </p>
              </div>
              <div className="demo-output">
                <h4 style={{ color: '#3b9dff', marginBottom: '1rem' }}>Output: Detection Rules</h4>
                <p style={{ fontFamily: 'Monaco, Menlo, monospace', fontSize: '0.9rem', color: '#a0b0c0', lineHeight: '1.8' }}>
                  <span className="token-neutral">cloud_api_calls</span> &rarr; <span className="token-neutral">unusual_frequency</span><br />
                  <span className="token-neutral">lateral_movement</span> &rarr; <span className="token-neutral">user_enum</span><br />
                  <span className="token-neutral">data_exfil</span> + <span className="token-neutral">external_ip</span><br />
                  <span className="token-neutral">rule</span> : Block metadata queries after auth anomaly
                </p>
              </div>
            </div>
            <p style={{ marginTop: '1rem', color: '#c0d0e0', fontSize: '0.9rem' }}>
              <span style={{ color: '#3b9dff', fontWeight: '600' }}>Provenance:</span> Every output clause is traced back to the source text. Engineers see exactly which part of the incident triggered which rule.
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#8a9ab0', fontSize: '0.95rem', marginTop: '2rem', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
          Detection rules are the first governed artifact. The same pipeline produces playbook updates, control tightenings, and policy changes&mdash;enforced across your entire stack.
        </p>
      </section>

      {/* Where This Goes — Cleaned up moat statement */}
      <section className="site-section vision-section">
        <h2>Where This Goes</h2>

        <p className="vision-description">
          The compounding vision. Each time you use KTLYST, institutional knowledge gets captured, versioned, and operationalized. It doesn't disappear when team members leave. It doesn't reset after incident response. It compounds.
        </p>

        <div className="growth-curve-container">
          <svg viewBox="0 0 800 350" className="growth-curve-svg">
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(59,157,255,0.25)"/>
                <stop offset="100%" stopColor="rgba(59,157,255,0.02)"/>
              </linearGradient>
            </defs>
            <line x1="80" y1="300" x2="750" y2="300" stroke="rgba(160,176,192,0.3)" strokeWidth="1"/>
            <line x1="80" y1="300" x2="80" y2="30" stroke="rgba(160,176,192,0.3)" strokeWidth="1"/>
            <text x="25" y="170" textAnchor="middle" fill="#8a9ab0" fontSize="10" fontWeight="500" transform="rotate(-90, 25, 170)" letterSpacing="1.5">SECURITY EFFECTIVENESS</text>
            <text x="120" y="325" textAnchor="middle" fill="#8a9ab0" fontSize="11">Now</text>
            <text x="300" y="325" textAnchor="middle" fill="#3b9dff" fontSize="11" fontWeight="600">Year 1</text>
            <text x="500" y="325" textAnchor="middle" fill="#3b9dff" fontSize="11" fontWeight="600">Year 2</text>
            <text x="700" y="325" textAnchor="middle" fill="#3b9dff" fontSize="11" fontWeight="600">Year 3</text>
            <line x1="300" y1="300" x2="300" y2="40" stroke="rgba(59,157,255,0.15)" strokeWidth="1" strokeDasharray="4 4"/>
            <line x1="500" y1="300" x2="500" y2="40" stroke="rgba(59,157,255,0.15)" strokeWidth="1" strokeDasharray="4 4"/>
            <line x1="700" y1="300" x2="700" y2="40" stroke="rgba(59,157,255,0.15)" strokeWidth="1" strokeDasharray="4 4"/>
            <path d="M 80 295 Q 200 280 300 240 Q 400 190 500 140 Q 600 80 700 50" stroke="#3b9dff" strokeWidth="2.5" fill="none" className="curve-line"/>
            <path d="M 80 295 Q 200 280 300 240 Q 400 190 500 140 Q 600 80 700 50 L 700 300 L 80 300 Z" fill="url(#curveGradient)" className="curve-area"/>
            <circle cx="300" cy="240" r="5" fill="#0a1628" stroke="#3b9dff" strokeWidth="2"/>
            <text x="300" y="225" textAnchor="middle" fill="#c0d0e0" fontSize="10" fontWeight="500">Faster Detection</text>
            <circle cx="500" cy="140" r="5" fill="#0a1628" stroke="#3b9dff" strokeWidth="2"/>
            <text x="500" y="125" textAnchor="middle" fill="#c0d0e0" fontSize="10" fontWeight="500">Knowledge Persists</text>
            <circle cx="700" cy="50" r="5" fill="#0a1628" stroke="#3b9dff" strokeWidth="2"/>
            <text x="700" y="40" textAnchor="middle" fill="#c0d0e0" fontSize="10" fontWeight="500">Knowledge Graph</text>
          </svg>
        </div>

        <div className="curve-captions">
          <div className="curve-caption">
            <h4>Year 1</h4>
            <p>Intel team produces detections in minutes. Effectiveness starts compounding.</p>
          </div>
          <div className="curve-caption">
            <h4>Year 2</h4>
            <p>Incident lessons persist. Red team findings become operational improvements.</p>
          </div>
          <div className="curve-caption">
            <h4>Year 3</h4>
            <p>Connected knowledge graph of every adversary, technique, and control.</p>
          </div>
        </div>

        <div className="moat-statement">
          <p>
            You're not adding another muscle. You're building <span className="emphasis">the nervous system that makes every muscle smarter</span>.
            <br /><br />
            A nervous system that learns is a moat that deepens with every incident.
          </p>
        </div>
      </section>

      {/* Compatibility — "Will this fit my stack?" */}
      <section className="site-section compatibility">
        <h2 className="section-heading">Compatibility</h2>

        <div className="integration-hub">
          <div className="hub-side hub-inputs">
            <h4>Input Sources</h4>
            <div className="hub-item-row">Incident Reports</div>
            <div className="hub-item-row">Audit Findings</div>
            <div className="hub-item-row">Gov Advisories</div>
            <div className="hub-item-row">STIX / TAXII</div>
          </div>
          <div className="hub-center-col">
            <div className="hub-connector hub-connector-left"></div>
            <div className="hub-core">
              <span className="hub-name">KTLYST</span>
              <span className="hub-subtitle">Control Plane</span>
            </div>
            <div className="hub-connector hub-connector-right"></div>
          </div>
          <div className="hub-side hub-outputs">
            <h4>Output Targets</h4>
            <div className="hub-item-row">Splunk (SPL)</div>
            <div className="hub-item-row">Sentinel (KQL)</div>
            <div className="hub-item-row">Datadog / Elastic</div>
            <div className="hub-item-row">Jira / ServiceNow</div>
          </div>
        </div>
        <div className="compat-adoption">
          <p>Governed artifacts deploy directly into your existing tools&mdash;Splunk, Sentinel, Datadog, Elastic, Jira, ServiceNow. No new console. No infrastructure changes. <strong>Typical adoption:</strong> Plug into existing workflows in under a week.</p>
        </div>
      </section>

      {/* Trust & Security — "What happens to my intel/data?" */}
      <section className="site-section data-deployment">
        <h2>What Happens to Your Data</h2>

        <div className="data-list">
          <div className="data-item">
            <h3>&#10003; Retention</h3>
            <p>Your intelligence and generated rules are stored exclusively for your team's use&mdash;for reference, audit, and iterative improvement. KTLYST does not share your data with any other customer or third party.</p>
          </div>
          <div className="data-item">
            <h3>&#10003; No Training</h3>
            <p>Your data is never used to train models or improve KTLYST for other customers.</p>
          </div>
          <div className="data-item">
            <h3>&#10003; Encryption</h3>
            <p>All data in transit and at rest uses industry-standard encryption (TLS 1.2+ in transit, AES-256 at rest).</p>
          </div>
          <div className="data-item">
            <h3>&#10003; Deployment</h3>
            <p>Deploy on-premises or in your cloud environment. No data leaves your infrastructure unless you choose to. SOC 2 compliance in progress.</p>
          </div>
        </div>
      </section>

      {/* Design Partner CTA — "What do I do next?" */}
      <section className="site-section design-partner-cta" id="partner">
        <h2>Become a Design Partner</h2>

        <p className="partner-intro">
          We're working with security teams to refine KTLYST before general availability. If you fit the criteria below, we want to hear from you.
        </p>

        <div className="criteria-list">
          <div className="criteria-item">
            <p>Tired of rebuilding knowledge after every team change</p>
          </div>
          <div className="criteria-item">
            <p>Security teams producing learning that doesn't persist across tools or turnover</p>
          </div>
          <div className="criteria-item">
            <p>Security effectiveness that resets instead of compounds</p>
          </div>
          <div className="criteria-item">
            <p>Willingness to provide structured feedback</p>
          </div>
        </div>

        <div className="partner-benefits">
          <h3>What You Get</h3>
          <ul>
            <li>Early access to KTLYST compiler and demo environment</li>
            <li>Direct support and rapid iteration based on your feedback</li>
            <li>Input on product roadmap and feature prioritization</li>
            <li>Special pricing or terms for early adoption</li>
          </ul>
        </div>

        <p style={{ color: '#a0b0c0', fontSize: '0.95rem', marginTop: '1.5rem' }}>
          Typical engagement: 60&ndash;90 days. Weekly sync with your team. We'll work with your existing stack (Splunk, Sentinel, Datadog, etc.).
        </p>

        <a href="/partners" className="primary">Learn More &amp; Apply</a>
      </section>

      {/* Team */}
      <section className="site-section team" id="team">
        <h2 className="section-heading">Team</h2>

        <p className="team-intro">
          "We've built these systems at scale and seen firsthand how intelligence dies between teams."
        </p>

        <p className="team-intro-alt">
          Combined 30+ years in security detection and threat intelligence. We're building infrastructure that prevents knowledge from disappearing. <a href="/about" style={{ color: '#3b9dff' }}>Read our story &rarr;</a>
        </p>

        <div className="team-grid">
          <div className="team-member">
            <h3>Assaf Kipnis</h3>
            <div className="title">Founder &amp; CEO</div>
            <p>Head of Threat Intel &amp; Investigations at ElevenLabs. Previously built threat intelligence and detection systems at Google, Meta, and LinkedIn. Designed the architectural patterns that allow security knowledge to compound instead of reset.</p>

            <div className="company-badges">
              <span className="badge">Google</span>
              <span className="badge">Meta</span>
              <span className="badge">LinkedIn</span>
              <span className="badge">ElevenLabs</span>
            </div>

            <a href="https://www.linkedin.com/in/assafkipnis/">LinkedIn Profile &rarr;</a>
          </div>

          <div className="team-member">
            <h3>Stephan Kaufmann</h3>
            <div className="title">Co-Founder &amp; COO</div>
            <p>Built large-scale threat intelligence and detection systems at Meta, McAfee, and HP. Spent 8&ndash;10 hours a week manually translating intel into defenses&mdash;the exact workflow KTLYST automates.</p>

            <div className="company-badges">
              <span className="badge">Meta</span>
              <span className="badge">McAfee</span>
              <span className="badge">HP</span>
            </div>

            <a href="https://www.linkedin.com/in/stephan-kaufmann/">LinkedIn Profile &rarr;</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/research">Research</a>
          <a href="/insights">Insights</a>
          <a href="/glossary">Glossary</a>
          <a href="/partners">Partners</a>
          <a href="/signals">Signals</a>
          <a href="https://calendly.com/assafkip">Let's Talk</a>
          <a href="mailto:crew@ktlystlabs.com">Contact</a>
        </div>
        <p>&copy; 2026 KTLYST Labs. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
