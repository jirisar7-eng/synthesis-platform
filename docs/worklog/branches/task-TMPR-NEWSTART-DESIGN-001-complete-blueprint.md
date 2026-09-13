TASK ID: TMPR-NEWSTART-DESIGN-001
TITLE: Complete Táta má právo Design Blueprint
PHASE: Design + System Map
PURPOSE: Navrhnout kompletní budoucí podobu všech hlavních uživatelských, redakčních a administračních ploch před implementací runtime funkcí.
WHY: Po dokončení musí být možné kdykoliv dohledat, kde který prvek je, jak vypadá, komu patří, co bude dělat a jak se později implementuje.
BASE COMMIT: 2081db7e73089af21fb4fee0b1d3444d8bf6ce6e
BRANCH: task/TMPR-NEWSTART-DESIGN-001-complete-blueprint
STATUS: IN_PROGRESS

TODAY DESIGN SCOPE:
A. BRAND FOUNDATION
- Táta má právo visual identity
- semantic brand tokens
- typography roles
- logo/application identity slots
- iconography rules
- imagery/illustration rules
- tone & trust principles
- light/dark readiness
- accessibility requirements

B. PUBLIC PORTAL
- global shell
- header
- compact footer
- homepage
- navigation
- section landing pages
- content pages
- search
- help/SOS surfaces
- registries/maps
- studies/library
- legal content
- AI entry surfaces
- authentication entry points
- mobile/tablet/desktop behavior

C. USER ACCOUNT
- login
- registration
- password/passkey/2FA
- profile
- account settings
- notifications
- privacy/security
- personal workspace/case entry surfaces

D. SYNTHESIS CMS
- CMS dashboard
- page tree
- content editor
- Puck adapter surface
- Tiptap rich-text surface
- content blocks
- draft/review
- preview
- publish
- versions
- rollback
- navigation editor
- SEO
- redirects
- media
- Text Registry
- Help Registry
- localization
- forms
- content permissions

E. ADMINISTRATION
- admin shell
- dashboard
- users
- RBAC
- individual permissions
- modules
- lifecycle controls
- System Map viewer
- audit center
- AI registry/control center
- settings
- branding/theme studio
- notifications
- integrations
- infrastructure/status views where appropriate

F. SYSTEM STATES
- loading
- empty
- error
- unavailable
- permission denied
- maintenance
- offline
- planned/disabled
- confirmation
- destructive action confirmation
- success
- warning
- notification states

G. SYSTEM MAP
Každý meaningful prvek musí mít podle relevance:
- elementId
- appIdentity
- routeId
- surfaceId
- regionId
- componentId
- actionKey
- moduleKey
- lifecycleState
- enabled
- disabledReasonKey
- contentKey
- helpKey
- themeTokens
- assetRefs
- permissionKeys
- expected API/event/job refs
- dataOwner
- testRefs
- taskId
- status

DESIGN INVARIANTS:
- mobile-first
- tablet is first-class
- desktop responsive, not separate product
- homepage must remain compact
- no excessively long homepage
- footer must remain compact
- Czech cs-CZ is default product language
- technical IDs remain language-neutral
- no user-facing copy hardcoded in runtime components
- design values are semantic tokens
- no project-specific design values in Core
- project brand lives in Theme/Brand/App Identity layers
- every meaningful UI element is mapped
- no anonymous button
- no anonymous form control
- no dead route
- no fake API
- unimplemented feature = PLANNED + enabled=false
- disabled reason uses disabledReasonKey
- RBAC is reflected in blueprint but enforced server-side later
- audit references prepared from first design
- AI references prepared from first design
- CMS content and presentation remain data-driven
- Puck is editor/renderer adapter, not storage/auth/backend
- Tiptap is rich-text editor surface, not content authority

DESIGN MILESTONES:
D1 — Screen & Surface Inventory (COMPLETED)
D2 — Brand + Theme Token Blueprint
D3 — Global Shell + Navigation
D4 — Public Portal Blueprint
D5 — Account/Auth Blueprint
D6 — Synthesis CMS Blueprint
D7 — Administration Blueprint
D8 — System States + Overlay Patterns
D9 — Complete System Map population
D10 — Mobile/Tablet/Desktop QA
D11 — Design consistency audit
D12 — final blueprint checkpoint

COMMAND ID: TMPR-NEWSTART-DESIGN-001-B0-B
RECONCILIATION STATUS: SOURCE_CATALOG_CREATED
SOURCES VERIFIED:
- DEV3 @ 696df6255dfe1e0f1ac21a02b002999b557629e4
- DEV3_ARCHIVE @ 7f43f59231eccaa1d1e1f2ff4fd26614615ea1ae
- OLD_DEV4 @ 9761765931f6efbb9f783f9fedbbe100cdc140fa
- PUBLIC_TATOVACESTA_CZ
D1 STATUS: CHECKPOINT_SAVED_NOT_FINAL

COMPLETED:
- design task bootstrap
- D1: Vytvořen Screen & Surface Inventory (design-manifest.json, screen-inventory.json, coverage-matrix.md, README.md) v design/blueprint/v1/. Definováno >140 ploch, s plným typováním vlastností a metadat pro System Map. Prošel automatický validator.
- legacy repository evidence scan
- public sitemap evidence scan
- feature/content catalog
- aliases normalization
- preliminary D1 cross-reference
- potential gap report

REMAINING:
- authoritative D1 gap analysis
- missing surface additions
- duplicate/merge decisions
- final D1 revalidation
- D2 through D12

BLOCKERS/RISKS:
None

EXACT NEXT STEP:
TMPR-NEWSTART-DESIGN-001-B0-C

WORKLOG CHECKPOINT:
LEGACY_CATALOG_PASS

SYSTEM MAP CHECKPOINT:
RECONCILIATION_PENDING
