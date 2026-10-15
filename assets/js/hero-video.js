/* Supplied brand film, chapter navigation and accessible playback. */
(() => {
  'use strict';
  const video=document.getElementById('hero-film');
  if(!video)return;
  const panel=video.closest('.hero-film'),toggle=panel.querySelector('[data-video-toggle]');
  const chapters=[...document.querySelectorAll('[data-film-chapter]')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let inView=false,userPaused=reduced.matches||Boolean(navigator.connection?.saveData),active=-1,failed=false;
  video.muted=true;video.removeAttribute('controls');
  const paint=()=>{const playing=!video.paused;toggle.setAttribute('aria-label',playing?'Pause video':'Play video');toggle.setAttribute('aria-pressed',String(playing));toggle.innerHTML=window.KS.icon(playing?'pause':'play')+`<span>${playing?'Pause':'Play'} video</span>`;};
  const sync=()=>{if(!failed&&inView&&!document.hidden&&!document.body.classList.contains('menu-open')&&!userPaused){video.play().then(paint).catch(paint);}else{video.pause();paint();}};
  const update=()=>{const t=video.currentTime;let index=0;chapters.forEach((button,i)=>{if(t>=Number(button.dataset.filmChapter))index=i;});if(active!==index){active=index;chapters.forEach((button,i)=>{button.classList.toggle('is-active',i===index);button.setAttribute('aria-pressed',String(i===index));});}const start=Number(chapters[index].dataset.filmChapter),end=Number(chapters[index+1]?.dataset.filmChapter)||(video.duration||30);chapters[index].style.setProperty('--chapter-progress',`${Math.min(100,Math.max(0,(t-start)/(end-start)*100))}%`);};
  toggle.addEventListener('click',()=>{userPaused=!video.paused;sync();});
  chapters.forEach(button=>button.addEventListener('click',()=>{if(failed)return;video.currentTime=Number(button.dataset.filmChapter);update();sync();}));
  video.addEventListener('play',paint);video.addEventListener('pause',paint);video.addEventListener('timeupdate',update);video.addEventListener('loadedmetadata',update);
  video.addEventListener('error',()=>{failed=true;video.pause();panel.classList.add('film-unavailable');panel.querySelector('.film-status').hidden=false;toggle.hidden=true;chapters.forEach(button=>button.disabled=true);});
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:.12}).observe(panel);
  document.addEventListener('visibilitychange',sync);document.addEventListener('ks:menuchange',sync);
  reduced.addEventListener('change',e=>{if(e.matches)userPaused=true;sync();});
  paint();update();
})();
