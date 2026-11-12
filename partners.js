(()=>{
 const readJson=url=>fetch(url).then(response=>{if(!response.ok)throw Error();return response.json()}).catch(()=>null);
 const contentReady=Promise.all([readJson('stand-directory.json'),readJson('partner-profiles.json?v=50')]);
 document.addEventListener('click',async event=>{
  const trigger=event.target.closest('[data-partner-id]');if(!trigger)return;
  const [directory,profiles]=await contentReady,dialog=document.querySelector('#detail'),body=document.querySelector('#detailBody');
  if(!directory){body.innerHTML='<h2>Firma bilgileri yüklenemedi</h2><p>Lütfen sayfayı yenileyip tekrar deneyin.</p>';if(!dialog.open)dialog.showModal();return}
  const record=directory.records.find(item=>item.id===trigger.dataset.partnerId);if(!record)return;
  const profile=profiles?.profiles.find(item=>item.id===record.id);
  const card=document.querySelector('.partner-card[data-partner-id="'+record.id+'"]'),logo=card?.querySelector('img');
  body.innerHTML=`<div class="partner-detail"><p class="eyebrow">${card?'PARTNERLERİMİZ':'STANT BİLGİLERİ'}</p>${logo?`<div class="partner-detail-logo"><img src="${esc(SiteSecurity.assetUrl(logo.getAttribute('src')))}" alt="${esc(record.name)} logosu"></div>`:''}<h2 class="notranslate" translate="no">${esc(record.name)}</h2>${profile?`<section class="partner-about" aria-label="Hakkında"><h3>Hakkında</h3><p>${esc(profile.about)}</p></section>`:card?'<p class="partner-about-error">Tanıtım bilgileri yüklenemedi. Lütfen sayfayı yenileyip tekrar deneyin.</p>':''}${record.stand?`${profile?'<h3 class="partner-stand-heading">Stant bilgileri</h3>':''}<dl class="stand-facts"><div><dt>Stant numarası</dt><dd class="notranslate" translate="no">${esc(record.stand)}</dd></div><div><dt>Salon</dt><dd class="notranslate" translate="no">${esc(record.hall)}</dd></div><div><dt>Krokide geçen ad</dt><dd class="notranslate" translate="no">${esc(record.pdfName)}</dd></div></dl><div class="stand-actions"><a class="stand-map-link" href="#kroki">Krokiyi görüntüle ↗</a></div>`:!profile?'<p class="stand-unavailable">Stant bilgisi henüz eklenmedi.</p>':''}</div>`;
  body.querySelector('.stand-map-link')?.addEventListener('click',()=>dialog.close());
  if(!dialog.open)dialog.showModal();
 });
})();
