function parseContent(text){const data={};text.split(/\r?\n/).forEach(line=>{if(/^\s*#/.test(line))return;const m=line.match(/^\s*([A-Za-z0-9_]+)\s*:\s*(.*?)\s*$/);if(m)data[m[1].toLowerCase()]=m[2]});return data}
let displaySettings={defaultMs:15000,galleryScreenMs:90000,galleryPhotoMs:7000,storyMs:20000,tickerMs:7000};
function secondsToMs(value,fallback,min=5,max=300){const seconds=Number(value);return Number.isFinite(seconds)?Math.max(min,Math.min(max,seconds))*1000:fallback}
function activeValue(value,defaultValue=true){if(value==null||value==='')return defaultValue;return !/^(no|false|0|off)$/i.test(String(value).trim())}
function validAssetUrl(value){return Boolean(value)&&!/^\s*(javascript|data):/i.test(value)}
function qrUrl(value,size=500){return 'https://api.qrserver.com/v1/create-qr-code/?size='+size+'x'+size+'&margin=14&data='+encodeURIComponent(value)}
function validWebUrl(value){try{const url=new URL(value);return url.protocol==='https:'||url.protocol==='http:'}catch(_){return false}}
function configureForm(kind,url){const image=document.querySelector('[data-form-qr="'+kind+'"]'),placeholder=document.querySelector('[data-form-placeholder="'+kind+'"]'),link=document.querySelector('[data-form-link="'+kind+'"]');if(!image||!placeholder||!link)return;if(validWebUrl(url)){image.src='https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=14&data='+encodeURIComponent(url);image.hidden=false;placeholder.hidden=true;link.hidden=false;link.href=url;link.target='_blank';link.rel='noopener'}else{image.hidden=true;image.removeAttribute('src');placeholder.hidden=false;link.hidden=true;link.removeAttribute('href')}}
function applyContent(data){
  document.querySelectorAll('[data-key]').forEach(el=>{const value=data[el.dataset.key];if(value)el.textContent=value});
  document.querySelectorAll('[data-image-key]').forEach(img=>{const value=data[img.dataset.imageKey];if(!validAssetUrl(value))return;img.onload=()=>{img.hidden=false;const ph=document.querySelector('[data-placeholder="'+img.dataset.imageKey+'"]');if(ph)ph.hidden=true};img.onerror=()=>{img.hidden=true};img.src=value});
  document.querySelectorAll('[data-background-key]').forEach(el=>{const value=data[el.dataset.backgroundKey];if(validAssetUrl(value))el.style.backgroundImage='url("'+value.replace(/"/g,'%22')+'")'});
  document.querySelectorAll('[data-qr-key]').forEach(img=>{const value=data[img.dataset.qrKey];if(validWebUrl(value)){img.src=qrUrl(value,420);img.hidden=false}else{img.hidden=true;img.removeAttribute('src')}});
  document.querySelectorAll('[data-link-key]').forEach(link=>{const value=data[link.dataset.linkKey];if(validWebUrl(value)){link.href=value;link.target='_blank';link.rel='noopener';link.hidden=false}else{link.hidden=true;link.removeAttribute('href')}});
  document.querySelectorAll('[data-active-key]').forEach(section=>{const key=section.dataset.activeKey;section.hidden=!activeValue(data[key],key!=='alert_active')});
  if(validWebUrl(data.calendar_url))document.querySelectorAll('[data-calendar-link]').forEach(link=>{link.href=data.calendar_url;link.target='_blank';link.rel='noopener'});
  configureForm('interest',data.interest_form_url);
  configureForm('volunteer',data.volunteer_form_url);
  displaySettings={
    defaultMs:secondsToMs(data.default_screen_seconds,15000,10,120),
    galleryScreenMs:secondsToMs(data.gallery_screen_seconds,90000,15,300),
    galleryPhotoMs:secondsToMs(data.gallery_photo_seconds,7000,4,60),
    storyMs:secondsToMs(data.story_screen_seconds,20000,10,120),
    tickerMs:secondsToMs(data.ticker_seconds,7000,4,60)
  };
  document.querySelectorAll('.slide').forEach(slide=>{let duration=displaySettings.defaultMs;if(slide.classList.contains('screen-gallery'))duration=displaySettings.galleryScreenMs;if(slide.classList.contains('screen-story-single'))duration=displaySettings.storyMs;slide.dataset.duration=String(duration)});
  if(data.music_label&&musicNowPlaying)musicNowPlaying.textContent=data.music_label;
  configureMusic(data);
  if(typeof restartGalleryTimer==='function')restartGalleryTimer();
  if(typeof runTicker==='function')runTicker();
  window.PR?.refresh?.();
}
function loadContent(){fetch('content.txt?v='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.text():Promise.reject()).then(t=>applyContent(parseContent(t))).catch(()=>{})}
loadContent();setInterval(loadContent,5*60*1000);

function formatEventTime(event){if(event.all_day)return'All day';const start=new Date(event.start),end=new Date(event.end);const day=start.toLocaleDateString([],{weekday:'long',month:'long',day:'numeric'});const from=start.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});const to=end.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});return day+' · '+from+'–'+to}
function renderCalendarEvents(events){const wrap=document.getElementById('calendarEvents');if(!wrap)return;wrap.textContent='';if(!events.length){const empty=document.createElement('div');empty.className='events-empty';empty.innerHTML='<strong>Upcoming events will appear here.</strong><span>Add an event to the Project Rebound public Outlook calendar.</span>';wrap.append(empty);return}events.slice(0,8).forEach(event=>{const start=new Date(event.start),item=document.createElement('article'),date=document.createElement('div'),copy=document.createElement('div'),title=document.createElement('h3'),when=document.createElement('div'),where=document.createElement('div'),month=document.createElement('small');item.className='event-item';date.className='event-date';month.textContent=start.toLocaleDateString([],{month:'short'});date.append(month,document.createTextNode(start.getDate()));copy.className='event-copy';title.textContent=event.title||'Project Rebound event';when.className='event-when';when.textContent=formatEventTime(event);copy.append(title,when);if(event.location){where.className='event-where';where.textContent=event.location;copy.append(where)}item.append(date,copy);wrap.append(item)})}
function loadCalendarEvents(){fetch('calendar-events.json?v='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():Promise.reject()).then(data=>renderCalendarEvents(Array.isArray(data.events)?data.events:[])).catch(()=>{})}
loadCalendarEvents();setInterval(loadCalendarEvents,5*60*1000);

const GALLERY_API='https://api.github.com/repos/mgriggs1989-web/project-rebound-center/contents/gallery?ref=main';
const galleryImage=document.getElementById('galleryImage'),galleryEmpty=document.getElementById('galleryEmpty'),galleryCaption=document.getElementById('galleryCaption'),galleryCount=document.getElementById('galleryCount');
let galleryPhotos=[],galleryIndex=0,galleryTimer=null,galleryLoadToken=0,galleryBusy=false;

function restartGalleryTimer(){
  clearInterval(galleryTimer);
  if(galleryPhotos.length>1)galleryTimer=setInterval(()=>{
    if(!galleryBusy)showGalleryPhoto(galleryIndex+1);
  },displaySettings.galleryPhotoMs);
}
function galleryTitle(name){
  return decodeURIComponent(name).replace(/\.[^.]+$/,'').replace(/^\d+[\s_-]*/,'').replace(/[_-]+/g,' ').replace(/\s+/g,' ').trim()||'Project Rebound community';
}
function preloadGalleryPhoto(photo){
  return new Promise((resolve,reject)=>{
    const loader=new Image();
    const timeout=setTimeout(()=>{loader.onload=loader.onerror=null;reject(new Error('Image timed out'))},20000);
    loader.onload=()=>{clearTimeout(timeout);resolve(loader)};
    loader.onerror=()=>{clearTimeout(timeout);reject(new Error('Image failed to load'))};
    loader.decoding='async';
    loader.src=photo.download_url;
  });
}
async function showGalleryPhoto(index,attempt=0){
  if(!galleryPhotos.length||galleryBusy)return;
  const target=(index+galleryPhotos.length)%galleryPhotos.length;
  const photo=galleryPhotos[target];
  const token=++galleryLoadToken;
  galleryBusy=true;
  galleryImage.classList.add('changing');
  try{
    const loaded=await preloadGalleryPhoto(photo);
    if(token!==galleryLoadToken)return;
    galleryImage.src=loaded.src;
    galleryImage.alt=galleryTitle(photo.name);
    galleryImage.hidden=false;
    galleryEmpty.hidden=true;
    galleryCaption.textContent=galleryTitle(photo.name);
    galleryCaption.hidden=false;
    galleryIndex=target;
    galleryCount.textContent=(galleryIndex+1)+' of '+galleryPhotos.length+' photos';
    galleryImage.classList.toggle('portrait',loaded.naturalHeight>loaded.naturalWidth);
    galleryImage.classList.toggle('landscape',loaded.naturalWidth>=loaded.naturalHeight);
    galleryImage.classList.remove('changing');
    const next=galleryPhotos[(galleryIndex+1)%galleryPhotos.length];
    if(next){const warm=new Image();warm.src=next.download_url}
  }catch(error){
    if(token!==galleryLoadToken)return;
    galleryImage.classList.remove('changing');
    if(attempt<galleryPhotos.length-1){
      galleryBusy=false;
      return showGalleryPhoto(target+1,attempt+1);
    }
    galleryCount.textContent='Gallery image temporarily unavailable';
  }finally{
    if(token===galleryLoadToken)galleryBusy=false;
  }
}
function loadGallery(){
  fetch(GALLERY_API,{cache:'no-store',headers:{Accept:'application/vnd.github+json'}})
    .then(r=>r.ok?r.json():Promise.reject())
    .then(items=>{
      const photos=Array.isArray(items)?items.filter(item=>item.type==='file'&&/\.(jpe?g|png|webp|gif)$/i.test(item.name)&&item.download_url).sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true})):[];
      if(!photos.length){
        galleryPhotos=[];galleryImage.hidden=true;galleryCaption.hidden=true;galleryEmpty.hidden=false;galleryCount.textContent='No photos uploaded yet';return;
      }
      const current=galleryPhotos[galleryIndex]?.name;
      galleryPhotos=photos;
      const preserved=galleryPhotos.findIndex(photo=>photo.name===current);
      galleryBusy=false;
      showGalleryPhoto(preserved>-1?preserved:0);
      restartGalleryTimer();
    })
    .catch(()=>{if(!galleryPhotos.length)galleryCount.textContent='Gallery temporarily unavailable'});
}
loadGallery();setInterval(loadGallery,5*60*1000);

