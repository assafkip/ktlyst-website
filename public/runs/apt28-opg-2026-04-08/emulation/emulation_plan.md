# Emulation Plan

**Advisory:** Advisory Extraction
**Generated:** 2026-04-08

## Objective

Validate detection coverage for the attack techniques identified in this advisory.
Execute each step in a controlled environment and verify your detection rules fire.

## Attack Steps

### Step 1: Router exploitation to DNS hijacking setup
**MITRE ATT&CK:** T1557

  Behaviors:
  • Step 1: Exploit public vulnerabilities in internet-facing routers (CVE-2023-50224)
  • Step 2: Send crafted HTTP GET requests to obtain router credentials
  • Step 3: Modify DHCP/DNS settings to redirect traffic to attacker-controlled DNS servers
  • Step 4: Configure malicious DNS servers on VPS infrastructure
  Detection: Monitor for unauthorized changes to router DHCP/DNS settings and unusual DNS server configurations pointing to non-standard IP ranges

### Step 2: DNS hijacking to credential harvesting
**MITRE ATT&CK:** T1583.002

  Behaviors:
  • Step 1: Intercept DNS requests from compromised router downstream devices
  • Step 2: Selectively resolve targeted domains (email/login services) to malicious infrastructure
  • Step 3: Conduct adversary-in-the-middle attacks on redirected connections
  • Step 4: Harvest passwords, OAuth tokens, and authentication credentials
  Detection: Monitor DNS resolution patterns for email/authentication domains resolving to unexpected IP addresses and detect TLS certificate anomalies

### Step 3: Opportunistic targeting and victim filtering
**MITRE ATT&CK:** T1583.003

  Behaviors:
  • Step 1: Cast wide net by compromising multiple SOHO routers
  • Step 2: Monitor large pool of potential victims through DNS traffic
  • Step 3: Filter and triage users based on intelligence value criteria
  • Step 4: Focus exploitation efforts on high-value targets
  Detection: Analyze DNS query patterns for systematic monitoring behavior and identify infrastructure serving multiple compromised networks

### Step 4: Multi-stage router compromise persistence
**MITRE ATT&CK:** T1584.008

  Behaviors:
  • Step 1: Initial router exploitation using public vulnerabilities
  • Step 2: Set primary DNS to malicious server, secondary to original legitimate server
  • Step 3: Re-exploit same routers multiple times to update configurations
  • Step 4: Set both primary and secondary DNS to malicious servers for full control
  Detection: Monitor for multiple DNS configuration changes on the same device and detect backup DNS servers pointing to suspicious infrastructure

### Step 5: Selective domain redirection for stealth
**MITRE ATT&CK:** T1586

  Behaviors:
  • Step 1: Configure malicious DNS servers to monitor all incoming requests
  • Step 2: Identify requests matching targeting criteria (email/login domains)
  • Step 3: Redirect targeted domains to malicious infrastructure
  • Step 4: Pass through non-targeted domains to legitimate servers to avoid detection
  Detection: Compare DNS resolution results across different DNS servers and identify selective redirection patterns for specific domain categories

### Step 6: VPS infrastructure setup for DNS operations
**MITRE ATT&CK:** T1588.006

  Behaviors:
  • Step 1: Acquire Virtual Private Servers for malicious operations
  • Step 2: Configure VPS as DNS servers with specific banner patterns
  • Step 3: Set up SSH access on non-standard ports (56777, 35681)
  • Step 4: Deploy dnsmasq software for DNS request handling
  Detection: Scan for VPS infrastructure with specific SSH port configurations and dnsmasq banners associated with malicious DNS operations

### Step 7: Credential theft to follow-on access
**MITRE ATT&CK:** T1557

  Behaviors:
  • Step 1: Harvest authentication credentials through AitM attacks
  • Step 2: Collect both passwords and OAuth authentication tokens
  • Step 3: Use stolen credentials for malicious logins from different infrastructure
  • Step 4: Conduct further operations using compromised accounts
  Detection: Monitor for authentication attempts using credentials shortly after DNS redirection events and detect logins from infrastructure not listed in initial compromise

### Step 8: Dual-cluster infrastructure operation
**MITRE ATT&CK:** T1583.002

  Behaviors:
  • Step 1: Operate first cluster for broad DNS hijacking operations
  • Step 2: Set up second cluster for DNS request forwarding
  • Step 3: Forward DNS requests to remote actor-owned servers
  • Step 4: Conduct interactive operations against high-value router targets
  Detection: Map DNS request forwarding patterns between different infrastructure clusters and identify interactive sessions with specific router targets

### Step 9: Geographic targeting with router exploitation
**MITRE ATT&CK:** T1583.003

  Behaviors:
  • Step 1: Compromise MikroTik and TP-Link routers in specific regions
  • Step 2: Focus interactive operations on routers in Ukraine
  • Step 3: Identify routers of potential intelligence value
  • Step 4: Conduct targeted operations against selected high-value devices
  Detection: Monitor for geographic clustering of router compromises and identify interactive sessions targeting specific regions or device types

### Step 10: Multi-vector router exploitation campaign
**MITRE ATT&CK:** T1584.008

  Behaviors:
  • Step 1: Target multiple TP-Link router models with known vulnerabilities
  • Step 2: Exploit different router firmware versions and configurations
  • Step 3: Adapt exploitation techniques for various router architectures
  • Step 4: Scale operations across diverse router ecosystem
  Detection: Monitor for exploitation attempts across multiple router vendor models and detect common attack patterns adapted for different device types

## Execution Notes

- Execute in an isolated test environment with monitoring enabled
- Ensure SIEM ingestion is active before starting
- Document which detection rules fire for each step
- Record any gaps in the detection gap matrix