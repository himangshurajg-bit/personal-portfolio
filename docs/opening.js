/* A decorative, nonblocking arrival. The portfolio underneath stays usable. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  try { paused = localStorage.getItem('portfolio-ambient-paused') === 'true'; } catch {}
  if (reduced.matches || paused || location.hash || document.hidden) return;
  const arrival = document.createElement('div');
  arrival.className = 'arrival';
  const artwork = document.createElement('div');
  artwork.className = 'arrival-art';
  artwork.setAttribute('aria-hidden', 'true');
  artwork.innerHTML = `<div class="arrival-pane arrival-pane-a"></div><div class="arrival-pane arrival-pane-b"></div><div class="arrival-orbit"><svg viewBox="0 0 400 400" fill="none"><defs><linearGradient id="arrival-light"><stop stop-color="currentColor" stop-opacity="0"/><stop offset=".5" stop-color="currentColor"/><stop offset="1" stop-color="currentColor" stop-opacity=".1"/></linearGradient></defs><g stroke="url(#arrival-light)"><ellipse cx="200" cy="200" rx="168" ry="64"/><ellipse cx="200" cy="200" rx="168" ry="64" transform="rotate(60 200 200)"/><ellipse cx="200" cy="200" rx="168" ry="64" transform="rotate(120 200 200)"/><path class="arrival-signal" d="M30 210 94 210 120 170 150 230 182 188 200 200 228 160 260 212 300 190 370 190"/></g><circle cx="200" cy="200" r="104" stroke="currentColor" stroke-opacity=".18" stroke-dasharray="2 15"/></svg><div class="arrival-monogram">h<span>.</span></div><span class="arrival-label">IDEAS INTO REALITY</span></div><div class="arrival-horizon"></div>`;
  const skip = document.createElement('button');
  skip.type = 'button'; skip.className = 'arrival-skip'; skip.textContent = 'Skip intro';
  arrival.append(artwork, skip);
  document.body.append(arrival);
  let timer;
  const cleanup = () => {
    clearTimeout(timer); arrival.remove();
    ['pointerdown','keydown','wheel','touchstart','hashchange','pagehide'].forEach(type => window.removeEventListener(type, cleanup, true));
    document.removeEventListener('visibilitychange', visibility);
    reduced.removeEventListener('change', cleanup);
  };
  const visibility = () => { if (document.hidden) cleanup(); };
  // Any interaction dismisses the decoration, without cancelling the action or moving focus.
  ['pointerdown','keydown','wheel','touchstart','hashchange','pagehide'].forEach(type => window.addEventListener(type, cleanup, {capture:true,passive:true}));
  skip.addEventListener('click', cleanup);
  document.addEventListener('visibilitychange', visibility);
  reduced.addEventListener('change', cleanup);
  timer = setTimeout(cleanup, 1800);
})();
