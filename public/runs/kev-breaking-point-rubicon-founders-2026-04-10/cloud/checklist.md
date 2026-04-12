# Cloud Security Checklist

**Cloud Platform:** Microsoft Azure
**Generated:** 2026-04-10

## Immediate Actions

- [ ] Run Azure AD hunt queries from `cloud/azure_ad_hunt.kql`
- [ ] Run OAuth app audit from `cloud/oauth_app_audit.kql`
- [ ] Review conditional access gaps in `cloud/conditional_access_gaps.json`
- [ ] Check for unauthorized app consents in last 30 days

## Verification

- [ ] All suspicious sign-ins investigated
- [ ] Unauthorized app consents revoked
- [ ] CA gap recommendations reviewed with identity team