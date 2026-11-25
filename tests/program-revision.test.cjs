const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),program=require('../program.json'),source=require('./fixtures/program-2026-11-25-excel.json');
const expectedCounts={'main-26':25,'main-27':25,'hospitality-26':15,'hospitality-27':18,'eyup-26':15,'eyup-27':13};
test('all six PDF agendas are represented with independently verified counts and source participants',()=>{
 assert.equal(program.length,111);assert.equal(new Set(program.map(s=>s.id)).size,111);const counts={};
 for(const session of program){const expected=source.find(row=>row.id===session.id);assert(expected);for(const field of ['stage','day','time','type'])assert.equal(session[field],expected[field],session.id+' '+field);assert.deepEqual(session.people.map(p=>({name:p.name,role:p.role,location:p.location})),expected.people.map(p=>({name:p.name,role:p.role,location:p.location})),session.id);counts[session.stage+'-'+session.day]=(counts[session.stage+'-'+session.day]||0)+1}
 assert.deepEqual(counts,expectedCounts);assert.equal(program.reduce((n,s)=>n+s.people.length,0),370);
});
test('approved Maksut time, changed speaker line-ups and the Eyup source gap remain correct',()=>{
 const maksat=program.find(s=>s.stage==='main'&&s.day===27&&s.people.some(p=>p.name==='Maksut Aşkar'));assert.equal(maksat.time,'15:10-15:25');
 const pia=program.find(s=>s.id==='36');assert.equal(pia.time,'12:40-12:55');assert.equal(pia.people[0].name,'Pia León');assert.equal(pia.people[0].role,'Kjolle');assert.equal(pia.people[0].location,'Lima, Peru');
 assert.deepEqual(program.find(s=>s.id==='55').people.map(p=>p.name),['Moderator: Rafa Tonon','Viki Geunes','Paolo Casagrande','Nicolai Nørregaard']);
 assert.equal(program.find(s=>s.id==='41').day,27);assert.equal(program.find(s=>s.id==='41').time,'17:35-17:55');
 const gaps=[];for(const key of Object.keys(expectedCounts)){const rows=program.filter(s=>s.stage+'-'+s.day===key);let end='';for(const row of rows){const [start,finish]=row.time.split('-');assert(start<finish,row.id);if(start<end)assert.equal(row.id,'eyup-27-v33-1140','Only the user-selected TR source conflict is allowed');if(end&&start>end)gaps.push([key,end,start]);end=finish}}
 assert.deepEqual(gaps,[]);
});
test('new moderators, moved sessions, removed sessions and source sponsor logos are reflected',()=>{
 assert.deepEqual(program.filter(s=>s.pendingModerator),[]);
 assert.equal(program.filter(s=>s.sponsor==='CHEFseasons').length,4);
 assert.equal(program.find(s=>s.id==='hospitality-27-v33-1530').time,'14:15-14:30');
 assert.equal(program.find(s=>s.id==='hospitality-27-v33-1530').sponsor,'Yayla');
 assert.equal(program.find(s=>s.id==='hospitality-27-1545').sponsor,'La Lorraine');
 assert.equal(program.find(s=>s.id==='hospitality-27-1545').people.length,3);
 assert.equal(program.find(s=>s.id==='eyup-27-v33-1000').day,26);
 assert.equal(program.find(s=>s.id==='eyup-26-v33-1140').day,27);
 assert.equal(program.find(s=>s.id==='eyup-27-v33-1000').title,'ŞEHİR OTELLERİNDE BAR KÜLTÜRÜ & YENİ NESİL MİSAFİR BEKLENTİLERİ');
 assert.equal(program.find(s=>s.id==='eyup-26-v33-1140').title,'GELENEKSEL RESTORANLAR GASTRONOMİ TURİZMİNE NASIL KATKI SAĞLIYOR?');
 assert(program.find(s=>s.id==='hospitality-26-1330').people.some(p=>p.name==='Utkan Gülaçtı'&&p.role==='Swissôtel The Bosphorus İstanbul Genel Müdürü'));
 assert.equal(program.find(s=>s.id==='hospitality-27-v33-1715').people.find(p=>p.name==='Doğa Çitçi').role,'Mutfak Sanatları Merkezi Koordinatör Şefi');
 assert.equal(program.filter(s=>s.sponsor).length,27);
 assert(!program.some(s=>['2','hospitality-27-1705'].includes(s.id)));

});
test('all stored languages align on schedule and original person names; all attached portraits exist',()=>{
 const files=fs.readdirSync(root).filter(name=>/^program\.[a-z]{2}(?:-CN)?\.json$/.test(name));assert.equal(files.length,13);
 for(const file of files){const rows=JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));assert.equal(rows.length,111);for(let i=0;i<rows.length;i++){const row=rows[i],primary=program[i];assert.deepEqual([row.id,row.stage,row.day,row.time,row.type],[primary.id,primary.stage,primary.day,primary.time,primary.type],file);assert.deepEqual(row.people.map(p=>p.name),primary.people.map(p=>p.name),file);row.people.forEach((p,j)=>{if(primary.people[j].preserveRole)assert.equal(p.role,primary.people[j].role,file)})}}
 for(const row of program)for(const p of row.people){assert(p.name.trim());assert(!p.name.includes('NATURE & TERRITORY'));if(p.photo)assert(fs.existsSync(path.join(root,p.photo)),p.photo)}
});
