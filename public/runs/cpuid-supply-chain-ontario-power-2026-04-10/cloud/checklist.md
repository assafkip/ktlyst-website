# Cloud Security Checklist

**Cloud Platform:** Microsoft Azure / AWS
**Generated:** 2026-04-13

## Immediate Actions

- [ ] Run Azure AD hunt queries from `cloud/azure_ad_hunt.kql`
- [ ] Run OAuth app audit from `cloud/oauth_app_audit.kql`
- [ ] Review conditional access gaps in `cloud/conditional_access_gaps.json`
- [ ] Deploy AWS WAFv2 IPSet + rule group from `cloud/aws_waf_ip_set.json` (non-prod first)
- [ ] Review `cloud/azure_sentinel_identity_analytic.json` in Sentinel > Analytics before enabling
- [ ] Check for unauthorized app consents in last 30 days

## Verification

- [ ] All suspicious sign-ins investigated
- [ ] Unauthorized app consents revoked
- [ ] CA gap recommendations reviewed with identity team