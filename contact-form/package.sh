#!/usr/bin/env bash
set -euo pipefail

# ----- SETTINGS -------------------------------------------------------------
# If your main plugin file differs, set it explicitly (e.g. MAIN_PHP="aligned-cards.php")
MAIN_PHP="${MAIN_PHP:-$(ls *.php 2>/dev/null | head -n1)}"
PLUGIN_SLUG="${PLUGIN_SLUG:-$(basename "$PWD")}"
DIST_ROOT="${DIST_ROOT:-dist}"

# What to include in the ZIP (paths relative to repo root)
INCLUDE_PATHS=(
  "$MAIN_PHP"
  "build"            # create-block output
  "languages"        # optional
  "php-includes"     # include utility PHP
  "uninstall.php"    # optional
  "readme.txt"       # WP.org style readme
  "readme.md"        # GitHub style readme
  "license.txt"
  "LICENSE"
  "screenshot-1.png"
  "screenshot-2.png"
  "screenshot.png"
)

# What to exclude when copying into the dist working dir
EXCLUDES=(
  ".git"
  ".github"
  ".vscode"
  "node_modules"
  "src"
  "vendor/bin"
  "composer.*"
  ".DS_Store"
  "*.map"
  "package.sh"
  "$DIST_ROOT"
)

# ----- PRECHECKS ------------------------------------------------------------
if [[ -z "$MAIN_PHP" || ! -f "$MAIN_PHP" ]]; then
  echo "❌ Could not find main plugin PHP file. Set MAIN_PHP=… or ensure one exists in repo root."
  exit 1
fi

if ! command -v zip >/dev/null 2>&1; then
  echo "❌ 'zip' command not found. Install zip (e.g., 'brew install zip')."
  exit 1
fi

# ----- BUILD ---------------------------------------------------------------
echo "🔧 Building assets…"
npm run build

# ----- VERSION -------------------------------------------------------------
# Extract Version: from the plugin header
PLUGIN_VERSION=$(grep -E "^[[:space:]]*\*?[[:space:]]*Version:" "$MAIN_PHP" | head -n1 | sed -E 's/.*Version:[[:space:]]*//')
PLUGIN_VERSION=${PLUGIN_VERSION:-"0.0.0"}

# ----- PREP DIST WORKDIR ---------------------------------------------------
WORKDIR="$DIST_ROOT/${PLUGIN_SLUG}"
ZIPNAME="${PLUGIN_SLUG}-v${PLUGIN_VERSION}.zip"

echo "📦 Packaging ${PLUGIN_SLUG} v${PLUGIN_VERSION}"
rm -rf "$WORKDIR" "${DIST_ROOT:?}/${ZIPNAME}"
mkdir -p "$WORKDIR"

# Copy includes
copy_item () {
  local path="$1"
  if [[ -e "$path" ]]; then
    if [[ -d "$path" ]]; then
      rsync -a "$path" "$WORKDIR/"
    else
      rsync -a "$path" "$WORKDIR/$(basename "$path")"
    fi
  fi
}

for p in "${INCLUDE_PATHS[@]}"; do
  copy_item "$p"
done

# If you keep multiple blocks under /build/* ensure the folder exists
if [[ ! -d "$WORKDIR/build" ]]; then
  echo "⚠️  No build/ folder found in workdir. Did the build step produce assets?"
fi

# Strip excludes from WORKDIR (defense in depth)
for ex in "${EXCLUDES[@]}"; do
  rm -rf "$WORKDIR/$ex" 2>/dev/null || true
done

# ----- ZIP -----------------------------------------------------------------
mkdir -p "$DIST_ROOT"
(
  cd "$DIST_ROOT"
  zip -r "$ZIPNAME" "$(basename "$WORKDIR")" >/dev/null
)
echo "✅ Done: ${DIST_ROOT}/${ZIPNAME}"
