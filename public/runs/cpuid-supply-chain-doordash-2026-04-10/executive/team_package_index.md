# Team Package Index

**Advisory:** Advisory Extraction
**Prepared for:** DoorDash
**Generated:** 2026-04-10
**Total files:** 37

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

### SOC / Detection Engineering (Splunk / Datadog)
- `detection/splunk_savedsearches.conf` -- drop into $SPLUNK_HOME
- `detection/sigma_rules/*.yml` -- convert with `sigma convert`

### Identity & Access Management (Okta)
- `identity/okta_policy_recommendation.json` -- deploy via Okta admin console

### Email Security (Google Workspace)
- `email/domains_blocklist.txt` -- one domain per line, import anywhere

### Endpoint Security (CrowdStrike Falcon)
- `endpoint/crowdstrike_ioc_import.json` -- import via Falcon API
- `endpoint/visibility_assessment.md` -- READ THIS: what EDR sees vs doesn't

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
