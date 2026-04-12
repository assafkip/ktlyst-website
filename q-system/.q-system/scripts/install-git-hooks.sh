#!/usr/bin/env bash
# Install git hooks for the KTLYST website repo.
# Run once after cloning, then again whenever hooks/ changes.

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
HOOK_TARGET="$REPO_ROOT/.git/hooks/pre-commit"

cat > "$HOOK_TARGET" <<'HOOK'
#!/usr/bin/env bash
# Pre-commit guard for the KTLYST website repo.
# Managed by q-system/.q-system/scripts/install-git-hooks.sh — do not edit by hand.
set -euo pipefail
REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"
python3 q-system/.q-system/scripts/check-runs-integrity.py
HOOK

chmod +x "$HOOK_TARGET"
echo "Installed pre-commit hook at $HOOK_TARGET"
echo "Test it with: python3 q-system/.q-system/scripts/check-runs-integrity.py"
