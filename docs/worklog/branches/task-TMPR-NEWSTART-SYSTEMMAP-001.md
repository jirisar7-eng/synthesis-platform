TASK ID: TMPR-NEWSTART-SYSTEMMAP-001
PHASE: System Map Foundation
PURPOSE: Machine-readable registry všech významných systémových a UI prvků
WHY: Umožnit dlouhodobou dohledatelnost každého prvku projektu

BASE COMMIT:
2c618e21629b714ca31cf59d3708ade25240dcce

BRANCH:
task/TMPR-NEWSTART-SYSTEMMAP-001

STATUS:
IN_PROGRESS

COMPLETED:
- task bootstrap
- remote checkpoint
- versioned System Map v1 schema
- Element contract
- Action contract
- Module reference contract
- lifecycle contract
- content/help key rule
- design token/asset references
- auditEventKey extension seam
- aiToolKey extension seam

COMMAND ID:
TMPR-NEWSTART-SYSTEMMAP-001-B

REMAINING:
- executable validator
- duplicate ID validation
- orphan validation
- reference validation
- PLANNED-state validation
- initial registry fixture
- tests

BLOCKERS/RISKS:
None

EXACT NEXT STEP:
TMPR-NEWSTART-SYSTEMMAP-001-C

GLOBAL INVARIANTS:

- primary product locale = cs-CZ
- technical IDs are stable and language-neutral
- modular architecture mandatory
- no hardcoded user-facing text
- no project-specific design in Core
- content is data-driven
- design is token/asset-driven
- every meaningful UI element has elementId
- every interactive element has actionKey
- every capability has moduleKey
- planned functionality is PLANNED + disabled
- no dead links
- no fake APIs
- RBAC is server-side
- audit is event/registry/adapter driven
- AI is provider/model/agent/prompt/tool registry driven
- new audit or AI extensions do not rewrite Core
- repository System Map is technical source-of-truth

SYSTEM MAP CHAIN:

Project
→ App Identity
→ Route
→ Surface
→ Region
→ Component
→ Element
→ Action
→ Module
→ Permission
→ API/Event/Job
→ Data Owner
→ Test

WORKLOG CHECKPOINT
PUSH CHECKPOINT
SYSTEM MAP CHECKPOINT:
CONTRACT_V1_CREATED
NOTION CHECKPOINT
