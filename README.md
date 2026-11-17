# Common Ground

A speculative three-page website for the Future Vision assignment. Earth, 2086: communities share knowledge, memory, and care through a living internet.

## Open the project

Open **dist/index.html** in a current browser. The main pages, illustrations, and navigation work without an internet connection. For consistent browser-local saving, serve the folder locally:

```sh
python3 -m http.server 4173 --directory dist
```

Then visit http://localhost:4173. No installation or build is required.

## Submission contents

- `dist/index.html` — the future vision and doorway into the world.
- `dist/garden.html` — filter and explore six fictional seeds; keep favorites, plant a personal seed, and remove it.
- `dist/agreement.html` — community principles, speculative timeline, design responsibilities, and source references.
- `dist/styles.css` — responsive layouts using CSS Flexbox; typography, color, interaction, and reduced-motion rules.
- `dist/app.js` — local interactions and optional synthesized sound.
- `dist/assets/` — eight original SVG illustrations, including the favicon.
- `REFLECTION.md` — the 250–400 word submission reflection. Also included as `dist/reflection.txt`.
- `RESEARCH.md` — sources, design process, and limitations.
- `scripts/build-pages.py` — optional source generator for HTML and SVGs. The website does not require Python to run.

## Interaction notes

The six founding seeds and their residents are fictional. Personal seeds and pocket selections use localStorage only; nothing is sent to another person. Browser storage varies by origin and may be unavailable in private or restricted modes. If storage fails, the page explains that changes last for the current visit. Audio begins only after clicking the soundscape button and pauses when the tab is hidden. Escape closes dialogs.

## Reflection

The reflection describes the concept developed for this submission. Personalize its first-person wording if you want it to reflect your own experiences more specifically.

## Suggested submission type

Choose **File Upload** and upload `common-ground-submission.zip`. This includes the design folder and reflection. A hosted preview is supplemental; the folder is self-contained.

## Revised garden

Start with the guided story to see how a seed becomes a bud, then a flower. Plant a contribution and find it under **My seeds**. Open it and use **Add chapter & grow** to continue the story. One added chapter produces a bud; two produce a full flower. Additional chapters remain in its history. Your added chapters can be removed individually. Fictional examples already contain three chapters.

The revised reflection incorporates the supplied peer and instructor feedback and remains within 250–400 words. `RESEARCH.md` maps feedback to design changes.

To regenerate HTML and artwork, run `python3 scripts/build-pages.py` followed by `node scripts/build-flowers.cjs`. The delivered `dist/` folder is already ready to use.
