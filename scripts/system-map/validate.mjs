import fs from "fs";
import path from "path";

export function validateSystemMap(map) {
  const result = {
    ok: true,
    errors: [],
    counts: {
      apps: map.apps?.length || 0,
      routes: map.routes?.length || 0,
      surfaces: map.surfaces?.length || 0,
      regions: map.regions?.length || 0,
      components: map.components?.length || 0,
      elements: map.elements?.length || 0,
      actions: map.actions?.length || 0,
      modules: map.modules?.length || 0
    }
  };

  function addError(code, message, collection, id, ref) {
    result.ok = false;
    result.errors.push({ code, message, collection, id, ref });
  }

  // Locale safety
  if (map.schemaVersion !== "1.0.0") {
    addError("INVALID_SCHEMA_VERSION", "schemaVersion must be 1.0.0");
  }
  if (map.defaultLocale !== "cs-CZ") {
    addError("INVALID_DEFAULT_LOCALE", "defaultLocale must be cs-CZ");
  }
  if (!Array.isArray(map.supportedLocales) || !map.supportedLocales.includes("cs-CZ")) {
    addError("MISSING_DEFAULT_LOCALE_SUPPORT", "supportedLocales must include cs-CZ");
  }

  const collections = {
    apps: { arr: map.apps || [], idKey: "appIdentity" },
    routes: { arr: map.routes || [], idKey: "routeId" },
    surfaces: { arr: map.surfaces || [], idKey: "surfaceId" },
    regions: { arr: map.regions || [], idKey: "regionId" },
    components: { arr: map.components || [], idKey: "componentId" },
    elements: { arr: map.elements || [], idKey: "elementId" },
    actions: { arr: map.actions || [], idKey: "actionKey" },
    modules: { arr: map.modules || [], idKey: "moduleKey" }
  };

  const idMaps = {};
  for (const [colName, colData] of Object.entries(collections)) {
    idMaps[colName] = new Map();
    for (const item of colData.arr) {
      const id = item[colData.idKey];
      if (id) {
        if (idMaps[colName].has(id)) {
          addError("DUPLICATE_ID", `Duplicate ID ${id} in ${colName}`, colName, id);
        } else {
          idMaps[colName].set(id, item);
        }
      }
    }
  }

  // Raw text property check
  const forbiddenKeys = ["label", "displayText", "userText", "disabledReason"];
  function checkForbiddenKeys(obj, currentPath) {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) {
      obj.forEach((item, idx) => checkForbiddenKeys(item, `${currentPath}[${idx}]`));
    } else {
      for (const [k, v] of Object.entries(obj)) {
        if (forbiddenKeys.includes(k)) {
          addError("HARDCODED_USER_TEXT_FIELD", `Forbidden property ${k} found at ${currentPath}`, undefined, undefined, k);
        }
        checkForbiddenKeys(v, `${currentPath}.${k}`);
      }
    }
  }
  checkForbiddenKeys(map, "root");

  // Module References & Lifecycle
  for (const [colName, colData] of Object.entries(collections)) {
    for (const item of colData.arr) {
      const id = item[colData.idKey];

      // Lifecycle
      if (item.lifecycleState === "PLANNED") {
        if (item.enabled === true) {
          addError("PLANNED_ENABLED", `PLANNED item cannot be enabled`, colName, id);
        }
        if ((colName === "elements" || colName === "actions") && !item.disabledReasonKey) {
          addError("MISSING_DISABLED_REASON_KEY", `PLANNED element/action missing disabledReasonKey`, colName, id);
        }
      }

      // Design Values (Elements)
      if (colName === "elements" && item.themeTokens) {
        const forbiddenPatterns = [/^#([0-9a-fA-F]{3,8})$/, /^rgb/, /^hsl/, /px$/, /rem$/, /em$/, /%$/];
        for (const token of item.themeTokens) {
          for (const pattern of forbiddenPatterns) {
            if (pattern.test(token.trim())) {
              addError("HARDCODED_DESIGN_VALUE", `Forbidden design value ${token}`, colName, id, token);
            }
          }
        }
      }

      // Modules Ref
      if (colName !== "modules" && item.moduleKey) {
        if (!idMaps.modules.has(item.moduleKey)) {
          addError("MISSING_MODULE_REFERENCE", `Module ${item.moduleKey} not found`, colName, id, item.moduleKey);
        }
      }
    }
  }

  // Module specifics
  for (const mod of collections.modules.arr) {
    if (mod.dependencies) {
      for (const dep of mod.dependencies) {
        if (!idMaps.modules.has(dep)) {
          addError("MISSING_MODULE_REFERENCE", `Module dep ${dep} not found`, "modules", mod.moduleKey, dep);
        }
        if (dep === mod.moduleKey) {
          addError("SELF_MODULE_DEPENDENCY", `Module ${mod.moduleKey} depends on itself`, "modules", mod.moduleKey);
        }
      }
    }
  }

  // Module cycles
  const modGraph = {};
  for (const mod of collections.modules.arr) {
    modGraph[mod.moduleKey] = mod.dependencies || [];
  }
  const visited = new Set();
  const recursionStack = new Set();
  function detectCycle(node) {
    if (recursionStack.has(node)) {
      addError("MODULE_DEPENDENCY_CYCLE", `Module cycle detected at ${node}`, "modules", node);
      return true;
    }
    if (visited.has(node)) return false;
    visited.add(node);
    recursionStack.add(node);
    const deps = modGraph[node] || [];
    for (const dep of deps) {
      if (detectCycle(dep)) return true;
    }
    recursionStack.delete(node);
    return false;
  }
  for (const node of Object.keys(modGraph)) {
    if (!visited.has(node)) {
      detectCycle(node);
    }
  }

  // Hierarchy
  // routes
  for (const item of collections.routes.arr) {
    if (item.appIdentity && !idMaps.apps.has(item.appIdentity)) {
      addError("MISSING_REFERENCE", `appIdentity ${item.appIdentity} not found`, "routes", item.routeId);
    }
  }
  // surfaces
  for (const item of collections.surfaces.arr) {
    if (item.appIdentity && !idMaps.apps.has(item.appIdentity)) addError("MISSING_REFERENCE", "appIdentity not found", "surfaces", item.surfaceId);
    if (item.routeId && !idMaps.routes.has(item.routeId)) addError("MISSING_REFERENCE", "routeId not found", "surfaces", item.surfaceId);
    
    // lineage
    const route = idMaps.routes.get(item.routeId);
    if (route && route.appIdentity !== item.appIdentity) {
      addError("LINEAGE_MISMATCH", `Surface ${item.surfaceId} route lineage mismatch`, "surfaces", item.surfaceId);
    }
  }
  // regions
  for (const item of collections.regions.arr) {
    if (item.surfaceId && !idMaps.surfaces.has(item.surfaceId)) addError("MISSING_REFERENCE", "surfaceId not found", "regions", item.regionId);
  }
  // components
  for (const item of collections.components.arr) {
    if (item.regionId && !idMaps.regions.has(item.regionId)) addError("MISSING_REFERENCE", "regionId not found", "components", item.componentId);
  }
  // elements
  const usedActions = new Set();
  for (const item of collections.elements.arr) {
    if (item.appIdentity && !idMaps.apps.has(item.appIdentity)) addError("MISSING_REFERENCE", "appIdentity not found", "elements", item.elementId);
    if (item.routeId && !idMaps.routes.has(item.routeId)) addError("MISSING_REFERENCE", "routeId not found", "elements", item.elementId);
    if (item.surfaceId && !idMaps.surfaces.has(item.surfaceId)) addError("MISSING_REFERENCE", "surfaceId not found", "elements", item.elementId);
    if (item.regionId && !idMaps.regions.has(item.regionId)) addError("MISSING_REFERENCE", "regionId not found", "elements", item.elementId);
    if (item.componentId && !idMaps.components.has(item.componentId)) addError("MISSING_REFERENCE", "componentId not found", "elements", item.elementId);

    // element lineage
    const route = idMaps.routes.get(item.routeId);
    if (route && route.appIdentity !== item.appIdentity) {
      addError("LINEAGE_MISMATCH", "Element route appIdentity mismatch", "elements", item.elementId);
    }
    const surface = idMaps.surfaces.get(item.surfaceId);
    if (surface && (surface.appIdentity !== item.appIdentity || surface.routeId !== item.routeId)) {
      addError("LINEAGE_MISMATCH", "Element surface lineage mismatch", "elements", item.elementId);
    }
    const region = idMaps.regions.get(item.regionId);
    if (region && region.surfaceId !== item.surfaceId) {
      addError("LINEAGE_MISMATCH", "Element region lineage mismatch", "elements", item.elementId);
    }
    const comp = idMaps.components.get(item.componentId);
    if (comp && comp.regionId !== item.regionId) {
      addError("LINEAGE_MISMATCH", "Element component lineage mismatch", "elements", item.elementId);
    }

    if (item.actionKeys) {
      for (const ak of item.actionKeys) {
        if (!idMaps.actions.has(ak)) {
          addError("MISSING_ACTION_REFERENCE", `Action ${ak} not found`, "elements", item.elementId, ak);
        } else {
          usedActions.add(ak);
        }
      }
    }
  }

  // actions
  const uiActionKinds = ["NAVIGATE","SUBMIT","TOGGLE","OPEN_DIALOG","CLOSE_DIALOG","DOWNLOAD","UPLOAD","SEARCH","FILTER","SORT","PAGINATE","EXTERNAL_LINK"];
  for (const item of collections.actions.arr) {
    if (item.targetRouteId && !idMaps.routes.has(item.targetRouteId)) {
      addError("MISSING_REFERENCE", "targetRouteId not found", "actions", item.actionKey, item.targetRouteId);
    }
    if (uiActionKinds.includes(item.kind) && !usedActions.has(item.actionKey)) {
      addError("ORPHAN_ACTION", `UI action ${item.actionKey} is not referenced by any element`, "actions", item.actionKey);
    }
  }

  return result;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node validate.mjs <system-map.json>");
    process.exit(2);
  }
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    const result = validateSystemMap(data);
    if (result.ok) {
      console.log("VALID");
      process.exit(0);
    } else {
      console.error("INVALID:");
      for (const err of result.errors) {
        console.error(err);
      }
      process.exit(1);
    }
  } catch (err) {
    console.error("Technical error:", err.message);
    process.exit(2);
  }
}
