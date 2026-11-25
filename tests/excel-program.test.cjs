const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),program=require('../program.json'),fixture=require('./fixtures/program-2026-11-25-excel.json');
test('red participants are absent in every language and the explicit Yener title is honoured',()=>{
 for(const file of fs.readdirSync(root).filter(f=>/^program(?:\.[a-z]{2}(?:-CN)?)?\.json$/.test(f))){const rows=JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));const people=rows.flatMap(s=>s.people);for(const excluded of ['Tolgahan Bıyıklı','Selim Ay','Vedat Akar','Introduced by Serda Büyükkoyuncu','Introduced by Teoman Hünal'])assert(!people.some(p=>p.name===excluded),file+' '+excluded);const yener=people.filter(p=>p.name==='Yener Özden');assert.equal(yener.length,1);assert(yener[0].role.includes('F&B'));assert(!yener[0].role.includes('Marriott'));if(file==='program.json')assert.equal(yener[0].role,'F&B Direktörü')}
});
test('latest spreadsheet times, line-ups and dual-location international speaker are reflected',()=>{
 assert(program.find(s=>s.id==='eyup-27-v33-1110').people.some(p=>p.name==='Kenan Çetinkaya'));assert.equal(program.find(s=>s.id==='eyup-26-v33-1140').time,'11:40-12:20');
 assert.equal(program.find(s=>s.id==='19').time,'11:50-12:05');assert.equal(program.find(s=>s.id==='26').time,'13:40-14:00');assert.equal(program.find(s=>s.id==='eyup-27-v33-1700').time,'16:30-16:45');assert.equal(program.find(s=>s.id==='eyup-27-v33-1715').time,'16:45-17:15');assert(program.find(s=>s.id==='eyup-26-v33-1410').people.some(p=>p.name==='Moderator: Umut Karakuş'));assert(program.find(s=>s.id==='eyup-26-v33-1755').people.some(p=>p.name==='Ece Garip'));
 const gregoire=program.flatMap(s=>s.people).find(p=>p.name==='Grégoire Berger');assert.equal(gregoire.role,'Kraken & Nemo Tersane İstanbul');assert.equal(gregoire.location,'Dubai, UAE | İstanbul, Türkiye');
});
test('spreadsheet import is programme-only and no workbook or communication data is published',()=>{
 const allowed=new Set(['id','stage','day','time','type','title','people','sponsor','sourceFile','sourceSheet','sourceRange','sourceTitle','sourceCells','timeResolution']);
 for(const row of fixture){for(const field of Object.keys(row))assert(allowed.has(field),field);for(const p of row.people)for(const field of Object.keys(p))assert(['name','role','location','photo','preserveRole'].includes(field),field)}
 for(const records of [program,fixture]){const serial=JSON.stringify(records);assert(!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(serial));assert(!/\+?\d[\d ()-]{9,}\d/.test(serial));assert(!/önerildi|ÇIKACAK|EKLENDİ|KONU DEĞİŞTİ|ONAY BEKLENİYOR/i.test(serial))}
 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[e.name]);if(fs.existsSync(path.join(root,'public')))assert(!walk(path.join(root,'public')).some(n=>/\.xlsx$/i.test(n)));
});
