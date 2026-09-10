# Hudson Helm Website Refresh
## Master Project Document

This is the authoritative living document for the Hudson Helm website refresh. It combines the approved implementation brief with the current project record, decisions, findings, progress, and unresolved items.

## Document Control

| Field | Value |
| --- | --- |
| Document | `HH_Website_Master.md` |
| Last updated | September 10, 2026 |
| Current phase | Phase 1 — Shared Structure |
| Phase status | **Complete and published to production — GitHub push pending explicit authorization** |
| Repository | `https://github.com/hudsonhelm/hudson-helm-website` |
| Repository visibility | Private |
| Default branch | `main` |
| Active working branch | `website-refresh` |

Git and GitHub are the revision history for this document. Do not maintain a parallel document-version or archive-snapshot system.

## Operating Rules for This Master

### Instruction Precedence

When instructions or wording in this document appear to conflict, interpret them in this order:

1. **Current Objective** and **Current Project Status** govern what work is permitted now.
2. The **Decisions Record** governs deliberate project decisions that supersede earlier assumptions or planning language.
3. The active phase checklist and the shared **Definition of Done** govern whether work may be treated as complete.
4. The **Approved Implementation Specification / Requirements Reference** defines the intended finished state.
5. The Activity Log and Findings sections are project history and evidence, not instructions to repeat prior work.

Completed setup or implementation must not be repeated merely because an older requirements section describes it in future tense. If a genuine conflict remains after applying this precedence, record it as an open item rather than silently choosing a new direction.

### Current Objective

Phase 1 is complete and published to production. Retain the normalized shared structure and await the user's review or further instruction before beginning Phase 2. Do not push the Phase 1 commits or begin Phase 2 without explicit user direction.

Do **not** begin Phase 2 substantive homepage implementation until the user gives explicit direction after reviewing the published Phase 1 site. The Phase 1 commits may be reviewed locally before their GitHub push; this does not reopen or invalidate the completed Phase 0 or Phase 1 checklists.

### Checklist Status Conventions

- `[ ]` — Not yet completed.
- `[x]` — Completed and verified.
- `BLOCKED — <reason>` — Cannot proceed until a specific dependency or user input is available.
- `DEFERRED — <reason>` — Intentionally postponed; state where or when it will be handled.
- `N/A — <reason>` — Evaluated and determined not to apply.

When marking a substantial inspection or implementation item complete, record enough evidence in Findings, the Activity Log, or the relevant checklist note to show what was verified. Do not create verbose notes for trivial steps.

## Current Project Status

Phase 0 repository setup and source/browser inspection are complete with the recorded runtime deferral. Phase 1 shared structure is complete and published to production: all six root pages use the normalized seven-item navigation, shared structural stylesheet, responsive laptop/mobile menu behavior, visible keyboard focus, consistent current-page state, and a consistent minimal footer. The full deployable checkout at site commit `5f42c02` was uploaded through the saved WinSCP production session and verified by remote size comparison plus public HTTPS requests. The user explicitly accepted temporary missing destinations for Who We Are and Support for approximately one week. Phase 2 has not started, and the Phase 1 GitHub push awaits explicit authorization.

### Phase Progress

| Phase | Name | Status |
| --- | --- | --- |
| 0 | Repository / Safety | Complete; documented runtime deferral |
| 1 | Shared Structure | Complete and published; GitHub push pending |
| 2 | Homepage | Not started |
| 3 | What We Do | Not started |
| 4 | Why Hudson Helm | Not started |
| 5 | Who We Are | Not started |
| 6 | Are We a Good Fit? | Not started |
| 7 | Start Here | Not started |
| 8 | Support Portal Shell | Not started |
| 9 | Global Completion | Not started |
| 10 | QA | Not started |
| 11 | Regression / Review | Not started |

## Phase 0 Working Checklist

### Completed

- [x] Identified the deployable local site root as `D:\HH_Website\HudsonHelm_Website_v64`.
- [x] Preserved the previous personal-repository Git metadata in `D:\HH_Website\.legacy-git-backups\HudsonHelm_Website_v64.personal.git`.
- [x] Initialized a fresh local Git repository with `main` as the default branch.
- [x] Added `.gitignore` and `.env.example`.
- [x] Created the private `hudsonhelm/hudson-helm-website` GitHub repository.
- [x] Created and pushed the baseline commit.
- [x] Created and pushed the `website-refresh` working branch.
- [x] Stored the approved project brief in the repository.
- [x] Performed an initial staged-content credential-pattern scan.
- [x] Confirmed with the user that the SMTP value currently present in `mail.php` is a dummy credential and may be committed.

### Completed Setup Guardrail

The repository setup above is established project state. Do **not** reinitialize Git, recreate the GitHub repository, recreate the baseline commit, recreate existing branches, restore the legacy `.git` directory, or otherwise redo completed repository setup merely because the approved implementation specification below contains the original setup instructions. Revisit completed setup only if inspection reveals an actual problem that requires correction.

### Inspection and Verification — Complete with Recorded Deferrals

- [x] Inspect the complete HTML structure and page relationships — six root pages, navigation, forms and headings inventoried.
- [x] Inspect CSS organization, dependencies, duplication, and reusable styles — shared template CSS and page overrides traced.
- [x] Inspect JavaScript behavior, dependencies, carousel code, menus, and template residue — source review, syntax checks and browser logs recorded.
- [x] Inspect shared and duplicated header/footer implementations — differences recorded below.
- [x] Inventory images, fonts, and other assets; identify candidates for reuse without deleting anything — inventory and reference scan recorded.
- [x] Inspect the contact form, PHPMailer integration, hosting assumptions, and PHP/runtime requirements — source inspection complete; runtime execution deferred below.
- [x] Inspect existing SEO metadata, structured data, analytics, and third-party scripts — local and public response checks recorded.
- [x] Compare the local site with the live production site — six HTML responses, four shared assets, browser rendering and infrastructure endpoints compared.
- [x] Selected the committed local source as the refresh baseline following the user's instruction to commit after the baseline recommendation. Production differences remain documented; no files overwritten.
- [x] Identify an appropriate safe local or staging preview workflow — loopback static preview verified; PHP execution explicitly deferred to Phase 7 before backend implementation/testing.
- [x] Populate the Technical Runbook with confirmed preview steps, PHP/runtime requirements, dependency notes, validation commands, and known production differences.
- [x] Record inspection findings, risks, and recommended Phase 1 boundaries in this document.
- [x] Reconfirmed clean `website-refresh` at pushed inspection commit `f2de195` before this documentation-only closeout. No website source changes or production deployment.

## Activity Log

Record meaningful project events only: phase transitions, significant inspections, material implementation milestones, important failures/recoveries, and user approvals or changes in direction. Do not turn this into a transcript of routine agent actions.

