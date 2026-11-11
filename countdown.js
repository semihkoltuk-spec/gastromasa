(()=>{
  const values=document.querySelector('#countdownValues');
  if(!values)return;
  // The first published session starts at 09:30 in Istanbul (UTC+03:00).
  const startsAt=Date.parse('2026-11-26T09:30:00+03:00');
  const format=new Intl.NumberFormat(lang,{minimumIntegerDigits:2,useGrouping:false});
  const units=['Days','Hours','Minutes','Seconds'].map(key=>document.querySelector('#countdown'+key));
  let interval;
  function update(){
    const remaining=Math.max(0,Math.ceil((startsAt-Date.now())/1000));
    const parts=[Math.floor(remaining/86400),Math.floor(remaining/3600)%24,Math.floor(remaining/60)%60,remaining%60];
    units.forEach((node,index)=>{const value=format.format(parts[index]);if(node.textContent!==value)node.textContent=value});
    if(remaining===0){document.querySelector('#countdownComplete').hidden=false;clearInterval(interval)}
    return remaining;
  }
  if(update()>0)interval=setInterval(update,1000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)update()});
})();
