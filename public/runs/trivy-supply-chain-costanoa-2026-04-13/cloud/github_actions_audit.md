# GitHub Actions Audit: Trivy/TeamPCP Supply Chain Compromise

## Objective
Identify all GitHub Actions workflows that reference compromised Trivy actions and determine if any executed during the attack window (March 19-23, 2026).

## Step 1: Identify Affected Workflows

Search your organization's repositories for references to compromised actions:

```bash
# Search across all org repos for trivy-action references
gh search code "aquasecurity/trivy-action" --owner YOUR_ORG -L 100

# Search for setup-trivy references
gh search code "aquasecurity/setup-trivy" --owner YOUR_ORG -L 100

# Search for other compromised actions
gh search code "aquasecurity/tfsec-action" --owner YOUR_ORG -L 100
gh search code "aquasecurity/kics-github-action" --owner YOUR_ORG -L 100
```

Or locally across cloned repos:

```bash
# Find all workflow files referencing Trivy
find . -path '*/.github/workflows/*.yml' -exec grep -l 'aquasecurity/trivy-action\|aquasecurity/setup-trivy' {} \;
```

## Step 2: Check Attack Window Runs (March 19-23, 2026)

For each repository identified in Step 1:

```bash
# List workflow runs during the attack window
gh run list --repo YOUR_ORG/REPO_NAME \
  --created "2026-03-19..2026-03-23" \
  --limit 100 \
  --json databaseId,name,status,conclusion,createdAt,headBranch

# Get detailed logs for suspicious runs
gh run view RUN_ID --repo YOUR_ORG/REPO_NAME --log
```

## Step 3: Check for Exfiltration Indicators

```bash
# Search for tpcp-docs repos (created by malware to store stolen data)
gh repo list YOUR_ORG --json name | jq '.[] | select(.name | contains("tpcp-docs"))'

# Check for repos created during the attack window
gh api "/orgs/YOUR_ORG/repos?sort=created&direction=desc&per_page=100" \
  | jq '.[] | select(.created_at >= "2026-03-19" and .created_at <= "2026-03-24") | {name, created_at, private}'
```

## Step 4: Audit Action Versions

Check if your workflows were using tag-based references (vulnerable) vs SHA-pinned (safe):

```bash
# Extract all action references from workflows
grep -rh 'uses:.*aquasecurity/' .github/workflows/ | sort -u
```

**Vulnerable patterns (tag-based):**
```yaml
# These were ALL compromised via force-pushed tags
- uses: aquasecurity/trivy-action@v0.69.4
- uses: aquasecurity/trivy-action@master
- uses: aquasecurity/trivy-action@main
- uses: aquasecurity/setup-trivy@v0.2.0
```

**Safe pattern (SHA-pinned):**
```yaml
# SHA pins are immutable - force-push cannot change them
- uses: aquasecurity/trivy-action@a]b2c4f1a4683ad9170d3de4a0c45a24f5ef70a9  # v0.68.0
```

## Step 5: Check Workflow Secrets Exposure

If any workflow ran during the attack window with a compromised action:

1. **List all secrets accessible to the workflow:**
   ```bash
   gh secret list --repo YOUR_ORG/REPO_NAME
   gh secret list --org YOUR_ORG
   ```

2. **These secrets should be considered compromised and rotated:**
   - GitHub tokens (GITHUB_TOKEN, PATs)
   - Cloud provider credentials (AWS_ACCESS_KEY_ID, AZURE_CREDENTIALS, GCP_SA_KEY)
   - Container registry tokens (DOCKER_PASSWORD, GHCR_TOKEN)
   - npm tokens (NPM_TOKEN)
   - Any custom secrets mounted in the workflow

## Step 6: Review Workflow Run Artifacts

```bash
# Check if any workflow run created unexpected artifacts
gh run view RUN_ID --repo YOUR_ORG/REPO_NAME --json jobs \
  | jq '.jobs[] | {name, steps: [.steps[] | {name, conclusion, number}]}'
```

Look for:
- Unexpected network connections in logs
- Steps that took longer than usual
- References to `/proc/*/mem` in logs
- Any `tpcp` or `pglog` strings in output

## Affected Action Tags (75 of 76 trivy-action tags compromised)

All version tags from the following actions were force-pushed with malicious code:
- `aquasecurity/trivy-action` (75/76 tags)
- `aquasecurity/setup-trivy` (7 tags)
- `aquasecurity/kics-github-action` (secondary, March 23)

## Remediation

1. Pin all GitHub Actions to full SHA immediately (see `pin_actions_to_sha.md`)
2. Rotate all secrets accessible to affected workflows
3. Review GitHub audit logs for the attack window
4. Remove any `tpcp-docs` repos found in your org
5. Check npm package registry for unauthorized publishes (see `npm_supply_chain_check.md`)
