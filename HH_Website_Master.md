# Hudson Helm Website Refresh
## Master Project Document

This is the authoritative living document for the Hudson Helm website refresh. It combines the approved implementation brief with the current project record, decisions, findings, progress, and unresolved items.

## Document Control

| Field | Value |
| --- | --- |
| Document | `HH_Website_Master.md` |
| Last updated | September 11, 2026 |
| Current phase | Phase 8 — Support Portal Shell |
| Phase status | **Phase 7 complete, published, pushed, and operational; Phase 8 not started** |
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

Phase 7 is complete, pushed, published, and operational. Preserve its compact form-first layout, protected production configuration, server-side Turnstile verification, and authenticated Migadu delivery. Await explicit direction before beginning Phase 8; do not expose production credentials or weaken the fail-closed configuration path.

The completed Phase 1 and Phase 2 implementation may be reviewed locally or on production; this does not reopen or invalidate the completed Phase 0, Phase 1, or Phase 2 checklists.

### Checklist Status Conventions

- `[ ]` — Not yet completed.
- `[x]` — Completed and verified.
- `BLOCKED — <reason>` — Cannot proceed until a specific dependency or user input is available.
- `DEFERRED — <reason>` — Intentionally postponed; state where or when it will be handled.
- `N/A — <reason>` — Evaluated and determined not to apply.

When marking a substantial inspection or implementation item complete, record enough evidence in Findings, the Activity Log, or the relevant checklist note to show what was verified. Do not create verbose notes for trivial steps.

## Current Project Status

Phases 1–7 are complete, pushed, published, and verified. The compact Start Here implementation provides the approved wider form-first layout, inline one-business-day response commitment, shorter message field, visually hidden status output, accessible client states, a honeypot, server-verified Turnstile, authenticated Migadu delivery, PHPMailer 7.1.0, generated priority subjects, and input/header hardening. Its current action row places the blue **Submit** action matching the header Start Here CTA at left, Turnstile immediately to its right with a deliberate gap, and the orange direct-email action at right; no logo occupies the row, and the service-area line is centered below. Production PHP 8.2.33 with cURL, OpenSSL, filter, and JSON is confirmed. Real credentials are stored only in a local source file outside the repository and a guarded untracked production file; Cloudflare accepted the production Turnstile secret, Migadu accepted a clearly labeled SMTP delivery test, and public checks confirmed the real widget configuration without exposing secrets. Support remains the only temporary missing destination.

### Phase Progress

