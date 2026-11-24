# Showcase rules: what the portfolio may show

The portfolio exists to get work. Every screen and every sentence is judged by one question:
does it show a hiring manager or client something that **works** and has **value**?
If not, it is not shown. Fewer, stronger screens always beat a full set.

## 1. Screens

A screenshot is shown only if all of these hold:

1. **Real content.** The screen is populated: lists have rows, dashboards have figures, charts have data.
2. **No empty states.** Nothing like "no items yet", "0 results", "start by adding", or a dashboard of zeros.
3. **No placeholders.** No "coming soon", "placeholder" tags, Lorem/Latin filler, `example.com` contacts, generic "Client 1" logos, or grey boxes where images failed to load.
4. **Nothing broken.** No clipped tables, content overflowing the frame, overlapping chrome or mascots covering data, half-faded headings, mid-transition frames, seams, or raw untranslated keys such as `high` in an Arabic UI.
5. **A working feature.** The screen shows something that works end to end. A form that posts nothing, a button disabled for lack of a key, or analytics fed with fake numbers is not shown.
6. **Not a duplicate.** It shows something the other shown screens do not.

Desktop and phone are judged separately. Show the pair when both pass, and show only the good one when only one passes.
Products whose desktop captures are a stretched phone UI are phone-only.

## 2. Features and claims

- Describe only features that **work in the source today**. If a feature is UI-only, half-built or depends on a missing integration, do not mention it.
- Never invent numbers, customers, results or integrations. Counts in facts come from the source (roles, modules, languages).
- Copy never talks about the demo data or the capture ("the demo has none", "all at zero", "the map did not load").
  The page says once, at the top, that the screens are actual interfaces with demonstration data.
- An in-progress side project is labelled as such, and shows only what already works.

## 3. Where the rules live

- `src/portfolio/curation/<id>.json` lists the screens that are hidden, with a reason for each:
  `{ "exclude": [{ "file": "desktop-07", "reason": "empty state" }] }`.
  Hidden screens stay in the capture archive, but the site never shows them: not in tours, rails, galleries, the directory or the home page.
- `scripts/check-tours.mjs` fails the build if a tour uses a hidden screen, misses a shown one, or uses filler wording.
- When a product is recaptured with real content, remove its entries from the curation file.
