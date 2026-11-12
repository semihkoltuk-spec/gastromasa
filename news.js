(()=>{
 let articlesReady;
 const loadArticles=()=>articlesReady||(articlesReady=SiteData.json('news.json').catch(()=>{articlesReady=null;return null}));
 const format=new Intl.DateTimeFormat('tr-TR',{day:'numeric',month:'long',year:'numeric',timeZone:'Europe/Istanbul'});
 document.addEventListener('click',async event=>{
  const trigger=event.target.closest('[data-news-id]');if(!trigger)return;
  const content=await loadArticles(),dialog=document.querySelector('#detail'),body=document.querySelector('#detailBody');
  const article=content?.articles.find(item=>item.id===trigger.dataset.newsId);
  if(!article){body.innerHTML='<h2>Haber yüklenemedi</h2><p>Lütfen sayfayı yenileyip tekrar deneyin.</p>';if(!dialog.open)dialog.showModal();return}
  const date=format.format(new Date(article.date+'T12:00:00+03:00'));
  body.innerHTML=`<article class="news-detail"><p class="eyebrow">${esc(article.category)}</p><img class="news-detail-image" src="${esc(SiteSecurity.assetUrl(article.image))}" alt="" width="${SiteSecurity.dimension(article.imageWidth)}" height="${SiteSecurity.dimension(article.imageHeight)}"><time class="news-detail-date" datetime="${esc(article.date)}">${esc(date)}</time><h2 class="notranslate" translate="no">${esc(article.title)}</h2><div class="news-detail-copy notranslate" translate="no">${article.paragraphs.map(paragraph=>`<p>${esc(paragraph)}</p>`).join('')}</div><a class="news-source-link" href="${esc(SiteSecurity.externalUrl(article.sourceUrl))}" target="_blank" rel="noopener noreferrer">Gastromasa.com’da devamını oku ↗</a></article>`;
  if(!dialog.open)dialog.showModal();
 });
})();
