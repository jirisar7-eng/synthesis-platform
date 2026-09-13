TASK ID: TMPR-NEWSTART-TOOLCHAIN-001
PURPOSE: Lock Node 24 + pnpm 12.4.1 toolchain
WHY: Prevent package-manager/runtime drift
BASE COMMIT: ea767d6b75d279d8d6a555965f62af16f44ec58e
BRANCH: task/TMPR-NEWSTART-TOOLCHAIN-001
STATUS: IN_PROGRESS
COMPLETED: Worklog creation, Toolchain configuration files created (TMPR-NEWSTART-TOOLCHAIN-001-B)
REMAINING: Toolchain verification
BLOCKERS/RISKS: None
CHANGED FILES: package.json, .nvmrc, .node-version, pnpm-workspace.yaml, .npmrc, .gitignore, docs/worklog/branches/task-TMPR-NEWSTART-TOOLCHAIN-001.md
TESTS: Validation script PASSED
COMMITS: chore(toolchain): lock node and pnpm authority
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

WORKLOG CHECKPOINT
PUSH CHECKPOINT
SYSTEM MAP CHECKPOINT
NOTION CHECKPOINT
