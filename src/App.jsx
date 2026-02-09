function App() {
  return (
    <>
      {/* Navigation */}
      <nav className="site-nav">
        <div className="logo">KTLYST <span className="labs">Labs</span></div>
        <div className="nav-right">
          <a href="/signals">Signals</a>
          <a href="https://calendly.com/assafkip" className="cta-button">Book a Demo</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-logo">KTLYST <span className="labs">LABS</span></div>
        <p className="hero-tagline">Turning Threat Intelligence Into Detection in Under 10 Minutes</p>
        <h1 className="hero-headline">The <span className="highlight">deterministic</span> translation layer between intelligence production and detection execution</h1>

        <p className="hero-reassurance">
          <strong>What that means:</strong> Same input always produces the same output. Changes are versioned and reviewable. Nothing ships without explicit human approval.
        </p>

        <div className="hero-cta-buttons">
          <a href="https://calendly.com/assafkip" className="primary">Book a Demo</a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScr8iT20E4YuavrMgYM7EEOsNUAKZ61c1RkCLspidxHIOaNEg/viewform?usp=dialog" className="secondary">Join the Waitlist</a>
        </div>
      </section>

      {/* Problem Section */}
      <section className="site-section problem">
        <h2 className="section-heading">The Problem</h2>

        <p className="problem-intro">
          Security teams generate high-quality threat intelligence every day: incident reports, audits, advisories, analyst notes. But most of it never becomes detection.
        </p>

        <div className="problem-statement">
          Translation is manual, slow, and siloed. As a result, breaches routinely occur using known tactics that were documented but never operationalized.
        </div>

        <div className="why-matters">
          <h3 className="section-heading" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Why This Matters Now</h3>

          <div className="matters-grid">
            <div className="matter-card">
              <h3>Attackers Iterate in Hours</h3>
              <p>AI-powered adversaries evolve faster than ever. Detection engineering still takes days.</p>
            </div>
            <div className="matter-card">
              <h3>Indicators Are Cheap to Rotate</h3>
              <p>It's trivial for attackers to change IPs and domains. Expensive for them to retrain tradecraft.</p>
            </div>
            <div className="matter-card">
              <h3>Industry Focus Is Wrong</h3>
              <p>Most tools still focus on atomic indicators. Meanwhile, behavioral patterns go undetected.</p>
            </div>
            <div className="matter-card">
              <h3>The Result</h3>
              <p>Over <span className="result-number">50% of breaches</span> are detected externally, even in mature organizations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="site-section solution">
        <h2>What We Built</h2>

        <p className="solution-description">
          KTLYST converts unstructured security narratives into review-ready behavioral detection candidates in under 10 minutes.
        </p>

        <div className="output-box">
          <p><strong>Output:</strong> Detection rules and logic (not alerts, not another engine—just the missing translation layer)</p>
        </div>

        <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '2rem 0 1.5rem' }}>Who It's For</h3>
        <p style={{ color: '#a0b0c0', marginBottom: '1.5rem' }}>Mid-to-large enterprises with:</p>

        <div className="solution-benefits">
          <div className="benefit">
            <h3>Internal Threat Intel Capacity</h3>
            <p>You have a team generating intelligence.</p>
          </div>
          <div className="benefit">
            <h3>Detection Engineering Teams</h3>
            <p>You have engineers who write detection rules.</p>
          </div>
          <div className="benefit">
            <h3>Intelligence Backlog</h3>
            <p>You have intel you can't operationalize fast enough.</p>
          </div>
          <div className="benefit">
            <h3>Stack in Place</h3>
            <p>You have SIEM, EDR, or detection platforms deployed.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="site-section how-it-works">
        <h2 className="section-heading">How It Works</h2>
        <p style={{ textAlign: 'center', color: '#c0d0e0', fontSize: '1.1rem', marginBottom: '2rem' }}>
          From security narrative to detection candidate in <strong style={{ color: '#3b9dff' }}>under 10 minutes</strong>
        </p>

        <div className="process-steps">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Input</h3>
            <p>Internal security artifacts: incident writeups, audit findings, analyst notes, government advisories</p>
          </div>
          <div className="step">
            <div className="step-number">02</div>
            <h3>Process</h3>
            <p>Deterministic compiler extracts attacker behaviors and maps them to detection logic</p>
          </div>
          <div className="step">
            <div className="step-number">03</div>
            <h3>Output</h3>
            <p>Detection candidates targeting behavior (not IPs), delivered into existing workflows</p>
          </div>
          <div className="step">
            <div className="step-number">04</div>
            <h3>Control</h3>
            <p>Character-level provenance + human-in-the-loop review before production</p>
          </div>
        </div>

        {/* Proof Teaser Example */}
        <div className="proof-teaser">
          <h3>Example: From Intelligence to Detection</h3>

          <div className="demo-teaser-content">
            <div className="demo-input">
              <h4>Input: Incident Report Excerpt</h4>
              <p>
                "Attacker used exfiltrated credentials to access cloud provider APIs. Suspicious activity included lateral movement through cloud services, querying user metadata, and exporting sensitive data to attacker-controlled IP."
              </p>
            </div>

            <div className="demo-output">
              <h4>Output: Detection Rules</h4>
              <p>
                <span className="token">cloud_api_calls</span> → <span className="token">unusual_frequency</span><br />
                <span className="token">lateral_movement</span> → <span className="token">user_enum</span><br />
                <span className="token">data_exfil</span> + <span className="token">external_ip</span><br />
                <span className="token">rule</span>: Block metadata queries after auth anomaly
              </p>
            </div>
          </div>

          <p style={{ color: '#a0b0c0', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            <strong style={{ color: '#3b9dff' }}>Provenance:</strong> Every output clause is traced back to the source text. Engineers see exactly which part of the incident triggered which rule.
          </p>

          <button className="demo-button">View Full Example &amp; Video Demo</button>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="site-section trust-section">
        <h2 className="section-heading" style={{ fontSize: '2.2rem' }}>Trust &amp; Security</h2>

        <div className="trust-features">
          <div className="trust-feature">
            <h3>Deterministic, Not Probabilistic</h3>
            <div className="operational-meaning">
              <p><strong>Same input → same output every time.</strong> No silent drift. Every change is versioned and reviewable.</p>
            </div>
            <p style={{ marginTop: '1rem', color: '#a0b0c0' }}>This means your detection logic is stable, auditable, and predictable in production.</p>
          </div>

          <div className="trust-feature">
            <h3>Full Provenance</h3>
            <div className="operational-meaning">
              <p><strong>Character-level traceability.</strong> Every detection rule shows exactly which part of your intelligence generated it.</p>
            </div>
            <p style={{ marginTop: '1rem', color: '#a0b0c0' }}>Engineers can validate, modify, and approve with full visibility before deployment.</p>
          </div>

          <div className="trust-feature">
            <h3>Internal-Intel First</h3>
            <div className="operational-meaning">
              <p><strong>We process what you already know</strong>—your incident reports, audits, and analyst notes.</p>
            </div>
            <p style={{ marginTop: '1rem', color: '#a0b0c0' }}>Your proprietary intelligence stays internal. No external data correlation or training.</p>
          </div>

          <div className="trust-feature">
            <h3>Behavioral Detections</h3>
            <div className="operational-meaning">
              <p><strong>Target tradecraft, not indicators.</strong> Forces attackers to change how they operate.</p>
            </div>
            <p style={{ marginTop: '1rem', color: '#a0b0c0' }}>Atomic indicators (IPs, domains) rotate in minutes. Behavior changes take months.</p>
          </div>
        </div>

        <div className="data-deployment-box">
          <h3>Data &amp; Deployment</h3>
          <ul>
            <li>&#10003; <strong>Retention:</strong> Your intelligence and generated rules are retained for your team's reference and audit only.</li>
            <li>&#10003; <strong>No Training:</strong> Your data is never used to train models or improve KTLYST for other customers.</li>
            <li>&#10003; <strong>Encryption:</strong> All data in transit and at rest uses industry-standard encryption.</li>
            <li>&#10003; <strong>Deployment:</strong> Deploy on-premises or in your cloud environment. No data leaves your infrastructure unless you choose to.</li>
          </ul>
        </div>
      </section>

      {/* Design Partner CTA */}
      <section className="site-section design-partner-cta">
        <h2>Become a Design Partner</h2>

        <p style={{ color: '#c0d0e0', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          We're working with security teams to refine KTLYST before general availability. If you fit the criteria below, we want to hear from you.
        </p>

        <div className="criteria-list">
          <div className="criteria-item">
            <p>Internal threat intelligence team</p>
          </div>
          <div className="criteria-item">
            <p>Detection engineering capability</p>
          </div>
          <div className="criteria-item">
            <p>Backlog of unoperationalized intel</p>
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

        <p style={{ color: '#a0b0c0', fontSize: '0.95rem', margin: '1.5rem 0' }}>
          Typical engagement: 60–90 days. Weekly sync with your team. We'll work with your existing stack (Splunk, Sentinel, Datadog, etc.).
        </p>

        <a href="https://calendly.com/assafkip" className="primary">Apply to Partner Program</a>
      </section>

      {/* Team Section */}
      <section className="site-section team">
        <h2 className="section-heading">Team</h2>

        <div className="team-intro">
          <p>Combined 30+ years in security detection and threat intelligence. We've built these systems at scale and seen firsthand how intelligence dies between teams.</p>
        </div>

        <div className="team-grid">
          <div className="team-member">
            <h3>Assaf Kipnis</h3>
            <div className="title">Founder &amp; CEO</div>
            <p>Built and operated threat intel and detection systems at Google, Meta, and LinkedIn. Led detection engineering at one of the world's largest security operations centers.</p>

            <div className="company-badges">
              <div className="badge">Google</div>
              <div className="badge">Meta</div>
              <div className="badge">LinkedIn</div>
            </div>

            <a href="https://www.linkedin.com/in/assafkipnis/">LinkedIn Profile →</a>
          </div>

          <div className="team-member">
            <h3>Stephan Kaufmann</h3>
            <div className="title">Co-Founder &amp; COO</div>
            <p>Built large-scale threat intelligence and detection systems at Meta, McAfee, ElevenLabs, and HP. Operations and execution expertise across infrastructure and product teams.</p>

            <div className="company-badges">
              <div className="badge">Meta</div>
              <div className="badge">McAfee</div>
              <div className="badge">ElevenLabs</div>
            </div>

            <a href="https://www.linkedin.com/in/stephan-kaufmann/">LinkedIn Profile →</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-links">
          <a href="https://calendly.com/assafkip">Book a Demo</a>
          <a href="mailto:crew@ktlystlabs.com">Contact Us</a>
          <a href="/signals">Signals</a>
        </div>
        <p>&copy; 2026 KTLYST Labs. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
