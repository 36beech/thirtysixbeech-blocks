#!/usr/bin/env node
/**
 * Scaffolds a new block under src/<block-slug> using @wordpress/create-block,
 * then patches the generated files so every block in this plugin follows the
 * same shape (namespaced under thirtysixbeech-blocks, categorized, wired up
 * with a Save component + custom icon regardless of variant).
 *
 * Usage:
 *   npm run nb -- "Block Name" [--static|--dynamic]
 *
 *   "Block Name"   Required. Becomes the block title as-typed, and is
 *                  slugified (kebab-case) for the block's name/directory,
 *                  e.g. "Hero Carousel" -> src/hero-carousel, name
 *                  "thirtysixbeech-blocks/hero-carousel".
 *   --static       Scaffold a static block (content saved to post_content
 *                  via save.js).
 *   --dynamic      Scaffold a dynamic, server-rendered block (render.php).
 *                  This is the default if neither flag is passed.
 *
 * Examples:
 *   npm run nb -- "Testimonial"
 *   npm run nb -- "Pricing Table" --static
 *
 * What it does, step by step:
 *   1. Runs `npx @wordpress/create-block` to scaffold src/<block-slug>.
 *   2. Overwrites block.json's title (create-block slugifies it) and sets
 *      the category to "thirtysixbeech-content".
 *   3. Adds a default save.js if the variant didn't generate one, so the
 *      block has somewhere to serialize markup even for dynamic/hybrid use.
 *   4. Copies in a shared default icon.svg if the block doesn't have one.
 *   5. Patches index.js to import Save/Icon and wire them into
 *      registerBlockType() (save: Save, icon: <Icon />), without clobbering
 *      anything already customized there.
 */
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Slugifies a block title into a kebab-case name, e.g. "Hero Carousel!" -> "hero-carousel".
 *
 * @param {string} str Raw input string (typically the block title as typed).
 * @return {string} Lowercased, hyphen-separated slug with no leading/trailing hyphens.
 */