| Phase | Name | Status |
| --- | --- | --- |
| 0 | Repository / Safety | Complete; documented runtime deferral |
| 1 | Shared Structure | Complete, published, and pushed |
| 2 | Homepage | Complete, published, and pushed; user review pending |
| 3 | What We Do | Complete, published, and pushed; user review pending |
| 4 | Why Hudson Helm | Complete, published, and pushed; user review pending |
| 5 | Who We Are | Complete, published, and pushed; user review pending |
| 6 | Are We a Good Fit? | Complete, published, and pushed; user review pending |
| 7 | Start Here | Complete, operational, published, and pushed |
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
| 2026-09-10 | Completed Phase 2 homepage implementation and local validation. | Replaced the three-slide Revolution hero with a static semantic hero retaining the approved first-slide assets, updated the two specified service cards, tightened section transitions, implemented a compact four-point Why Hudson Helm teaser, removed homepage-only carousel and Rough Notation dependencies, and passed structural, responsive, accessibility, console, syntax, and diff checks. No production deployment or GitHub push occurred. |
| 2026-09-10 | Pushed the completed Phase 1 and Phase 2 implementation and published the Phase 2 homepage. | Pushed `website-refresh` through site commit `eb72ad0`, uploaded only deployable `index.html` through the saved WinSCP production FTP session, confirmed the remote file at 18,033 bytes, and verified the public HTTPS homepage returned 200 with Phase 2 markers present and Revolution markup absent. Project-only files were not deployed. |
| 2026-09-10 | Completed Phase 3 What We Do implementation and local validation. | Rebuilt the page into the approved hero, eight jump cards, eight detailed service sections, and one final CTA; merged the legacy taxonomy; removed redundant tabs, buttons, and page-specific Rough Notation/Owl dependencies; and passed structural, responsive, keyboard, asset, console, syntax, and diff checks. Publication was explicitly authorized and remained pending at this checkpoint. |
| 2026-09-10 | Pushed and published the completed Phase 3 What We Do page. | Pushed site commit `140d6e3` to `origin/website-refresh`, uploaded only `whatwedo.html` through the saved WinSCP production FTP session, confirmed the remote file at 30,161 bytes, and verified a cache-busted public HTTPS 200 response contained the hero, eight jump cards, eight detail sections, Strategic IT Guidance, and final CTA while the old Core Services and Rough Notation markup were absent. |
| 2026-09-10 | Completed Phase 4 Why Hudson Helm implementation and local validation. | Preserved the approved hero, core messaging, four differentiators, trust statement, and closing CTA; replaced the second image-heavy section with a compact light three-column treatment; reduced whitespace and eyebrow repetition; removed page-specific Rough Notation/Owl dependencies; and passed structural, responsive, accessibility, console, syntax, regression, and diff checks. GitHub push and production publication were explicitly authorized and remained pending at this checkpoint. |
| 2026-09-10 | Pushed and published the completed Phase 4 Why Hudson Helm page. | Pushed site commit `16fabd6` to `origin/website-refresh`, uploaded only `whyhudsonhelm.html` through the saved WinSCP production FTP session, confirmed the remote file at 34,874 bytes, and verified a cache-busted public HTTPS 200 response contained the complete Phase 4 structure while the second stock image and obsolete Rough Notation/Owl references were absent. |
| 2026-09-10 | Completed Phase 5 Who We Are implementation and local validation. | Created the dedicated page with Nelson Abreu as Technical Director and founder/company lead, added three explicitly labeled temporary supporting profiles in one desktop row, reused one stock portrait with responsive crops as directed, resolved the Who We Are pending navigation state across all root pages, and passed structural, responsive, accessibility, console, asset, syntax, regression, and diff checks. GitHub push and production publication were explicitly authorized and remained pending at this checkpoint. |
| 2026-09-10 | Pushed and published the completed Phase 5 Who We Are page and navigation resolution. | Pushed site commit `d6fb5ed` to `origin/website-refresh`; uploaded `whoweare.html` plus the six existing root HTML pages whose Who We Are pending marker changed; confirmed all seven remote file stats; and verified cache-busted public HTTPS 200 responses, live Phase 5 content, four shared-photo uses, the resolved Who We Are destination, and the still-explicit Support pending state. |
| 2026-09-10 | Completed Phase 6 Are We a Good Fit? implementation and local validation. | Replaced the oversized blog layout with a compact split hero, six scannable fit criteria, four tactful not-fit criteria, and one concise Start Here CTA. Responsive, navigation, accessibility-structure, console, asset, syntax, regression, and diff checks passed. The user explicitly authorized the commit, GitHub push, and production publication; those steps remained pending at this checkpoint. |
| 2026-09-10 | Pushed and published the completed Phase 6 Are We a Good Fit? page. | Pushed site commit `d5b8f10` to `origin/website-refresh`, uploaded only `areweagoodfit.html` through the saved WinSCP production FTP session, confirmed the remote file at 28,721 bytes, and verified a cache-busted public HTTPS 200 response contained the full Phase 6 structure while the old blog wrapper and redundant good-fit block were absent. |
| 2026-09-10 | Implemented and locally validated Phase 7 Start Here through the production-configuration boundary. | Rebuilt the accessible responsive form, upgraded to PHPMailer 7.1.0, added fail-closed private configuration, generated priority subjects, server-side Turnstile, security controls, deterministic integration tests, and Firefox responsive checks. Production PHP 8.2.33 and required extensions were verified; real Migadu and Turnstile values remain required before operational activation. |
| 2026-09-10 | Pushed and published Phase 7 in the user-approved fail-closed placeholder state. | Pushed site commit `8abd519` to `origin/website-refresh`; synchronized the exact production `/PHPMailer` directory to 7.1.0, removing obsolete 5.2 files; and uploaded `starthere.html`, `mail.php`, `form-config.php`, `includes/contact-config.php`, and `js/start-here.js`. Cache-busted HTTPS checks confirmed the new page and response copy, PHPMailer 7.1.0, a no-store JSON 503 from the placeholder configuration endpoint, GET rejection on `mail.php`, 404 protection for direct config-loader access, and removal of the legacy PHPMailer entry point. |
| 2026-09-10 | Implemented and locally validated the requested Phase 7 Start Here design revision. | Removed the redundant standalone contact card, moved the webform into one centered primary card, applied the supplied introduction, retained the response-time callout and all fields, moved service area and linked direct-contact alternatives below the form, tightened mobile spacing, and offset the narrow-screen back-to-top control. Phase 1–7 checks, the full Phase 7 behavioral integration suite, and browser checks at 1366px, 1024px, and an actual 390px Firefox viewport passed; publication remained pending at this checkpoint. |
| 2026-09-10 | Pushed and published the Phase 7 Start Here design revision. | Pushed site commit `59b2480` to `origin/website-refresh`, uploaded only `starthere.html`, and confirmed the remote file at 28,657 bytes. Cache-busted HTTPS returned 200 with the exact revised introduction, response note, one workflow and H1, compact direct-contact content, and no old heading or split columns; the placeholder configuration remained fail-closed at 503. A second cached live Firefox render at 390px confirmed the complete heading and unobstructed mobile layout. |
| 2026-09-10 | Implemented and locally validated the compact Start Here follow-up and production credential path. | Widened the desktop card, reduced outer/card/field spacing, folded the response commitment into the introduction, shortened the message field, moved Turnstile status copy offscreen while retaining assistive output, renamed and restyled the orange **Submit** button, collapsed unavailable-widget space, and tightened the form-to-footer transition. With an actual test-widget footprint, the full form and Submit action fit at 1366×768 while only secondary contact/footer content remained below; 390px remained readable and unobstructed. The user supplied real Turnstile and Migadu values, which were stored locally outside the active repository; publication and live verification remained pending at this checkpoint. |
| 2026-09-10 | Published the compact Start Here follow-up and activated the production form. | Pushed site commit `4b5959c`; uploaded the guarded server rule, config loader, untracked production-only credential file, form JavaScript, and Start Here page. Public HTTPS checks confirmed the compact page, orange **Submit** action, real widget configuration, protected credential file returning 403, and no client-visible SMTP or Turnstile secret. Cloudflare Siteverify accepted the production secret, Migadu accepted a clearly labeled SMTP delivery test to `info@hudsonhelm.com`, and the tracked diff remained free of supplied credential values. |
| 2026-09-10 | Implemented the final Phase 7 action-row and response-copy refinement. | Replaced the lower-right email/phone text with a matching orange email button, centered the Hudson Helm logo between the Submit and email actions, changed the successful-send copy to **Thanks, your request has been sent.** We'll be back with you soon., and centered the revised greater New Jersey / New York / Philadelphia metropolitan-area line. Desktop and narrow responsive renders, the Phase 7 structural check, JavaScript syntax, and the full PHP/Turnstile/SMTP-sink integration suite passed before publication. |
| 2026-09-10 | Pushed and published the final Phase 7 action-row and copy refinement. | Pushed site commit `3e69fd9`, then uploaded only `mail.php`, `js/start-here.js`, and `starthere.html`. Remote stats confirmed all three files; cache-busted HTTPS checks returned 200 and confirmed the direct-email prompt/action, centered logo, centered revised service-area line, retired-copy removal, both success-response sentences, and a nonempty public Turnstile site key with no secret/SMTP fields. A production browser render confirmed the balanced desktop action row. |
| 2026-09-10 | Refined the Start Here action emphasis and email prompt. | Increased only the Submit button to a 136px minimum width, approximately one-third wider than its prior rendered size, and set both orange action labels to matching 17px bold text. The direct-email prompt is now left-aligned to its button, increased to 16px, and separated from the button by 10px. The email button width and three-part alignment remain unchanged. |
| 2026-09-10 | Pushed and published the final button-emphasis refinements. | Pushed commits `cc0c658`, `b873339`, and `d26a4bc`; uploaded the final `starthere.html` after the combined changes. Remote stat confirmed the file, and a cache-busted HTTPS 200 response confirmed the 136px Submit width, matching 17px bold labels on both orange actions, and the left-aligned 16px email prompt with 10px separation above its button. |
| 2026-09-11 | Reworked the Start Here action row following live review. | Removed the centered action-row logo, moved the real Turnstile widget into the row immediately to the right of Submit with a 24px gap, eliminated its separate 68px reserved row, and increased the left-aligned direct-email prompt from 16px to 18px while retaining 10px separation above its button. Publication and live verification remained pending at this checkpoint. |
| 2026-09-11 | Pushed and published the compact Start Here action-row correction. | Pushed site commit `71e4b16` and uploaded only `starthere.html`. Remote stat confirmed the file at 31,896 bytes; a cache-busted HTTPS 200 response confirmed the removed action logo, Submit → Turnstile → email source order, 24px Submit/widget gap, 4px action-row top margin, removal of the 68px widget reservation, and 18px prompt with retained button spacing. A production render confirmed the excess vertical gap was removed. |
| 2026-09-11 | Matched the form Submit color to the header Start Here CTA. | Replaced only Submit's orange treatment with the header CTA's blue `#4a8fdc` to `#2d6fb8` gradient, matching blue shadow, and coordinated `#5a9ae2` to `#347ac6` hover/focus gradient. The direct-email action remains orange. Publication and live verification remained pending at this checkpoint. |
| 2026-09-11 | Pushed and published the header-matched Submit treatment. | Pushed site commit `e7109cc`, uploaded only `starthere.html`, and confirmed the remote file at 32,636 bytes. A cache-busted HTTPS 200 response verified the blue Submit gradient, blue shadow, coordinated hover/focus gradient, dedicated Submit class, and unchanged orange email action. |

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

