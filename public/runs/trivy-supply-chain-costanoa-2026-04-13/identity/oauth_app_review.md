# OAuth App Review - Trivy/TeamPCP Supply Chain Compromise

**Advisory:** CI/CD Supply Chain Attack (Trivy/TeamPCP Campaign)
**Attack Window:** March 19-23, 2026
**Priority:** HIGH - stolen credentials may have been used to authorize malicious OAuth apps

---

## Objective

Review all OAuth grants and third-party application authorizations for your GitHub organization. The TeamPCP malware exfiltrated credentials that could be used to authorize new OAuth apps with broad access to your repositories, packages, and CI/CD pipelines.

---

## Step 1: List Current OAuth App Authorizations

### Organization-level OAuth apps

```bash
# List all OAuth apps authorized for the org
gh api /orgs/{org}/installations --paginate --jq '.installations[] | {
  app: .app_slug,
  id: .id,
  created_at: .created_at,
  updated_at: .updated_at,
  permissions: .permissions,
  repository_selection: .repository_selection
}'
```

### User-level OAuth authorizations

Each developer who may have been compromised should review their authorizations:

1. Go to https://github.com/settings/applications
2. Review "Authorized OAuth Apps" tab
3. Review "Authorized GitHub Apps" tab
4. Flag any app authorized between March 19-23, 2026

---

## Step 2: Identify Suspicious Authorizations

Check the org audit log for OAuth activity during the attack window:

```bash
# OAuth app authorizations during attack window
gh api /orgs/{org}/audit-log \
  --method GET \
  -f phrase='action:oauth_authorization.create+created:2026-03-19..2026-03-23' \
  --paginate

# OAuth app access grants
gh api /orgs/{org}/audit-log \
  --method GET \
  -f phrase='action:oauth_access.create+created:2026-03-19..2026-03-23' \
  --paginate

# New GitHub App installations
gh api /orgs/{org}/audit-log \
  --method GET \
  -f phrase='action:integration_installation.create+created:2026-03-19..2026-03-23' \
  --paginate
```

---

## Step 3: Review Checklist

For each OAuth app currently authorized:

- [ ] **Known app?** Is this an app your team intentionally installed?
- [ ] **Install date:** Was it installed before March 19 or after March 23? (If during the window, investigate)
- [ ] **Permissions:** Does it have write access to repos, packages, or org settings?
- [ ] **Repository access:** Is it scoped to "all repositories" or specific ones?
- [ ] **Last used:** Check when the app last accessed your org resources
- [ ] **Publisher verified:** Is the app from a verified publisher on GitHub Marketplace?

---

## Step 4: Revoke Suspicious Apps

```bash
# Revoke a specific OAuth app installation
gh api -X DELETE /orgs/{org}/installations/{installation_id}

# Revoke user-level OAuth authorization
# Must be done per-user at: https://github.com/settings/applications
```

---

## Step 5: Harden OAuth Policies

- [ ] Enable GitHub Organization "Third-party application access policy" (restrict OAuth app access)
- [ ] Require admin approval for new OAuth app installations
- [ ] Set up audit log alerts for `oauth_authorization.create` and `integration_installation.create` events
- [ ] Review and restrict GitHub Actions permissions at org level (Settings > Actions > General)
- [ ] Enable "Require approval for all outside collaborators" for Actions workflows

---

## Red Flags to Watch For

- OAuth apps with `repo`, `admin:org`, or `write:packages` scopes
- Apps authorized by service accounts or bot accounts
- Apps with "All repositories" access that should be scoped
- Apps from unverified publishers
- Any app authorized between March 19-23, 2026 that wasn't explicitly requested by your team

---

## KTLYST Provenance

- Source: Wiz Research - Trivy Compromised Supply Chain Attack
- MITRE: T1098 (Account Manipulation), T1550 (Use Alternate Authentication Material)
- Generated: 2026-04-13
