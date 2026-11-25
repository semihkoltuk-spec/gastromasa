const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),directory=require('../stand-directory.json');
const groups=new Map([...html.matchAll(/<div class="partner-group" id="([^"]+)"[\s\S]*?(?=<div class="partner-group"|<\/section>)/g)].map(m=>[m[1],[...m[0].matchAll(/data-partner-id="([^"]+)"/g)].map(x=>x[1])]));
test('supplied sponsor hierarchy retains original firms and category-specific duplicates',()=>{
 assert.equal(groups.size,18);assert.deepEqual(groups.get('resmi-ana-sponsor'),['ito']);assert.deepEqual(groups.get('ana-sponsor'),['altnmarka','cci','metro']);assert.deepEqual(groups.get('gala-partnerleri'),['bonna','cci']);assert.deepEqual(groups.get('gala-mekan-partneri'),['cvk']);assert.equal(groups.get('konaklama-partnerleri').length,9);assert.equal(groups.get('oturum-partnerleri').length,10);
 const original=require('../partner-profiles.json').profiles;for(const profile of original)assert(directory.records.some(r=>r.id===profile.id));
 for(const match of html.matchAll(/class="partner-card" data-partner-id="([^"]+)"[\s\S]*?<img src="([^"]+)"/g)){assert(directory.records.some(r=>r.id===match[1]));assert(fs.existsSync(path.join(__dirname,'..',match[2].split('?')[0])))}
 assert(fs.readFileSync(path.join(__dirname,'../partners.js'),'utf8').includes('categoryByCard.get(card)'));
});
