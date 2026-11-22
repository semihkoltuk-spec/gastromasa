const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),output=path.join(root,'public');
const files=['index.html','data-loader.js','style.css','i18n.js','languages.js','security.js','app.js','map.js','venue-tour.js','chefs.js','music.js','gallery.js','countdown.js','navigation.js','push-notifications.js','press.js','press-video.js','partners.js','tickets.js','news.js','OneSignalSDKWorker.js','manifest.webmanifest','about-platforms.json','chef-bios.json','logos.json','news.json','partner-profiles.json','press.json','proper-names.json','stand-directory.json','translations.en.json','translations.es.json',...fs.readdirSync(root).filter(name=>/^program(?:\.[a-z]{2}(?:-CN)?)?\.json$/.test(name))];
fs.rmSync(output,{recursive:true,force:true});fs.mkdirSync(output);
function copy(source,target){const stat=fs.lstatSync(source);if(stat.isSymbolicLink())throw Error('Public symlinks are not allowed');if(stat.isDirectory()){fs.mkdirSync(target,{recursive:true});for(const name of fs.readdirSync(source)){if(name.startsWith('.'))continue;copy(path.join(source,name),path.join(target,name))}}else{if(!/\.(?:html|css|js|json|webmanifest|jpe?g|png|webp|svg|mp3|pdf|woff)$/i.test(source))throw Error('Unexpected public file extension');if(source.endsWith('.json'))fs.writeFileSync(target,JSON.stringify(JSON.parse(fs.readFileSync(source,'utf8'))));else fs.copyFileSync(source,target)}}
for(const file of files)copy(path.join(root,file),path.join(output,file));
for(const dir of ['assets','locales','speaker-bios'])copy(path.join(root,dir),path.join(output,dir));
console.log('Built public site from explicit allowlist; server code, tests and internal notes excluded.');

const crypto=require('node:crypto');
let html=fs.readFileSync(path.join(output,'index.html'),'utf8');
const tags=[...html.matchAll(/<script src="([^"?]+\.js)(?:\?[^" ]*)?"><\/script>/g)];
const bundle=tags.map(tag=>fs.readFileSync(path.join(root,tag[1]),'utf8')).join('\n;\n');
const fingerprint=value=>crypto.createHash('sha256').update(value).digest('hex').slice(0,16);
const jsName='site.'+fingerprint(bundle)+'.js';fs.mkdirSync(path.join(output,'static'),{recursive:true});fs.writeFileSync(path.join(output,'static',jsName),bundle);
for(let i=0;i<tags.length;i++)html=html.replace(tags[i][0],i===0?`<script src="/static/${jsName}" defer></script>`:'');
const css=fs.readFileSync(path.join(output,'style.css'),'utf8').replace(/url\((['\"]?)(assets\/)/g,'url($1/$2'),cssName='site.'+fingerprint(css)+'.css';
fs.writeFileSync(path.join(output,'static',cssName),css);
// CSS relative asset paths must continue resolving from the site root.
html=html.replace(/href="style\.css(?:\?[^" ]*)?"/,`href="/static/${cssName}"`);
fs.writeFileSync(path.join(output,'index.html'),html);
// An explicit downloadable agenda is independent of the app and third-party SDKs.
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const agenda=JSON.parse(fs.readFileSync(path.join(root,'program.json'),'utf8'));
const rooms={main:'Ana Sahne · Haliç Auditorium',hospitality:'Hospitality Sahne · Sadabad Auditorium',eyup:'Hospitality Sahne · Eyüp Auditorium'};
let offline='<!doctype html><html lang="tr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Gastromasa · İndirilebilir program</title><style>body{max-width:900px;margin:24px auto;padding:16px;font:16px system-ui;line-height:1.6}article{border-bottom:1px solid #ccc;padding:12px 0}h2{margin-top:36px}small{color:#555}</style><h1>Gastromasa 2026 · Program</h1><p>26–27 Kasım 2026 · Saatler Türkiye yerel saatidir.</p><p>İndirilen kopya bağlantı olmadan okunabilir. Program değişebilir; güncel sürüm için <a href="https://gastromasa.vercel.app/#program">siteyi ziyaret edin</a>.</p>';
for(const day of [26,27])for(const [stage,label] of Object.entries(rooms)){offline+=`<h2>${day} Kasım · ${escapeHtml(label)}</h2>`;for(const s of agenda.filter(s=>s.day===day&&s.stage===stage))offline+=`<article><strong>${escapeHtml(s.time)}</strong><h3>${escapeHtml(s.title||({'OPENING SPEECHES':'Açılış konuşmaları','EXCLUSIVE CONVERSATION':'Özel söyleşi','PANEL DISCUSSION':'Panel','SOLO TALK':'Konuşma','LIVE COOKING DEMO':'Canlı mutfak','SESSION':'Oturum'}[s.type])||s.type)}</h3>${s.people.map(p=>`<p>${escapeHtml(p.name)}<br><small>${escapeHtml(p.role)} · ${escapeHtml(p.location)}</small></p>`).join('')}</article>`}
fs.writeFileSync(path.join(output,'gastromasa-program.html'),offline+'</html>');
