# Team Package Index

**Advisory:** Advisory Extraction
**Prepared for:** DoseSpot
**Generated:** 2026-04-09
**Total files:** 40

## Deployment Tiers

Each artifact has a deployment tier based on risk and reversibility:

- **Tier 1 (Auto-deploy):** IOC blocklists, domain blocks, watchlists. Low risk, time-sensitive.
- **Tier 2 (Detection-as-Code):** Detection rules, hunt queries. Human reviews a diff.
- **Tier 3 (Human Approval):** Policies, assessments, emulation plans. High impact, review required.

## Distribution Guide

Forward this index to team leads. Each team opens their folder.

### CISO / VP Security
- `executive/threat_brief.pdf` -- 3-page brief, forward to leadership
- This index file

### SOC / Detection Engineering (Microsoft Sentinel)
- `detection/sentinel_rules.json` -- import via Analytics blade
- `detection/sentinel_watchlist.csv` -- import via Watchlists
- `detection/splunk_savedsearches.conf` -- drop into $SPLUNK_HOME
- `detection/sigma_rules/*.yml` -- convert with `sigma convert`
- `detection/elastic_rules.ndjson` -- import via Detection Engine API

### Identity & Access Management (Microsoft Entra ID (Azure AD))
- `identity/entra_conditional_access_policy.json` -- deploy via Graph API (report-only mode)
- `identity/entra_hunt_queries.kql` -- paste into Log Analytics
- `identity/okta_policy_recommendation.json` -- review if using Okta

### Email Security (Microsoft 365 (Exchange Online))
- `email/domains_blocklist.txt` -- one domain per line, import anywhere
- `email/m365_transport_rule.ps1` -- PowerShell command, review before running
- `email/defender_tenant_blocklist.csv` -- import via Tenant Allow/Block List

### Endpoint Security (CrowdStrike Falcon)
- `endpoint/crowdstrike_ioc_import.json` -- import via Falcon API
- `endpoint/mde_ioc_import.csv` -- bulk import in MDE portal
- `endpoint/visibility_assessment.md` -- READ THIS: what EDR sees vs doesn't

### Cloud Security (Microsoft Azure)
- `cloud/azure_ad_hunt.kql` -- paste into Log Analytics
- `cloud/oauth_app_audit.kql` -- audit recent OAuth app consents
- `cloud/conditional_access_gaps.json` -- recommended CA policies

### Red / Purple Team
- `emulation/attack_navigator_layer.json` -- import into ATT&CK Navigator
- `emulation/atomic_tests/*.yaml` -- Atomic Red Team format
- `emulation/emulation_plan.md` -- ordered attack steps
- `emulation/detection_gap_matrix.md` -- what's covered vs not

### GRC / Compliance
- `compliance/framework_mapping.csv` -- NIST CSF + applicable frameworks
- `compliance/evidence_bundle.json` -- audit-ready provenance

### Raw IOC Data (Shared)
- `iocs/domains.csv` -- all IOC domains with source spans
- `iocs/domains.stix.json` -- STIX 2.1 bundle for TIP import
- `iocs/full_ioc_list.json` -- full structured IOC list