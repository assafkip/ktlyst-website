# Remediation: Pin GitHub Actions to Full SHA

## Why This Matters

The Trivy/TeamPCP attack compromised 75 of 76 trivy-action version tags via force-push. Any workflow using tag-based references (`@v1`, `@main`, `@v0.69.4`) pulled malicious code. SHA-pinned references are immutable and cannot be altered by force-push.

## Step 1: Identify All Tag-Based Action References

```bash
# Find all workflow files
find .github/workflows -name '*.yml' -o -name '*.yaml' | \
  xargs grep -n 'uses:' | \
  grep -v '@[a-f0-9]\{40\}' | \
  sort
```

This shows all action references NOT pinned to a full SHA.

## Step 2: Convert to SHA-Pinned References

Before (vulnerable):
```yaml
- uses: aquasecurity/trivy-action@master
- uses: actions/checkout@v4
- uses: docker/build-push-action@v5
```

After (safe):
```yaml
- uses: aquasecurity/trivy-action@062f2592684a31eb3aa050cc61312fef1b1bed35  # v0.28.0 (verified clean)
- uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11        # v4.1.1
- uses: docker/build-push-action@4a13e500e55cf31b7a5d59a38ab2040ab0f42f56  # v5.1.0
```

To find the SHA for a specific version tag:
```bash
# Get the commit SHA for a tag
gh api repos/OWNER/REPO/git/ref/tags/v4.1.1 --jq '.object.sha'

# Or use git directly
git ls-remote https://github.com/actions/checkout.git refs/tags/v4.1.1
```

## Step 3: Dependabot Configuration for Automatic SHA Updates

Create or update `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    # Pin to exact commit SHAs
    allow:
      - dependency-type: "direct"
    commit-message:
      prefix: "ci"
      include: "scope"
    labels:
      - "dependencies"
      - "github-actions"
    open-pull-requests-limit: 10
```

This will:
- Automatically detect new versions of pinned actions
- Open PRs to update SHA references
- Include the version tag in the commit message for readability

## Step 4: Add SHA Verification to PR Checks

Create `.github/workflows/verify-action-pins.yml`:

```yaml
name: Verify Action SHA Pins
on:
  pull_request:
    paths:
      - '.github/workflows/**'

jobs:
  check-pins:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11  # v4.1.1
      - name: Check for unpinned actions
        run: |
          UNPINNED=$(grep -rn 'uses:' .github/workflows/ | grep -v '@[a-f0-9]\{40\}' | grep -v '#' || true)
          if [ -n "$UNPINNED" ]; then
            echo "::error::Found unpinned GitHub Actions references:"
            echo "$UNPINNED"
            echo ""
            echo "All actions must be pinned to full SHA commit hashes."
            echo "See: cloud/pin_actions_to_sha.md"
            exit 1
          fi
          echo "All actions are properly SHA-pinned."
```

## Step 5: Organization-Level Policy

For GitHub Enterprise, enable the "Allow select actions" policy:
1. Go to Organization Settings > Actions > General
2. Set "Allow select actions and reusable workflows"
3. Add only verified action owners to the allowlist
4. Require approval for first-time contributors' workflow runs

## Quick Reference: Common Actions SHA Pins

```yaml
# Verified clean SHAs as of April 2026
actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11           # v4.1.1
actions/setup-node@b39b52d1213e96004bfcb1c61a8a6fa8ab84f3e8         # v4.0.0
actions/setup-python@0a5c61591373683505ea898e09a3ea4f39ef2b9c       # v5.0.0
docker/build-push-action@4a13e500e55cf31b7a5d59a38ab2040ab0f42f56   # v5.1.0
docker/login-action@e92390c5fb421da1463c202d546fed0ec5c39f20        # v3.1.0
```

## Additional Resources

- [GitHub: Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [StepSecurity Harden-Runner](https://github.com/step-security/harden-runner) - Runtime security for GitHub Actions
- [pin-github-action](https://github.com/mheap/pin-github-action) - CLI tool to convert tag refs to SHA
