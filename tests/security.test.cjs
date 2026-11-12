const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const {configured}=require('../lib/push-reminders');
const root=path.join(__dirname,'..');
test('public build excludes backend, environment files and internal notes',()=>{
 require('node:child_process').execFileSync(process.execPath,['scripts/build-site.cjs'],{cwd:root});
 for(const name of ['lib','api','tests','scripts','AGENTS.md','.git','.env','vercel.json'])assert(!fs.existsSync(path.join(root,'public',name)),name);
 for(const name of ['index.html','security.js','program.json','program.zh-CN.json','OneSignalSDKWorker.js','assets','locales'])assert(fs.existsSync(path.join(root,'public',name)),name);
});
test('URL validation rejects script schemes, external images, credentials and traversal',()=>{
 const context={window:{},location:{origin:'https://gastromasa.vercel.app'},URL};vm.runInNewContext(fs.readFileSync(path.join(root,'security.js'),'utf8'),context);const security=context.window.SiteSecurity;
 for(const url of ['javascript:alert(1)','https://evil.test/assets/a.png','/assets/../api/push-config','/assets/%2f../secret','/assets/a\n.png'])assert.equal(security.assetUrl(url),'');
 assert.equal(security.assetUrl('assets/chefs/test.jpg'),'https://gastromasa.vercel.app/assets/chefs/test.jpg');
 for(const url of ['javascript:alert(1)','data:text/html,x','https://user:pass@evil.test'])assert.equal(security.externalUrl(url),'#');
 assert.equal(security.dimension('1 onerror=alert(1)'),1);
});
test('configuration rejects whitespace and control characters in credentials',()=>{
 const valid={appId:'11111111-1111-4111-8111-111111111111',apiKey:'test-only',secret:'a'.repeat(40)};assert(configured(valid));
 for(const secret of ['', 'short',' '+valid.secret,valid.secret+'\n'])assert(!configured({...valid,secret}));
});
test('scheduler rejects unauthorized requests and foreign browser origins without contacting provider',async()=>{
 const handler=require('../api/schedule-reminders');const oldFetch=global.fetch;global.fetch=()=>{throw Error('Provider must not be called')};
 try{for(const [method,headers,expected] of [['GET',{},401],['POST',{authorization:'Bearer invalid'},401],['DELETE',{},405],['GET',{origin:'https://evil.test'},403]]){let status;const res={setHeader(){},status(code){status=code;return this},json(){}};await handler({method,headers},res);assert.equal(status,expected)}}finally{global.fetch=oldFetch}
});
test('CSP forbids inline scripts and framing and permits required push worker',()=>{
 const config=require('../vercel.json'),headers=Object.fromEntries(config.headers[0].headers.map(h=>[h.key,h.value]));assert(headers['Content-Security-Policy'].includes("script-src-attr 'none'"));assert(headers['Content-Security-Policy'].includes("frame-ancestors 'none'"));assert(!headers['Content-Security-Policy'].includes("script-src 'self' 'unsafe-inline'"));assert.equal(headers['X-Content-Type-Options'],'nosniff');assert.equal(headers['Access-Control-Allow-Origin'],'https://gastromasa.vercel.app');
});
test('scheduler prevents concurrent provider runs and rapid authorized retries',async()=>{
 const modulePath=require.resolve('../lib/push-reminders'),handlerPath=require.resolve('../api/schedule-reminders'),original=require.cache[modulePath].exports;
 let release,calls=0;const pending=new Promise(resolve=>release=resolve);
 require.cache[modulePath].exports={configuration:()=>({secret:'test'}),authorized:()=>true,configured:()=>true,loadPrograms:()=>({programs:{},locales:{}}),buildPlan:()=>[],reconcile:async()=>{calls++;await pending;return {failed:[]}}};delete require.cache[handlerPath];
 const handler=require(handlerPath),response=()=>({code:0,setHeader(){},status(code){this.code=code;return this},json(){}});
 try{const first=response(),second=response(),third=response();const running=handler({method:'GET',headers:{}},first);await handler({method:'GET',headers:{}},second);assert.equal(second.code,429);release();await running;assert.equal(first.code,200);await handler({method:'GET',headers:{}},third);assert.equal(third.code,429);assert.equal(calls,1)}finally{release();require.cache[modulePath].exports=original;delete require.cache[handlerPath]}
});

test('minified production program is semantically identical in all languages',()=>{const path=require('node:path'),root=path.join(__dirname,'..');for(const name of fs.readdirSync(root).filter(n=>/^program(?:\.[a-z]{2}(?:-CN)?)?\.json$/.test(n))){const input=fs.readFileSync(path.join(root,name),'utf8'),output=fs.readFileSync(path.join(root,'public',name),'utf8');assert.deepEqual(JSON.parse(input),JSON.parse(output));assert(output.length<input.length)}});
