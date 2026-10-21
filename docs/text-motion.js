/* Progressive text choreography. Original text, order and accessible names stay intact.
   Short headings get letters; prose gets words. Nothing loops or waits to become usable. */
(() => {
  'use strict';
  const root=document.documentElement,reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const targets='h1,h2,h3,h4,p,a,button,summary,label,li,dt,dd,time,.eyebrow,.brand-name,.brand-icon,.project-category,.project-tags>span,.section-count,.hero-foot,.art-index,.orb-kicker,.orb-stage-note,.skill,.card-label';
  const exclude='script,style,noscript,textarea,input,select,option,svg,canvas,code,pre,output,[aria-live],[role="status"],.sr-only,.skip,.arrival,.tap-glow,.hero-neural-stage,.orb-model,text-run,text-fragment,text-letter';
  const pending=new Set(),waiting=new Set();
  let scheduled=false;
  const calm=()=>reduced.matches||root.classList.contains('ambient-paused');
  const insideHidden=n=>!!n.closest('[hidden],dialog:not([open]),details:not([open]) :not(summary)');
  const entered=n=>{
    if(root.classList.contains('entry-playing')){waiting.add(n);return}
    n.classList.add('text-arrived');
  };
  const observer='IntersectionObserver'in window?new IntersectionObserver(entries=>{
    for(const e of entries)if(e.isIntersecting&&!insideHidden(e.target)){entered(e.target);observer.unobserve(e.target)}
  },{threshold:0,rootMargin:'0px 0px -12px 0px'}):null;
  function prepare(host){
    if(!host?.isConnected||host.closest(exclude))return;
    const walker=document.createTreeWalker(host,NodeFilter.SHOW_TEXT),nodes=[];
    while(walker.nextNode()){
      const n=walker.currentNode,parent=n.parentElement;
      if(!n.textContent.trim()||!parent||parent.closest(exclude)||!parent.closest(targets))continue;
      nodes.push(n);
    }
    const groups=new Set();
    for(const text of nodes){
      const parent=text.parentElement,target=parent.closest(targets);
      if(!target||!target.isConnected)continue;
      const run=document.createElement('text-run');
      const heading=!!parent.closest('h1,h2,h3,h4')&&text.textContent.trim().length<90;
      const tokens=text.textContent.match(/\s+|\S+/g)||[];
      let index=0;
      for(const token of tokens){
        if(/^\s+$/.test(token)){run.append(document.createTextNode(token));continue}
        const word=document.createElement('text-fragment');
        word.style.setProperty('--text-step',String(Math.min(index++,18)));
        if(heading){
          let charIndex=0;
          for(const letter of token){const char=document.createElement('text-letter');char.textContent=letter;char.style.setProperty('--letter-step',String(Math.min(charIndex++,14)));word.append(char)}
        }else word.textContent=token;
        run.append(word);
      }
      text.replaceWith(run);groups.add(target);
    }
    for(const group of groups){
      group.classList.add('text-choreography');
      if(calm())group.classList.add('text-arrived');
      else if(group.classList.contains('text-arrived')){
        // A live label changed: animate only the freshly inserted run, never the rest of the page.
        group.querySelectorAll(':scope > text-run:not([data-played])').forEach(n=>{n.dataset.played='true';n.classList.add('text-updated')});
      }else observer?observer.observe(group):entered(group);
    }
  }
  function flush(){scheduled=false;const list=[...pending];pending.clear();for(const n of list)prepare(n)}
  function queue(n){if(!n?.isConnected||n.closest(exclude))return;pending.add(n);if(!scheduled){scheduled=true;requestAnimationFrame(flush)}}
  prepare(document.body);
  new MutationObserver(records=>{
    for(const change of records){
      if(change.type==='childList'){
        // Ignore wrappers created here; handle newly opened previews and rewritten controls.
        for(const n of change.addedNodes){
          if(n.nodeType===1&&!n.matches('text-run,text-fragment,text-letter')&&!n.closest(exclude))queue(n);
          else if(n.nodeType===3&&n.textContent.trim())queue(n.parentElement);
        }
      }else if(change.type==='characterData')queue(change.target.parentElement);
    }
  }).observe(document.body,{childList:true,subtree:true,characterData:true});
  const finishEntry=()=>{
    for(const n of waiting)if(n.isConnected)n.classList.add('text-arrived');waiting.clear();
    // Hero letters replay after the cinematic entry; offscreen prose still waits for first entry.
    if(!calm()){
      const hero=document.querySelector('.hero-copy');
      hero?.querySelectorAll('.text-arrived').forEach(n=>{
        n.classList.remove('text-arrived');requestAnimationFrame(()=>requestAnimationFrame(()=>n.classList.add('text-arrived')));
      });
    }
  };
  document.addEventListener('portfolio:entry-end',finishEntry);
  // Details and dialogs may be reopened: replay their visible text once per explicit open.
  document.addEventListener('toggle',e=>{
    const host=e.target;
    if(!(host instanceof Element)||!host.matches('details,dialog')||(!host.open))return;
    requestAnimationFrame(()=>{
      prepare(host);
      if(calm())return;
      host.querySelectorAll('.text-choreography').forEach(n=>{n.classList.remove('text-arrived');requestAnimationFrame(()=>n.classList.add('text-arrived'))});
    });
  },true);
  const settle=()=>{if(calm()){document.querySelectorAll('.text-choreography').forEach(n=>n.classList.add('text-arrived'));waiting.clear()}};
  reduced.addEventListener('change',settle);
  new MutationObserver(settle).observe(root,{attributes:true,attributeFilter:['class']});
})();
