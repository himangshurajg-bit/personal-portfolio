# Himangshu Raj Gogoi — Personal portfolio

Liquid-glass personal portfolio with an animated 3D name treatment, layered glass sculpture, pointer depth, responsive layout, light/dark themes, reduced-motion support, loading and scroll animations.

Live site: https://himangshurajg-bit.github.io/personal-portfolio/

## Edit and publish

Edit `site/content.js` for portfolio content, `site/index.html`, `site/style.css` and `site/main.js` for presentation.

Run `npm run build` (no package installation needed), then copy the six files in `dist/` into `docs/`, retaining `docs/.nojekyll`. Commit and push to main. GitHub Pages publishes from `main:/docs`.

Preview locally with `npm run preview`, or serve `docs/` using `python3 -m http.server 4175 --directory docs`.

## Content boundaries

Education and location were supplied by the owner. Personal skills and achievements are unset. The owner authorized the visible contact email `himangshurajg@gmail.com`; Email me opens a native mailto link, not a form or server-side delivery service. Project language labels describe repository technologies, not a claimed personal skill list.

No backend, analytics, contact-form submissions, paid services or runtime dependencies.

## Search discovery

The build prerenders the biography, education, location and project cards in the initial HTML. JavaScript progressively enhances the same content without duplicate cards. The published page includes a descriptive title/description, canonical URL, factual ProfilePage/Person structured data and social-sharing metadata. `sitemap.xml` lists the canonical single-page homepage.

No `robots.txt` is added inside this project path: robots rules apply only from the host root (`https://himangshurajg-bit.github.io/robots.txt`), not from `/personal-portfolio/robots.txt`. A missing root robots file does not by itself block crawling. No unrelated root-site configuration is changed.

### Google Search Console ownership step (not yet completed)

1. In your own Search Console account, add a URL-prefix property with exactly `https://himangshurajg-bit.github.io/personal-portfolio/`.
2. Choose HTML tag verification. Keep Google's exact `google-site-verification` meta tag/token; it must come from your account, not a made-up value. Publish that tag in `site/index.html`, rebuild and copy to `docs/`. The HTML-file method is also possible if Google offers it: publish its exact file at the property path Google specifies.
3. Click Verify in Search Console after the live tag/file is present. Keep the verification material published.
4. Submit `sitemap.xml` (full URL: `https://himangshurajg-bit.github.io/personal-portfolio/sitemap.xml`) and use URL Inspection for the canonical homepage, then Request indexing if eligible.

No Search Console property was created, verified or submitted by this source update. Search inclusion/ranking and timing remain Google's decision. Sitemap and structured data are useful signals, not guarantees.

Official guidance:
- https://support.google.com/webmasters/answer/9008080?hl=en
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt


## Visual core and touch lighting

The hero includes a decorative 3D glass core built with CSS meridians and gyroscopic rings. It is not an AI assistant, microphone, connection status or functional AI feature. Light, Dark and Red devil each tint the core and all interaction lighting. No additional external dependency or service is used.

The current editorial revision uses one short nonblocking tap-light ring instead of the earlier particle field. Continuous hero motion pauses outside its viewport or in hidden documents. Reduced-motion preferences disable decorative movement; the static content remains available without JavaScript.

`tests/core-orb-check.cjs` covers core structure, blank-area and touch feedback, rapid-input cleanup, light following/fading, three theme palettes and persistence, navigation, offscreen pause, responsive overflow, reduced motion and no-JavaScript content/tag preservation. These checks use Chromium desktop and Pixel 7 emulation, not physical-device performance tests.

## Interactive glass orb

Choose **Explore the orb** for a separate, gesture-isolated explorer. Drag to rotate; pinch, wheel or +/− to zoom 1–4×. Double-tap a chosen point to zoom towards it. Pan mode (or Shift+drag) moves a magnified detail. Detail presets isolate the shell, lattice, rings and nucleus. Arrow keys rotate; Shift+arrows pan; +/− zoom; 0 resets; Space pauses motion; Escape exits. The orb is decorative artwork, not an AI service.

