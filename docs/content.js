/* Public repository evidence reviewed 20 October 2026. These are project technologies,
   not a self-rated personal proficiency list. Do not add secrets or invented milestones. */
window.PORTFOLIO = {
 name:'Himangshu Raj Gogoi', initials:'HG',
 headline:['Ideas, made','tangible.'],
 introduction:'Student developer · AI explorer · Building useful tools.',
 github:'https://github.com/himangshurajg-bit',
 about:'I’m Himangshu Raj Gogoi. I’m 17 years old and currently studying in Class 12 at New Star Senior Secondary School. I’m also preparing for the JEE exam. Here, I share the projects I’m working on and the ideas I’m exploring.',
 education:'Class 12\nNew Star Senior Secondary School',achievements:'',location:'Majpather No. 1, Tinkhong, Dibrugarh, Assam, India',skills:[],contact:'himangshurajg@gmail.com',
 projects:[
 {id:'agent',title:'Personal-agentic-ai',category:'01 / PERSONAL AI',short:'Useful preparation. Clear boundaries.',
 description:'A local-first assistant starter that plans bounded tasks, keeps local notes and asks for exact draft approval. A tested starter, not a production assistant.',
 problem:'Everyday tasks need useful preparation without quietly sending messages or taking consequential actions.',
 built:'A Python planner with validated tool steps, SQLite memory, deterministic local commands and exact draft reviews. The local web studio makes those boundaries visible.',
 takeaway:'A preview is not permission. Validating a plan again before execution and invalidating changed approvals are explicit design boundaries in the code.',
 limit:'No message sending or connected social accounts. Live-model inference is still unverified. The web studio needs a local Python server; the Android package is experimental.',
 language:'Python',languages:'Python · Java · JavaScript · HTML',tags:['AI','Python','Local-first','SQLite'],filters:['ai','web'],
 tech:'Python standard library · SQLite · vanilla HTML/CSS/JavaScript · Java (Android prototype)',
 url:'https://github.com/himangshurajg-bit/Personal-agentic-ai',image:'media/agent-preview.webp',alt:'Actual local Personal-agentic-ai web studio showing a calculation plan preview and draft review panel.',
 imageNote:'Actual local web studio · calculation preview · no external action',commit:'3c105217a6e994d89ac50086db5837f83f3dc559',updated:'2026-10-20',demo:null},
 {id:'lecture',title:'lecture-slide-finder',category:'02 / STUDY TOOLS',short:'Find the moment. Keep the idea.',
 description:'Search a timestamped transcript, jump to a lecture moment and collect notes. A matching frame shows a slide only when one is visible in the video.',
 problem:'Finding one useful explanation inside a long lecture can mean a lot of scrubbing and lost context.',
 built:'A local-first TypeScript lecture player with SRT/VTT/JSON imports, keyword search, timestamp seeking, video-frame previews and Markdown note export.',
 takeaway:'A video frame is not automatic slide recognition. The implementation keeps that distinction visible, bounds imports and escapes transcript text and exported notes.',
 limit:'Keyword search, not semantic AI search. No automatic slide detection or OCR. Notes stay in the current tab until exported. The published web snapshot does not transcribe on Android.',
 language:'TypeScript',languages:'TypeScript · CSS · Java · Python',tags:['Study tools','Web development','TypeScript','Vite'],filters:['study','web'],
 tech:'TypeScript · native DOM · Vite · Playwright · Python transcription utility · Java Android host',
 url:'https://github.com/himangshurajg-bit/lecture-slide-finder',image:'media/lecture-preview.webp',alt:'Actual lecture-slide-finder web interface with local lecture player, searchable transcript and study notes.',
 imageNote:'Actual web interface · repository test capture with synthetic lecture',commit:'dd1e018a727c0bd752e24b1f2b510be8edcabedd',updated:'2026-10-20',demo:'previews/lecture/'}
 ]
};
