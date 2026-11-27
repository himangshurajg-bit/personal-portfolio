const {chromium}=require('/home/user/workspace/lecture-slide-finder/node_modules/.pnpm/playwright@1.64.1/node_modules/playwright');
const fs=require('fs'),http=require('http'),path=require('path'),assert=require('assert/strict');
(async()=>{
 const live=process.env.LIVE_URL;let server;
 if(!live){server=http.createServer((req,res)=>{try{const file=path.join(process.cwd(),'docs',new URL(req.url,'http://x').pathname.replace(/\/$/,'/index.html'));res.setHeader('Content-Type',({'html':'text/html','js':'text/javascript','css':'text/css','svg':'image/svg+xml','webp':'image/webp','woff2':'font/woff2'})[file.split('.').pop()]||'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.writeHead(404).end()}});await new Promise(r=>server.listen(0,r))}
 const url=live||'http://localhost:'+server.address().port+'/#work',browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'no-preference'}),page=await context.newPage();
  await page.goto(url,{waitUntil:'networkidle'});
  const card=page.locator('[data-project="music"]');
  await card.scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>{
   const visual=document.querySelector('[data-project="music"] .project-visual');
   return visual && visual.style.getPropertyValue('--image-shift')!=='';
  });
  const before=await card.evaluate(n=>parseFloat(n.querySelector('.project-visual').style.getPropertyValue('--image-shift')));
  const beforeRect=await card.locator('.project-visual img').boundingBox();
  assert(Number.isFinite(before),'desktop initial parallax variable should be numeric');
  assert(beforeRect.height>0 && beforeRect.width>0,'project image should be laid out');

  await page.evaluate(()=>window.scrollBy({top:650,behavior:'instant'}));
  await page.waitForFunction(expected=>{
   const visual=document.querySelector('[data-project="music"] .project-visual');
   return visual && Math.abs(parseFloat(visual.style.getPropertyValue('--image-shift'))-expected)>.5;
  },before);
  const after=await card.evaluate(n=>parseFloat(n.querySelector('.project-visual').style.getPropertyValue('--image-shift')));
  assert(Number.isFinite(after) && Math.abs(after)>.1,'scrolling should set a nonzero image offset');
  assert(Math.sign(after)!==Math.sign(before)||Math.abs(after-before)>.1,'scrolling should move the image offset');
  console.log('PASS project image parallax changes as the card crosses the viewport');

  // The shift is small and the cover image is slightly overscanned so moving
  // it cannot expose the visual frame.
  const visualRect=await card.locator('.project-visual').boundingBox(), imageRect=await card.locator('.project-visual img').boundingBox();
  assert(imageRect.y<=visualRect.y+1 && imageRect.y+imageRect.height>=visualRect.y+visualRect.height-1,'overscanned image should cover the visual frame');
  console.log('PASS parallax overscan covers the project visual');

  await page.locator('.ambient-toggle').click();
  await page.waitForFunction(()=>{
   const visual=document.querySelector('[data-project="music"] .project-visual');
   return visual && visual.style.getPropertyValue('--image-shift')==='0px';
  });
  console.log('PASS ambient pause resets project image parallax');
  await context.close();

  const reduced=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),rp=await reduced.newPage();
  await rp.goto(url,{waitUntil:'networkidle'});
  const rc=rp.locator('[data-project="music"]'); await rc.scrollIntoViewIfNeeded();
  await rp.evaluate(()=>window.scrollBy({top:650,behavior:'instant'}));
  await rp.waitForTimeout(100);
  assert.equal(await rc.evaluate(n=>n.querySelector('.project-visual').style.getPropertyValue('--image-shift')),'0px');
  console.log('PASS reduced-motion preference disables project image parallax');
  await reduced.close();

  const touch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'no-preference'}),tp=await touch.newPage();
  await tp.goto(url,{waitUntil:'networkidle'});
  const tc=tp.locator('[data-project="music"]'); await tc.scrollIntoViewIfNeeded();
  await tp.waitForFunction(()=>{
   const visual=document.querySelector('[data-project="music"] .project-visual');
   return visual && visual.style.getPropertyValue('--image-shift')!=='';
  });
  const touchShift=await tc.evaluate(n=>parseFloat(n.querySelector('.project-visual').style.getPropertyValue('--image-shift')));
  assert(Number.isFinite(touchShift) && Math.abs(touchShift)<=5,'mobile parallax should use the smaller bounded offset');
  console.log('PASS touch/mobile uses the smaller bounded project image offset');
  await touch.close();
 }finally{await browser.close();if(server)await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exitCode=1});
