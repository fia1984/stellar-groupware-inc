# Stellar Homepage QA Handoff

Reviewed page: https://stellar-groupware-inc.vercel.app/

## Confirmed homepage bug fixed

### Tablet navigation breakpoint mismatch

The CSS changes to the mobile navigation at 1050px, but the React click handlers were treating widths up to 1250px as mobile. Between 1051px and 1250px, the Training, Process, and About parent links could prevent normal navigation even though the desktop navigation was still visible.

Fix: the three dropdown triggers now use the same `(max-width: 1050px)` breakpoint as the CSS. Desktop/tablet links now navigate normally, while the compact mobile menu still opens its submenus.

## Items checked and confirmed

- Hero section has one active pair of action buttons at a time; no duplicate hero button is rendered.
- The repeated “Book Free Consultation” buttons appear in separate consultation sections and are intentional calls to action, not overlapping duplicate elements.
- Hero previous/next controls and four slide indicators are present and accessible.
- The green contact bubble remains fixed, visible, keyboard-accessible, and directly linked to the Stellar email address.
- Homepage sections use responsive one-column layouts at narrow widths for pathway, offer, audience, struggle, mentoring, expert, and consultation cards.
- The live desktop homepage had no confirmed horizontal layout overflow or overlapping visible controls during inspection.
- Policy route layout was also corrected after QA: the Email Preferences page no longer leaves an empty teal hero strip above the cards, and the policy heading is visible.
- The Email Preferences list contains one Important Service Notices option rather than a duplicate.

## Verification

- `npm test -- --run` — 16 tests passed
- `npm run build` — production build passed
