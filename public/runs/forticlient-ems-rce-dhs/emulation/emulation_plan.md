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
  • Step 1: Attempt to access threat intelligence URL (fortiguard.fortinet.com/psirt/FG-IR-26-099)
  • Step 2: Security system blocks access and generates alert
  • Step 3: System logs client IP and attack details for investigation
  Detection: Monitor for blocked web requests to security vendor sites combined with specific attack IDs and message patterns

### Step 2: Potential threat actor intelligence gathering attempt
**MITRE ATT&CK:** T1595

  Behaviors:
  • Step 1: Target specific security advisory URL (PSIRT reference FG-IR-26-099)
  • Step 2: Trigger security controls during access attempt
  • Step 3: Leave forensic trail with client IP and attack signature
  Detection: Correlate blocked requests to vulnerability databases with subsequent reconnaissance activities from same IP

## Execution Notes

- Execute in an isolated test environment with monitoring enabled
- Ensure SIEM ingestion is active before starting
- Document which detection rules fire for each step
- Record any gaps in the detection gap matrix