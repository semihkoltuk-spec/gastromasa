/* One bounded request per JSON resource, shared by all page components. */
(()=>{
 const requests=new Map(),revision='71',cachedResources=new Map();
 const storageKey=key=>'gastromasa-program:'+new URL(key).pathname;
 const isProgram=key=>/\/program(?:\.[a-z]{2}(?:-CN)?)?\.json$/.test(new URL(key).pathname);
 function valid(v){return Array.isArray(v)&&v.length>0&&v.length<500&&v.every(s=>s&&typeof s.id==='string'&&[26,27].includes(s.day)&&typeof s.time==='string'&&Array.isArray(s.people))}
 function remember(key,value){if(!isProgram(key)||!valid(value))return;try{localStorage.setItem(storageKey(key),JSON.stringify({at:Date.now(),value}))}catch{}}
 function fallback(key){if(!isProgram(key))return null;try{const c=JSON.parse(localStorage.getItem(storageKey(key))||'null');if(c&&Date.now()-c.at<7*86400000&&c.at<=Date.now()&&valid(c.value)){cachedResources.set(new URL(key).pathname,c.at);return c.value}}catch{}return null}

 function json(resource){
  const url=new URL(resource,location.href);if(url.origin!==location.origin||!url.pathname.endsWith('.json'))return Promise.reject(Error('Invalid data resource'));
  url.searchParams.set('v',revision);const key=url.href;if(requests.has(key))return requests.get(key);
  const request=(async()=>{for(let attempt=0;attempt<2;attempt++){
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),6000);let wait=400+Math.random()*600;
   try{const response=await fetch(key,{signal:controller.signal});if(response.ok){const value=await response.json();remember(key,value);return value;}if(response.status!==429&&response.status<500)throw Object.assign(Error('Data unavailable'),{permanent:true});const retryAfter=Number(response.headers.get('Retry-After'));if(retryAfter>2)throw Object.assign(Error('Please retry later'),{permanent:true});if(retryAfter>0)wait=retryAfter*1000;throw Error('Temporary data failure')}
   catch(error){if(error.permanent||error instanceof SyntaxError||attempt===1)throw error}
   finally{clearTimeout(timeout)}
   await new Promise(resolve=>setTimeout(resolve,wait));
  }})().catch(error=>{const value=fallback(key);if(value)return value;throw error});requests.set(key,request);request.catch(()=>{if(requests.get(key)===request)requests.delete(key)});return request;
 }
 Object.defineProperty(window,'SiteData',{value:Object.freeze({json,cachedAt:resource=>cachedResources.get(new URL(resource,location.href).pathname)||null}),writable:false,configurable:false});
})();
