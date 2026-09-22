#!/usr/bin/env node
/**
 * Keep published copies of the directory and world map in sync.
 *
 * Canonical sources:
 *   - src/data/directory.json  (imported by the app)
 *   - src/assets/world.svg     (rendered by PresenceMap)
 *
 * Published mirrors (HTTP + README):
 *   - public/directory.json
 *   - public/world.svg
 *
 * Usage:
 *   node scripts/sync-directory.mjs          # copy sources → public
 *   node scripts/sync-directory.mjs --check  # exit 1 if public drifts
 */
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const PAIRS = [
  {
    src: join(root, "src/data/directory.json"),
    dest: join(root, "public/directory.json"),
    label: "directory.json",
    kind: "json",
  },
  {
    src: join(root, "src/assets/world.svg"),
    dest: join(root, "public/world.svg"),
    label: "world.svg",
    kind: "bytes",
  },
];

function sameJson(a, b) {
  return JSON.stringify(JSON.parse(a)) === JSON.stringify(JSON.parse(b));
}

const check = process.argv.includes("--check");

let failed = false;
for (const { src, dest, label, kind } of PAIRS) {
  const a = readFileSync(src);
  let b;
  try {
    b = readFileSync(dest);
  } catch {
    b = null;
  }
  if (check) {
    const ok =
      b != null &&
      (kind === "json"
        ? sameJson(a.toString("utf8"), b.toString("utf8"))
        : Buffer.compare(a, b) === 0);
    if (!ok) {
      console.error(`[sync-directory] drift: ${label}`);
      failed = true;
    } else {
      console.log(`[sync-directory] ok: ${label}`);
    }
  } else if (kind === "json") {
    const parsed = JSON.parse(a.toString("utf8"));
    writeFileSync(dest, `${JSON.stringify(parsed, null, 2)}\n`);
    console.log(`[sync-directory] wrote public/${label}`);
  } else {
    copyFileSync(src, dest);
    console.log(`[sync-directory] wrote public/${label}`);
  }
}

if (check && failed) {
  console.error(
    "[sync-directory] run `npm run sync:directory` after editing src/data or src/assets.",
  );
  process.exit(1);
}
