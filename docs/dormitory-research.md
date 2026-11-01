# Dormitory rental, contact and photo review

Checked **2026-10-05**; updated **2026-11-01**. The 33 published dormitories have research records. Sala Residence was removed because its identity and current information could not be confirmed. Missing values for published dormitories are empty arrays in data and display **Not available** on `/dorms/[id]`.

## Data and UI

- `data/dormitories.ts` contains the published dormitories. Electricity, water and student survey ratings for retained dormitories are read from that file without changing their survey values.
- `data/research/{campus,front-gates,soi,other}.json` stores room offers and public business contact evidence separately. Each found value includes source URL, checked date and verification status. `data/dormitory-research.ts` defines the types and imports these files.
- `components/ResearchValues.tsx` displays per-value sources, status and uncertainty notes. Detail pages separate rental, contacts and source information. Monthly rent is not calculated from semester fees. Advance payments are not presented as a complete move-in total unless the source states one.
- Existing verified fields are not replaced by newer third-party claims. Different sources and conflicts remain visible. Source checked date, source publication date and effective price date are different facts.

## Verification limits

**Verified** means the information was directly published by an identified official dormitory or university source. This does not mean a phone call was made or a room is currently available. **Needs verification** covers old or undated prices, conflicting values, third-party contacts and uncertain building identities. Currently all rental amounts still require direct confirmation of their current applicability. Official published contacts are verified where supported.

Developer sales contacts for Kave, Zelle and Elite are labelled with their role; they are not presented as confirmed rental offices. Private agent/student contacts are excluded. I Condo phase is unspecified, so ambiguous phase-specific offers were not imported. Sala Residence identity could not be reliably established, so it is excluded from the published list.

Detailed findings:

- [Campus research](research-campus.md)
- [Front university and Gates5/6](research-front-gates.md)
- [Soi Ban Tang Sin](research-soi.md)
- [Other areas](research-other.md)

## Photos

Exterior photos replaced room photos for Ribbin, V.A. and 4SunDorm. Added Kave's named entrance, Crystal Place's named entrance and the official Ramathibodi Salaya collage. The collage includes an exterior but is not a standalone front photograph. Retained existing sourced images where a newer matched exterior could not be established.

Publication/capture dates are generally **Not available**, so the site does not claim these photographs are the latest. Potential Bundit Home / Crystal Place nighttime renderings were excluded after visual review. The real Crystal Place entrance photograph was used instead. Zelle's survey building is unknown; no photograph from a new phase was substituted.

`data/dormitory-image-sources.json` records exact original image URLs, source pages, checked dates and file dimensions. `data/dormitory-photo-review.json` records all 33 published dormitory photo reviews. [Photo audit](dormitory-photos.md).

## Validation

- Production build, TypeScript and ESLint.
- Node tests: retained survey data hash, all 33 research records, evidence provenance, preserved price/deposit conflicts, image files and audits and existing comparison behavior.
- HTTP checks for published detail pages, home, listing, comparison and unknown ID 404.

These are source reviews, not confirmation of 2026 room availability or guaranteed current prices. The website exposes these limits beside the affected values.
