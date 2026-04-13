# Board Brief: CI/CD Supply Chain Attack (Trivy/TeamPCP Campaign)

**Date:** 2026-04-13
**Classification:** Confidential - Board Distribution
**Source Advisory:** Wiz Research - Trivy Compromised: TeamPCP Supply Chain Attack

---

## 1. What Happened

Between March 19-23, 2026, threat actors compromised Trivy, the most widely used open-source vulnerability scanner in CI/CD pipelines. The attack unfolded in four stages:

- **March 19:** Attackers pushed a malicious Trivy v0.69.4 binary via spoofed developer identities ("rauchg" and "DmitriyLewen"), triggering the legitimate release pipeline
- **March 19-20:** Compromised binaries were distributed through GitHub Releases, Docker Hub, GitHub Container Registry (GHCR), and Amazon ECR
- **March 19-20:** 75 of 76 `trivy-action` GitHub Action tags and 7 `setup-trivy` tags were force-pushed with credential-stealing payloads
- **March 22:** Attack expanded to npm ecosystem via stolen developer tokens (CanisterWorm campaign)

The malware operated alongside legitimate Trivy functionality (no visible disruption), harvesting environment variables, SSH keys, cloud credentials, and API tokens. Exfiltration used AES-256-CBC + RSA-4096 hybrid encryption to a typosquatted domain (`scan.aquasecurtiy.org`).

**Key fact:** Any organization that ran Trivy v0.69.4 or triggered a CI/CD pipeline using `trivy-action` between March 19-23 should assume credential exposure.

---

## 2. Your Exposure

**Assessment questions for your environment:**

| Question | Risk if Yes |
|----------|------------|
| Do any CI/CD pipelines use `aquasecurity/trivy-action`? | GitHub Actions secrets potentially exfiltrated |
| Were any pipelines triggered between March 19-23? | Active credential theft during attack window |
| Is Trivy installed on developer machines or build servers? | Persistence mechanism (`sysmon.py`) may be active |
| Do CI/CD service accounts have write access to package registries? | Supply chain propagation risk to your own packages |
| Are GitHub Actions pinned to version tags (not SHA hashes)? | Vulnerable to tag-manipulation attacks |

**Blast radius if credentials were exfiltrated:**
- Cloud provider credentials (AWS, Azure, GCP) used in pipelines
- GitHub Personal Access Tokens and deploy keys
- Container registry push credentials
- npm/PyPI publish tokens
- Any secret stored as a GitHub Actions secret or environment variable

---

## 3. Response Status

| Team | Action | Status |
|------|--------|--------|
| **SOC / Detection** | Deploy C2 domain and IP blocklists; behavioral detection for `/proc/*/mem` scraping and systemd persistence | Detection rules delivered (SPL + KQL + SIGMA) |
| **IAM / Identity** | Force rotation of all GitHub tokens, PATs, and deploy keys accessible during March 19-23 | Rotation playbook delivered |
| **Cloud / DevSecOps** | Audit all workflows referencing `trivy-action` or `setup-trivy`; pin all GitHub Actions to SHA hashes | Audit playbook + remediation guide delivered |
| **Endpoint** | Scan developer machines for `~/.config/systemd/user/sysmon.py` persistence mechanism | Hunt scripts delivered (CrowdStrike + MDE) |
| **Email** | Internal developer advisory distributed | Template delivered |
| **Compliance** | NIST CSF mapping complete; third-party risk register updated for Aqua Security/Trivy | Assessment delivered |
| **Threat Intel** | Full STIX 2.1 IOC bundle published; watchlist updated | IOC package delivered |

**Credential rotation timeline:** All CI/CD secrets and tokens accessible during the March 19-23 window should be rotated within 48 hours of this brief.

**Residual risk:** The `sysmon.py` persistence mechanism polls `tdtqy-oyaaa-aaaae-af2dq-cai.raw.icp0.io` every 5 minutes for secondary payloads. Any developer machine that executed Trivy v0.69.4 may still have an active backdoor. Endpoint scanning is the immediate priority.
