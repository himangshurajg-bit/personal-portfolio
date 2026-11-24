const {chromium}=require('/home/user/workspace/lecture-slide-finder/node_modules/.pnpm/playwright@1.64.1/node_modules/playwright');
const fs=require('fs'),http=require('http'),path=require('path'),assert=require('assert/strict');
(async()=>{
 const live=process.env.LIVE_URL;let server;if(!live){server=http.createServer((req,res)=>{try{const file=path.join(process.cwd(),'docs',new URL(req.url,'http://x').pathname.replace(/\/$/,'/index.html'));res.setHeader('Content-Type',({'html':'text/html','js':'text/javascript','css':'text/css','svg':'image/svg+xml','webp':'image/webp','woff2':'font/woff2'})[file.split('.').pop()]||'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.writeHead(404).end()}});await new Promise(r=>server.listen(0,r))}const url=live||'http://localhost:'+server.address().port+'/#work',browser=await chromium.launch({headless:true});
 try{
  const desktop=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'no-preference'}),page=await desktop.newPage();
  await page.goto(url,{waitUntil:'networkidle'});const card=page.locator('[data-project="music"]');await card.scrollIntoViewIfNeeded();
  let box=await card.boundingBox();await page.mouse.move(box.x+box.width*.2,box.y+box.height*.22,{steps:3});
  await page.waitForFunction(()=>{const n=document.querySelector('[data-project="music"]');return n.classList.contains('card-tilting')&&n.style.getPropertyValue('--card-rx')!=='0deg'&&n.style.getPropertyValue('--card-ry')!=='0deg'});
  const first=await card.evaluate(n=>[n.style.getPropertyValue('--card-rx'),n.style.getPropertyValue('--card-ry')]);
  box=await card.boundingBox();await page.mouse.move(box.x+box.width*.82,box.y+box.height*.78,{steps:5});await page.waitForTimeout(60);
  const second=await card.evaluate(n=>[n.style.getPropertyValue('--card-rx'),n.style.getPropertyValue('--card-ry')]);assert.notDeepEqual(first,second,'tilt should follow pointer position');
  await page.mouse.move(5,5);await page.waitForFunction(()=>!document.querySelector('[data-project="music"]').classList.contains('card-tilting'));
  assert.equal(await card.evaluate(n=>[n.style.getPropertyValue('--card-rx'),n.style.getPropertyValue('--card-ry')].every(v=>v==='0deg')),true);console.log('PASS desktop card tilt tracks pointer and resets on leave');
  await page.mouse.move(box.x+box.width*.25,box.y+box.height*.3);await page.waitForFunction(()=>document.querySelector('[data-project="music"]').classList.contains('card-tilting'));
  await page.locator('.ambient-toggle').click();await page.waitForFunction(()=>!document.querySelector('[data-project="music"]').classList.contains('card-tilting'));
  box=await card.boundingBox();await page.mouse.move(box.x+box.width*.75,box.y+box.height*.6,{steps:2});await page.waitForTimeout(80);assert.equal(await card.evaluate(n=>n.classList.contains('card-tilting')),false);console.log('PASS ambient pause disables card tilt and clears its pose');
  await desktop.close();
  const reduced=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),rp=await reduced.newPage();await rp.goto(url,{waitUntil:'networkidle'});const rc=rp.locator('[data-project="music"]');await rc.scrollIntoViewIfNeeded();box=await rc.boundingBox();await rp.mouse.move(box.x+box.width*.2,box.y+box.height*.2,{steps:2});await rp.waitForTimeout(80);assert.equal(await rc.evaluate(n=>n.classList.contains('card-tilting')),false);console.log('PASS reduced-motion preference disables card tilt');await reduced.close();
  const touch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'no-preference'}),tp=await touch.newPage();await tp.goto(url,{waitUntil:'networkidle'});assert.equal(await tp.evaluate(()=>matchMedia('(hover: hover) and (pointer: fine)').matches),false);const tc=tp.locator('[data-project="music"]');await tc.scrollIntoViewIfNeeded();box=await tc.boundingBox();await tp.mouse.move(box.x+box.width*.2,box.y+box.height*.2,{steps:2});await tp.waitForTimeout(80);assert.equal(await tc.evaluate(n=>n.classList.contains('card-tilting')),false);console.log('PASS touch layout does not enable pointer tilt');await touch.close();
 }finally{await browser.close();if(server)await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exitCode=1});