### Phase 2 implementation evidence — September 10, 2026

- The homepage Revolution Slider markup was replaced with one semantic static hero containing a single H1. It retains the first slide's `rev/assets/2-2.jpg` circuit backdrop and `rev/assets/bg-1.jpg` meeting photograph, preserves the approved heading and description, removes the hero button, and uses a restrained 540px desktop height.
- The services area remains an eight-card layout with equal weighting and no card buttons. Support was renamed Cloud & Email with the approved description, and the Network & Wi-Fi description now uses the approved wording.
- Homepage-specific spacing was reduced to 72/64px desktop transitions and 52px mobile transitions. The Why Hudson Helm section is now a lighter four-point teaser with one clear link to `whyhudsonhelm.html`.
- Homepage references to Revolution Slider, Owl Carousel, and Rough Notation styles/scripts were removed after confirming that the new homepage markup does not require them. Shared assets and dependencies used by other pages were retained.
- Browser checks at 1440px, 1366px, 1024px, and 390px found no horizontal overflow. The static hero image loaded at every tested layout; the navigation remained expanded at desktop/laptop widths and collapsed correctly at 1024px and 390px. The 390px expanded menu retained all seven destinations.
- Browser console review returned no warnings or errors. `node tools/check-phase2.cjs`, `node tools/check-phase1.cjs`, the inspection helper, JavaScript syntax checks, and `git diff --check` passed. The inspection helper confirmed one H1, the intended heading hierarchy, no duplicate IDs, and only the two previously authorized pending routes.
- With the user's explicit approval, `website-refresh` was pushed to GitHub through site commit `eb72ad0`. Only `index.html` was then uploaded to production through the saved WinSCP FTP session; the remote stat reported 18,033 bytes. A cache-busted public HTTPS request returned 200 and confirmed the static hero, Cloud & Email card, and Why Hudson Helm teaser were present while Revolution markup was absent. Project-only documentation and tools were not deployed.

### Phase 3 implementation evidence — September 10, 2026

- `whatwedo.html` now begins with the approved **Dependable IT Without Enterprise-Level Overhead** introduction as its semantic single-H1 hero and retains `images/benefits/1.jpg`.
- One eight-card grid provides descriptive in-page links to Managed IT Services, Responsive Support, Cloud & Email, Cybersecurity, Backup & Recovery, Network & Wi-Fi, Projects & Consulting, and Strategic IT Guidance. Every target is programmatically focusable and uses sticky-header scroll clearance.
- Eight substantive sections use concise explanatory copy, four practical bullets, relevant retained imagery with descriptive alt text, lazy loading, and alternating desktop image placement. End-User Support and Help Desk were folded into Responsive Support; Microsoft 365 was folded into Cloud & Email; Vendor Coordination was incorporated where relevant; and Cybersecurity and Backup & Recovery are separate.
- The four-tab Core Services block, repeated service-detail buttons, empty headings, generic image alt text, and page-specific Rough Notation and Owl Carousel references were removed. One final Start Here CTA remains after the detailed sections.
- Browser checks at 1440px, 1366px, 1024px, and 390px found no horizontal overflow. Navigation remained expanded at desktop/laptop widths and collapsed correctly at tablet/phone widths, where all seven destinations were exposed. A jump-link check reached `#strategic-it-guidance`, focused the target, and placed it below the sticky header. All images loaded, the service-card keyboard focus ring was visible, and the console returned no warnings or errors.
- `node tools/check-phase3.cjs`, Phase 1 and Phase 2 checks, the inspection helper, JavaScript syntax checks, and `git diff --check` passed. The dedicated Phase 3 check verifies the exact taxonomy and cardinality, jump targets, detail sections, single-H1 structure, CTA count, merged-category removal, and obsolete dependency removal.
- With the user's explicit approval, site commit `140d6e3` was pushed to `origin/website-refresh`. Only `whatwedo.html` was uploaded through the saved WinSCP production FTP session; remote `stat` reported 30,161 bytes. A cache-busted public HTTPS request returned 200 and confirmed all Phase 3 markers while the obsolete Core Services and Rough Notation markers were absent. Project-only documentation and tools were not deployed.

