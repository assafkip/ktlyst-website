# Team Package Index: CI/CD Supply Chain Attack (Trivy/TeamPCP Campaign)

**Generated:** 2026-04-13
**Advisory Source:** Wiz Research - Trivy Compromised: TeamPCP Supply Chain Attack
**Run ID:** trivy-supply-chain-costanoa-2026-04-13

---

## Package Overview

1 advisory input. 9 team packages. Platform-native files for each team's toolchain.

---

| # | Team | Folder | Files | What They Received |
|---|------|--------|-------|--------------------|
| 1 | **SOC / Detection** | `detection/` | `trivy-supply-chain.spl`, `trivy-supply-chain.kql`, `trivy-sigma.yml` | Splunk + Sentinel detection rules for C2 domains, malicious binary execution, systemd persistence, `/proc/*/mem` scraping. SIGMA portable rules. Tier 1 (auto-deploy) IOC blocks + Tier 2 behavioral detections. |
| 2 | **IAM / Identity** | `identity/` | `github-token-rotation.md`, `service-account-audit.kql`, `oauth-app-review.md`, `session-invalidation.ps1` | Token rotation playbook for all GitHub PATs/deploy keys exposed during March 19-23. Service account audit query. OAuth grant review. Forced session invalidation for affected developers. |
| 3 | **Email Security** | `email/` | `developer-advisory-template.md`, `phishing-indicators.txt` | Copy-paste internal advisory for engineering team. Phishing patterns from spoofed commit authors for follow-on social engineering detection. |
| 4 | **Endpoint / IT** | `endpoint/` | `crowdstrike-ioc-import.json`, `mde-ioc-import.csv`, `persistence-hunt.ps1`, `trivy-version-audit.sh`, `visibility-assessment.md` | CrowdStrike + MDE IOC imports. PowerShell persistence hunter for `sysmon.py`. Bash script to audit Trivy v0.69.4 across systems and containers. D3FEND visibility gap assessment. |
| 5 | **Cloud / DevSecOps** | `cloud/` | `github-actions-audit.md`, `pin-actions-to-sha.md`, `container-image-audit.sh`, `aws-secrets-audit.py`, `npm-supply-chain-check.md` | GitHub Actions workflow audit playbook. SHA pinning remediation guide. Container registry quarantine script. AWS Secrets Manager access log audit. npm supply chain check for CanisterWorm expansion. |
| 6 | **Red Team / Purple Team** | `emulation/` | `attack-navigator-layer.json`, `atomic-red-team-tests.yml`, `detection-gap-matrix.md` | ATT&CK Navigator layer (T1195.002, T1555, T1005, T1041, T1098, T1547.014). Atomic Red Team test definitions. Detection gap matrix showing CI/CD blind spots. |
| 7 | **Executive / CISO** | `executive/` | `board_brief.md`, `team_package_index.md` | 3-section board brief (what happened, your exposure, response status). This index file. |
| 8 | **Compliance / GRC** | `compliance/` | `nist_csf_mapping.md`, `supply_chain_risk_update.md`, `credential_exposure_assessment.md`, `evidence_bundle.json` | NIST CSF mapping (ID.SC, PR.DS, DE.CM, RS.AN). Third-party risk register update for Aqua Security/Trivy. Credential exposure blast radius assessment. Timestamped evidence bundle. |
| 9 | **Threat Intel / IOCs** | `iocs/` | `trivy_stix_bundle.json`, `ioc_watchlist.csv`, `compromised_action_tags.json` | STIX 2.1 bundle with all IOCs, relationships, and attack patterns. Flat CSV watchlist for manual import. 20 representative compromised trivy-action commit hashes. |
