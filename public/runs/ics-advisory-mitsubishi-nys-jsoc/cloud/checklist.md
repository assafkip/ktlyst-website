# Cloud Security Checklist

**Cloud Platform:** Google Cloud / AWS
**Generated:** 2026-04-13

## Immediate Actions

- [ ] Deploy AWS WAFv2 IPSet + rule group from `cloud/aws_waf_ip_set.json` (non-prod first)
- [ ] Import Cloud Armor policy with `gcloud compute security-policies import` from `cloud/gcp_armor_policy.yaml`
- [ ] Check for unauthorized app consents in last 30 days

## Verification

- [ ] All suspicious sign-ins investigated
- [ ] Unauthorized app consents revoked
- [ ] CA gap recommendations reviewed with identity team