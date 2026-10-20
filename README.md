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
