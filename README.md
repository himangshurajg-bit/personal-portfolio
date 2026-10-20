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

A nonblocking fixed layer gives every primary pointer-down, including blank areas, a liquid-glass impact. It is capped at four live impacts, with six shards per impact, and cleans up each impact after 1.4 seconds. A single local illumination follows pointer contact/swipe and fades on release or native-scroll cancellation; a subtle edge light follows scrolling. No gesture is captured or prevented. Theme switches and local section links have temporary transitions. Continuous core motion pauses outside the hero viewport and when the document is hidden. Reduced-motion preferences disable the new motion and illumination; the static sculpture and content remain available without JavaScript.

`tests/core-orb-check.cjs` covers core structure, blank-area and touch feedback, rapid-input cleanup, light following/fading, three theme palettes and persistence, navigation, offscreen pause, responsive overflow, reduced motion and no-JavaScript content/tag preservation. These checks use Chromium desktop and Pixel 7 emulation, not physical-device performance tests.

## Interactive glass orb

Choose **Explore the orb** for a separate, gesture-isolated explorer. Drag to rotate; pinch, wheel or +/− to zoom 1–4×. Double-tap a chosen point to zoom towards it. Pan mode (or Shift+drag) moves a magnified detail. Detail presets isolate the shell, lattice, rings and nucleus. Arrow keys rotate; Shift+arrows pan; +/− zoom; 0 resets; Space pauses motion; Escape exits. The orb is decorative artwork, not an AI service.

The explorer module loads only on demand. Background motion pauses while it is open; touching the model pauses automatic motion. Reduced-motion settings and the readable no-JavaScript portfolio remain supported. Rendering is CSS 3D with no WebGL or external model dependency.

Performance work removes the forced 800ms splash delay and invisible loader/backplate animations, reuses prerendered project cards, reduces simultaneous tap particles, and avoids animated full-page blur on coarse-pointer devices. There is no real-device frame-rate guarantee.

`tests/atelier-check.cjs` covers interaction, accessibility, content and responsive behavior using Playwright Chromium (set `PLAYWRIGHT_MODULE` when using a nonlocal installation). `tests/orb-performance.cjs <static-root> <report-path>` records three CPU-throttled Pixel 7-emulated idle samples; these laboratory measurements are not physical-phone FPS.