function toKebabCase(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---- Arg parsing ----
// Accepts the block name as the first non-flag argument, plus optional
// --static/--dynamic flags (in any position/order).
const rawArgs = process.argv.slice(2);

// Find the first non-flag as the block name
const inputName = rawArgs.find((a) => !a.startsWith("-"));
if (!inputName) {
  console.error('Usage: npm run nb -- "Block Name" [--static|--dynamic]');
  process.exit(1);
}

// Flags (dynamic by default)
const isStatic = rawArgs.includes("--static");
const isDynamic = rawArgs.includes("--dynamic") || !isStatic;
const variant = isStatic ? "static" : "dynamic";

const blockTitle = inputName.trim();
const blockSlug = toKebabCase(blockTitle);

// Every generated/patched file lives under this one directory.
const blockDir = `src/${blockSlug}`;
const indexFile = join(blockDir, "index.js");
const saveFile = join(blockDir, "save.js");
const iconFile = join(blockDir, "icon.svg");

/**
 * Step 1: Scaffold the block via the official @wordpress/create-block tool.
 * --no-plugin + --target-dir keeps it scoped to src/<block-slug> inside this
 * existing plugin, instead of generating a whole standalone plugin.
 */
const args = ["@wordpress/create-block@latest", blockSlug, "--namespace=thirtysixbeech-blocks", "--no-plugin", `--variant=${variant}`, `--target-dir=${blockDir}`];

console.log(`▶ Creating block "${blockTitle}" as ${variant.toUpperCase()}…`);
const result = spawnSync("npx", args, { stdio: "inherit" });
if (result.status !== 0) process.exit(result.status ?? 1);

/**
 * Step 1b: create-block derives block.json's title from the slug (so
 * "Hero Carousel" would otherwise come back as "Hero carousel"). Restore the
 * title exactly as typed, and force every block into the shared
 * "thirtysixbeech-content" category so blocks don't scatter across the
 * default WordPress categories.
 */
const blockJsonFile = join(blockDir, "block.json");
if (existsSync(blockJsonFile)) {
  let blockJson = JSON.parse(readFileSync(blockJsonFile, "utf8"));
  blockJson.title = blockTitle; // Keep full name as title
  blockJson.category = "thirtysixbeech-content";
  writeFileSync(blockJsonFile, JSON.stringify(blockJson, null, 2), "utf8");
  console.log(`✔ Updated ${blockJsonFile} with title "${blockTitle}"`);
}

/**
 * Step 2: Ensure save.js exists. The dynamic variant doesn't generate one
 * (render.php handles output instead), but having a Save component is still
 * useful for hybrid blocks that serialize inner blocks to post_content while
 * also rendering server-side. No-op if the file's already there.
 */
if (!existsSync(saveFile)) {
  const saveTemplate = `import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { children } = useInnerBlocksProps.save(blockProps);
  return children;
}
`;
  writeFileSync(saveFile, saveTemplate, "utf8");
  console.log(`✔ Created ${saveFile}`);
}

/**
 * Step 3: Drop in a shared default icon.svg if the block doesn't already
 * have one, so every scaffolded block starts with a real icon instead of
 * create-block's generic placeholder.
 */
if (!existsSync(iconFile)) {
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M328 32C438.5 32 528 121.5 528 232L528 359.7C528 378.6 521.9 396.8 510.8 411.9L505.7 418.1L469.4 458.8L501.5 499C508.2 507.4 511.9 517.8 511.9 528.6L511.7 533.4C509.3 557.3 489.1 575.9 464.6 575.9L175.4 575.9L170.6 575.7C146.7 573.3 128.1 553.1 128.1 528.6C128.1 517.8 131.8 507.4 138.5 499L176.1 452L176.1 427.7C176.1 403.4 186.2 380.1 203.9 363.5L267.4 304L250 304L249.8 304.2C229.5 324.5 200.2 332.4 172.7 325.3L167.2 323.7C136.3 313.4 114.9 285.7 112.3 253.6L112.1 247.2L112.1 245.8C112.1 226.1 119.2 207 132 192L208.1 103.2L208.1 56.1L208.2 53.6C209.4 41.4 219.6 32 232 32L328 32zM176.7 528L463.3 528L424.9 480L215 480L176.6 528zM256 112C256 117.7 253.9 123.3 250.2 127.6L168.3 223.1C163 229.4 160 237.4 160 245.7L160 247.1L160.4 252.3C162.3 264.2 170.7 274.2 182.3 278.1L186.8 279.2C197.3 281.1 208.1 277.8 215.8 270.2L223 263L226.7 260C230.6 257.4 235.2 256 240 256L328 256C337.8 256 346.7 262 350.3 271.2C353.9 280.4 351.6 290.8 344.4 297.5L236.6 398.5C228.5 406.1 223.9 416.6 223.9 427.7L223.9 432L429.1 432L469.8 386.2L472.1 383.4C477.2 376.6 479.9 368.2 479.9 359.7L480 232C480 148.1 411.9 80 328 80L256 80L256 112zM288 184C274.7 184 264 173.3 264 160C264 146.7 274.7 136 288 136C301.3 136 312 146.7 312 160C312 173.3 301.3 184 288 184z"/></svg>`;
  writeFileSync(iconFile, iconSvg, "utf8");
  console.log(`✔ Created ${iconFile}`);
}

/**
 * Step 4: Patch index.js to import Save/Icon and wire them into the
 * registerBlockType() call (save: Save, icon: <Icon />).
 *
 * This is regex-based text patching rather than an AST transform, so every
 * insertion is guarded by a "does this already exist?" check first — running
 * this script again on an already-patched file (e.g. after re-running `nb`
 * on an existing block dir) is a safe no-op rather than a duplicate import
 * or a mangled file.
 */
if (existsSync(indexFile)) {
  let data = readFileSync(indexFile, "utf8");
  const nl = data.includes("\r\n") ? "\r\n" : "\n";

  // Add `import Save from "./save"` right after the Edit import, if missing.
  if (!/import\s+Save\s+from\s+['"]\.\/save['"];?/.test(data)) {
    data = data.replace(/(import\s+Edit\s+from\s+['"]\.\/edit['"];?\s*\r?\n)/, `$1import Save from "./save";${nl}`);
  }

  // Add the icon import right after the Save import, if missing.
  if (!/ReactComponent as Icon/.test(data)) {
    data = data.replace(/(import\s+Save\s+from\s+['"]\.\/save['"];?\s*\r?\n)/, `$1import { ReactComponent as Icon } from "./icon.svg";${nl}`);
  }

  // Ensure save points to Save (even for dynamic—useful if you're doing hybrid serialization).
  // First, normalize/replace any existing `save: ...` property (e.g. create-block's `save: undefined`)...
  data = data.replace(/save\s*:\s*[^,}]+,?/, "save: Save,");
  // ...then, if there was no `save:` property at all, insert one after `edit: Edit`.
  if (!/\bsave\s*:\s*Save\b/.test(data)) {
    data = data.replace(/(edit\s*:\s*Edit\s*,?\s*\r?\n)/, `$1  save: Save,${nl}`);
  }

  // Add `icon: <Icon />` right after the save property, if missing.
  if (!/icon\s*:\s*<Icon\s*\/>/.test(data)) {
    data = data.replace(/(save\s*:\s*Save\s*,?\s*\r?\n)/, `$1  icon: <Icon />,${nl}`);
  }

  writeFileSync(indexFile, data, "utf8");
  console.log(`✔ Updated ${indexFile}`);
}

console.log(`✅ Block scaffolded (${variant}) with save.js, icon.svg, and index.js updated.`);
