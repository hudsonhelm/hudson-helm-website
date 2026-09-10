# Hudson Helm Website Refresh
## Master Project Document

This is the authoritative living document for the Hudson Helm website refresh. It combines the approved implementation brief with the current project record, decisions, findings, progress, and unresolved items.

## Document Control

| Field | Value |
| --- | --- |
| Document | `HH_Website_Master.md` |
| Current version | `0.2.0` |
| Last updated | September 10, 2026 |
| Current phase | Phase 0 — Repository / Safety |
| Phase status | **In progress — do not treat Phase 0 as complete** |
| Repository | `https://github.com/hudsonhelm/hudson-helm-website` |
| Repository visibility | Private |
| Default branch | `main` |
| Active working branch | `website-refresh` |

## Document Versioning and Archive Process

- Keep this file at the repository root as the single authoritative working document.
- Update the version, last-updated date, project status, activity log, findings, decisions, open items, and change log whenever work materially changes the project record.
- Create an immutable full-document snapshot in `archive/` before a material revision or phase transition.
- Name archived snapshots `HH_Website_Master_vX.Y.Z.md`.
- Use major versions for substantial changes in project direction, minor versions for material working-document updates or phase transitions, and patch versions for small corrections that deserve a recorded snapshot.
- Do not edit an archived snapshot after it has been created. Correct or clarify information in the living master and record the change.
- Do not create archive snapshots for inconsequential wording or formatting changes.

## Current Project Status

Phase 0 repository setup is complete. Phase 0 inspection and verification are still outstanding. No Phase 1 implementation should begin until the remaining Phase 0 work has been completed and recorded here.

### Phase Progress

| Phase | Name | Status |
| --- | --- | --- |
| 0 | Repository / Safety | In progress |
| 1 | Shared Structure | Not started |
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

### Remaining Before Phase 0 Is Complete

- [ ] Inspect the complete HTML structure and page relationships.
- [ ] Inspect CSS organization, dependencies, duplication, and reusable styles.
- [ ] Inspect JavaScript behavior, dependencies, carousel code, menus, and template residue.
- [ ] Inspect shared and duplicated header/footer implementations.
- [ ] Inventory images, fonts, and other assets; identify candidates for reuse without deleting anything.
- [ ] Inspect the contact form, PHPMailer integration, hosting assumptions, and PHP/runtime requirements.
- [ ] Inspect existing SEO metadata, structured data, analytics, and third-party scripts.
- [ ] Compare the local site with the live production site.
- [ ] Confirm that the local snapshot represents the production version intended as the refresh baseline.
- [ ] Identify an appropriate safe local or staging preview workflow, including PHP-dependent features.
- [ ] Record inspection findings, risks, and recommended Phase 1 boundaries in this document.
- [ ] Reconfirm the repository and working tree state before declaring Phase 0 complete.

## Activity Log

| Date | Activity | Result |
| --- | --- | --- |
| 2026-09-10 | Read and reviewed the complete original implementation brief. | Project scope and guardrails accepted as governing instructions. |
| 2026-09-10 | Inspected the top-level folder and discovered existing personal-repository metadata inside the website directory. | Existing metadata was preserved outside the new repository rather than overwritten or deleted. |
| 2026-09-10 | Authenticated GitHub CLI as `hudsonhelm`. | Confirmed access to the intended GitHub account. |
| 2026-09-10 | Created `hudsonhelm/hudson-helm-website`. | Private repository created with `main` as its default branch. |
| 2026-09-10 | Created and pushed the baseline and working branches. | `main` and `website-refresh` both point to the complete baseline at commit `b7d5fa2`. |
| 2026-09-10 | Converted the implementation brief into this versioned living master document. | Original brief archived as version `0.1.0`; living master advanced to version `0.2.0`. |

## Findings and Observations

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
- A more complete security and runtime inspection remains part of unfinished Phase 0 work.

