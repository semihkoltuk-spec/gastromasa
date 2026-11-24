const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),codes=['tr','en','es','it','de','fr','pt','zh-CN','ja','ar','ru','da','nl','el'];
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
test('all fourteen language options are enabled, with complete current programmes and stable proper names',()=>{
 const source=fs.readFileSync(path.join(root,'i18n.js'),'utf8'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');assert(source.includes('const multilingualEnabled=true'));const primary=read('program.json');
 for(const code of codes){assert(html.includes(`data-lang="${code}"`));const rows=read(code==='tr'?'program.json':`program.${code}.json`);assert.equal(rows.length,111);for(let i=0;i<rows.length;i++){const row=rows[i],tr=primary[i];assert(!row.translationPending,code+' '+row.id);assert.deepEqual([row.id,row.stage,row.day,row.time,row.sponsor],[tr.id,tr.stage,tr.day,tr.time,tr.sponsor]);assert.deepEqual(row.people.map(p=>p.name),tr.people.map(p=>p.name));row.people.forEach(p=>assert(!p.roleTranslationPending,code+' '+p.name))}}
});
test('biography translations preserve canonical names and the protected source entities in every paragraph',()=>{
 const audit=read('tests/fixtures/biography-protected-entities.json');
 for(const code of codes.filter(c=>c!=='tr')){const bios=read(`speaker-bios/${code}.json`);assert.equal(Object.keys(bios).length,Object.keys(audit).length);for(const [name,paragraphs] of Object.entries(audit)){assert.equal(bios[name].title,name,code);assert.equal(bios[name].paragraphs.length,paragraphs.length);paragraphs.forEach((entities,i)=>{for(const entity of entities)assert(bios[name].paragraphs[i].includes(entity),code+' '+name+' '+entity)})}}
});
test('editorial and partner content has static local translations and no unresolved placeholders',()=>{
 const profiles=read('partner-profiles.json').profiles,articles=read('news.json').articles;
 for(const code of codes.filter(c=>c!=='tr')){const locale=read(`locales/${code}.json`);for(const profile of profiles)assert(locale[profile.about],code+' '+profile.id);for(const article of articles){assert(locale[article.title],code+' '+article.id);for(const p of article.paragraphs)assert(locale[p],code+' '+article.id)}for(const file of [`locales/${code}.json`,`speaker-bios/${code}.json`,`program.${code}.json`])assert(!/ZXQ(?:NAME|LINE|X|Y)\d+QXZ/.test(fs.readFileSync(path.join(root,file),'utf8')),file)}
});
