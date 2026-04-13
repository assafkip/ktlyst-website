# Emulation Plan

**Advisory:** Advisory Extraction
**Generated:** 2026-04-13

## Objective

Validate detection coverage for the attack techniques identified in this advisory.
Execute each step in a controlled environment and verify your detection rules fire.

## Attack Steps

### Step 1: Web-based reconnaissance blocked by security controls
**MITRE ATT&CK:** T1595

  Behaviors:
  • Step 1: Attempt to access threat intelligence URL
  • Step 2: Security system blocks access and logs attempt
  • Step 3: Generate alert with client IP and attack classification
  Detection: Monitor for blocked web requests to security vendor URLs combined with specific attack ID patterns

### Step 2: Automated threat intelligence gathering attempt

  Behaviors:
  • Step 1: Target specific security advisory URL (FG-IR-26-099)
  • Step 2: Automated request triggers security controls
  • Step 3: Request blocked and classified as attack ID 20000051
  Detection: Correlate blocked requests to PSIRT URLs with consistent attack ID classifications across multiple attempts

### Step 3: Security control evasion attempt detection
**MITRE ATT&CK:** T1562

  Behaviors:
  • Step 1: Client attempts to access blocked security content
  • Step 2: FortiGuard system intercepts and analyzes request
  • Step 3: System generates detailed blocking report with client attribution
  Detection: Track patterns of blocked security-related URL access attempts from specific IP ranges

## Execution Notes

- Execute in an isolated test environment with monitoring enabled
- Ensure SIEM ingestion is active before starting
- Document which detection rules fire for each step
- Record any gaps in the detection gap matrix