# Third-Party Risk Register Update: CI/CD Supply Chain Attack

**Date:** 2026-04-13
**Trigger Event:** Trivy/TeamPCP Supply Chain Compromise (March 19-23, 2026)
**Source:** Wiz Research

---

## Vendor Risk Assessment: Aqua Security (Trivy)

| Field | Value |
|-------|-------|
| **Vendor** | Aqua Security Ltd. |
| **Product** | Trivy (open-source vulnerability scanner) |
| **Category** | CI/CD Security Tooling |
| **Prior Risk Rating** | Low (widely adopted, open-source, active maintenance) |
| **Updated Risk Rating** | High |
| **Reason for Change** | Multi-stage supply chain compromise via retained access from prior incident. Attackers published malicious binaries through legitimate release pipeline, compromised 82+ GitHub Action tags, and deployed credential-stealing malware with persistence. |

### Incident Summary

- Attackers retained access from a **prior Aqua Security incident** (root cause of initial access)
- Pushed malicious commits via spoofed developer identities
- Malicious Trivy v0.69.4 distributed through official channels (GitHub Releases, Docker Hub, GHCR, ECR)
- 75/76 `trivy-action` tags and 7 `setup-trivy` tags force-pushed with credential-stealing payload
- Exfiltrated credentials to typosquatted domain `scan.aquasecurtiy.org`
- Deployed systemd persistence mechanism (`sysmon.py`) on developer machines
- Attack expanded to npm ecosystem via stolen tokens (March 22)

### Risk Factors

| Factor | Assessment |
|--------|-----------|
| **Criticality to operations** | High - embedded in CI/CD pipeline, runs on every build |
| **Data access** | Critical - inherits all CI/CD environment secrets and credentials |
| **Substitutability** | Medium - alternatives exist (Grype, Snyk) but migration requires pipeline changes |
| **Prior incident history** | This is the second compromise stemming from retained attacker access |
| **Response quality** | Under assessment - Aqua Security's response timeline and root cause analysis pending |

### Recommended Actions

1. **Immediate:** Pin all Aqua Security GitHub Actions to verified SHA commit hashes
2. **Short-term (1 week):** Rotate all credentials accessible to CI/CD pipelines during March 19-23
3. **Medium-term (30 days):** Evaluate alternative vulnerability scanners for CI/CD (Grype, Snyk Container)
4. **Ongoing:** Add Trivy and CI/CD scanner dependencies to quarterly vendor risk review

---

## Supply Chain Risk: GitHub Actions

| Field | Value |
|-------|-------|
| **Platform** | GitHub Actions |
| **Risk Category** | CI/CD Supply Chain |
| **Prior Risk Rating** | Medium |
| **Updated Risk Rating** | High |
| **Reason for Change** | Tag-based versioning enables force-push attacks. Any Action referenced by tag (e.g., `@v4`) can be silently replaced without downstream notification. |

### Governance Recommendations

1. **Mandate SHA pinning** for all third-party GitHub Actions across all repositories
2. **Deploy Dependabot or Renovate** to automate SHA tracking and update notifications
3. **Restrict GitHub Actions permissions** to minimum required scope per workflow
4. **Audit GitHub Actions marketplace** usage quarterly
5. **Implement allowlists** for approved Actions at the organization level

---

## Supply Chain Risk: Open-Source Dependency Governance

| Field | Value |
|-------|-------|
| **Category** | Open-Source Software Supply Chain |
| **Risk Rating** | High |
| **Key Finding** | Security tooling itself (Trivy) became the attack vector. Traditional dependency scanning does not cover the scanner. |

### Governance Gap Analysis

| Gap | Description | Remediation |
|-----|-------------|-------------|
| Scanner integrity | No verification that the vulnerability scanner binary itself is legitimate | Implement binary verification via cosign/sigstore for scanner binaries |
| CI/CD secret scoping | CI/CD environments often have access to more secrets than needed | Implement least-privilege secret access per workflow step |
| Tag mutability | GitHub Action tags are mutable references | SHA pinning policy + automated enforcement |
| Transitive trust | Trusting a scanner = trusting its entire supply chain | Evaluate scanner supply chain as part of vendor risk |