### Phase 4 implementation evidence — September 10, 2026

- `whyhudsonhelm.html` now follows Hero → four differentiator cards → trust statement → light three-column principles → closing Start Here CTA. The approved hero image and core copy remain intact, and the second large `images/tabs/4.jpg` stock photograph was removed.
- All repeated eyebrow-label markup was removed from the page. The trust statement is a dedicated high-emphasis section, while Direct Communication, A Cleaner, Calmer IT Environment, and Advice With Your Budget In Mind use a compact light treatment without losing their supporting copy.
- Page-specific Rough Notation and Owl Carousel references were removed, and the page now uses the existing local jQuery file instead of the older Google-hosted copy. The page has one semantic H1, logical H2/H3 hierarchy, no duplicate IDs, and no missing assets beyond the two previously authorized pending routes.
- Browser checks at 1440px and 1366px showed full navigation and no horizontal overflow; 1024px and 390px collapsed cleanly, and the expanded phone menu exposed all seven destinations. The 1366px document height was reduced to 3,334px, versus the prior approximately five-screen composition. Card contrast and the full-page visual hierarchy were inspected, and the browser console returned no warnings or errors.
- `node tools/check-phase4.cjs`, Phase 1–3 checks, the inspection helper, JavaScript syntax checks, and `git diff --check` passed. The dedicated Phase 4 check verifies preserved copy and cardinality, semantic structure, the compact principles treatment, closing CTA, and removal of the second image plus obsolete page dependencies.
- With the user's explicit approval, site commit `16fabd6` was pushed to `origin/website-refresh`. Only `whyhudsonhelm.html` was uploaded through the saved WinSCP production FTP session; remote `stat` reported 34,874 bytes. A cache-busted public HTTPS request returned 200 and confirmed the hero, four differentiators, trust statement, three compact principles, and closing CTA while the removed second image and obsolete Rough Notation/Owl markers were absent. Project-only documentation and tools were not deployed.

### Phase 5 implementation evidence — September 10, 2026

- `whoweare.html` now follows Hero → visible temporary-content notice → large Nelson Abreu lead profile → three smaller supporting profiles → light three-column positioning section → closing Start Here CTA. Nelson is accurately identified as Technical Director and founder/company lead.
- At the user's direction, Cameron Reed / Network Engineer, Morgan Lee / Systems Engineer, and Jordan Patel / Cybersecurity Specialist are fictional development placeholders. Each card and the page-level notice visibly disclose the temporary state. The existing `images/team/2.jpg` stock portrait is reused for all four profiles with responsive cropping; Nelson's photo is also explicitly labeled temporary.
- The Who We Are navigation item now resolves to the new page and is no longer marked pending across all seven root pages. `whoweare.html` has the correct active-page treatment. Support remains the only user-approved pending destination.
- Browser checks at 1440px, 1366px, 1024px, and 390px found no horizontal overflow. The supporting profiles render in one desktop row and stack on mobile; the mobile navigation opens with all seven destinations; all images load; keyboard focus is visible; the page has one H1 and logical H2/H3 structure; and the browser console is clean after retaining the legacy dependencies required by `custom.js`.
- `node tools/check-phase5.cjs`, Phase 1–4 checks, the inspection helper, JavaScript syntax checks, and `git diff --check` passed. The dedicated Phase 5 check verifies the lead/profile structure, titles, founder identification, placeholder disclosure, image reuse, CTA, single-H1 structure, resolved navigation state, and absence of page-specific Rough Notation/Owl dependencies.
- With the user's explicit approval, site commit `d6fb5ed` was pushed to `origin/website-refresh`. WinSCP uploaded `index.html`, `whatwedo.html`, `whyhudsonhelm.html`, `whoweare.html`, `areweagoodfit.html`, `starthere.html`, and `404.html` to the production root. Remote `stat` reported the new `whoweare.html` at 19,589 bytes and confirmed all seven uploads. Cache-busted public HTTPS checks returned 200 for every page, verified Who We Are is no longer pending anywhere, confirmed Support remains explicitly pending, and confirmed the live Phase 5 page contains Nelson's title, all three supporting disciplines, the placeholder notice, and four shared-photo references. Project-only documentation and tools were not deployed.

### Phase 6 implementation evidence — September 10, 2026

- `areweagoodfit.html` now follows compact text-and-image Hero → six-card **When The Fit Is Especially Strong** criteria → four-item **We May Not Be The Right Fit If...** filter → one Start Here CTA. The existing `images/blog/1.jpg` asset is retained in a restrained responsive crop.
- The six cards cover the approved business-size, day-to-day technology, responsive remote/onsite support, security, practical-advice, and ongoing-relationship concepts. The not-fit language remains direct without being hostile or condescending, and the redundant standalone **We May Be A Good Fit If...** block is removed.
- The page has one semantic H1, logical H2/H3 structure, descriptive image text, a meta description, no duplicate IDs, and no missing assets beyond the previously authorized Support route. Browser checks at 1366px, 1024px, and 390px found no horizontal overflow; the tablet/mobile navigation collapsed and opened correctly, all images loaded, and the console returned no warnings or errors.
- `node tools/check-phase6.cjs`, Phase 1–5 checks, the inspection helper, JavaScript syntax checks, and `git diff --check` passed. The dedicated Phase 6 check verifies required structure and messaging, card cardinality, CTA, single-H1 structure, removal of the blog wrapper and redundant fit section, and absence of an external jQuery dependency.
- With the user's explicit approval, site commit `d5b8f10` was pushed to `origin/website-refresh`. Only `areweagoodfit.html` was uploaded through the saved WinSCP production FTP session; remote `stat` reported 28,721 bytes. A cache-busted public HTTPS request returned 200 and confirmed the hero, six fit cards, four not-fit items, and closing CTA while the old blog wrapper and redundant **We May Be A Good Fit If...** section were absent. Project-only documentation and tools were not deployed.

