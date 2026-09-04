#!/usr/bin/env bash
set -euo pipefail

# ----- SETTINGS -------------------------------------------------------------
# If your main plugin file differs, set it explicitly (e.g. MAIN_PHP="aligned-cards.php")
MAIN_PHP="${MAIN_PHP:-$(ls *.php 2>/dev/null | head -n1)}"
PLUGIN_SLUG="${PLUGIN_SLUG:-$(basename "$PWD")}"
DIST_ROOT="${DIST_ROOT:-dist}"
PLUGIN_ROOT="$(pwd)"

# Set NO_ZIP=1 to skip the build + zip steps and just sync everything else into
# dist/ as a plain (unzipped) folder — used by `npm run start` to keep a
# packaged-shape copy available while `wp-scripts start` handles building.
NO_ZIP="${NO_ZIP:-0}"

# What to include in the ZIP (paths relative to repo root)
INCLUDE_PATHS=(
  "$MAIN_PHP"
  "build"            # create-block output
  "languages"        # optional
  "includes"         # shared PHP (site settings, SVG sanitizer, etc.)
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
if [[ "$NO_ZIP" != "1" ]]; then
  echo "🔧 Building assets…"
  npm run build
fi

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
  if [[ "$NO_ZIP" == "1" ]]; then
    # Symlink everything instead of copying, so dist/ is always current —
    # edits to includes/, the main plugin file, etc. show up immediately,
    # same as webpack's ongoing rebuilds of build/ — with nothing to re-run.
    # build/ is linked even before it exists yet; it resolves once webpack's
    # first build lands. Everything else is only linked if it's actually there
    # (these are mostly optional files, e.g. not every plugin has 2 screenshots).
    if [[ "$p" == "build" || -e "$p" ]]; then
      ln -sfn "$PLUGIN_ROOT/$p" "$WORKDIR/$(basename "$p")"
    fi
  else
    copy_item "$p"
  fi
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
if [[ "$NO_ZIP" == "1" ]]; then
  echo "✅ Synced (no zip): ${WORKDIR}"
  exit 0
fi

mkdir -p "$DIST_ROOT"
(
  cd "$DIST_ROOT"
  zip -r "$ZIPNAME" "$(basename "$WORKDIR")" >/dev/null
)
echo "✅ Done: ${DIST_ROOT}/${ZIPNAME}"
