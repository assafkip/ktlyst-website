# Endpoint Visibility Assessment

**EDR:** CrowdStrike Falcon
**Generated:** 2026-04-10

## What Your EDR Sees

| Layer | Visibility | Notes |
|-------|-----------|-------|
| DNS resolution to IOC domains | HIGH | EDR captures DNS queries from endpoints |
| Network connections to IOC IPs | HIGH | Outbound connection telemetry |
| Browser process spawning | MEDIUM | Process tree visibility |
| Credential store access by non-browser | HIGH | Anomalous credential access |

## What Your EDR Does NOT See

| Layer | Visibility | Why |
|-------|-----------|-----|
| In-browser operations | NONE | JavaScript runs inside browser sandbox |
| Server-side auth flows | NONE | No endpoint footprint |
| Cloud API calls | NONE | Not endpoint activity |

## Recommended CrowdStrike Falcon Actions

1. Import IOC domain list into CrowdStrike Falcon as detect-mode indicators
2. Hunt for browser processes making connections to suspicious domains
3. Monitor for credential store access by non-browser processes