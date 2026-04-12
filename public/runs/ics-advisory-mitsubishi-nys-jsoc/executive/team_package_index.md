# Team Package Index

**Advisory:** Advisory Extraction
**Prepared for:** NYS Office of Information Technology Services
**Generated:** 2026-04-12
**Total files:** 55

## Deployment Tiers

Each artifact has a deployment tier based on risk and reversibility:

- **Tier 1 (Auto-deploy):** IOC blocklists, domain blocks, watchlists. Low risk, time-sensitive.
- **Tier 2 (Detection-as-Code):** Detection rules, hunt queries. Human reviews a diff.
- **Tier 3 (Human Approval):** Policies, assessments, emulation plans. High impact, review required.

## Distribution Guide

Forward this index to team leads. Each team opens their folder.

### CISO / VP Security
- `executive/board_brief.md` -- 1-page board brief, paste into the board pack
- `executive/risk_quantification.json` -- loss bands + probability (reads into board brief)
- This index file

### SOC / Detection Engineering (Chronicle / Splunk (likely))
- `detection/splunk_savedsearches.conf` -- drop into $SPLUNK_HOME
- `detection/sigma_rules/*.yml` -- convert with `sigma convert`

### Identity & Access Management (Google Workspace)
- `identity/scim_audit.kql` -- SCIM provisioning audit hunts (vendor-neutral)

### Email Security (Microsoft 365 (Exchange Online))
- `email/domains_blocklist.txt` -- one domain per line, import anywhere
- `email/m365_transport_rule.ps1` -- PowerShell command, review before running
- `email/defender_tenant_blocklist.csv` -- import via Tenant Allow/Block List
- `email/proofpoint_url_defense.json` -- Proofpoint URL Defense custom block list + policy route

### Endpoint Security (Unknown (not inferable from DNS))
- `endpoint/visibility_assessment.md` -- READ THIS: what EDR sees vs doesn't

### Cloud Security (Google Cloud / AWS)
- `cloud/aws_waf_ip_set.json` -- AWS WAFv2 IPSet + rule group, Terraform-ready
- `cloud/gcp_armor_policy.yaml` -- GCP Cloud Armor policy, import via gcloud

### Red / Purple Team
- `emulation/attack_navigator_layer.json` -- import into ATT&CK Navigator
- `emulation/atomic_tests/*.yaml` -- Atomic Red Team format
- `emulation/caldera_adversary.yml` -- Caldera adversary profile
- `emulation/emulation_plan.md` -- ordered attack steps
- `emulation/detection_gap_matrix.md` -- what's covered vs not

### GRC / Compliance
- `compliance/framework_mapping.csv` -- NIST CSF + applicable frameworks
- `compliance/evidence_bundle.json` -- audit-ready provenance
- `compliance/audit_trail_entry.json` -- single-record audit log entry (SOC 2 / ISO 27001)

### Raw IOC Data (Shared)
- `iocs/domains.csv` -- all IOC domains with source spans
- `iocs/domains.stix.json` -- STIX 2.1 bundle for TIP import
- `iocs/misp_event.json` -- MISP 2.4 Event JSON for MISP bulk import
- `iocs/full_ioc_list.json` -- full structured IOC list
