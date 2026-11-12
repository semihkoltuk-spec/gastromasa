(()=>{function init(){
 const audio=document.querySelector('#backgroundMusic');if(!audio)return;
 let pending=false,resumeAfterMedia=false;const holds=new Set(),events=['pointerdown','touchend','click','keydown'];
 function cleanup(){events.forEach(type=>document.removeEventListener(type,start,true));audio.removeEventListener('canplay',start);window.removeEventListener('pageshow',start)}
 function start(){if(holds.size||pending||!audio.paused)return;pending=true;try{const result=audio.play();if(result&&typeof result.then==='function'){result.then(()=>{if(holds.size)audio.pause();else cleanup()}).catch(()=>{}).finally(()=>{pending=false})}else{pending=false;if(holds.size)audio.pause();else cleanup()}}catch{pending=false}}
 window.SiteMusic=Object.freeze({hold(reason){if(!holds.size)resumeAfterMedia=!audio.paused||pending;holds.add(reason);audio.pause()},release(reason){holds.delete(reason);if(!holds.size&&resumeAfterMedia){resumeAfterMedia=false;start()}}});
 audio.volume=.35;events.forEach(type=>document.addEventListener(type,start,{capture:true,passive:true}));audio.addEventListener('playing',()=>{if(holds.size)audio.pause();else cleanup()});audio.addEventListener('canplay',start);window.addEventListener('pageshow',start);start()
 }if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init()})();