| Date | Activity | Result |
| --- | --- | --- |
| 2026-09-10 | Read and reviewed the complete original implementation brief. | Project scope and guardrails accepted as governing instructions. |
| 2026-09-10 | Inspected the top-level folder and discovered existing personal-repository metadata inside the website directory. | Existing metadata was preserved outside the new repository rather than overwritten or deleted. |
| 2026-09-10 | Authenticated GitHub CLI as `hudsonhelm`. | Confirmed access to the intended GitHub account. |
| 2026-09-10 | Created `hudsonhelm/hudson-helm-website`. | Private repository created with `main` as its default branch. |
| 2026-09-10 | Created and pushed the baseline and working branches. | `main` and `website-refresh` both point to the complete baseline at commit `b7d5fa2`. |
| 2026-09-10 | Consolidated the implementation brief and project record into the root-level living master document. | Established the project status, checklist, findings, decisions, and open-items structure used to manage the refresh. |
| 2026-09-10 | Completed the independent Phase 0 source inventory, public-site comparison, and safe static-browser inspection; added dependency-free inspection/preview helpers. | Recorded existing defects and production differences, verified helper syntax and preview safeguards, and populated the runbook. At that point the baseline choice awaited user confirmation; PHP execution was deferred to Phase 7, and Phase 1 and production were untouched. |
| 2026-09-10 | Completed Phase 1 shared structure across all six root pages. | Added the shared Hudson Helm stylesheet and structural check, normalized the seven-item header/navigation and minimal footer, verified responsive and keyboard behavior, and kept Phase 2 untouched. GitHub push remains pending explicit authorization. |
| 2026-09-10 | Published the complete deployable site checkout containing Phase 1 to production with the user's explicit approval. | WinSCP uploaded the six root pages, mail handler, shared assets, bundled libraries, Revolution assets, and retained template pages from site commit `5f42c02`. Remote size previews reported nothing left to synchronize; all six public root pages and `css/hudson-helm.css` returned HTTP 200 with the Phase 1 markers present. Server-managed files and directories were preserved. Phase 2 remains unstarted. |

## Findings and Observations

Phase 0 closeout (September 10, 2026): the user's subsequent instruction to commit is taken as acceptance of the recommended committed-local baseline. All inspection items are resolved; runtime execution remains deferred as recorded in the runbook. Phase 1 was unstarted at the time of this closeout.

Record confirmed inspection findings and evidence that materially inform implementation, risk, or maintenance. Distinguish confirmed facts from unresolved assumptions.

### Phase 1 implementation evidence — September 10, 2026

- All six root pages load `css/hudson-helm.css` after legacy page styles. The shared layer defines spacing tokens and utilities, header/navigation layout, laptop/mobile collapse behavior, visible `:focus-visible` treatment, and minimal footer normalization. Existing page-specific visual rules remain in place for later phase-scoped cleanup.
- The header presents the approved seven destinations in consistent order. Start Here remains a desktop CTA and is also present inside the collapsed menu. Active pages expose `aria-current="page"`; the primary navigation and logo link have accessible labels, and decorative header icons are hidden from assistive technology.
- Who We Are points to `whoweare.html` and Support points to `support.html`; both are deliberately marked `data-pending-page="true"`. The user approved these temporary missing destinations for approximately one week.
- Desktop checks at 1440px and 1366px showed the complete navigation with no horizontal overflow. At 1024px and 390px the menu collapsed, opened successfully, displayed all seven items, and produced no horizontal overflow. Keyboard testing showed a visible focus ring.
- `node tools/check-phase1.cjs` passed for all six pages. `node tools/inspect.cjs`, JavaScript syntax checks, preview guard checks, and `git diff --check` remained clean apart from known legacy line-ending notices and the two authorized pending routes.
- Browser console output retained the previously recorded Rough Notation null-match errors on affected pages. Phase 1 introduced no JavaScript or dependency changes; those existing page-specific errors remain assigned to later scoped correction.
- Header/footer changes to `index.html` were structural only. Homepage hero, carousel, service content, spacing, and other Phase 2 work were not changed.
- With explicit production approval, the full deployable checkout at site commit `5f42c02` was uploaded through WinSCP's saved `Hudson Helm` session on September 10, 2026. Project-only files (`.git`, `.env.example`, `.gitignore`, `.gitattributes`, `AGENTS.md`, `HH_Website_Master.md`, `docs`, and `tools`) were not deployed; server-managed `.well-known`, `.ftpquota`, `cgi-bin`, `error_log`, and the pre-existing `nc_assets` directory were not deleted.
- WinSCP `stat` confirmed the deployed root-file sizes, including `index.html` at 25,559 bytes and `css/hudson-helm.css` at 7,283 bytes. Read-only `synchronize remote -preview -criteria=size` comparisons reported `Nothing to synchronize` for `css`, `fonts`, `images`, `js`, `PHPMailer`, `rev`, and `unused pages`. Cache-busted public HTTPS checks returned 200 for all six root pages and the shared stylesheet; every root page included the Phase 1 stylesheet reference and pending-link markers. The public stylesheet SHA-256 matched the local file exactly, and the two user-approved pending routes returned 404 as expected. Cloudflare continued to inject its production response additions.

### Repository and File Structure

- `D:\HH_Website` is a containing workspace; the deployable site and Git repository root are `D:\HH_Website\HudsonHelm_Website_v64`.
- The website is a legacy static/PHP project containing HTML, CSS, JavaScript, images, fonts, Revolution Slider assets, PHPMailer, and a directory of unused template pages.
- The initial baseline contains 371 tracked files.
- No individual file larger than 50 MB was found during the initial repository check.
- Legacy files contain substantial existing trailing whitespace and mixed line-ending warnings. These were deliberately preserved in the baseline so repository setup did not become an undocumented cleanup pass.

### Git and GitHub

- The previous embedded repository pointed to a personal GitHub repository and had extensive working-tree differences. Its `.git` directory was moved to a recoverable backup outside the new repository.
- The first GitHub push was rejected because the commit exposed an account-protected email address. The unpushed commit was safely amended to use the `hudsonhelm` GitHub no-reply address.
- The new private repository was then populated successfully.
- Commit `ca5edaf` created the initial secret-safe baseline; commit `b7d5fa2` added the approved dummy-configured `mail.php` and completed the current baseline on both branches.

### Security and Configuration

- An initial scan found a hard-coded SMTP value in `mail.php` and example/default password strings in the bundled PHPMailer code.
- The user confirmed that the value in `mail.php` is a dummy credential and explicitly approved publishing it to the private repository.
- `.env.example` documents the intended future SMTP and Turnstile environment-variable names without real secrets.
- Phase 0 source-level security/runtime inspection is recorded below; PHP execution, delivery and deployment-environment validation remain explicitly deferred to Phase 7.

### Inspection evidence — September 10, 2026

- Six root HTML pages were inventoried with `node tools/inspect.cjs`. Five business pages lack an H1; only `404.html` has one. All six lack meta descriptions. No duplicate literal IDs were found by the source scanner. This is source triage, not full HTML validation.
- Header/footer HTML is duplicated in each page; there is no shared include or build system. What We Do lacks the footer logo used on the other business pages; Home uses a different footer logo asset. The 404 retains template contact details, social links, search UI, copyright, and five broken root service links.
- Inline CSS ranges from 5,330 to 14,138 characters per page. `css/style.css` provides the original orange/light template and imports Google Fonts (Jost and Nunito Sans); inline rules establish the dark/blue identity. Phase 1 must preserve cascade order when consolidating these overrides.
- `js/custom.js` depends on jQuery plus Isotope, countTo, WOW and Magnific Popup; some plugin calls are unconditional even when matching widgets are absent. Bootstrap controls the mobile collapse. Owl/progressbar and Rough Notation scripts are loaded selectively. Home additionally loads Revolution Slider and `js/rev-custom.js`, which contains initialization for several template sliders.
- Local homepage browser logs confirm null-match errors in `js/rough-custom.js:16` and null-element errors from `js/rough-script.js:49`. Record as baseline defects for later scoped correction.
- Local `mail.php` requires Name, Email, Phone, Subject and Message; escapes HTML mail body, validates email, uses a honeypot, catches mail exceptions, and sends through PHPMailer 5.2.28 using Migadu SMTP over implicit TLS port 465. The user-approved dummy credential is unchanged. `.env.example` is documentation only; the handler does not load it. No Company field, Turnstile verification, input length caps or throttling are implemented. Form labels rely on placeholders except the honeypot; the response has `aria-live=polite`. PHP execution and delivery are not yet verified.
- The pre-Phase 1 public GET comparison found Cloudflare email obfuscation and a Cloudflare Insights beacon injected into production HTML. These integrations must be reflected in the eventual privacy policy even though they are absent from local source. At that time `css/responsive.css` and `js/rev-custom.js` matched after line-ending normalization, while production `css/style.css` lacked the local footer-mark block and production `js/custom.js` used older click-based form validation. Those deployable-source differences were superseded by the approved full-site upload on September 10, 2026; Cloudflare response injections remain production-only.
- Safe static preview is available through `node tools/preview.cjs` at `http://127.0.0.1:8087`. It binds only to loopback, permits static asset extensions, denies dot paths/configuration/PHP, and rejects non-GET/HEAD requests. It does not emulate PHP, Cloudflare, server rewrites, or email delivery.

