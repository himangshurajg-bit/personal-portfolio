const {chromium}=require('/home/user/workspace/lecture-slide-finder/node_modules/.pnpm/playwright@1.64.1/node_modules/playwright');
const fs=require('fs'),http=require('http'),path=require('path'),assert=require('assert/strict');
(async()=>{
 const live=process.env.LIVE_URL;let server;if(!live){server=http.createServer((req,res)=>{try{const file=path.join(process.cwd(),'docs',new URL(req.url,'http://x').pathname.replace(/\/$/,'/index.html'));res.setHeader('Content-Type',({'html':'text/html','js':'text/javascript','css':'text/css'}[file.split('.').pop()]||'application/octet-stream'));res.end(fs.readFileSync(file))}catch{res.writeHead(404).end()}});await new Promise(r=>server.listen(0,r))}
 const url=live||'http://localhost:'+server.address().port+'/',browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});
 try{
  const ctx=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'no-preference'}),page=await ctx.newPage();
  await page.goto(url,{waitUntil:'networkidle'});
  const before=await page.evaluate(()=>getComputedStyle(document.querySelector('.section-heading h2'),'::after').transform);
  await page.evaluate(()=>window.scrollTo(0,document.querySelector('.section-heading').offsetTop));
  await page.waitForFunction(()=>{const el=document.querySelector('.section-heading');return el.classList.contains('visible') && getComputedStyle(el.querySelector('h2'),'::after').transform!=='none';});
  await page.waitForTimeout(900);
  const after=await page.evaluate(()=>getComputedStyle(document.querySelector('.section-heading h2'),'::after').transform);
  assert.notEqual(after,'none');console.log('PASS heading underline wipe animates on reveal (before:',before,'after:',after,')');
  await ctx.close();
  const reduced=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'reduce'}),rp=await reduced.newPage();
  await rp.goto(url,{waitUntil:'networkidle'});
  await rp.evaluate(()=>window.scrollTo(0,document.querySelector('.section-heading').offsetTop));
  await rp.waitForTimeout(400);
  const rt=await rp.evaluate(()=>getComputedStyle(document.querySelector('.section-heading h2'),'::after').transitionDuration);
  assert.equal(rt,'0s','reduced-motion should have no transition');console.log('PASS reduced-motion disables heading underline animation');
  await reduced.close();
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),mp=await mobile.newPage();
  await mp.goto(url,{waitUntil:'networkidle'});
  await mp.locator('.section-heading').first().scrollIntoViewIfNeeded();await mp.waitForTimeout(900);
  const mt=await mp.evaluate(()=>getComputedStyle(document.querySelector('.section-heading h2'),'::after').transform);
  assert.notEqual(mt,'none');console.log('PASS heading underline wipe works on mobile width');await mobile.close();
 }finally{await browser.close();if(server)await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exitCode=1});