### Phase 7 implementation evidence — September 10, 2026

- `starthere.html` now uses one centered form-first card immediately below the header, superseding the initially published two-column presentation. It has one H1, the approved revised introduction, the one-business-day callout, visible Name/Company/Email/optional Phone/Message fields, and a compact **Serving New Jersey & New York** plus linked email/phone alternative below the form. The separate contact-information card, large icon rows, duplicate **Start the Conversation** heading, placeholder office address, editable Subject field, Rough Notation dependencies, and page loading overlay are absent.
- `js/start-here.js` provides field-specific accessible errors, an atomic live response region, sending/success/failure states, request timeout handling, a disabled in-flight submit control, and Turnstile rendering/reset behavior. The page-specific form no longer binds to the legacy shared form handler.
- `mail.php` now reads configuration from environment variables or an optional `hudson-helm-config.php` one level above the public root, fails closed when secrets are absent, validates the Turnstile token through Siteverify, enforces action/hostname checks, validates required fields and length caps, strips header-control characters, escapes HTML, and sends through authenticated SMTP only outside isolated tests. It generates `[WEBSITE LEAD] Website Info Request from <Company Name>` and the approved high-priority headers.
- PHPMailer 5.2.28 was replaced with PHPMailer 7.1.0. Obsolete bundled examples, legacy classes, OAuth helper, and unused extras were removed; the maintained namespaced `src` implementation and upstream license/package documentation are retained.
- Official PHP 8.5.10 was used locally for syntax and integration testing. `tools/test-phase7.cjs` exercised Cloudflare's official pass, fail, and duplicate test credentials against the live Siteverify endpoint while all mail was captured by an isolated local SMTP sink. Required/optional validation, honeypot behavior, header-injection resistance, generated subject, priority headers, HTML escaping, and success/error responses passed without production mail delivery.
- Firefox/Edge visual checks at 1366px, 1024px, and an actual 390px Firefox viewport confirmed the revised single-card hierarchy, readable line lengths, compact mobile spacing, direct-contact placement, and no horizontal clipping. The narrow-screen back-to-top control remained clear of the form, direct-contact block, and footer content. Phase 1–7 structural checks, the full Phase 7 PHP/Turnstile/SMTP-sink integration suite, JavaScript syntax checks, the inspection helper, and `git diff --check` passed after the revision.
- A temporary uniquely named production diagnostic confirmed PHP 8.2.33 with cURL, OpenSSL, filter, and JSON enabled. The diagnostic was deleted immediately after use, and a cache-busted public request confirmed HTTP 404. No production form files or credentials were changed during this diagnostic.
- The compact follow-up keeps the primary form and orange **Submit** action within a 1366×768 viewport when the official Turnstile widget footprint is present; only the secondary direct-contact/footer content remains below. The 390px layout remains readable and unobstructed.
- Production activation uses an untracked `includes/contact-production.php` guarded by `includes/.htaccess`; direct HTTPS access returns 403. Its canonical local source is `D:\HH_Website\PrivateConfig\HudsonHelmContactProduction.php`, outside the repository and covered by a parent ignore rule. The public configuration endpoint exposes only the site key and safe widget settings.
- Cloudflare Siteverify accepted the installed production secret and returned the expected `invalid-input-response` result for an intentionally invalid token rather than `invalid-input-secret`. Migadu authenticated and accepted one clearly labeled Phase 7 delivery test addressed to `info@hudsonhelm.com`. These checks validate the two production credentials without printing them or submitting automated traffic through the public contact form.
- Site commit `4b5959c` was pushed to `origin/website-refresh`. Production received `includes/.htaccess`, `includes/contact-config.php`, the untracked guarded credential file, `js/start-here.js`, and `starthere.html`; public response checks and a live browser render confirmed the activated compact form.
- The current action-row refinement uses the blue Submit action and orange direct-email action at opposite sides of the form, with Turnstile immediately to the right of Submit across a 24px gap. The former centered action-row logo and separate 68px Turnstile reservation are removed. The old lower-right direct-contact sentence and temporary phone number remain absent; the centered service-area line reads **Serving the greater New Jersey / New York / Philadelphia metropolitan area.** On successful delivery, the accessible live region renders **Thanks, your request has been sent.** followed by **We'll be back with you soon.**
- The Submit action is intentionally more prominent than the direct-email action: it retains the shared 44px height, 136px minimum width, and 17px bold label while using the exact blue gradient and shadow treatment of the header Start Here CTA.
- Both orange action labels use matching 17px bold typography; only Submit receives the additional width emphasis.
- The **Prefer to e-mail us directly?** prompt is left-aligned with its button, uses 18px semibold text, and has a 10px lower margin so it does not crowd the action or the field above.
- Production publication from site commit `8abd519` was verified over cache-busted HTTPS. `starthere.html` returned 200 with the approved response sentence, dedicated script, and Turnstile loader; `form-config.php` returned the intended no-store/nosniff 503 JSON because placeholders are not accepted as configuration; `mail.php` rejected GET with 405; direct access to `includes/contact-config.php` and the removed legacy `PHPMailer/class.phpmailer.php` returned 404; and `PHPMailer/VERSION` returned 7.1.0.
- The superseding Start Here design revision from site commit `59b2480` was uploaded as the only production payload. Cache-busted source checks and a live 390px Firefox render confirmed the exact new copy, one form-first card, one H1, compact service-area/direct-contact block, removal of the duplicate heading and split columns, and preserved fail-closed behavior. Cloudflare's production email protection rewrites the `mailto:` link in the served response while retaining a visible clickable address; the tracked source retains the required `mailto:info@hudsonhelm.com` target.
- The compact follow-up retains 46px touch-friendly inputs and uses an 88px default message area. At 1366×768 with a real Turnstile widget footprint, the primary form and orange **Submit** action are visible without scrolling; the secondary direct-contact/footer content may require a small scroll. A 390px Firefox check confirmed readable wrapping, compact field spacing, the shorter message area, and no overlap from the back-to-top control.
- The saved production FTP account is chrooted at the public root and cannot reach the preferred parent-directory config location. The production loader therefore supports an untracked `/includes/contact-production.php` fallback, with direct-request protection inside the PHP file and a tracked `/includes/.htaccess` deny rule. The credential source is stored locally at `D:\HH_Website\PrivateConfig\HudsonHelmContactProduction.php`, outside the active Git repository and under an ignore-all local rule. No secret values are recorded in Git or this document.

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
| PHP version / runtime | Production PHP 8.2.33 verified September 10, 2026 through a temporary version/extension diagnostic; the diagnostic was removed and its public URL confirmed 404. Official portable PHP 8.5.10 was used for local Phase 7 syntax and integration tests. |
| Required PHP extensions / dependencies | Production cURL, OpenSSL, filter, and JSON extensions were verified enabled. Phase 7 uses PHPMailer 7.1.0's namespaced source and requires PHP 8.1+ because the project handler uses current return types; production PHP 8.2.33 satisfies that requirement. |
| Safe form-testing method | Run `tools/test-phase7.cjs` with `PHP_BIN` set to a PHP 8.1+ executable and, when the local PHP build requires it, `PHP_CA_BUNDLE` set to a trusted CA bundle. The test uses Cloudflare's official public Turnstile test credentials and a local SMTP sink; it never uses production SMTP. |
| Turnstile local/staging test approach | `tools/test-phase7.cjs` verifies pass, fail, and `timeout-or-duplicate` behavior through the real Siteverify endpoint using Cloudflare's official public test credentials. Test credentials work on localhost but must never be deployed. Production must use a hostname-restricted real widget and secret. |
| Hosting/runtime assumptions | The origin is Namecheap-hosted PHP behind Cloudflare. PHP 8.2.33 and required extensions are confirmed. The handler prefers environment variables or `/home/<account>/hudson-helm-config.php`-style placement above the public root, but the saved FTP account is chrooted at `/`; it therefore also supports an untracked, direct-request-guarded `/includes/contact-production.php` protected by `/includes/.htaccess`. The local source copy lives outside the active repository under `D:\HH_Website\PrivateConfig`. |
| Validation / lint / scanning commands | `node tools/check-phase1.cjs` through `node tools/check-phase7.cjs`; `node tools/inspect.cjs`; `node --check` for project JavaScript and `.cjs` tools; PHP `-l` for `mail.php`, `form-config.php`, and `includes/contact-config.php`; `tools/test-phase7.cjs` with `PHP_BIN`/optional `PHP_CA_BUNDLE`; and `git diff --check`. The Phase 7 integration test requires outbound HTTPS only to Cloudflare Siteverify and captures SMTP locally. Use `rg --no-ignore` with explicit paths for reliable source searches in this environment. |
| Known local/staging vs. production differences | The full deployable checkout at site commit `5f42c02` was size-synchronized to production on September 10, 2026. Phase 2 `index.html` from site commit `eb72ad0`, Phase 3 `whatwedo.html` from site commit `140d6e3`, Phase 4 `whyhudsonhelm.html` from site commit `16fabd6`, the seven Phase 5 root-page HTML files from site commit `d6fb5ed`, Phase 6 `areweagoodfit.html` from site commit `d5b8f10`, the Phase 7 runtime from site commit `8abd519`, and the superseding Start Here revisions through site commit `e7109cc` were subsequently uploaded and verified publicly. Phase 7 is operational with real protected credentials in an untracked server-only file. Cloudflare email protection, analytics injection, and robots content remain production-response additions; the protected production credential file intentionally exists only locally and server-side, never in Git. |

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
| 2026-09-10 | Use clearly disclosed temporary content for the initial Who We Are page. | The user explicitly directed use of one reusable placeholder photograph plus invented names and biographies for a Network Engineer, Systems Engineer, and Cybersecurity Specialist, approved temporary production publication, and plans to supply the real people and biographies later. |
| 2026-09-10 | Publish the response expectation **We'll usually respond within one business day.** | The user supplied and approved this exact Start Here commitment. |
| 2026-09-10 | Upgrade the contact form from PHPMailer 5.2.28 to the current maintained PHPMailer 7.1.0 release. | The user explicitly requested replacement of the ancient bundled release; production PHP 8.2.33 supports the updated implementation. |
| 2026-09-10 | Use Cloudflare's official public pass/fail/duplicate credentials only for automated/local testing. | These credentials work on localhost and provide deterministic Siteverify results; production still requires real hostname-restricted credentials. |
| 2026-09-10 | Publish Phase 7 with placeholder credentials in a fail-closed state. | The user explicitly authorized temporary publication before real Migadu and Turnstile values are available. Placeholder and test values must never authorize mail or verification; the public form must report that it is temporarily unavailable. |
| 2026-09-10 | Make Start Here one form-first workflow rather than two adjacent contact sections. | The user supplied a revision brief requiring one **Start Here** introduction and action, with the response note above the unchanged form and compact direct-contact alternatives below it. This supersedes the original Phase 7 two-column presentation requirement without changing form behavior. |
| 2026-09-10 | Favor a compact, wider Start Here presentation and keep status text visually hidden. | The user asked to approach a no-scroll desktop view, combine the response sentence with the introduction, shorten the message area, remove the two visible spam-status lines, use an orange **Submit** button, and reduce separator/footer gaps; later clarification made no-scroll a target rather than a hard gate. Assistive status output remains in the DOM. |
| 2026-09-10 | Use a guarded in-public-root production config only because FTP cannot reach the preferred private parent directory. | The FTP account resolves both `/` and `..` to the same chroot. The fallback file remains untracked, rejects direct PHP requests, is denied by an adjacent server rule, and has a separate local source outside the active repository. |
| 2026-09-10 | Use a balanced three-part action row on Start Here and broaden its page-specific service-area line. | The user requested a second matching orange email button aligned opposite Submit, the Hudson Helm logo between them, removal of the prior lower-right email/phone text, the centered wording **Serving the greater New Jersey / New York / Philadelphia metropolitan area.**, and the revised successful-send confirmation. |
| 2026-09-11 | Replace the Start Here action-row logo with Turnstile and collapse the separate widget row. | This supersedes only the logo placement from the September 10 action-row decision. The user requested Turnstile immediately to the right of Submit with breathing room, less whitespace below the message field, and an 18px email prompt that retains space above its button. |
| 2026-09-11 | Match the form Submit color to the header Start Here CTA while retaining the orange email action. | The user requested visual continuity between the primary form submission and the header CTA. Only Submit receives the header's blue gradient, shadow, and hover/focus colors. |

