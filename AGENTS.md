# AGENTS.md

## Purpose

This file defines how Codex should operate in the Hudson Helm website repository.

The authoritative project specification, current project state, decisions, findings, open items, phase checklists, and technical runbook are maintained in `HH_Website_Master.md`.

Use this file as the operating guide and the master as the source of truth. Do not duplicate the master here.

## Before Starting Any Material Task

1. Read **Current Objective** in `HH_Website_Master.md`.
2. Read **Current Project Status** and the active phase checklist.
3. Review the **Decisions Record**.
4. Review **Open Questions, Inputs, and Deferred Decisions**.
5. Read the relevant **Approved Implementation Specification / Requirements Reference** section.
6. Inspect the existing implementation before modifying it.
7. Confirm the Git branch and working-tree state.

Do not act on old future-tense planning language without first checking current project state.

## Instruction Precedence

Follow the precedence rules in `HH_Website_Master.md`:

1. Current Objective and Current Project Status govern what may be worked on now.
2. Recorded decisions override older assumptions or planning language.
3. Active phase checklists and the Shared Definition of Done govern completion.
4. The approved implementation specification defines the intended finished state.
5. Activity Log and Findings are evidence/history, not instructions to repeat prior work.

If a genuine conflict remains, record it as an open item instead of silently choosing a new direction.

## Repository and Scope

- Repository: `hudsonhelm/hudson-helm-website`
- Default branch: `main`
- Active working branch: `website-refresh`
- Master document: `HH_Website_Master.md`

Treat repository setup recorded in the master as completed project state.

Do not reinitialize Git, recreate the repository, baseline, or existing branches, or restore legacy Git metadata unless inspection reveals a genuine problem.

Work only within the current objective and active phase unless the user explicitly changes scope. Do not begin later-phase implementation early.

Prefer inspection and reuse of existing structure, styles, scripts, and assets over unnecessary rebuilding.

If one feature is blocked by missing input, record the blocker and continue with unrelated work where possible.

## Git and Change Safety

Before editing, confirm the branch, working tree, and any existing uncommitted changes.

Make focused changes and avoid unrelated formatting churn.

Do not delete files, code, scripts, styles, or assets merely because they appear unused; verify first.

Use logical commits by phase or feature and push when appropriate so GitHub remains a current backup.

Never force-push, rewrite history, delete branches, replace the repository, or deploy/overwrite production without explicit user approval.

## Secrets and Business Facts

Never commit real credentials, secrets, private keys, API secrets, or production authentication values.

Follow the security/configuration decisions recorded in `HH_Website_Master.md`.

Do not invent business information, contact details, biographies, legal names, response-time promises, testimonials, or other production-facing claims that have not been approved or supplied.

## Implementation Behavior

Inspect before modifying.

When changing shared structure, identify which pages depend on it first.

When removing template residue or dependencies, verify they are no longer required elsewhere.

Preserve the established Hudson Helm dark/blue identity and the design guardrails in the master.

Prefer simpler, clearer implementations over unnecessary components, abstractions, dependencies, animation, or new features.

Do not rewrite strong existing copy merely to make changes.

## Validation

Use the **Technical Runbook** in `HH_Website_Master.md` for confirmed preview steps, runtime requirements, testing, and validation commands.

If the runbook is incomplete during Phase 0, investigate and document missing information rather than guessing.

Perform validation appropriate to the affected work, including functional, responsive, accessibility, console, link/asset, security, and regression checks where applicable.

Run the active phase's dedicated check listed in the Technical Runbook together with the prior phase checks before committing or publishing.

Do not declare a phase complete merely because its primary visual change appears correct.

## After Completing a Material Task

1. Review the Git diff for unintended changes, accidental deletions, generated junk, and unrelated churn.
2. Test or inspect the affected behavior.
3. Update the relevant checklist item in `HH_Website_Master.md`.
4. Record only material findings, decisions, blockers, or project events.
5. Update the Technical Runbook if confirmed environment information changed.
6. Commit logically when appropriate.
7. Push when appropriate.

Use the master document's checklist conventions: `[ ]`, `[x]`, `BLOCKED`, `DEFERRED`, and `N/A`.

Do not mark substantial work complete without enough evidence to support that status.

## Phase Completion

A phase is complete only when its phase checklist and the **Shared Definition of Done** in `HH_Website_Master.md` are satisfied or explicitly resolved, project-state records are current, and the Git state is intentional and reviewable.

Phase completion does not replace the dedicated final QA and regression phases.

## Escalation

Do not stop the entire project because one non-critical input is missing.

Ask the user only when a decision genuinely requires user input or approval.

Do not silently resolve ambiguous requirements.

Any action that could affect production, repository history, credentials, or other irreversible state requires explicit user approval first.
