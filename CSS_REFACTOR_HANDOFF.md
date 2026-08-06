# CSS Refactor Handoff

## What changed

- Replaced the 19,330-line `src/index.css` with a small global import entry point.
- Moved the existing CSS into 16 ordered files under `src/styles/`.
- Grouped styles by page or concern: foundation/navigation, Home, Pricing, shared pages, header/navigation, Appointment, Reviews, Enrollment, Training, Process, and About.
- Removed the duplicate `import "./index.css"` from `src/App.tsx`; `src/main.tsx` remains the single global CSS entry.
- Preserved every original CSS rule and the original cascade order.

## Why some pages have more than one CSS file

The original stylesheet contained later responsive and QA overrides for several pages. Those overrides remain in separately named files and are imported after the earlier page rules so the website keeps the same appearance.

## Verification

- Production build: passed (`npm run build`)
- Automated tests: 8 of 8 passed (`npm test -- --run`)

## Future rule

Add new styles to the relevant page/component stylesheet instead of appending them to `src/index.css`. Keep the import order in `src/index.css` stable unless cascade changes are intentional and fully tested.
