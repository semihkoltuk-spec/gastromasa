/* One bounded request per JSON resource, shared by all page components. */
(()=>{
 const requests=new Map(),revision='62';
 function json(resource){
  const url=new URL(resource,location.href);if(url.origin!==location.origin||!url.pathname.endsWith('.json'))return Promise.reject(Error('Invalid data resource'));
  url.searchParams.set('v',revision);const key=url.href;if(requests.has(key))return requests.get(key);
  const request=(async()=>{for(let attempt=0;attempt<2;attempt++){
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),6000);let wait=400+Math.random()*600;
   try{const response=await fetch(key,{signal:controller.signal});if(response.ok)return await response.json();if(response.status!==429&&response.status<500)throw Object.assign(Error('Data unavailable'),{permanent:true});const retryAfter=Number(response.headers.get('Retry-After'));if(retryAfter>2)throw Object.assign(Error('Please retry later'),{permanent:true});if(retryAfter>0)wait=retryAfter*1000;throw Error('Temporary data failure')}
   catch(error){if(error.permanent||error instanceof SyntaxError||attempt===1)throw error}
   finally{clearTimeout(timeout)}
   await new Promise(resolve=>setTimeout(resolve,wait));
  }})();requests.set(key,request);request.catch(()=>{if(requests.get(key)===request)requests.delete(key)});return request;
 }
 Object.defineProperty(window,'SiteData',{value:Object.freeze({json}),writable:false,configurable:false});
})();
