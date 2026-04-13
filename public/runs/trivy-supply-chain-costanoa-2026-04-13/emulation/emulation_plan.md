# Emulation Plan: Trivy/TeamPCP Supply Chain Attack

## Overview

This plan enables purple team testing of the 4-stage Trivy/TeamPCP supply chain attack. Each stage includes safe test procedures, expected detections, and pass/fail criteria.

**Threat:** TeamPCP supply chain compromise of Trivy vulnerability scanner
**Attack Window:** March 19-23, 2026
**Source:** Wiz Research
**ATT&CK Techniques:** T1195.002, T1548, T1555, T1005, T1041, T1087, T1098, T1547.014, T1187

## Prerequisites

- Isolated test environment (do NOT run on production systems)
- Linux VM with systemd (Ubuntu 22.04+ recommended)
- Docker installed (for container image tests)
- GitHub CLI (`gh`) for audit log tests
- Auditd installed and running
- EDR agent active on test system
- SIEM receiving logs from test system

## Stage 1: Malicious Binary Substitution

**Emulates:** Trojanized Trivy binary running in CI/CD pipeline context

### Test Procedure

1. Run the Atomic Red Team test:
   ```bash
   # See: atomic_tests/t1195_002_malicious_binary_substitution.yaml
   ```

2. The test binary will:
   - Write itself to a CI tool path
   - Execute and collect environment variable names
   - Enumerate CI/CD context variables
   - Write results to a local file

### Expected Detections

| Control | Expected Alert | Pass Criteria |
|---|---|---|
| EDR | New executable in /usr/local/bin | Alert within 60s |
| EDR | Process reading env vars with secret patterns | Alert or telemetry logged |
| SIEM | Process execution from unusual path | Correlation rule fires |
| Auditd | File creation in binary path | Audit log entry present |

### Pass/Fail

- **PASS:** At least 2 of 4 detections fire
- **FAIL:** No alerts generated (blind spot confirmed)

---

## Stage 2: /proc/pid/mem Memory Scraping

**Emulates:** In-memory credential extraction from running processes

### Test Procedure

1. Start a process with known environment variables:
   ```bash
   export TEST_SECRET_KEY="teampcp-emulation-test-value"
   sleep 3600 &
   TARGET_PID=$!
   ```

2. Run the Atomic Red Team test:
   ```bash
   # See: atomic_tests/t1005_proc_mem_scraping.yaml
   ```

3. Verify auditd captures the access:
   ```bash
   ausearch -k proc_mem_access --start recent
   ```

### Expected Detections

| Control | Expected Alert | Pass Criteria |
|---|---|---|
| Auditd | /proc/pid/mem read access | Log entry with key proc_mem_access |
| EDR | Cross-process memory read | Alert or telemetry (often missing) |
| SIEM | Auditd log forwarded | Event visible in SIEM within 5 min |

### Pass/Fail

- **PASS:** Auditd rule fires and forwards to SIEM
- **FAIL:** No detection of /proc/pid/mem access (deploy auditd rule: `-a always,exit -F arch=b64 -S open -F path=/proc -F perm=r -k proc_mem_access`)

---

## Stage 3: Exfiltration Preparation and Staging

**Emulates:** Credential collection, encryption, and exfil staging

### Test Procedure

1. Run the Atomic Red Team test:
   ```bash
   # See: atomic_tests/t1041_github_actions_exfil.yaml
   ```

2. The test will:
   - Enumerate credential file locations (not contents)
   - Create a tar.gz bundle (simulating encrypted exfil package)
   - Log what the real attack would send to C2

3. Optionally test DNS detection:
   ```bash
   # Generate DNS query for C2 domain (will NOT connect)
   nslookup scan.aquasecurtiy.org 2>/dev/null || true
   nslookup tdtqy-oyaaa-aaaae-af2dq-cai.raw.icp0.io 2>/dev/null || true
   ```

### Expected Detections

| Control | Expected Alert | Pass Criteria |
|---|---|---|
| EDR | Enumeration of ~/.ssh, ~/.aws directories | Telemetry logged |
| EDR | tar/gzip of sensitive directory contents | Alert or telemetry |
| Network/DNS | DNS query to known C2 domain | DNS alert fires |
| SIEM | IOC match on domain or IP | Correlation rule fires |

### Pass/Fail

- **PASS:** DNS/IOC detection fires, file enumeration logged
- **FAIL:** No detection of credential file enumeration or DNS C2 query

---

## Stage 4: systemd User Service Persistence

**Emulates:** Persistent backdoor polling C2 every 5 minutes

### Test Procedure

1. Run the Atomic Red Team test:
   ```bash
   # See: atomic_tests/t1547_014_systemd_persistence.yaml
   ```

2. The test will:
   - Create `~/.config/systemd/user/sysmon_test.py` (benign version)
   - Register a systemd user service
   - Enable and start the service
   - Service runs 3 polling cycles then stops

3. Verify detection:
   ```bash
   # Check if EDR detected the new service
   systemctl --user status sysmon-test.service

   # Check auditd for file creation
   ausearch -f sysmon_test.py --start recent
   ```

### Expected Detections

| Control | Expected Alert | Pass Criteria |
|---|---|---|
| EDR | New file in ~/.config/systemd/user/ | Alert within 60s |
| EDR | systemctl --user enable command | Telemetry logged |
| Auditd | File creation in systemd user dir | Log entry present |
| SIEM | New autostart entry detected | Rule fires |

### Pass/Fail

- **PASS:** File creation and service activation detected
- **FAIL:** No detection of user-level systemd persistence (this is the expected gap for most deployments)

---

## Cleanup

After all tests, run cleanup for each atomic test:

```bash
# Stage 1 cleanup
rm -f /usr/local/bin/trivy-test /tmp/teampcp_test_exfil.txt

# Stage 2 cleanup
rm -f /tmp/teampcp_procmem_test.txt
kill $TARGET_PID 2>/dev/null

# Stage 3 cleanup
rm -rf /tmp/teampcp_exfil_test

# Stage 4 cleanup
systemctl --user stop sysmon-test.service 2>/dev/null
systemctl --user disable sysmon-test.service 2>/dev/null
rm -f ~/.config/systemd/user/sysmon_test.py
rm -f ~/.config/systemd/user/sysmon-test.service
systemctl --user daemon-reload
rm -f /tmp/teampcp_persistence_test.log
```

## Scoring

| Stage | Weight | Notes |
|---|---|---|
| Stage 1: Binary substitution | 15% | Most EDRs should detect new executable |
| Stage 2: Memory scraping | 30% | Critical gap - /proc/pid/mem is under-monitored |
| Stage 3: Exfil preparation | 25% | DNS/IOC detection is baseline |
| Stage 4: systemd persistence | 30% | User-level persistence is commonly missed |

**Score interpretation:**
- 80-100%: Strong detection posture for supply chain attacks
- 50-79%: Partial coverage, critical gaps in CI/CD and persistence
- Below 50%: Significant blind spots, prioritize gaps identified above