### Asset, accessibility and infrastructure findings

- Inventory includes 107 JPGs, 38 PNGs, 8 SVGs, 9 TTFs, 6 WOFFs and 5 WOFF2s across the existing source tree. Template/demo pages and library examples remain intact and are not a proposed public sitemap. No framework migration or asset deletion was performed.
- Preserve first-slide `rev/assets/bg-1.jpg` and circuit background `rev/assets/2-2.jpg`; What We Do introduction uses `images/benefits/1.jpg`, Why Hudson Helm hero uses `images/benefits/2.jpg`, and Good Fit uses `images/blog/1.jpg`. Existing service-detail imagery lives under `images/tabs/`. The footer PNG `images/logos/hudson-helm-logo-w-trans.png` is 1,216,090 bytes; review sizing/compression in the performance phase.
- Source checks found no missing direct local assets on the five business pages. The 404 links to five service pages absent at the root. CSS reference triage flags missing optional Owl video artwork, Revolution cursor/tile/loader assets, and a WOFF2 font; a duplicate `css/all.min.css` references a nonexistent root webfonts directory, while public pages load `fonts/font-awesome/css/all.min.css`. A CSS reference is not proof that the browser requests it; confirm usage before removal.
- Local jQuery is 3.1.0; Why Hudson Helm instead loads Google-hosted 2.2.4. Bootstrap's source banner is 5.2.0. No root package manifest/build process, server routing configuration, sitemap or robots file is tracked. PHPMailer's nested Composer manifest is library metadata, not a site build setup.
- All six local pages loaded their image elements during browser inspection. Home, What We Do, Why Hudson Helm and Start Here produce Rough Notation errors; the public Home and What We Do also show the error family. Start Here's empty-submit validation produced all five field messages without sending mail. At 390px, its mobile menu expanded with `aria-expanded=true`; Start Here CTA was absent from the expanded navigation. Global CSS removes link outlines with `!important`, so keyboard focus needs explicit review in Phase 1.
- Public HTML differs only in inspected Cloudflare email/analytics lines; public server-side PHP source cannot be verified by public GET and was not requested. HTTP homepage GET remained HTTP rather than redirecting to HTTPS. HTTPS works. Public `robots.txt` is Cloudflare-managed (200), `sitemap.xml` returns 404, and a deliberately nonexistent page returns 404 without the local branded 404 title. A direct GET of `404.html` returns 200, which does not establish missing-route handling.
- Preview guard checks passed: homepage 200; PHP GET 403; PHP POST 405; `.git/config` and master Markdown 403; nonexistent HTML 404. All local `js/*.js` passed `node --check`; runtime errors above demonstrate syntax success is not functional correctness. Preview helpers also passed syntax checks.

### Recommended Phase 1 boundary

Normalize common header markup and the shared dark/blue overrides across all six root pages; preserve source order and page-specific overrides until verified. Retain Bootstrap's grid/collapse initially. Establish spacing tokens around the existing 130px default section padding, buttons, cards and heroes; address the known focus and mobile CTA gaps. Inventory dependency users before changing shared script loading. Keep carousel removal and service/content rewrites in their assigned phases. Do not add dead navigation destinations for not-yet-built pages; explicitly resolve the Phase 1 seven-item navigation versus Phase 5 Who We Are timing before implementation. PHP, SMTP and Turnstile behavior belongs to later form phases.

## Technical Runbook — Phase 0 Deliverable

This section is the operational reference for future Codex sessions and maintainers. Populate it only with confirmed information discovered during Phase 0; do not guess at environment details.

| Item | Current Record |
| --- | --- |
| Deployable site / repository root | `D:\HH_Website\HudsonHelm_Website_v64` |
| Active working branch | `website-refresh` |
| Production site | `https://hudsonhelm.com/` |
| Confirmed production deployment method | `C:\Program Files (x86)\WinSCP\WinSCP.com` with the saved `Hudson Helm` session. The confirmed session uses plain FTP, not SFTP/FTPS. Upload only the deployable site files; do not publish project-only files or delete server-managed paths. |
| Local or staging preview method | From repository root run `node tools/preview.cjs`; Node v24.21.0 verified. Stop with Ctrl+C. Static inspection only; do not deploy this helper. |
| Local/staging preview URL | `http://127.0.0.1:8087/` |
| PHP version / runtime | No PHP executable on PATH or in checked Program Files, WinGet, XAMPP, Laragon, Scoop/tools locations. Production PHP version unknown. DEFERRED to Phase 7: establish compatible supported runtime before backend edits or execution. |
| Required PHP extensions / dependencies | Bundled PHPMailer 5.2.28 declares PHP >=5.0 and ctype; handler uses `http_response_code` (PHP >=5.4), filter validation and JSON. SMTP TLS needs OpenSSL and socket/stream connectivity. These are source requirements, not a recommended production version or proof of installed extensions. Compatibility and library upgrade assessment required before Phase 7. |
| Safe form-testing method | Verified empty submission in static preview. Preview rejects all POSTs and PHP GETs. DEFERRED to Phase 7: use an isolated PHP environment and local mail sink with outbound delivery prevented for valid-submit, malformed input and error-path tests; never use production SMTP for automated tests. |
| Turnstile local/staging test approach | Not implemented yet. DEFERRED to Phases 7/8: use provider test keys with actual server verification; test invalid/expired tokens and ensure credential-free portal requests. No CAPTCHA or production form submitted in Phase 0. |
| Hosting/runtime assumptions | Static HTML plus PHP mail endpoint behind Cloudflare observed; origin server, runtime, rewrite rules, secret injection and mail connectivity cannot be confirmed from public responses. Obtain hosting details before backend/staging/deployment work. |
| Validation / lint / scanning commands | `node tools/check-phase1.cjs` (shared header, navigation, footer and stylesheet contract); `node tools/inspect.cjs` (read-only regex inventory; not a full HTML validator); `node --check tools/preview.cjs`; `node --check tools/inspect.cjs`; `node --check tools/check-phase1.cjs`; `Get-ChildItem js -Filter '*.js'` with `node --check` per file; `git diff --check`. Use `rg --no-ignore` with explicit paths for reliable source searches in this environment. |
| Known local/staging vs. production differences | The full deployable checkout at site commit `5f42c02` was size-synchronized to production on September 10, 2026. Cloudflare email protection, analytics injection, and robots content remain production-response additions. Static preview still cannot validate PHP, email delivery, Cloudflare behavior, or origin 404 routing. |

