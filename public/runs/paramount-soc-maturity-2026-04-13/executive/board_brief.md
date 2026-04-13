# Paramount Global - Advisory Brief

**Advisory:** Credential Phishing and SIM Swapping Targeting IT Help Desks (CISA AA23-320A)
**Source:** CISA
**Prepared:** 2026-04-13

## Business Impact

This advisory describes 41 behavioral attack pattern(s) and 12 infrastructure indicator(s) directly relevant to Paramount Global's stack. Successful exploitation would give an attacker durable access to identity, email, and cloud resources without triggering traditional endpoint alarms.

## Risk Quantification

- **Low-case loss:** $450K
- **Expected-case loss:** $1.4M
- **High-case loss:** $4.5M
- **Probability:** plausible within 12 months

Figures are order-of-magnitude estimates for a mid-size technology organization. Not a forecast. See `executive/risk_quantification.json` for the assumptions.

## Recommended Decision

- Approve the Tier 1 auto-deploy artifacts (IOC blocks, watchlists, tenant block lists).
- Route the Tier 2 detection-as-code changes through the existing SOC pull-request workflow this week.
- Schedule a review for the Tier 3 identity, cloud, and emulation artifacts before enforcement.

## Residual Risk

Even after full deployment, the browser and cloud layers remain partially blind. A red-team exercise against the emulation plan in `emulation/emulation_plan.md` is the fastest way to test coverage end-to-end.
