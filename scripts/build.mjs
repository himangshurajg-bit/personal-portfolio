import {cpSync, mkdirSync, rmSync, readFileSync, writeFileSync} from 'node:fs';
import vm from 'node:vm';
const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
const context = {window:{}};
vm.runInNewContext(readFileSync(new URL('site/content.js',root),'utf8'),context);
const d=context.window.PORTFOLIO;
const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL = value => {const url = new URL(value);if(url.protocol!=='https:')throw new Error('Expected public HTTPS project URL');return escape(url.href);};
// Reuse the same decorative markup as the progressive enhancement code.
const main = readFileSync(new URL('site/main.js',root),'utf8');
const visualSource=main.match(/const visuals = (\{[\s\S]*?\n  \});/);
if(!visualSource)throw new Error('Project visual definitions missing');
const visuals=vm.runInNewContext('('+visualSource[1]+')');
let html=readFileSync(new URL('site/index.html',root),'utf8');
for(const [id,value] of Object.entries({intro:d.introduction,'about-copy':d.about,education:d.education,achievements:d.achievements,location:d.location})){
  if(value)html=html.replace(new RegExp('(<[^>]+id="'+id+'"[^>]*>)[\\s\\S]*?(</[^>]+>)'),(_,open,close)=>open+escape(value)+close);
}
const cards=d.projects.map(p=>`<article class="project-card glass reveal"><div class="project-visual${p.visual==='lecture'?' lecture-visual':''}" aria-hidden="true">${visuals[p.visual]||visuals.orbit}<span class="visual-label">${escape(p.language.toUpperCase())} / PROJECT STUDY</span></div><div class="project-body"><div class="project-category">${escape(p.category)}</div><h3 class="project-title">${escape(p.title)}</h3><p class="project-short">${escape(p.short)}</p><p class="project-description">${escape(p.description)}</p><div class="project-tags">${p.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div><a class="project-link" href="${safeURL(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escape(p.title)} on GitHub (opens in a new tab)"><span>Explore repository</span><span class="link-circle glass-control">↗</span></a></div></article>`).join('');
html=html.replace('<div id="projects" class="project-grid"></div>',`<div id="projects" class="project-grid">${cards}</div>`);
rmSync(dist,{recursive:true,force:true});mkdirSync(dist,{recursive:true});
writeFileSync(new URL('index.html',dist),html);
for(const filename of ['style.css','content.js','main.js','favicon.svg','sitemap.xml'])cpSync(new URL('site/'+filename,root),new URL(filename,dist));
console.log('Built 6 static files into dist/, including prerendered portfolio content and sitemap. No runtime dependencies.');
