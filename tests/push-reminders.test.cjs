const {test}=require('node:test'),assert=require('node:assert/strict');
const {configuration,configured,authorized,loadPrograms,buildPlan,reconcile,NAMESPACE}=require('../lib/push-reminders');
const config={appId:'11111111-1111-4111-8111-111111111111',apiKey:'test-api-secret',secret:'test-cron-secret-with-at-least-32-characters',siteUrl:'https://gastromasa.vercel.app'};
const now=Date.parse('2026-11-12T00:00:00Z');
const {programs,locales}=loadPrograms();
const plan=buildPlan(programs,locales,config,now);
const response=data=>({ok:true,json:async()=>data});
test('all 85 sessions are scheduled exactly five minutes before Istanbul start, in 14 languages',()=>{
 assert.equal(plan.length,85);assert.equal(plan[0].send_after,'2026-11-26T06:25:00.000Z');
 for(const notification of plan){assert.equal(Date.parse(notification.data.start_at)-Date.parse(notification.send_after),300000);assert.equal(Object.keys(notification.contents).length,14);assert.equal(notification.ttl,300);assert(notification.contents.tr.includes('5 dakika'));assert(!JSON.stringify(notification).includes(config.apiKey));assert(!JSON.stringify(notification).includes(config.secret))}
 assert.equal(new Set(plan.map(n=>n.idempotency_key)).size,85);
});
test('past reminders are never delivered late or immediately after reconfiguration',()=>{
 assert.equal(buildPlan(programs,locales,config,Date.parse('2026-11-26T06:26:00Z')).length,84);
 assert.equal(buildPlan(programs,locales,config,Date.parse('2026-11-28T00:00:00Z')).length,0);
});
test('scheduler requires a bearer secret and a complete provider configuration',()=>{
 assert(authorized(`Bearer ${config.secret}`,config.secret));assert(!authorized('',config.secret));assert(!authorized('Bearer wrong',config.secret));assert(!authorized('Bearer ',''));assert(configured(config));assert(!configured(configuration({})));
});
test('unchanged scheduled notifications are retained without duplicates',async()=>{
 const calls=[];const mock=async(url,options)=>{calls.push(options.method);return response({notifications:[{id:'existing',data:plan[0].data,send_after:Date.parse(plan[0].send_after)/1000}],total_count:1})};
 const result=await reconcile([plan[0]],config,mock,now);assert.equal(result.unchanged,1);assert.equal(result.created,0);assert.deepEqual(calls,['GET']);
});
test('schedule changes cancel only outdated Gastromasa notifications',async()=>{
 const calls=[];const mock=async(url,options)=>{calls.push({url,method:options.method,body:options.body});if(options.method==='GET')return response({notifications:[{id:'outdated',data:{...plan[0].data,signature:'outdated'}},{id:'unrelated',data:{namespace:'another-app'},send_after:Date.parse(plan[0].send_after)/1000}],total_count:2});return response(options.method==='POST'?{id:'new'}:{success:true})};
 const result=await reconcile([plan[0]],config,mock,now);assert.equal(result.canceled,1);assert.equal(result.created,1);assert(calls.some(c=>c.method==='DELETE'&&c.url.includes('outdated')));assert(!calls.some(c=>c.method==='DELETE'&&c.url.includes('unrelated')));
});
test('provider rejection or an empty audience is surfaced as a failure',async()=>{
 const mock=async(url,options)=>response(options.method==='GET'?{notifications:[],total_count:0}:{errors:['No subscribed users']});
 const result=await reconcile([plan[0]],config,mock,now);assert.equal(result.created,0);assert.deepEqual(result.failed,[plan[0].data.session_id]);
});
test('restoring a previously canceled notification uses a new stable idempotency key',async()=>{
 let key;const mock=async(url,options)=>{if(options.method==='GET')return response({notifications:[{id:'canceled-id',canceled:true,data:plan[0].data}],total_count:1});key=JSON.parse(options.body).idempotency_key;return response({id:'restored'})};
 await reconcile([plan[0]],config,mock,now);assert.notEqual(key,plan[0].idempotency_key);const first=key;await reconcile([plan[0]],config,mock,now);assert.equal(key,first);
});
test('public configuration never exposes credentials',async()=>{
 const original={...process.env};Object.assign(process.env,{ONESIGNAL_APP_ID:config.appId,ONESIGNAL_REST_API_KEY:config.apiKey,CRON_SECRET:config.secret});let body;const res={setHeader(){},status(){return this},json(value){body=value}};
 try{await require('../api/push-config')({method:'GET'},res);assert.deepEqual(body,{configured:true,appId:config.appId})}finally{for(const key of ['ONESIGNAL_APP_ID','ONESIGNAL_REST_API_KEY','CRON_SECRET']){if(original[key]===undefined)delete process.env[key];else process.env[key]=original[key]}}
});
