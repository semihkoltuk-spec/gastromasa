const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),program=require('../program.json'),source=require('./fixtures/program-2026-11-22.json');
const expectedCounts={'main-26':25,'main-27':25,'hospitality-26':16,'hospitality-27':19,'eyup-26':15,'eyup-27':13};
test('all six PDF agendas are represented with independently verified counts and source participants',()=>{
 assert.equal(program.length,113);assert.equal(new Set(program.map(s=>s.id)).size,113);const counts={};
 for(const session of program){const expected=source.find(row=>row.id===session.id);assert(expected);for(const field of ['stage','day','time','type','sponsor'])assert.equal(session[field],expected[field],session.id+' '+field);assert.deepEqual(session.people.map(p=>({name:p.name,role:p.role,location:p.location})),expected.people.map(p=>({name:p.name,role:p.role,location:p.location})),session.id);counts[session.stage+'-'+session.day]=(counts[session.stage+'-'+session.day]||0)+1}
 assert.deepEqual(counts,expectedCounts);assert.equal(program.reduce((n,s)=>n+s.people.length,0),376);
});
test('approved Maksut time, changed speaker line-ups and the Eyup source gap remain correct',()=>{
 const maksat=program.find(s=>s.stage==='main'&&s.day===27&&s.people.some(p=>p.name==='Maksut Aşkar'));assert.equal(maksat.time,'15:10-15:25');
 const pia=program.find(s=>s.id==='36');assert.equal(pia.time,'12:40-12:55');assert.equal(pia.people[1].name,'Pia León');assert.equal(pia.people[1].role,'Kjolle');assert.equal(pia.people[1].location,'Lima, Peru');
 assert.deepEqual(program.find(s=>s.id==='55').people.map(p=>p.name),['Moderator: Rafa Tonon','Viki Geunes','Paolo Casagrande','Nicolai Nørregaard']);
 assert.equal(program.find(s=>s.id==='41').day,27);assert.equal(program.find(s=>s.id==='41').time,'17:35-17:55');
 const gaps=[];for(const key of Object.keys(expectedCounts)){const rows=program.filter(s=>s.stage+'-'+s.day===key);let end='';for(const row of rows){const [start,finish]=row.time.split('-');assert(start<finish,row.id);assert(start>=end,row.id+' overlaps');if(end&&start>end)gaps.push([key,end,start]);end=finish}}
 assert.deepEqual(gaps,[['eyup-27','16:30','17:00']]);
});
test('only explicitly blank PDF moderator fields produce pending notices and sponsor logos match their sessions',()=>{
 assert.deepEqual(program.filter(s=>s.pendingModerator).map(s=>[s.stage,s.day,s.time]),[['eyup',26,'12:50-13:30'],['eyup',26,'14:10-14:25']]);
 assert.equal(program.filter(s=>s.sponsor==='CHEFseasons').length,4);assert.equal(program.find(s=>s.type==='SESSION').title,'YAYLA TÜRKİYE OTURUMU');assert.equal(program.find(s=>s.id==='hospitality-27-1545').sponsor,'La Lorraine');
});
test('all stored languages align on schedule and original person names; all attached portraits exist',()=>{
 const files=fs.readdirSync(root).filter(name=>/^program\.[a-z]{2}(?:-CN)?\.json$/.test(name));assert.equal(files.length,13);
 for(const file of files){const rows=JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));assert.equal(rows.length,113);for(let i=0;i<rows.length;i++){const row=rows[i],primary=program[i];assert.deepEqual([row.id,row.stage,row.day,row.time,row.type],[primary.id,primary.stage,primary.day,primary.time,primary.type],file);assert.deepEqual(row.people.map(p=>p.name),primary.people.map(p=>p.name),file);row.people.forEach((p,j)=>{if(primary.people[j].preserveRole)assert.equal(p.role,primary.people[j].role,file)})}}
 for(const row of program)for(const p of row.people){assert(p.name.trim());assert(!p.name.includes('NATURE & TERRITORY'));if(p.photo)assert(fs.existsSync(path.join(root,p.photo)),p.photo)}
});
