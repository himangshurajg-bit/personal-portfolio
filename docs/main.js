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
  document.title = d.name + ' | Portfolio & GitHub Projects';
  const safeURL = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : '#work'; } catch { return '#work'; } };
  document.querySelectorAll('[data-github]').forEach(a => a.href = safeURL(d.github));
  const visuals = {
    orbit: '<div class="orbit-ring"></div><div class="orbit-ring two"></div><div class="orbit-ring three"></div><div class="orbit-core">ai.</div><span class="visual-bottom">PLAN → PREPARE → REVIEW</span><span class="visual-status">LOCAL-FIRST</span>',
    lecture: '<div class="lecture-window"><div class="window-bar"><i></i><i></i><i></i></div><div class="window-content"><div class="mini-slide"><small>LECTURE / 01</small>A moment<br>of clarity.<div class="slide-line"></div></div><div class="mini-notes"><span></span><span></span><span class="active-line"></span><span></span><span></span></div></div></div><span class="visual-bottom">SEARCH → SEEK → STUDY</span><span class="visual-status">WEB TOOL</span>'
  };
  const el = (tag, className, value) => {const n = document.createElement(tag); if(className)n.className=className; if(value)n.textContent=value; return n;};
  const grid = document.getElementById('projects');
  grid.replaceChildren(); // Static HTML remains available to crawlers and no-JavaScript visitors.
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
  // Small stagger adds a flowing entrance without delaying access to content.
  document.querySelectorAll('.project-card,.about-grid .info-card').forEach((n,i)=>n.style.setProperty('--reveal-delay',(i%3)*75+'ms'));
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(n=>observer.observe(n));}
  else document.querySelectorAll('.reveal').forEach(n=>n.classList.add('visible'));
  window.setTimeout(()=>{document.querySelector('.loading-screen').classList.add('loaded');document.documentElement.classList.add('entered');}, motion.matches ? 0 : 800);
  document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('motion-paused',document.hidden));
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
  // Cinematic type remains one accessible label; decorative characters are hidden.
  document.querySelectorAll('.name-title>span,h2').forEach((heading,index)=>{
    const label=heading.innerText; heading.setAttribute('aria-label',label);
    const letters=el('span','kinetic-type'); letters.setAttribute('aria-hidden','true');
    [...label].forEach((char,i)=>{if(char==='\n'){letters.append(document.createElement('br'));return;}const span=el('span',char===' '?'kinetic-letter kinetic-space':'kinetic-letter',char===' '?'\u00a0':char);span.style.setProperty('--letter',i);letters.append(span);});
    heading.replaceChildren(letters);heading.classList.add('kinetic-heading');
  });
  // Thin corner tracers sit inside the existing surface; no additional blur layers.
  document.querySelectorAll('.project-card,.info-card,.closing-section,.glass-plane').forEach(surface=>{
    const frame=el('span','liquid-edges');frame.setAttribute('aria-hidden','true');
    for(let i=0;i<4;i++){const corner=el('i','edge-corner');corner.style.setProperty('--corner',i);frame.append(corner);}
    surface.append(frame);
  });
  document.querySelectorAll('.hero-copy>.eyebrow,.hero-tagline,.hero-intro,.hero-actions,.hero-foot,.hero-art').forEach((n,i)=>{n.classList.add('enter-layer');n.style.setProperty('--entry',i);});
  // Run perpetual details only near the viewport, including after scrolling back.
  if('IntersectionObserver' in window){const activity=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('motion-active',e.isIntersecting)),{rootMargin:'90px'});document.querySelectorAll('.hero,.project-card,.info-card,.closing-section').forEach(n=>activity.observe(n));}
  // Bounded double-wave refraction and a damped press, for touch AND mouse.
  document.querySelectorAll('a,button').forEach(control=>{
    const burst=(event)=>{
      if(motion.matches)return;
      const rect=control.getBoundingClientRect();
      const x=event.clientX===0?rect.width/2:event.clientX-rect.left;
      const y=event.clientY===0?rect.height/2:event.clientY-rect.top;
      control.querySelectorAll('.liquid-burst').forEach(n=>n.remove());
      const wave=el('span','liquid-burst');wave.setAttribute('aria-hidden','true');wave.style.left=x+'px';wave.style.top=y+'px';control.append(wave);
      const size=Math.min(200,Math.max(rect.width,rect.height)*1.3);
      const animation=wave.animate([{transform:'translate(-50%,-50%) scale(.05)',opacity:.85},{transform:'translate(-50%,-50%) scale(1)',opacity:0}],{duration:850,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});
      wave.style.width=size+'px';wave.style.height=size+'px';animation.onfinish=()=>wave.remove();window.setTimeout(()=>wave.remove(),1100);
      if(control.matches('.button,.glass-control,.project-link'))control.animate([{scale:'1'},{scale:'.95',offset:.2},{scale:'1.025',offset:.55},{scale:'1'}],{duration:540,easing:'cubic-bezier(.22,1,.36,1)'});
    };
    control.addEventListener('pointerdown',burst,{passive:true});
    control.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')burst({clientX:0,clientY:0});});
  });
  motion.addEventListener('change',()=>{if(motion.matches){document.querySelectorAll('.liquid-burst').forEach(n=>n.remove());document.getAnimations().filter(a=>a.effect?.target?.classList?.contains('liquid-burst')).forEach(a=>a.cancel());}});
})();
