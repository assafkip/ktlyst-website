# Emulation Plan

**Advisory:** Credential Phishing and SIM Swapping Targeting IT Help Desks (CISA AA23-320A)
**Generated:** 2026-04-13

## Objective

Validate detection coverage for the attack techniques identified in this advisory.
Execute each step in a controlled environment and verify your detection rules fire.

## Attack Steps

### Step 1: Browser Information Discovery
**MITRE ATT&CK:** T1217

  T1217: Browser Information Discovery

### Step 2: Steal Web Session Cookie
**MITRE ATT&CK:** T1539

  T1539: Steal Web Session Cookie

### Step 3: Gather Victim Identity Information
**MITRE ATT&CK:** T1589

  T1589: Gather Victim Identity Information

### Step 4: Phishing for Information
**MITRE ATT&CK:** T1598

  T1598: Phishing for Information

### Step 5: Purchase Technical Data
**MITRE ATT&CK:** T1597.002

  T1597.002: Purchase Technical Data

### Step 6: Search Victim-Owned Websites
**MITRE ATT&CK:** T1594

  T1594: Search Victim-Owned Websites

### Step 7: Spearphishing Voice
**MITRE ATT&CK:** T1598.004

  T1598.004: Spearphishing Voice

### Step 8: Social Media
**MITRE ATT&CK:** T1593.001

  T1593.001: Social Media

### Step 9: Domains
**MITRE ATT&CK:** T1583.001

  T1583.001: Domains

### Step 10: Social Media Accounts
**MITRE ATT&CK:** T1585.001

  T1585.001: Social Media Accounts

### Step 11: Phishing
**MITRE ATT&CK:** T1566

  T1566: Phishing

### Step 12: Spearphishing Voice
**MITRE ATT&CK:** T1566.004

  T1566.004: Spearphishing Voice

### Step 13: Trusted Relationship
**MITRE ATT&CK:** T1199

  T1199: Trusted Relationship

### Step 14: Domain Accounts
**MITRE ATT&CK:** T1078.002

  T1078.002: Domain Accounts

### Step 15: Serverless Execution
**MITRE ATT&CK:** T1648

  T1648: Serverless Execution

### Step 16: User Execution
**MITRE ATT&CK:** T1204

  T1204: User Execution

### Step 17: Create Account
**MITRE ATT&CK:** T1136

  T1136: Create Account

### Step 18: Multi-Factor Authentication
**MITRE ATT&CK:** T1556.006

  T1556.006: Multi-Factor Authentication

### Step 19: Valid Accounts
**MITRE ATT&CK:** T1078

  T1078: Valid Accounts

### Step 20: Trust Modification
**MITRE ATT&CK:** T1484.002

  T1484.002: Trust Modification

### Step 21: Create Cloud Instance
**MITRE ATT&CK:** T1578.002

  T1578.002: Create Cloud Instance

### Step 22: Impersonation
**MITRE ATT&CK:** T1656

  T1656: Impersonation

### Step 23: Forge Web Credentials
**MITRE ATT&CK:** T1606

  T1606: Forge Web Credentials

### Step 24: Multi-Factor Authentication Request Generation
**MITRE ATT&CK:** T1621

  T1621: Multi-Factor Authentication Request Generation

### Step 25: Credentials In Files
**MITRE ATT&CK:** T1552.001

  T1552.001: Credentials In Files

### Step 26: Private Keys
**MITRE ATT&CK:** T1552.004

  T1552.004: Private Keys

### Step 27: Cloud Service Dashboard
**MITRE ATT&CK:** T1538

  T1538: Cloud Service Dashboard

### Step 28: File and Directory Discovery
**MITRE ATT&CK:** T1083

  T1083: File and Directory Discovery

### Step 29: Remote System Discovery
**MITRE ATT&CK:** T1018

  T1018: Remote System Discovery

### Step 30: Cloud Services
**MITRE ATT&CK:** T1021.007

  T1021.007: Cloud Services

### Step 31: Code Repositories
**MITRE ATT&CK:** T1213.003

  T1213.003: Code Repositories

### Step 32: Sharepoint
**MITRE ATT&CK:** T1213.002

  T1213.002: Sharepoint

### Step 33: Data Staged
**MITRE ATT&CK:** T1074

  T1074: Data Staged

### Step 34: Email Collection
**MITRE ATT&CK:** T1114

  T1114: Email Collection

### Step 35: Data from Cloud Storage
**MITRE ATT&CK:** T1530

  T1530: Data from Cloud Storage

### Step 36: Remote Access Tools
**MITRE ATT&CK:** T1219

  T1219: Remote Access Tools

### Step 37: Proxy
**MITRE ATT&CK:** T1090

  T1090: Proxy

### Step 38: Exfiltration Over Web Service
**MITRE ATT&CK:** T1567

  T1567: Exfiltration Over Web Service

### Step 39: Data Encrypted for Impact
**MITRE ATT&CK:** T1486

  T1486: Data Encrypted for Impact

### Step 40: Exfiltration to Cloud Storage
**MITRE ATT&CK:** T1567.002

  T1567.002: Exfiltration to Cloud Storage

### Step 41: Financial Theft
**MITRE ATT&CK:** T1657

  T1657: Financial Theft

## Execution Notes

- Execute in an isolated test environment with monitoring enabled
- Ensure SIEM ingestion is active before starting
- Document which detection rules fire for each step
- Record any gaps in the detection gap matrix