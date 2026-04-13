# Credential Exposure Blast Radius Assessment

**Date:** 2026-04-13
**Incident:** Trivy/TeamPCP Supply Chain Compromise (March 19-23, 2026)
**Scope:** CI/CD secrets potentially exfiltrated during attack window

---

## Executive Summary

If any CI/CD pipeline executed Trivy v0.69.4 or triggered a compromised `trivy-action`/`setup-trivy` GitHub Action between March 19-23, 2026, all secrets accessible to that pipeline execution context should be considered compromised. This assessment maps the blast radius.

---

## Credential Categories at Risk

### 1. GitHub Tokens and Keys

| Credential Type | Exposure Vector | Production System Access |
|----------------|-----------------|------------------------|
| `GITHUB_TOKEN` (automatic) | Injected into every Actions workflow run | Read/write to triggering repository. If `permissions` block is not restricted, may include `packages:write`, `contents:write`. |
| Personal Access Tokens (PATs) | Stored as repository or org secrets | Depends on PAT scope. Classic PATs may grant `repo`, `admin:org`, `write:packages`. |
| Deploy keys | Stored as repository secrets | SSH push access to specific repositories |
| GitHub App tokens | Generated during workflow | Scoped to app installation permissions |

**Breach notification trigger:** If PATs with `admin:org` scope were exfiltrated, attackers may have accessed private repositories, org settings, and member data. Review for PII/PHI in private repos.

### 2. Cloud Provider Credentials

| Credential Type | Exposure Vector | Production System Access |
|----------------|-----------------|------------------------|
| AWS Access Keys (`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`) | Stored as Actions secrets | Depends on IAM policy attached. CI/CD keys often have ECR push, S3 write, and ECS/EKS deploy permissions. |
| Azure Service Principal (`AZURE_CREDENTIALS`) | Stored as Actions secrets | Contributor role on resource groups used for deployment. May include AKS, ACR, Key Vault access. |
| GCP Service Account Key | Stored as Actions secrets | Depends on IAM roles. Typically includes Artifact Registry, GKE, Cloud Run deploy permissions. |

**Breach notification trigger:** If cloud credentials grant access to data stores containing customer data (S3 buckets, Azure Blob, BigQuery), review access logs for unauthorized reads during and after March 19-23.

### 3. Container Registry Credentials

| Credential Type | Exposure Vector | Production System Access |
|----------------|-----------------|------------------------|
| Docker Hub token | Stored as Actions secrets | Push access to org images. Attacker could publish malicious images under your namespace. |
| GHCR token | Via `GITHUB_TOKEN` or PAT | Push access to GitHub Container Registry packages |
| ECR credentials | Via AWS keys | Push access to Amazon ECR repositories |

**Breach notification trigger:** Audit all container images published between March 19 and credential rotation date. Any image published with stolen credentials should be treated as potentially tampered.

### 4. Package Registry Credentials

| Credential Type | Exposure Vector | Production System Access |
|----------------|-----------------|------------------------|
| npm token (`NPM_TOKEN`) | Stored as Actions secrets | Publish access to org npm packages. The TeamPCP attack explicitly expanded to npm via stolen tokens (CanisterWorm, March 22). |
| PyPI token | Stored as Actions secrets | Publish access to Python packages |

**Breach notification trigger:** If npm/PyPI tokens were exposed, audit all package versions published after March 19. Notify downstream consumers if tampering is detected.

### 5. Infrastructure and SaaS Credentials

| Credential Type | Examples | Risk |
|----------------|----------|------|
| Database connection strings | `DATABASE_URL`, `MONGODB_URI` | Direct production database access |
| API keys | Stripe, Twilio, SendGrid, Datadog | Service abuse, data access |
| Secrets manager tokens | Vault token, AWS Secrets Manager | Access to additional secrets not stored in GitHub |
| Slack/Discord webhooks | Notification channel URLs | Social engineering, internal comms monitoring |

---

## Blast Radius Summary

| Scenario | Systems at Risk | Estimated Impact |
|----------|----------------|-----------------|
| **Minimal** (only `GITHUB_TOKEN` exposed) | Triggering repository only | Low - token expires after workflow run |
| **Moderate** (PATs + cloud keys exposed) | Cloud infrastructure, container registries, private repos | High - persistent access until rotation |
| **Maximum** (all CI/CD secrets exposed) | Production databases, SaaS integrations, package registries, cloud infrastructure | Critical - full lateral movement potential |

---

## Breach Notification Trigger Analysis

| Regulation | Trigger Condition | Applies? |
|-----------|-------------------|----------|
| **GDPR Art. 33** | If exfiltrated credentials were used to access EU personal data | Assess cloud access logs |
| **CCPA** | If California resident data was accessible via stolen credentials | Assess cloud access logs |
| **SOC 2** | Material security event affecting production systems | Likely - document in incident log |
| **PCI DSS** | If cardholder data environments are accessible via CI/CD credentials | Assess scope of CI/CD access |
| **HIPAA** | If PHI is accessible via stolen credentials | Assess if applicable |

---

## Recommended Timeline

| Action | Deadline |
|--------|----------|
| Rotate all GitHub tokens, PATs, deploy keys | 48 hours |
| Rotate all cloud provider credentials used in CI/CD | 48 hours |
| Rotate container and package registry tokens | 48 hours |
| Audit cloud access logs for unauthorized access | 72 hours |
| Audit package registries for unauthorized publishes | 72 hours |
| Complete breach notification assessment | 5 business days |
| Update third-party risk register | 5 business days |
| Implement SHA pinning for all GitHub Actions | 14 days |
