(()=>{
 const panels=[...document.querySelectorAll('.push-preferences')];
 const tr={
  'Session reminders':'Oturum bildirimleri','Receive a notification 5 minutes before every session.':'Her oturumdan 5 dakika önce bildirim alın.',
  'Enable notifications':'Bildirimleri aç','Disable notifications':'Bildirimleri kapat','Notifications are enabled.':'Bildirimler açık.','Notifications are disabled.':'Bildirimler kapalı.',
  'Enable notification permission in your browser settings.':'Tarayıcı ayarlarından bildirim iznini açın.',
  'On iPhone, add this site to your Home Screen using Safari, then open it from there to enable notifications.':'iPhone’da Safari üzerinden bu siteyi Ana Ekran’a ekleyin. Ardından siteyi oradan açıp bildirimleri etkinleştirin.',
  'This browser does not support push notifications.':'Bu tarayıcı push bildirimlerini desteklemiyor.',
  'Notifications could not be enabled. Please try again.':'Bildirimler açılamadı. Lütfen tekrar deneyin.'
 };
 const text=key=>lang==='tr'?tr[key]||key:localeMessages[key]||key;
 const buttons=panels.map(panel=>panel.querySelector('[data-push-toggle]'));
 function message(key){panels.forEach(panel=>{panel.querySelector('[data-push-status]').textContent=text(key)})}
 function loadSdk(){return new Promise((resolve,reject)=>{
  const timeout=setTimeout(()=>reject(Error('Push SDK unavailable')),15000);
  window.OneSignalDeferred=window.OneSignalDeferred||[];
  window.OneSignalDeferred.push(sdk=>{clearTimeout(timeout);resolve(sdk)});
  const script=document.createElement('script');script.src='https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';script.async=true;script.onerror=()=>{clearTimeout(timeout);reject(Error('Push SDK unavailable'))};document.head.appendChild(script);
 })}
 async function start(){
  const response=await fetch('/api/push-config',{cache:'no-store'});if(!response.ok)return;
  const config=await response.json();if(!config.configured)return;
  await window.localeReady;
  panels.forEach(panel=>{panel.hidden=false;panel.querySelector('[data-push-heading]').textContent=text('Session reminders');panel.querySelector('[data-push-description]').textContent=text('Receive a notification 5 minutes before every session.')});
  const iphone=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  if(iphone&&!window.matchMedia('(display-mode: standalone)').matches&&!navigator.standalone){message('On iPhone, add this site to your Home Screen using Safari, then open it from there to enable notifications.');buttons.forEach(button=>button.hidden=true);return}
  const sdk=await loadSdk();
  await sdk.init({appId:config.appId,serviceWorkerPath:'OneSignalSDKWorker.js',serviceWorkerParam:{scope:'/'},notifyButton:{enable:false},welcomeNotification:{disable:true}});
  if(!sdk.Notifications.isPushSupported()){
   const iphone=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
   message(iphone?'On iPhone, add this site to your Home Screen using Safari, then open it from there to enable notifications.':'This browser does not support push notifications.');buttons.forEach(button=>button.hidden=true);return;
  }
  await sdk.User.setLanguage(lang==='zh-CN'?'zh-Hans':lang);
  function refresh(){const enabled=Boolean(sdk.User.PushSubscription.optedIn);buttons.forEach(button=>{button.hidden=false;button.textContent=text(enabled?'Disable notifications':'Enable notifications');button.disabled=!enabled&&window.Notification?.permission==='denied';button.setAttribute('aria-pressed',String(enabled))});message(window.Notification?.permission==='denied'?'Enable notification permission in your browser settings.':enabled?'Notifications are enabled.':'Notifications are disabled.')}
  sdk.User.PushSubscription.addEventListener('change',refresh);refresh();
  buttons.forEach(button=>button.addEventListener('click',async()=>{
   buttons.forEach(item=>item.disabled=true);
   try{if(sdk.User.PushSubscription.optedIn)await sdk.User.PushSubscription.optOut();else await sdk.User.PushSubscription.optIn();refresh()}catch{refresh();message('Notifications could not be enabled. Please try again.')}
  }));
 }
 start().catch(()=>{if(panels.some(panel=>!panel.hidden)){message('Notifications could not be enabled. Please try again.');buttons.forEach(button=>button.hidden=true)}});
})();
