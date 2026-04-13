# SOC Playbook Index

**Advisory:** AA23-320A (FBI/CISA Joint Advisory)
**Prepared for:** Paramount Global
**Generated:** 2026-04-13
**Total playbooks:** 41

## How to Use

Each playbook corresponds to a detection rule in the `detection/` folder.
When an alert fires, open the matching playbook for step-by-step response.

## Playbooks

| # | Playbook | Technique |
|---|----------|-----------|
| 1 | `playbooks/playbook-t1018-remote_system_discovery.md` | t1018 remote system discovery |
| 2 | `playbooks/playbook-t1021.007-cloud_services.md` | t1021.007 cloud services |
| 3 | `playbooks/playbook-t1074-data_staged.md` | t1074 data staged |
| 4 | `playbooks/playbook-t1078-valid_accounts.md` | t1078 valid accounts |
| 5 | `playbooks/playbook-t1078.002-domain_accounts.md` | t1078.002 domain accounts |
| 6 | `playbooks/playbook-t1083-file_and_directory_discovery.md` | t1083 file and directory discovery |
| 7 | `playbooks/playbook-t1090-proxy.md` | t1090 proxy |
| 8 | `playbooks/playbook-t1114-email_collection.md` | t1114 email collection |
| 9 | `playbooks/playbook-t1136-create_account.md` | t1136 create account |
| 10 | `playbooks/playbook-t1199-trusted_relationship.md` | t1199 trusted relationship |
| 11 | `playbooks/playbook-t1204-user_execution.md` | t1204 user execution |
| 12 | `playbooks/playbook-t1213.002-sharepoint.md` | t1213.002 sharepoint |
| 13 | `playbooks/playbook-t1213.003-code_repositories.md` | t1213.003 code repositories |
| 14 | `playbooks/playbook-t1217-browser_information_discovery.md` | t1217 browser information discovery |
| 15 | `playbooks/playbook-t1219-remote_access_tools.md` | t1219 remote access tools |
| 16 | `playbooks/playbook-t1484.002-trust_modification.md` | t1484.002 trust modification |
| 17 | `playbooks/playbook-t1486-data_encrypted_for_impact.md` | t1486 data encrypted for impact |
| 18 | `playbooks/playbook-t1530-data_from_cloud_storage.md` | t1530 data from cloud storage |
| 19 | `playbooks/playbook-t1538-cloud_service_dashboard.md` | t1538 cloud service dashboard |
| 20 | `playbooks/playbook-t1539-steal_web_session_cookie.md` | t1539 steal web session cookie |
| 21 | `playbooks/playbook-t1552.001-credentials_in_files.md` | t1552.001 credentials in files |
| 22 | `playbooks/playbook-t1552.004-private_keys.md` | t1552.004 private keys |
| 23 | `playbooks/playbook-t1556.006-multi-factor_authentication.md` | t1556.006 multi factor authentication |
| 24 | `playbooks/playbook-t1566-phishing.md` | t1566 phishing |
| 25 | `playbooks/playbook-t1566.004-spearphishing_voice.md` | t1566.004 spearphishing voice |
| 26 | `playbooks/playbook-t1567-exfiltration_over_web_service.md` | t1567 exfiltration over web service |
| 27 | `playbooks/playbook-t1567.002-exfiltration_to_cloud_storage.md` | t1567.002 exfiltration to cloud storage |
| 28 | `playbooks/playbook-t1578.002-create_cloud_instance.md` | t1578.002 create cloud instance |
| 29 | `playbooks/playbook-t1583.001-domains.md` | t1583.001 domains |
| 30 | `playbooks/playbook-t1585.001-social_media_accounts.md` | t1585.001 social media accounts |
| 31 | `playbooks/playbook-t1589-gather_victim_identity_information.md` | t1589 gather victim identity information |
| 32 | `playbooks/playbook-t1593.001-social_media.md` | t1593.001 social media |
| 33 | `playbooks/playbook-t1594-search_victim-owned_websites.md` | t1594 search victim owned websites |
| 34 | `playbooks/playbook-t1597.002-purchase_technical_data.md` | t1597.002 purchase technical data |
| 35 | `playbooks/playbook-t1598-phishing_for_information.md` | t1598 phishing for information |
| 36 | `playbooks/playbook-t1598.004-spearphishing_voice.md` | t1598.004 spearphishing voice |
| 37 | `playbooks/playbook-t1606-forge_web_credentials.md` | t1606 forge web credentials |
| 38 | `playbooks/playbook-t1621-multi-factor_authentication_request_generation.md` | t1621 multi factor authentication request generation |
| 39 | `playbooks/playbook-t1648-serverless_execution.md` | t1648 serverless execution |
| 40 | `playbooks/playbook-t1656-impersonation.md` | t1656 impersonation |
| 41 | `playbooks/playbook-t1657-financial_theft.md` | t1657 financial theft |

## Escalation Path

1. **L1 SOC Analyst**: Triage using playbook steps, collect evidence
2. **L2 SOC Analyst**: Correlate across attack chain, determine scope
3. **L3 / IR Lead**: Containment decision, executive notification
4. **CISO**: Board notification if confirmed breach (see `executive/` folder)