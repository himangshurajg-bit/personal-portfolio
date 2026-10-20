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
  const needsCards = !grid.querySelector('.project-card'); // Reuse prerendered content instead of rebuilding the same DOM.
  if(needsCards) d.projects.forEach(p => {
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
  requestAnimationFrame(()=>{document.querySelector('.loading-screen').classList.add('loaded');document.documentElement.classList.add('entered');window.loaderReleaseMs=performance.now();});
  document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('motion-paused',document.hidden));
  const menuButton = document.querySelector('.menu-button'), menu = document.getElementById('mobile-nav');
  const closeMenu=()=>{ menu.hidden=true; menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation'); };
  menuButton.addEventListener('click',()=>{ const opened=menuButton.getAttribute('aria-expanded')==='true';menu.hidden=opened;menuButton.setAttribute('aria-expanded',String(!opened));menuButton.setAttribute('aria-label',opened?'Open navigation':'Close navigation'); });
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus();}});
  document.addEventListener('click',e=>{if(!menu.hidden&&!document.querySelector('.site-header').contains(e.target))closeMenu();});
  window.matchMedia('(min-width:681px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  const orbOpen=document.getElementById('orb-open');let orbModule;
  orbOpen.addEventListener('click',async()=>{orbOpen.disabled=true;try{orbModule ||= import('./orb.js');(await orbModule).openOrb();}catch{orbModule=null;orbOpen.textContent='Retry orb explorer';}finally{orbOpen.disabled=false;}});
  const themeButton=document.querySelector('.theme-button');
  const themeSelect=document.getElementById('theme-select');
  const setTheme=t=>{document.documentElement.dataset.theme=t;themeSelect.value=t;themeButton.setAttribute('aria-label','Switch to '+(t==='light'?'dark':'light')+' theme');};
  try{const saved=localStorage.getItem('portfolio-theme');if(['dark','light','devil'].includes(saved))setTheme(saved);}catch{}
  themeSelect.addEventListener('change',()=>{setTheme(themeSelect.value);try{localStorage.setItem('portfolio-theme',themeSelect.value);}catch{}});
  themeButton.addEventListener('click',()=>{const t=document.documentElement.dataset.theme==='light'?'dark':'light';setTheme(t);try{localStorage.setItem('portfolio-theme',t);}catch{}});
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
    const copy=heading.cloneNode(true); copy.querySelectorAll('br').forEach(br=>br.replaceWith(document.createTextNode('\n')));
    const label=copy.textContent; heading.setAttribute('aria-label',label.replace(/\s+/g,' ').trim());
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
  // Non-blocking glass impacts include empty areas; at most two live effects.
  const impactLayer=el('div','global-glass-fx'); impactLayer.setAttribute('aria-hidden','true');document.body.append(impactLayer);
  const impact=(event)=>{
    if(document.querySelector('#orb-dialog[open]')||motion.matches||event.isPrimary===false||event.button>0)return;
    while(impactLayer.querySelectorAll('.glass-impact').length>=2)impactLayer.querySelector('.glass-impact').remove();
    const hit=el('span','glass-impact');hit.style.left=event.clientX+'px';hit.style.top=event.clientY+'px';
    hit.append(el('i','impact-lens'),el('i','impact-ring'),el('i','impact-ring two'));
    for(let i=0;i<3;i++){const shard=el('i','impact-shard');shard.style.setProperty('--shard',i);hit.append(shard);}
    impactLayer.append(hit);window.setTimeout(()=>hit.remove(),1400);
  };
  document.addEventListener('pointerdown',impact,{passive:true});
  // One local light follows a press/swipe without capturing or cancelling the gesture.
  const touchLight=el('div','touch-illumination');touchLight.setAttribute('aria-hidden','true');impactLayer.append(touchLight);
  let lightPointer=null, lightFrame=0, lightTimer=0;
  const illuminate=event=>{if(motion.matches||document.querySelector('#orb-dialog[open]'))return;cancelAnimationFrame(lightFrame);lightFrame=requestAnimationFrame(()=>{touchLight.style.left=event.clientX+'px';touchLight.style.top=event.clientY+'px';touchLight.classList.add('illuminated');});};
  document.addEventListener('pointerdown',event=>{if(event.isPrimary===false||event.button>0||motion.matches)return;lightPointer=event.pointerId;clearTimeout(lightTimer);illuminate(event);},{passive:true});
  document.addEventListener('pointermove',event=>{if(event.pointerId===lightPointer)illuminate(event);},{passive:true});
  const dim=()=>{lightPointer=null;lightTimer=window.setTimeout(()=>touchLight.classList.remove('illuminated'),400);};
  document.addEventListener('pointerup',dim,{passive:true});document.addEventListener('pointercancel',dim,{passive:true});
  const scrollLight=el('div','scroll-illumination');scrollLight.setAttribute('aria-hidden','true');document.body.append(scrollLight);let scrollTimer=0;
  window.addEventListener('scroll',()=>{if(motion.matches)return;scrollLight.classList.add('illuminated');clearTimeout(scrollTimer);scrollTimer=window.setTimeout(()=>scrollLight.classList.remove('illuminated'),180);},{passive:true});

  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');if(!link||motion.matches)return;
    const target=document.getElementById(link.getAttribute('href').slice(1));if(!target)return;
    target.classList.remove('section-arriving');void target.offsetWidth;target.classList.add('section-arriving');
    window.setTimeout(()=>target.classList.remove('section-arriving'),1100);
  });
  const themeWash=()=>{if(motion.matches)return;document.querySelectorAll('.theme-wash').forEach(n=>n.remove());const wash=el('div','theme-wash');wash.setAttribute('aria-hidden','true');document.body.append(wash);window.setTimeout(()=>wash.remove(),900);};
  themeSelect.addEventListener('change',themeWash);themeButton.addEventListener('click',themeWash);
  document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('page-asleep',document.hidden));
  motion.addEventListener('change',()=>{if(motion.matches){impactLayer.querySelectorAll('.glass-impact').forEach(n=>n.remove());cancelAnimationFrame(lightFrame);lightPointer=null;touchLight.classList.remove('illuminated');scrollLight.classList.remove('illuminated');document.querySelectorAll('.theme-wash').forEach(n=>n.remove());}});
  // Bounded double-wave refraction and a damped press, for touch AND mouse.
  document.querySelectorAll('a,button').forEach(control=>{
    const burst=(event)=>{
      if(motion.matches)return;
      if(control.closest('#orb-dialog'))return;
      const rect=control.getBoundingClientRect();
      const x=event.clientX===0?rect.width/2:event.clientX-rect.left;
      const y=event.clientY===0?rect.height/2:event.clientY-rect.top;
      control.querySelectorAll('.liquid-burst').forEach(n=>n.remove());
      const devil=document.documentElement.dataset.theme==='devil';
      const wave=el('span',devil?'liquid-burst devil-burst':'liquid-burst');
      if(devil){for(let i=0;i<3;i++){const slash=el('i','devil-claw');slash.style.setProperty('--claw',i);wave.append(slash);}}wave.setAttribute('aria-hidden','true');wave.style.left=x+'px';wave.style.top=y+'px';control.append(wave);
      const size=Math.min(200,Math.max(rect.width,rect.height)*1.3);
      const frames=devil?[{transform:'translate(-50%,-50%) rotate(-18deg) scale(.08)',opacity:1,borderRadius:'45% 55% 44% 56%'},{transform:'translate(-50%,-45%) rotate(6deg) scale(.7)',opacity:.8,offset:.35,borderRadius:'30% 60% 55% 40%'},{transform:'translate(-50%,-25%) rotate(-4deg) scale(1)',opacity:0,borderRadius:'38% 42% 60% 65%'}]:[{transform:'translate(-50%,-50%) scale(.05)',opacity:.85},{transform:'translate(-50%,-50%) scale(1)',opacity:0}];
      const animation=wave.animate(frames,{duration:devil?950:850,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});
      wave.style.width=size+'px';wave.style.height=size+'px';animation.onfinish=()=>wave.remove();window.setTimeout(()=>wave.remove(),1100);
      if(control.matches('.button,.glass-control,.project-link'))control.animate([{scale:'1'},{scale:'.95',offset:.2},{scale:'1.025',offset:.55},{scale:'1'}],{duration:540,easing:'cubic-bezier(.22,1,.36,1)'});
    };
    control.addEventListener('pointerdown',burst,{passive:true});
    control.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')burst({clientX:0,clientY:0});});
  });
  motion.addEventListener('change',()=>{if(motion.matches){document.querySelectorAll('.liquid-burst').forEach(n=>n.remove());document.getAnimations().filter(a=>a.effect?.target?.classList?.contains('liquid-burst')).forEach(a=>a.cancel());}});
})();
