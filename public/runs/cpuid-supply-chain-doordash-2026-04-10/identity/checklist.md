# Identity Hardening Checklist

**Identity Provider:** Okta
**Generated:** 2026-04-10

## Immediate Actions

- [ ] Deploy Okta policy recommendation from `identity/okta_policy_recommendation.json`
- [ ] Audit OAuth app consents from last 30 days
- [ ] Verify device code flow is restricted or blocked
- [ ] Review break-glass account exclusions

## Verification

- [ ] Policy tested in report-only mode before enforcement
- [ ] No legitimate device code flows broken by new policy
- [ ] Hunt query results reviewed and triaged