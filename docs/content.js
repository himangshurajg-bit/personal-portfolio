/* Public repository evidence reviewed 21 October 2026. These are project technologies,
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
 description:'A local-first assistant starter that plans bounded tasks, keeps local notes and asks for exact draft approval. Development main now also adds offline, user-authored Android study decks with due-card reviews; they need no AI or network.',
 problem:'Everyday tasks need useful preparation without quietly sending messages or taking consequential actions.',
 built:'A Python planner with validated tool steps, SQLite memory, deterministic local commands and exact draft reviews. The local web studio makes those boundaries visible. Development main adds paginated notebook browsing, Unicode-aware literal note search and notes-only JSONL export, plus a Flutter/Dart Android app with a local notebook and editable flashcard decks, a due-review queue and deterministic Again/Hard/Good/Easy intervals. Cards are user-authored, not AI-generated.',
 takeaway:'A preview is not permission. Validating a plan again before execution and invalidating changed approvals are explicit design boundaries in the code.',
 limit:'The flashcard slice passed 27 Flutter tests and both hosted API36 native integration tests, including local study-record persistence across reload and restart. Physical Redmi/HyperOS behavior is untested. No message sending or connected social accounts; live-model inference is still unverified. The web studio needs a local Python server. The 0.3 Android APK is a private development test, not a public release. The study cards do not generate lessons or estimate mastery. Existing Python releases do not include the Android additions; JSONL exports are plaintext, not encrypted backups.',
 language:'Python',languages:'Dart · Python · Kotlin · Java · JavaScript · HTML · Shell',tags:['AI','Android','Flutter','Python','Local-first','SQLite'],filters:['ai','web'],
 tech:'Python standard library · SQLite · Flutter/Dart · Android/Kotlin and Java · vanilla HTML/CSS/JavaScript',
 url:'https://github.com/himangshurajg-bit/Personal-agentic-ai',image:'media/agent-preview.webp',alt:'Actual local Personal-agentic-ai web studio showing a calculation plan preview and draft review panel.',
 imageNote:'20 Oct Python web-studio capture · the newer Android app and flashcards are not shown',commit:'5c9cb8cd3609bcee91850751d8bbb3c7f94f4053',updated:'2026-10-21',demo:null},
 {id:'lecture',title:'lecture-slide-finder',category:'02 / STUDY TOOLS',short:'Find the moment. Keep the idea.',
 description:'Search a timestamped transcript, jump to a lecture moment and collect notes. A matching frame shows a slide only when one is visible in the video. A separate Android 1.00.0.00 stable APK adds offline English/Hindi transcription and visible-text OCR.',
 problem:'Finding one useful explanation inside a long lecture can mean a lot of scrubbing and lost context.',
 built:'A local-first TypeScript lecture player with SRT/VTT/JSON imports, keyword search, timestamp seeking, video-frame previews and Markdown note export. The separate stable Android APK bundles English/Hindi speech recognition, a sequential decoded-frame gallery, offline OCR and local transcript/note recovery. Current source restores saved text locally; the video must be selected again.',
 takeaway:'A video frame is not automatic slide recognition. The implementation keeps that distinction visible, bounds imports and escapes transcript text and exported notes.',
 limit:'The embedded web snapshot uses keyword search, not semantic AI search; it has no automatic slide detection or OCR, and its notes stay in the current tab until exported. It does not transcribe on Android. The separate stable APK passed Android 16 emulator checks, not physical-phone or older-version qualification. Speech and OCR can be wrong; equations and small text need review. Export important notes; clearing local data can erase them. The APK is a self-signed GitHub sideload, not a Play Store release.',
 language:'TypeScript',languages:'TypeScript · CSS · Java · Python',tags:['Study tools','Web development','TypeScript','Vite'],filters:['study','web'],
 tech:'TypeScript · native DOM · Vite · Playwright · Python transcription utility · Java Android host',
 url:'https://github.com/himangshurajg-bit/lecture-slide-finder',image:'media/lecture-preview.webp',alt:'Actual lecture-slide-finder web interface with local lecture player, searchable transcript and study notes.',
 imageNote:'20 Oct web snapshot · synthetic lecture · not the newer native Android app',commit:'fb9a6f66ce6b4221d911eb36ea7137d65b99720a',updated:'2026-10-20',release:{label:'Android 1.00.0.00 stable',url:'https://github.com/himangshurajg-bit/lecture-slide-finder/releases/tag/android-v1.00.0.00-stable'},demo:'previews/lecture/'}
 ]
};
