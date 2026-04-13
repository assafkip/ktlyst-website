# SOC Response Playbook: Private Keys

**Advisory:** Credential Phishing and SIM Swapping Targeting IT Help Desks (CISA AA23-320A)
**Prepared for:** Paramount Global
**Generated:** 2026-04-13
**MITRE ATT&CK:** T1552.004
**Layer:** auth
**SIEM:** Splunk

---

## Trigger

- Detection rule: `detection/splunk_savedsearches.conf`
- Detection rule: `detection/sigma_rules/*.yml`
- Alert name pattern: *Private Keys*

## Triage Steps

1. Confirm the alert is not a known false positive (see False Positive section below)
2. Query SigninLogs for the triggering entity (user/host/IP) in a 1-hour window
3. Check if the entity has prior alerts in the last 7 days
4. Review sign-in details: location, device, client app, risk level
5. Check for concurrent sessions from different geolocations

## Expected Evidence

Collect the following before escalating:

- **SigninLogs**: Query last 24h for the triggering entity
- **AADNonInteractiveUserSignInLogs**: Query last 24h for the triggering entity
- **AuditLogs**: Query last 24h for the triggering entity
- **Timeline**: Build a 1-hour window around the alert timestamp
- **Entity context**: User/host risk score, recent sign-in history

## Escalation Criteria

Escalate from L1 to L2/L3 when:

- Multiple alerts from the same attack chain fire within 1 hour
- The affected account is privileged (admin, service account, or executive)
- Evidence of successful credential access or data exfiltration
- The triggering entity is a critical asset (DC, CA server, key vault)
- Related rules from this advisory also fired (see Related Rules below)

## Containment Actions

If confirmed malicious:

- [ ] Disable the compromised user account in Entra ID
- [ ] Revoke all active sessions and refresh tokens
- [ ] Reset user credentials and MFA registration
- [ ] Review and revoke suspicious OAuth app consents

## False Positive Indicators

Common benign triggers for this rule:

- Legitimate device code flow used by CLI tools (Azure CLI, PowerShell)
- Admin performing bulk operations via Graph API
- Automated service accounts with expected sign-in patterns

## Related Rules (Attack Chain Context)

These rules may fire together as part of the same attack sequence:

- Browser Information Discovery (T1217)
- Steal Web Session Cookie (T1539)
- Gather Victim Identity Information (T1589)
- Phishing for Information (T1598)
- Purchase Technical Data (T1597.002)
- Search Victim-Owned Websites (T1594)
- Spearphishing Voice (T1598.004)
- Social Media (T1593.001)
- Domains (T1583.001)
- Social Media Accounts (T1585.001)
- Phishing (T1566)
- Spearphishing Voice (T1566.004)
- Trusted Relationship (T1199)
- Domain Accounts (T1078.002)
- Serverless Execution (T1648)
- User Execution (T1204)
- Create Account (T1136)
- Multi-Factor Authentication (T1556.006)
- Valid Accounts (T1078)
- Trust Modification (T1484.002)
- Create Cloud Instance (T1578.002)
- Impersonation (T1656)
- Forge Web Credentials (T1606)
- Multi-Factor Authentication Request Generation (T1621)
- Credentials In Files (T1552.001)
- Cloud Service Dashboard (T1538)
- File and Directory Discovery (T1083)
- Remote System Discovery (T1018)
- Cloud Services (T1021.007)
- Code Repositories (T1213.003)
- Sharepoint (T1213.002)
- Data Staged (T1074)
- Email Collection (T1114)
- Data from Cloud Storage (T1530)
- Remote Access Tools (T1219)
- Proxy (T1090)
- Exfiltration Over Web Service (T1567)
- Data Encrypted for Impact (T1486)
- Exfiltration to Cloud Storage (T1567.002)
- Financial Theft (T1657)
