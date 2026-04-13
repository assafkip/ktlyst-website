# Identity Hardening Checklist

**Identity Provider:** Google Workspace
**Generated:** 2026-04-13

## Immediate Actions

- [ ] Run SCIM provisioning audit hunts from `identity/scim_audit.kql`
- [ ] Audit OAuth app consents from last 30 days
- [ ] Verify device code flow is restricted or blocked
- [ ] Review break-glass account exclusions

## Verification

- [ ] Policy tested in report-only mode before enforcement
- [ ] No legitimate device code flows broken by new policy
- [ ] Hunt query results reviewed and triaged