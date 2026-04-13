# Emulation Plan

**Advisory:** Advisory Extraction
**Generated:** 2026-04-13

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
  Detection: Monitor for multiple failed login attempts from same source IPs against different accounts, especially when usernames match recent breach disclosures

### Step 2: AI-assisted targeted phishing campaign
**MITRE ATT&CK:** T1566

  Behaviors:
  • Step 1: Process exposed email list through AI tooling
  • Step 2: Generate personalized phishing messages referencing the target organization
  • Step 3: Enhance targeting using job titles and LinkedIn data
  • Step 4: Deploy visually identical replicas of legitimate correspondence
  Detection: Analyze email patterns for AI-generated content signatures and cross-reference sender domains against recent breach victim lists

### Step 3: Help desk social engineering bypass
**MITRE ATT&CK:** T1621

  Behaviors:
  • Step 1: Gather valid email address and basic OSINT on target employee
  • Step 2: Impersonate employee in call to IT support
  • Step 3: Request password reset, MFA device reset, or account unlock
  • Step 4: Bypass technical authentication controls through human process exploitation
  Detection: Flag help desk requests that coincide with recent breach disclosures and implement additional verification for reset requests

### Step 4: Real-time phishing relay (AiTM) attack
**MITRE ATT&CK:** T1566

  Behaviors:
  • Step 1: Deploy reverse proxy between victim and legitimate service
  • Step 2: Forward victim credentials to real site in real-time
  • Step 3: Relay MFA challenge from real site to victim
  • Step 4: Forward victim's MFA response through proxy
  • Step 5: Capture authenticated session token
  Detection: Monitor for authentication sessions with unusual network paths or timing anomalies between credential submission and MFA completion

### Step 5: MFA fatigue attack progression
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Obtain valid user credentials
  • Step 2: Trigger repeated push notifications to user's device
  • Step 3: Continue bombardment until user approves out of frustration
  • Step 4: Gain authenticated access through user exhaustion
  Detection: Alert on multiple consecutive MFA push notifications to same user within short time windows, especially outside business hours

### Step 6: Cloud-synced passkey compromise chain
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Target cloud account associated with synced passkeys
  • Step 2: Execute SIM swap attack against recovery phone number
  • Step 3: Exploit account recovery flow
  • Step 4: Gain access to synced passkey credentials
  Detection: Monitor for SIM swap indicators followed by cloud account access from new devices or locations

### Step 7: Device-bound credential theft sequence
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Compromise endpoint device containing passkey
  • Step 2: Attempt extraction of device-bound authentication credentials
  • Step 3: Replay authentication without authorized user presence
  Detection: Detect endpoint compromise indicators followed by unusual authentication patterns from the same device

### Step 8: Multi-workflow parallel attack execution
**MITRE ATT&CK:** T1566

  Behaviors:
  • Step 1: Acquire large email record dataset from breach
  • Step 2: Simultaneously launch credential stuffing automation
  • Step 3: Deploy AI-generated phishing campaigns in parallel
  • Step 4: Execute help desk social engineering calls
  • Step 5: Maximize attack surface through coordinated multi-vector approach
  Detection: Correlate multiple attack indicators (failed logins, phishing emails, help desk calls) targeting the same organization within compressed timeframes

## Execution Notes

- Execute in an isolated test environment with monitoring enabled
- Ensure SIEM ingestion is active before starting
- Document which detection rules fire for each step
- Record any gaps in the detection gap matrix