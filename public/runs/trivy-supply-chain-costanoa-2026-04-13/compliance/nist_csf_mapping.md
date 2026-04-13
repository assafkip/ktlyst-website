# NIST CSF Response Mapping: CI/CD Supply Chain Attack (Trivy/TeamPCP Campaign)

**Date:** 2026-04-13
**Framework:** NIST Cybersecurity Framework v2.0
**Advisory:** Trivy Compromised: TeamPCP Supply Chain Attack (March 19-23, 2026)

---

## ID.SC - Supply Chain Risk Management

| Subcategory | Response Action | Responsible Team | Status |
|-------------|----------------|-----------------|--------|
| ID.SC-1: Cyber supply chain risk management processes are identified, established, assessed, managed, and agreed to | Update third-party risk register for Aqua Security/Trivy. Document supply chain dependency on open-source vulnerability scanners in CI/CD. | Compliance / GRC | In progress |
| ID.SC-2: Suppliers and third-party partners of information systems are identified, prioritized, and assessed | Inventory all pipelines using `aquasecurity/trivy-action`, `aquasecurity/setup-trivy`, and related Aqua Security GitHub Actions. Assess each for exposure during March 19-23 window. | Cloud / DevSecOps | Audit playbook delivered |
| ID.SC-3: Contracts with suppliers and third-party partners are used to implement appropriate measures | Review GitHub Actions usage policies. Mandate SHA-pinning for all third-party Actions. Evaluate Dependabot or Renovate for automated SHA tracking. | Cloud / DevSecOps + Legal | Remediation guide delivered |
| ID.SC-4: Suppliers and third-party partners are routinely assessed | Establish recurring audit of open-source dependencies in CI/CD pipelines. Add Trivy and similar scanner tools to critical dependency inventory. | Compliance / GRC | Recommended |

## PR.DS - Data Security

| Subcategory | Response Action | Responsible Team | Status |
|-------------|----------------|-----------------|--------|
| PR.DS-1: Data-at-rest is protected | Audit secrets storage: verify CI/CD secrets are not stored in plaintext workflow files. Confirm GitHub Actions secrets are masked in logs. | Cloud / DevSecOps | Audit playbook delivered |
| PR.DS-2: Data-in-transit is protected | The attack exfiltrated credentials via AES-256-CBC + RSA-4096 encrypted channel to `scan.aquasecurtiy.org`. Network monitoring for this C2 domain deployed. | SOC / Detection | Detection rules deployed |
| PR.DS-5: Protections against data leaks are implemented | Deploy DLP-style monitoring for mass credential exfiltration patterns. Monitor for `/proc/*/mem` scraping and bulk file system sweeps for `.ssh/`, `.aws/`, `.config/` paths. | Endpoint + SOC | Behavioral detections delivered |

## DE.CM - Continuous Monitoring

| Subcategory | Response Action | Responsible Team | Status |
|-------------|----------------|-----------------|--------|
| DE.CM-4: Malicious code is detected | Hash-based detection for all 10 Trivy v0.69.4 malicious binary variants deployed to CrowdStrike and MDE. | Endpoint | IOC imports delivered |
| DE.CM-7: Monitoring for unauthorized personnel, connections, devices, and software | Monitor for systemd user service creation (`sysmon.py`). Monitor for DNS queries to C2 domains. Monitor for outbound connections to `45.148.10.212`. | SOC / Detection | SPL + KQL rules delivered |
| DE.CM-8: Vulnerability scans are performed | Ironic: the vulnerability scanner itself was the attack vector. Audit Trivy version across all systems and containers. Quarantine images built with v0.69.4, v0.69.5, v0.69.6. | Cloud / DevSecOps | Audit scripts delivered |

## RS.AN - Analysis

| Subcategory | Response Action | Responsible Team | Status |
|-------------|----------------|-----------------|--------|
| RS.AN-1: Notifications from detection systems are investigated | Triage any alerts matching Trivy C2 indicators. Prioritize systems that ran pipelines between March 19-23. | SOC / Detection | Detection rules active |
| RS.AN-2: The impact of the incident is understood | Credential exposure blast radius assessment completed. Identifies which production systems are accessible with stolen CI/CD credentials. | Compliance / GRC | Assessment delivered |
| RS.AN-3: Forensics are performed | Preserve CI/CD pipeline logs from March 19-23. Check GitHub audit logs for any `tpcp-docs` repo creation (malware exfil indicator). Collect `sysmon.py` samples from affected developer machines. | SOC + Cloud / DevSecOps | Evidence preservation recommended |
| RS.AN-5: Processes are established to receive, analyze, and respond to vulnerabilities disclosed to the organization | This advisory was processed and routed to 9 teams with platform-native artifacts in under 60 seconds. | All teams | Complete |
