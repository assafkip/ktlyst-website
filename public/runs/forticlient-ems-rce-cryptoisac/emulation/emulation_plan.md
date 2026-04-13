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
  • Step 2: Security system blocks access
  • Step 3: Generate block notification with client details
  Detection: Monitor for blocked requests to security vendor URLs combined with specific attack IDs

### Step 2: Potential threat intelligence gathering attempt

  Behaviors:
  • Step 1: Target specific Fortinet PSIRT advisory URL
  • Step 2: Access attempt from external IP
  • Step 3: Trigger security control blocking mechanism
  Detection: Track access patterns to vulnerability disclosure pages that result in security blocks

### Step 3: Security control enforcement and logging workflow

  Behaviors:
  • Step 1: Detect suspicious web request
  • Step 2: Apply blocking policy
  • Step 3: Log attack ID and message ID
  • Step 4: Generate administrator notification
  Detection: Correlate attack IDs with message IDs to identify coordinated probing attempts

## Execution Notes

- Execute in an isolated test environment with monitoring enabled
- Ensure SIEM ingestion is active before starting
- Document which detection rules fire for each step
- Record any gaps in the detection gap matrix