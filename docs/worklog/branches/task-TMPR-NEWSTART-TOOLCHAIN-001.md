TASK ID: TMPR-NEWSTART-TOOLCHAIN-001
PURPOSE: Lock Node 24 + pnpm 12.4.1 toolchain
WHY: Prevent package-manager/runtime drift
BASE COMMIT: ea767d6b75d279d8d6a555965f62af16f44ec58e
BRANCH: task/TMPR-NEWSTART-TOOLCHAIN-001
STATUS: IN_PROGRESS
COMPLETED: Worklog creation, Toolchain configuration files created (TMPR-NEWSTART-TOOLCHAIN-001-B)
REMAINING: Toolchain verification
BLOCKERS/RISKS: None
CHANGED FILES: package.json, pnpm-workspace.yaml, pnpm-lock.yaml, .npmrc, scripts/ai-studio-placeholder-server.mjs, docs/worklog/branches/task-TMPR-NEWSTART-TOOLCHAIN-001.md
TESTS: Dev placeholder test HTTP 204
COMMITS: chore(toolchain): lock node and pnpm authority, fix(toolchain): stabilize pnpm environment in AI Studio
PUSH/CI: PENDING
LAST VERIFIED HEAD: PENDING
EXACT NEXT STEP: TMPR-NEWSTART-TOOLCHAIN-001-C
LAST UPDATED: 2026-09-13

GLOBAL INVARIANTS:
- Czech UI/content by default
- modular architecture
- no hardcoded user-facing text
- no hardcoded project design in Core
- audit registry/event extensibility
- AI provider/model/agent/prompt/tool registry extensibility
- no rewriting existing Core to add modules/providers/audit sinks

RECOVERY / VERIFICATION HISTORY
- TMPR-NEWSTART-TOOLCHAIN-001-B applied
- Created files: package.json, .nvmrc, .node-version, pnpm-workspace.yaml, .npmrc, .gitignore
- Node: v24.21.0, pnpm: 12.4.1
- Validation PASSED
- Supply-chain remains fail-closed
- No dependencies installed
- Removed forbidden bun.lock

COMMAND ID: TMPR-NEWSTART-TOOLCHAIN-001-C-R02
- AI Studio preview automaticky spouštělo Bun
- starý AI Studio skeleton byl untracked residue
- residue odstraněn pouze explicitním allowlistem
- žádný tracked soubor nebyl smazán
- pnpm 12 project settings přesunuty do pnpm-workspace.yaml
- engineStrict=true
- strictDepBuilds=true
- validní pnpm-lock.yaml vytvořen přes pnpm
- žádný dependency script nebyl spuštěn
- AI Studio placeholder server je pouze dočasný environment adapter
- placeholder neobsahuje produktový text, UI ani doménovou logiku
- Node 24.21.0
- pnpm 12.4.1
- dev placeholder test HTTP 204
- forbidden lockfiles = 0

WORKLOG CHECKPOINT
PUSH CHECKPOINT
SYSTEM MAP CHECKPOINT
NOTION CHECKPOINT
