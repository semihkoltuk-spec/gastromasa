const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),directory=require('../stand-directory.json'),source=require('./fixtures/stands-2026-11-24.json');
const records=new Map(directory.records.map(r=>[r.id,r]));
function norm(s){return s.toUpperCase().normalize('NFKD').replace(/\p{M}/gu,'').replace(/[^A-Z0-9]/g,'')}
function codes(value){const [start,end]=value.replaceAll('–','-').split('-');if(!end)return [start];const prefix=start.match(/^[A-Z]+/)[0],a=Number(start.slice(prefix.length)),b=Number(end.replace(/^[A-Z]+/,''));return Array.from({length:b-a+1},(_,i)=>prefix+(a+i))}
test('numbered records agree with independently extracted new PDF legend or reviewed drawing exceptions',()=>{
 assert.equal(directory.records.length,92);assert.equal(records.size,92);assert.equal(directory.records.filter(r=>r.stand).length,54);
 for(const record of directory.records){if(record.sourceType==='user-logo'){assert.equal(record.stand,null);assert.equal(record.hall,null);continue}assert.equal(record.source,source.sourceName);assert.notEqual(record.status,'assigned');if(!record.stand){assert.equal(record.hall,null);continue}assert.equal(record.numberSource,'drawing');const exception=source.drawingExceptions[record.id];if(exception){assert.equal(record.stand,exception.stand);assert.equal(record.hall,exception.hall);assert(record.note);continue}
 const lines=source.legend.filter(line=>norm(line.replace(/^[ABCT][0-9/]+(?:-[ABCT]?[0-9/]+)?\s+/,'' )).includes(norm(record.id==='lcb'?'LE CORDON BLUE':record.pdfName)));assert(lines.length,record.id+' missing source label '+record.pdfName);const printed=new Set(lines.flatMap(line=>codes(line.match(/^[ABCT][0-9/]+(?:-[ABCT]?[0-9/]+)?/)[0])));for(const code of codes(record.stand))assert(printed.has(code),record.id+' '+code)
 }
});
test('changed stands, removed stale assignments and source conflicts are retained accurately',()=>{
 for(const [id,stand,hall] of [['napoli-antica','A5–A6','HALL-1'],['salted','A7–A8','HALL-1'],['zambo','A9','HALL-1'],['fine-dine','A78','HALL-3'],['tca','A11','HALL-1'],['lcb','B1','HALL-4'],['unilever-pro','B38–B41','HALL-4'],['cayista','B23–B24','HALL-4'],['dene-bi-cerez','B31–B35','HALL-4'],['bonna','C61–C75','HALL-6']]){assert.equal(records.get(id).stand,stand);assert.equal(records.get(id).hall,hall)}
 for(const id of ['empero','white-uniform']){assert.equal(records.get(id).stand,null);assert.equal(records.get(id).status,'unlisted')}
 for(const id of ['bonna','id-fine','usla'])assert(records.get(id).note.length>40);
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');assert(!html.includes('digital-stand-legend'));assert(html.includes('assets/venue-map-2026-11-24.webp'));
 const bytes=fs.readFileSync(path.join(root,directory.sourceFile));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),source.sourceSha256);
});
