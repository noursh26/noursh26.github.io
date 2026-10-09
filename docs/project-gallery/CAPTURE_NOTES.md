# Capture provenance and boundaries

The gallery contains **690 source-interface captures** for **33 products**. Every product has at least 10 desktop captures at 1440×1000 and 10 mobile captures at 390×844. Accounting workspace, NIRSO and Estratijiya AI have 15 of each. The 1,380 committed WebP files include one full image and one smaller thumbnail per capture; thumbnails do not count as additional screenshots.

The source images were captured with Chromium from the projects’ original local interfaces. No generated image or invented product interface is used in the gallery. Existing brand-site imagery and presentation content remain source-site material; marketing statistics visible there are not independently verified claims.

## Reproduction context

- Laravel interfaces ran in local PHP environments with SQLite or MariaDB demonstration databases. The original accountant and NIRSO applications used local PostgreSQL. The AI dashboard used its PostgreSQL/pgvector schema and synthetic tenant, customer, conversation, and session records.
- React/Flutter interfaces that require unavailable remote services used isolated browser API responses shaped to their original contracts. WISP, FoxTech, Relinka, YallaBook and the Flutter apps are examples. These captures demonstrate the interface, not live payment, routing, AI inference, stream delivery or external provider operation.
- Original AiL examples were compiled with its native Rust compiler. Its gallery includes the native task application and generated styling/template examples. The styling example's existing `toggleTheme()` helper was invoked locally because the example's declarative event binding is incomplete.
- Static marketing sites were captured from their original pages. Estratijiya’s landing screenshots use the original reduced-motion presentation so sections are shown fully without transitional blank frames.
- Empty screens retained in the collection are actual empty states or configuration forms. Loading gates, login redirects, video playback failures and duplicated image files were replaced during visual review.

## Local compatibility adjustments

The isolated demonstration checkouts needed some adjustments for offline assets and mobile presentation. These were **not pushed to their private repositories**: locally hosted fonts and Flutter CanvasKit, compatible dependency/build setup, Laravel component slot fallbacks, responsive sidebar/table sizing, and closing the original Filament sidebar before mobile capture. The native Next.js development indicator was disabled in the local accounting and NIRSO configurations, and all 60 affected captures were retaken. Safqa uses a local utility stylesheet for existing Tailwind classes mixed into its Bootstrap views. SalesFlow uses a local Tailwind build compatibility setup and its original Sortable module. Arkani bundles its intended Cairo/Tajawal fonts locally. Qasioun TV uses a local font fallback and a synthetic catalog with no remote stream playback.

Some source applications still have unrelated console warnings or unfinished integrations in this local environment. The portfolio was independently checked for browser errors. This work does not certify all 33 source applications for production or test every external service.

## Manifest

`src/portfolio/screenshots.json` records the original device, dimensions, route/state, timestamp, repository label, fixture description and source PNG SHA-256. Its `revision` is explicitly a **local-source-snapshot** digest of available project metadata files, not an upstream Git commit ID. `screenshots.compact.json` contains only the display fields needed by the portfolio runtime.

Source code, production databases, environment files, authentication cookies and local demo secrets remain outside this public repository.

## Illustrative catalog photography

The m3aak local demonstration catalog uses illustrative [Unsplash](https://unsplash.com/license) photographs for laptop, phone, shoes and watch records. They are synthetic catalog listings, not actual offers. Source photo identifiers: `photo-1517336714731-489689fd1ca8`, `photo-1511707171634-5f897ff02aa9`, `photo-1542291026-7eec264c27ff`, and `photo-1523275335684-37898b6baf30`. Images were stored through the original product-image relationship and rendered by the original marketplace; screenshots were not composited or painted over.
