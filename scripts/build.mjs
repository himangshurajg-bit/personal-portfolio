import {cpSync, mkdirSync, rmSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
rmSync(dist,{recursive:true,force:true});mkdirSync(dist,{recursive:true});
for(const filename of ['index.html','style.css','content.js','main.js','favicon.svg']){readFileSync(new URL('site/'+filename,root));cpSync(new URL('site/'+filename,root),new URL(filename,dist));}
console.log('Built 5 static files into dist/. No runtime dependencies or paid services.');
