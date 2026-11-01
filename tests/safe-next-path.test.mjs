import assert from "node:assert/strict";
import test from "node:test";
import { safeNextPath } from "../lib/safe-next-path.ts";

test("ordinary sign-in returns to the home page", () => {
  assert.equal(safeNextPath(null), "/");
});

test("an explicitly requested page is preserved after sign-in", () => {
  assert.equal(safeNextPath("/dorms/mu-condo?tab=details"), "/dorms/mu-condo?tab=details");
  assert.equal(safeNextPath("/saved"), "/saved");
});

test("external return URLs fall back to the home page", () => {
  assert.equal(safeNextPath("https://example.com/"), "/");
  assert.equal(safeNextPath("//example.com/"), "/");
});
