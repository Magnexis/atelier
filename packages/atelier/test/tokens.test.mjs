import test from "node:test";
import assert from "node:assert/strict";
import { tokenCss, tokens } from "../src/tokens.js";

test("tokens expose a stable, useful color contract", () => {
  assert.equal(tokens.color.accent, "#285de6");
  assert.match(tokenCss(".theme"), /^\.theme\{/);
  assert.match(tokenCss(), /--at-space-8:72px/);
});
