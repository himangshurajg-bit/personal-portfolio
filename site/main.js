(() => {
  'use strict';
  const d = window.PORTFOLIO;
  if (!d) return;
  document.documentElement.classList.add('js');
  const text = (id, value) => { if(value) document.getElementById(id).textContent = value; };
  text('intro', d.introduction); text('about-copy',d.about); text('education', d.education);
  text('achievements',d.achievements); text('location',d.location);
  if(d.about && d.education && d.achievements && d.location) document.getElementById('bio-status').hidden = true;
  document.querySelector('.footer-name').textContent = d.name;
  document.title = d.name + ' — Selected work';
  const safeURL = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : '#work'; } catch { return '#work'; } };
  document.querySelectorAll('[data-github]').forEach(a => a.href = safeURL(d.github));
  const visuals = {
    orbit: '<div class="orbit-ring"></div><div class="orbit-ring two"></div><div class="orbit-ring three"></div><div class="orbit-core">ai.</div><span class="visual-bottom">PLAN → PREPARE → REVIEW</span><span class="visual-status">LOCAL-FIRST</span>',
    lecture: '<div class="lecture-window"><div class="window-bar"><i></i><i></i><i></i></div><div class="window-content"><div class="mini-slide"><small>LECTURE / 01</small>A moment<br>of clarity.<div class="slide-line"></div></div><div class="mini-notes"><span></span><span></span><span class="active-line"></span><span></span><span></span></div></div></div><span class="visual-bottom">SEARCH → SEEK → STUDY</span><span class="visual-status">WEB TOOL</span>'
  };
  const el = (tag, className, value) => {const n = document.createElement(tag); if(className)n.className=className; if(value)n.textContent=value; return n;};
  const grid = document.getElementById('projects');
  d.projects.forEach(p => {
    const card = el('article','project-card glass reveal');
    const visual = el('div','project-visual' + (p.visual === 'lecture' ? ' lecture-visual' : ''));
    visual.setAttribute('aria-hidden','true'); visual.innerHTML = visuals[p.visual] || visuals.orbit;
    visual.append(el('span','visual-label', p.language.toUpperCase() + ' / PROJECT STUDY'));
    const body=el('div','project-body'); body.append(el('div','project-category',p.category),el('h3','project-title',p.title),el('p','project-short',p.short),el('p','project-description',p.description));
    const tags = el('div','project-tags'); p.tags.forEach(t=>tags.append(el('span','',t))); body.append(tags);
    const a=el('a','project-link'); a.href=safeURL(p.url); a.target='_blank'; a.rel='noopener noreferrer'; a.setAttribute('aria-label','View '+p.title+' on GitHub (opens in a new tab)');
    a.append(el('span','','Explore repository'),el('span','link-circle glass-control','↗'));body.append(a); card.append(visual,body);grid.append(card);
  });
  document.querySelector('.section-count').textContent = String(d.projects.length).padStart(2,'0') + ' PROJECTS / GITHUB';
  if(d.skills.length){ const skills=document.getElementById('skills'); skills.replaceChildren();d.skills.forEach(s=>skills.append(el('span','skill glass',s)));text('skills-note','Skills and areas I’m learning.'); }
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(n=>observer.observe(n));}
  else document.querySelectorAll('.reveal').forEach(n=>n.classList.add('visible'));
  window.setTimeout(()=>document.querySelector('.loading-screen').classList.add('loaded'), motion.matches ? 0 : 450);
  const menuButton = document.querySelector('.menu-button'), menu = document.getElementById('mobile-nav');
  const closeMenu=()=>{ menu.hidden=true; menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation'); };
  menuButton.addEventListener('click',()=>{ const opened=menuButton.getAttribute('aria-expanded')==='true';menu.hidden=opened;menuButton.setAttribute('aria-expanded',String(!opened));menuButton.setAttribute('aria-label',opened?'Open navigation':'Close navigation'); });
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus();}});
  document.addEventListener('click',e=>{if(!menu.hidden&&!document.querySelector('.site-header').contains(e.target))closeMenu();});
  window.matchMedia('(min-width:681px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  const themeButton=document.querySelector('.theme-button');
  const setTheme=t=>{document.documentElement.dataset.theme=t;themeButton.setAttribute('aria-label','Switch to '+(t==='dark'?'light':'dark')+' theme');};
  try{const saved=localStorage.getItem('portfolio-theme');if(saved==='dark'||saved==='light')setTheme(saved);}catch{}
  themeButton.addEventListener('click',()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(t);try{localStorage.setItem('portfolio-theme',t);}catch{}});
  // Pointer-driven depth is limited to precise pointers; touch stays scroll-friendly.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const bindDepth = (node, xName, yName, amount) => {
    let frame = 0;
    const reset = () => { cancelAnimationFrame(frame); node.style.setProperty(xName,'0deg'); node.style.setProperty(yName,'0deg'); };
    node.addEventListener('pointermove', event => {
      if(motion.matches || !finePointer.matches) return;
      const rect=node.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5, y=(event.clientY-rect.top)/rect.height-.5;
      cancelAnimationFrame(frame); frame=requestAnimationFrame(()=>{node.style.setProperty(xName,(-y*amount)+'deg');node.style.setProperty(yName,(x*amount)+'deg');});
    },{passive:true});
    node.addEventListener('pointerleave',reset); motion.addEventListener('change',reset);
  };
  bindDepth(document.querySelector('.hero-art'),'--tilt-x','--tilt-y',12);
  document.querySelectorAll('.project-card').forEach(card=>bindDepth(card,'--card-rx','--card-ry',5));
  let scheduled=false;const updateProgress=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;document.querySelector('.scroll-progress').style.transform='scaleX('+(max>0?window.scrollY/max:0)+')';scheduled=false;};
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress);}},{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
  document.querySelectorAll('a,button').forEach(control=>control.addEventListener('pointerdown',e=>{if(motion.matches)return;const rect=control.getBoundingClientRect();const ripple=el('span','tap-ripple');ripple.style.left=(e.clientX-rect.left-5)+'px';ripple.style.top=(e.clientY-rect.top-5)+'px';ripple.setAttribute('aria-hidden','true');control.append(ripple);ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});}));
})();
