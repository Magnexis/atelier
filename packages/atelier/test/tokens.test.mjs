import test from "node:test";
import assert from "node:assert/strict";
import { tokenCss, tokens } from "../src/tokens.js";
import { recipes } from "../src/recipes.js";
import * as atelier from "../src/index.js";

test("tokens expose a stable, useful color contract", () => {
  assert.equal(tokens.color.accent, "#285de6");
  assert.match(tokenCss(".theme"), /^\.theme\{/);
  assert.match(tokenCss(), /--at-space-8:72px/);
});

test("recipes declare their dependencies and accessibility intent", () => {
  assert.equal(recipes.length, 5);
  for (const recipe of recipes) {
    assert.ok(recipe.components.length > 0);
    assert.ok(recipe.accessibility.length > 0);
    assert.ok(Object.isFrozen(recipe));
  }
});

test("new workflow primitives are public package exports", () => {
  for (const component of ["CommandLedger", "Disclosure", "SegmentedControl"]) {
    assert.equal(typeof atelier[component], "function");
  }
});
