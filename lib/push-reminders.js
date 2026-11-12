const crypto=require('node:crypto');
const fs=require('node:fs');
const path=require('node:path');
const NAMESPACE='gastromasa-2026-session-reminder-v1';
const CODES=['tr','en','es','it','de','fr','pt','zh-CN','ja','ar','ru','da','nl','el'];
const TYPES={'OPENING SPEECHES':'Opening speeches','SOLO TALK':'Solo talk','LIVE COOKING DEMO':'Live cooking demo','PANEL DISCUSSION':'Panel discussion','EXCLUSIVE CONVERSATION':'Exclusive conversation'};
const phrases={tr:t=>`“${t}” başlamak üzere. Başlamasına 5 dakika kaldı.`,en:t=>`“${t}” starts in 5 minutes.`,es:t=>`«${t}» comienza en 5 minutos.`,it:t=>`“${t}” inizia tra 5 minuti.`,de:t=>`„${t}“ beginnt in 5 Minuten.`,fr:t=>`« ${t} » commence dans 5 minutes.`,pt:t=>`“${t}” começa em 5 minutos.`,'zh-CN':t=>`“${t}”将在5分钟后开始。`,ja:t=>`「${t}」は5分後に始まります。`,ar:t=>`تبدأ جلسة «${t}» بعد 5 دقائق.`,ru:t=>`«${t}» начнётся через 5 минут.`,da:t=>`“${t}” starter om 5 minutter.`,nl:t=>`“${t}” begint over 5 minuten.`,el:t=>`Το «${t}» ξεκινά σε 5 λεπτά.`};
function configuration(env=process.env){return {appId:env.ONESIGNAL_APP_ID||'',apiKey:env.ONESIGNAL_REST_API_KEY||'',secret:env.CRON_SECRET||'',siteUrl:'https://gastromasa.vercel.app'}}
function configured(config){return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(config.appId)&&Boolean(config.apiKey&&config.secret.length>=32)}
function authorized(header,secret){const expected=Buffer.from(`Bearer ${secret}`),actual=Buffer.from(header||'');return Boolean(secret)&&expected.length===actual.length&&crypto.timingSafeEqual(expected,actual)}
function loadPrograms(root=path.join(__dirname,'..')){const programs={},locales={};for(const code of CODES){programs[code]=JSON.parse(fs.readFileSync(path.join(root,code==='tr'?'program.json':`program.${code}.json`),'utf8'));locales[code]=JSON.parse(fs.readFileSync(path.join(root,'locales',`${code}.json`),'utf8'))}return {programs,locales}}
function sessionTitle(session,locale={}){return session.title||session.people.filter(p=>! /^(Moderator:|Moderatör:|Introduced by|Moderador:|Presentado por)/.test(p.name)).map(p=>p.name).join(' & ')||locale[TYPES[session.type]]||TYPES[session.type]||session.type}
function buildPlan(programs,locales,config,now=Date.now()){
 const maps=Object.fromEntries(CODES.map(code=>[code,new Map(programs[code].map(s=>[s.id,s]))]));
 return programs.en.flatMap(session=>{
  const startsAt=Date.parse(`2026-11-${session.day}T${session.time.split('-')[0]}:00+03:00`),remindAt=startsAt-300000;
  if(!Number.isFinite(startsAt))throw Error('Invalid session time');
  if(remindAt<=now)return [];
  const contents={};for(const code of CODES){const localized=maps[code].get(session.id);if(!localized)throw Error('Missing translated session');contents[code==='zh-CN'?'zh-Hans':code]=phrases[code](sessionTitle(localized,locales[code]))}
  const signature=crypto.createHash('sha256').update(JSON.stringify([session.id,startsAt,contents])).digest('hex');
  const bytes=Buffer.from(signature.slice(0,32),'hex');bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;const hex=bytes.toString('hex');const idempotencyKey=`${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
  return [{app_id:config.appId,target_channel:'push',included_segments:['Subscribed Users'],name:`Gastromasa · ${session.day} Nov · ${session.time} · ${session.id}`,headings:{en:'Gastromasa 2026',tr:'Gastromasa 2026'},contents,send_after:new Date(remindAt).toISOString(),ttl:300,web_url:`${config.siteUrl}/#program`,idempotency_key:idempotencyKey,data:{namespace:NAMESPACE,session_id:session.id,start_at:new Date(startsAt).toISOString(),remind_at:new Date(remindAt).toISOString(),signature}}];
 });
}
async function oneSignal(config,route,method='GET',body,fetcher=fetch){const response=await fetcher(`https://api.onesignal.com${route}`,{method,headers:{Authorization:`Key ${config.apiKey}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(12000)});if(!response.ok)throw Error(`Push provider HTTP ${response.status}`);return response.json()}
async function reconcile(plan,config,fetcher=fetch,now=Date.now()){
 const existing=[];let offset=0;
 for(let page=0;page<20;page++){
  const result=await oneSignal(config,`/notifications?app_id=${encodeURIComponent(config.appId)}&limit=50&offset=${offset}`,'GET',undefined,fetcher);
  const rows=result.notifications;if(!Array.isArray(rows))throw Error('Invalid provider response');existing.push(...rows);offset+=rows.length;
  if(rows.length<50||offset>=result.total_count)break;
  if(page===19)throw Error('Provider history limit reached');
 }
 const current=existing.filter(n=>n.data?.namespace===NAMESPACE&&!n.canceled&&Date.parse(n.data.remind_at)>now);
 const desired=new Map(plan.map(n=>[n.data.session_id,n]));let canceled=0;
 for(const old of current){const next=desired.get(old.data.session_id);if(!next||next.data.signature!==old.data.signature){await oneSignal(config,`/notifications/${encodeURIComponent(old.id)}?app_id=${encodeURIComponent(config.appId)}`,'DELETE',undefined,fetcher);canceled++}}
 let created=0,unchanged=0;const failed=[];
 // Small batches stay below provider rate limits. Provider idempotency keys protect retries.
 for(let i=0;i<plan.length;i+=3){await Promise.all(plan.slice(i,i+3).map(async message=>{
  if(current.some(n=>n.data.signature===message.data.signature)){unchanged++;return}
  try{const canceledIds=existing.filter(n=>n.canceled&&n.data?.signature===message.data.signature).map(n=>n.id).sort();if(canceledIds.length){const bytes=crypto.createHash('sha256').update(message.data.signature+canceledIds.join(',')).digest().subarray(0,16);bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;const hex=bytes.toString('hex');message={...message,idempotency_key:`${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`}}const result=await oneSignal(config,'/notifications','POST',message,fetcher);if(!result.id)throw Error('No eligible audience');created++}catch{failed.push(message.data.session_id)}
 }))}
 return {created,unchanged,canceled,failed,total:plan.length};
}
module.exports={NAMESPACE,CODES,configuration,configured,authorized,loadPrograms,sessionTitle,buildPlan,reconcile};