## Open Questions, Inputs, and Deferred Decisions

This is the canonical register for unresolved user inputs, blockers, and intentionally deferred decisions. Do not maintain a duplicate list elsewhere in this document. A missing input blocks only the affected feature unless explicitly stated otherwise.

- **OPEN — New Jersey business phone number:** not yet provided. Blocks final replacement of the temporary 954 number only.
- **OPEN — Exact registered LLC/legal entity name:** not yet confirmed for legal copy. Blocks only legal text that requires the exact entity name.
- **TEMPORARY — Who We Are content:** real photographs and the three supporting team identities/biographies have not yet been supplied. The user authorized one reusable stock portrait and clearly disclosed fictional supporting profiles for the initial page and production publication. Replace Cameron Reed, Morgan Lee, Jordan Patel, their biographies, and all temporary photography/labels when approved real material is supplied.
- **RESOLVED — Start Here response-time expectation:** the user approved **We'll usually respond within one business day.**
- **RESOLVED — Operational production contact form:** real Migadu and Turnstile values are installed in the guarded production-only server file and retained in a local source file outside the repository. The real widget configuration is live, Cloudflare accepted the secret, Migadu accepted a clearly labeled delivery test, direct credential-file access returns 403, and supplied secret values are absent from tracked Git content.
- **DEFERRED — Customer endorsements:** approved as a future enhancement and not required for the initial refresh.
- **RESOLVED — Intended baseline:** retain the committed local source following the user's instruction to commit. Local CSS/form JavaScript differences remain documented; production PHP cannot be compared from public responses.
- **RESOLVED — PHP and hosting validation:** production PHP 8.2.33 and required cURL/OpenSSL/filter/JSON extensions were verified. Local PHP 8.5.10 plus an isolated SMTP sink and Cloudflare's official credentials validated Phase 7 without production email delivery.
- **TEMPORARY — Support destination:** the user approved the missing `support.html` route for approximately one week beginning September 10, 2026. It remains clearly marked pending in source and must be resolved when its page is implemented or before the temporary allowance expires. The Who We Are destination is resolved by Phase 5.

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

