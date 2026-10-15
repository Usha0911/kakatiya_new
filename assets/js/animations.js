(() => {
  'use strict';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const desktop=matchMedia('(min-width:1024px) and (pointer:fine)');
  // Eased wheel scrolling on desktop; phones retain their native touch momentum.
  const configureScroll=()=>{window.ksScroll?.destroy();window.ksScroll=null;if(window.Lenis&&desktop.matches&&!reduced.matches){window.ksScroll=new Lenis({autoRaf:true,lerp:.14,smoothWheel:true,syncTouch:false,anchors:false,prevent:node=>Boolean(node.closest?.('[data-lenis-prevent],.glightbox-container,textarea,select,.map-panel'))});window.ksScroll.on('scroll',()=>window.ScrollTrigger?.update());}};
  configureScroll();desktop.addEventListener('change',configureScroll);
  document.addEventListener('ks:menuchange',e=>{if(e.detail.open)window.ksScroll?.stop();else window.ksScroll?.start();});
  let motionStarted=false;
  // Never hide content when a CDN or animation library is unavailable.
  const start=()=>{
    if(reduced.matches||motionStarted)return;
    motionStarted=true;
    if(window.AOS){AOS.init({duration:desktop.matches?700:450,offset:32,once:true,easing:'ease-out-cubic',throttleDelay:99,debounceDelay:80});document.body.classList.add('aos-initialized');}
    if(window.Typed&&document.querySelector('#typed-services'))window.ksTyped=new Typed('#typed-services',{strings:['Websites','Mobile Apps','ERP Systems','Brands'],typeSpeed:65,backSpeed:35,backDelay:2300,loop:true,showCursor:true});
    if(window.gsap&&window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
      const headline=document.querySelector('.hero__headline');
      headline?.querySelectorAll(':scope>.hero__line,:scope>.accent-line').forEach(line=>{const inner=document.createElement('span');inner.className='hero-line-inner';while(line.firstChild)inner.append(line.firstChild);line.append(inner);line.classList.add('hero-line-mask');});
      const headings=[...document.querySelectorAll('[data-reveal-heading],.section__head h2,.page-hero h1,.cta-band h2')];
      headings.forEach(heading=>{const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(node=>{const fragment=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim()){fragment.append(document.createTextNode(word));return;}const mask=document.createElement('span'),inner=document.createElement('span');mask.className='motion-word-mask';inner.className='motion-word';inner.textContent=word;mask.append(inner);fragment.append(mask);});node.replaceWith(fragment);});});
      const media=gsap.matchMedia();
      media.add({desktop:'(min-width:1024px) and (pointer:fine)',mobile:'(max-width:1023px)',reduced:'(prefers-reduced-motion: reduce)'},context=>{
        if(context.conditions.reduced)return;
        const large=context.conditions.desktop;
        const bind=(el,event,handler)=>{el.addEventListener(event,handler);return()=>el.removeEventListener(event,handler);};
        const cleanups=[];
        const tracked=handler=>(...args)=>context.add(()=>{handler(...args);});
        if(!document.body.hasAttribute('data-motion-intro')){
          document.body.setAttribute('data-motion-intro','');
          const intro=gsap.timeline({defaults:{ease:'power3.out'}});
          if(headline){intro.from('.hero__kicker',{y:14,opacity:0,duration:.45})
            .from('.hero-line-inner',{yPercent:110,skewY:large?3:0,stagger:large?.1:.07,duration:large?1:.65,ease:'expo.out'},'-.25')
            .from('.hero__copy .lead,.hero__copy .button-row,.hero__typed',{y:18,opacity:0,stagger:.08,duration:.55},'-.65')
            .from('.hero-media',{y:large?30:14,opacity:0,scale:large?.97:1,duration:.85},'-.65');
          }else{
            const pageHero=document.querySelector('.page-hero');
            if(pageHero){const details=pageHero.querySelectorAll('.breadcrumbs,.eyebrow'),words=pageHero.querySelectorAll('h1 .motion-word'),lead=pageHero.querySelectorAll('.lead');if(details.length)intro.from(details,{y:12,opacity:0,stagger:.07,duration:.4});if(words.length)intro.from(words,{yPercent:105,stagger:.035,duration:.7,ease:'expo.out'},'-.2');if(lead.length)intro.from(lead,{y:16,opacity:0,duration:.5},'-.4');}
          }
        }
        headings.filter(h=>!h.closest('.page-hero')&&!h.hasAttribute('data-heading-revealed')).forEach(heading=>{
          ScrollTrigger.create({trigger:heading,start:'top 92%',once:true,onEnter:tracked(()=>{heading.setAttribute('data-heading-revealed','');gsap.fromTo(heading.querySelectorAll('.motion-word'),{yPercent:105},{yPercent:0,stagger:large?.045:.025,duration:large?.8:.55,ease:'expo.out',clearProps:'transform'});})});
        });
        const cards=[...document.querySelectorAll('.grid>.card,.grid>.insight,.grid>.project,.client-grid>.client-card,.sector-grid>.sector-card,.tech-grid>.tech-chip,.industry-list>.industry')].filter(el=>!el.hasAttribute('data-card-revealed'));
        if(cards.length)ScrollTrigger.batch(cards,{start:'top 94%',once:true,interval:.07,batchMax:large?6:2,onEnter:tracked(batch=>{batch.forEach(el=>el.setAttribute('data-card-revealed',''));gsap.fromTo(batch,{y:large?34:18,opacity:.3},{y:0,opacity:1,stagger:large?.085:.055,duration:large?.7:.5,ease:'power3.out',overwrite:'auto',clearProps:'transform,opacity'});})});
        document.querySelectorAll('.process__step').forEach(step=>{
          ScrollTrigger.create({trigger:step,start:'top 92%',once:true,onEnter:tracked(()=>{step.classList.add('is-revealed');if(step.hasAttribute('data-step-revealed'))return;step.setAttribute('data-step-revealed','');gsap.fromTo(step.querySelectorAll(':scope>span,h3,p'),{y:18,opacity:.25},{y:0,opacity:1,stagger:.09,duration:.6,ease:'power3.out',clearProps:'transform,opacity'});})});
        });
        if(large){
          const film=document.querySelector('.hero-film');
          if(film)gsap.to(film,{y:-24,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
          document.querySelectorAll('.about-art__year').forEach(el=>gsap.fromTo(el,{y:18},{y:-18,ease:'none',scrollTrigger:{trigger:el.closest('.about-art'),start:'top bottom',end:'bottom top',scrub:1}}));
          document.querySelectorAll('.cta-band').forEach(el=>gsap.fromTo(el,{'--cta-shift':'-24px'},{'--cta-shift':'12px',ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1}}));
          document.querySelectorAll('.btn,.text-link').forEach(el=>{const icon=el.querySelector('.icon');if(!icon)return;cleanups.push(bind(el,'pointerenter',tracked(()=>gsap.to(icon,{x:4,y:el.classList.contains('btn')?-3:0,duration:.3,ease:'power2.out',overwrite:true}))),bind(el,'pointerleave',tracked(()=>gsap.to(icon,{x:0,y:0,duration:.35,ease:'power2.out',overwrite:true}))));});
          document.querySelectorAll('.card--service').forEach(el=>{const icon=el.querySelector('.card__icon');if(!icon)return;cleanups.push(bind(el,'pointerenter',tracked(()=>gsap.to(icon,{y:-5,duration:.35,overwrite:true}))),bind(el,'pointerleave',tracked(()=>gsap.to(icon,{y:0,duration:.4,overwrite:true}))));});
        }
        const revealMenu=tracked(e=>{if(!e.detail.open)return;const targets=e.type==='ks:menuchange'?document.querySelectorAll('#navigation>.nav__link,#navigation>.nav__service,.nav__mobile-contact'):document.querySelectorAll('.mega__intro,.mega__grid>a');gsap.fromTo(targets,{y:large?14:18,opacity:.2},{y:0,opacity:1,duration:.4,stagger:large?.035:.045,ease:'power3.out',overwrite:'auto',clearProps:'transform,opacity'});});
        cleanups.push(bind(document,'ks:menuchange',revealMenu),bind(document,'ks:solutionschange',revealMenu));
        return()=>cleanups.forEach(cleanup=>cleanup());
      });
      document.fonts?.ready.then(()=>{window.AOS?.refreshHard();ScrollTrigger.refresh();});
    }
    if(window.countUp?.CountUp){const el=document.getElementById('experience-count');if(el){const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){new countUp.CountUp(el,15,{duration:2,suffix:'+'}).start();observer.disconnect();}},{threshold:.5});observer.observe(el);}}
  };
  start();
  if(window.Swiper&&document.querySelector('.testimonial-slider')){window.ksSlider=new Swiper('.testimonial-slider',{slidesPerView:1,spaceBetween:24,loop:false,speed:reduced.matches?0:500,a11y:{enabled:true,prevSlideMessage:'Previous testimonial',nextSlideMessage:'Next testimonial'},keyboard:{enabled:true,onlyInViewport:true},navigation:{nextEl:'.testimonial-next',prevEl:'.testimonial-prev'}});}
  else{const slides=[...document.querySelectorAll('.testimonial-slider .swiper-slide')];let selected=0;const show=i=>{selected=(i+slides.length)%slides.length;slides.forEach((s,n)=>{s.hidden=n!==selected;s.style.display=n===selected?'block':'none';});};if(slides.length){show(0);document.querySelector('.testimonial-next')?.addEventListener('click',()=>show(selected+1));document.querySelector('.testimonial-prev')?.addEventListener('click',()=>show(selected-1));}}
  if(window.Swiper&&document.querySelector('.work-slider'))new Swiper('.work-slider',{slidesPerView:1,spaceBetween:24,speed:reduced.matches?0:500,breakpoints:{768:{slidesPerView:2}},navigation:{nextEl:'.work-next',prevEl:'.work-prev'},a11y:{enabled:true,prevSlideMessage:'Previous project',nextSlideMessage:'Next project'}});
  document.querySelectorAll('.card--service').forEach(card=>card.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType!=='mouse')return;const r=card.getBoundingClientRect();card.style.setProperty('--mouse-x',`${e.clientX-r.left}px`);card.style.setProperty('--mouse-y',`${e.clientY-r.top}px`);}));
  reduced.addEventListener('change',e=>{configureScroll();if(e.matches){window.ksTyped?.destroy();window.ksSlider?.autoplay?.stop();}else{start();window.AOS?.refreshHard();}});
})();
