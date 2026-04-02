#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

function toKebabCase(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---- Arg parsing ----
const rawArgs = process.argv.slice(2);

// Find the first non-flag as the block name
const inputName = rawArgs.find((a) => !a.startsWith("-"));
if (!inputName) {
  console.error('Usage: npm run createblock -- "Block Name" [--static|--dynamic]');
  process.exit(1);
}

// Flags (dynamic by default)
const isStatic = rawArgs.includes("--static");
const isDynamic = rawArgs.includes("--dynamic") || !isStatic;
const variant = isStatic ? "static" : "dynamic";

const blockTitle = inputName.trim();
const blockSlug = toKebabCase(blockTitle);

const blockDir = `src/${blockSlug}`;
const indexFile = join(blockDir, "index.js");
const saveFile = join(blockDir, "save.js");
const iconFile = join(blockDir, "icon.svg");

// 1) Run create-block with requested variant
const args = ["@wordpress/create-block@latest", blockSlug, "--namespace=thirtysixbeech-blocks", "--no-plugin", `--variant=${variant}`, `--target-dir=${blockDir}`];

console.log(`▶ Creating block "${blockTitle}" as ${variant.toUpperCase()}…`);
const result = spawnSync("npx", args, { stdio: "inherit" });
if (result.status !== 0) process.exit(result.status ?? 1);

// 1b) Patch block.json title to use the original input
const blockJsonFile = join(blockDir, "block.json");
if (existsSync(blockJsonFile)) {
  let blockJson = JSON.parse(readFileSync(blockJsonFile, "utf8"));
  blockJson.title = blockTitle; // Keep full name as title
  writeFileSync(blockJsonFile, JSON.stringify(blockJson, null, 2), "utf8");
  console.log(`✔ Updated ${blockJsonFile} with title "${blockTitle}"`);
}

// 2) Ensure save.js exists (harmless if variant=dynamic; still useful for hybrids)
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

// 3) Copy default icon.svg if missing
if (!existsSync(iconFile)) {
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M328 32C438.5 32 528 121.5 528 232L528 359.7C528 378.6 521.9 396.8 510.8 411.9L505.7 418.1L469.4 458.8L501.5 499C508.2 507.4 511.9 517.8 511.9 528.6L511.7 533.4C509.3 557.3 489.1 575.9 464.6 575.9L175.4 575.9L170.6 575.7C146.7 573.3 128.1 553.1 128.1 528.6C128.1 517.8 131.8 507.4 138.5 499L176.1 452L176.1 427.7C176.1 403.4 186.2 380.1 203.9 363.5L267.4 304L250 304L249.8 304.2C229.5 324.5 200.2 332.4 172.7 325.3L167.2 323.7C136.3 313.4 114.9 285.7 112.3 253.6L112.1 247.2L112.1 245.8C112.1 226.1 119.2 207 132 192L208.1 103.2L208.1 56.1L208.2 53.6C209.4 41.4 219.6 32 232 32L328 32zM176.7 528L463.3 528L424.9 480L215 480L176.6 528zM256 112C256 117.7 253.9 123.3 250.2 127.6L168.3 223.1C163 229.4 160 237.4 160 245.7L160 247.1L160.4 252.3C162.3 264.2 170.7 274.2 182.3 278.1L186.8 279.2C197.3 281.1 208.1 277.8 215.8 270.2L223 263L226.7 260C230.6 257.4 235.2 256 240 256L328 256C337.8 256 346.7 262 350.3 271.2C353.9 280.4 351.6 290.8 344.4 297.5L236.6 398.5C228.5 406.1 223.9 416.6 223.9 427.7L223.9 432L429.1 432L469.8 386.2L472.1 383.4C477.2 376.6 479.9 368.2 479.9 359.7L480 232C480 148.1 411.9 80 328 80L256 80L256 112zM288 184C274.7 184 264 173.3 264 160C264 146.7 274.7 136 288 136C301.3 136 312 146.7 312 160C312 173.3 301.3 184 288 184z"/></svg>`;
  writeFileSync(iconFile, iconSvg, "utf8");
  console.log(`✔ Created ${iconFile}`);
}

// 4) Patch index.js consistently (add Save + Icon + wiring)
if (existsSync(indexFile)) {
  let data = readFileSync(indexFile, "utf8");
  const nl = data.includes("\r\n") ? "\r\n" : "\n";

  if (!/import\s+Save\s+from\s+['"]\.\/save['"];?/.test(data)) {
    data = data.replace(/(import\s+Edit\s+from\s+['"]\.\/edit['"];?\s*\r?\n)/, `$1import Save from "./save";${nl}`);
  }

  if (!/ReactComponent as Icon/.test(data)) {
    data = data.replace(/(import\s+Save\s+from\s+['"]\.\/save['"];?\s*\r?\n)/, `$1import { ReactComponent as Icon } from "./icon.svg";${nl}`);
  }

  // Ensure save points to Save (even for dynamic—useful if you're doing hybrid serialization)
  data = data.replace(/save\s*:\s*[^,}]+,?/, "save: Save,");
  if (!/\bsave\s*:\s*Save\b/.test(data)) {
    data = data.replace(/(edit\s*:\s*Edit\s*,?\s*\r?\n)/, `$1  save: Save,${nl}`);
  }

  if (!/icon\s*:\s*<Icon\s*\/>/.test(data)) {
    data = data.replace(/(save\s*:\s*Save\s*,?\s*\r?\n)/, `$1  icon: <Icon />,${nl}`);
  }

  writeFileSync(indexFile, data, "utf8");
  console.log(`✔ Updated ${indexFile}`);
}

console.log(`✅ Block scaffolded (${variant}) with save.js, icon.svg, and index.js updated.`);
