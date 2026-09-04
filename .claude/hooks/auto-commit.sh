#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Auto-commit every file change, so the history is granular and it is easy to
# step back to any point. Wired up by the PostToolUse hook in
# .claude/settings.json. This script must never fail the tool call.
# ---------------------------------------------------------------------------
set -u

payload="$(cat)"
f="$(printf '%s' "$payload" | jq -r '.tool_input.file_path // .tool_response.filePath // empty' 2>/dev/null)"
[ -n "$f" ] || exit 0

# Move into the file's directory and find the repo it belongs to.
cd "$(dirname "$f")" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0
root="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0
cd "$root" || exit 0

# Never touch an in-progress merge / rebase / cherry-pick / bisect.
for m in MERGE_HEAD REBASE_HEAD CHERRY_PICK_HEAD BISECT_LOG; do
  [ -e "$root/.git/$m" ] && exit 0
done
if [ -d "$root/.git/rebase-merge" ] || [ -d "$root/.git/rebase-apply" ]; then
  exit 0
fi

git add -A 2>/dev/null || exit 0
git diff --cached --quiet 2>/dev/null && exit 0   # nothing staged -> nothing to do

names="$(git diff --cached --name-only)"
count="$(printf '%s\n' "$names" | grep -c . )"
summary="$(printf '%s\n' "$names" | xargs -n1 basename 2>/dev/null | paste -sd' ' - )"
[ "${#summary}" -gt 68 ] && summary="$count files"

git commit -q \
  -m "auto: ${summary:-working changes}" \
  -m "Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>" \
  >/dev/null 2>&1 || true

exit 0
