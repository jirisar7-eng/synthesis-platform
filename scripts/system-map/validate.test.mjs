import test from "node:test";
import assert from "node:assert";
import { validateSystemMap } from "./validate.mjs";

const minimalValid = {
  schemaVersion: "1.0.0",
  projectKey: "tmpr",
  defaultLocale: "cs-CZ",
  supportedLocales: ["cs-CZ"],
  apps: [{ appIdentity: "tmpr.public", moduleKey: "mod.core", lifecycleState: "PLANNED", enabled: false, status: "ok" }],
  routes: [{ routeId: "tmpr.public.home", appIdentity: "tmpr.public", moduleKey: "mod.core", lifecycleState: "PLANNED", enabled: false, status: "ok" }],
  surfaces: [{ surfaceId: "tmpr.public.home.surface", appIdentity: "tmpr.public", routeId: "tmpr.public.home", moduleKey: "mod.core", status: "ok" }],
  regions: [{ regionId: "tmpr.public.home.hero", surfaceId: "tmpr.public.home.surface", moduleKey: "mod.core", status: "ok" }],
  components: [{ componentId: "tmpr.public.home.hero.comp", regionId: "tmpr.public.home.hero", moduleKey: "mod.core", status: "ok" }],
  elements: [{
    elementId: "tmpr.public.home.hero.btn",
    appIdentity: "tmpr.public",
    routeId: "tmpr.public.home",
    surfaceId: "tmpr.public.home.surface",
    regionId: "tmpr.public.home.hero",
    componentId: "tmpr.public.home.hero.comp",
    moduleKey: "mod.core",
    lifecycleState: "PLANNED",
    enabled: false,
    contentKey: "tmpr.public.home.hero.primary.content",
    disabledReasonKey: "tmpr.system.planned.default",
    themeTokens: ["theme.action.primary"],
    actionKeys: ["tmpr.public.home.hero.nav"],
    status: "ok"
  }],
  actions: [{
    actionKey: "tmpr.public.home.hero.nav",
    moduleKey: "mod.core",
    kind: "NAVIGATE",
    lifecycleState: "PLANNED",
    enabled: false,
    disabledReasonKey: "tmpr.system.planned.default",
    status: "ok"
  }],
  modules: [{ moduleKey: "mod.core", lifecycleState: "AVAILABLE", enabled: true, status: "ok" }]
};

test("1. valid-minimal passes", () => {
  const result = validateSystemMap(minimalValid);
  assert.strictEqual(result.ok, true, JSON.stringify(result.errors));
});

test("2. duplicate elementId fails: DUPLICATE_ID", () => {
  const data = JSON.parse(JSON.stringify(minimalValid));
  data.elements.push(data.elements[0]);
  const result = validateSystemMap(data);
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.some(e => e.code === "DUPLICATE_ID"));
});

test("3. missing module fails: MISSING_MODULE_REFERENCE", () => {
  const data = JSON.parse(JSON.stringify(minimalValid));
  data.elements[0].moduleKey = "missing.mod";
  const result = validateSystemMap(data);
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.some(e => e.code === "MISSING_MODULE_REFERENCE"));
});

test("4. missing action reference fails: MISSING_ACTION_REFERENCE", () => {
  const data = JSON.parse(JSON.stringify(minimalValid));
  data.elements[0].actionKeys = ["missing.action"];
  const result = validateSystemMap(data);
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.some(e => e.code === "MISSING_ACTION_REFERENCE"));
});

test("5. orphan NAVIGATE action fails: ORPHAN_ACTION", () => {
  const data = JSON.parse(JSON.stringify(minimalValid));
  data.elements[0].actionKeys = [];
  const result = validateSystemMap(data);
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.some(e => e.code === "ORPHAN_ACTION"));
});

test("6. lineage mismatch fails: LINEAGE_MISMATCH", () => {
  const data = JSON.parse(JSON.stringify(minimalValid));
  data.elements[0].routeId = "other.route";
  const result = validateSystemMap(data);
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.some(e => e.code === "MISSING_REFERENCE")); // route missing
});

test("7. PLANNED enabled=true fails: PLANNED_ENABLED", () => {
  const data = JSON.parse(JSON.stringify(minimalValid));
  data.elements[0].enabled = true;
  const result = validateSystemMap(data);
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.some(e => e.code === "PLANNED_ENABLED"));
});

test("8. PLANNED element without disabledReasonKey fails: MISSING_DISABLED_REASON_KEY", () => {
  const data = JSON.parse(JSON.stringify(minimalValid));
  delete data.elements[0].disabledReasonKey;
  const result = validateSystemMap(data);
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.some(e => e.code === "MISSING_DISABLED_REASON_KEY"));
});

test("9. self module dependency fails: SELF_MODULE_DEPENDENCY", () => {
  const data = JSON.parse(JSON.stringify(minimalValid));
  data.modules[0].dependencies = ["mod.core"];
  const result = validateSystemMap(data);
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.some(e => e.code === "SELF_MODULE_DEPENDENCY"));
});

test("10. module cycle fails: MODULE_DEPENDENCY_CYCLE", () => {
  const data = JSON.parse(JSON.stringify(minimalValid));
  data.modules.push({ moduleKey: "mod.a", dependencies: ["mod.b"] });
  data.modules.push({ moduleKey: "mod.b", dependencies: ["mod.a"] });
  const result = validateSystemMap(data);
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.some(e => e.code === "MODULE_DEPENDENCY_CYCLE"));
});

test("11. raw label fails: HARDCODED_USER_TEXT_FIELD", () => {
  const data = JSON.parse(JSON.stringify(minimalValid));
  data.elements[0].label = "Můj Text";
  const result = validateSystemMap(data);
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.some(e => e.code === "HARDCODED_USER_TEXT_FIELD"));
});

test("12. raw #ffffff theme value fails: HARDCODED_DESIGN_VALUE", () => {
  const data = JSON.parse(JSON.stringify(minimalValid));
  data.elements[0].themeTokens.push("#ffffff");
  const result = validateSystemMap(data);
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors.some(e => e.code === "HARDCODED_DESIGN_VALUE"));
});
