# Detection Gap Matrix: Trivy/TeamPCP Supply Chain Attack

## Overview

This matrix maps each stage of the Trivy/TeamPCP attack against typical enterprise security stack capabilities. A "gap" means the attack technique is unlikely to generate an alert with default configurations.

## Matrix

| # | Attack Stage | Technique | EDR (CrowdStrike/MDE) | SIEM (Splunk/Sentinel) | GitHub Audit Logs | Network (NDR/Firewall) | CI/CD Security |
|---|---|---|---|---|---|---|---|
| 1 | **Initial Compromise** - Imposter commits pushed to Trivy repo | T1195.002 | No visibility | No visibility | No visibility (external repo) | No visibility | No visibility |
| 2 | **Binary Distribution** - v0.69.4 released via automated pipeline | T1195.002 | Hash detection (post-IOC only) | Hash correlation (post-IOC only) | No visibility | No visibility | Partial (if binary verification enabled) |
| 3 | **Binary Execution** - Trojanized Trivy runs in CI/CD | T1195.002 | Partial (if agent on runner) | Process execution logs | Workflow run logged | No visibility | No visibility (trusted tool) |
| 4 | **Env Var Collection** - Malware harvests CI/CD secrets | T1087 | No alert (normal behavior) | No alert (normal behavior) | No visibility | No visibility | No visibility |
| 5 | **File Credential Sweep** - SSH keys, cloud creds, tokens | T1555 | Partial (file access logs) | Partial (if file audit enabled) | No visibility | No visibility | No visibility |
| 6 | **Memory Scraping** - /proc/pid/mem reads | T1005 | **GAP** - rarely instrumented | **GAP** - requires auditd rules | No visibility | No visibility | No visibility |
| 7 | **Encrypted Exfil** - AES-256-CBC + RSA-4096 to C2 | T1041 | DNS detection (if C2 IOC known) | DNS/network logs (post-IOC) | No visibility | **Detectable** (DNS + TLS to new domain) | No visibility |
| 8 | **GitHub Actions Payload** - Compromised action runs | T1195.002 | **GAP** - no agent on runner | No visibility | Workflow execution logged | **GAP** - runner traffic not monitored | **GAP** - action tag trusted |
| 9 | **Fallback Exfil** - Create tpcp-docs repo | T1041 | No visibility | No visibility | **Detectable** (new repo creation) | No visibility | No visibility |
| 10 | **systemd Persistence** - sysmon.py user service | T1547.014 | **GAP** - user services missed | **GAP** - requires custom detection | No visibility | No visibility | No visibility |
| 11 | **C2 Polling** - HTTPS to ICP domain every 5 min | T1041 | DNS detection (if IOC known) | DNS logs (post-IOC) | No visibility | **Detectable** (periodic beacon pattern) | No visibility |

## Gap Summary

### Critical Gaps (no detection with default config)

1. **GitHub Actions runtime** - No endpoint agent runs inside GitHub Actions VMs. All three stages of the Actions payload (memory scraping, file sweep, exfiltration) execute in a blind spot.

2. **/proc/pid/mem scraping** - Neither CrowdStrike nor MDE generates alerts for cross-process memory reads via the procfs interface. This is a Linux-specific gap.

3. **User-level systemd services** - Persistence via `~/.config/systemd/user/` does not trigger standard autostart detection rules. Most EDR monitoring covers system-level services only.

4. **Trusted tool context** - The malicious Trivy binary looks identical to legitimate Trivy during execution. Process name, command line, and parent process all appear normal. No behavioral detection fires.

### Partial Coverage

5. **Post-IOC hash detection** - EDR can block known-bad hashes, but only after IOCs are published. The attack was active for 4+ days before detection.

6. **DNS-based C2 detection** - Network monitoring can detect C2 domains, but requires IOC feeds or anomaly detection for novel domains like the ICP-hosted fallback.

7. **File access monitoring** - SSH key and credential file access generates telemetry but high false-positive rates in developer environments make alerting impractical without baselining.

### Working Detection Points

8. **GitHub audit logs** - Workflow execution events, new repo creation, and secret access are logged. Requires active monitoring and anomaly detection.

9. **Network beacon detection** - The 5-minute polling interval to a novel domain is detectable by NDR solutions with beacon analysis.

## Recommendations by Priority

| Priority | Action | Addresses Gap | Effort |
|---|---|---|---|
| P0 | Import IOCs into EDR + SIEM | #2, #7, #11 | Low |
| P0 | Run persistence_hunt.ps1 on all dev machines | #10 | Low |
| P0 | Pin GitHub Actions to SHA | #8 | Medium |
| P1 | Deploy auditd rules for /proc/pid/mem | #6 | Medium |
| P1 | Monitor ~/.config/systemd/user/ | #10 | Medium |
| P1 | GitHub audit log monitoring for anomalous repo creation | #9 | Medium |
| P2 | Network allowlists for CI/CD runner egress | #4, #7 | High |
| P2 | Runtime security for GitHub Actions (Harden-Runner) | #8 | High |
| P3 | Binary provenance verification in CI/CD | #2, #3 | High |
