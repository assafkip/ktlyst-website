# npm Supply Chain Check: CanisterWorm Expansion (March 22-23, 2026)

## Context

On March 22, 2026, the TeamPCP attackers used stolen npm tokens (harvested via the Trivy compromise) to publish malicious packages to the npm registry. This second wave, dubbed "CanisterWorm," is a separate attack vector that affects the npm ecosystem.

**This check is relevant if:** your organization publishes npm packages, or any developer whose credentials were potentially exfiltrated had npm publish access.

## Step 1: Check for Unauthorized npm Publishes

```bash
# List all packages in your npm org
npm access ls-packages @YOUR_ORG

# Check publish history for each package during the attack window
npm view @YOUR_ORG/PACKAGE_NAME time --json | \
  jq 'to_entries[] | select(.value >= "2026-03-22" and .value <= "2026-03-24")'
```

For each package in your org:
```bash
# Detailed version history
npm view @YOUR_ORG/PACKAGE_NAME versions --json

# Check who published recent versions
npm view @YOUR_ORG/PACKAGE_NAME --json | jq '.maintainers'
```

## Step 2: Audit npm Access Tokens

```bash
# List all tokens for your account
npm token list

# Identify tokens created or used during the attack window
# (npm CLI does not show last-used time - check npm audit logs in your org settings)
```

**Action:** Revoke and recreate ALL npm tokens that:
- Were accessible in CI/CD environments during March 19-23
- Belong to developers who ran Trivy v0.69.4
- Were stored as GitHub Actions secrets in affected workflows

## Step 3: Check for Known CanisterWorm Packages

Search your `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml` for recently added dependencies:

```bash
# Find lockfile changes during the attack window
git log --since="2026-03-22" --until="2026-03-24" --all -- '**/package-lock.json' '**/yarn.lock' '**/pnpm-lock.yaml'

# Diff lockfile to see what changed
git diff HEAD~10..HEAD -- package-lock.json | grep '^\+.*resolved'
```

## Step 4: Verify Package Integrity

```bash
# Run npm audit on all projects
npm audit --json > npm_audit_results.json

# Check for packages with install scripts (common malware vector)
npm ls --all --json | jq '.. | .scripts?.preinstall // empty, .scripts?.postinstall // empty, .scripts?.install // empty'

# Verify package checksums against registry
npm cache verify
```

## Step 5: Review npm Organization Audit Logs

If you have an npm Teams or Enterprise account:

1. Go to https://www.npmjs.com/settings/YOUR_ORG/audit-logs
2. Filter for date range: March 22-24, 2026
3. Look for:
   - `package.publish` events you don't recognize
   - `token.create` events from unusual IPs
   - `package.access` changes
   - New team members or collaborators added

## Step 6: Lockfile Verification

Add lockfile verification to your CI/CD pipeline to prevent future supply chain attacks:

```yaml
# GitHub Actions workflow
- name: Verify lockfile integrity
  run: |
    # Ensure no unexpected changes to lockfile
    npm ci --ignore-scripts
    # Compare installed tree against lockfile
    npm ls --all > /dev/null 2>&1
```

## Indicators to Watch

- npm packages with `preinstall` or `postinstall` scripts added after March 22
- Dependencies resolving to unexpected registry URLs
- New packages with names similar to existing popular packages (typosquatting)
- Packages with abnormally small version numbers or recent first publish dates

## Remediation

1. Revoke all npm tokens accessible from compromised CI/CD environments
2. Enable npm 2FA for all publish operations
3. Use `npm publish --provenance` for signed, verifiable packages
4. Implement Sigstore/in-toto attestation for your npm packages
5. Add `--ignore-scripts` to CI/CD npm install commands where possible