const studyBeatsPlayer=document.getElementById('studyBeatsPlayer'),musicToggle=document.getElementById('musicToggle'),musicNowPlaying=document.getElementById('musicNowPlaying');
let youtubePaused=false,youtubeReady=false;
function youtubeCommand(func,args=[]){if(!studyBeatsPlayer?.contentWindow)return;studyBeatsPlayer.contentWindow.postMessage(JSON.stringify({event:'command',func,args}),'https://www.youtube.com')}
function paintMusicButton(blocked=false){if(!musicToggle)return;musicToggle.textContent=youtubePaused?'▶ Music':'❚❚ Music';musicToggle.setAttribute('aria-label',youtubePaused?'Play background music':'Pause background music');musicToggle.classList.toggle('blocked',blocked)}
function configureMusic(_data){}
function requestYouTubePlay(){if(youtubePaused||!youtubeReady||!studyBeatsPlayer)return;youtubeCommand('playVideo');paintMusicButton()}
function requestYouTubePause(){if(!studyBeatsPlayer)return;youtubeCommand('pauseVideo');paintMusicButton()}
if(studyBeatsPlayer&&musicToggle&&musicNowPlaying){
  studyBeatsPlayer.addEventListener('load',()=>{youtubeReady=true;studyBeatsPlayer.contentWindow?.postMessage(JSON.stringify({event:'listening',id:'studyBeatsPlayer'}),'https://www.youtube.com');[500,1500,3500,7000].forEach(delay=>setTimeout(requestYouTubePlay,delay))});
  window.addEventListener('message',event=>{if(!String(event.origin).includes('youtube.com'))return;let data=event.data;try{if(typeof data==='string')data=JSON.parse(data)}catch(_){return}if(data?.event==='onReady'){youtubeReady=true;requestYouTubePlay()}});
  musicToggle.addEventListener('click',()=>{youtubePaused=!youtubePaused;if(youtubePaused)requestYouTubePause();else requestYouTubePlay()});
  musicNowPlaying.textContent='Study Beats · YouTube Live';
  paintMusicButton();
  studyBeatsPlayer.src=studyBeatsPlayer.dataset.src;
  setInterval(requestYouTubePlay,15000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)requestYouTubePlay()});
}else{
  if(musicToggle)musicToggle.hidden=true;
  if(musicNowPlaying)musicNowPlaying.textContent='';
}

