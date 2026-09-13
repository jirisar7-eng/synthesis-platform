TASK ID: TMPR-NEWSTART-SYSTEMMAP-001
PHASE: System Map Foundation
PURPOSE: Machine-readable registry všech významných systémových a UI prvků
WHY: Umožnit dlouhodobou dohledatelnost každého prvku projektu

BASE COMMIT:
d89889286acd077dd0e9939174b18b8c3e8d814d

BRANCH:
task/TMPR-NEWSTART-SYSTEMMAP-001

STATUS:
IN_PROGRESS

COMPLETED:
- task bootstrap
- remote checkpoint

REMAINING:
- System Map schema
- Element Registry
- Action Registry
- Module ownership
- lifecycle model
- content/help references
- theme/asset references
- RBAC references
- API/event/job references
- data ownership
- validation
- tests

BLOCKERS/RISKS:
None

EXACT NEXT STEP:
TMPR-NEWSTART-SYSTEMMAP-001-B

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
SYSTEM MAP CHECKPOINT
NOTION CHECKPOINT
