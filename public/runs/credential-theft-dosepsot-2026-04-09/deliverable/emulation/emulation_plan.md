# Emulation Plan

**Advisory:** Advisory Extraction
**Generated:** 2026-04-09

## Objective

Validate detection coverage for the attack techniques identified in this advisory.
Execute each step in a controlled environment and verify your detection rules fire.

## Attack Steps

### Step 1: Email breach to credential stuffing attack chain
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Obtain exposed email records from data breach
  • Step 2: Combine email addresses with passwords from previous breach databases
  • Step 3: Test credential pairs against enterprise portals, VPNs, and identity providers at scale using automation
  Detection: Monitor for multiple failed login attempts from same source IP against different accounts, or successful logins with credentials from known breach databases

### Step 2: AI-assisted targeted phishing campaign
**MITRE ATT&CK:** T1566

  Behaviors:
  • Step 1: Process exposed email list through AI tooling
  • Step 2: Generate personalized phishing messages referencing the target organization
  • Step 3: Tailor lures using job title, department, or LinkedIn data
  • Step 4: Send visually indistinguishable fake correspondence
  Detection: Detect email campaigns with organizational references sent shortly after breach announcements, or emails with suspicious sender reputation but high visual similarity to legitimate templates

### Step 3: Help desk social engineering attack
**MITRE ATT&CK:** T1621

  Behaviors:
  • Step 1: Gather valid email address and basic OSINT on target
  • Step 2: Call IT support impersonating the employee
  • Step 3: Request password reset, MFA device reset, or account unlock
  • Step 4: Bypass technical authentication through human process
  Detection: Monitor help desk requests for authentication resets, especially when caller cannot provide standard verification information or requests are made outside normal business hours

### Step 4: Real-time phishing relay (AiTM) attack
**MITRE ATT&CK:** T1566

  Behaviors:
  • Step 1: Set up reverse proxy between victim and legitimate service
  • Step 2: Forward victim credentials to real site in real time
  • Step 3: Relay MFA challenge from real site to victim
  • Step 4: Forward victim's MFA response through proxy
  • Step 5: Capture authenticated session token
  Detection: Detect authentication sessions with unusual network paths, timing anomalies between credential submission and MFA response, or sessions originating from proxy infrastructure

### Step 5: MFA fatigue attack
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Obtain valid user credentials
  • Step 2: Trigger repeated push notifications to user's device
  • Step 3: Continue bombardment until user approves out of frustration
  • Step 4: Gain authenticated access through approved session
  Detection: Monitor for multiple consecutive MFA push notifications to same user, especially outside normal work hours or when user hasn't initiated login attempts

### Step 6: Cloud-synced passkey compromise chain

  Behaviors:
  • Step 1: Target user's cloud account recovery mechanisms
  • Step 2: Execute SIM swap attack against recovery phone number
  • Step 3: Use compromised phone to reset cloud account
  • Step 4: Access synced passkeys through compromised cloud account
  Detection: Monitor for SIM swap indicators followed by cloud account recovery attempts, or passkey usage from new devices after account recovery events

### Step 7: Device theft to authentication bypass
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Steal or gain physical access to user's device with stored passkeys
  • Step 2: Attempt to use device-bound passkeys
  • Step 3: Bypass biometric verification through device compromise or stored templates
  • Step 4: Authenticate using stolen device credentials
  Detection: Detect authentication attempts from devices in unusual locations, or biometric authentication patterns that differ from established user behavior

## Execution Notes

- Execute in an isolated test environment with monitoring enabled
- Ensure SIEM ingestion is active before starting
- Document which detection rules fire for each step
- Record any gaps in the detection gap matrix