const tickerLines=[...document.querySelectorAll('.ticker p')];
let tickerIndex=0,tickerTimer=null;
function paintTicker(){tickerLines.forEach((line,index)=>line.classList.toggle('on',index===tickerIndex))}
function runTicker(){clearInterval(tickerTimer);if(tickerLines.length<2)return;tickerTimer=setInterval(()=>{tickerIndex=(tickerIndex+1)%tickerLines.length;paintTicker()},displaySettings.tickerMs)}
if(tickerLines.length){paintTicker();runTicker();document.addEventListener('visibilitychange',()=>{if(!document.hidden){paintTicker();runTicker()}})}

const PR=(()=>{
  const allSlides=[...document.querySelectorAll('.slide')],wrap=document.getElementById('dots');
  if(!allSlides.length||!wrap)return{go:()=>{},refresh:()=>{}};
  let slides=[],dots=[],index=0,timer=null,currentSlide=null;
  function paint(){allSlides.forEach(slide=>slide.classList.toggle('on',slide===slides[index]));dots.forEach((dot,i)=>dot.classList.toggle('on',i===index));currentSlide=slides[index]||null}
  function duration(){const requested=Number(slides[index]?.dataset.duration);return Number.isFinite(requested)&&requested>=10000?requested:displaySettings.defaultMs}
  function run(){clearTimeout(timer);if(slides.length>1)timer=setTimeout(()=>go(index+1),duration())}
  function go(nextIndex){if(!slides.length)return;index=(nextIndex+slides.length)%slides.length;paint();run()}
  function refresh(){const previous=currentSlide;slides=allSlides.filter(slide=>!slide.hidden);const previousIndex=slides.indexOf(previous);index=previousIndex>=0?previousIndex:Math.min(index,Math.max(0,slides.length-1));wrap.innerHTML=slides.map((_,i)=>'<button aria-label="Go to screen '+(i+1)+'"></button>').join('');dots=[...wrap.children];dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));paint();run()}
  document.querySelector('.prev')?.addEventListener('click',()=>go(index-1));
  document.querySelector('.next')?.addEventListener('click',()=>go(index+1));
  document.addEventListener('keydown',event=>{if(event.key==='ArrowRight')go(index+1);if(event.key==='ArrowLeft')go(index-1)});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)run()});
  refresh();
  return{go,refresh};
})();
window.PR=PR;
(function clock(){function tick(){const n=new Date();document.getElementById('clockTime').textContent=n.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});document.getElementById('clockDate').textContent=n.toLocaleDateString([],{weekday:'long',month:'long',day:'numeric'})}tick();setInterval(tick,15000)})();
