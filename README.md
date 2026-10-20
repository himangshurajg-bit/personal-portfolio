# Himangshu Raj Gogoi — Liquid-glass portfolio

A runnable, exportable static portfolio website. This is a local draft, not a published website. No hosting, account or paid service is required to preview it.

## Quick preview

Open `dist/index.html` in a modern browser, or run this from the extracted folder:

```sh
python3 -m http.server 4175 --directory dist
```

Then visit http://localhost:4175 on the same computer. Stop with Ctrl+C. Alternatively use any local static web server.

## Edit and rebuild

- `site/content.js`: biography, education, public location and project descriptions/links.
- `site/index.html`: section headings, hero and contact section markup.
- `site/style.css`: responsive design, light/dark themes and motion.
- `site/main.js`: navigation, rendering, theme, ripple and scroll effects.

After edits, run `npm run build` (Node.js 18 or newer) or `node scripts/build.mjs`. There is no npm install step or dependency download. The finished static website is in `dist/`. Changes in `site/` do not change `dist/` until rebuilt.

## Content boundaries

Included owner-supplied facts: Class 12 at New Star Senior Secondary School; Majpather, Tinkhong, Dibrugarh, Assam, India.

Projects link to public repositories:
- https://github.com/himangshurajg-bit/Personal-agentic-ai
- https://github.com/himangshurajg-bit/lecture-slide-finder

Descriptions and project languages were drawn from public GitHub repository metadata/READMEs on 20 October 2026. Project artwork is an original conceptual illustration, not a screenshot of those products. Python and TypeScript are labeled as project technologies, not a claim about personal proficiency.

Achievements and the personal skills list await owner input; visible placeholders are honest. The direct contact destination is intentionally unset. The Contact me section links only to the public GitHub profile, with no form or pretend message delivery. When the owner selects a destination, change the contact paragraph and `#contact-link` in `site/index.html`; `content.contact` is currently only reserved metadata and does not wire a contact button. Do not add private email, phone, or other personal details without choosing what to make public.

The water-drop visual direction follows the requested liquid-glass treatment. Included desktop and mobile previews show the implemented design. No existing GitHub repositories were modified and nothing was deployed.

## Design and accessibility

Water-drop depth, translucent surfaces, highlighted borders, glass typography accents, tap ripples, scroll reveals, loading animation and a persistent light/dark switch. Semantic HTML, keyboard skip link, visible focus, mobile navigation with Escape support and reduced-motion alternatives are included. Text is kept readable rather than making all body lettering transparent.

There are no external fonts, analytics, form services or third-party scripts. Theme choice is the only localStorage item. JavaScript is required for rendering the project cards; core bio, navigation and contact content remain in HTML.

## Checked

`QA-report.json` records 13 passing Chromium checks, including mobile navigation, five viewport widths (320–1440px), loading completion, scroll reveal, persisted theme, reduced motion, keyboard navigation and no JavaScript runtime errors. Desktop and Pixel 7 emulation were used, not a physical Android phone. The preview screenshots were visually inspected. This is not a full accessibility audit or a test on every browser/device.