## Decisions Record

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-09-10 | Use `D:\HH_Website\HudsonHelm_Website_v64` as the repository root. | It is the actual deployable site root; using the containing folder would unnecessarily nest all website paths. |
| 2026-09-10 | Use a private repository owned by `hudsonhelm`. | Separates the business website from the user's personal GitHub account and follows the approved brief. |
| 2026-09-10 | Preserve the old `.git` directory outside the new repository. | Retains recoverability without importing unrelated personal-repository history. |
| 2026-09-10 | Preserve legacy whitespace and template files in the baseline. | Cleanup and deletion must be intentional, reviewable work after inspection. |
| 2026-09-10 | Publish the current `mail.php`. | The user confirmed its embedded SMTP value is a dummy credential and authorized publication. |
| 2026-09-10 | Maintain one root-level living master and immutable versioned archives. | Prevents competing copies and provides an auditable record of project evolution. |

## Open Questions, Inputs, and Deferred Decisions

- The new New Jersey business phone number has not yet been provided.
- The exact registered LLC/legal entity name has not yet been confirmed for legal copy.
- Real photographs, names, roles, and approved biographies for the Who We Are page have not yet been supplied.
- The approved response-time expectation for Start Here has not yet been supplied.
- Production Migadu SMTP configuration and Cloudflare Turnstile keys will be needed later and must be handled securely.
- Customer endorsements are approved as a future enhancement but are not required for the initial refresh.
- The local/staging runtime and preview process still needs to be determined during the remaining Phase 0 inspection.

---

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

Archive immutable versioned snapshots in `archive/` according to the document-control process defined at the beginning of this file.

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

## Phase 0 — Repository / Safety

- Inspect local site
- Verify or initialize Git
- Create `.gitignore`
- Create private GitHub repo if needed
- Commit untouched baseline
- Push baseline to GitHub
- Create `website-refresh` branch
- Maintain the brief and project record in `HH_Website_Master.md`
- Confirm secrets are excluded

## Phase 1 — Shared Structure

- Shared CSS cleanup
- Shared header/navigation
- Global spacing conventions
- Establish reusable components/patterns

## Phase 2 — Homepage

- Static hero
- Service-card changes
- Spacing
- Why Hudson Helm teaser

## Phase 3 — What We Do

- New hero placement
- 8-card jump navigation
- Detailed service sections
- Remove duplicate service navigation

## Phase 4 — Why Hudson Helm

- Preserve strong messaging
- Compress layout
- Remove redundant image/content
- Reduce page height

## Phase 5 — Who We Are

- Build page structure
- Integrate real team photos/bios when supplied

## Phase 6 — Are We a Good Fit?

- Compact hero
- Scannable criteria
- Not-a-fit section
- Final CTA

## Phase 7 — Start Here

- Form
- Migadu SMTP
- Turnstile
- Honeypot
- Validation
- Success/error states

## Phase 8 — Support Portal Shell

- Login UI
- Turnstile verification
- Zero credential transmission
- Local generic failure state

## Phase 9 — Global Completion

- Footer redesign
- Privacy Policy
- Custom 404

## Phase 10 — QA

- Metadata / SEO
- Accessibility
- Responsive QA
- Performance
- Security review
- Broken-link / asset scan

## Phase 11 — Regression / Review

- Full regression pass
- Confirm Git working tree and history are clean
- Push completed branch
- Present finished local/staging site for user review
- Do not deploy until explicitly approved

---

# Inputs That May Still Be Needed From User

Do not invent these if unavailable.

1. New New Jersey business phone number
2. Exact registered LLC/legal entity name if required for legal text
3. Real photos for Who We Are
4. Names, roles, and approved short biographies for Who We Are
5. Confirmation of desired response-time promise for Start Here
6. Migadu SMTP credentials/configuration — handle securely and never commit secrets
7. Cloudflare Turnstile site key and secret — site key may be public; secret must remain server-side
8. Customer endorsements when the future social-proof phase is implemented

If a missing input blocks only one feature, continue with other non-blocked work rather than stopping the entire project.

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

---

# Document Change Log

## Version 0.2.0 — September 10, 2026

- Renamed the living document to `HH_Website_Master.md` and moved it to the repository root.
- Established the document-control, versioning, and immutable archive process.
- Added current phase status and a complete Phase 0 working checklist.
- Added the activity log, findings, decisions record, and open-items register.
- Recorded repository creation and baseline work completed to date.
- Kept Phase 0 explicitly in progress.

## Version 0.1.0 — September 9, 2026

- Original Hudson Helm Website Refresh implementation brief.
- Preserved as `archive/HH_Website_Master_v0.1.0.md`.
