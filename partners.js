(()=>{
 const directoryReady=fetch('stand-directory.json').then(response=>{if(!response.ok)throw Error();return response.json()}).catch(()=>null);
 document.addEventListener('click',async event=>{
  const trigger=event.target.closest('[data-partner-id]');if(!trigger)return;
  const directory=await directoryReady,dialog=document.querySelector('#detail'),body=document.querySelector('#detailBody');
  if(!directory){body.innerHTML='<h2>Stant bilgileri yüklenemedi</h2><p>Lütfen sayfayı yenileyip tekrar deneyin.</p>';dialog.showModal();return}
  const record=directory.records.find(item=>item.id===trigger.dataset.partnerId);if(!record)return;
  const card=document.querySelector('.partner-card[data-partner-id="'+record.id+'"]'),logo=card?.querySelector('img');
  body.innerHTML=`<div class="partner-detail"><p class="eyebrow">STANT BİLGİLERİ</p>${logo?`<div class="partner-detail-logo"><img src="${esc(logo.getAttribute('src'))}" alt="${esc(record.name)} logosu"></div>`:''}<h2 class="notranslate" translate="no">${esc(record.name)}</h2>${record.stand?`<dl class="stand-facts"><div><dt>Stant numarası</dt><dd class="notranslate" translate="no">${esc(record.stand)}</dd></div><div><dt>Salon</dt><dd class="notranslate" translate="no">${esc(record.hall)}</dd></div><div><dt>Krokide geçen ad</dt><dd class="notranslate" translate="no">${esc(record.pdfName)}</dd></div></dl><div class="stand-actions"><a class="stand-map-link" href="#kroki">Krokiyi görüntüle ↗</a></div>`:'<p class="stand-unavailable">Stant bilgisi henüz eklenmedi.</p>'}</div>`;
  body.querySelector('.stand-map-link')?.addEventListener('click',()=>dialog.close());
  dialog.showModal();
 });
})();
