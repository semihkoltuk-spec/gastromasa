(()=>{
 const dialog=document.querySelector('#ticketDialog');
 document.addEventListener('click',event=>{
  if(event.target.closest('[data-open-tickets]')&&!dialog.open)dialog.showModal();
 });
 dialog.querySelector('.ticket-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
})();
