# GitHub Token Rotation Playbook - Trivy/TeamPCP Supply Chain Compromise

**Advisory:** CI/CD Supply Chain Attack (Trivy/TeamPCP Campaign)
**Attack Window:** March 19-23, 2026
**Priority:** CRITICAL - credential exfiltration confirmed in attack chain

---

## Background

The TeamPCP supply chain attack compromised Trivy v0.69.4 binaries and 75/76 trivy-action GitHub Action tags. The malware collected environment variables and filesystem credentials, then exfiltrated them via AES-256-CBC + RSA-4096 hybrid encryption to attacker-controlled infrastructure. Any GitHub token, PAT, or deploy key that was accessible in a CI/CD environment during March 19-23 should be treated as compromised.

---

## Phase 1: Identify Exposed Tokens (Day 1)

### GitHub Personal Access Tokens (PATs)

1. List all PATs across the organization:
   ```bash
   # For each org member, via GitHub API:
   gh api /orgs/{org}/members --paginate --jq '.[].login' | while read user; do
     echo "=== $user ==="
     gh api /users/$user/tokens 2>/dev/null || echo "No API access to user tokens"
   done
   ```

2. Check GitHub audit log for token usage during attack window:
   ```bash
   gh api /orgs/{org}/audit-log \
     --method GET \
     -f phrase='action:oauth_access.create+created:2026-03-19..2026-03-23' \
     --paginate
   ```

3. Identify tokens stored in repository secrets:
   ```bash
   gh api /orgs/{org}/repos --paginate --jq '.[].full_name' | while read repo; do
     echo "=== $repo ==="
     gh api /repos/$repo/actions/secrets --jq '.secrets[].name'
   done
   ```

### Deploy Keys

4. Audit deploy keys across all repositories:
   ```bash
   gh api /orgs/{org}/repos --paginate --jq '.[].full_name' | while read repo; do
     keys=$(gh api /repos/$repo/keys --jq 'length')
     if [ "$keys" -gt "0" ]; then
       echo "=== $repo: $keys deploy key(s) ==="
       gh api /repos/$repo/keys --jq '.[] | "\(.id) \(.title) \(.read_only) \(.created_at)"'
     fi
   done
   ```

### GitHub App Installations

5. List GitHub App installations with write access:
   ```bash
   gh api /orgs/{org}/installations --jq '.installations[] | "\(.app_slug) \(.permissions | to_entries | map(select(.value == "write")) | map(.key) | join(","))"'
   ```

---

## Phase 2: Rotate All Exposed Credentials (Day 1-2)

### Personal Access Tokens
- [ ] Revoke ALL classic PATs that existed before March 24
- [ ] Revoke fine-grained PATs with `repo`, `write:packages`, or `admin:org` scopes
- [ ] Issue new fine-grained PATs with minimum required scopes
- [ ] Update CI/CD secrets with new token values

### Deploy Keys
- [ ] Delete and regenerate deploy keys on all repositories that had CI/CD activity during March 19-23
- [ ] Rotate to read-only deploy keys where write is not required

### Repository Secrets
- [ ] Rotate ALL repository and organization secrets
- [ ] Rotate ALL environment secrets
- [ ] Pay special attention to: `NPM_TOKEN`, `DOCKER_USERNAME`/`DOCKER_PASSWORD`, AWS keys, `GHCR_TOKEN`

### Package Registry Tokens
- [ ] Revoke npm tokens (the attack expanded to npm via stolen tokens on March 22)
- [ ] Revoke Docker Hub access tokens
- [ ] Rotate GHCR tokens
- [ ] Rotate ECR credentials

---

## Phase 3: Harden (Day 2-3)

- [ ] Enforce fine-grained PATs with expiration (max 90 days)
- [ ] Enable IP allowlisting for GitHub Actions if available
- [ ] Pin all GitHub Actions to full SHA commit hashes (see cloud/pin-actions-to-sha.md)
- [ ] Enable required reviews for Actions workflow changes
- [ ] Set up GitHub Advanced Security secret scanning push protection
- [ ] Configure audit log streaming to SIEM

---

## Verification

After rotation, verify no compromised tokens remain active:

```bash
# Check for any authentication from suspicious IPs during attack window
gh api /orgs/{org}/audit-log \
  --method GET \
  -f phrase='created:2026-03-19..2026-03-23' \
  --paginate \
  --jq '.[] | select(.actor_ip != null) | "\(.created_at) \(.actor) \(.action) \(.actor_ip)"'
```

---

## KTLYST Provenance

- Source: Wiz Research - Trivy Compromised Supply Chain Attack
- MITRE: T1098 (Account Manipulation), T1195.002 (Supply Chain Compromise)
- Generated: 2026-04-13
