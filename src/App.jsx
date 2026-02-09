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

        <h1 className="hero-headline">
          The <span className="emphasis">amnesia problem</span>. Security teams keep relearning the same lessons. Knowledge gets filed, not operationalized. Effectiveness resets instead of compounding.
        </h1>

        <p className="hero-subheading">Security Learning Control Plane</p>

        <p className="hero-description">
          Every security team solves the same problems repeatedly. KTLYST captures what you learn and turns it into durable operational improvements that persist across team changes, incident cycles, and organizational memory loss.
        </p>

        <div className="hero-cta-buttons">
          <a href="https://calendly.com/assafkip" className="primary">Book a Demo</a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScr8iT20E4YuavrMgYM7EEOsNUAKZ61c1RkCLspidxHIOaNEg/viewform?usp=dialog" className="secondary">Join the Waitlist</a>
        </div>
      </section>

      {/* Problem Section */}
      <section className="site-section problem">
        <h2 className="section-heading">Why This Matters Now</h2>

        <p className="problem-intro">
          The three-silo problem. Intel writes reports that get filed. IR closes incidents that stay in docs. Red team findings sit in wikis. Each team solves problems others already solved. No system connects them.
        </p>

        <div className="problem-statement">
          <span className="result-number">Over 50% of breaches</span> are detected externally. But not because translation is slow—because institutional knowledge doesn't persist. Lessons learned vanish. Effectiveness resets.
        </div>

        <div className="silo-grid">
          <div className="silo-card">
            <h3>Threat Intelligence Silo</h3>
            <p>Reports on adversary tactics, frameworks, and behaviors are filed as PDFs. Knowledge stays in Confluence, never operationalized.</p>
          </div>
          <div className="silo-card">
            <h3>Incident Response Silo</h3>
            <p>IR teams handle incidents, document findings, close tickets. Lessons stay in Jira, never reach security design.</p>
          </div>
          <div className="silo-card">
            <h3>Red Team Silo</h3>
            <p>Penetration tests reveal organizational weaknesses. Reports sit in wikis. The same weaknesses surface again next assessment.</p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="site-section solution">
        <h2>What We Built</h2>

        <p className="solution-description">
          Two layers working together:
        </p>

        <div className="two-layer-container">
          <div className="layer">
            <h3>Layer 1: Today's Wedge</h3>
            <p>Intel → detection in minutes with full provenance. Fast enough to prove the model works. Modern enough that you trust the output. Auditable enough to deploy to production on day one.</p>
          </div>
          <div className="layer">
            <h3>Layer 2: The Platform</h3>
            <p>Infrastructure that captures what security teams learn and turns it into durable operational improvements. A knowledge graph that grows every time you use it. Speed becomes proof of the architecture, not the headline.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="site-section how-it-works">
        <h2 className="section-heading">How It Works</h2>
        <p style={{ textAlign: 'center', color: '#c0d0e0', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Human judgment goes in. Auditable, versioned enforcement comes out. Provenance traces every decision back to source.
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

        {/* Demo Teaser */}
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

      {/* Where This Goes Section */}
      <section className="site-section vision-section">
        <h2>Where This Goes</h2>

        <p className="vision-description">
          The compounding vision. Each time you use KTLYST, institutional knowledge gets captured, versioned, and operationalized. It doesn't disappear when team members leave. It doesn't reset after incident response. It compounds.
        </p>

        <div className="timeline-grid">
          <div className="timeline-year">
            <h3>Year 1</h3>
            <p>Faster detection rules. Intel team → detections in minutes instead of months. Effectiveness starts to compound.</p>
          </div>
          <div className="timeline-year">
            <h3>Year 2</h3>
            <p>Knowledge persistence. Incident lessons don't vanish. Red team findings become operational security improvements, not closed tickets.</p>
          </div>
          <div className="timeline-year">
            <h3>Year 3</h3>
            <p>A knowledge graph of every adversary that's targeted you. Every technique you've seen, every control you've built, every decision you've made—all connected, versioned, auditable.</p>
          </div>
        </div>

        <div className="moat-statement">
          <p>
            You're not building faster workflows. You're building <span className="emphasis">infrastructure that compounds</span>. That's the moat story. That's what sophisticated buyers need to see.
          </p>
        </div>
      </section>

      {/* Compatibility Section */}
      <section className="site-section compatibility">
        <h2 className="section-heading">Compatibility</h2>

        <div className="compat-grid">
          <div className="compat-box">
            <h3>Input Formats</h3>
            <p>Incident reports, audit findings, analyst notes, government advisories, STIX/TAXII feeds—any unstructured or semi-structured security narrative.</p>
          </div>
          <div className="compat-box">
            <h3>Output Targets</h3>
            <p>Splunk (SPL), Microsoft Sentinel (KQL), Datadog, Elastic, Sigma rules. Detection logic delivered in the format your stack already consumes.</p>
          </div>
          <div className="compat-adoption">
            <p><strong>Typical adoption:</strong> Plug into existing workflows in under a week. No infrastructure changes required.</p>
          </div>
        </div>
      </section>

      {/* Data & Deployment Section */}
      <section className="site-section data-deployment">
        <h2>What Happens to Your Data</h2>

        <div className="data-list">
          <div className="data-item">
            <h3>&#10003; Retention</h3>
            <p>Your intelligence and generated rules are retained for your team's reference and audit only.</p>
          </div>
          <div className="data-item">
            <h3>&#10003; No Training</h3>
            <p>Your data is never used to train models or improve KTLYST for other customers.</p>
          </div>
          <div className="data-item">
            <h3>&#10003; Encryption</h3>
            <p>All data in transit and at rest uses industry-standard encryption.</p>
          </div>
          <div className="data-item">
            <h3>&#10003; Deployment</h3>
            <p>Deploy on-premises or in your cloud environment. No data leaves your infrastructure unless you choose to.</p>
          </div>
        </div>
      </section>

      {/* Design Partner CTA */}
      <section className="site-section design-partner-cta">
        <h2>Become a Design Partner</h2>

        <p className="partner-intro">
          We're working with security teams to refine KTLYST before general availability. If you fit the criteria below, we want to hear from you.
        </p>

        <div className="criteria-list">
          <div className="criteria-item">
            <p>Tired of rebuilding knowledge after every team change</p>
          </div>
          <div className="criteria-item">
            <p>Detection engineering capability that's being underutilized</p>
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

        <p style={{ color: '#a0b0c0', fontSize: '0.95rem', margin: '1.5rem 0' }}>
          Typical engagement: 60–90 days. Weekly sync with your team. We'll work with your existing stack (Splunk, Sentinel, Datadog, etc.).
        </p>

        <a href="https://calendly.com/assafkip" className="primary">Apply to Partner Program</a>
      </section>

      {/* Team Section */}
      <section className="site-section team">
        <h2 className="section-heading">Team</h2>

        <p className="team-intro">
          "We've built these systems at scale and seen firsthand how intelligence dies between teams."
        </p>

        <p className="team-intro-alt">
          Combined 30+ years in security detection and threat intelligence. We're building infrastructure that prevents knowledge from disappearing.
        </p>

        <div className="team-grid">
          <div className="team-member">
            <h3>Assaf Kipnis</h3>
            <div className="title">Founder &amp; CEO</div>
            <p>Built threat intel and detection systems at Google, Meta, LinkedIn, and ElevenLabs. Led detection engineering at one of the world's largest security operations centers. Designed the architectural patterns that allow security knowledge to compound instead of reset.</p>

            <div className="company-badges">
              <div className="badge">Google</div>
              <div className="badge">Meta</div>
              <div className="badge">LinkedIn</div>
              <div className="badge">ElevenLabs</div>
            </div>

            <a href="https://www.linkedin.com/in/assafkipnis/">LinkedIn Profile →</a>
          </div>

          <div className="team-member">
            <h3>Stephan Kaufmann</h3>
            <div className="title">Co-Founder &amp; COO</div>
            <p>Built large-scale threat intelligence and detection systems at Meta, McAfee, and HP. Operations and execution expertise across infrastructure and product teams.</p>

            <div className="company-badges">
              <div className="badge">Meta</div>
              <div className="badge">McAfee</div>
              <div className="badge">HP</div>
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
