# Visibility Assessment: Trivy/TeamPCP Supply Chain Attack

## D3FEND Mapping - CrowdStrike Falcon / Microsoft Defender for Endpoint

| Attack Stage | Technique | D3FEND Countermeasure | CrowdStrike | MDE | Gap? |
|---|---|---|---|---|---|
| **Stage 1: Initial Compromise** | T1195.002 Supply Chain (Software) | D3-SBV Software Binary Verification | No visibility (upstream compromise) | No visibility (upstream compromise) | YES - both EDRs trust signed release pipelines |
| **Stage 2: Malicious Binary** | T1195.002 Binary execution | D3-EFA Executable File Analysis | Hash match on known-bad | Hash match on known-bad | Partial - only after IOC publication |
| **Stage 2: Credential Theft** | T1555 Credential Store Access | D3-CDA Credential Data Access | File access monitoring | File access monitoring | Partial - CI/CD runner context may lack sensor |
| **Stage 3: Memory Scraping** | T1005 /proc/pid/mem reads | D3-PSA Process Self-Access | Limited /proc monitoring | Limited /proc monitoring | YES - /proc/pid/mem reads rarely generate EDR telemetry |
| **Stage 3: Secret Sweep** | T1005 File system enumeration | D3-FA File Access | SSH key access alerts | SSH key access alerts | Partial - high false positive in dev environments |
| **Stage 3: GitHub Actions** | T1041 Exfil via C2 | D3-NTA Network Traffic Analysis | No visibility | No visibility | YES - GitHub Actions runners are outside EDR scope |
| **Stage 4: Persistence** | T1547.014 systemd user service | D3-PSA Process Startup Activity | Limited systemd user monitoring | Limited systemd user monitoring | YES - user-level systemd services commonly missed |
| **Stage 4: C2 Polling** | T1041 HTTPS to ICP domain | D3-DNSA DNS Traffic Analysis | DNS monitoring (if sensor present) | DNS monitoring (if sensor present) | Partial - requires endpoint DNS inspection enabled |

## Critical Gaps

### 1. /proc/pid/mem Scraping (HIGH)
- **What:** The malware reads `/proc/<pid>/mem` to extract credentials from running process memory
- **Why it's missed:** Most EDR sensors do not instrument `/proc/pid/mem` reads as suspicious. This is a legitimate Linux API used by debuggers and profilers.
- **D3FEND:** D3-PSA (Process Self-Access Detection) - neither CrowdStrike nor MDE reliably detects cross-process memory reads via procfs
- **Mitigation:** Deploy auditd rules: `-w /proc/ -p r -k proc_mem_access` with filtering for non-standard readers

### 2. systemd User Services (HIGH)
- **What:** Persistence via `~/.config/systemd/user/sysmon.py` polling C2 every 5 minutes
- **Why it's missed:** User-level systemd services do not require root. Most EDR autostart monitoring focuses on system-level services (`/etc/systemd/system/`), not user services.
- **D3FEND:** D3-SAOR (System Activity Object Review) - gap in user-space service enumeration
- **Mitigation:** Monitor `~/.config/systemd/user/` directory creation and `systemctl --user` commands

### 3. GitHub Actions Runtime (CRITICAL)
- **What:** The compromised GitHub Action runs memory scraping and secret exfiltration inside the Actions runner
- **Why it's missed:** GitHub Actions runners are ephemeral VMs outside your EDR deployment. No endpoint sensor is present during workflow execution.
- **D3FEND:** No applicable countermeasure - this is an architectural blind spot
- **Mitigation:** GitHub Actions audit logs, OIDC token claims, workflow run duration anomaly detection, pin actions to full SHA

### 4. CI/CD Pipeline Context (MEDIUM)
- **What:** The malicious Trivy binary runs inside CI/CD pipelines where it has access to environment variables, mounted secrets, and service account tokens
- **Why it's missed:** CI/CD runners may have EDR agents, but the context of "vulnerability scanner accessing secrets" looks identical to legitimate Trivy behavior
- **D3FEND:** D3-BAN (Behavioral Analysis) - requires baseline of normal Trivy network behavior
- **Mitigation:** Network segmentation for CI/CD runners, restrict outbound to known-good domains, monitor for novel DNS queries from build agents

## Recommendations

1. **Immediate:** Import IOCs into both CrowdStrike and MDE (see `crowdstrike_ioc_import.json` and `mde_ioc_import.csv`)
2. **Short-term:** Deploy auditd rules for /proc/pid/mem monitoring on Linux build servers
3. **Short-term:** Add monitoring for `~/.config/systemd/user/` directory changes
4. **Medium-term:** Implement GitHub Actions SHA pinning (see `cloud/pin_actions_to_sha.md`)
5. **Medium-term:** Establish network allowlists for CI/CD runner egress traffic
6. **Long-term:** Evaluate runtime security for GitHub Actions (e.g., StepSecurity Harden-Runner)
