(()=>{
 const frame=document.querySelector('#venueTour');if(!frame)return;
 frame.addEventListener('load',()=>{if(frame.getAttribute('src'))document.querySelector('.venue-tour-loading')?.remove()});
 function load(){if(location.hash==='#mekan'&&!frame.getAttribute('src'))frame.src=frame.dataset.src}
 window.addEventListener('hashchange',load);load();
})();
