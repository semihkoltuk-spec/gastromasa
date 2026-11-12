(()=>{
 const origin=location.origin;
 const assetUrl=value=>{
  if(typeof value!=='string'||/[\\\u0000-\u0020]/.test(value))return '';
  try{const url=new URL(value,origin);return url.origin===origin&&url.pathname.startsWith('/assets/')&&!decodeURIComponent(url.pathname).split('/').some(part=>part==='..')?url.href:''}catch{return ''}
 };
 const externalUrl=value=>{try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password?url.href:'#'}catch{return '#'}};
 const dimension=value=>Number.isInteger(Number(value))&&Number(value)>0&&Number(value)<=10000?Number(value):1;
 Object.defineProperty(window,'SiteSecurity',{value:Object.freeze({assetUrl,externalUrl,dimension}),writable:false,configurable:false});
})();
