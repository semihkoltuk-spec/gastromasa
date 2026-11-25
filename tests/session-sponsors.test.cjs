const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),source=require('./fixtures/session-sponsors-2026-11-25.json'),excel=require('./fixtures/program-2026-11-25-excel.json');
test('poster sponsor assignments match the session identity in all fourteen languages',()=>{
 assert.equal(source.length,27);assert.equal(source.filter(r=>r.logo).length,9);assert.equal(new Set(source.filter(r=>!r.logo).map(r=>r.sponsor)).size,13);
 for(const file of fs.readdirSync(root).filter(f=>/^program(?:\.[a-z]{2}(?:-CN)?)?\.json$/.test(f))){const rows=JSON.parse(fs.readFileSync(path.join(root,file)));assert.equal(rows.filter(r=>r.sponsor).length,27);for(const row of rows){const expected=source.find(r=>r.id===row.id),original=excel.find(r=>r.id===row.id);assert.equal(row.time,original.time);assert.deepEqual(row.people.map(p=>p.name),original.people.map(p=>p.name));assert.equal(row.sponsor,expected?.sponsor||'',file+' '+row.id);assert.equal(row.sponsorLogo,expected?.logo||undefined);if(expected){assert.deepEqual(row.people.map(p=>p.name),expected.people);assert.equal(row.stage,expected.stage);assert.equal(row.day,expected.day)}if(row.sponsorLogo)assert(fs.existsSync(path.join(root,row.sponsorLogo)))}}
});
test('printed changes use the right speaker despite swapped source times',()=>{
 const p=require('../program.json');assert.equal(p.find(s=>s.id==='26').sponsor,'Özmen Un');assert.equal(p.find(s=>s.id==='19').sponsor,'Culinarist');assert.equal(p.find(s=>s.id==='61').sponsor,'Karaca');assert.equal(p.find(s=>s.id==='24').sponsor,'');
});
