#!/usr/bin/env node
/**
 * Minimal smoke test for sync-directory.mjs --check on identical trees.
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const script = join(root, "scripts/sync-directory.mjs");

test("sync-directory --check passes when mirrors match", () => {
  const sync = spawnSync(process.execPath, [script], { cwd: root, encoding: "utf8" });
  assert.equal(sync.status, 0, sync.stderr);
  const check = spawnSync(process.execPath, [script, "--check"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(check.status, 0, check.stderr + check.stdout);
});
