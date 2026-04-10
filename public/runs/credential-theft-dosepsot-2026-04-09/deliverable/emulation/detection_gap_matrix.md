# Detection Gap Matrix

**Target Stack:** email: Microsoft 365 (Exchange Online), identity: Microsoft Entra ID (Azure AD), cloud: Microsoft Azure, edr: CrowdStrike Falcon, siem: Microsoft Sentinel
**Generated:** 2026-04-09

## Coverage Summary

- Covered steps: 3/3
- Uncovered steps: 0/3

## Step-by-Step Coverage

| # | Attack Step | Layer | Covered? | Detection Source |
|---|------------|-------|----------|-----------------|
| 1 | Phishing email | email | YES | Email gateway |
| 2 | Payload delivery | network | YES | Network proxy |
| 3 | Post-compromise access | cloud | YES | Cloud app logs |

## Key Gaps

- All steps have at least one detection surface

## Recommendations for Red Team

- Test steps 1, 2, 3 (covered) to validate detection rules fire