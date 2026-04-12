# Emulation Plan

**Advisory:** Advisory Extraction
**Generated:** 2026-04-12

## Objective

Validate detection coverage for the attack techniques identified in this advisory.
Execute each step in a controlled environment and verify your detection rules fire.

## Attack Steps

### Step 1: Local credential harvesting from SQLite cache files
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Gain local access to system with vulnerable ICONICS/GENESIS products
  • Step 2: Navigate to C:\ProgramData\ICONICS\Cache\ directory
  • Step 3: Extract plaintext SQL Server credentials from *.sdf cache files
  • Step 4: Use harvested credentials to access SQL Server database
  Detection: Monitor file access to ICONICS cache directories and detect unauthorized reading of .sdf files

### Step 2: GUI-based credential exposure through Hyper Historian Splitter
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Gain access to system with Hyper Historian installed
  • Step 2: Launch HHSplitter.exe application
  • Step 3: View SQL Server credentials displayed in plaintext in GUI
  • Step 4: Use exposed credentials for database access
  Detection: Monitor execution of HHSplitter.exe and log GUI access patterns for credential exposure

### Step 3: Credential harvesting from GENESIS SQLite cache
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Gain local access to GENESIS system
  • Step 2: Navigate to C:\ProgramData\ICONICS\11\Cache\ directory
  • Step 3: Extract plaintext credentials from *.sqlite3 files
  • Step 4: Leverage credentials for lateral movement or data access
  Detection: Monitor file system access to GENESIS cache directories and detect reading of sqlite3 files

### Step 4: Social engineering to gain initial system access
**MITRE ATT&CK:** T1566

  Behaviors:
  • Step 1: Send phishing email with malicious link or attachment
  • Step 2: User clicks link or opens attachment from untrusted source
  • Step 3: Gain initial foothold on system with vulnerable ICONICS products
  • Step 4: Escalate to credential harvesting from cache files
  Detection: Monitor email security gateways for suspicious attachments and track user interaction with untrusted links

### Step 5: Network-based attack progression to credential theft
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Gain remote access through unprotected network exposure
  • Step 2: Bypass insufficient firewall controls to reach ICS systems
  • Step 3: Access vulnerable ICONICS/GENESIS products on internal network
  • Step 4: Extract credentials from local cache files for persistence
  Detection: Monitor network traffic to ICS systems and detect unauthorized remote access attempts

### Step 6: Physical access exploitation for credential harvesting
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Gain unauthorized physical access to PC with vulnerable products
  • Step 2: Log in with non-administrator account or bypass authentication
  • Step 3: Access ICONICS cache directories directly from file system
  • Step 4: Extract plaintext SQL credentials for database compromise
  Detection: Monitor physical access logs and detect unauthorized file system access to cache directories

### Step 7: Privilege escalation through credential reuse
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Extract SQL Server credentials from ICONICS cache files
  • Step 2: Test harvested credentials against other systems in environment
  • Step 3: Gain elevated database access through credential reuse
  • Step 4: Perform data disclosure, tampering, or denial of service attacks
  Detection: Monitor for credential reuse patterns and unusual database access from harvested accounts

### Step 8: Multi-vector attack combining network and local access
**MITRE ATT&CK:** T1078

  Behaviors:
  • Step 1: Establish remote VPN connection to target network
  • Step 2: Exploit weak VPN security to access internal ICS systems
  • Step 3: Leverage local vulnerabilities in ICONICS products
  • Step 4: Extract credentials and establish persistent database access
  Detection: Correlate VPN access logs with local file system activity on ICS systems

## Execution Notes

- Execute in an isolated test environment with monitoring enabled
- Ensure SIEM ingestion is active before starting
- Document which detection rules fire for each step
- Record any gaps in the detection gap matrix