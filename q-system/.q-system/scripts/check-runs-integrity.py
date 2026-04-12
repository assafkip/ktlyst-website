#!/usr/bin/env python3
"""
Pre-commit integrity guard for public/runs/.

Enforces the public/runs/ policy declared in .claude/rules/folder-structure.md.

Hard fail conditions (commit blocked):
  1. runs-index.json is missing or invalid JSON
  2. An entry in runs-index.json points to a run whose index.html does not exist
     (gallery card links to a dead page — silent SPA fallback in prod)
  3. A complete run (has index.html) exists on disk but is not in runs-index.json
     (orphan: the page is live but unreachable from the gallery)

Soft warning (does not block commit):
  - A run dir contains only deliverable/ with no index.html wrapper.
    This is tolerated as work-in-progress source data. The pipeline may
    have written deliverables before generating the wrapper, and the run
    is invisible to the gallery, so users are not affected.

Exit codes:
  0 = all hard checks pass (warnings printed to stderr)
  1 = at least one hard violation found (commit blocked)

Usage:
  python3 q-system/.q-system/scripts/check-runs-integrity.py
  # or as a pre-commit hook (see .git/hooks/pre-commit)
"""

import json
import os
import sys

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
RUNS_DIR = os.path.join(REPO_ROOT, "public", "runs")
INDEX_PATH = os.path.join(RUNS_DIR, "runs-index.json")


def load_index():
    if not os.path.isfile(INDEX_PATH):
        print(f"FAIL: {INDEX_PATH} does not exist", file=sys.stderr)
        return None
    try:
        with open(INDEX_PATH) as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        print(f"FAIL: {INDEX_PATH} is not valid JSON: {e}", file=sys.stderr)
        return None


def list_run_dirs():
    if not os.path.isdir(RUNS_DIR):
        return []
    return sorted(
        name
        for name in os.listdir(RUNS_DIR)
        if os.path.isdir(os.path.join(RUNS_DIR, name))
    )


def main():
    failures = []

    index = load_index()
    if index is None:
        return 1

    if not isinstance(index, list):
        print("FAIL: runs-index.json root must be a JSON array", file=sys.stderr)
        return 1

    indexed_ids = set()
    for entry in index:
        run_id = entry.get("id")
        if not run_id:
            failures.append("runs-index.json entry missing 'id' field")
            continue
        indexed_ids.add(run_id)
        wrapper = os.path.join(RUNS_DIR, run_id, "index.html")
        if not os.path.isfile(wrapper):
            failures.append(
                f"runs-index.json points to {run_id} but {run_id}/index.html does not exist"
            )

    on_disk = set(list_run_dirs())

    orphans = sorted(
        d
        for d in on_disk
        if d not in indexed_ids
        and os.path.isfile(os.path.join(RUNS_DIR, d, "index.html"))
    )
    for orphan in orphans:
        failures.append(
            f"{orphan}/index.html exists but {orphan} is not in runs-index.json"
        )

    incomplete = sorted(
        d
        for d in on_disk
        if not os.path.isfile(os.path.join(RUNS_DIR, d, "index.html"))
    )
    for run in incomplete:
        print(
            f"WARN: {run}/ has no index.html wrapper (work-in-progress, "
            f"not in gallery)",
            file=sys.stderr,
        )

    if failures:
        print("\npublic/runs/ integrity check FAILED:", file=sys.stderr)
        for f in failures:
            print(f"  - {f}", file=sys.stderr)
        print(
            "\nFix: either generate the missing wrappers, remove the dirs, "
            "or update runs-index.json to match disk state.",
            file=sys.stderr,
        )
        return 1

    print(
        f"public/runs/ integrity OK: {len(indexed_ids)} indexed runs, "
        f"{len(incomplete)} work-in-progress dirs"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
