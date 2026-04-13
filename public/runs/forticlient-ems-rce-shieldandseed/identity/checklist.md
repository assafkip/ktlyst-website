# Identity Hardening Checklist

**Identity Provider:** Unknown
**Generated:** 2026-04-13

## Immediate Actions

- [ ] Review Conditional Access policy in `identity/entra_conditional_access_policy.json`
- [ ] Run hunt queries from `identity/entra_hunt_queries.kql` in Log Analytics
- [ ] Deploy Okta policy recommendation from `identity/okta_policy_recommendation.json`
- [ ] Enable Okta behavior detection rule from `identity/okta_behavior_detection.json`
- [ ] Run SCIM provisioning audit hunts from `identity/scim_audit.kql`
- [ ] Audit OAuth app consents from last 30 days
- [ ] Verify device code flow is restricted or blocked
- [ ] Review break-glass account exclusions

## Verification

- [ ] Policy tested in report-only mode before enforcement
- [ ] No legitimate device code flows broken by new policy
- [ ] Hunt query results reviewed and triaged