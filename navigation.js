(()=>{
 const menu=document.querySelector('#siteMenu'),toggle=document.querySelector('#menuToggle'),close=document.querySelector('#menuClose');
 let previousOverflow='';
 toggle.addEventListener('click',()=>{previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';menu.showModal();toggle.setAttribute('aria-expanded','true')});
 close.addEventListener('click',()=>menu.close());
 menu.addEventListener('click',event=>{if(event.target===menu||event.target.closest('a'))menu.close()});
 menu.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;toggle.setAttribute('aria-expanded','false');toggle.focus({preventScroll:true})});
})();
(()=>{
 const sections=[...document.querySelectorAll('main>section')],hero=document.querySelector('.hero'),groups=new Set([...document.querySelectorAll('.partner-group[id]')].map(node=>node.id));
 function showPage(){
  const hash=decodeURIComponent(location.hash.slice(1));
  const pressCategory=['turkiye-basini','uluslararasi-basin'].includes(hash);const id=pressCategory?'basinda-biz':groups.has(hash)?'partnerler':hash==='sefler'?'konusmacilar':hash;
  const selected=hash==='iletisim'?null:(sections.find(section=>section.id===id)||hero);
  sections.forEach(section=>{section.hidden=section!==selected});
  document.querySelectorAll('.drawer-nav>a').forEach(link=>{if(link.getAttribute('href')===(id?'#'+id:'#'))link.setAttribute('aria-current','page');else link.removeAttribute('aria-current')});
  requestAnimationFrame(()=>{if(groups.has(hash)||pressCategory)document.getElementById(hash).scrollIntoView({behavior:'instant',block:'start'});else window.scrollTo({top:0,behavior:'instant'})});
 }
 addEventListener('hashchange',showPage);if(document.readyState!=='complete')addEventListener('load',showPage,{once:true});showPage();
})();
