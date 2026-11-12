(()=>{
 const button=document.querySelector('[data-instagram-video]'),dialog=document.querySelector('#pressVideoDialog'),host=document.querySelector('#pressVideoHost');
 if(!button||!dialog||!host)return;
 function close(){dialog.close()}
 button.addEventListener('click',()=>{
  window.SiteMusic?.hold('instagram');
  const frame=document.createElement('iframe');frame.src='https://www.instagram.com/reel/DebJFE4oIi3/embed/';frame.title='Gastromasa Instagram videosu';frame.allow='autoplay; encrypted-media; fullscreen; picture-in-picture';frame.referrerPolicy='strict-origin-when-cross-origin';frame.setAttribute('allowfullscreen','');host.replaceChildren(frame);dialog.showModal();
 });
 dialog.querySelector('.press-video-close').addEventListener('click',close);
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close()}});
 dialog.addEventListener('close',()=>{host.replaceChildren();window.SiteMusic?.release('instagram');button.focus()});
 window.addEventListener('hashchange',()=>{if(dialog.open)close()});
})();