The explorer module loads only on demand. Background motion pauses while it is open; touching the model pauses automatic motion. Reduced-motion settings and the readable no-JavaScript portfolio remain supported. The original CSS explorer has been upgraded to on-demand WebGL geometry; see the current 3D implementation below. No external model or renderer dependency is added.

Performance work removes the forced 800ms splash delay and invisible loader/backplate animations, reuses prerendered project cards, reduces simultaneous tap particles, and avoids animated full-page blur on coarse-pointer devices. There is no real-device frame-rate guarantee.

`tests/atelier-check.cjs` covers interaction, accessibility, content and responsive behavior using Playwright Chromium (set `PLAYWRIGHT_MODULE` when using a nonlocal installation). `tests/orb-performance.cjs <static-root> <report-path>` records three CPU-throttled Pixel 7-emulated idle samples; these laboratory measurements are not physical-phone FPS.

## Content-first portfolio revision (20 October 2026)

The hero keeps the owner's name and “Ideas, made tangible.” immediately readable, with 550ms one-time entrances, 75ms/150ms staggers, compositor-only glass lighting, a short student-developer/AI-explorer role and project/GitHub calls to action. Project cards use actual screenshots, local filters, accessible links, progressive case studies and pinned repository snapshots. Section reveals take 450ms; card/focus responses take 250ms; the sticky navigation underline takes 230ms. There is no blocking splash screen.

Source evidence:
- Personal-agentic-ai: `3c105217a6e994d89ac50086db5837f83f3dc559`. The screenshot is a real capture of its local Python web studio after previewing a calculation in a fresh temporary database. No real message was sent. There is no hosted assistant backend; its inspectable preview is clearly a screenshot.
- lecture-slide-finder: `dd1e018a727c0bd752e24b1f2b510be8edcabedd`. Its screenshot is the repository's actual synthetic-lecture test capture. `site/previews/lecture/` contains the built web snapshot, loaded into an iframe only on request, or opened as a full web demo. An embedding-only guard suppresses its beforeunload prompt inside the preview, while retaining the warning at top level. Preview text tells visitors to export notes before closing. Original source, behavior and limitations remain linked. The snapshot uses no UI framework or paid API; no on-device ASR claim is made.
- Metadata and language snapshots were checked on 20 October 2026. No automatic fetch or activity-feed claim; no invented skill percentages, education dates, achievements, personal learning history, resume or nonfunctional contact form.

### Actual 3D orb explorer

`orb.js` now powers both the visible home-page orb and an on-demand detailed explorer. The home scene initializes independently after immediately readable content; a CSS preview remains as the no-WebGL/no-JavaScript fallback. The explorer uses actual sphere and torus triangle meshes, depth testing, mesh normals, lit Fresnel-style glass shading and a luminous nucleus; the glass is a stylized shader, not physically simulated ray-traced refraction. Five small mesh satellites add depth. No third-party renderer or model download is required.

Touch rotation, pinch/wheel/button zoom (1–4×), double-tap focus, pan, four detail presets, keyboard interaction, pause/reset and exit remain. New **Separate layers**, **Show mesh** and quality controls expose the geometry. Auto quality favors lower geometry and 1× device pixels on coarse-pointer devices; Detailed is capped at 2× pixels. Motion is capped at 30 fps, reduces quality under sustained slow frames, stops when closed/hidden/offscreen and starts paused for reduced motion. Paused interactions render on demand. WebGL failure falls back to the existing simplified CSS sculpture with controls; it is labelled as a fallback.

`tests/editorial-check.cjs` validates content, project previews, filters, case studies, no-JavaScript and reduced-motion behavior, responsive widths, theme persistence and actual WebGL interactions. Tests use Chromium and Pixel 7 touch emulation, not a physical phone or GPU benchmark. Screenshot and laboratory performance evidence are in `evidence/` (not auto-published as website content). Rendering caps are work limits, not guaranteed device frame rates.