- [x] Replace the rotating hero with the approved static first-slide hero — retained the circuit backdrop and meeting photograph, approved heading and description; removed the hero button and limited the desktop hero to 540px.
- [x] Apply the approved service-card content changes without adding cards or card buttons — retained eight equal-weight cards and applied the Cloud & Email and Network & Wi-Fi copy exactly.
- [x] Reduce excessive Hero → service cards and service cards → Why Hudson Helm spacing — applied explicit 72/64px desktop and 52px mobile section transitions.
- [x] Implement the concise Why Hudson Helm teaser and path to the full page — added four approved differentiators and one `whyhudsonhelm.html` CTA in a lighter section.
- [x] Remove obsolete carousel controls/code from the homepage as appropriate without breaking shared dependencies needed elsewhere — removed homepage Revolution Slider and Owl Carousel markup/references while retaining shared files used by other pages; also removed now-unused homepage Rough Notation scripts.
- [x] Satisfy the Shared Definition of Done for this phase — requirements rereviewed; local preview, responsive, navigation, accessibility, console, syntax, structural, and diff checks passed; documentation and focused regression check updated; site commit `eb72ad0` pushed; homepage published and verified with explicit user approval.

## Phase 3 — What We Do

- [x] Move the approved introduction section into the page-hero position — promoted the retained introduction and image into a semantic single-H1 hero.
- [x] Implement the eight-card in-page jump navigation — added eight exact-category cards with descriptive links, focusable targets, and sticky-header scroll clearance.
- [x] Implement one substantive detailed section for each approved service category — added eight concise sections with explanatory copy, practical bullets, descriptive retained imagery, and alternating desktop placement.
- [x] Merge overlapping legacy service categories as specified — consolidated End-User Support/Help Desk, Microsoft 365, and Vendor Coordination into their approved destinations and separated Cybersecurity from Backup & Recovery.
- [x] Remove redundant Core Services navigation and unnecessary Learn More buttons — removed the four-tab block, repeated detail buttons, and obsolete page-specific Rough Notation/Owl references.
- [x] Confirm the final page flow matches the approved specification — verified Hero → eight jump cards → eight detailed sections → one Start Here CTA → global footer.
- [x] Satisfy the Shared Definition of Done for this phase — requirements rereviewed; local preview, responsive, navigation, jump-link, keyboard, accessibility, asset, console, syntax, structural, and diff checks passed; documentation and a dedicated Phase 3 regression check were updated; site commit `140d6e3` was pushed; only `whatwedo.html` was published with explicit approval and verified by remote stat plus public HTTPS response.

## Phase 4 — Why Hudson Helm

