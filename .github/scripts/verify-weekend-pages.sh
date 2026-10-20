#!/usr/bin/env bash
set -euo pipefail

: "${BUILD_URL:?}" "${EXPECTED_SHA:?}" "${RUNNER_TEMP:?}" "${GITHUB_STEP_SUMMARY:?}"
accepted=false
# 状態監視のみ。ビルド要求・生成・push・本番取得の再試行は行わない。
for poll in {1..60}; do
  gh api "$BUILD_URL" > "$RUNNER_TEMP/pages-status.json"
  status=$(jq -r .status "$RUNNER_TEMP/pages-status.json")
  commit=$(jq -r .commit "$RUNNER_TEMP/pages-status.json")
  if [ "$status" = errored ]; then
    cat "$RUNNER_TEMP/pages-status.json"
    echo '::error::Pagesビルドが失敗しました。'
    exit 1
  fi
  if [ "$status" = built ]; then
    # 後続pushのSHAはcheckout時には未取得の可能性がある。
    git fetch origin main
    if git cat-file -e "${commit}^{commit}" 2>/dev/null &&
       git merge-base --is-ancestor "$EXPECTED_SHA" "$commit"; then
      accepted=true
      break
    fi
  fi
  if [ "$poll" -lt 60 ]; then sleep 10; fi
done
if [ "$accepted" != true ]; then
  echo '::error::対象コミットまたはその子孫のPagesビルド完了を確認できませんでした。'
  exit 1
fi

# 後続commitにページ更新が含まれる場合、古いcheckoutのHTMLとは比較しない。
# 比較対象の最新mainを1回取得し、SHAとともに固定して記録する。
git fetch origin main
main_sha=$(git rev-parse origin/main)
git show "${main_sha}:matsuri/this-weekend/index.html" > "$RUNNER_TEMP/weekend-main.html"
production_url="https://vigorlab.net/matsuri/this-weekend/?internal=1&weekend_run=${GITHUB_RUN_ID}-${GITHUB_RUN_ATTEMPT}&sha=${main_sha}"
curl --fail --silent --show-error --location \
  -H 'Cache-Control: no-cache' \
  --dump-header "$RUNNER_TEMP/weekend-production.headers" \
  "$production_url" -o "$RUNNER_TEMP/weekend-production.html"
cmp "$RUNNER_TEMP/weekend-main.html" "$RUNNER_TEMP/weekend-production.html"
{
  echo "Pages build: $BUILD_URL"
  echo "対象SHA: $EXPECTED_SHA / Pages SHA: $commit / 比較main SHA: $main_sha"
  echo "本番照合URL: $production_url"
  echo '```text'
  awk 'tolower($0) ~ /^(http\/|age:|x-cache:|last-modified:|cache-control:)/' "$RUNNER_TEMP/weekend-production.headers"
  echo '```'
  echo "本番HTML SHA256: $(shasum -a 256 "$RUNNER_TEMP/weekend-production.html" | cut -d ' ' -f 1)"
  echo "本番一致確認 UTC: $(date -u +%FT%TZ)"
} >> "$GITHUB_STEP_SUMMARY"