Latest interaction refinements add bounded squash/stretch tap lenses and a 290ms small control spring, including empty portfolio areas and same-origin embedded-preview touches. At most two lenses are present; they are pointer-transparent and removed after 650ms. Reduced motion uses only a brief static glow. Native smooth anchor scrolling respects the sticky-header offset, and reduced motion scrolls immediately. One narrow glass edge light fades during scrolling; a maximum 12px hero-depth offset is written only while the hero is in view. No scroll hijacker, wheel cancellation or inertia library is used outside the deliberate orb stage.

### Luminous interaction layer
The ambient wallpaper uses CSS perspective and six-faced glass solids, not a second WebGL renderer. Desktop shows three solids; mobile/reduced-data shows two. Transform-only movement pauses while hidden or exploring the orb, and the lower-right Pause ambient motion control saves its preference locally. Reduced-motion preferences disable travel/bounce and retain brief static feedback. Control activation uses a bounded Web Animations spring. Each tap emits a local lens and a viewport-spanning wave; at most two survive for 1.15 seconds, with no gesture capture. Orb-stage gestures retain only local feedback to avoid distracting from inspection. Project previews and their source content are unchanged.

Checks: `node tests/luminous-check.cjs` exercises the refinements; `node tests/luminous-regression.cjs` runs the full prior portfolio/3D interaction regression with the longer wave cleanup time. `LIVE_URL=https://himangshurajg-bit.github.io/personal-portfolio/` targets deployment instead of the local server. Emulated browser tests do not establish physical-phone frame rates.

### Neural-light 3D artwork
The on-demand explorer now renders a spatial branching tube network with shader-lit halos and smooth outward travelling pulses. It is generative artwork, not a brain scan, neural recording or AI activity. The low-power network has 18 paths and Detailed has 40, allocated once rather than growing particles. Battery saver omits the extra halo pass and reduces tube tessellation; Detailed retains a separate additive halo. The glass orb itself gently floats, rotates and breathes with the signal phase; its shell, nucleus, satellites and gyroscopic rings have coordinated layered motion. Manual gestures pause automatic motion for inspection. The Neural light toggle and new detail preset are keyboard accessible. Hidden/offscreen/closed scenes stop rendering; pause freezes orbital movement and signal phase together. Reduced motion freezes travel/breathing and cannot be overridden with Space. No rapid flashing or strobing is used. WebGL failure preserves the labelled CSS fallback, honestly disabling unavailable neural controls.

`node tests/neural-check.cjs` checks neural triangle budgets, coordinated motion, frozen pause state, keyboard toggles, themes, hidden-page/reduced-motion changes, mobile pinch, seven widths and the no-WebGL fallback. `node tests/neural-performance.cjs <static-root> <report-path>` records three active-orb samples using CPU-throttled Pixel 7 emulation and software WebGL; this is not physical-phone GPU evidence or a performance guarantee. The home-page orb now uses the same genuine spatial WebGL meshes and signal shaders, without opening the explorer. All portfolio content and ambient wallpaper are retained.

### Home neural scene
The home hero now visibly floats, rotates and breathes with branching spatial neural-light pulses. A pointer-transparent WebGL canvas preserves native scrolling; manual orbit/pinch/inspection remains in the explorer. Home signals can be toggled by touch or keyboard. The saved ambient pause also freezes the home orb, and reduced motion renders on demand without an animation loop. Home rendering pauses offscreen, while hidden, during a project preview and while exploring the inner orb, so the two WebGL scenes do not animate simultaneously. Mobile starts at 18 paths and at most 0.85 pixel ratio; desktop starts at up to 1.25 pixels and adapts to sustained slow frames. These are render-budget caps, not guaranteed frame rates. CSS glass and navigation remain available without WebGL.

`node tests/home-neural-check.cjs` verifies visible coordinated home movement, theme palettes, pause persistence, signal toggles, renderer handoff, offscreen/hidden pauses, reduced motion, native mobile scroll, navigation and fallbacks.