- [x] Preserve the approved hero, core messaging, differentiator cards, and trust statement — retained the approved headline, hero image, supporting copy, four exact differentiators, and central trust positioning.
- [x] Compress the secondary section into the approved lighter treatment — converted the three retained ideas into compact, equal-height cards on a light section.
- [x] Remove the redundant second large stock photograph — removed the `images/tabs/4.jpg` image and its image-heavy split layout.
- [x] Reduce excessive page length and whitespace without deleting useful messaging — consolidated the flow and reduced the 1366px document height to 3,334px while retaining the substantive copy.
- [x] Reduce unnecessary eyebrow-label repetition — removed all visible eyebrow labels from the page and used semantic hierarchy instead.
- [x] Preserve the approved closing CTA concept — retained the exact concept, supporting copy, and Start Here conversion path.
- [x] Satisfy the Shared Definition of Done for this phase — requirements rereviewed; local preview, responsive, navigation, accessibility, contrast, console, syntax, structural, regression, and diff checks passed; documentation and a dedicated Phase 4 check were updated; site commit `16fabd6` was pushed; only `whyhudsonhelm.html` was published with explicit approval and verified by remote stat plus public HTTPS response.

## Phase 5 — Who We Are

- [x] Create the dedicated Who We Are page structure — implemented hero, lead profile, three supporting profiles, positioning section, and closing CTA.
- [x] Add Who We Are to primary navigation in the approved position — retained the Phase 1 position adjacent to Why Hudson Helm, removed its pending marker across all root pages, and added the active state on `whoweare.html`.
- [x] Build profile treatment that accurately supports employees and consultants/contractors without misrepresenting roles — used neutral profile structure and avoided employee/contractor claims for the temporary supporting profiles.
- BLOCKED — Real photographs and the three supporting identities/biographies have not been supplied. The user explicitly authorized clearly disclosed fictional profiles and one reused stock portrait for temporary production use; the replacement requirement is recorded in the canonical open-items register.
- [x] Verify desktop and mobile navigation/layout behavior after adding the page — verified at 1440px, 1366px, 1024px, and 390px with correct desktop row/mobile stacking, complete collapsed navigation, loaded images, and no horizontal overflow.
- [x] Satisfy the Shared Definition of Done for this phase — requirements rereviewed; local preview, responsive, navigation, accessibility, console, asset, syntax, structural, regression, and diff checks passed; site commit `d6fb5ed` pushed; seven affected root HTML files published with explicit approval and verified by remote stats plus cache-busted public HTTPS responses; documentation closeout recorded separately.

## Phase 6 — Are We a Good Fit?

- [x] Replace the oversized opening image treatment with the approved compact text + image hero — retained the existing business-team image in a restrained responsive crop alongside the H1 and major positioning message.
- [x] Convert fit criteria into a scannable treatment using the approved concepts — implemented six concise cards covering business size, technology reliance, support, security, practical advice, and an ongoing relationship.
- [x] Preserve the **When The Fit Is Especially Strong** heading and relevant messaging — retained the exact heading and condensed the strongest existing positioning into its introduction.
- [x] Add the short, non-hostile **We May Not Be The Right Fit If...** section — added four direct but respectful filtering criteria.
- [x] Remove redundant fit messaging and break apart the giant article-style block — removed the blog wrapper and repetitive good-fit close in favor of four distinct semantic sections.
- [x] End with a concise Start Here CTA and target the approved overall page length where practical — implemented one closing CTA and reduced the page to 2,277px at a 1366×768 desktop viewport.
- [x] Satisfy the Shared Definition of Done for this phase — requirements rereviewed; local preview, responsive, navigation, accessibility-structure, console, asset, syntax, regression, and diff checks passed; site commit `d5b8f10` pushed; only `areweagoodfit.html` published with explicit approval and verified by remote stat plus a cache-busted public HTTPS response.

## Phase 7 — Start Here

- [x] Use the superseding one-card, form-first layout with responsive spacing — the redundant standalone contact section was removed and the revised hierarchy was verified at 1366px, 1024px, and an actual 390px Firefox viewport.
- [x] Remove the placeholder office address and use the superseding centered Start Here wording **Serving the greater New Jersey / New York / Philadelphia metropolitan area.**
- [x] Implement the approved fields and remove the user-editable Subject field — Name, Company, Email, optional Phone, and Message use visible labels and matched client/server limits.
- [x] Configure and verify authenticated Migadu SMTP delivery to `info@hudsonhelm.com` — the production credential is protected outside Git and Migadu accepted a clearly labeled Phase 7 delivery test.
- [x] Implement the generated subject and protect against email-header injection — verified with embedded CR/LF input in the integration suite.
- [x] Apply the approved high-priority mail headers — verified from the captured MIME message.
- [x] Implement required validation, accessible messages, sending/success/failure states, and duplicate-submission protection.
- [x] Present the final success response as **Thanks, your request has been sent.** followed by **We'll be back with you soon.**
- [x] Build the current action row with the blue header-matched Submit action, orange direct-email action, and Turnstile immediately to the right of Submit across a deliberate gap; remove the prior centered logo, separate widget reservation, and lower-right email/phone copy.
- [x] Emphasize Submit with an approximately one-third wider button and slightly larger bold label while preserving the action-row balance.
- [x] Add the approved response-time expectation: **We'll usually respond within one business day.**
- [x] Configure Cloudflare Turnstile Managed mode and server-side Siteverify validation — official pass/fail/duplicate tests pass, the real widget configuration is live, and Siteverify accepted the protected production secret.
- [x] Implement the hidden honeypot and required input sanitization/security handling.
- [x] Satisfy the operational-contact-form portion of the Shared Definition of Done — production credentials are securely installed, the real widget is live, Cloudflare accepted the Turnstile secret, Migadu accepted the delivery test, and public security/response checks passed.
- [x] Commit, push, and publish the complete approved Phase 7 implementation and revisions — runtime commit `8abd519`, presentation commit `59b2480`, compact operational commit `4b5959c`, action-row commit `3e69fd9`, and subsequent refinements through header-matched Submit commit `e7109cc` were pushed and their production payloads verified over HTTPS.

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
