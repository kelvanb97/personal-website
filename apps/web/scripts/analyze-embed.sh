#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
SRC_DIR="$APP_DIR/.next/diagnostics/analyze"
OUT_DIR="$APP_DIR/public/_analyze"

echo "→ Running Next experimental analyzer (output mode)…"
cd "$APP_DIR"
npx next experimental-analyze --output  # outputs to .next/diagnostics/analyze

echo "→ Replacing $OUT_DIR"
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
cp -R "$SRC_DIR"/. "$OUT_DIR"/

# The analyzer output typically contains an "_next" folder with "static/..."
# We want it served under "/_analyze/..." (not "/_next/...") to avoid conflicts.
if [[ -d "$OUT_DIR/_next" ]]; then
  echo "→ Moving _next contents up one level"
  shopt -s dotglob nullglob
  mv "$OUT_DIR/_next"/* "$OUT_DIR"/
  shopt -u dotglob nullglob
  rm -rf "$OUT_DIR/_next"
fi

echo "→ Rewriting asset URLs: /_next/ → /_analyze/"
find "$OUT_DIR" -type f \( \
  -name "*.html" -o -name "*.js" -o -name "*.mjs" -o -name "*.cjs" \
  -o -name "*.css" -o -name "*.json" -o -name "*.map" \
\) -print0 | xargs -0 perl -pi -e 's|/_next/|/_analyze/|g'

echo "✓ Done. Analyzer is now served at /_analyze/ (e.g. /_analyze/index.html)"
