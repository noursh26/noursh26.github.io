> Historical checkpoint. The implementation is now complete: 33 case studies and 690 captures. See [current task status](../../TASK_STATUS.md). Statements below describe the earlier interrupted session and are not current.

# Project gallery implementation checkpoint

**Status: incomplete. The gallery is not ready to publish.**

The user requested a professional project gallery covering every worthwhile product, including private repositories, with at least **10 genuine desktop screenshots and 10 genuine mobile screenshots per product**, detailed bilingual case studies, a distinctive design for each product, an all-projects page, and an expanded preview on the existing cinematic landing page.

## Preserve the current portfolio

The user strongly likes the current cinematic concept. Keep its core identity and section choreography. The earlier copy and motion improvements are in [PR #2](https://github.com/noursh26/noursh26.github.io/pull/2), which remains open and unmerged. This checkpoint branch is based on that work. Review comments on PR #2 still need assessment before merging.

## What happened to the environment

External package requests began returning HTTP 503 through the managed environment proxy. The selected execution environment subsequently became unavailable with “failed to query executor configuration capabilities”. Shell, filesystem, browser execution, and local image inspection tools are no longer available in this turn. GitHub connector access remains available.

**190 actual screenshots were captured locally across nine products before that failure. None of those screenshots have been uploaded to this repository.** Counts below document prior local progress; they do not establish that the files are currently recoverable. Recover and inspect the files, or recapture them, before creating any public screenshot manifest.

Local page implementation had also begun, but is uncommitted and inaccessible. This commit only preserves the verified scope, capture requirements, and continuation plan; it does not contain that local page implementation.

## Product inventory

Group related backend, web, mobile, and companion repositories into one product. The 56-repository inventory yields 33 selected product groups. This grouping includes private projects. Validate a product's actual screens before writing feature claims.

| Slug | Product | Source repositories | Captured locally: desktop / mobile |
| --- | --- | --- | --- |
| accountant | Accounting workspace | accountant-app | 15 / 15 |
| nirso | NIRSO | NIRSO | 0 / 0 |
| estratijiya-ai | Estratijiya AI | estratijiya-ai-platform | 0 / 0 |
| zero-os | Zero OS | Estratijiya | 0 / 0 |
| relinka | Relinka | relinka | 0 / 0 |
| salesflow | SalesFlow | salesflow | 0 / 0 |
| fahrast | فهرست | fahrast | 0 / 0 |
| almustfa | المصطفى | almustfa, almostfa-react, almostfa_app, almostfa-pos | 10 / 10 |
| lego | Lego Designs — تصميم المسابح | lego-backend, lego-mobile | 0 / 0 |
| m3aak | معاك | m3aak | 0 / 0 |
| warid | Warid B2B | WaridB2B | 0 / 0 |
| alkhyr | الخير | alkhyr | 10 / 10 |
| omar | Omar | omar | 0 / 0 |
| mosapqa | مسابقة | mosapqa | 0 / 0 |
| safqa | Safka Plus | safkablus | 0 / 0 |
| umzuge | Umzüge | umzuge | 0 / 0 |
| dwiptech | DWIP Tech | dwiptech | 0 / 0 |
| globalfootball | Global Football AI | gfaa-web, gfaa-android, globalfootballai-landing | 0 / 0 |
| farahidi | الفراهيدي | farahidi-api, farahidi-app | 0 / 0 |
| wisp | WISP | WISP-backend, WISP-frontend | 10 / 10 |
| foxtech | FoxTech | fox-api, fox-web | 10 / 10 |
| qasioun | Qasioun | Qasioun | 0 / 0 |
| qasioun-tv | Qasioun TV | qasioun-tv | 0 / 0 |
| arkani | أركاني | arkan, arkani | 0 / 0 |
| fulus | فلوس | Fulus | 0 / 0 |
| masaref | مصاريف | masaref | 0 / 0 |
| ail | AiL | ail | 0 / 0 |
| bolupinar | Bolu Pınar | BoluPinar | 10 / 10 |
| horizonai | Horizon AI | horizonai | 10 / 10 |
| maash | Maash | maash, masshcv | 10 / 10 |
| petravex | Petravex | Petravex-landing | 10 / 10 |
| estratijiya | Estratijiya | EstratijiyaLandingPage, estratijya-landing, estratijya-auth | 0 / 0 |
| yallabook | YallaBook | YallaBookBack, YallaBookFront | 0 / 0 |

**Lego correction:** the running Lego experience is for pool design and implementation requests. Do not describe it as a building-design product.

## Local assets and runtime notes

If the environment is recovered, inspect these locations first:

- Portfolio checkout: `/workspace/noursh26.github.io`, local branch `feature/project-case-studies`.
- Private application checkouts: `/workspace/project-sources/`. These sources must not be copied into the public portfolio repository.
- Original screenshots: `/tmp/project-gallery/captures/`.
- Screenshot logs, demo adapters, seed helpers, and capture scripts: `/tmp/project-gallery/`.
- Authoring draft: `/tmp/project-gallery/author-projects.py`. Its Lego copy still needs the pool-design correction.
- Local catalog and page work: `src/portfolio/`, `src/Router.tsx`, and the modified `src/main.tsx`. Do not assume that the local project and screenshot JSON placeholders contain finished data.

Local capture provenance:

- Accounting: original application with its demo database seeder; 15 desktop and 15 mobile screens.
- Almustfa: original application, original seeder plus synthetic local profile fields; 10 desktop and 10 mobile screens. Recapture after dismissing the browser-notification warning through the original UI, or waiting for it to close.
- Alkhyr: original application with synthetic local campaigns, beneficiaries, donors, donations, and expenses; 10 desktop and 10 mobile screens.
- WISP and FoxTech: original frontend interfaces using explicitly local API fixtures and demo authentication; 10 desktop and 10 mobile screens each.
- Bolu Pınar, Horizon AI, Maash, Petravex: original site sections and animation states; 10 desktop and 10 mobile screens each. Inspect missing original assets before accepting the shots.
- Lego backend and Flutter web demo were running, but a complete 20-shot set had not been captured.
- Masaref ran with a local in-memory demo repository preserving the original Flutter UI. A complete 20-shot set had not been captured.

Never point these demo runs at production data. Demo account values and local credentials are intentionally omitted from this public checkpoint.

## Case-study and gallery requirements

- Routes: `/projects/` and `/projects/<slug>/`, with direct refresh support on GitHub Pages.
- Original landing page: short, informative previews using real screenshots and links to the relevant case study and full catalog.
- Catalog: bilingual search and category filters, meaningful empty states, responsive cards, real screenshot previews.
- Case study: product purpose, audience, problem, solution, actual feature groups, a user journey, architecture/stack, challenges, and a detailed screen gallery.
- Distinct project composition, palette, typography treatment, and section arrangement while retaining the portfolio's navigation and brand.
- Separate desktop and mobile gallery tabs, useful captions, thumbnails, previous/next navigation, full-size lightbox, keyboard support, focus restoration, and Escape to close.
- Use full screenshots without cutting off critical UI. Optimize format and thumbnails while preserving screen contents.
- UI generated by image tools may guide page art direction only. It must never be presented as an actual project screenshot.
- Do not claim production usage, client results, metrics, integrations, or feature completion without source evidence.
- For private projects, publish the authorized case study and synthetic-data screenshots; never publish private source code, secrets, real personal records, or demo runtime credentials.
- Preserve Arabic/English support, RTL, reduced motion, and smooth section transitions.

## Acceptance and continuation

1. Recover the environment and inspect local files; otherwise recreate the original application demo runs.
2. Inspect all existing captures, correct missing assets and visible runtime errors, and complete every selected product with at least 10 distinct desktop and 10 distinct mobile screens.
3. Generate an uploaded screenshot manifest containing only actual available image files, source revision, screen label, viewport, original route/state, and demo-data provenance.
4. Finish source-grounded bilingual content and per-product visual designs; replace the old landing project previews with the real ones.
5. Build static route entry files with correct metadata, canonical URLs, sitemap entries, and GitHub Pages direct-navigation behavior.
6. Build and browser-test Arabic/English desktop/mobile, 320px width, reduced motion, catalog search/filters, both gallery tabs, lightbox keyboard/focus behavior, direct case-study refresh, broken images, console errors, and horizontal overflow.
7. Inspect rendered pages alongside the saved design concepts and record any intentional visual deviations.
8. Upload optimized screenshots and source changes to the implementation branch and update the draft PR only after those checks. Do not merge this documentation checkpoint as if it were the completed gallery.

This checkpoint records incomplete work honestly. It adds no runtime UI changes and publishes no screenshot placeholders.
