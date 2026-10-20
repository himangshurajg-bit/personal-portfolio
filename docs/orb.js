// Loaded only when Explore the orb is activated. No renderer, network assets or continuous JS loop.
let initialized=false;
export function openOrb(){
  const dialog=document.getElementById('orb-dialog'), stage=dialog.querySelector('.orb-stage');
  if(!initialized){initialize(dialog,stage);initialized=true;}
  dialog.showModal();document.documentElement.classList.add('orb-exploring');stage.focus();
}
function initialize(dialog,stage){
  const rotation=dialog.querySelector('.orb-rotation'),model=dialog.querySelector('.orb-model');
  const sculpture=document.querySelector('.hero-art .ai-core').cloneNode(true);sculpture.classList.add('explorer-core');
  sculpture.querySelector('.core-readout').remove();rotation.append(sculpture);
  const shell=sculpture.querySelector('.core-shell');
  const latitudes=document.createElement('div');latitudes.className='core-latitudes';
  for(let i=0;i<5;i++){const line=document.createElement('i');line.style.setProperty('--latitude',i);latitudes.append(line);}shell.append(latitudes);
  const facets=document.createElement('div');facets.className='core-facets';
  for(let i=0;i<8;i++){const node=document.createElement('i');node.style.setProperty('--facet',i);facets.append(node);}sculpture.querySelector('.core-assembly').append(facets);
  const motion=matchMedia('(prefers-reduced-motion: reduce)'), zoomLabel=dialog.querySelector('.orb-zoom-label');
  const play=dialog.querySelector('[data-orb="play"]'),mode=dialog.querySelector('[data-orb="mode"]'),detail=dialog.querySelector('#orb-detail');
  const status=dialog.querySelector('.orb-status'),copy=dialog.querySelector('#orb-detail-copy');
  let x=-10,y=-15,z=1,panX=0,panY=0,panning=false,paused=motion.matches,frame=0,savedScroll=0,lastTap=null,dragged=false;
  const pointers=new Map();let gesture=null;
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const render=()=>{frame=0;const r=stage.getBoundingClientRect();panX=clamp(panX,-r.width*.65*(z-.6),r.width*.65*(z-.6));panY=clamp(panY,-r.height*.65*(z-.6),r.height*.65*(z-.6));model.style.transform=`translate3d(${panX}px,${panY}px,0) scale(${z})`;rotation.style.transform=`rotateX(${x}deg) rotateY(${y}deg)`;zoomLabel.value=z.toFixed(1)+'×';stage.dataset.zoom=z.toFixed(2);stage.dataset.rx=x.toFixed(1);stage.dataset.ry=y.toFixed(1);stage.dataset.pan=panX.toFixed(1)+','+panY.toFixed(1);dialog.classList.toggle('orb-still',paused);play.textContent=paused?'Motion: off':'Motion: on';play.setAttribute('aria-pressed',String(!paused));mode.textContent=panning?'Pan: on':'Pan: off';mode.setAttribute('aria-pressed',String(panning));stage.classList.toggle('pan-mode',panning);};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(render)};
  const pause=()=>{paused=true;schedule()};
  const zoom=(value,px=0,py=0)=>{const next=clamp(value,1,4),ratio=next/z;panX=px-(px-panX)*ratio;panY=py-(py-panY)*ratio;z=next;pause()};
  const reset=()=>{x=-10;y=-15;z=1;panX=panY=0;panning=false;paused=motion.matches;detail.value='whole';dialog.dataset.detail='whole';copy.textContent=descriptions.whole;schedule();status.textContent='Full view restored.';};
  const descriptions={whole:'A layered glass sculpture. Select a detail to focus, or double-tap any point to zoom toward it.',shell:'Glass shell — a translucent surface with a bright reflected edge. Pan to follow the rim at close range.',grid:'Meridian lattice — crossing longitude and latitude lines describe the spherical volume. Rotate it to inspect the depth.',rings:'Gyroscopic rings — three nested circular frames around the core. Drag to examine their intersecting planes.',core:'Luminous nucleus — the glowing center beneath the shell. Motion pauses so you can study the layered light.'};
  dialog.querySelector('.orb-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{pointers.clear();gesture=null;cancelAnimationFrame(frame);frame=0;document.documentElement.classList.remove('orb-exploring');document.getElementById('orb-open').focus({preventScroll:true});});
  dialog.addEventListener('pointerdown',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.querySelectorAll('[data-orb]').forEach(button=>button.addEventListener('click',()=>{const action=button.dataset.orb;if(action==='in')zoom(z*1.25);if(action==='out')zoom(z/1.25);if(action==='reset')reset();if(action==='mode'){panning=!panning;schedule()}if(action==='play'){paused=!paused;schedule()}if(action==='in'||action==='out')status.textContent='Zoom '+z.toFixed(1)+' times.';}));
  detail.addEventListener('change',()=>{const part=detail.value;dialog.dataset.detail=part;copy.textContent=descriptions[part];x=-10;y=-15;panX=panY=0;z=part==='whole'?1:part==='rings'?1.45:part==='shell'?2.3:2.8;paused=true;schedule();status.textContent=part==='whole'?'Whole sculpture selected.':detail.selectedOptions[0].textContent+' focused.';});
  const point=e=>{const r=stage.getBoundingClientRect();return {x:e.clientX-r.left-r.width/2,y:e.clientY-r.top-r.height/2}};
  const seedGesture=()=>{const a=[...pointers.values()];if(a.length===2)gesture={distance:Math.hypot(a[1].x-a[0].x,a[1].y-a[0].y),mid:{x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2}};else gesture=null;};
  stage.addEventListener('pointerdown',e=>{if(e.button>0)return;stage.focus({preventScroll:true});stage.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{...point(e),start:point(e)});dragged=false;seedGesture();pause();});
  stage.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;const old=pointers.get(e.pointerId),next=point(e);if(Math.hypot(next.x-old.start.x,next.y-old.start.y)>5)dragged=true;pointers.set(e.pointerId,{...next,start:old.start});const a=[...pointers.values()];if(a.length===2){const mid={x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2},distance=Math.hypot(a[1].x-a[0].x,a[1].y-a[0].y);if(gesture&&gesture.distance>4){zoom(z*distance/gesture.distance,gesture.mid.x,gesture.mid.y);panX+=mid.x-gesture.mid.x;panY+=mid.y-gesture.mid.y;}gesture={distance,mid};dragged=true;}else if(a.length===1){if(panning||e.shiftKey){panX+=next.x-old.x;panY+=next.y-old.y;}else{x=clamp(x-(next.y-old.y)*.45,-85,85);y=(y+(next.x-old.x)*.45)%360;}}schedule();});
  const release=e=>{const pos=pointers.get(e.pointerId);if(!pos)return;const single=pointers.size===1;pointers.delete(e.pointerId);seedGesture();if(e.type==='pointerup'&&!dragged&&single){const now=performance.now();if(lastTap&&now-lastTap.time<350&&Math.hypot(pos.x-lastTap.x,pos.y-lastTap.y)<25){zoom(z<3?z*1.7:1,pos.x,pos.y);lastTap=null;}else lastTap={...pos,time:now};}if(e.type!=='pointerup')lastTap=null;};
  stage.addEventListener('pointerup',release);stage.addEventListener('pointercancel',release);stage.addEventListener('lostpointercapture',e=>{pointers.delete(e.pointerId);seedGesture();});
  stage.addEventListener('wheel',e=>{e.preventDefault();const p=point(e);zoom(z*Math.exp(-clamp(e.deltaY,-100,100)*.003),p.x,p.y);},{passive:false});
  stage.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','0',' '].includes(e.key))e.preventDefault();else return;const sign=(e.key==='ArrowLeft'||e.key==='ArrowUp')?-1:1;if(e.key.startsWith('Arrow')){pause();if(e.shiftKey){if(e.key==='ArrowLeft'||e.key==='ArrowRight')panX+=sign*24;else panY+=sign*24;}else if(e.key==='ArrowLeft'||e.key==='ArrowRight')y+=sign*12;else x=clamp(x-sign*12,-85,85);}if(e.key==='+'||e.key==='=')zoom(z*1.25);if(e.key==='-')zoom(z/1.25);if(e.key==='0')reset();if(e.key===' ')paused=!paused;schedule();});
  motion.addEventListener('change',()=>{if(motion.matches){paused=true;schedule()}});
  new ResizeObserver(()=>{if(dialog.open)schedule()}).observe(stage);
  dialog.dataset.detail='whole';render();
}