Update this runbook when the environment or verified workflow materially changes.

## Decisions Record

Record decisions that materially constrain or redirect future implementation. Do not use this table for trivial implementation details already captured by Git history.

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-09-10 | Use `D:\HH_Website\HudsonHelm_Website_v64` as the repository root. | It is the actual deployable site root; using the containing folder would unnecessarily nest all website paths. |
| 2026-09-10 | Use a private repository owned by `hudsonhelm`. | Separates the business website from the user's personal GitHub account and follows the approved brief. |
| 2026-09-10 | Preserve the old `.git` directory outside the new repository. | Retains recoverability without importing unrelated personal-repository history. |
| 2026-09-10 | Preserve legacy whitespace and template files in the baseline. | Cleanup and deletion must be intentional, reviewable work after inspection. |
| 2026-09-10 | Publish the current `mail.php`. | The user confirmed its embedded SMTP value is a dummy credential and authorized publication. |
| 2026-09-10 | Maintain one root-level living master and use Git/GitHub as its revision history. | Prevents competing copies and avoids maintaining a redundant parallel document-version/archive system. |
| 2026-09-10 | Expose the complete seven-item navigation during Phase 1, including temporary missing Who We Are and Support destinations. | The user explicitly accepted broken links for approximately one week so shared navigation could be finalized before those later-phase pages exist. |
| 2026-09-10 | Publish the complete deployable checkout after Phase 1 rather than only the changed files. | The user explicitly requested that the working checkout and live production payload be aligned. Existing server-managed paths were preserved, and project-only files were excluded. |

## Open Questions, Inputs, and Deferred Decisions

This is the canonical register for unresolved user inputs, blockers, and intentionally deferred decisions. Do not maintain a duplicate list elsewhere in this document. A missing input blocks only the affected feature unless explicitly stated otherwise.

- **OPEN — New Jersey business phone number:** not yet provided. Blocks final replacement of the temporary 954 number only.
- **OPEN — Exact registered LLC/legal entity name:** not yet confirmed for legal copy. Blocks only legal text that requires the exact entity name.
- **OPEN — Who We Are content:** real photographs, names, roles, and approved biographies have not yet been supplied. The page structure may be built later without inventing people or content.
- **OPEN — Start Here response-time expectation:** not yet supplied. Do not publish an unsupported response-time promise.
- **DEFERRED — Production Migadu SMTP configuration and Cloudflare Turnstile keys:** needed during the relevant implementation/testing phases and must be handled securely.
- **DEFERRED — Customer endorsements:** approved as a future enhancement and not required for the initial refresh.
- **RESOLVED — Intended baseline:** retain the committed local source following the user's instruction to commit. Local CSS/form JavaScript differences remain documented; production PHP cannot be compared from public responses.
- **DEFERRED — PHP and hosting validation:** static preview is verified. Obtain origin runtime/hosting details and establish isolated PHP plus mail-sink testing before Phase 7. This does not block static shared-structure work after baseline confirmation.
- **TEMPORARY — Who We Are and Support destinations:** the user approved temporary missing routes for approximately one week beginning September 10, 2026. `whoweare.html` and `support.html` are clearly marked pending in source and must be resolved when their pages are implemented or before the temporary allowance expires.

---

## Approved Implementation Specification / Requirements Reference

The sections below define the approved requirements and intended finished state of the website. They retain some original planning language for context. **They do not override the Current Objective, Current Project Status, Decisions Record, or completed checklists above.** Treat already-completed setup instructions as historical requirements that have been satisfied, not as commands to perform them again.

## Project Goal

Refresh the existing Hudson Helm website into a simpler, more professional, more impactful small-business MSP website.

This is **not** a ground-up redesign.

The existing dark background, blue accent palette, logo/branding, general typography, and overall visual identity are fundamentally sound. The project should improve structure, hierarchy, consistency, authenticity, conversion, mobile behavior, and technical quality while preserving the established Hudson Helm look and voice.

Current live site:

https://hudsonhelm.com/

Hudson Helm serves businesses throughout **New Jersey and New York**.

The desired overall impression is:

- Experienced
- Approachable
- Responsive
- Security-minded
- Practical
- Small by design
- Professional without feeling corporate
- Sensibly priced without positioning as a "cheap IT" provider

Avoid generic MSP buzzword soup, excessive animation, overbuilt pages, aggressive sales language, giant marketing claims, unnecessary widgets, and template residue.

---

# Source Control / GitHub — Required Before Website Changes

This project should be placed under Git source control and backed by a **private GitHub repository before substantive website changes begin**.

## Repository Direction

Use a private GitHub repository, preferably named something clear such as:

`hudson-helm-website`

If a GitHub repository for this website already exists, inspect it and use it rather than creating a duplicate.

If no repository exists:

1. Initialize Git in the local website project folder.
2. Create an appropriate `.gitignore` before the first commit.
3. Create a **private** GitHub repository.
4. Add the GitHub repository as the remote.
5. Commit the current website in its untouched state.
6. Push that baseline commit to GitHub.
7. Create a working branch for the refresh, such as `website-refresh`.
8. Perform the refresh work on that branch.

## Baseline Commit

Before altering the website, create a clean baseline commit representing the current site.

Suggested commit message:

`Baseline: current Hudson Helm production site`

This commit should make it easy to restore the current website if necessary.

## Commit Strategy

Do not perform the entire refresh as one giant commit.

Use logical commits by phase or feature. Examples:

- `Refactor global navigation and spacing`
- `Simplify homepage hero and service cards`
- `Rebuild What We Do service structure`
- `Compress Why Hudson Helm layout`
- `Add Who We Are page`
- `Rework Are We a Good Fit page`
- `Implement Start Here contact form`
- `Add Support portal shell`
- `Redesign global footer`
- `Add privacy policy and custom 404`
- `Complete SEO and accessibility QA`

Push regularly so the GitHub repository remains a current backup of the work.

## Project Documentation

Maintain the authoritative living project document at the repository root:

`HH_Website_Master.md`

Use Git and GitHub history to review or recover earlier versions of this document; do not create parallel versioned document snapshots as part of the normal workflow.

Update the living master whenever implementation decisions or project status materially change.

## Secrets and Sensitive Configuration

**Never commit credentials or secrets to Git or GitHub.**

This includes, but is not limited to:

- `.env`
- SMTP passwords
- Migadu credentials
- Cloudflare Turnstile secret
- Hosting/control-panel credentials
- API keys
- Private keys
- Database credentials
- Authentication secrets

Use environment variables or server-side configuration outside the public web root as appropriate to the hosting environment.

Commit a `.env.example` or equivalent documentation containing only variable names and safe example placeholders.

