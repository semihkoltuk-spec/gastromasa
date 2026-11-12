(()=>{
 const format=new Intl.DateTimeFormat(lang,{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
 document.querySelectorAll('.press-date[datetime]').forEach(node=>{const date=new Date(node.dateTime+'T12:00:00Z');if(!Number.isNaN(date.getTime()))node.textContent=format.format(date)});
})();