Example:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USERNAME=example
SMTP_PASSWORD=replace-me
TURNSTILE_SITE_KEY=replace-me
TURNSTILE_SECRET_KEY=replace-me
```

The real values must not be committed.

Before pushing, inspect the Git history and working tree for accidentally included secrets.

## Production Safety

Do **not** deploy or overwrite the production website without explicit user approval.

Build and test locally or in a safe staging environment first.

Do not create a replacement GitHub repository, rewrite Git history, force-push, delete branches, or remove production files without a clear reason and user approval.

---

# First: Inspect Before Modifying

Before making changes:

1. Inspect the entire existing project/repository and understand:
   - Current HTML structure
   - CSS organization
   - JavaScript
   - Shared header/footer implementation
   - Existing images/assets
   - Form code
   - Hosting/runtime assumptions
   - Existing SEO/meta configuration
   - Existing third-party scripts or analytics
2. Browse the existing live site and compare it with the local files.
3. Identify reusable components/styles rather than unnecessarily rebuilding them.
4. Do not delete existing assets until it is clear they are unused.
5. Preserve a recoverable copy of the current site through Git.
6. Work in logical commits by phase/page.
7. Do not deploy production without explicit approval.

---

# Design Guardrails

The guiding design principle is:

**SIMPLE + PROFESSIONAL + IMPACTFUL**

Prefer subtraction over adding more stuff.

Do **not** add:

- Testimonial carousels
- Logo clouds
- Counters/statistics
- Animated number widgets
- Newsletter signup
- Blog
- Resources section
- Partner-logo wall
- Pricing page
- Individual pages for every service
- Decorative animation without a clear purpose
- Huge amounts of new copy
- Generic "Learn More" buttons everywhere
- Fake reviews
- Fake customer logos
- Fake employees
- Fake credentials/account functionality

Use animation/transitions only where they materially improve usability.

Preserve the dark/blue visual identity.

Reduce excessive vertical whitespace throughout the site.

The site currently tends to place too much empty vertical space between major sections. Tighten these transitions while preserving enough breathing room to keep the design clean.

Real Hudson Helm photography should gradually replace stock photography where appropriate.

Do not replace decent stock photography merely for the sake of replacing it, but prefer authentic photographs when real assets are supplied.

---

# Proposed Final Site Map

Primary navigation:

- Home
- What We Do
- Why Hudson Helm
- Who We Are
- Are We a Good Fit?
- Support
- Start Here

Footer-only:

- Privacy Policy

Do not add additional primary navigation pages unless there is a compelling functional reason.

---

# Home Page

## Hero

Remove the rotating hero carousel entirely.

Keep the **first existing carousel slide** as the static hero:

**Dependable IT Support For Small Business**

Keep its current hero image.

Remove carousel navigation/rotation code and controls.

Do not create separate pages merely to preserve the other two carousel slides.

Delete the current **Read More** button entirely.

**Do not replace it with another hero button.**

Keep the hero visually restrained and rebalance its height after removing the carousel so it does not remain unnecessarily tall.

## Home Service Cards

Keep the existing 4 × 2 layout and equal visual weighting.

Do not add more cards.

Do not add buttons to the cards.

Do not add unnecessary hover effects or additional text.

Keep these unchanged:

- Managed IT Services
- Responsive Support
- Cybersecurity
- Backup & Recovery
- Onboarding & Setup
- Strategic IT Guidance

Change **Support** to **Cloud & Email**.

Use this description:

> Email, calendars, licensing, and cloud administration for the tools your business relies on.

Change the **Network & Wi-Fi** description to:

> Setup, troubleshooting, and improvement for firewalls, switches, Wi-Fi, and connectivity.

## Home Page Spacing

The vertical gap between **Hero → service cards** is currently too large. Reduce it.

The vertical gap between **Service cards → Why Hudson Helm section** is also too large. Reduce it.

## Home "Why Hudson Helm" Section

Keep a concise Why Hudson Helm teaser on Home.

Do not duplicate the full dedicated Why Hudson Helm page.

Focus the teaser on approximately four differentiators:

- Responsive, personal service
- Experienced IT support without enterprise overhead
- Security-minded by default
- Practical recommendations without unnecessary complexity

Include one clear path/link to the full **Why Hudson Helm** page.

The section should be compact and visually lighter than the current treatment.

---

# What We Do Page

This page currently repeats its service taxonomy several times and needs significant structural simplification.

## Page Hero

Move the existing **Dependable IT Without Enterprise-Level Overhead** section to the **top of the page** and use it as the page hero/introduction.

Keep its current image.

Preserve the core positioning message.

Tighten supporting copy only where needed.

## Service Navigation

Keep **one 8-card service grid** near the top.

These cards should function as in-page navigation/jump links to detailed service sections farther down the page.

Use exactly these eight categories:

1. Managed IT Services
2. Responsive Support
3. Cloud & Email
4. Cybersecurity
5. Backup & Recovery
6. Network & Wi-Fi
7. Projects & Consulting
8. Strategic IT Guidance

## Merge Existing Overlapping Categories

- End-User Support → fold into Responsive Support
- Help Desk → fold into Responsive Support
- Microsoft 365 → fold into Cloud & Email
- Vendor Coordination → incorporate into Managed IT Services and/or Strategic IT Guidance
- Cybersecurity & Backups → split into separate Cybersecurity and Backup & Recovery content

## Remove

Remove the existing separate four-card **Core Services** navigation section.

It is redundant once the eight primary service cards are clickable.

Remove **Learn More** buttons from service-detail content.

Do not create unnecessary additional service pages.

## Detailed Service Content

Create one substantive section for each of the eight service categories.

Use the existing Managed IT Services detailed section as the general visual model:

- Heading
- Short explanatory copy
- Concise bullets
- Relevant image

Alternate image-left/image-right positioning where appropriate so the page does not become eight visually identical slabs.

Content should explain what the service actually means for a small-business customer.

Keep copy concise. Do not turn each section into an essay.

## Final Flow

Hero / Introduction → 8 clickable service cards → 8 detailed service sections → One final CTA to Start Here → Global footer

Do not repeatedly reintroduce the services. Each section should move the visitor forward.

---

# Why Hudson Helm Page

The messaging on this page is strong.

The problem is excessive length and repeated visual treatment.

Do **not** substantially rewrite its core personality.

## Keep Hero

Keep:

**A Smaller MSP By Design, So Your Business Never Feels Like A Ticket Number.**

Keep the existing primary hero image.

Preserve the supporting message.

## Keep Four Differentiator Cards

- Responsive Support
- Practical Security
- Right-Sized IT
- Ownership

## Keep Trust Statement

Keep:

**We Are Not Trying To Be The Biggest Shop In The Room. We Are Trying To Be The One You Trust.**

This is an important piece of Hudson Helm positioning.

## Compress the Next Section

Remove the second large stock photograph.

Keep these ideas:

- Direct Communication
- A Cleaner, Calmer IT Environment
- Advice With Your Budget In Mind

Present them as a much lighter, compact three-column treatment rather than another large image/card section.

## Reduce Page Length

The page is currently approximately five laptop screens tall.

Aim closer to roughly three screens where reasonably possible.

Do this primarily through removing redundant imagery, reducing excessive whitespace, compressing repetitive sections, and improving hierarchy.

Do not achieve this simply by deleting useful messaging.

## Final CTA

Keep the concept/headline:

**If Your Current IT Feels Slow, Reactive, Overpriced, Or Just Harder Than It Should Be, That Is Fixable.**

Use it as the closing conversion section.

## Eyebrow Labels

Reduce overuse of the small all-caps section labels above headings.

Keep them where they genuinely improve hierarchy.

They should not appear automatically above every heading.

---

# Who We Are Page — New

Create a dedicated **Who We Are** page.

This page exists because Hudson Helm's differentiation is highly personal: customers should know who may actually be supporting them.

## Content

Feature real people who legitimately work under the Hudson Helm name.

Nelson should be presented as the company lead/founder.

Trusted consultants/contractors may also be included.

Do not imply an independent consultant or contractor is an employee if they are not.

Use accurate role labels.

Biographies should be concise, human, professional, and relevant to customers.

Avoid corporate executive-biography language and long career histories.

## Positioning

Reinforce:

- Smaller MSP by design
- Direct communication
- Experienced technical people
- Accountability
- Customers knowing who they are working with

## Photography

Use real photographs supplied by Hudson Helm.

Do not invent people, names, biographies, or photos.

If assets are not yet supplied, build the page structure but clearly identify the missing content during development.

Do not publish fake placeholder people.

## Navigation

Add **Who We Are** to primary navigation, likely adjacent to **Why Hudson Helm**.

Verify that navigation remains comfortable at common desktop widths and collapses cleanly on mobile.

---

# Are We a Good Fit? Page

This page should be extremely easy to skim.

A visitor is essentially asking: **Does Hudson Helm work with a company like mine?**

## Hero

The existing full-width image consumes too much of the first screen.

Convert the top into a compact text + image hero.

Use **Are We a Good Fit?** and preserve **The Kind Of Business We Serve Best** as a major message.

Place intro text alongside the existing image rather than below a massive image.

## Fit Criteria

Convert the current paragraph-heavy explanation into scannable criteria.

Communicate concepts such as:

- Approximately 5–50 employees
- Technology is important to day-to-day operations
- Responsive remote and onsite support is valuable
- No large internal IT department
- Security is taken seriously
- Practical recommendations are preferred over unnecessary complexity
- The business wants an ongoing technology relationship rather than anonymous ticket handling

Preserve the existing heading **When The Fit Is Especially Strong**.

## Not-a-Fit Section

Add a brief section such as **We May Not Be The Right Fit If...**

Keep it short: approximately 3–4 items.

Possible concepts:

- The only priority is finding the cheapest possible break/fix provider
- The company is unwilling to invest in basic maintenance/security
- The company requires a large national/enterprise help-desk organization
- The desired IT model is entirely reactive rather than proactive

Do not make this section hostile or condescending.

It should filter poor-fit prospects while reinforcing Hudson Helm's operating philosophy.

## Remove Redundancy

Remove the existing standalone **We May Be A Good Fit If...** section if it merely repeats the same message.

Replace the end of the page with a concise CTA to Start Here.

## Layout

Break apart the existing giant blue article-style content block.

Use headings, spacing, and lighter sections to make the page easier to scan.

Target approximately two laptop screens if practical.

---

# Start Here Page

This should remain a simple contact/conversion page.

Do not pad it with unrelated sales content.

## Layout

Preserve the current two-column desktop concept:

- Left: contact information/context
- Right: contact form

Ensure it stacks naturally on mobile.

## Locality

Remove **Office Address / Address coming soon**.

Replace with:

**Serving New Jersey & New York**

## Form Fields

Use:

- Name
- Company
- Email
- Phone (optional)
- How can we help?

Remove the user-editable Subject field.

## Email Delivery

Send all website inquiries to:

`info@hudsonhelm.com`

The address is intentionally an alias and should be used rather than a person-specific address.

Use Migadu SMTP.

Do not use PHP `mail()` or equivalent generic web-server mail delivery if a proper authenticated SMTP implementation is available.

Inspect the existing server environment and use an appropriate, maintainable SMTP implementation.

## Generated Subject

Generate the subject automatically:

`[WEBSITE LEAD] Website Info Request from <Company Name>`

Sanitize the Company value before placing it in any mail header.

Protect against email-header injection.

## Priority

Mark website lead messages high priority using appropriate headers such as:

```text
Importance: High
X-Priority: 1
X-MSMail-Priority: High
```

Keep the `[WEBSITE LEAD]` subject prefix even if priority headers are used.

## Form Validation

Require Name, Company, Email, and Message. Phone is optional.

Validate email formatting.

Provide clear accessible validation messages.

## Submission Experience

Implement:

- Useful sending state
- Success/thank-you confirmation
- Useful failure state
- Protection against accidental duplicate submissions

Do not silently fail.

## Response Expectation

Add a short response-time expectation beneath the introduction.

Do not invent a commitment that Hudson Helm has not approved.

If the exact response window is not known, flag it for user confirmation rather than publishing an unsupported promise.

## Spam Protection

Implement Cloudflare Turnstile.

Use Managed mode.

Turnstile token **must be validated server-side** before sending an email.

Client-side widget completion alone is insufficient.

Store the Turnstile secret securely.

Do not expose secrets in HTML, client-side JavaScript, or public source control.

Add a hidden honeypot field as an additional lightweight bot filter.

Normal visitors should never interact with the honeypot.

## Security

Sanitize and validate all user-supplied data.

Never expose SMTP credentials in public source files.

Use configuration/environment handling appropriate to the hosting environment.

---

# Support / Client Portal Page

The existing Support navigation item currently goes nowhere.

Create a convincing Hudson Helm **Client Support Portal** shell.

This is intentionally a front-end placeholder for a future ticketing system.

## Appearance

The page should look like a real client login portal.

Do **not** display:

- Coming Soon
- Under Construction
- Placeholder
- Ticketing system not available

Keep the design clean, professional, and consistent with Hudson Helm.

## Login Fields

- Username
- Password
- Sign In

## Temporary Login Behavior

No entered username or password may ever leave the user's browser.

Do not POST, email, log, store, persist, put into browser storage/cookies, or send credentials to analytics.

The form must not have a fallback path that submits credentials if JavaScript fails.

Intercept the login locally.

## Turnstile

Include Cloudflare Turnstile now.

Use Managed mode.

Turnstile should be part of the apparent login workflow.

Validate the Turnstile token server-side.

The request to the validation endpoint may contain the Turnstile token and required verification metadata, but **must not contain the username or password**.

## Placeholder Login Flow

1. Visitor enters username/password.
2. Visitor satisfies Turnstile if challenged.
3. Server verifies only the Turnstile token.
4. Browser receives successful Turnstile validation.
5. Browser locally rejects the login.
6. Display: **Invalid username or password.**
7. Clear the password field.

Every login attempt receives the same generic authentication error.

Do not reveal whether any username exists.

## Supporting Text

Include discreet text:

**Client portal access is provided to active Hudson Helm customers.**

## Do Not Implement Yet

- Forgot Password
- Registration
- Password reset
- Ticket creation
- Real user accounts
- Fake user accounts

Do not build dead-end fake workflows.

Build the page so the visual frontend and Turnstile integration can later be reused when real ticketing/authentication is introduced.

## Future Real Authentication

When a real backend is eventually implemented, it should include appropriate:

- Rate limiting/throttling
- Secure sessions
- CSRF protection
- Account abuse/lockout protection
- MFA if supported

---

# Global Footer — Complete Redesign

The current footer is a placeholder and is not considered acceptable.

Do not preserve its structure merely because it already exists.

Create a cleaner, simpler global footer consistent with the redesigned pages.

## Recommended Content Structure

### Brand Area

- Hudson Helm logo
- Very short company positioning statement if useful
- **Serving New Jersey & New York**

### Navigation Area

Useful primary navigation links only.

Do not duplicate every possible site link simply to fill space.

### Contact / Action Area

- `info@hudsonhelm.com`
- New NJ business phone number once provided
- Start Here
- Support

### Bottom Legal Row

- Copyright
- Exact legal company name where appropriate
- Privacy Policy

## Do Not Add

- Empty social-media icons
- Newsletter signup
- Fake office address
- Partner badges
- Excessive vendor logos
- Huge lists of links

---

# Locality / Business Identity

Update public geographic language from **Northern New Jersey & NYC** to **New Jersey & New York**.

Preferred concise wording:

**Serving New Jersey & New York**

## Phone Number

The existing 954 phone number is temporary.

The user intends to convert an unused second mobile line to a New Jersey area-code number.

Do not invent a phone number.

When the new number is supplied, replace the old number everywhere:

- Header
- Footer
- Start Here
- `tel:` links
- Structured data
- Metadata
- Any hidden/template references

## Legal Status

Hudson Helm is now:

- A New Jersey LLC
- Registered/authorized to conduct business in New York

Do not invent the exact legal entity name.

If the registered legal name is required for footer/privacy/legal language, request confirmation from the user.

---

# Privacy Policy — New Page

Create a dedicated **Privacy Policy** page.

Link it from the global footer.

Do not add it to primary navigation.

## Important

The policy must describe the site's **real practices**.

Do not dump generic legal boilerplate onto the page containing claims that are not true.

## Address As Applicable

- Information collected through Start Here
- Name
- Company
- Email
- Optional phone
- Message content
- Why that information is collected
- How inquiries are handled
- Migadu as an email/service provider where applicable
- Cloudflare / Turnstile processing
- Normal security/server logging
- Cookies, only if actually used
- Analytics, only if actually used
- Data retention
- Information security
- Service providers
- Whether information is sold/shared
- How someone may contact Hudson Helm regarding privacy

Inspect the actual completed site and third-party integrations before finalizing the policy.

Add an appropriate effective date.

---

# Custom 404 Page

Create a custom Hudson Helm 404 page.

Requirements:

- Same header/navigation as site
- Same visual branding
- Clearly state that the requested page could not be found
- Obvious path back to Home
- Optionally link to What We Do and Start Here
- Simple and professional

Do not expose a generic hosting/server 404 page for normal missing routes.

---

# Social Proof / Customer Endorsements

**Approved future enhancement.**

Hudson Helm has genuine customer quotes/endorsements available.

Do not fabricate testimonials.

This enhancement should **not block the initial refresh**.

## Planned Locations

### Home

One particularly strong endorsement, positioned after the concise Why Hudson Helm teaser and before the final page transition/footer.

### Why Hudson Helm

Approximately 2–3 endorsements between the differentiator/trust content and the final CTA.

## Attribution

Use only the level of identification authorized by the customer:

- Full name + company
- First name + company
- Name + industry
- Anonymous industry description

Do not imply authorization that has not been given.

## Case Studies

Long-form case studies may be added later but are not required for this project.

---

# Final Technical / SEO / Accessibility QA

After page/content implementation is complete, perform a dedicated QA phase.

Do not treat this as optional cleanup.

## SEO / Discovery

Review and implement as appropriate:

- Unique title for every page
- Unique meta description
- Canonical URLs
- `sitemap.xml`
- `robots.txt`
- Open Graph metadata
- Social-sharing image metadata
- Appropriate structured data/schema for Hudson Helm and its services

Do not stuff keywords.

Use natural NJ/NY geographic relevance.

## Heading Structure

Verify logical H1/H2/H3 structure.

Each page should have a sensible primary H1.

Do not use headings merely for visual formatting.

## Accessibility

Verify:

- Descriptive image alt text
- Decorative images handled appropriately
- Proper form labels
- Keyboard navigation
- Visible keyboard focus
- Accessible menus
- Appropriate contrast
- Accessible validation messages
- Accessible form success/error states
- Sensible screen-reader behavior
- Buttons and links have meaningful names

## Responsive QA

Test at several realistic widths including approximately:

- 1440px desktop
- 1366px laptop
- Tablet
- ~390px phone

Pay particular attention to:

- Header/nav
- New 7-item navigation
- Heroes
- Service-card grids
- What We Do jump navigation
- Alternating service sections
- Who We Are profiles
- Contact form
- Support login
- Footer

## Technical Integrity

Scan for:

- Broken internal links
- Dead external links
- Missing assets
- 404 images
- Incorrect paths
- Duplicate IDs
- Invalid HTML
- Console errors
- Mixed-content problems
- Obsolete template references
- Dead template scripts/styles
- Old phone-number references
- Old locality references
- Old carousel code after carousel removal

Verify favicon/site icons and HTTPS behavior.

## Performance

Review:

- Image dimensions
- Compression
- Modern image formats where practical
- Oversized source assets
- Unnecessary JavaScript
- Unnecessary CSS
- Duplicate libraries
- Render-blocking resources where realistically fixable

Do not destroy image quality just to chase an arbitrary benchmark.

## Security

Verify:

- No SMTP secrets client-side
- No Turnstile secrets client-side
- No credentials committed to Git
- Form inputs sanitized
- Email headers protected against injection
- Support username/password values never leave browser
- No sensitive data written to logs unnecessarily

## Final Regression Pass

After fixing QA findings, run the complete QA pass again.

Make sure fixing one page did not regress another.

---

# Implementation Order

The Phase Progress table near the top of this document is the status summary. The checklists below are the execution record for Phases 1–11. Phase 0 uses the more detailed **Phase 0 Working Checklist** near the top and must satisfy it before Phase 1 begins.

## Shared Definition of Done — Applies to Every Implementation Phase

A phase may be marked complete only when all applicable criteria below are satisfied. These are reusable criteria, not one-time project checkboxes; each phase has its own final checklist item confirming that this definition was satisfied.

- Every phase-specific checklist item is completed or explicitly resolved as `BLOCKED`, `DEFERRED`, or `N/A` with a reason.
- The relevant requirements sections were reviewed before and after implementation, and no unintended scope changes remain.
- A local or safe staging preview was performed for affected pages/features where applicable.
- Relevant functional, responsive, accessibility, security, and console checks were performed at the level appropriate to the phase.
- The Git diff was reviewed for unintended changes, generated junk, accidental deletions, and unrelated formatting churn.
- Relevant findings, decisions, blockers, and checklist states were updated in this master document.
- Work was organized into a logical Git commit or commits where appropriate.
- The working branch was pushed when appropriate so GitHub remains a current backup.
- No production deployment occurred without explicit user approval.

Passing this shared checklist does not replace the dedicated Phase 10 QA or Phase 11 regression pass.

## Phase 0 — Repository / Safety

Use the canonical **Phase 0 Working Checklist** near the top of this document. Do not duplicate or restart completed repository setup. Phase 0 is complete only when that checklist and the Technical Runbook requirements are satisfied.

## Phase 1 — Shared Structure

- [x] Clean up shared CSS deliberately, preserving required legacy behavior and avoiding unrelated formatting churn — added a final shared site layer while retaining page-specific rules for their assigned phases.
- [x] Establish or normalize the shared header/navigation implementation — normalized all six root pages with consistent contact details, ordering, active state, mobile Start Here access, and accessibility labels.
- [x] Establish global spacing conventions — added shared section-spacing tokens and compact/default utilities without changing Phase 2 page spacing.
- [x] Establish reusable components/patterns for later page work — established shared header, navigation, focus, responsive and minimal-footer patterns in `css/hudson-helm.css`.
- [x] Confirm the seven-item primary navigation remains comfortable at common desktop widths and collapses cleanly on mobile — verified at 1440px, 1366px, 1024px, and 390px with no horizontal overflow.
- [x] Satisfy the Shared Definition of Done for this phase — structural, responsive, accessibility, console, diff and preview checks completed; site commit `5f42c02` published with explicit user approval and verified remotely/publicly; documentation recorded separately; GitHub push explicitly pending user direction.

## Phase 2 — Homepage

- [ ] Replace the rotating hero with the approved static first-slide hero.
- [ ] Apply the approved service-card content changes without adding cards or card buttons.
- [ ] Reduce excessive Hero → service cards and service cards → Why Hudson Helm spacing.
- [ ] Implement the concise Why Hudson Helm teaser and path to the full page.
- [ ] Remove obsolete carousel controls/code from the homepage as appropriate without breaking shared dependencies needed elsewhere.
- [ ] Satisfy the Shared Definition of Done for this phase.

## Phase 3 — What We Do

- [ ] Move the approved introduction section into the page-hero position.
- [ ] Implement the eight-card in-page jump navigation.
- [ ] Implement one substantive detailed section for each approved service category.
- [ ] Merge overlapping legacy service categories as specified.
- [ ] Remove redundant Core Services navigation and unnecessary Learn More buttons.
- [ ] Confirm the final page flow matches the approved specification.
- [ ] Satisfy the Shared Definition of Done for this phase.

## Phase 4 — Why Hudson Helm

- [ ] Preserve the approved hero, core messaging, differentiator cards, and trust statement.
- [ ] Compress the secondary section into the approved lighter treatment.
- [ ] Remove the redundant second large stock photograph.
- [ ] Reduce excessive page length and whitespace without deleting useful messaging.
- [ ] Reduce unnecessary eyebrow-label repetition.
- [ ] Preserve the approved closing CTA concept.
- [ ] Satisfy the Shared Definition of Done for this phase.

## Phase 5 — Who We Are

- [ ] Create the dedicated Who We Are page structure.
- [ ] Add Who We Are to primary navigation in the approved position.
- [ ] Build profile treatment that accurately supports employees and consultants/contractors without misrepresenting roles.
- [ ] Integrate real photos, names, roles, and approved biographies when supplied; otherwise record the affected content as blocked without inventing placeholders for publication.
- [ ] Verify desktop and mobile navigation/layout behavior after adding the page.
- [ ] Satisfy the Shared Definition of Done for this phase.

## Phase 6 — Are We a Good Fit?

- [ ] Replace the oversized opening image treatment with the approved compact text + image hero.
- [ ] Convert fit criteria into a scannable treatment using the approved concepts.
- [ ] Preserve the **When The Fit Is Especially Strong** heading and relevant messaging.
- [ ] Add the short, non-hostile **We May Not Be The Right Fit If...** section.
- [ ] Remove redundant fit messaging and break apart the giant article-style block.
- [ ] End with a concise Start Here CTA and target the approved overall page length where practical.
- [ ] Satisfy the Shared Definition of Done for this phase.

## Phase 7 — Start Here

- [ ] Preserve the approved two-column desktop layout and natural mobile stacking.
- [ ] Update locality language to **Serving New Jersey & New York** and remove the placeholder office address.
- [ ] Implement the approved fields and remove the user-editable Subject field.
- [ ] Implement authenticated Migadu SMTP delivery to `info@hudsonhelm.com`.
- [ ] Implement the generated subject and protect against email-header injection.
- [ ] Apply the approved high-priority mail headers.
- [ ] Implement required validation, accessible messages, sending/success/failure states, and duplicate-submission protection.
- [ ] Add the response-time expectation only after the user supplies an approved commitment.
- [ ] Implement Cloudflare Turnstile Managed mode with server-side token validation.
- [ ] Implement the hidden honeypot and required input sanitization/security handling.
- [ ] Satisfy the Shared Definition of Done for this phase.

## Phase 8 — Support Portal Shell

- [ ] Build the approved Hudson Helm client-support login shell and supporting text.
- [ ] Ensure username/password values never leave the browser and have no fallback submission path.
- [ ] Implement Turnstile Managed mode and server-side verification of the Turnstile token only.
- [ ] Implement the specified local generic authentication-failure behavior and password clearing.
- [ ] Do not implement real/fake accounts, registration, password reset, ticket creation, or other prohibited dead-end workflows.
- [ ] Structure the frontend/Turnstile integration so it can be reused with future real authentication.
- [ ] Satisfy the Shared Definition of Done for this phase.

## Phase 9 — Global Completion

- [ ] Redesign the global footer using the approved brand/navigation/contact/legal structure.
- [ ] Apply approved locality language consistently.
- [ ] Replace the temporary phone number everywhere only after the new number is supplied.
- [ ] Create the Privacy Policy from the site's actual completed practices and integrations.
- [ ] Create the custom Hudson Helm 404 page.
- [ ] Confirm global navigation/footer consistency across all public pages.
- [ ] Satisfy the Shared Definition of Done for this phase.

## Phase 10 — QA

- [ ] Review and correct page titles, meta descriptions, canonical URLs, sitemap, robots, Open Graph/social metadata, and appropriate structured data.
- [ ] Verify logical heading structure.
- [ ] Complete the specified accessibility checks.
- [ ] Complete responsive QA at the specified desktop, laptop, tablet, and phone widths.
- [ ] Scan for broken links, missing assets, duplicate IDs, invalid HTML, console errors, mixed content, obsolete template references, and stale phone/locality/carousel remnants.
- [ ] Review image sizing/compression, unnecessary JavaScript/CSS, duplicate libraries, and realistically fixable render-blocking resources.
- [ ] Complete the specified security verification.
- [ ] Record and fix QA findings.
- [ ] Satisfy the Shared Definition of Done for this phase.

## Phase 11 — Regression / Review

- [ ] Run the complete QA pass again after fixes.
- [ ] Confirm fixes did not regress other pages or shared behavior.
- [ ] Confirm the Git working tree and history are clean and intentional.
- [ ] Push the completed `website-refresh` branch.
- [ ] Confirm the master document accurately reflects final branch state, decisions, and any deferred items.
- [ ] Present the finished local/staging site for user review.
- [ ] Do not deploy production until explicitly approved.
- [ ] Satisfy the Shared Definition of Done for this phase.

---

# Handling Missing Inputs

The canonical list of unresolved user inputs, blockers, and deferred decisions is **Open Questions, Inputs, and Deferred Decisions** near the top of this document. Update that register rather than creating a second list here.

Do not invent missing inputs. If a missing input blocks only one feature, mark that feature appropriately and continue with other non-blocked work.

---

# Copy / Voice Guidance

Hudson Helm copy should sound like knowledgeable people speaking plainly to small-business owners.

Good:

- Straightforward
- Practical
- Dependable
- Responsive
- Security-minded
- Clear
- Human

Avoid:

- "Digital transformation journey"
- "Best-in-class"
- "World-class"
- "Cutting-edge"
- "Revolutionary"
- "Synergy"
- Fear-heavy cybersecurity marketing
- Excessive acronyms
- Enterprise jargon
- Generic AI-sounding prose

Do not rewrite strong existing copy just to make changes.

In particular, preserve strong phrases already identified during review.

---

# Final Principle

The finished site should feel like Hudson Helm knows exactly what it is.

It is not trying to imitate a 500-person MSP.

It is a deliberately small, experienced IT provider offering responsive, security-minded support to small businesses across New Jersey and New York.

The site should communicate that confidently, simply, and without clutter.

When faced with a choice between adding another element and making the existing message clearer, choose clarity.
